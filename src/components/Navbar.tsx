import React from 'react';
import { 
  Sparkles, 
  Phone, 
  Calendar, 
  Heart, 
  Globe, 
  Lock, 
  ShieldCheck, 
  Baby, 
  FileText,
  UserCheck
} from 'lucide-react';
import { Language, NavTab } from '../types';
import { TRANSLATIONS } from '../constants/translations';

interface NavbarProps {
  currentTab: NavTab;
  setCurrentTab: (tab: NavTab) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  onOpenBooking: () => void;
  onOpenScreener: () => void;
  onOpenAdminLogin: () => void;
  isAdminAuthenticated: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  language,
  setLanguage,
  onOpenBooking,
  onOpenScreener,
  onOpenAdminLogin,
  isAdminAuthenticated
}) => {
  const t = TRANSLATIONS[language];
  const isKg = language === 'ky';

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Top micro bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-sky-400 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              РАС • Аутизм • ДЦП • ЗПРР • Кеп Коррекциясы • АВА • Сенсорика • АФК
            </span>
            <span className="text-slate-400">
              {t.workingHours}: 08:30 - 19:30
            </span>
          </div>
          <div className="flex items-center gap-5">
            <a 
              href="tel:+996705554433" 
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-sky-400" />
              <span>+996 (705) 55-44-33</span>
            </a>
            <span className="text-slate-600">|</span>
            <button 
              onClick={onOpenScreener}
              className="text-amber-300 hover:text-amber-200 font-medium flex items-center gap-1 transition-colors"
            >
              <Sparkles className="w-3 h-3" />
              <span>{t.hero.runScreener}</span>
            </button>
            <span className="text-slate-600">|</span>
            <button
              onClick={onOpenAdminLogin}
              className="text-slate-400 hover:text-white flex items-center gap-1 text-[11px] font-medium transition-colors"
              title="Администратор үчүн кирүү"
            >
              <Lock className="w-3 h-3 text-slate-400" />
              <span>{isAdminAuthenticated ? t.nav.admin : t.nav.adminLogin}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main navigation bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          
          {/* Logo & Brand */}
          <div 
            onClick={() => setCurrentTab('website')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-sky-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-sky-500/20 group-hover:scale-105 transition-transform">
              <Heart className="w-6 h-6 text-white fill-white/20" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-2xl font-black tracking-tight text-slate-900 font-display">
                  {t.brandName}
                </span>
                <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-sky-100 text-sky-700 rounded-full">
                  Бишкек
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium line-clamp-1">
                {t.brandSubtitle}
              </p>
            </div>
          </div>

          {/* Nav Tabs for Client */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100/80 p-1.5 rounded-2xl border border-slate-200/60">
            <button
              id="nav-tab-website"
              onClick={() => setCurrentTab('website')}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 ${
                currentTab === 'website'
                  ? 'bg-white text-sky-700 shadow-xs border border-slate-200/80'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <Globe className="w-4 h-4" />
              <span>{t.nav.website}</span>
            </button>

            <button
              id="nav-tab-portal"
              onClick={() => setCurrentTab('portal')}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 ${
                currentTab === 'portal'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <Baby className="w-4 h-4" />
              <span>{t.nav.portal}</span>
            </button>

            <button
              id="nav-btn-screener-modal"
              onClick={onOpenScreener}
              className="px-3.5 py-2 text-xs font-semibold rounded-xl text-amber-700 hover:bg-amber-50 transition-all flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>{isKg ? 'Онлайн Тест' : 'Экспресс-тест'}</span>
            </button>

            {isAdminAuthenticated && (
              <button
                id="nav-tab-admin"
                onClick={() => setCurrentTab('admin')}
                className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 ${
                  currentTab === 'admin'
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'text-slate-700 hover:bg-slate-200/50'
                }`}
              >
                <Lock className="w-3.5 h-3.5 text-rose-400" />
                <span>{t.nav.admin}</span>
              </button>
            )}
          </nav>

          {/* Right Action buttons & Language Switcher */}
          <div className="flex items-center gap-2.5">
            {/* Language toggle */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-bold">
              <button
                onClick={() => setLanguage('ky')}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  language === 'ky' 
                    ? 'bg-white text-sky-700 shadow-xs' 
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                KG
              </button>
              <button
                onClick={() => setLanguage('ru')}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  language === 'ru' 
                    ? 'bg-white text-sky-700 shadow-xs' 
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                RU
              </button>
            </div>

            {/* Book Diagnosis CTA */}
            <button
              id="btn-book-diagnosis-nav"
              onClick={onOpenBooking}
              className="flex items-center gap-2 bg-gradient-to-r from-sky-600 to-teal-600 hover:from-sky-700 hover:to-teal-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md shadow-sky-600/20 hover:shadow-lg transition-all active:scale-95"
            >
              <Calendar className="w-4 h-4" />
              <span>{t.hero.bookDiagnosis}</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Bar */}
        <div className="flex md:hidden overflow-x-auto py-2 gap-2 border-t border-slate-100 no-scrollbar">
          <button
            onClick={() => setCurrentTab('website')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg shrink-0 ${
              currentTab === 'website' ? 'bg-sky-600 text-white' : 'bg-slate-100 text-slate-700'
            }`}
          >
            {t.nav.website}
          </button>
          <button
            onClick={() => setCurrentTab('portal')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg shrink-0 ${
              currentTab === 'portal' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700'
            }`}
          >
            {t.nav.portal}
          </button>
          <button
            onClick={onOpenScreener}
            className="px-3 py-1.5 text-xs font-bold rounded-lg shrink-0 bg-amber-100 text-amber-900"
          >
            {isKg ? 'Онлайн Тест' : 'Экспресс-тест'}
          </button>
          <button
            onClick={onOpenAdminLogin}
            className="px-3 py-1.5 text-xs font-bold rounded-lg shrink-0 bg-slate-900 text-white flex items-center gap-1"
          >
            <Lock className="w-3 h-3 text-rose-400" />
            <span>{isAdminAuthenticated ? t.nav.admin : t.nav.adminLogin}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
