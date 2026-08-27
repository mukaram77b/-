import React from 'react';
import { Brain, Sparkles, HeartHandshake, Footprints, Mic, Smile, Activity, ChevronRight } from 'lucide-react';
import { Language, ServiceItem } from '../types';
import { TRANSLATIONS } from '../constants/translations';
import { INITIAL_SERVICES } from '../constants/logosData';

interface ConditionsSectionProps {
  language: Language;
  onOpenBooking: () => void;
  onOpenBookingWithService?: (service: ServiceItem) => void;
  onOpenServiceDetails?: (service: ServiceItem) => void;
}

export const ConditionsSection: React.FC<ConditionsSectionProps> = ({
  language,
  onOpenBooking,
  onOpenBookingWithService,
  onOpenServiceDetails
}) => {
  const t = TRANSLATIONS[language];

  const conditionCards = [
    {
      id: 'asd',
      title: t.conditions.asdTitle,
      desc: t.conditions.asdDesc,
      icon: HeartHandshake,
      color: 'from-sky-500 to-indigo-600',
      bgColor: 'bg-sky-50',
      borderColor: 'border-sky-200',
      textColor: 'text-sky-900',
      tag: 'РАС / Аутизм',
      serviceId: 'srv-6',
      methods: ['АВА терапия', 'PECS коммуникация', 'Сенсордук адаптация', 'Визуалдык расписание']
    },
    {
      id: 'cp',
      title: t.conditions.cpTitle,
      desc: t.conditions.cpDesc,
      icon: Footprints,
      color: 'from-teal-500 to-emerald-600',
      bgColor: 'bg-teal-50',
      borderColor: 'border-teal-200',
      textColor: 'text-teal-900',
      tag: 'ДЦП Реабилитация',
      serviceId: 'srv-7',
      methods: ['АФК көнүгүүлөрү', 'Спастиканы басуу', 'Балансирлер', 'Кинезиотейпинг']
    },
    {
      id: 'zpr',
      title: t.conditions.zprTitle,
      desc: t.conditions.zprDesc,
      icon: Brain,
      color: 'from-amber-500 to-orange-600',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200',
      textColor: 'text-amber-900',
      tag: 'ЗПР / ЗПРР',
      serviceId: 'srv-4',
      methods: ['Дефектолог', 'Нейроигралар', 'Эс-тутумду өнүктүрүү', 'Сөз байлыгын арттыруу']
    },
    {
      id: 'speech',
      title: t.conditions.speechTitle,
      desc: t.conditions.speechDesc,
      icon: Mic,
      color: 'from-violet-500 to-purple-600',
      bgColor: 'bg-violet-50',
      borderColor: 'border-violet-200',
      textColor: 'text-violet-900',
      tag: 'Кеп коррекциясы',
      serviceId: 'srv-3',
      methods: ['Зонддук массаж', 'Тыбыштарды коюу', 'Фонематика', 'Артикуляция']
    },
    {
      id: 'alalia',
      title: t.conditions.alaliaTitle,
      desc: t.conditions.alaliaDesc,
      icon: Smile,
      color: 'from-rose-500 to-pink-600',
      bgColor: 'bg-rose-50',
      borderColor: 'border-rose-200',
      textColor: 'text-rose-900',
      tag: 'Алалия / Заикание',
      serviceId: 'srv-2',
      methods: ['Кепти нөлдөн баштоо', 'Сүйлөө деми', 'Логоритмика', 'Томатис терапия']
    },
    {
      id: 'sensory',
      title: language === 'ky' ? 'Сенсордук дисфункция & СДВГ' : 'Сенсорная дисфункция и СДВГ',
      desc: language === 'ky' 
        ? 'Гиперактивдүүлүк, катуу үн жана тийүүдөн коркуу, дененин мейкиндиктеги абалын сезе албоо.' 
        : 'Гиперактивность, дефицит внимания, сенсорные перегрузки, вестибулярная гипер/гипо-чувствительность.',
      icon: Activity,
      color: 'from-blue-500 to-cyan-600',
      bgColor: 'bg-cyan-50',
      borderColor: 'border-cyan-200',
      textColor: 'text-cyan-900',
      tag: 'Сенсордук интеграция',
      serviceId: 'srv-5',
      methods: ['Сенсордук качели', 'Сухой бассейн', 'Батут жана шаты', 'Гравитациялык көнүгүүлөр']
    }
  ];

  return (
    <section className="py-18 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-sky-600" />
            <span>Адистештирилген Багыттар</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
            {t.conditions.title}
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            {t.conditions.subtitle}
          </p>
        </div>

        {/* 6 High-Contrast Condition Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {conditionCards.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className={`rounded-3xl p-6 ${item.bgColor} border ${item.borderColor} hover:shadow-lg transition-all duration-300 flex flex-col justify-between group`}
              >
                <div className="space-y-4">
                  {/* Top Icon & Tag */}
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${item.color} text-white flex items-center justify-center shadow-md shadow-slate-900/10 group-hover:scale-105 transition-transform`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-white/80 border border-slate-200/60 text-slate-700">
                      {item.tag}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-1.5">
                    <h3 className={`text-lg font-bold ${item.textColor} font-display`}>
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  {/* Methods pills */}
                  <div className="pt-2">
                    <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                      {language === 'ky' ? 'Колдонулган методдор:' : 'Применяемые методики:'}
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {item.methods.map((method, idx) => (
                        <span 
                          key={idx}
                          className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700"
                        >
                          • {method}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom CTA */}
                <div className="pt-6 mt-4 border-t border-slate-200/60 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => {
                      const matched = INITIAL_SERVICES.find(s => s.id === item.serviceId);
                      if (matched) {
                        if (onOpenServiceDetails) {
                          onOpenServiceDetails(matched);
                        } else if (onOpenBookingWithService) {
                          onOpenBookingWithService(matched);
                        } else {
                          onOpenBooking();
                        }
                      } else {
                        onOpenBooking();
                      }
                    }}
                    className="text-xs font-bold text-sky-700 hover:text-sky-800 flex items-center gap-1 group-hover:translate-x-1 transition-transform cursor-pointer"
                  >
                    <span>{language === 'ky' ? 'Бул багыт боюнча толук маалымат / жазылуу' : 'Подробнее о направлении и запись'}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
