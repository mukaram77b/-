import React from 'react';
import { X, Clock, Calendar, CheckCircle2, Heart, Sparkles, MessageCircle, ArrowRight, Stethoscope } from 'lucide-react';
import { Language, ServiceItem } from '../types';
import { INITIAL_SPECIALISTS, INITIAL_BRANCHES } from '../constants/logosData';

interface ServiceDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: ServiceItem | null;
  language: Language;
  onBookService: (service: ServiceItem) => void;
}

export const ServiceDetailsModal: React.FC<ServiceDetailsModalProps> = ({
  isOpen,
  onClose,
  service,
  language,
  onBookService
}) => {
  if (!isOpen || !service) return null;

  const isKg = language === 'ky';
  const isRu = language === 'ru';

  const matchedSpecialist = INITIAL_SPECIALISTS.find(spec => {
    if (service.category === 'логопедия' && spec.role.includes('логопед')) return true;
    if (service.category === 'дефектолог' && spec.role.includes('дефектолог')) return true;
    if (service.category === 'сенсорика' && spec.role.includes('сенсордук')) return true;
    if (service.category === 'ава' && spec.role.includes('ава')) return true;
    if (service.category === 'афк' && spec.role.includes('афк')) return true;
    return false;
  }) || INITIAL_SPECIALISTS[0];

  const serviceName = isKg ? service.nameKg : isRu ? service.nameRu : service.nameKg;
  const serviceDesc = isKg ? service.descriptionKg : isRu ? service.descriptionRu : service.descriptionKg;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with playful gradient */}
        <div className="p-6 bg-gradient-to-r from-sky-600 via-teal-600 to-emerald-600 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-all"
            aria-label="Жабуу"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider backdrop-blur-xs">
              {service.category.toUpperCase()}
            </span>
            {service.isPopular && (
              <span className="px-3 py-1 rounded-full bg-amber-400 text-amber-950 text-xs font-black flex items-center gap-1 shadow-xs">
                <Sparkles className="w-3.5 h-3.5" />
                {isKg ? 'Көп тандалган' : 'Популярная'}
              </span>
            )}
          </div>

          <h2 className="text-xl sm:text-2xl font-black font-display tracking-tight leading-snug">
            {serviceName}
          </h2>
          <p className="text-xs sm:text-sm text-sky-100 mt-1">
            «Логос+» — Балдардын кебин жана өнүгүүсүн калыбына келтирүү
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* Key Quick Info Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-2xl bg-sky-50 border border-sky-100 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sky-600 text-white flex items-center justify-center font-black">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] text-slate-500 font-semibold">{isKg ? 'Узактыгы' : 'Длительность'}</div>
                <div className="text-sm font-black text-slate-900">{service.durationMinutes} {isKg ? 'мүнөт' : 'мин'}</div>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-black">
                <Heart className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] text-slate-500 font-semibold">{isKg ? 'Баасы' : 'Стоимость'}</div>
                <div className="text-sm font-black text-emerald-700">{service.price.toLocaleString()} сом</div>
              </div>
            </div>

            <div className="col-span-2 sm:col-span-1 p-3.5 rounded-2xl bg-amber-50 border border-amber-100 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center font-black">
                <Stethoscope className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] text-slate-500 font-semibold">{isKg ? 'Форматы' : 'Формат'}</div>
                <div className="text-xs font-black text-amber-950">{isKg ? 'Жеке сабак' : 'Индивидуально'}</div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h3 className="text-sm font-black text-slate-900 font-display flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-sky-600"></span>
              {isKg ? 'Кызмат тууралуу толук маалымат:' : 'Подробное описание услуги:'}
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
              {serviceDesc}
            </p>
          </div>

          {/* Target Conditions / Кимдерге сунушталат */}
          <div className="space-y-2.5">
            <h3 className="text-sm font-black text-slate-900 font-display flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-teal-600"></span>
              {isKg ? 'Кандай учурларда сунушталат?' : 'Показания и кому подходит:'}
            </h3>
            <div className="flex flex-wrap gap-2">
              {service.targetConditions.map((cond, idx) => (
                <span 
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-50 border border-teal-200 text-teal-900 text-xs font-bold"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                  {cond}
                </span>
              ))}
            </div>
          </div>

          {/* Specialist Mini Card */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-50 to-sky-50/50 border border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img 
                src={matchedSpecialist.photoUrl} 
                alt={matchedSpecialist.name}
                className="w-12 h-12 rounded-2xl object-cover border-2 border-white shadow-xs"
              />
              <div>
                <div className="text-[11px] text-sky-700 font-bold">{isKg ? 'Жетектөөчү адис:' : 'Ведущий специалист:'}</div>
                <div className="text-sm font-black text-slate-900">{matchedSpecialist.name}</div>
                <div className="text-[11px] text-slate-500">{isKg ? matchedSpecialist.titleKg : matchedSpecialist.titleRu}</div>
              </div>
            </div>
            <div className="text-right hidden sm:block">
              <div className="text-[11px] text-slate-500 font-semibold">{isKg ? 'Стажы' : 'Стаж'}</div>
              <div className="text-xs font-black text-slate-900">{matchedSpecialist.experienceYears} {isKg ? 'жыл' : 'лет'}</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={() => {
                onClose();
                onBookService(service);
              }}
              className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-sky-600 via-teal-600 to-emerald-600 hover:from-sky-700 hover:to-emerald-700 text-white font-black text-sm shadow-lg shadow-sky-600/25 active:scale-98 transition-all"
            >
              <Calendar className="w-4 h-4" />
              <span>{isKg ? 'Бул кызматка жазылуу' : 'Записаться на эту услугу'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href={`https://wa.me/996705554433?text=${encodeURIComponent(`Саламатсызбы! Мен «Логос+» борборунун «${serviceName}» кызматы боюнча сурап жатам.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs shadow-md shadow-emerald-500/20 active:scale-98 transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp</span>
            </a>
          </div>

        </div>
      </div>
    </div>
  );
};
