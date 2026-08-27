import React, { useState } from 'react';
import { Language } from '../types/spa';
import { TRANSLATIONS } from '../constants/translations';
import { SPA_INFO } from '../constants/spaData';
import { InteractiveMap } from './InteractiveMap';
import { 
  MapPin, 
  Phone, 
  Clock, 
  Navigation, 
  MessageCircle, 
  ExternalLink,
  Building2,
  CheckCircle,
  Car,
  ShieldCheck,
  Compass
} from 'lucide-react';

interface LocationSectionProps {
  language: Language;
}

export const LocationSection: React.FC<LocationSectionProps> = ({ language }) => {
  const [selectedBranchId, setSelectedBranchId] = useState<string>('central');
  const t = TRANSLATIONS[language];

  const currentBranch = SPA_INFO.branches.find(b => b.id === selectedBranchId) || SPA_INFO.branches[0];

  return (
    <section id="location" className="py-20 bg-[#070b0e] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#c5a059]/30 bg-[#16221c] text-[#f5d77f] text-xs font-semibold tracking-wider uppercase mb-3">
            <Compass className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>{t.locations.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
            {t.locations.title}
          </h2>
          <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
            {t.locations.subtitle}
          </p>
        </div>

        {/* Branch Tabs */}
        <div className="flex items-center justify-center gap-3 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {SPA_INFO.branches.map((branch) => {
            const isSelected = branch.id === selectedBranchId;
            return (
              <button
                key={branch.id}
                onClick={() => setSelectedBranchId(branch.id)}
                className={`px-5 py-3 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-r from-[#c5a059] to-[#e6ca85] text-slate-950 shadow-xl shadow-[#c5a059]/25 scale-105'
                    : 'bg-white/[0.04] text-slate-300 border border-white/10 hover:border-[#c5a059]/40 hover:text-white'
                }`}
              >
                <Building2 className="w-4 h-4" />
                <span>{branch.name[language]}</span>
              </button>
            );
          })}
        </div>

        {/* Interactive Map Component */}
        <div className="mb-10">
          <InteractiveMap
            branches={SPA_INFO.branches}
            selectedBranchId={selectedBranchId}
            onSelectBranch={(id) => setSelectedBranchId(id)}
            language={language}
          />
        </div>

        {/* Branch Details Display Card */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch rounded-3xl border border-[#c5a059]/30 bg-[#0e141a] overflow-hidden shadow-2xl p-6 sm:p-8">
          
          {/* Left Details */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#c5a059] uppercase tracking-wider">
                  {language === 'kg' ? 'Тандалган Мукка филиалы' : language === 'ru' ? 'Выбранный филиал Мукка' : 'Active Mukka Branch'}
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>

              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1">
                {currentBranch.name[language]}
              </h3>

              <div className="mt-6 space-y-4 text-sm text-slate-200">
                {/* Address */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-[#c5a059]/20 flex items-center justify-center text-[#f5d77f] shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block">{language === 'kg' ? 'Дареги:' : language === 'ru' ? 'Адрес:' : 'Address:'}</span>
                    <span className="font-semibold text-white">{currentBranch.address[language]}</span>
                  </div>
                </div>

                {/* Landmark */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                    <Navigation className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block">{t.locations.landmarkLabel}</span>
                    <span className="text-slate-300">{currentBranch.landmark[language]}</span>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block">{t.footer.workingHoursTitle}:</span>
                    <span className="font-semibold text-[#f5d77f]">{currentBranch.hours}</span>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400 shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block">{t.footer.contactTitle}:</span>
                    <a href={`tel:${currentBranch.phone.replace(/[^0-9]/g, '')}`} className="font-bold text-white hover:text-[#f5d77f] transition-colors">
                      {currentBranch.phone}
                    </a>
                  </div>
                </div>
              </div>

              {/* Badges */}
              <div className="mt-6 pt-5 border-t border-white/10 grid grid-cols-2 gap-3">
                <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center gap-2.5 text-xs text-slate-300">
                  <Car className="w-4 h-4 text-[#c5a059] shrink-0" />
                  <span>{language === 'kg' ? 'Акысыз токтотуучу жай' : language === 'ru' ? 'Бесплатный паркинг' : 'Free parking available'}</span>
                </div>
                <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center gap-2.5 text-xs text-slate-300">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{language === 'kg' ? 'Жеке VIP кирүү' : language === 'ru' ? 'Приватный VIP вход' : 'Private VIP entrance'}</span>
                </div>
              </div>
            </div>

            {/* Quick Action Navigation Buttons */}
            <div className="pt-4 flex flex-wrap gap-3">
              <a
                href={currentBranch.map2GisUrl}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-3 rounded-xl bg-[#2ecc71] hover:bg-[#27ae60] text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg transition-all"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>{t.locations.open2Gis}</span>
              </a>

              <a
                href={currentBranch.yandexMapUrl}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-3 rounded-xl bg-[#fc3f1d] hover:bg-[#e03719] text-white font-bold text-xs flex items-center gap-2 shadow-lg transition-all"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>{t.locations.openYandex}</span>
              </a>

              <a
                href={`https://wa.me/${currentBranch.whatsapp}?text=${encodeURIComponent(`Саламатсызбы! Мукка спа салонунун ${currentBranch.name.kg} боюнча жазылуу же суроом бар эле.`)}`}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-3 rounded-xl bg-emerald-950 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-900/60 font-bold text-xs flex items-center gap-2 transition-all"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>{t.locations.openWhatsapp}</span>
              </a>
            </div>

          </div>

          {/* Right Image */}
          <div className="lg:col-span-5 rounded-2xl overflow-hidden relative min-h-[320px] border border-white/10">
            <img 
              src={currentBranch.image} 
              alt={currentBranch.name[language]}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            
            <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-xl bg-black/75 backdrop-blur-md border border-[#c5a059]/30 text-xs text-slate-200 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{language === 'kg' ? 'Бишкек шаары боюнча эң ыңгайлуу жайгашуу жана толук купуялуулук' : language === 'ru' ? 'Премиум локации в Бишкеке и абсолютная приватность' : 'Prime Bishkek locations & utter privacy'}</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

