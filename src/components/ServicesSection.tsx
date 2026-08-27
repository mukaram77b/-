import React, { useState } from 'react';
import { 
  Stethoscope, 
  Mic, 
  Brain, 
  Activity, 
  HeartHandshake, 
  Footprints, 
  CalendarCheck, 
  Layers, 
  Award, 
  Sparkles, 
  Clock, 
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { Language, ServiceCategory, ServiceItem } from '../types';
import { TRANSLATIONS } from '../constants/translations';
import { INITIAL_SERVICES } from '../constants/logosData';

interface ServicesSectionProps {
  language: Language;
  onOpenBookingWithService: (service: ServiceItem) => void;
  onOpenServiceDetails?: (service: ServiceItem) => void;
  onOpenPosWithService?: (service: ServiceItem) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  language,
  onOpenBookingWithService,
  onOpenServiceDetails,
  onOpenPosWithService
}) => {
  const t = TRANSLATIONS[language];
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: t.services.allCategories },
    { id: 'диагностика', label: t.services.diagnosticTab },
    { id: 'логопедия', label: t.services.speechTab },
    { id: 'дефектолог', label: t.services.defectTab },
    { id: 'сенсорика', label: t.services.sensoryTab },
    { id: 'ава', label: t.services.abaTab },
    { id: 'афк', label: t.services.afkTab },
    { id: 'комплекс', label: t.services.packagesTab },
  ];

  const filteredServices = selectedCategory === 'all'
    ? INITIAL_SERVICES
    : INITIAL_SERVICES.filter(s => s.category === selectedCategory);

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Stethoscope': return Stethoscope;
      case 'Mic': return Mic;
      case 'Brain': return Brain;
      case 'Activity': return Activity;
      case 'HeartHandshake': return HeartHandshake;
      case 'Footprints': return Footprints;
      case 'CalendarCheck': return CalendarCheck;
      case 'Layers': return Layers;
      case 'Award': return Award;
      default: return Sparkles;
    }
  };

  return (
    <section id="services-section" className="py-20 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-teal-100 text-teal-800 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            <span>Прайс-лист жана Программалар</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
            {t.services.title}
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            {t.services.subtitle}
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto gap-2 pb-6 mb-8 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold shrink-0 transition-all ${
                selectedCategory === cat.id
                  ? 'bg-sky-600 text-white shadow-md shadow-sky-600/20'
                  : 'bg-white text-slate-600 hover:bg-slate-200/70 border border-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => {
            const Icon = getServiceIcon(service.icon);
            const isPackage = service.category === 'комплекс';

            return (
              <div
                key={service.id}
                className={`rounded-3xl p-6 transition-all duration-300 flex flex-col justify-between relative ${
                  isPackage 
                    ? 'bg-gradient-to-b from-sky-900 to-slate-900 text-white shadow-xl border border-sky-800'
                    : 'bg-white text-slate-900 border border-slate-200/80 hover:shadow-lg'
                }`}
              >
                {/* Popular badge */}
                {service.isPopular && (
                  <span className={`absolute top-4 right-4 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold tracking-wider uppercase ${
                    isPackage ? 'bg-amber-400 text-slate-950' : 'bg-sky-100 text-sky-800 border border-sky-200'
                  }`}>
                    {language === 'ky' ? 'Популярдуу' : 'Популярно'}
                  </span>
                )}

                <div className="space-y-4">
                  {/* Icon & Category */}
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                      isPackage 
                        ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30' 
                        : 'bg-sky-50 text-sky-600 border border-sky-100'
                    }`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <span className={`text-[11px] font-bold uppercase tracking-wider ${
                        isPackage ? 'text-sky-300' : 'text-slate-400'
                      }`}>
                        {service.category}
                      </span>
                      <div className="flex items-center gap-1 text-xs text-slate-400">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{service.durationMinutes} {t.services.min}</span>
                      </div>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 
                    onClick={() => onOpenServiceDetails ? onOpenServiceDetails(service) : onOpenBookingWithService(service)}
                    className={`text-base font-bold leading-snug cursor-pointer hover:underline ${
                      isPackage ? 'text-white hover:text-amber-300' : 'text-slate-900 hover:text-sky-600'
                    } font-display`}
                  >
                    {language === 'ky' ? service.nameKg : service.nameRu}
                  </h3>

                  {/* Description */}
                  <p className={`text-xs leading-relaxed ${
                    isPackage ? 'text-slate-300' : 'text-slate-600'
                  }`}>
                    {language === 'ky' ? service.descriptionKg : service.descriptionRu}
                  </p>

                  {/* Target tags */}
                  <div className="pt-2 flex flex-wrap gap-1.5">
                    {service.targetConditions.map((cond, idx) => (
                      <span
                        key={idx}
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${
                          isPackage 
                            ? 'bg-white/10 text-sky-200' 
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        ✓ {cond}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Price and Booking Actions */}
                <div className={`pt-6 mt-5 border-t flex items-center justify-between ${
                  isPackage ? 'border-sky-800/80' : 'border-slate-100'
                }`}>
                  <div>
                    <div className={`text-[11px] font-medium ${
                      isPackage ? 'text-slate-400' : 'text-slate-500'
                    }`}>
                      {t.services.priceFrom}
                    </div>
                    <div className="text-xl font-black font-display tracking-tight">
                      {service.price.toLocaleString()} <span className="text-xs font-bold">{t.services.som}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {onOpenServiceDetails && (
                      <button
                        type="button"
                        onClick={() => onOpenServiceDetails(service)}
                        className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all active:scale-95 ${
                          isPackage
                            ? 'border-sky-700 hover:bg-sky-800/50 text-sky-200'
                            : 'border-slate-200 hover:bg-slate-100 text-slate-700'
                        }`}
                        title={language === 'ky' ? 'Толук маалымат' : 'Подробнее'}
                      >
                        {language === 'ky' ? 'Маалымат' : 'Инфо'}
                      </button>
                    )}

                    <button
                      onClick={() => onOpenBookingWithService(service)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all active:scale-95 ${
                        isPackage
                          ? 'bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-md shadow-amber-400/20'
                          : 'bg-sky-600 hover:bg-sky-700 text-white shadow-md shadow-sky-600/20'
                      }`}
                    >
                      <span>{t.services.bookThis}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Disability Discount Notice Banner */}
        <div className="mt-12 p-6 rounded-3xl bg-gradient-to-r from-teal-500 to-sky-600 text-white flex flex-col md:flex-row items-center justify-between gap-4 shadow-lg shadow-sky-500/10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="text-base font-bold">
                {language === 'ky' ? 'Майыптыгы бар балдарга жана көп балалуу үй-бүлөлөргө 10% - 15% жеңилдик!' : 'Скидки 10% - 15% для детей с инвалидностью и многодетных семей!'}
              </h4>
              <p className="text-xs text-teal-100">
                {language === 'ky' ? 'Биз ар бир баланын толук кандуу өнүгүүсүнө бирдей мүмкүнчүлүк түзөбүз.' : 'Мы стремимся сделать качественную коррекционную помощь доступной для каждой семьи.'}
              </p>
            </div>
          </div>
          <button
            onClick={() => onOpenBookingWithService(INITIAL_SERVICES[0])}
            className="px-5 py-2.5 rounded-xl bg-white text-teal-900 hover:bg-teal-50 text-xs font-extrabold shrink-0 shadow-xs transition-all"
          >
            {language === 'ky' ? 'Толук маалымат алуу' : 'Узнать подробнее'}
          </button>
        </div>

      </div>
    </section>
  );
};
