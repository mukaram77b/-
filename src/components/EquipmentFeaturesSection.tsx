import React from 'react';
import { Sparkles, ShieldCheck, Activity, Award, CheckCircle } from 'lucide-react';
import { Language } from '../types';

interface EquipmentFeaturesSectionProps {
  language: Language;
}

export const EquipmentFeaturesSection: React.FC<EquipmentFeaturesSectionProps> = ({ language }) => {
  const isKg = language === 'ky';

  const equipmentList = [
    {
      title: isKg ? 'Сенсордук динамикалык зал' : 'Сенсорный динамический зал',
      desc: isKg 
        ? 'Сенсордук качели, сухой бассейн (топтор менен), гравитациялык шатылар, батут жана тактильдик жолчолор.'
        : 'Сенсорные качели-гамаки, сухой бассейн с шариками, шведские стенки, батуты и тактильные дорожки.',
      imageUrl: 'https://images.unsplash.com/photo-1596464716127-f2a829822301?auto=format&fit=crop&w=600&q=80',
      badge: 'Айрес методу'
    },
    {
      title: isKg ? 'Логопедиялык зонддор жана массаж' : 'Логопедические зонды и массаж',
      desc: isKg 
        ? 'Новикова зонддору, тилдин булчуң тонусун калыбына келтирүүчү титирөөчү аппараттар жана артикуляциялык тренажерлор.'
        : 'Зонды Новиковой, вибромассажеры для мышц артикуляционного аппарата и специальные тренажеры выдоха.',
      imageUrl: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=600&q=80',
      badge: 'Медициналык стандарт'
    },
    {
      title: isKg ? 'АВА терапия жана PECS карточкалары' : 'Кабинеты АВА и система PECS',
      desc: isKg 
        ? 'Аутизм спектриндеги балдар үчүн визуалдык колдоо, карточкалык байланыш (PECS) жана мотивациялык чөйрө.'
        : 'Зонированные кабинеты для тестирования VB-MAPP, карточки PECS, визуальные таймеры и обучающие наборы.',
      imageUrl: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=600&q=80',
      badge: 'RBT / IBA протокол'
    },
    {
      title: isKg ? 'АФК жана Кинезио аянтчасы' : 'Зал АФК и кинезиотерапии',
      desc: isKg 
        ? 'ДЦП жана кыймыл-аракети бузулган балдар үчүн балансирлер, фитболдор, салмактуу жилеттер жана тренажерлор.'
        : 'Балансировочные доски Бильгоу, утяжеленные одеяла и жилеты, реабилитационные брусья для ходьбы.',
      imageUrl: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=600&q=80',
      badge: 'Мотордук реабилитация'
    }
  ];

  return (
    <section className="py-20 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>{isKg ? 'Заманбап жабдуулар жана ыкмалар' : 'Оснащение и специализированные зоны'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
            {isKg ? 'Эмне үчүн «Логос+» борборун тандашат?' : 'Почему родители доверяют центру «Логос+»?'}
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            {isKg 
              ? 'Бизде ар бир бала үчүн атайын коопсуз, антиаллергендүү жана профессионалдуу коррекциялык чөйрө түзүлгөн.' 
              : 'Каждый зал и кабинет оборудован согласно международным стандартам нейрокоррекции и сенсорной интеграции.'}
          </p>
        </div>

        {/* 4 Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {equipmentList.map((item, idx) => (
            <div 
              key={idx}
              className="rounded-3xl overflow-hidden bg-slate-50 border border-slate-200/80 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={item.imageUrl} 
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-sky-600 text-white shadow-xs">
                  {item.badge}
                </span>
              </div>

              <div className="p-5 space-y-2 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 text-base leading-snug font-display">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-4 flex items-center gap-1.5 text-[11px] font-bold text-sky-700">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>{isKg ? 'Сертификатталган жабдуу' : 'Сертифицированное оснащение'}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quality Guarantee Guarantee Box */}
        <div className="mt-12 p-6 rounded-3xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-sky-500/20 text-sky-400 border border-sky-500/30 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-bold">
                {isKg ? 'Далилдүү педагогика жана коопсуздук кепилдиги' : 'Доказательная педагогика и гарантия безопасности'}
              </h4>
              <p className="text-xs text-slate-400 mt-1 max-w-2xl">
                {isKg 
                  ? 'Бардык адистерибиздин диплому жана сертификаттары бар. Сабактардын жыйынтыгы ата-энелер порталында график түрүндө чагылдырылып турат.' 
                  : 'Все специалисты имеют высшее профильное образование и международную сертификацию. Динамика ребенка фиксируется в личном кабинете.'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="px-4 py-2 rounded-xl bg-white/10 text-xs font-bold text-white border border-white/10">
              Лицензия №4829-КР
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};
