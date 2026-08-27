import React, { useState } from 'react';
import { 
  Users, 
  Calendar as CalendarIcon, 
  Clock, 
  Plus, 
  Search, 
  Filter, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  MessageSquare, 
  Phone, 
  Brain, 
  Award, 
  BarChart3, 
  UserPlus, 
  ArrowLeft, 
  Lock, 
  Check, 
  AlertCircle, 
  Eye, 
  LogOut,
  MapPin,
  CalendarCheck,
  ChevronRight,
  RefreshCw,
  X,
  CreditCard,
  Wallet,
  TrendingUp,
  FileText,
  DollarSign,
  Layers,
  ChevronLeft,
  Printer,
  Download
} from 'lucide-react';
import { 
  Language, 
  ChildPatient, 
  Lead, 
  Appointment, 
  Specialist, 
  AppointmentStatus,
  ChildDiagnosis,
  ServiceItem,
  Branch,
  PaymentRecord,
  SpecialistTimeSlot
} from '../types';
import { TRANSLATIONS } from '../constants/translations';
import { INITIAL_SPECIALISTS, INITIAL_BRANCHES, INITIAL_SERVICES } from '../constants/logosData';

interface AdminPanelSectionProps {
  language: Language;
  patients: ChildPatient[];
  leads: Lead[];
  appointments: Appointment[];
  specialists: Specialist[];
  payments: PaymentRecord[];
  timeSlots: SpecialistTimeSlot[];
  onAddPatient: (patient: ChildPatient) => void;
  onUpdatePatient: (patient: ChildPatient) => void;
  onConvertLeadToPatient: (lead: Lead) => void;
  onAddAppointment: (appointment: Omit<Appointment, 'id' | 'createdAt'>) => void;
  onUpdateAppointmentStatus: (id: string, status: AppointmentStatus) => void;
  onAddPayment: (payment: PaymentRecord) => void;
  onToggleTimeSlot: (slotId: string) => void;
  onReturnToWebsite: () => void;
  onLogoutAdmin: () => void;
}

export const AdminPanelSection: React.FC<AdminPanelSectionProps> = ({
  language,
  patients,
  leads,
  appointments,
  specialists,
  payments,
  timeSlots,
  onAddPatient,
  onUpdatePatient,
  onConvertLeadToPatient,
  onAddAppointment,
  onUpdateAppointmentStatus,
  onAddPayment,
  onToggleTimeSlot,
  onReturnToWebsite,
  onLogoutAdmin
}) => {
  const t = TRANSLATIONS[language];
  const isKg = language === 'ky';
  const isRu = language === 'ru';

  // 7 Admin Tabs requested by the user:
  // 1. Календарь (calendar)
  // 2. Кардарлар (clients)
  // 3. Жазылуулар (appointments)
  // 4. Адистер (specialists)
  // 5. Бош убакыт (time_slots)
  // 6. Төлөмдөр (payments)
  // 7. Отчеттор (reports)
  const [adminTab, setAdminTab] = useState<
    'calendar' | 'clients' | 'appointments' | 'specialists' | 'time_slots' | 'payments' | 'reports'
  >('calendar');

  // Calendar & Schedule Filter State
  const [selectedDate, setSelectedDate] = useState<string>('2026-08-27');
  const [calendarView, setCalendarView] = useState<'day' | 'week'>('day');
  const [filterSpecialistId, setFilterSpecialistId] = useState<string>('all');
  const [filterRoom, setFilterRoom] = useState<string>('all');
  const [appointmentSearch, setAppointmentSearch] = useState<string>('');

  // Clients Filter State
  const [clientSearch, setClientSearch] = useState<string>('');
  const [clientDiagnosisFilter, setClientDiagnosisFilter] = useState<string>('all');
  const [selectedPatient, setSelectedPatient] = useState<ChildPatient | null>(null);

  // Payments Filter State
  const [paymentMethodFilter, setPaymentMethodFilter] = useState<string>('all');
  const [paymentSearch, setPaymentSearch] = useState<string>('');

  // Modals state
  const [isAddAppointmentOpen, setIsAddAppointmentOpen] = useState(false);
  const [isAddPatientOpen, setIsAddPatientOpen] = useState(false);
  const [isAddPaymentOpen, setIsAddPaymentOpen] = useState(false);

  // New Manual Appointment Form State
  const [newAppChildName, setNewAppChildName] = useState('');
  const [newAppChildAge, setNewAppChildAge] = useState<number>(4);
  const [newAppParentName, setNewAppParentName] = useState('');
  const [newAppPhone, setNewAppPhone] = useState('');
  const [newAppServiceId, setNewAppServiceId] = useState(INITIAL_SERVICES[0].id);
  const [newAppSpecialistId, setNewAppSpecialistId] = useState(specialists[0].id);
  const [newAppBranchId, setNewAppBranchId] = useState(INITIAL_BRANCHES[0].id);
  const [newAppDate, setNewAppDate] = useState('2026-08-27');
  const [newAppTime, setNewAppTime] = useState('11:00');
  const [newAppNotes, setNewAppNotes] = useState('');

  // New Patient Form State
  const [newPatientName, setNewPatientName] = useState('');
  const [newPatientAge, setNewPatientAge] = useState<number>(4);
  const [newPatientGender, setNewPatientGender] = useState<'male' | 'female'>('male');
  const [newPatientDiagnosis, setNewPatientDiagnosis] = useState<ChildDiagnosis>('ЗПР / ЗПРР (Кечигүү)');
  const [newPatientParent, setNewPatientParent] = useState('');
  const [newPatientPhone, setNewPatientPhone] = useState('');
  const [newPatientSpecialistId, setNewPatientSpecialistId] = useState(specialists[0].id);
  const [newPatientLessons, setNewPatientLessons] = useState<number>(12);
  const [newPatientNotes, setNewPatientNotes] = useState('');

  // New Payment Form State
  const [newPayChildName, setNewPayChildName] = useState('');
  const [newPayParentName, setNewPayParentName] = useState('');
  const [newPayPhone, setNewPayPhone] = useState('');
  const [newPayAmount, setNewPayAmount] = useState<number>(9000);
  const [newPayMethod, setNewPayMethod] = useState<'mbank' | 'odengi' | 'cash' | 'elkart' | 'visa'>('mbank');
  const [newPayServiceType, setNewPayServiceType] = useState<
    'subscription_12' | 'subscription_8' | 'single_lesson' | 'diagnostic' | 'sensory' | 'other'
  >('subscription_12');
  const [newPayServiceName, setNewPayServiceName] = useState('Абонемент (12 сабак)');
  const [newPayNotes, setNewPayNotes] = useState('');

  // Filtered Appointments
  const filteredAppointments = appointments.filter((app) => {
    const matchesDate = adminTab === 'appointments' ? true : (!selectedDate || app.date === selectedDate);
    const matchesSpecialist = filterSpecialistId === 'all' || app.specialistId === filterSpecialistId;
    const matchesSearch = !appointmentSearch || 
      app.childName.toLowerCase().includes(appointmentSearch.toLowerCase()) ||
      app.parentName.toLowerCase().includes(appointmentSearch.toLowerCase()) ||
      app.phone.includes(appointmentSearch);
    return matchesDate && matchesSpecialist && matchesSearch;
  });

  // Filtered Patients
  const filteredPatients = patients.filter((p) => {
    const matchesSearch = !clientSearch || 
      p.name.toLowerCase().includes(clientSearch.toLowerCase()) ||
      p.parentName.toLowerCase().includes(clientSearch.toLowerCase()) ||
      p.phone.includes(clientSearch);
    const matchesDiagnosis = clientDiagnosisFilter === 'all' || p.diagnosis === clientDiagnosisFilter;
    return matchesSearch && matchesDiagnosis;
  });

  // Filtered Payments
  const filteredPayments = payments.filter((pay) => {
    const matchesMethod = paymentMethodFilter === 'all' || pay.paymentMethod === paymentMethodFilter;
    const matchesSearch = !paymentSearch || 
      pay.childName.toLowerCase().includes(paymentSearch.toLowerCase()) ||
      pay.parentName.toLowerCase().includes(paymentSearch.toLowerCase()) ||
      pay.receiptNumber.toLowerCase().includes(paymentSearch.toLowerCase());
    return matchesMethod && matchesSearch;
  });

  // Total Revenue Calculation
  const totalRevenue = payments.reduce((sum, p) => p.status === 'paid' ? sum + p.amount : sum, 0);
  const todayRevenue = payments
    .filter(p => p.date === '2026-08-27' && p.status === 'paid')
    .reduce((sum, p) => sum + p.amount, 0);

  const getStatusBadge = (status: AppointmentStatus) => {
    switch (status) {
      case 'completed':
        return (
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            <span>{isKg ? 'Өттү' : isRu ? 'Завершено' : 'Completed'}</span>
          </span>
        );
      case 'cancelled':
        return (
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800 flex items-center gap-1">
            <XCircle className="w-3 h-3 text-rose-600" />
            <span>{isKg ? 'Калтырылды' : isRu ? 'Отменено' : 'Cancelled'}</span>
          </span>
        );
      case 'in-progress':
        return (
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-sky-100 text-sky-800 flex items-center gap-1 animate-pulse">
            <Sparkles className="w-3 h-3 text-sky-600" />
            <span>{isKg ? 'Сабак өтүүдө' : isRu ? 'Идет занятие' : 'In Progress'}</span>
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 flex items-center gap-1">
            <Clock className="w-3 h-3 text-amber-600" />
            <span>{isKg ? 'Күтүлүүдө' : isRu ? 'Запланировано' : 'Scheduled'}</span>
          </span>
        );
    }
  };

  const generateWhatsAppReminder = (app: Appointment) => {
    const message = isKg
      ? `Саламатсызбы, ${app.parentName}! «Логос+» логопедия борборунан эскертме: Сиздин балаңыз ${app.childName} үчүн ${app.date} күнү саат ${app.time}де адис ${app.specialistName} менен сабак белгиленген. Суроолор болсо байланышыңыз: +996 705 55-44-33`
      : `Здравствуйте, ${app.parentName}! Напоминаем о записи в центр «Логос+»: ${app.date} в ${app.time} (${app.serviceName}, специалист: ${app.specialistName}). По всем вопросам: +996 (705) 55-44-33`;

    return `https://wa.me/${app.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
  };

  const handleCreateAppointmentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const service = INITIAL_SERVICES.find(s => s.id === newAppServiceId) || INITIAL_SERVICES[0];
    const specialist = specialists.find(s => s.id === newAppSpecialistId) || specialists[0];

    onAddAppointment({
      childName: newAppChildName || (isKg ? 'Бала' : 'Ребенок'),
      childAge: newAppChildAge,
      parentName: newAppParentName || (isKg ? 'Ата-эне' : 'Родитель'),
      phone: newAppPhone || '+996 700 000000',
      serviceId: service.id,
      serviceName: isKg ? service.nameKg : service.nameRu,
      specialistId: specialist.id,
      specialistName: specialist.name,
      room: specialist.roomNumber,
      branchId: newAppBranchId,
      date: newAppDate,
      time: newAppTime,
      status: 'scheduled',
      paymentStatus: 'unpaid',
      price: service.price,
      notes: newAppNotes || 'Администратор тарабынан түзүлдү'
    });

    setIsAddAppointmentOpen(false);
    setNewAppChildName('');
    setNewAppParentName('');
    setNewAppPhone('');
    setNewAppNotes('');
  };

  const handleCreatePatientSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const assignedSpec = specialists.find(s => s.id === newPatientSpecialistId) || specialists[0];
    
    const newPatient: ChildPatient = {
      id: `p-${Date.now()}`,
      name: newPatientName,
      birthDate: '2022-01-01',
      age: newPatientAge,
      gender: newPatientGender,
      diagnosis: newPatientDiagnosis,
      parentName: newPatientParent,
      phone: newPatientPhone,
      branchId: 'branch-1',
      assignedSpecialistId: assignedSpec.id,
      assignedSpecialistName: assignedSpec.name,
      remainingLessons: newPatientLessons,
      totalSessionsCompleted: 0,
      status: 'active',
      avatarUrl: newPatientGender === 'male' 
        ? 'https://images.unsplash.com/photo-1543332164-6e82f355badc?auto=format&fit=crop&w=300&q=80'
        : 'https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?auto=format&fit=crop&w=300&q=80',
      speechScore: 35,
      sensoryScore: 40,
      motorScore: 50,
      socialScore: 40,
      notes: newPatientNotes,
      createdAt: new Date().toISOString().split('T')[0]
    };

    onAddPatient(newPatient);
    setIsAddPatientOpen(false);
    setNewPatientName('');
    setNewPatientParent('');
    setNewPatientPhone('');
    setNewPatientNotes('');
  };

  const handleCreatePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newRecord: PaymentRecord = {
      id: `pay-${Date.now()}`,
      childName: newPayChildName || (isKg ? 'Бала' : 'Ребенок'),
      parentName: newPayParentName || (isKg ? 'Ата-эне' : 'Родитель'),
      phone: newPayPhone || '+996 700 000000',
      amount: Number(newPayAmount),
      paymentMethod: newPayMethod,
      serviceType: newPayServiceType,
      serviceName: newPayServiceName,
      receiptNumber: `CHK-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toISOString().split('T')[0],
      time: new Date().toTimeString().slice(0, 5),
      status: 'paid',
      notes: newPayNotes || 'Касса аркылуу төлөндү'
    };

    onAddPayment(newRecord);
    setIsAddPaymentOpen(false);
    setNewPayChildName('');
    setNewPayParentName('');
    setNewPayPhone('');
    setNewPayNotes('');
  };

  const navTabs = [
    { id: 'calendar', labelKg: '1. Календарь', labelRu: '1. Календарь', labelEn: '1. Calendar', icon: CalendarIcon },
    { id: 'clients', labelKg: '2. Кардарлар', labelRu: '2. Клиенты', labelEn: '2. Clients', icon: Users },
    { id: 'appointments', labelKg: '3. Жазылуулар', labelRu: '3. Записи', labelEn: '3. Appointments', icon: CalendarCheck },
    { id: 'specialists', labelKg: '4. Адистер', labelRu: '4. Специалисты', labelEn: '4. Specialists', icon: Award },
    { id: 'time_slots', labelKg: '5. Бош убакыт', labelRu: '5. Свободное время', labelEn: '5. Free Slots', icon: Clock },
    { id: 'payments', labelKg: '6. Төлөмдөр', labelRu: '6. Платежи', labelEn: '6. Payments', icon: CreditCard },
    { id: 'reports', labelKg: '7. Отчеттор', labelRu: '7. Отчеты', labelEn: '7. Reports', icon: BarChart3 },
  ];

  return (
    <div className="w-full bg-slate-100 min-h-screen pb-20">
      
      {/* Top Admin Header Bar */}
      <div className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-sky-500 text-white flex items-center justify-center font-bold text-sm shadow-md shadow-sky-500/20">
              Л+
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-bold text-sm sm:text-base leading-tight font-display">
                  {isKg ? '«Логос+» Администратор Кабинети' : isRu ? 'Кабинет Администратора «Логос+»' : 'Logos+ Admin Panel'}
                </h1>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-sky-900/80 text-sky-300 border border-sky-700/50">
                  {isKg ? 'Конфиденциалдуу' : 'Служебный вход'}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                {isKg 
                  ? 'Календарь, кардарлар, жазылуулар, адистер, бош убакыт, төлөмдөр жана отчеттор' 
                  : 'Календарь, клиенты, записи, специалисты, свободные слоты, платежи и отчеты'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setIsAddAppointmentOpen(true)}
              className="px-3.5 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">{isKg ? 'Жаңы жазылуу' : 'Новая запись'}</span>
            </button>

            <button
              onClick={onReturnToWebsite}
              className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{isKg ? 'Сайтка өтүү' : 'На сайт'}</span>
            </button>

            <button
              onClick={onLogoutAdmin}
              title={isKg ? 'Чыгуу' : 'Выйти'}
              className="p-2 rounded-xl bg-rose-950/60 hover:bg-rose-900 text-rose-300 border border-rose-800/40 transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* The 7 Admin Tabs Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-x-auto border-t border-slate-800/80">
          <div className="flex items-center gap-1 py-1.5 min-w-[700px]">
            {navTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = adminTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setAdminTab(tab.id as any)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-sky-600 text-white shadow-sm shadow-sky-600/30'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{isKg ? tab.labelKg : isRu ? tab.labelRu : tab.labelEn}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Admin Workspace Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">

        {/* 1. КАЛЕНДАРЬ TAB */}
        {adminTab === 'calendar' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            
            {/* Top Calendar Toolbar */}
            <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center">
                  <CalendarIcon className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900 font-display">
                    {isKg ? '1. Календарь жана Күндүк Торчо' : '1. Календарь и Сетка занятий'}
                  </h2>
                  <p className="text-xs text-slate-500">
                    {isKg ? 'Сабактардын жана адистердин күнүмдүк графиги' : 'Расписание занятий по кабинетам и специалистам'}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="px-3.5 py-2 text-xs rounded-xl bg-slate-50 border border-slate-300 font-bold text-slate-800 focus:outline-sky-500"
                />

                <select
                  value={filterSpecialistId}
                  onChange={(e) => setFilterSpecialistId(e.target.value)}
                  className="px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-300 font-medium text-slate-700 focus:outline-sky-500"
                >
                  <option value="all">{isKg ? 'Бардык адистер' : 'Все специалисты'}</option>
                  {specialists.map(s => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>

                <button
                  onClick={() => setIsAddAppointmentOpen(true)}
                  className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>{isKg ? 'Сабак кошуу' : 'Добавить'}</span>
                </button>
              </div>
            </div>

            {/* Daily Schedule Time Grid */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                <div className="font-bold text-xs text-slate-700 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-sky-600" />
                  <span>{selectedDate} — {filteredAppointments.length} {isKg ? 'сабак белгиленген' : 'записей'}</span>
                </div>
                <div className="text-xs text-slate-500 flex items-center gap-3">
                  <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span> {isKg ? 'Өттү' : 'Проведено'}</span>
                  <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block"></span> {isKg ? 'Күтүлүүдө' : 'Ожидание'}</span>
                  <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block"></span> {isKg ? 'Калтырылды' : 'Отмена'}</span>
                </div>
              </div>

              {filteredAppointments.length > 0 ? (
                <div className="divide-y divide-slate-100">
                  {filteredAppointments.map((app) => (
                    <div key={app.id} className="p-4 sm:px-6 hover:bg-slate-50/80 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      
                      <div className="flex items-start gap-4">
                        <div className="px-3 py-2 rounded-2xl bg-sky-50 border border-sky-200 text-sky-900 font-bold text-xs text-center shrink-0">
                          <Clock className="w-3.5 h-3.5 mx-auto text-sky-600 mb-0.5" />
                          <span>{app.time}</span>
                        </div>

                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-bold text-sm text-slate-900">
                              {app.childName} ({app.childAge} {isKg ? 'жаш' : 'лет'})
                            </h4>
                            {getStatusBadge(app.status)}
                          </div>
                          
                          <div className="text-xs text-slate-600 mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
                            <span className="font-semibold text-sky-700">{app.serviceName}</span>
                            <span>•</span>
                            <span>👤 {app.specialistName}</span>
                            <span>•</span>
                            <span className="text-slate-500">🚪 {app.room || 'Кабинет №1'}</span>
                          </div>

                          <div className="text-[11px] text-slate-500 mt-1 flex items-center gap-2">
                            <span>Ата-эне: {app.parentName}</span>
                            <span>({app.phone})</span>
                          </div>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                        <a
                          href={generateWhatsAppReminder(app)}
                          target="_blank"
                          rel="noreferrer"
                          className="px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 text-xs font-bold flex items-center gap-1.5 transition-colors"
                        >
                          <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                          <span>WhatsApp</span>
                        </a>

                        <select
                          value={app.status}
                          onChange={(e) => onUpdateAppointmentStatus(app.id, e.target.value as AppointmentStatus)}
                          className="px-2.5 py-1.5 rounded-xl bg-slate-100 border border-slate-300 text-xs font-bold text-slate-700 focus:outline-sky-500"
                        >
                          <option value="scheduled">{isKg ? 'Күтүлүүдө' : 'Запланировано'}</option>
                          <option value="in-progress">{isKg ? 'Сабак өтүүдө' : 'Идет'}</option>
                          <option value="completed">{isKg ? 'Өттү' : 'Завершено'}</option>
                          <option value="cancelled">{isKg ? 'Калтырылды' : 'Отменено'}</option>
                        </select>
                      </div>

                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-slate-400 space-y-2">
                  <CalendarIcon className="w-10 h-10 mx-auto text-slate-300" />
                  <p className="text-xs">{isKg ? 'Бул күн үчүн жазылуулар жок же чыпкага туура келбейт' : 'На выбранную дату записей не найдено'}</p>
                </div>
              )}
            </div>

          </div>
        )}

        {/* 2. КАРДАРЛАР TAB */}
        {adminTab === 'clients' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            
            {/* Top Toolbar */}
            <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900 font-display">
                    {isKg ? '2. Кардарлар базасы' : '2. База клиентов (Дети и Родители)'}
                  </h2>
                  <p className="text-xs text-slate-500">
                    {isKg ? 'Балдардын электрондук карталары, диагноздор жана абонемент балансы' : 'Электронные карты пациентов, диагнозы и баланс занятий'}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <div className="relative min-w-[220px]">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder={isKg ? 'Аты же телефон боюнча...' : 'Поиск по имени/телефону...'}
                    value={clientSearch}
                    onChange={(e) => setClientSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-300 text-slate-800 focus:outline-teal-500"
                  />
                </div>

                <select
                  value={clientDiagnosisFilter}
                  onChange={(e) => setClientDiagnosisFilter(e.target.value)}
                  className="px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-300 font-medium text-slate-700 focus:outline-teal-500"
                >
                  <option value="all">{isKg ? 'Бардык өзгөчөлүктөр' : 'Все диагнозы'}</option>
                  <option value="РАС / Аутизм спектри">РАС / Аутизм</option>
                  <option value="ДЦП (Церебралдык шал)">ДЦП</option>
                  <option value="ЗПР / ЗПРР (Кечигүү)">ЗПР / ЗПРР</option>
                  <option value="Дислалия / Дизартрия">Дислалия / Дизартрия</option>
                  <option value="Мотордук / Сенсордук алалия">Алалия</option>
                  <option value="Кекечтенүү (Заикание)">Кекечтенүү</option>
                </select>

                <button
                  onClick={() => setIsAddPatientOpen(true)}
                  className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>{isKg ? '+ Кардар кошуу' : '+ Добавить клиента'}</span>
                </button>
              </div>
            </div>

            {/* Clients Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredPatients.map((p) => (
                <div
                  key={p.id}
                  className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={p.avatarUrl}
                          alt={p.name}
                          className="w-12 h-12 rounded-2xl object-cover border border-slate-200 shadow-sm"
                        />
                        <div>
                          <h4 className="font-bold text-sm text-slate-900 leading-tight">
                            {p.name}
                          </h4>
                          <span className="text-[11px] text-slate-500">
                            {p.age} {isKg ? 'жаш' : 'лет'} • {p.cardCode || 'LOGOS-101'}
                          </span>
                        </div>
                      </div>

                      <span className="px-2 py-1 rounded-lg bg-sky-50 text-sky-800 text-[10px] font-bold border border-sky-100 shrink-0">
                        {p.remainingLessons} {isKg ? 'сабак калды' : 'остаток'}
                      </span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs mb-3 space-y-1">
                      <div className="font-semibold text-teal-800 truncate">{p.diagnosis}</div>
                      <div className="text-slate-500 text-[11px]">Адис: <strong>{p.assignedSpecialistName}</strong></div>
                      <div className="text-slate-500 text-[11px]">Ата-эне: <strong>{p.parentName}</strong> ({p.phone})</div>
                    </div>

                    {/* Skill progress bars */}
                    <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-600 mb-2">
                      <div className="bg-slate-50 p-2 rounded-xl">
                        <div className="flex justify-between font-semibold mb-1">
                          <span>{isKg ? 'Кеп' : 'Речь'}</span>
                          <span>{p.speechScore}%</span>
                        </div>
                        <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-sky-500 h-full rounded-full" style={{ width: `${p.speechScore}%` }}></div>
                        </div>
                      </div>

                      <div className="bg-slate-50 p-2 rounded-xl">
                        <div className="flex justify-between font-semibold mb-1">
                          <span>{isKg ? 'Сенсорика' : 'Сенсорика'}</span>
                          <span>{p.sensoryScore}%</span>
                        </div>
                        <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-teal-500 h-full rounded-full" style={{ width: `${p.sensoryScore}%` }}></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    <a
                      href={`https://wa.me/${p.phone.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-bold flex items-center gap-1 transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>WhatsApp</span>
                    </a>

                    <button
                      onClick={() => setSelectedPatient(p)}
                      className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1 transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>{isKg ? 'Картаны көрүү' : 'Открыть карту'}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* 3. ЖАЗЫЛУУЛАР TAB */}
        {adminTab === 'appointments' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            
            <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
                  <CalendarCheck className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900 font-display">
                    {isKg ? '3. Бардык Жазылуулар тизмеси' : '3. Журнал Записей на прием'}
                  </h2>
                  <p className="text-xs text-slate-500">
                    {isKg ? 'Жаңы өтүнмөлөр, графиктеги сабактар жана алардын абалы' : 'Полный реестр входящих записей и бронирований'}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <div className="relative min-w-[220px]">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder={isKg ? 'Баланын аты, телефон...' : 'Имя, телефон...'}
                    value={appointmentSearch}
                    onChange={(e) => setAppointmentSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-300 text-slate-800 focus:outline-indigo-500"
                  />
                </div>

                <button
                  onClick={() => setIsAddAppointmentOpen(true)}
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>{isKg ? '+ Жаңы жазылуу' : '+ Добавить запись'}</span>
                </button>
              </div>
            </div>

            {/* Appointments Table */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
                    <tr>
                      <th className="px-5 py-3.5">{isKg ? 'Күнү & Убактысы' : 'Дата и Время'}</th>
                      <th className="px-5 py-3.5">{isKg ? 'Бала жана Жашы' : 'Ребенок и Возраст'}</th>
                      <th className="px-5 py-3.5">{isKg ? 'Кызмат' : 'Услуга'}</th>
                      <th className="px-5 py-3.5">{isKg ? 'Адис' : 'Специалист'}</th>
                      <th className="px-5 py-3.5">{isKg ? 'Ата-эне & Байланыш' : 'Родитель & Телефон'}</th>
                      <th className="px-5 py-3.5">{isKg ? 'Абалы' : 'Статус'}</th>
                      <th className="px-5 py-3.5 text-right">{isKg ? 'Аракет' : 'Действие'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredAppointments.map((app) => (
                      <tr key={app.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="px-5 py-4 font-bold text-slate-900 whitespace-nowrap">
                          {app.date} <span className="text-indigo-600 font-normal">({app.time})</span>
                        </td>
                        <td className="px-5 py-4">
                          <div className="font-bold text-slate-900">{app.childName}</div>
                          <div className="text-[11px] text-slate-500">{app.childAge} {isKg ? 'жаш' : 'лет'}</div>
                        </td>
                        <td className="px-5 py-4 font-medium text-slate-800">
                          {app.serviceName}
                          <div className="text-[11px] text-slate-500 font-bold">{app.price.toLocaleString()} сом</div>
                        </td>
                        <td className="px-5 py-4 font-medium text-slate-700">
                          {app.specialistName}
                          <div className="text-[10px] text-slate-400">{app.room || 'Кабинет №1'}</div>
                        </td>
                        <td className="px-5 py-4">
                          <div className="font-semibold text-slate-900">{app.parentName}</div>
                          <div className="text-[11px] text-slate-500">{app.phone}</div>
                        </td>
                        <td className="px-5 py-4">
                          <select
                            value={app.status}
                            onChange={(e) => onUpdateAppointmentStatus(app.id, e.target.value as AppointmentStatus)}
                            className="px-2.5 py-1 rounded-xl bg-slate-50 border border-slate-300 text-xs font-bold text-slate-700 focus:outline-indigo-500"
                          >
                            <option value="scheduled">{isKg ? 'Күтүлүүдө' : 'Запланировано'}</option>
                            <option value="in-progress">{isKg ? 'Сабак өтүүдө' : 'Идет занятие'}</option>
                            <option value="completed">{isKg ? 'Өттү' : 'Завершено'}</option>
                            <option value="cancelled">{isKg ? 'Калтырылды' : 'Отменено'}</option>
                          </select>
                        </td>
                        <td className="px-5 py-4 text-right whitespace-nowrap">
                          <a
                            href={generateWhatsAppReminder(app)}
                            target="_blank"
                            rel="noreferrer"
                            className="px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold inline-flex items-center gap-1 transition-colors"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                            <span>WhatsApp</span>
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* 4. АДИСТЕР TAB */}
        {adminTab === 'specialists' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            
            <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900 font-display">
                    {isKg ? '4. Адистер жана Жүктөм' : '4. Специалисты и Нагрузка'}
                  </h2>
                  <p className="text-xs text-slate-500">
                    {isKg ? 'Эксперттердин расписаниеси, активдүү балдар жана бөлмөлөрү' : 'Педагогический состав, кабинеты и количество прикрепленных детей'}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {specialists.map((spec) => {
                const assignedPatientsCount = patients.filter(p => p.assignedSpecialistId === spec.id).length;
                return (
                  <div key={spec.id} className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3.5 mb-4">
                        <img
                          src={spec.photoUrl}
                          alt={spec.name}
                          className="w-16 h-16 rounded-2xl object-cover border border-slate-200 shadow-sm"
                        />
                        <div>
                          <h4 className="font-bold text-sm text-slate-900">{spec.name}</h4>
                          <span className="text-xs text-amber-700 font-semibold">{isKg ? spec.titleKg : spec.titleRu}</span>
                          <div className="text-[11px] text-slate-500 mt-0.5">
                            {spec.experienceYears} {isKg ? 'жыл тажрыйба' : 'лет стажа'} • ★ {spec.rating}
                          </div>
                        </div>
                      </div>

                      <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 text-xs space-y-2 mb-4">
                        <div className="flex justify-between">
                          <span className="text-slate-500">{isKg ? 'Бөлмө/Кабинет:' : 'Кабинет:'}</span>
                          <strong className="text-slate-800">{spec.roomNumber}</strong>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">{isKg ? 'Активдүү балдар:' : 'Прикреплено детей:'}</span>
                          <strong className="text-sky-700">{assignedPatientsCount} {isKg ? 'бала' : 'детей'}</strong>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">{isKg ? 'Сааттык тариф:' : 'Ставка за прием:'}</span>
                          <strong className="text-slate-800">{spec.hourlyRate} сом</strong>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1.5 mb-2">
                        {spec.specializationTags.map((tag, idx) => (
                          <span key={idx} className="px-2 py-0.5 rounded-lg bg-amber-50 text-amber-900 border border-amber-200/60 text-[10px] font-semibold">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs text-slate-500">{spec.phone}</span>
                      <button
                        onClick={() => {
                          setFilterSpecialistId(spec.id);
                          setAdminTab('calendar');
                        }}
                        className="px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-colors"
                      >
                        {isKg ? 'Графигин көрүү' : 'Сетка занятий'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        )}

        {/* 5. БОШ УБАКЫТ TAB */}
        {adminTab === 'time_slots' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            
            <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900 font-display">
                    {isKg ? '5. Бош Убакыт жана Слоторду Башкаруу' : '5. Свободное Время и Слоты специалистов'}
                  </h2>
                  <p className="text-xs text-slate-500">
                    {isKg ? 'Адистердин бош интервалдары жана бир басуу менен ээлөө' : 'Интерактивная таблица слотов для записи клиентов'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-600">{isKg ? 'Слотту басып абалын өзгөртүңүз:' : 'Нажмите на слот для смены статуса:'}</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">{isKg ? 'Бош' : 'Свободно'}</span>
                <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold">{isKg ? 'Ээлеген' : 'Занято'}</span>
                <span className="px-2 py-0.5 rounded-full bg-slate-200 text-slate-700 text-[10px] font-bold">{isKg ? 'Тыныгуу' : 'Перерыв'}</span>
              </div>
            </div>

            {/* Time Slot Matrix */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {specialists.map((spec) => {
                const specSlots = timeSlots.filter(ts => ts.specialistId === spec.id);
                return (
                  <div key={spec.id} className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                    <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                      <img src={spec.photoUrl} alt={spec.name} className="w-10 h-10 rounded-xl object-cover" />
                      <div>
                        <h4 className="font-bold text-xs text-slate-900">{spec.name}</h4>
                        <p className="text-[11px] text-slate-500">{spec.roomNumber}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      {specSlots.map((slot) => {
                        const isAvailable = slot.status === 'available';
                        const isBooked = slot.status === 'booked';
                        const isBreak = slot.status === 'break';
                        return (
                          <div
                            key={slot.id}
                            onClick={() => onToggleTimeSlot(slot.id)}
                            className={`p-3 rounded-2xl border-2 transition-all cursor-pointer text-center select-none ${
                              isAvailable
                                ? 'bg-emerald-50/70 border-emerald-500 text-emerald-950 hover:bg-emerald-100/70'
                                : isBooked
                                ? 'bg-amber-50 border-amber-400 text-amber-900 hover:bg-amber-100'
                                : 'bg-slate-100 border-slate-300 text-slate-500 hover:bg-slate-200'
                            }`}
                          >
                            <div className="font-black text-sm flex items-center justify-center gap-1">
                              <Clock className="w-3.5 h-3.5" />
                              <span>{slot.time}</span>
                            </div>
                            <div className="text-[10px] font-bold mt-0.5">
                              {isAvailable ? (isKg ? 'БОШ' : 'СВОБОДНО') : isBooked ? (isKg ? 'ЭЭЛЕГЕН' : 'ЗАНЯТО') : (isKg ? 'ТЫНЫГУУ' : 'ПЕРЕРЫВ')}
                            </div>
                            {slot.childName && (
                              <div className="text-[10px] text-amber-800 font-semibold truncate mt-0.5">
                                {slot.childName}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        )}

        {/* 6. ТӨЛӨМДӨР TAB */}
        {adminTab === 'payments' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            
            {/* Top Revenue Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                  <DollarSign className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs text-slate-500">{isKg ? 'Жалпы түшкөн каражат:' : 'Общая выручка:'}</div>
                  <div className="text-xl font-black text-slate-900 font-display">
                    {totalRevenue.toLocaleString()} сом
                  </div>
                </div>
              </div>

              <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center font-bold">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs text-slate-500">{isKg ? 'Бүгүнкү түшүм (27-Авг):' : 'Выручка за сегодня:'}</div>
                  <div className="text-xl font-black text-sky-700 font-display">
                    {todayRevenue.toLocaleString()} сом
                  </div>
                </div>
              </div>

              <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                  <div className="text-xs text-slate-500">{isKg ? 'Жаңы төлөм кабыл алуу:' : 'Принять оплату:'}</div>
                  <div className="text-xs text-slate-700 font-semibold mt-0.5">{isKg ? 'MBank / О!Деньги / Касса' : 'MBank / О!Деньги / Наличные'}</div>
                </div>
                <button
                  onClick={() => setIsAddPaymentOpen(true)}
                  className="px-4 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-emerald-600/20 transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>{isKg ? '+ Төлөм' : '+ Оплата'}</span>
                </button>
              </div>
            </div>

            {/* Payments Table */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <h3 className="font-bold text-xs text-slate-800 flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-emerald-600" />
                  <span>{isKg ? 'Төлөмдөрдүн электрондук журналы' : 'Электронный журнал платежей'}</span>
                </h3>

                <div className="flex items-center gap-2">
                  <select
                    value={paymentMethodFilter}
                    onChange={(e) => setPaymentMethodFilter(e.target.value)}
                    className="px-3 py-1.5 text-xs rounded-xl bg-white border border-slate-300 font-medium text-slate-700 focus:outline-emerald-500"
                  >
                    <option value="all">{isKg ? 'Бардык ыкмалар' : 'Все методы оплаты'}</option>
                    <option value="mbank">MBank QR</option>
                    <option value="odengi">О!Деньги</option>
                    <option value="cash">Накталай акча</option>
                    <option value="elkart">Элкарт</option>
                    <option value="visa">Visa / Карта</option>
                  </select>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
                    <tr>
                      <th className="px-5 py-3.5">{isKg ? 'Чек № & Күнү' : 'Чек № и Дата'}</th>
                      <th className="px-5 py-3.5">{isKg ? 'Бала жана Ата-эне' : 'Ребенок и Родитель'}</th>
                      <th className="px-5 py-3.5">{isKg ? 'Кызмат түрү' : 'Услуга'}</th>
                      <th className="px-5 py-3.5">{isKg ? 'Төлөм ыкмасы' : 'Метод'}</th>
                      <th className="px-5 py-3.5">{isKg ? 'Суммасы' : 'Сумма'}</th>
                      <th className="px-5 py-3.5">{isKg ? 'Абалы' : 'Статус'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredPayments.map((pay) => (
                      <tr key={pay.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="px-5 py-4">
                          <div className="font-bold text-slate-900">{pay.receiptNumber}</div>
                          <div className="text-[11px] text-slate-500">{pay.date} ({pay.time})</div>
                        </td>
                        <td className="px-5 py-4">
                          <div className="font-bold text-slate-900">{pay.childName}</div>
                          <div className="text-[11px] text-slate-500">{pay.parentName} • {pay.phone}</div>
                        </td>
                        <td className="px-5 py-4 font-medium text-slate-800">
                          {pay.serviceName}
                        </td>
                        <td className="px-5 py-4">
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-slate-100 text-slate-700 border border-slate-200">
                            {pay.paymentMethod}
                          </span>
                        </td>
                        <td className="px-5 py-4 font-black text-sm text-emerald-700 font-display">
                          {pay.amount.toLocaleString()} сом
                        </td>
                        <td className="px-5 py-4">
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1 w-max">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            <span>{isKg ? 'Төлөндү' : 'Оплачено'}</span>
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* 7. ОТЧЕТТОР TAB */}
        {adminTab === 'reports' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            
            <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center">
                  <BarChart3 className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900 font-display">
                    {isKg ? '7. Отчеттор жана Аналитика' : '7. Отчеты и Аналитика центра'}
                  </h2>
                  <p className="text-xs text-slate-500">
                    {isKg ? 'Борбордун каржылык жана коррекциялык көрсөткүчтөрү' : 'Финансовые показатели, посещаемость и статистика развития детей'}
                  </p>
                </div>
              </div>

              <button
                onClick={() => window.print()}
                className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all"
              >
                <Printer className="w-4 h-4" />
                <span>{isKg ? 'Басып чыгаруу (Печать)' : 'Распечатать отчет'}</span>
              </button>
            </div>

            {/* Reports Overview Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm">
                <div className="text-xs text-slate-500">{isKg ? 'Жалпы кардарлар:' : 'Всего клиентов:'}</div>
                <div className="text-2xl font-black text-slate-900 mt-1 font-display">{patients.length}</div>
                <div className="text-[11px] text-emerald-600 font-semibold mt-1">↑ +14% {isKg ? 'өткөн айга караганда' : 'к прошлому месяцу'}</div>
              </div>

              <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm">
                <div className="text-xs text-slate-500">{isKg ? 'Өткөрүлгөн сабактар:' : 'Проведено занятий:'}</div>
                <div className="text-2xl font-black text-sky-700 mt-1 font-display">1,420</div>
                <div className="text-[11px] text-sky-600 font-semibold mt-1">98.2% {isKg ? 'катышуу көрсөткүчү' : 'посещаемость'}</div>
              </div>

              <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm">
                <div className="text-xs text-slate-500">{isKg ? 'Айлык киреше:' : 'Месячная выручка:'}</div>
                <div className="text-2xl font-black text-emerald-700 mt-1 font-display">420,000 сом</div>
                <div className="text-[11px] text-emerald-600 font-semibold mt-1">✓ {isKg ? 'План 105% аткарылды' : 'План выполнен на 105%'}</div>
              </div>

              <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm">
                <div className="text-xs text-slate-500">{isKg ? 'Орточо динамика:' : 'Средняя динамика речи:'}</div>
                <div className="text-2xl font-black text-purple-700 mt-1 font-display">+42%</div>
                <div className="text-[11px] text-purple-600 font-semibold mt-1">{isKg ? '3 айлык курс боюнча' : 'за 3 месяца'}</div>
              </div>
            </div>

            {/* Diagnostics Distribution */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                <h4 className="font-bold text-sm text-slate-900 font-display flex items-center gap-2">
                  <Brain className="w-4 h-4 text-purple-600" />
                  <span>{isKg ? 'Өзгөчөлүктөр жана диагноздор боюнча бөлүнүш:' : 'Распределение по диагнозам:'}</span>
                </h4>

                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                      <span>РАС жана Аутизм спектри</span>
                      <span>38% (42 бала)</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-sky-500 h-full rounded-full" style={{ width: '38%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                      <span>ЗПР / ЗПРР (Кеп жана психикалык кечигүү)</span>
                      <span>29% (32 бала)</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-teal-500 h-full rounded-full" style={{ width: '29%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                      <span>ДЦП жана кыймыл-аракет бузулуусу</span>
                      <span>18% (20 бала)</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-amber-500 h-full rounded-full" style={{ width: '18%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                      <span>Дислалия жана Дизартрия</span>
                      <span>15% (16 бала)</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-purple-500 h-full rounded-full" style={{ width: '15%' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Specialist Performance */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                <h4 className="font-bold text-sm text-slate-900 font-display flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-600" />
                  <span>{isKg ? 'Адистер боюнча сабактардын саны:' : 'Количество проведенных занятий:'}</span>
                </h4>

                <div className="space-y-3">
                  {specialists.slice(0, 4).map((s, idx) => (
                    <div key={s.id} className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100 text-xs">
                      <div className="flex items-center gap-2.5">
                        <span className="w-6 h-6 rounded-full bg-slate-200 text-slate-700 font-bold flex items-center justify-center text-[10px]">
                          {idx + 1}
                        </span>
                        <div>
                          <div className="font-bold text-slate-900">{s.name}</div>
                          <div className="text-[10px] text-slate-500">{isKg ? s.titleKg : s.titleRu}</div>
                        </div>
                      </div>
                      <div className="text-right font-black text-sky-700 font-display">
                        {220 - idx * 25} {isKg ? 'сабак' : 'занятий'}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        )}

      </div>

      {/* MODAL: Add New Appointment */}
      {isAddAppointmentOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 bg-sky-600 text-white flex items-center justify-between">
              <h3 className="font-bold text-sm flex items-center gap-2">
                <Plus className="w-4 h-4" />
                {isKg ? 'Жаңы сабак / жазылуу кошуу' : 'Добавить новую запись'}
              </h3>
              <button onClick={() => setIsAddAppointmentOpen(false)} className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateAppointmentSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">{isKg ? 'Баланын аты-жөнү:' : 'Имя ребенка:'}</label>
                  <input
                    type="text"
                    required
                    placeholder="Амир Эмилбеков"
                    value={newAppChildName}
                    onChange={(e) => setNewAppChildName(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-300 focus:outline-sky-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">{isKg ? 'Жашы:' : 'Возраст:'}</label>
                  <input
                    type="number"
                    min={1}
                    max={18}
                    value={newAppChildAge}
                    onChange={(e) => setNewAppChildAge(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-300 focus:outline-sky-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">{isKg ? 'Ата-эненин аты:' : 'Имя родителя:'}</label>
                  <input
                    type="text"
                    required
                    placeholder="Айзада Э."
                    value={newAppParentName}
                    onChange={(e) => setNewAppParentName(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-300 focus:outline-sky-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">{isKg ? 'Телефон номери:' : 'Номер телефона:'}</label>
                  <input
                    type="tel"
                    required
                    placeholder="+996 702 123456"
                    value={newAppPhone}
                    onChange={(e) => setNewAppPhone(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-300 focus:outline-sky-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">{isKg ? 'Кызмат:' : 'Услуга:'}</label>
                  <select
                    value={newAppServiceId}
                    onChange={(e) => setNewAppServiceId(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-300 focus:outline-sky-500"
                  >
                    {INITIAL_SERVICES.map(s => (
                      <option key={s.id} value={s.id}>{isKg ? s.nameKg : s.nameRu} ({s.price} сом)</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">{isKg ? 'Адис:' : 'Специалист:'}</label>
                  <select
                    value={newAppSpecialistId}
                    onChange={(e) => setNewAppSpecialistId(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-300 focus:outline-sky-500"
                  >
                    {specialists.map(spec => (
                      <option key={spec.id} value={spec.id}>{spec.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">{isKg ? 'Күнү:' : 'Дата:'}</label>
                  <input
                    type="date"
                    value={newAppDate}
                    onChange={(e) => setNewAppDate(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-300 focus:outline-sky-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">{isKg ? 'Убактысы:' : 'Время:'}</label>
                  <select
                    value={newAppTime}
                    onChange={(e) => setNewAppTime(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-300 focus:outline-sky-500"
                  >
                    {['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00', '18:00'].map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddAppointmentOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700"
                >
                  {isKg ? 'Жокко чыгаруу' : 'Отмена'}
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold shadow-md"
                >
                  {isKg ? 'Сактоо' : 'Сохранить'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Add New Patient (Customer) */}
      {isAddPatientOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 bg-teal-600 text-white flex items-center justify-between">
              <h3 className="font-bold text-sm flex items-center gap-2">
                <UserPlus className="w-4 h-4" />
                {isKg ? 'Жаңы баланы каттоого алуу' : 'Зарегистрировать ребенка'}
              </h3>
              <button onClick={() => setIsAddPatientOpen(false)} className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreatePatientSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">{isKg ? 'Баланын аты-жөнү:' : 'ФИО ребенка:'}</label>
                  <input
                    type="text"
                    required
                    placeholder="Амир Эмилбеков"
                    value={newPatientName}
                    onChange={(e) => setNewPatientName(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-300 focus:outline-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">{isKg ? 'Жашы:' : 'Возраст:'}</label>
                  <input
                    type="number"
                    min={1}
                    max={18}
                    value={newPatientAge}
                    onChange={(e) => setNewPatientAge(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-300 focus:outline-teal-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">{isKg ? 'Диагноз / Өзгөчөлүк:' : 'Диагноз / Особенность:'}</label>
                <select
                  value={newPatientDiagnosis}
                  onChange={(e) => setNewPatientDiagnosis(e.target.value as ChildDiagnosis)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-300 focus:outline-teal-500"
                >
                  <option value="РАС / Аутизм спектри">РАС / Аутизм спектри</option>
                  <option value="Аутизм (Классикалык)">Аутизм</option>
                  <option value="ДЦП (Церебралдык шал)">ДЦП</option>
                  <option value="ЗПР / ЗПРР (Кечигүү)">ЗПР / ЗПРР</option>
                  <option value="Дислалия / Дизартрия">Дислалия / Дизартрия</option>
                  <option value="Мотордук / Сенсордук алалия">Алалия</option>
                  <option value="Кекечтенүү (Заикание)">Кекечтенүү</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">{isKg ? 'Ата-эненин аты:' : 'ФИО родителя:'}</label>
                  <input
                    type="text"
                    required
                    placeholder="Айзада Э."
                    value={newPatientParent}
                    onChange={(e) => setNewPatientParent(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-300 focus:outline-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">{isKg ? 'Телефон номери:' : 'Телефон:'}</label>
                  <input
                    type="tel"
                    required
                    placeholder="+996 702 123456"
                    value={newPatientPhone}
                    onChange={(e) => setNewPatientPhone(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-300 focus:outline-teal-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">{isKg ? 'Дайындалган адис:' : 'Ведущий специалист:'}</label>
                  <select
                    value={newPatientSpecialistId}
                    onChange={(e) => setNewPatientSpecialistId(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-300 focus:outline-teal-500"
                  >
                    {specialists.map(s => (
                      <option key={s.id} value={s.id}>{s.name} ({s.role})</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">{isKg ? 'Абонемент сабактары:' : 'Занятий в абонементе:'}</label>
                  <input
                    type="number"
                    min={1}
                    value={newPatientLessons}
                    onChange={(e) => setNewPatientLessons(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-300 focus:outline-teal-500"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddPatientOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700"
                >
                  {isKg ? 'Жокко чыгаруу' : 'Отмена'}
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold shadow-md"
                >
                  {isKg ? 'Каттоо' : 'Зарегистрировать'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Add New Payment */}
      {isAddPaymentOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 bg-emerald-600 text-white flex items-center justify-between">
              <h3 className="font-bold text-sm flex items-center gap-2">
                <CreditCard className="w-4 h-4" />
                {isKg ? 'Жаңы төлөм кабыл алуу' : 'Принять оплату'}
              </h3>
              <button onClick={() => setIsAddPaymentOpen(false)} className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreatePaymentSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">{isKg ? 'Баланын аты-жөнү:' : 'Имя ребенка:'}</label>
                  <input
                    type="text"
                    required
                    placeholder="Амир Эмилбеков"
                    value={newPayChildName}
                    onChange={(e) => setNewPayChildName(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-300 focus:outline-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">{isKg ? 'Ата-эненин аты:' : 'Имя родителя:'}</label>
                  <input
                    type="text"
                    required
                    placeholder="Айзада Э."
                    value={newPayParentName}
                    onChange={(e) => setNewPayParentName(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-300 focus:outline-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">{isKg ? 'Суммасы (сом):' : 'Сумма (сом):'}</label>
                  <input
                    type="number"
                    required
                    min={100}
                    value={newPayAmount}
                    onChange={(e) => setNewPayAmount(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-300 focus:outline-emerald-500 font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">{isKg ? 'Төлөм ыкмасы:' : 'Способ оплаты:'}</label>
                  <select
                    value={newPayMethod}
                    onChange={(e) => setNewPayMethod(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-300 focus:outline-emerald-500 font-bold"
                  >
                    <option value="mbank">MBank QR</option>
                    <option value="odengi">О!Деньги</option>
                    <option value="cash">Накталай акча</option>
                    <option value="elkart">Элкарт</option>
                    <option value="visa">Visa / Mastercard</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">{isKg ? 'Кызматтын аталышы:' : 'Наименование услуги:'}</label>
                <input
                  type="text"
                  value={newPayServiceName}
                  onChange={(e) => setNewPayServiceName(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-300 focus:outline-emerald-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddPaymentOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700"
                >
                  {isKg ? 'Жокко чыгаруу' : 'Отмена'}
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md"
                >
                  {isKg ? 'Чек чыгаруу & Төлөндү' : 'Выдать чек и Сохранить'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: View Client Card */}
      {selectedPatient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
            <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <img src={selectedPatient.avatarUrl} alt={selectedPatient.name} className="w-10 h-10 rounded-xl object-cover" />
                <div>
                  <h3 className="font-bold text-base">{selectedPatient.name}</h3>
                  <p className="text-xs text-slate-400">{selectedPatient.diagnosis} • {selectedPatient.age} {isKg ? 'жаш' : 'лет'}</p>
                </div>
              </div>
              <button onClick={() => setSelectedPatient(null)} className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4">
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="text-slate-500">{isKg ? 'Ата-эне:' : 'Родитель:'}</div>
                  <div className="font-bold text-slate-900">{selectedPatient.parentName} ({selectedPatient.phone})</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="text-slate-500">{isKg ? 'Абонементте калган сабак:' : 'Остаток занятий:'}</div>
                  <div className="font-black text-sky-700 text-sm">{selectedPatient.remainingLessons} {isKg ? 'сабак' : 'занятий'}</div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <h4 className="font-bold text-xs text-slate-800">{isKg ? 'Өнүгүү динамикасы жана баалоо:' : 'Динамика развития:'}</h4>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>Кеп: <strong>{selectedPatient.speechScore}%</strong></div>
                  <div>Сенсорика: <strong>{selectedPatient.sensoryScore}%</strong></div>
                  <div>Моторика: <strong>{selectedPatient.motorScore}%</strong></div>
                  <div>Социалдашуу: <strong>{selectedPatient.socialScore}%</strong></div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="text-xs font-bold text-slate-800 mb-1">{isKg ? 'Педагогдун эскертмелери:' : 'Заметки педагога:'}</div>
                <p className="text-xs text-slate-600 leading-relaxed">{selectedPatient.notes || 'Маалымат толук жазылган.'}</p>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
