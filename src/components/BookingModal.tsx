import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, User, Phone, Sparkles, CheckCircle2, Heart, Baby, FileText, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Language, ServiceItem, Specialist, Branch, Appointment, ChildDiagnosis } from '../types';
import { TRANSLATIONS } from '../constants/translations';
import { INITIAL_SERVICES, INITIAL_SPECIALISTS, INITIAL_BRANCHES } from '../constants/logosData';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  preselectedService?: ServiceItem | null;
  preselectedSpecialist?: Specialist | null;
  preselectedBranch?: Branch | null;
  onAddAppointment: (appointment: Omit<Appointment, 'id' | 'createdAt'>) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  language,
  preselectedService,
  preselectedSpecialist,
  preselectedBranch,
  onAddAppointment
}) => {
  const t = TRANSLATIONS[language];
  const isKg = language === 'ky';
  const isRu = language === 'ru';
  const isEn = language === 'en';

  const [serviceId, setServiceId] = useState(preselectedService?.id || INITIAL_SERVICES[0].id);
  const [specialistId, setSpecialistId] = useState(preselectedSpecialist?.id || INITIAL_SPECIALISTS[0].id);
  const [branchId, setBranchId] = useState(preselectedBranch?.id || INITIAL_BRANCHES[0].id);
  const [date, setDate] = useState('2026-08-28');
  const [time, setTime] = useState('10:00');
  const [parentName, setParentName] = useState('');
  const [phone, setPhone] = useState('');
  const [childName, setChildName] = useState('');
  const [childAge, setChildAge] = useState<number>(4);
  const [diagnosis, setDiagnosis] = useState<ChildDiagnosis>('ЗПР / ЗПРР (Кечигүү)');
  const [notes, setNotes] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsSuccess(false);
      if (preselectedService) {
        setServiceId(preselectedService.id);
      }
      if (preselectedSpecialist) {
        setSpecialistId(preselectedSpecialist.id);
      }
      if (preselectedBranch) {
        setBranchId(preselectedBranch.id);
      }
    }
  }, [isOpen, preselectedService, preselectedSpecialist, preselectedBranch]);

  if (!isOpen) return null;

  const selectedService = INITIAL_SERVICES.find(s => s.id === serviceId) || INITIAL_SERVICES[0];
  const selectedSpecialist = INITIAL_SPECIALISTS.find(s => s.id === specialistId) || INITIAL_SPECIALISTS[0];

  const availableTimeSlots = [
    { time: '09:00', available: true },
    { time: '10:00', available: true },
    { time: '11:00', available: true },
    { time: '12:00', available: false }, // break
    { time: '14:00', available: true },
    { time: '15:00', available: true },
    { time: '16:00', available: true },
    { time: '17:00', available: true },
    { time: '18:00', available: true },
  ];

  const quickDates = [
    { labelKg: 'Бүгүн (27-Авг)', labelRu: 'Сегодня (27 Авг)', labelEn: 'Today (Aug 27)', val: '2026-08-27' },
    { labelKg: 'Эртең (28-Авг)', labelRu: 'Завтра (28 Авг)', labelEn: 'Tomorrow (Aug 28)', val: '2026-08-28' },
    { labelKg: 'Ишемби (29-Авг)', labelRu: 'Суббота (29 Авг)', labelEn: 'Saturday (Aug 29)', val: '2026-08-29' },
    { labelKg: 'Дүйшөмбү (31-Авг)', labelRu: 'Понедельник (31 Авг)', labelEn: 'Monday (Aug 31)', val: '2026-08-31' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!parentName.trim() || !phone.trim()) {
      alert(isKg ? 'Сураныч, ата-эненин аты-жөнүн жана телефон номерин жазыңыз' : 'Пожалуйста, укажите имя родителя и контактный номер');
      return;
    }

    onAddAppointment({
      childName: childName.trim() || (isKg ? 'Бала' : 'Ребенок'),
      childAge,
      parentName: parentName.trim(),
      phone: phone.trim(),
      serviceId: selectedService.id,
      serviceName: isKg ? selectedService.nameKg : selectedService.nameRu,
      specialistId: selectedSpecialist.id,
      specialistName: selectedSpecialist.name,
      room: selectedSpecialist.roomNumber,
      branchId,
      date,
      time,
      status: 'scheduled',
      paymentStatus: 'unpaid',
      price: selectedService.price,
      notes: notes || `Өзгөчөлүгү: ${diagnosis}`
    });

    setIsSuccess(true);
    confetti({
      particleCount: 90,
      spread: 75,
      origin: { y: 0.5 }
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto">
      <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col my-auto max-h-[94vh]">
        
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-sky-600 via-teal-600 to-emerald-600 text-white flex items-center justify-between shrink-0 shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center text-white shadow-inner">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base leading-tight font-display">
                {isKg ? 'Диагностикага жана сабакка онлайн жазылуу' : isRu ? 'Онлайн запись на диагностику и занятия' : 'Online Diagnostic & Session Booking'}
              </h3>
              <p className="text-xs text-sky-100 font-medium">
                «Логос+» — {isKg ? 'Адистер, бош убакыт жана байланыш маалыматы' : 'Специалисты, свободное время и контакты'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body: All-in-One Form */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 bg-slate-50/50">
          {!isSuccess ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* SECTION 1: 1. КЫЗМАТ ТАНДОО */}
              <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs space-y-3.5">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div className="flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-xl bg-sky-600 text-white font-black text-xs flex items-center justify-center shadow-xs">
                      1
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 font-display">
                        {isKg ? 'Кызмат тандоо' : isRu ? 'Выбор услуги' : 'Select Service'}
                      </h4>
                      <p className="text-[11px] text-slate-500">
                        {isKg ? 'Балаңызга керектүү багытты же диагностиканы тандаңыз' : 'Выберите нужное направление или занятие'}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-black text-sky-700 font-display bg-sky-50 px-2.5 py-1 rounded-lg border border-sky-100">
                    {selectedService.price} сом ({selectedService.durationMinutes} мин)
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                  {INITIAL_SERVICES.map((srv) => {
                    const isSelected = srv.id === serviceId;
                    return (
                      <div
                        key={srv.id}
                        onClick={() => setServiceId(srv.id)}
                        className={`p-3 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? 'border-sky-600 bg-sky-50/90 shadow-sm ring-1 ring-sky-600'
                            : 'border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50/50'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                              {srv.durationMinutes} {isKg ? 'мүнөт' : 'мин'}
                            </span>
                            {isSelected && (
                              <span className="w-4 h-4 rounded-full bg-sky-600 text-white flex items-center justify-center text-[10px]">
                                ✓
                              </span>
                            )}
                          </div>
                          <h5 className="font-bold text-xs text-slate-900 line-clamp-1">
                            {isKg ? srv.nameKg : srv.nameRu}
                          </h5>
                          <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5">
                            {isKg ? srv.descriptionKg : srv.descriptionRu}
                          </p>
                        </div>

                        <div className="mt-2.5 pt-1.5 border-t border-slate-100/80 flex items-center justify-between">
                          <span className="text-xs font-black text-sky-700 font-display">
                            {srv.price.toLocaleString()} сом
                          </span>
                          <span className="text-[9px] font-semibold text-slate-400">
                            {srv.category}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* SECTION 2: 2. АДИС ТАНДОО */}
              <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs space-y-3.5">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div className="flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-xl bg-teal-600 text-white font-black text-xs flex items-center justify-center shadow-xs">
                      2
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 font-display">
                        {isKg ? 'Адис тандоо' : isRu ? 'Выбор специалиста' : 'Select Specialist'}
                      </h4>
                      <p className="text-[11px] text-slate-500">
                        {isKg ? 'Сертификатталган адисти тандаңыз' : 'Выберите эксперта центра'}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-teal-800 bg-teal-50 px-2.5 py-1 rounded-lg border border-teal-100">
                    {selectedSpecialist.name} (Каб. #{selectedSpecialist.roomNumber})
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5">
                  {INITIAL_SPECIALISTS.map((spec) => {
                    const isSelected = spec.id === specialistId;
                    return (
                      <div
                        key={spec.id}
                        onClick={() => setSpecialistId(spec.id)}
                        className={`p-3 rounded-2xl border-2 transition-all cursor-pointer flex flex-col items-center text-center ${
                          isSelected
                            ? 'border-teal-600 bg-teal-50/90 shadow-sm ring-1 ring-teal-600'
                            : 'border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50/50'
                        }`}
                      >
                        <div className="relative mb-2">
                          <img
                            src={spec.photoUrl}
                            alt={spec.name}
                            className="w-14 h-14 rounded-2xl object-cover border-2 border-white shadow-xs"
                          />
                          {isSelected && (
                            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-teal-600 text-white flex items-center justify-center text-[10px] shadow-xs">
                              ✓
                            </span>
                          )}
                        </div>
                        <h5 className="font-bold text-xs text-slate-900 line-clamp-1">
                          {spec.name}
                        </h5>
                        <div className="text-[11px] text-teal-700 font-medium line-clamp-1 mt-0.5">
                          {isKg ? spec.titleKg : spec.titleRu}
                        </div>
                        <div className="text-[10px] text-slate-400 mt-1 flex items-center gap-1 font-semibold">
                          <span>★ {spec.rating}</span>
                          <span>•</span>
                          <span>{spec.experienceYears} {isKg ? 'жыл' : 'лет'}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* SECTION 3 & 4: 3. КҮНДҮ ТАНДОО + 4. БОШ УБАКЫТ ТАНДОО */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                
                {/* 3. КҮНДҮ ТАНДОО */}
                <div className="lg:col-span-6 bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs space-y-3.5">
                  <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
                    <span className="w-7 h-7 rounded-xl bg-indigo-600 text-white font-black text-xs flex items-center justify-center shadow-xs">
                      3
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 font-display">
                        {isKg ? 'Күндү тандоо' : isRu ? 'Выбор дня' : 'Select Date'}
                      </h4>
                      <p className="text-[11px] text-slate-500">
                        {isKg ? 'Ыңгайлуу датаны басыңыз' : 'Выберите день посещения'}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    {quickDates.map((qd) => {
                      const isSelected = date === qd.val;
                      return (
                        <button
                          key={qd.val}
                          type="button"
                          onClick={() => setDate(qd.val)}
                          className={`p-2.5 rounded-xl border text-center transition-all text-xs font-bold ${
                            isSelected
                              ? 'border-indigo-600 bg-indigo-50 text-indigo-950 shadow-xs ring-1 ring-indigo-600'
                              : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                          }`}
                        >
                          <Calendar className={`w-4 h-4 mx-auto mb-1 ${isSelected ? 'text-indigo-600' : 'text-slate-400'}`} />
                          <div>{isKg ? qd.labelKg : isRu ? qd.labelRu : qd.labelEn}</div>
                        </button>
                      );
                    })}
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">
                      {isKg ? 'Же башка датаны тандаңыз:' : 'Или выберите точную дату:'}
                    </label>
                    <input
                      type="date"
                      value={date}
                      min="2026-08-27"
                      max="2026-12-31"
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-300 focus:outline-indigo-500 font-bold text-slate-800"
                    />
                  </div>
                </div>

                {/* 4. БОШ УБАКЫТ ТАНДОО */}
                <div className="lg:col-span-6 bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs space-y-3.5">
                  <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
                    <span className="w-7 h-7 rounded-xl bg-emerald-600 text-white font-black text-xs flex items-center justify-center shadow-xs">
                      4
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 font-display">
                        {isKg ? 'Бош убакыт тандоо' : isRu ? 'Свободное время' : 'Free Time Slot'}
                      </h4>
                      <p className="text-[11px] text-slate-500">
                        {selectedSpecialist.name} ({date})
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    {availableTimeSlots.map((ts) => {
                      const isSelected = time === ts.time;
                      return (
                        <button
                          key={ts.time}
                          type="button"
                          disabled={!ts.available}
                          onClick={() => setTime(ts.time)}
                          className={`py-2 px-1.5 rounded-xl border text-xs font-bold transition-all flex flex-col items-center justify-center ${
                            !ts.available
                              ? 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed line-through opacity-60'
                              : isSelected
                              ? 'bg-emerald-50 border-emerald-600 text-emerald-950 shadow-xs ring-1 ring-emerald-600'
                              : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
                          }`}
                        >
                          <div className="flex items-center gap-1">
                            <Clock className={`w-3 h-3 ${isSelected ? 'text-emerald-600' : 'text-slate-400'}`} />
                            <span>{ts.time}</span>
                          </div>
                          <span className="text-[9px] font-normal mt-0.5">
                            {ts.available ? (isKg ? 'Бош' : 'Свободно') : (isKg ? 'Бош эмес' : 'Занято')}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-100 flex items-center gap-2 text-[11px] text-emerald-900 font-medium">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{isKg ? 'Тандалган убакыт:' : 'Выбранное время:'} <strong>{date}, саат {time}</strong></span>
                  </div>
                </div>

              </div>

              {/* SECTION 5: 5. АТА-ЭНЕНИН АТЫ + ТЕЛЕФОН + БАЛА ЖӨНҮНДӨ МААЛЫМАТ */}
              <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
                  <span className="w-7 h-7 rounded-xl bg-amber-600 text-white font-black text-xs flex items-center justify-center shadow-xs">
                    5
                  </span>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 font-display">
                      {isKg ? 'Ата-эненин аты + телефон жана баланын маалыматы' : isRu ? 'Имя родителя + телефон и данные ребенка' : 'Parent & Child Information'}
                    </h4>
                    <p className="text-[11px] text-slate-500">
                      {isKg ? 'Байланышуу жана сабакка даярдоо үчүн маалыматтарды толтуруңуз' : 'Укажите контакты для подтверждения записи'}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {isKg ? 'Ата-эненин аты-жөнү *' : 'ФИО родителя *'}
                    </label>
                    <input
                      type="text"
                      placeholder={isKg ? 'Мисалы: Айзада Эмилбекова' : 'Например: Айзада Эмилбекова'}
                      value={parentName}
                      onChange={(e) => setParentName(e.target.value)}
                      required
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 border border-slate-300 focus:outline-sky-500 font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      <Phone className="w-3 h-3 inline text-sky-600 mr-1" />
                      {isKg ? 'Телефон номери (WhatsApp) *' : 'Телефон (WhatsApp) *'}
                    </label>
                    <input
                      type="tel"
                      placeholder="+996 702 123456"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 border border-slate-300 focus:outline-sky-500 font-medium"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      <Baby className="w-3 h-3 inline text-indigo-600 mr-1" />
                      {isKg ? 'Баланын аты-жөнү:' : 'Имя ребенка:'}
                    </label>
                    <input
                      type="text"
                      placeholder={isKg ? 'Амир Э.' : 'Амир Э.'}
                      value={childName}
                      onChange={(e) => setChildName(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 border border-slate-300 focus:outline-sky-500 font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {isKg ? 'Жашы:' : 'Возраст:'}
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={18}
                      value={childAge}
                      onChange={(e) => setChildAge(Number(e.target.value))}
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 border border-slate-300 focus:outline-sky-500 font-medium"
                    />
                  </div>
                </div>

                {/* Diagnosis / Child condition Selection */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {isKg ? 'Баланын өзгөчөлүгү (Диагноз / Суроо):' : 'Особенность развития (Диагноз / Вопрос):'}
                    </label>
                    <select
                      value={diagnosis}
                      onChange={(e) => setDiagnosis(e.target.value as ChildDiagnosis)}
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 border border-slate-300 focus:outline-sky-500 font-medium"
                    >
                      <option value="РАС / Аутизм спектри">РАС / Аутизм спектри</option>
                      <option value="Аутизм (Классикалык)">Аутизм (Классикалык)</option>
                      <option value="ДЦП (Церебралдык шал)">ДЦП (Церебралдык шал)</option>
                      <option value="ЗПР / ЗПРР (Кечигүү)">ЗПР / ЗПРР (Кеп жана психикалык кечигүү)</option>
                      <option value="Дислалия / Дизартрия">Дислалия / Дизартрия (Тыбыштар бузулган)</option>
                      <option value="Мотордук / Сенсордук алалия">Мотордук же сенсордук алалия</option>
                      <option value="Кекечтенүү (Заикание)">Кекечтенүү (Заикание)</option>
                      <option value="СДВГ / Гиперактивдүүлүк">СДВГ / Гиперактивдүүлүк</option>
                      <option value="Сенсордук дисфункция">Сенсордук дисфункция</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {isKg ? 'Кошумча суроолор же каалоолор:' : 'Дополнительные пожелания:'}
                    </label>
                    <input
                      type="text"
                      placeholder={isKg ? 'Мисалы: Биринчи жолу келебиз' : 'Например: Придем впервые'}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 border border-slate-300 focus:outline-sky-500 font-medium"
                    />
                  </div>
                </div>
              </div>

              {/* SUMMARY BAR & ЖАЗЫЛУУ БАСКЫЧЫ */}
              <div className="bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 rounded-2xl p-4 sm:p-5 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-1 text-left w-full sm:w-auto">
                  <div className="text-xs text-sky-300 font-bold flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>{isKg ? 'Жалпы тандалган параметрлер:' : 'Итоговые параметры записи:'}</span>
                  </div>
                  <div className="font-extrabold text-sm sm:text-base text-white font-display flex flex-wrap items-center gap-2">
                    <span>{isKg ? selectedService.nameKg : selectedService.nameRu}</span>
                    <span className="text-amber-400 font-black">({selectedService.price} сом)</span>
                  </div>
                  <div className="text-xs text-slate-300 flex flex-wrap items-center gap-2">
                    <span>👤 {selectedSpecialist.name}</span>
                    <span>•</span>
                    <span>📅 {date}, {time}</span>
                    <span>•</span>
                    <span>📍 Каб. #{selectedSpecialist.roomNumber}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  id="booking-submit-all-in-one-btn"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-black text-sm shadow-xl shadow-emerald-500/25 transition-all flex items-center justify-center gap-2 shrink-0 active:scale-98"
                >
                  <CheckCircle2 className="w-5 h-5" />
                  <span>{isKg ? 'Жазылуу баскычы' : isRu ? 'Подтвердить запись' : 'Confirm Appointment'}</span>
                </button>
              </div>

            </form>
          ) : (
            /* Success confirmation */
            <div className="text-center py-8 space-y-4 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 font-display">
                {isKg ? 'Сиз ийгиликтүү жазылдыңыз!' : 'Вы успешно записаны!'}
              </h4>
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 max-w-md mx-auto text-left text-xs space-y-1.5 text-emerald-950">
                <div className="font-bold">{isKg ? selectedService.nameKg : selectedService.nameRu}</div>
                <div>👤 {isKg ? 'Адис:' : 'Специалист:'} <strong>{selectedSpecialist.name}</strong></div>
                <div>📅 {isKg ? 'Күнү жана убактысы:' : 'Дата и время:'} <strong>{date}, саат {time}</strong></div>
                <div>📱 {isKg ? 'Ата-эне:' : 'Родитель:'} <strong>{parentName} ({phone})</strong></div>
              </div>
              <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
                {isKg 
                  ? `Биз сизди «Логос+» борборунда күтөбүз. WhatsApp аркылуу эскертме жөнөтүлдү.` 
                  : `Ждем вас в центре «Логос+». Подтверждение отправлено на ваш WhatsApp.`}
              </p>

              <button
                onClick={() => {
                  setIsSuccess(false);
                  onClose();
                }}
                className="px-8 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-md"
              >
                {isKg ? 'Түшүндүм / Жабуу' : 'Понятно / Закрыть'}
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

