import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageSquare, 
  X, 
  Send, 
  Sparkles, 
  Bot, 
  User, 
  Loader2, 
  Calendar, 
  ShieldCheck,
  Heart,
  Smile
} from 'lucide-react';
import { Language, ChatMessage } from '../types';
import { TRANSLATIONS } from '../constants/translations';

interface ChatbotWidgetProps {
  language: Language;
  onOpenBooking: () => void;
  onOpenScreener: () => void;
}

export const ChatbotWidget: React.FC<ChatbotWidgetProps> = ({
  language,
  onOpenBooking,
  onOpenScreener
}) => {
  const t = TRANSLATIONS[language];

  const getInitialMessage = (lang: Language): ChatMessage => {
    if (lang === 'en') {
      return {
        id: 'welcome-msg',
        sender: 'bot',
        text: 'Hello! I am Aiperi — the certified AI Pediatric Speech & Neuro-Development Consultant at «Logos+». I am here to help answer your questions about speech therapy, autism (ASD), cerebral palsy (CP), developmental delays, sensory integration gym, and booking a diagnostic session!',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestions: [
          'My 3yo child is not talking yet',
          'How does ABA therapy help with ASD?',
          'How much is the initial diagnosis?',
          'What is sensory integration gym?'
        ]
      };
    }
    if (lang === 'ru') {
      return {
        id: 'welcome-msg',
        sender: 'bot',
        text: 'Здравствуйте! Я Айпери — AI-консультант центра «Логос+». Готова ответить на ваши вопросы по развитию речи, РАС, ДЦП, ЗПР, методикам коррекции, зондовому массажу и записи на очную диагностику!',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestions: [
          'Ребенку 3 года, не говорит',
          'Как помогает АВА терапия при РАС?',
          'Сколько стоит первичная диагностика?',
          'Что такое сенсорная интеграция?'
        ]
      };
    }
    return {
      id: 'welcome-msg',
      sender: 'bot',
      text: 'Саламатсызбы! Менин атым Айпери — «Логос+» нейро-логопедия борборунун AI консультантымын. Балаңыздын кеби, өнүгүүсү (РАС, ДЦП, ЗПР) же биздин кызматтар боюнча суроолоруңузга кубаныч менен жооп берем!',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestions: [
        'Балам 3 жашта, такыр сүйлөбөйт',
        'АВА терапия кантип жардам берет?',
        'Диагностика баасы канча?',
        'Сенсордук интеграция эмне?'
      ]
    };
  };

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([getInitialMessage(language)]);
  const [inputVal, setInputVal] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Update initial message when language changes if chat hasn't started
  useEffect(() => {
    setMessages(prev => {
      if (prev.length <= 1) {
        return [getInitialMessage(language)];
      }
      return prev;
    });
  }, [language]);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputVal).trim();
    if (!text || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputVal('');
    setIsLoading(true);

    try {
      // Build conversation history
      const history = messages.map(m => ({
        role: m.sender === 'user' ? 'user' : 'model',
        parts: [{ text: m.text }]
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history,
          conversationHistory: messages.map(m => ({ sender: m.sender, text: m.text })),
          language
        })
      });

      const data = await res.json();
      const botResponseText = data.reply || data.text || data.message || (
        language === 'en'
          ? 'At «Logos+» center, every child receives an individualized developmental route. We recommend starting with a comprehensive in-person speech & neuro diagnosis.'
          : (language === 'ru'
            ? 'В центре «Логос+» применяется индивидуальный подход. Рекомендуем начать с комплексной очной диагностики.'
            : '«Логос+» борборунда ар бир балага жекече мамиле жасалат. 1-чи кадам катары логопед-дефектологдун толук диагностикасынан өтүүнү сунуштайбыз.')
      );

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: botResponseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestions: [
          language === 'en' ? 'Book In-Person Diagnosis' : (language === 'ru' ? 'Записаться на прием' : 'Диагностикага жазылуу'),
          language === 'en' ? 'Branch Locations' : (language === 'ru' ? 'Адреса филиалов' : 'Филиалдардын дареги')
        ]
      };

      setMessages(prev => [...prev, botMsg]);
    } catch (err) {
      console.error('Chat error:', err);
      // Smart offline fallback
      let fallbackText = language === 'en'
        ? '«Logos+» center has certified experts in ASD, Cerebral Palsy, Speech Delays, Alalia, and Stuttering. Branches in Bishkek: 114 Chuy Ave, 12th Microdistrict (Asanbay), 43 Ch. Aitmatov Ave. Please click "Book Session" to schedule.'
        : (language === 'ru'
          ? 'В центре «Логос+» работают сертифицированные специалисты по РАС, ДЦП, ЗПР и алалии. Филиалы в Бишкеке: Чуй 114, 12-мкр, Ч. Айтматова 43. Рекомендуем записаться на диагностику.'
          : '«Логос+» борборунда РАС, ДЦП, ЗПР, алалия жана кекечтенүү боюнча жогорку квалификациялуу адистер иштейт. Биздин даректер: Чүй 114, 12-мкр (Асанбай), Ч. Айтматов 43. Диагностикага жазылуу үчүн баскычты басыңыз.');
      
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: fallbackText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (sug: string) => {
    if (
      sug === 'Диагностикага жазылуу' || 
      sug === 'Записаться на прием' || 
      sug === 'Book In-Person Diagnosis'
    ) {
      onOpenBooking();
      return;
    }
    handleSendMessage(sug);
  };

  return (
    <>
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          id="chatbot-trigger-button"
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-40 p-3.5 sm:p-4 rounded-3xl bg-gradient-to-r from-sky-500 via-teal-500 to-emerald-500 hover:from-sky-600 hover:to-teal-600 text-white shadow-2xl shadow-sky-500/40 flex items-center gap-3 transition-all transform hover:scale-105 active:scale-95 group border-2 border-white/40"
        >
          <div className="relative">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-white">
              <Bot className="w-6 h-6" />
            </div>
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-amber-400 border-2 border-white rounded-full animate-ping" />
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-amber-400 border-2 border-white rounded-full flex items-center justify-center text-[7px] text-amber-950 font-black">★</span>
          </div>
          <div className="text-left hidden sm:block">
            <div className="text-xs font-black tracking-wide flex items-center gap-1.5">
              <span>{t.chatbot.title}</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-white/25 text-white font-bold">AI</span>
            </div>
            <div className="text-[10px] text-sky-100 font-medium">
              {language === 'en' ? 'Pediatric speech assistant' : (language === 'ru' ? 'Нейро-логопед консультант' : 'Нейро-логопед консультант')}
            </div>
          </div>
        </button>
      )}

      {/* Expanded Chat Window */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 z-50 w-[95vw] sm:w-[430px] h-[600px] max-h-[92vh] bg-white rounded-3xl shadow-2xl border border-sky-100 overflow-hidden flex flex-col animate-in slide-in-from-bottom-5 duration-300">
          
          {/* Chat Header */}
          <div className="px-5 py-4 bg-gradient-to-r from-sky-500 via-teal-500 to-emerald-500 text-white flex items-center justify-between shrink-0 shadow-md">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-white border border-white/30">
                  <Bot className="w-6 h-6" />
                </div>
                <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-300 border-2 border-teal-700 rounded-full" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-black text-sm leading-tight tracking-wide">
                    {language === 'en' ? 'Aiperi (Logos+ AI)' : 'Айпери (Логос+ AI)'}
                  </h3>
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-200" />
                </div>
                <p className="text-[10px] text-sky-100 font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
                  {language === 'en' ? 'Online • Instant pediatric answers' : (language === 'ru' ? 'Онлайн • Быстрые ответы' : 'Онлайн • Тез жооптор')}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/30 flex items-center justify-center text-white transition-colors"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Child-Themed Friendly Banner */}
          <div className="px-4 py-1.5 bg-amber-50/80 border-b border-amber-100 flex items-center justify-between text-[11px] text-amber-900 font-medium">
            <span className="flex items-center gap-1.5">
              <span>🌟</span>
              <span>
                {language === 'en' ? 'Logos+ Speech & Neuro Therapy' : (language === 'ru' ? 'Центр «Логос+» Бишкек' : '«Логос+» Бишкек Борбору')}
              </span>
            </span>
            <span className="text-[10px] text-amber-700 font-semibold">
              {language === 'en' ? '3 Branches' : (language === 'ru' ? '3 филиала' : '3 филиал')}
            </span>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gradient-to-b from-sky-50/40 to-slate-50 text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'bot' && (
                  <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-sky-500 to-teal-500 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div className={`space-y-2 max-w-[84%]`}>
                  <div
                    className={`p-3.5 rounded-2xl leading-relaxed whitespace-pre-line shadow-xs ${
                      msg.sender === 'user'
                        ? 'bg-sky-600 text-white rounded-br-xs font-medium'
                        : 'bg-white text-slate-800 border border-slate-200/90 rounded-bl-xs'
                    }`}
                  >
                    {msg.text}
                  </div>

                  {/* Suggestion Chips */}
                  {msg.suggestions && msg.suggestions.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {msg.suggestions.map((sug, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSuggestionClick(sug)}
                          className="px-2.5 py-1 rounded-xl bg-white hover:bg-sky-50 text-sky-800 border border-sky-200 text-[11px] font-semibold transition-all text-left shadow-2xs hover:border-sky-400"
                        >
                          💬 {sug}
                        </button>
                      ))}
                    </div>
                  )}

                  <div className={`text-[9px] text-slate-400 px-1 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                    {msg.timestamp}
                  </div>
                </div>

                {msg.sender === 'user' && (
                  <div className="w-7 h-7 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center gap-2 text-sky-700 bg-sky-50 px-3 py-2 rounded-2xl w-fit text-xs border border-sky-100">
                <Loader2 className="w-4 h-4 animate-spin text-sky-600" />
                <span className="font-semibold">
                  {language === 'en' ? 'Aiperi is typing answer...' : (language === 'ru' ? 'Айпери печатает ответ...' : 'Айпери жооп жазууда...')}
                </span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Action Bottom Strip */}
          <div className="px-4 py-2 bg-slate-100/90 border-t border-slate-200 flex items-center justify-between text-[11px]">
            <button
              onClick={onOpenScreener}
              className="text-sky-700 font-bold hover:underline flex items-center gap-1.5 hover:text-sky-900"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>{t.screener.title}</span>
            </button>
            <button
              onClick={onOpenBooking}
              className="text-teal-700 font-bold hover:underline flex items-center gap-1.5 hover:text-teal-900"
            >
              <Calendar className="w-3.5 h-3.5 text-teal-600" />
              <span>{t.hero.bookDiagnosis}</span>
            </button>
          </div>

          {/* Input Footer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-white border-t border-slate-200 flex items-center gap-2 shrink-0"
          >
            <input
              type="text"
              placeholder={t.chatbot.placeholder}
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              disabled={isLoading}
              className="flex-1 px-3.5 py-2.5 text-xs rounded-2xl bg-slate-50 border border-slate-200 focus:outline-sky-500 text-slate-900 focus:bg-white transition-all"
            />
            <button
              type="submit"
              disabled={!inputVal.trim() || isLoading}
              className="w-10 h-10 rounded-2xl bg-gradient-to-r from-sky-600 to-teal-600 hover:from-sky-700 hover:to-teal-700 disabled:opacity-40 text-white flex items-center justify-center transition-all shrink-0 shadow-md shadow-sky-600/20"
              title={t.chatbot.send}
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}
    </>
  );
};
