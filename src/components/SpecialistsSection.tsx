import React from 'react';
import { Star, Award, Calendar, Phone, Sparkles, MapPin } from 'lucide-react';
import { Language, Specialist } from '../types';
import { TRANSLATIONS } from '../constants/translations';
import { INITIAL_SPECIALISTS } from '../constants/logosData';

interface SpecialistsSectionProps {
  language: Language;
  onOpenBookingWithSpecialist: (specialist: Specialist) => void;
}

export const SpecialistsSection: React.FC<SpecialistsSectionProps> = ({
  language,
  onOpenBookingWithSpecialist
}) => {
  const t = TRANSLATIONS[language];
  const isKg = language === 'ky';

  return (
    <section id="specialists-section" className="py-20 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-sky-600" />
            <span>{isKg ? 'Квалификациялуу команда' : 'Команда профессионалов'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
            {t.specialists.title}
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            {t.specialists.subtitle}
          </p>
        </div>

        {/* Specialists Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {INITIAL_SPECIALISTS.map((spec) => (
            <div
              key={spec.id}
              className="rounded-3xl bg-white border border-slate-200/80 p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                {/* Photo & Rating Header */}
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img
                      src={spec.photoUrl}
                      alt={spec.name}
                      className="w-18 h-18 rounded-2xl object-cover border-2 border-sky-100 shadow-md group-hover:scale-105 transition-transform"
                    />
                    <span className="absolute -bottom-2 -right-1 bg-amber-400 text-slate-950 font-black text-[10px] px-1.5 py-0.5 rounded-full flex items-center gap-0.5 shadow-xs">
                      <Star className="w-2.5 h-2.5 fill-slate-950" />
                      {spec.rating}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h3 className="font-bold text-base text-slate-900 font-display">
                      {spec.name}
                    </h3>
                    <p className="text-xs font-bold text-sky-600">
                      {isKg ? spec.titleKg : spec.titleRu}
                    </p>
                    <div className="flex items-center gap-1 text-[11px] text-slate-500">
                      <Award className="w-3.5 h-3.5 text-teal-600" />
                      <span>{spec.experienceYears} {isKg ? 'жыл тажрыйба' : 'лет стажа'}</span>
                    </div>
                  </div>
                </div>

                {/* Bio text */}
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                  {isKg ? spec.bioKg : spec.bioRu}
                </p>

                {/* Specialization Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {spec.specializationTags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Assigned Room */}
                <div className="flex items-center gap-1.5 text-xs text-slate-500 pt-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{spec.roomNumber}</span>
                </div>
              </div>

              {/* Bottom Action Button */}
              <div className="pt-6 mt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-slate-400 font-medium">
                    {isKg ? 'Сабак баасы:' : 'Стоимость:'}
                  </div>
                  <div className="text-sm font-black text-slate-900">
                    {spec.hourlyRate} сом
                  </div>
                </div>

                <button
                  onClick={() => onOpenBookingWithSpecialist(spec)}
                  className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold shadow-md shadow-sky-600/20 flex items-center gap-1.5 transition-all active:scale-95"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{t.specialists.bookWithMe}</span>
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
