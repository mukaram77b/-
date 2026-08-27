import React, { useState } from 'react';
import { Language, MassageService } from '../types/spa';
import { TRANSLATIONS } from '../constants/translations';
import { SERVICES_LIST, MASTER_THERAPISTS, SPA_INFO } from '../constants/spaData';
import { getLocalChatbotResponse } from '../utils/chatbotBrain';
import { 
  Sparkles, 
  X, 
  Send, 
  Heart, 
  CheckCircle, 
  ChevronRight,
  Bot,
  User
} from 'lucide-react';

interface AISpaConsultantModalProps {
  language: Language;
  isOpen: boolean;
  onClose: () => void;
  onSelectService: (serviceId: string) => void;
}

export const AISpaConsultantModal: React.FC<AISpaConsultantModalProps> = ({
  language,
  isOpen,
  onClose,
  onSelectService
}) => {
  const t = TRANSLATIONS[language];
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<{
    text: string;
    matchedService?: MassageService;
  } | null>(null);

  if (!isOpen) return null;

  const handleConsult = async (queryText?: string) => {
    const q = queryText || userInput;
    if (!q.trim()) return;

    setLoading(true);

    // Call server Gemini API or fallback
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: q,
          language,
        })
      });
      const data = await res.json();
      
      let replyText = '';
      if (data.status === 'success' && data.reply) {
        replyText = data.reply;
      } else {
        replyText = getLocalChatbotResponse(q, language);
      }

      // Find matched service based on query
      const lower = q.toLowerCase();
      let matched: MassageService | undefined;

      if (lower.includes('тай') || lower.includes('йога') || lower.includes('thai')) {
        matched = SERVICES_LIST.find(s => s.id === 'thai-traditional');
      } else if (lower.includes('моюн') || lower.includes('бел') || lower.includes('остеохондроз') || lower.includes('спин') || lower.includes('шея')) {
        matched = SERVICES_LIST.find(s => s.id === 'classical-therapeutic');
      } else if (lower.includes('спорт') || lower.includes('трениров') || lower.includes('крепатур')) {
        matched = SERVICES_LIST.find(s => s.id === 'sports-deep-tissue');
      } else if (lower.includes('жубай') || lower.includes('эки') || lower.includes('пара') || lower.includes('романтик')) {
        matched = SERVICES_LIST.find(s => s.id === 'couples-romantic-spa');
      } else if (lower.includes('бет') || lower.includes('лицо') || lower.includes('кобидо') || lower.includes('морщин')) {
        matched = SERVICES_LIST.find(s => s.id === 'facial-kobido-sculpting');
      } else {
        matched = SERVICES_LIST.find(s => s.id === 'arashan-royal-signature');
      }

      setRecommendation({
        text: replyText,
        matchedService: matched
      });
    } catch {
      const fallbackText = getLocalChatbotResponse(q, language);
      setRecommendation({
        text: fallbackText,
        matchedService: SERVICES_LIST[0]
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#0c1117] border border-[#c5a059]/40 rounded-3xl max-w-2xl w-full max-h-[92vh] flex flex-col justify-between overflow-hidden shadow-2xl relative text-slate-200">
        
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-[#070a0e]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#c5a059]/20 border border-[#c5a059]/40 flex items-center justify-center text-[#f5d77f]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-serif font-bold text-white">
                {t.aiAdvisor.title}
              </h3>
              <p className="text-xs text-slate-400">
                {language === 'kg' ? 'Жеке массаж программасын тандоо' : language === 'ru' ? 'Персональный подбор спа-программы' : 'Tailored spa therapy advisor'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {t.aiAdvisor.subtitle}
          </p>

          {/* Quick Prompts */}
          <div>
            <span className="text-[11px] font-bold text-[#c5a059] uppercase tracking-wider block mb-2">
              {language === 'kg' ? 'Көп берилүүчү суроолор:' : language === 'ru' ? 'Популярные запросы:' : 'Common issues:'}
            </span>
            <div className="flex flex-wrap gap-2">
              {t.aiAdvisor.quickPrompts.map((promptText, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setUserInput(promptText);
                    handleConsult(promptText);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/10 hover:border-[#c5a059]/50 hover:text-white text-xs text-slate-300 transition-all text-left"
                >
                  {promptText}
                </button>
              ))}
            </div>
          </div>

          {/* Input Box */}
          <div className="flex gap-2">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleConsult();
              }}
              placeholder={t.aiAdvisor.inputPlaceholder}
              className="flex-1 p-3.5 rounded-xl bg-white/[0.04] border border-white/15 text-white text-xs focus:border-[#c5a059] outline-none"
            />
            <button
              onClick={() => handleConsult()}
              disabled={loading || !userInput.trim()}
              className="px-5 py-3.5 rounded-xl bg-gradient-to-r from-[#c5a059] to-[#e6ca85] text-slate-950 font-bold text-xs uppercase tracking-wider shadow disabled:opacity-50 flex items-center gap-1.5 cursor-pointer"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </button>
          </div>

          {/* Result Card */}
          {recommendation && (
            <div className="p-5 rounded-2xl bg-[#11171f] border border-[#c5a059]/30 space-y-4 animate-fadeIn">
              <div className="flex items-center gap-2 text-xs font-bold text-[#f5d77f] uppercase tracking-wider">
                <Bot className="w-4 h-4 text-[#c5a059]" />
                <span>{t.aiAdvisor.recommendationTitle}</span>
              </div>

              <div className="text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-line">
                {recommendation.text}
              </div>

              {recommendation.matchedService && (
                <div className="mt-4 p-4 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <img 
                      src={recommendation.matchedService.image} 
                      alt={recommendation.matchedService.name[language]}
                      className="w-12 h-12 rounded-lg object-cover" 
                    />
                    <div>
                      <h4 className="text-xs font-bold text-white">{recommendation.matchedService.name[language]}</h4>
                      <span className="text-[11px] text-[#f5d77f] font-bold">
                        {recommendation.matchedService.price.toLocaleString()} {t.currency} • {recommendation.matchedService.durationMin} {language === 'kg' ? 'мүнөт' : language === 'ru' ? 'мин' : 'min'}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      if (recommendation.matchedService) {
                        const sId = recommendation.matchedService.id;
                        onClose();
                        onSelectService(sId);
                      }
                    }}
                    className="px-4 py-2 rounded-lg bg-[#c5a059] text-slate-950 font-bold text-xs hover:bg-[#e2c179] transition-colors flex items-center gap-1 shrink-0"
                  >
                    <span>{language === 'kg' ? 'Жазылуу' : language === 'ru' ? 'Записаться' : 'Book'}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/10 bg-[#070a0e] text-center text-[11px] text-slate-400">
          <span>{SPA_INFO.name} • {SPA_INFO.city} • {SPA_INFO.phone}</span>
        </div>

      </div>
    </div>
  );
};
