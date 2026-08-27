import React from 'react';
import { Language } from '../types/spa';
import { TRANSLATIONS } from '../constants/translations';
import { MEMBERSHIP_TIERS } from '../constants/spaData';
import { 
  Sparkles, 
  Check, 
  Gift, 
  Crown, 
  ChevronRight, 
  Heart,
  ShieldCheck
} from 'lucide-react';

interface MembershipsSectionProps {
  language: Language;
  onOpenBooking: () => void;
  onOpenGiftCard: () => void;
}

export const MembershipsSection: React.FC<MembershipsSectionProps> = ({
  language,
  onOpenBooking,
  onOpenGiftCard
}) => {
  const t = TRANSLATIONS[language];

  return (
    <section id="membership" className="py-20 bg-[#0a0e13] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#c5a059]/30 bg-[#16221c] text-[#f5d77f] text-xs font-semibold tracking-wider uppercase mb-3">
            <Crown className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>{t.memberships.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
            {t.memberships.title}
          </h2>
          <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
            {t.memberships.subtitle}
          </p>
        </div>

        {/* Memberships Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {MEMBERSHIP_TIERS.map((tier) => (
            <div
              key={tier.id}
              className={`rounded-3xl border p-7 flex flex-col justify-between transition-all duration-300 relative ${tier.badgeColor} ${
                tier.featured 
                  ? 'border-[#c5a059] shadow-2xl shadow-[#c5a059]/20 lg:-translate-y-2 ring-1 ring-[#c5a059]/30' 
                  : 'border-white/10 hover:border-white/20'
              }`}
            >
              {tier.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-[#c5a059] to-[#e6ca85] text-slate-950 font-bold text-[11px] uppercase tracking-wider shadow-lg flex items-center gap-1.5">
                  <Crown className="w-3.5 h-3.5" />
                  <span>{language === 'kg' ? 'Эң көп тандалган' : language === 'ru' ? 'Премиум выбор' : 'Most Popular'}</span>
                </div>
              )}

              <div>
                <span className="text-xs font-bold text-[#c5a059] uppercase tracking-wider">
                  {tier.sessionsCount}
                </span>

                <h3 className="text-xl font-serif font-bold text-white mt-1">
                  {tier.name}
                </h3>

                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  {tier.tierSubtitle[language]}
                </p>

                {/* Price */}
                <div className="mt-6 mb-6 pb-6 border-b border-white/10 flex items-baseline gap-1.5">
                  <span className="text-3xl font-bold text-[#f5d77f]">
                    {tier.monthlyPrice.toLocaleString()}
                  </span>
                  <span className="text-sm text-slate-300 font-medium">{t.currency}</span>
                  <span className="text-xs text-slate-400">{t.memberships.perMonth}</span>
                </div>

                {/* Perks list */}
                <div className="space-y-3">
                  {tier.perks[language].map((perk, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                      <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5" />
                      </div>
                      <span>{perk}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Button */}
              <button
                onClick={onOpenBooking}
                className={`mt-8 w-full py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  tier.featured
                    ? 'bg-gradient-to-r from-[#c5a059] to-[#e6ca85] text-slate-950 shadow-lg shadow-[#c5a059]/25 hover:brightness-110'
                    : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'
                }`}
              >
                <span>{t.memberships.getMembership}</span>
                <ChevronRight className="w-4 h-4" />
              </button>

            </div>
          ))}
        </div>

        {/* Gift Certificate CTA Banner */}
        <div className="mt-16 rounded-3xl border border-[#c5a059]/40 bg-gradient-to-r from-[#17120a] via-[#10171a] to-[#121921] p-8 sm:p-10 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#c5a059] to-[#8c6b2d] flex items-center justify-center text-slate-950 shrink-0 shadow-xl shadow-[#c5a059]/20">
              <Gift className="w-8 h-8" />
            </div>
            <div>
              <span className="text-xs font-bold text-[#f5d77f] uppercase tracking-wider">
                {language === 'kg' ? 'Эң жакшы белек' : language === 'ru' ? 'Премиальный подарок' : 'The Perfect Gift'}
              </span>
              <h3 className="text-2xl font-serif font-bold text-white mt-1">
                {t.memberships.giftCertTitle}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl mt-2 leading-relaxed">
                {t.memberships.giftCertDesc}
              </p>
            </div>
          </div>

          <button
            onClick={onOpenGiftCard}
            className="px-7 py-4 rounded-xl bg-gradient-to-r from-[#c5a059] via-[#f7e4a8] to-[#c5a059] text-slate-950 font-bold text-xs uppercase tracking-wider shadow-xl shadow-[#c5a059]/25 hover:brightness-110 active:scale-98 transition-all shrink-0 flex items-center gap-2 cursor-pointer"
          >
            <Gift className="w-4 h-4" />
            <span>{t.memberships.orderGiftCert}</span>
          </button>
        </div>

      </div>
    </section>
  );
};
