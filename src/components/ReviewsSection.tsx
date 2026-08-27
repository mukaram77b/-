import React from 'react';
import { Language } from '../types/spa';
import { TRANSLATIONS } from '../constants/translations';
import { CUSTOMER_REVIEWS } from '../constants/spaData';
import { Star, MessageSquare, Quote, CheckCircle } from 'lucide-react';

interface ReviewsSectionProps {
  language: Language;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ language }) => {
  const t = TRANSLATIONS[language];

  return (
    <section className="py-20 bg-[#070b0e] relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#c5a059]/30 bg-[#16221c] text-[#f5d77f] text-xs font-semibold tracking-wider uppercase mb-3">
            <MessageSquare className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>{t.reviews.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
            {t.reviews.title}
          </h2>
          <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
            {t.reviews.subtitle}
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CUSTOMER_REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="p-7 rounded-3xl border border-white/10 bg-[#0e141a] hover:border-[#c5a059]/40 transition-all flex flex-col justify-between space-y-5 relative group"
            >
              <Quote className="absolute top-6 right-6 w-8 h-8 text-white/5 group-hover:text-[#c5a059]/10 transition-colors" />

              <div>
                {/* Rating Stars */}
                <div className="flex items-center justify-between">
                  <div className="flex text-[#f5d77f]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs text-slate-400">{rev.date}</span>
                </div>

                {/* Comment Text */}
                <p className="mt-4 text-sm text-slate-200 leading-relaxed font-normal">
                  "{rev.comment[language]}"
                </p>

                {/* Service Tag */}
                <div className="mt-4 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[11px] text-[#f5d77f]">
                  <span className="text-slate-400">{language === 'kg' ? 'Кызмат:' : language === 'ru' ? 'Услуга:' : 'Service:'}</span>
                  <span className="font-semibold">{rev.serviceName}</span>
                </div>
              </div>

              {/* Author Footer */}
              <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white font-serif flex items-center gap-1.5">
                    <span>{rev.authorName}</span>
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  </h4>
                  <span className="text-xs text-slate-400">{rev.city}</span>
                </div>

                <span className="text-xs text-emerald-400 font-medium">
                  {language === 'kg' ? 'Мастер:' : language === 'ru' ? 'Мастер:' : 'Therapist:'} {rev.therapistName}
                </span>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
