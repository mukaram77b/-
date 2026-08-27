import React, { useState } from 'react';
import { Language, BodySymptomMatch } from '../types/spa';
import { TRANSLATIONS } from '../constants/translations';
import { BODY_SYMPTOMS, SERVICES_LIST } from '../constants/spaData';
import { 
  Sparkles, 
  Activity, 
  Shield, 
  Flame, 
  Smile, 
  Sun, 
  ChevronRight, 
  CheckCircle,
  HelpCircle
} from 'lucide-react';

interface MassageBenefitsSectionProps {
  language: Language;
  onSelectServiceForBooking: (serviceId: string) => void;
}

export const MassageBenefitsSection: React.FC<MassageBenefitsSectionProps> = ({
  language,
  onSelectServiceForBooking
}) => {
  const [activeSymptomId, setActiveSymptomId] = useState<string>(BODY_SYMPTOMS[0].id);
  const t = TRANSLATIONS[language];

  const activeSymptom = BODY_SYMPTOMS.find(s => s.id === activeSymptomId) || BODY_SYMPTOMS[0];
  const matchedService = SERVICES_LIST.find(s => s.id === activeSymptom.recommendedServiceId);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Activity': return <Activity className="w-5 h-5 text-amber-400" />;
      case 'Shield': return <Shield className="w-5 h-5 text-emerald-400" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-[#f5d77f]" />;
      case 'Flame': return <Flame className="w-5 h-5 text-rose-400" />;
      case 'Smile': return <Smile className="w-5 h-5 text-cyan-400" />;
      default: return <Sun className="w-5 h-5 text-amber-300" />;
    }
  };

  return (
    <section id="bodymap" className="py-20 bg-[#070b0e] relative overflow-hidden border-t border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-950/40 text-emerald-300 text-xs font-semibold tracking-wider uppercase mb-3">
            <Activity className="w-3.5 h-3.5" />
            <span>{t.bodyMatcher.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
            {t.bodyMatcher.title}
          </h2>
          <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
            {t.bodyMatcher.subtitle}
          </p>
        </div>

        {/* Interactive Grid & Recommendation Box */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Symptom Selectors */}
          <div className="lg:col-span-6 space-y-3">
            {BODY_SYMPTOMS.map((symptom) => {
              const isSelected = symptom.id === activeSymptomId;
              return (
                <button
                  key={symptom.id}
                  onClick={() => setActiveSymptomId(symptom.id)}
                  className={`w-full p-4 rounded-2xl border text-left transition-all flex items-center justify-between gap-4 cursor-pointer ${
                    isSelected 
                      ? 'bg-[#121921] border-[#c5a059] shadow-xl shadow-black/60 ring-1 ring-[#c5a059]/40'
                      : 'bg-[#0b1015]/60 border-white/10 hover:border-white/20 hover:bg-[#0e141a]'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      isSelected ? 'bg-[#c5a059]/20 border border-[#c5a059]/40' : 'bg-white/5 border border-white/10'
                    }`}>
                      {getIcon(symptom.icon)}
                    </div>
                    <div>
                      <h4 className={`text-sm font-semibold leading-snug ${isSelected ? 'text-[#f5d77f]' : 'text-slate-200'}`}>
                        {symptom.title[language]}
                      </h4>
                      <span className="text-[11px] text-slate-400">
                        {language === 'kg' ? 'Сунушталган убакыт:' : language === 'ru' ? 'Рекомендуемое время:' : 'Duration:'} {symptom.recommendedDuration}
                      </span>
                    </div>
                  </div>

                  <ChevronRight className={`w-5 h-5 shrink-0 transition-transform ${isSelected ? 'text-[#f5d77f] translate-x-1' : 'text-slate-500'}`} />
                </button>
              );
            })}
          </div>

          {/* Right Column: Matched Treatment & Advice Card */}
          <div className="lg:col-span-6">
            <div className="p-6 sm:p-8 rounded-2xl border border-[#c5a059]/30 bg-gradient-to-b from-[#111822] to-[#0a0e14] shadow-2xl space-y-6">
              
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <span className="text-xs font-bold text-[#c5a059] uppercase tracking-wider flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#f5d77f]" />
                  {t.bodyMatcher.recommendedTreatment}
                </span>
                <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 font-medium">
                  {language === 'kg' ? '100% Натыйжа' : language === 'ru' ? 'Высокая эффективность' : 'High Relief'}
                </span>
              </div>

              {/* Advice */}
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200/90 leading-relaxed flex items-start gap-3">
                <HelpCircle className="w-4 h-4 text-[#f5d77f] shrink-0 mt-0.5" />
                <p>{activeSymptom.advice[language]}</p>
              </div>

              {/* Matched Service Card Preview */}
              {matchedService && (
                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-4">
                  <div className="flex gap-4 items-center">
                    <img 
                      src={matchedService.image} 
                      alt={matchedService.name[language]}
                      className="w-20 h-20 rounded-lg object-cover shrink-0 border border-white/10"
                    />
                    <div>
                      <h3 className="text-base font-serif font-bold text-white">
                        {matchedService.name[language]}
                      </h3>
                      <p className="text-xs text-slate-300 line-clamp-2 mt-1">
                        {matchedService.tagline[language]}
                      </p>
                      <div className="mt-2 text-sm font-bold text-[#f5d77f]">
                        {matchedService.price.toLocaleString()} {t.currency} • {matchedService.durationMin} {language === 'kg' ? 'мүнөт' : language === 'ru' ? 'мин' : 'min'}
                      </div>
                    </div>
                  </div>

                  {/* Key Benefits */}
                  <div className="space-y-1.5 pt-2 border-t border-white/5">
                    {matchedService.benefits[language].slice(0, 3).map((ben, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{ben}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => onSelectServiceForBooking(matchedService.id)}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-[#c5a059] to-[#e6ca85] text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg hover:brightness-110 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
                  >
                    <span>{t.bodyMatcher.takeThisSession}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
