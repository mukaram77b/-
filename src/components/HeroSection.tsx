import React from 'react';
import { Sparkles, Calendar, CheckCircle2, Award, Heart, Stethoscope, ArrowRight, Baby, Smile, Puzzle, Star, MessageCircle, ChevronRight } from 'lucide-react';
import { Language, NavTab, ServiceItem } from '../types';
import { TRANSLATIONS } from '../constants/translations';
import { INITIAL_SERVICES } from '../constants/logosData';

interface HeroSectionProps {
  language: Language;
  onOpenBooking: () => void;
  onOpenBookingWithService: (service: ServiceItem) => void;
  onOpenServiceDetails: (service: ServiceItem) => void;
  onOpenScreener: () => void;
  onSwitchToCrm: () => void;
  onSwitchTab: (tab: NavTab) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  language,
  onOpenBooking,
  onOpenBookingWithService,
  onOpenServiceDetails,
  onOpenScreener,
  onSwitchToCrm,
  onSwitchTab
}) => {
  const t = TRANSLATIONS[language];
  const isKg = language === 'ky';
  const isRu = language === 'ru';

  const zondService = INITIAL_SERVICES.find(s => s.id === 'srv-3') || INITIAL_SERVICES[2];
  const sensoryService = INITIAL_SERVICES.find(s => s.id === 'srv-5') || INITIAL_SERVICES[4];
  const abaService = INITIAL_SERVICES.find(s => s.id === 'srv-6') || INITIAL_SERVICES[5];
  const afkService = INITIAL_SERVICES.find(s => s.id === 'srv-7') || INITIAL_SERVICES[6];
  const diagService = INITIAL_SERVICES.find(s => s.id === 'srv-1') || INITIAL_SERVICES[0];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-amber-50/60 via-sky-50/40 to-white pt-8 pb-16 border-b border-slate-200/70">
      {/* Playful Floating Background Shapes & Bubbles */}
      <div className="absolute top-6 left-10 w-24 h-24 bg-amber-200/40 rounded-full blur-2xl pointer-events-none animate-pulse" />
      <div className="absolute top-32 right-12 w-36 h-36 bg-sky-200/40 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-10 left-1/3 w-48 h-48 bg-rose-200/30 rounded-full blur-3xl pointer-events-none" />

      {/* Playful decorative little icons floating */}
      <div className="hidden lg:block absolute top-12 left-16 text-2xl select-none opacity-80 animate-bounce" style={{ animationDuration: '3s' }}>
        🎈
      </div>
      <div className="hidden lg:block absolute top-28 right-24 text-2xl select-none opacity-80 animate-bounce" style={{ animationDuration: '4s' }}>
        ⭐
      </div>
      <div className="hidden lg:block absolute bottom-12 left-1/4 text-2xl select-none opacity-80">
        🧩
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Playful Hero Texts & Child-Friendly Badges */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-5">
            
            {/* Top Playful Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-100 via-rose-100 to-sky-100 border border-amber-200/80 text-amber-950 text-xs font-black shadow-xs">
              <span className="text-sm">🎈</span>
              <span>{isKg ? '«Логос+» — Балдардын кебин жана акылын оюн аркылуу өстүрүү борбору' : '«Логос+» — Центр развития речи и мышления ребенка через игру'}</span>
              <span className="text-sm">🌈</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.18] font-display">
              {isKg ? 'Ар бир баланын ' : 'Помогаем каждому ребенку '}
              <span className="bg-gradient-to-r from-sky-600 via-teal-600 to-amber-600 bg-clip-text text-transparent">
                {isKg ? 'сүйлөөсүн жана өнүгүүсүн' : 'заговорить и развиваться'}
              </span>
              {isKg ? ' кубаныч менен колдойбуз!' : ' с радостью и интересом!'}
            </h1>

            {/* Description */}
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl font-normal">
              {isKg 
                ? 'Балдар үчүн жылуу, кызыктуу жана ишенимдүү чөйрө. Зонддук логомассаж, сенсордук интеграция, АВА-терапия (РАС/Аутизм), ДЦП үчүн АФК жана кепти оңдоо — баары оюн формасында!'
                : 'Уютная развивающая среда для детей от 2 до 14 лет. Зондовый логомассаж, сенсорная интеграция, АВА-терапия (РАС/Аутизм), АФК при ДЦП и запуск речи в игровом формате!'}
            </p>

            {/* Interactive Service Pills - Click to open full details */}
            <div className="space-y-1.5 pt-1">
              <div className="text-[11px] font-bold text-slate-500 flex items-center justify-center lg:justify-start gap-1">
                <span>{isKg ? 'Кызматтар тууралуу маалымат алуу жана жазылуу:' : 'Нажмите для подробной информации и записи:'}</span>
                <span className="text-sky-600">👉</span>
              </div>
              <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                <button
                  type="button"
                  id="hero-pill-zond"
                  onClick={() => onOpenServiceDetails(zondService)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-50 hover:bg-sky-100 border border-sky-200 hover:border-sky-400 text-xs font-bold text-sky-900 shadow-2xs hover:shadow-sm transition-all active:scale-95 cursor-pointer"
                  title={isKg ? 'Зонддук логомассаж тууралуу толук маалымат' : 'Подробнее о зондовом логомассаже'}
                >
                  <span className="text-sm">👅</span>
                  <span>{isKg ? 'Зонддук логомассаж' : 'Зондовый логомассаж'}</span>
                  <ChevronRight className="w-3 h-3 text-sky-500 opacity-70" />
                </button>

                <button
                  type="button"
                  id="hero-pill-sensory"
                  onClick={() => onOpenServiceDetails(sensoryService)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-50 hover:bg-teal-100 border border-teal-200 hover:border-teal-400 text-xs font-bold text-teal-900 shadow-2xs hover:shadow-sm transition-all active:scale-95 cursor-pointer"
                  title={isKg ? 'Сенсордук ойноо залы тууралуу толук маалымат' : 'Подробнее о сенсорном зале'}
                >
                  <span className="text-sm">🎪</span>
                  <span>{isKg ? 'Сенсордук ойноо залы' : 'Сенсорный зал'}</span>
                  <ChevronRight className="w-3 h-3 text-teal-500 opacity-70" />
                </button>

                <button
                  type="button"
                  id="hero-pill-aba"
                  onClick={() => onOpenServiceDetails(abaService)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 hover:border-indigo-400 text-xs font-bold text-indigo-900 shadow-2xs hover:shadow-sm transition-all active:scale-95 cursor-pointer"
                  title={isKg ? 'АВА терапия тууралуу толук маалымат' : 'Подробнее об АВА терапии'}
                >
                  <span className="text-sm">🧩</span>
                  <span>{isKg ? 'АВА терапия (РАС/Аутизм)' : 'АВА терапия (РАС)'}</span>
                  <ChevronRight className="w-3 h-3 text-indigo-500 opacity-70" />
                </button>

                <button
                  type="button"
                  id="hero-pill-afk"
                  onClick={() => onOpenServiceDetails(afkService)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 border border-rose-200 hover:border-rose-400 text-xs font-bold text-rose-900 shadow-2xs hover:shadow-sm transition-all active:scale-95 cursor-pointer"
                  title={isKg ? 'ДЦП үчүн АФК тууралуу толук маалымат' : 'Подробнее об АФК при ДЦП'}
                >
                  <span className="text-sm">🏃</span>
                  <span>{isKg ? 'ДЦП үчүн АФК көнүгүүлөр' : 'АФК при ДЦП'}</span>
                  <ChevronRight className="w-3 h-3 text-rose-500 opacity-70" />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start pt-2">
              <button
                id="hero-btn-book"
                onClick={onOpenBooking}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-sky-600 via-teal-600 to-emerald-600 hover:from-sky-700 hover:to-emerald-700 text-white font-black text-sm shadow-lg shadow-sky-600/25 hover:shadow-xl transition-all active:scale-98"
              >
                <Calendar className="w-4 h-4" />
                <span>{isKg ? 'Диагностикага жазылуу' : 'Записаться на диагностику'}</span>
                <ArrowRight className="w-4 h-4 opacity-80" />
              </button>

              <button
                id="hero-btn-screener"
                onClick={onOpenScreener}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-amber-100/80 hover:bg-amber-200 text-amber-950 border border-amber-300 font-extrabold text-xs shadow-xs transition-all active:scale-98"
              >
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>{isKg ? 'Баланын кебин онлайн текшерүү' : 'Онлайн тест развития речи'}</span>
              </button>

              <button
                id="hero-btn-crm"
                onClick={onSwitchToCrm}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-all active:scale-98"
              >
                <span>{t.hero.exploreCrm}</span>
              </button>
            </div>

            {/* Stats row with cheerful child theme */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-slate-200/80">
              <div className="p-3 bg-white/90 rounded-2xl border border-sky-100 text-center lg:text-left shadow-2xs">
                <div className="text-2xl font-black text-sky-600 font-display">850+</div>
                <div className="text-[11px] text-slate-600 font-bold leading-snug">
                  {isKg ? 'Сүйлөгөн балдар' : 'Заговоривших детей'}
                </div>
              </div>
              <div className="p-3 bg-white/90 rounded-2xl border border-teal-100 text-center lg:text-left shadow-2xs">
                <div className="text-2xl font-black text-teal-600 font-display">12+</div>
                <div className="text-[11px] text-slate-600 font-bold leading-snug">
                  {isKg ? 'Сертификаттуу адис' : 'Логопедов и дефектологов'}
                </div>
              </div>
              <div className="p-3 bg-white/90 rounded-2xl border border-amber-100 text-center lg:text-left shadow-2xs">
                <div className="text-2xl font-black text-amber-600 font-display">98%</div>
                <div className="text-[11px] text-slate-600 font-bold leading-snug">
                  {isKg ? 'Ата-энелер ыраазы' : 'Довольных родителей'}
                </div>
              </div>
              <div className="p-3 bg-white/90 rounded-2xl border border-rose-100 text-center lg:text-left shadow-2xs">
                <div className="text-2xl font-black text-rose-600 font-display">2</div>
                <div className="text-[11px] text-slate-600 font-bold leading-snug">
                  {isKg ? 'Заманбап филиал' : 'Филиала в Бишкеке'}
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Visual Card with Cheerful Child Development Showcase */}
          <div className="lg:col-span-5">
            <div className="relative">
              
              {/* Main Visual Card */}
              <div className="rounded-3xl bg-white p-5 sm:p-6 shadow-xl border border-amber-200/80 relative z-10 space-y-4">
                
                {/* Visual Header */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 to-rose-400 flex items-center justify-center text-white font-bold text-xl shadow-md">
                      🎈
                    </div>
                    <div>
                      <h3 className="font-extrabold text-slate-900 text-sm font-display flex items-center gap-1.5">
                        <span>{isKg ? '«Логос+» Балдар борбору' : 'Детский центр «Логос+»'}</span>
                        <span className="text-amber-500">⭐</span>
                      </h3>
                      <p className="text-[11px] text-slate-500 font-medium">
                        {isKg ? 'Өнүгүү динамикасы жана жыйынтыктары' : 'Динамика развития и результаты'}
                      </p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-800">
                    Active Session
                  </span>
                </div>

                {/* Hero Patient Child Showcase */}
                <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-50/70 via-sky-50/50 to-teal-50/70 border border-amber-200/60 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img 
                          src="https://images.unsplash.com/photo-1543332164-6e82f355badc?auto=format&fit=crop&w=150&q=80" 
                          alt="Child" 
                          className="w-11 h-11 rounded-2xl object-cover border-2 border-white shadow-xs"
                        />
                        <span className="absolute -bottom-1 -right-1 text-xs">✨</span>
                      </div>
                      <div>
                        <div className="font-black text-xs text-slate-900 flex items-center gap-1">
                          <span>Амир (4 жаш)</span>
                          <span className="px-1.5 py-0.2 bg-sky-200 text-sky-900 text-[9px] font-bold rounded-md">Бала</span>
                        </div>
                        <div className="text-[11px] text-teal-800 font-semibold">
                          РАС / Сенсорика + АВА терапия
                        </div>
                      </div>
                    </div>
                    <span className="text-xs font-black text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-lg">
                      +45% өсүш 🚀
                    </span>
                  </div>

                  {/* Child Progress Visuals with Fun icons */}
                  <div className="space-y-2.5 pt-1 text-xs">
                    <div>
                      <div className="flex justify-between text-[11px] text-slate-700 mb-1 font-bold">
                        <span className="flex items-center gap-1">
                          <MessageCircle className="w-3 h-3 text-sky-600" />
                          {isKg ? 'Кеп жана көз байланышы (PECS)' : 'Речь и зрительный контакт'}
                        </span>
                        <span className="text-sky-700">80%</span>
                      </div>
                      <div className="w-full h-2.5 bg-slate-200/80 rounded-full overflow-hidden p-0.5">
                        <div className="h-full bg-gradient-to-r from-sky-400 to-sky-600 rounded-full w-4/5 transition-all duration-1000"></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-[11px] text-slate-700 mb-1 font-bold">
                        <span className="flex items-center gap-1">
                          <Puzzle className="w-3 h-3 text-teal-600" />
                          {isKg ? 'Сенсордук тең салмактуулук' : 'Сенсорный баланс и игры'}
                        </span>
                        <span className="text-teal-700">85%</span>
                      </div>
                      <div className="w-full h-2.5 bg-slate-200/80 rounded-full overflow-hidden p-0.5">
                        <div className="h-full bg-gradient-to-r from-teal-400 to-emerald-500 rounded-full w-[85%] transition-all duration-1000"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2 Interactive Feature Cards (Clickable) */}
                <div className="grid grid-cols-2 gap-2.5 text-xs">
                  <button
                    type="button"
                    onClick={() => onOpenServiceDetails(diagService)}
                    className="p-3 rounded-2xl bg-amber-50/90 hover:bg-amber-100/90 border border-amber-200/70 hover:border-amber-400 flex items-start gap-2.5 text-left transition-all active:scale-95 shadow-2xs hover:shadow-xs cursor-pointer"
                  >
                    <span className="text-lg shrink-0">👅</span>
                    <div>
                      <div className="font-extrabold text-slate-900 text-xs flex items-center gap-1">
                        <span>{isKg ? '1-чи Диагностика' : '1-я Диагностика'}</span>
                        <ChevronRight className="w-3 h-3 text-amber-600" />
                      </div>
                      <div className="text-[10px] text-slate-600">
                        {isKg ? 'Толук речевой корутунду' : 'Заключение логопеда'}
                      </div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => onSwitchTab('portal')}
                    className="p-3 rounded-2xl bg-sky-50/90 hover:bg-sky-100/90 border border-sky-200/70 hover:border-sky-400 flex items-start gap-2.5 text-left transition-all active:scale-95 shadow-2xs hover:shadow-xs cursor-pointer"
                  >
                    <span className="text-lg shrink-0">📱</span>
                    <div>
                      <div className="font-extrabold text-slate-900 text-xs flex items-center gap-1">
                        <span>{isKg ? 'Ата-энелер кабинети' : 'Кабинет родителя'}</span>
                        <ChevronRight className="w-3 h-3 text-sky-600" />
                      </div>
                      <div className="text-[10px] text-slate-600">
                        {isKg ? 'Үй тапшырма & динамика' : 'Домашние задания'}
                      </div>
                    </div>
                  </button>
                </div>

                {/* Friendly Banner */}
                <div className="p-3 rounded-2xl bg-gradient-to-r from-sky-900 via-teal-950 to-slate-900 text-white flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-xs font-bold flex items-center gap-1">
                      <span>{isKg ? 'Балаңыздын кебин текшериңиз' : 'Проверьте речь ребенка'}</span>
                      <span>🎈</span>
                    </div>
                    <div className="text-[10px] text-sky-200">
                      {isKg ? '2 мүнөттүк тез онлайн тест' : '2-минутный экспресс тест'}
                    </div>
                  </div>
                  <button
                    onClick={onOpenScreener}
                    className="text-[11px] font-black bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-amber-950 px-3.5 py-1.5 rounded-xl transition-all shadow-sm active:scale-95"
                  >
                    {isKg ? 'Текшерүү' : 'Пройти'}
                  </button>
                </div>

              </div>

              {/* Decorative playful colorful drop shadow */}
              <div className="absolute -bottom-3 -right-3 w-full h-full rounded-3xl bg-gradient-to-br from-amber-300 via-sky-300 to-teal-300 -z-0 opacity-40 blur-xs" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};


