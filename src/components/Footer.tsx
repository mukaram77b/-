import React from 'react';
import { Phone, ShieldCheck, Instagram, MessageSquare, Lock } from 'lucide-react';
import { Language, NavTab } from '../types';
import { TRANSLATIONS } from '../constants/translations';
import { INITIAL_BRANCHES } from '../constants/logosData';

interface FooterProps {
  language: Language;
  onOpenBooking: () => void;
  onOpenScreener: () => void;
  onSwitchTab: (tab: NavTab) => void;
  onOpenAdminLogin: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  language,
  onOpenBooking,
  onOpenScreener,
  onSwitchTab,
  onOpenAdminLogin
}) => {
  const t = TRANSLATIONS[language];
  const isKg = language === 'ky';

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Col 1: Brand & Identity (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-sky-500 to-teal-400 flex items-center justify-center text-white font-black text-lg shadow-lg shadow-sky-500/30">
                Л+
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-xl tracking-tight text-white font-display">
                  ЛОГОС+
                </span>
                <span className="text-[10px] uppercase tracking-widest text-sky-400 font-bold -mt-0.5">
                  Нейро-логопедия борбору
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              {isKg 
                ? 'Бишкек шаарындагы балдардын кебин, сенсорикасын жана кыймыл-аракетин калыбына келтирүүчү илимий далилдүү борбор. РАС, Аутизм, ДЦП, ЗПР, алалия менен иштөө.' 
                : 'Специализированный центр развития речи и нейрокоррекции в Бишкеке. Доказательные методики реабилитации при РАС, ДЦП, ЗПР, заикании и алалии.'}
            </p>

            <div className="flex items-center gap-2 pt-2">
              <span className="px-3 py-1 rounded-lg bg-white/10 text-white text-[11px] font-bold border border-white/10 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
                Лицензия №4829-КР
              </span>
            </div>
          </div>

          {/* Col 2: Services & Programs (3 cols) */}
          <div className="lg:col-span-3 space-y-3 text-xs">
            <h4 className="font-bold text-sm text-white uppercase tracking-wider font-display">
              {isKg ? 'Багыттар жана кызматтар' : 'Направления'}
            </h4>
            <ul className="space-y-2">
              <li><button onClick={() => onSwitchTab('website')} className="hover:text-sky-400 transition-colors">Диагностика жана логомассаж</button></li>
              <li><button onClick={() => onSwitchTab('website')} className="hover:text-sky-400 transition-colors">Сенсордук интеграция залы</button></li>
              <li><button onClick={() => onSwitchTab('website')} className="hover:text-sky-400 transition-colors">АВА терапия (РАС / Аутизм)</button></li>
              <li><button onClick={() => onSwitchTab('website')} className="hover:text-sky-400 transition-colors">ДЦП үчүн АФК жана реабилитация</button></li>
              <li><button onClick={() => onSwitchTab('website')} className="hover:text-sky-400 transition-colors">Дефектолог жана нейроигралар</button></li>
              <li><button onClick={onOpenScreener} className="text-amber-400 hover:text-amber-300 font-bold">✨ Онлайн экспресс-тест (Акысыз)</button></li>
            </ul>
          </div>

          {/* Col 3: Portal & Actions (2 cols) */}
          <div className="lg:col-span-2 space-y-3 text-xs">
            <h4 className="font-bold text-sm text-white uppercase tracking-wider font-display">
              {isKg ? 'Портал & Жазылуу' : 'Портал и Запись'}
            </h4>
            <ul className="space-y-2">
              <li><button onClick={() => onSwitchTab('portal')} className="hover:text-sky-400 transition-colors">{t.nav.portal}</button></li>
              <li><button onClick={onOpenBooking} className="text-sky-400 font-bold hover:underline">{t.hero.bookDiagnosis}</button></li>
              <li><button onClick={onOpenScreener} className="hover:text-sky-400 transition-colors">{t.hero.runScreener}</button></li>
              <li className="pt-2 border-t border-slate-800">
                <button 
                  onClick={onOpenAdminLogin} 
                  className="text-slate-500 hover:text-slate-300 flex items-center gap-1 text-[11px]"
                >
                  <Lock className="w-3 h-3 text-slate-500" />
                  <span>{t.nav.adminLogin}</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Branches & Contacts (3 cols) */}
          <div className="lg:col-span-3 space-y-3 text-xs">
            <h4 className="font-bold text-sm text-white uppercase tracking-wider font-display">
              {isKg ? 'Филиалдар жана байланыш' : 'Филиалы и контакты'}
            </h4>
            
            <div className="space-y-2.5">
              {INITIAL_BRANCHES.map((b) => (
                <div key={b.id} className="space-y-0.5">
                  <div className="font-bold text-slate-200">{isKg ? b.nameKg : b.nameRu}</div>
                  <div className="text-[11px] text-slate-400">{isKg ? b.addressKg : b.addressRu}</div>
                  <a href={`tel:${b.phone}`} className="text-sky-400 font-semibold text-[11px] hover:underline block">
                    📞 {b.phone}
                  </a>
                </div>
              ))}
            </div>

            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/996705554433"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-xl bg-emerald-600/80 hover:bg-emerald-600 flex items-center justify-center text-white transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-10 mt-12 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © 2026 «Логос+» Нейро-логопедия борбору. Бардык укуктар корголгон.
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Бишкек, Кыргызстан</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
