import React from 'react';
import { Language } from '../types/spa';
import { TRANSLATIONS } from '../constants/translations';
import { MASTER_THERAPISTS } from '../constants/spaData';
import { 
  Award, 
  Star, 
  MapPin, 
  Calendar, 
  Sparkles, 
  CheckCircle2, 
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

interface TherapistsSectionProps {
  language: Language;
  onSelectTherapistForBooking: (therapistId: string) => void;
}

export const TherapistsSection: React.FC<TherapistsSectionProps> = ({
  language,
  onSelectTherapistForBooking
}) => {
  const t = TRANSLATIONS[language];

  return (
    <section id="craftsmen" className="py-20 bg-[#0a0e13] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#c5a059]/30 bg-[#16221c] text-[#f5d77f] text-xs font-semibold tracking-wider uppercase mb-3">
            <Award className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>{t.therapists.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
            {t.therapists.title}
          </h2>
          <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
            {t.therapists.subtitle}
          </p>
        </div>

        {/* Master Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {MASTER_THERAPISTS.map((therapist) => (
            <div
              key={therapist.id}
              className="rounded-2xl border border-white/10 bg-[#0e141a] overflow-hidden flex flex-col justify-between hover:border-[#c5a059]/50 hover:shadow-2xl hover:shadow-black/70 transition-all duration-300 group"
            >
              {/* Photo & Rating Overlay */}
              <div className="relative h-64 overflow-hidden bg-slate-900">
                <img 
                  src={therapist.photo} 
                  alt={therapist.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e141a] via-transparent to-black/30" />

                {/* Rating Badge */}
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-[#070b0e]/85 border border-white/15 text-xs font-bold text-[#f5d77f] flex items-center gap-1 backdrop-blur-md">
                  <Star className="w-3.5 h-3.5 fill-[#f5d77f]" />
                  <span>{therapist.rating}</span>
                  <span className="text-[10px] text-slate-400 font-normal">({therapist.reviewCount})</span>
                </div>

                {/* Experience Badge */}
                <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-md bg-[#c5a059] text-slate-950 text-[11px] font-bold shadow-md">
                  {therapist.experienceYears} {t.therapists.experienceYears}
                </div>
              </div>

              {/* Content Details */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-lg font-serif font-bold text-white group-hover:text-[#f5d77f] transition-colors">
                    {therapist.name}
                  </h3>
                  <p className="text-xs font-medium text-[#c5a059] leading-snug mt-1">
                    {therapist.title[language]}
                  </p>
                  
                  <p className="text-xs text-slate-300 leading-relaxed mt-3 line-clamp-3">
                    {therapist.bio[language]}
                  </p>

                  {/* Specialties */}
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {therapist.specialties[language].map((spec, idx) => (
                      <span 
                        key={idx}
                        className="px-2 py-0.5 rounded text-[10px] bg-white/[0.04] border border-white/10 text-slate-300"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>

                  {/* Branch info */}
                  <div className="mt-4 pt-3 border-t border-white/5 space-y-1.5 text-[11px] text-slate-400">
                    <div className="flex items-center gap-1.5 text-slate-300">
                      <MapPin className="w-3 h-3 text-[#c5a059] shrink-0" />
                      <span className="truncate">{therapist.branch}</span>
                    </div>
                  </div>
                </div>

                {/* Booking Button */}
                <button
                  onClick={() => onSelectTherapistForBooking(therapist.id)}
                  className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-[#c5a059] text-slate-200 hover:text-slate-950 font-bold text-xs uppercase tracking-wider border border-white/10 hover:border-[#c5a059] transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{t.therapists.bookWithTherapist}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
