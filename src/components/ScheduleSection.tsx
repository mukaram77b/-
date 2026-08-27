import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  User, 
  MapPin, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  Plus, 
  Filter, 
  MessageSquare, 
  DollarSign,
  ChevronLeft,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { Language, Appointment, AppointmentStatus } from '../types';
import { TRANSLATIONS } from '../constants/translations';
import { INITIAL_SPECIALISTS, INITIAL_BRANCHES } from '../constants/logosData';

interface ScheduleSectionProps {
  language: Language;
  appointments: Appointment[];
  onUpdateAppointmentStatus: (id: string, status: AppointmentStatus) => void;
  onOpenBookingModal: () => void;
}

export const ScheduleSection: React.FC<ScheduleSectionProps> = ({
  language,
  appointments,
  onUpdateAppointmentStatus,
  onOpenBookingModal
}) => {
  const t = TRANSLATIONS[language];
  const isKg = language === 'ky';

  const [selectedDate, setSelectedDate] = useState<string>('2026-08-28');
  const [selectedBranchId, setSelectedBranchId] = useState<string>('all');
  const [selectedSpecialistId, setSelectedSpecialistId] = useState<string>('all');

  const filteredAppointments = appointments.filter((app) => {
    const matchesDate = !selectedDate || app.date === selectedDate;
    const matchesBranch = selectedBranchId === 'all' || app.branchId === selectedBranchId;
    const matchesSpecialist = selectedSpecialistId === 'all' || app.specialistId === selectedSpecialistId;
    return matchesDate && matchesBranch && matchesSpecialist;
  });

  const getStatusBadge = (status: AppointmentStatus) => {
    switch (status) {
      case 'completed':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            <span>{isKg ? 'Өттү' : 'Завершено'}</span>
          </span>
        );
      case 'cancelled':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800 flex items-center gap-1">
            <XCircle className="w-3 h-3 text-rose-600" />
            <span>{isKg ? 'Жокко чыгарылды' : 'Отменено'}</span>
          </span>
        );
      case 'in-progress':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-sky-100 text-sky-800 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-sky-600 animate-spin" />
            <span>{isKg ? 'Сабак жүрүүдө' : 'Идет занятие'}</span>
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 flex items-center gap-1">
            <Clock className="w-3 h-3 text-amber-600" />
            <span>{isKg ? 'Күтүлүүдө' : 'Запланировано'}</span>
          </span>
        );
    }
  };

  const generateWhatsAppReminder = (app: Appointment) => {
    const message = isKg
      ? `Саламатсызбы, ${app.parentName}! «Логос+» борборунан эскертме: Сиздин балаңыз ${app.childName} үчүн ${app.date} күнү саат ${app.time}де адис ${app.specialistName} менен сабак белгиленген. Суроолор болсо байланышыңыз!`
      : `Здравствуйте, ${app.parentName}! Напоминаем о занятии в центре «Логос+»: ${app.date} в ${app.time} (${app.serviceName}, специалист: ${app.specialistName}).`;

    return `https://wa.me/${app.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
  };

  return (
    <section className="py-8 bg-slate-100/70 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Top Schedule Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-sky-600 text-white flex items-center justify-center shadow-md shadow-sky-600/20">
              <CalendarIcon className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900 font-display">
                {t.schedule.title}
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                {t.schedule.subtitle}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenBookingModal}
              className="px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold shadow-md shadow-sky-600/20 flex items-center gap-1.5 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>{isKg ? 'Жаңы сабак кошуу' : 'Добавить запись'}</span>
            </button>
          </div>
        </div>

        {/* Filters and Date Bar */}
        <div className="p-4 bg-white rounded-2xl border border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-4 h-4 text-sky-600" />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-3 py-1.5 text-xs font-bold rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-sky-500"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <select
              value={selectedBranchId}
              onChange={(e) => setSelectedBranchId(e.target.value)}
              className="px-3 py-1.5 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-700 font-medium"
            >
              <option value="all">{isKg ? 'Бардык филиалдар' : 'Все филиалы'}</option>
              {INITIAL_BRANCHES.map((b) => (
                <option key={b.id} value={b.id}>
                  {isKg ? b.nameKg : b.nameRu}
                </option>
              ))}
            </select>

            <select
              value={selectedSpecialistId}
              onChange={(e) => setSelectedSpecialistId(e.target.value)}
              className="px-3 py-1.5 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-700 font-medium"
            >
              <option value="all">{isKg ? 'Бардык адистер' : 'Все специалисты'}</option>
              {INITIAL_SPECIALISTS.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Schedule Timetable Grid */}
        <div className="space-y-3">
          {filteredAppointments.length > 0 ? (
            filteredAppointments.map((app) => (
              <div
                key={app.id}
                className="bg-white rounded-3xl p-5 border border-slate-200/80 hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                {/* Time & Room badge */}
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-sky-50 rounded-2xl border border-sky-100 text-center shrink-0 w-20">
                    <div className="text-base font-black text-sky-900">{app.time}</div>
                    <div className="text-[10px] text-sky-600 font-bold">{app.room}</div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-sm text-slate-900">
                        {app.childName} ({app.childAge} {t.crm.ageYears})
                      </h4>
                      {getStatusBadge(app.status)}
                    </div>
                    
                    <p className="text-xs text-sky-700 font-semibold">
                      {app.serviceName} • {app.price} сом
                    </p>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                      <span>Адис: <strong className="text-slate-700">{app.specialistName}</strong></span>
                      <span>•</span>
                      <span>Ата-эне: <strong className="text-slate-700">{app.parentName}</strong></span>
                    </div>

                    {app.notes && (
                      <p className="text-[11px] text-slate-500 italic bg-slate-50 px-2.5 py-1 rounded-lg">
                        {app.notes}
                      </p>
                    )}
                  </div>
                </div>

                {/* Actions: Change Status & WhatsApp reminder */}
                <div className="flex flex-wrap items-center gap-2 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100">
                  <a
                    href={generateWhatsAppReminder(app)}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-xl text-xs font-bold flex items-center gap-1 border border-emerald-200 transition-all"
                    title="WhatsApp эскертме жөнөтүү"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>

                  {app.status === 'scheduled' && (
                    <button
                      onClick={() => onUpdateAppointmentStatus(app.id, 'in-progress')}
                      className="px-3 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold transition-all"
                    >
                      {isKg ? 'Сабакты баштоо' : 'Начать'}
                    </button>
                  )}

                  {app.status === 'in-progress' && (
                    <button
                      onClick={() => onUpdateAppointmentStatus(app.id, 'completed')}
                      className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all"
                    >
                      {isKg ? 'Аяктоо (Өттү)' : 'Завершить'}
                    </button>
                  )}

                  {app.status !== 'cancelled' && app.status !== 'completed' && (
                    <button
                      onClick={() => onUpdateAppointmentStatus(app.id, 'cancelled')}
                      className="px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-600 text-xs font-bold transition-all"
                    >
                      {isKg ? 'Жокко чыгаруу' : 'Отмена'}
                    </button>
                  )}
                </div>

              </div>
            ))
          ) : (
            <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 space-y-3">
              <CalendarIcon className="w-10 h-10 text-slate-300 mx-auto" />
              <div className="font-bold text-slate-700 text-sm">
                {isKg ? 'Бул күн үчүн сабактар табылган жок' : 'На этот день занятий не найдено'}
              </div>
              <button
                onClick={onOpenBookingModal}
                className="px-4 py-2 bg-sky-600 text-white rounded-xl text-xs font-bold hover:bg-sky-700"
              >
                {isKg ? 'Сабак белгилөө' : 'Записать на этот день'}
              </button>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};
