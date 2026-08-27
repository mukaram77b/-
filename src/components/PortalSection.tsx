import React, { useState } from 'react';
import { 
  Heart, 
  Sparkles, 
  CheckCircle2, 
  Award, 
  Calendar, 
  BookOpen, 
  Flame, 
  Smile, 
  ArrowRight, 
  Check, 
  Play, 
  Volume2, 
  Clock, 
  RefreshCw,
  Phone,
  Lock,
  Unlock,
  ShieldCheck,
  LogOut,
  Send,
  UserCheck,
  Star,
  Activity,
  MessageCircle,
  HelpCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Language, ChildPatient } from '../types';
import { TRANSLATIONS } from '../constants/translations';
import { INITIAL_HOMEWORK } from '../constants/logosData';

interface PortalSectionProps {
  language: Language;
  patients: ChildPatient[];
  onOpenBookingForChild?: (patient: ChildPatient) => void;
  onOpenPosForChild?: (patient: ChildPatient) => void;
}

export const PortalSection: React.FC<PortalSectionProps> = ({
  language,
  patients,
  onOpenBookingForChild,
  onOpenPosForChild
}) => {
  const t = TRANSLATIONS[language];
  const isKg = language === 'ky';
  const isEn = language === 'en';

  // Confidential login state - default to first child for seamless preview, but allow full login/switch
  const [authenticatedChildId, setAuthenticatedChildId] = useState<string>(patients[0]?.id || '');
  const [loginInput, setLoginInput] = useState<string>('');
  const [pinInput, setPinInput] = useState<string>('');
  const [loginError, setLoginError] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'homework' | 'progress' | 'trainer' | 'chat'>('homework');

  const [completedExercises, setCompletedExercises] = useState<Record<string, boolean>>({
    'ex-1': true,
    'ex-2': false
  });
  const [streakDays, setStreakDays] = useState<number>(6);
  const [soundPlaying, setSoundPlaying] = useState<string | null>(null);

  // Active logged-in child
  const activeChild = patients.find(p => p.id === authenticatedChildId);

  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoginError('');

    const query = loginInput.trim().toLowerCase();
    const pin = pinInput.trim();

    if (!query) {
      setLoginError(
        isKg 
          ? 'Сураныч, баланын карта номерин же ата-эненин телефонун жазыңыз' 
          : (isEn ? 'Please enter the child card code or parent phone number' : 'Пожалуйста, введите номер карты или телефон родителя')
      );
      return;
    }

    // Find child by cardCode, phone, or name
    const found = patients.find(p => 
      p.cardCode?.toLowerCase() === query ||
      p.parentPhone?.replace(/\D/g, '') === query.replace(/\D/g, '') ||
      p.parentPhone?.includes(query) ||
      p.name.toLowerCase().includes(query)
    );

    if (found) {
      // If pin is provided on record, verify it if entered
      if (found.accessPin && pin && found.accessPin !== pin) {
        setLoginError(
          isKg ? 'PIN код туура эмес.' : (isEn ? 'Invalid PIN code.' : 'Неверный PIN код.')
        );
        return;
      }
      setAuthenticatedChildId(found.id);
      setLoginInput('');
      setPinInput('');
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 }
      });
    } else {
      setLoginError(
        isKg 
          ? 'Бала табылган жок. Текшерип кайра жазыңыз (мис: LOGOS-101 же 0702445566).' 
          : (isEn ? 'Child profile not found. Please check your card code (e.g. LOGOS-101) or phone.' : 'Ребенок не найден. Проверьте номер карты (напр: LOGOS-101) или телефон.')
      );
    }
  };

  const handleQuickSelectChild = (child: ChildPatient) => {
    setAuthenticatedChildId(child.id);
    setLoginError('');
  };

  const handleLogout = () => {
    setAuthenticatedChildId('');
    setLoginError('');
  };

  const handleToggleExercise = (exerciseId: string) => {
    const isNowDone = !completedExercises[exerciseId];
    setCompletedExercises({
      ...completedExercises,
      [exerciseId]: isNowDone
    });

    if (isNowDone) {
      confetti({
        particleCount: 45,
        spread: 60,
        origin: { y: 0.7 }
      });
    }
  };

  const playArticulationSound = (sound: string, text: string) => {
    setSoundPlaying(sound);
    try {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.85;
        utterance.pitch = 1.1;
        utterance.lang = isKg ? 'ky-KG' : 'ru-RU';
        utterance.onend = () => setSoundPlaying(null);
        utterance.onerror = () => setSoundPlaying(null);
        window.speechSynthesis.speak(utterance);
      } else {
        setTimeout(() => setSoundPlaying(null), 1000);
      }
    } catch {
      setTimeout(() => setSoundPlaying(null), 1000);
    }
  };

  return (
    <section className="py-8 bg-gradient-to-b from-sky-50/50 via-slate-50 to-teal-50/30 min-h-[90vh]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-sky-100 shadow-sm">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-500 to-rose-500 text-white flex items-center justify-center shadow-md shadow-pink-500/20">
              <Heart className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black text-slate-900 font-display">
                  {t.portal.title}
                </h2>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black flex items-center gap-1 border border-emerald-200">
                  <ShieldCheck className="w-3 h-3" />
                  <span>{isKg ? 'Купуя' : (isEn ? 'Private' : 'Конфиденциально')}</span>
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                {t.portal.subtitle}
              </p>
            </div>
          </div>

          {/* If authenticated: Show logout & active badge */}
          {activeChild && (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-slate-50 px-3.5 py-2 rounded-2xl border border-slate-200">
                <img
                  src={activeChild.avatarUrl}
                  alt={activeChild.name}
                  className="w-7 h-7 rounded-xl object-cover border border-sky-400"
                />
                <div className="text-left">
                  <div className="text-xs font-bold text-slate-900 leading-none">{activeChild.name}</div>
                  <div className="text-[10px] text-slate-400 font-mono mt-0.5">{activeChild.cardCode || 'LOGOS-101'}</div>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="px-3.5 py-2 rounded-2xl text-xs font-bold text-slate-600 hover:text-rose-600 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 flex items-center gap-1.5 transition-all"
                title={isKg ? 'Кабинеттен чыгуу' : (isEn ? 'Exit cabinet' : 'Выйти из кабинета')}
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">{isKg ? 'Чыгуу' : (isEn ? 'Exit' : 'Выйти')}</span>
              </button>
            </div>
          )}
        </div>

        {/* ------------------------------------------------------------- */}
        {/* CASE 1: NOT AUTHENTICATED -> SECURE CONFIDENTIAL LOGIN GATE */}
        {/* ------------------------------------------------------------- */}
        {!activeChild ? (
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-sky-100 shadow-xl max-w-xl mx-auto space-y-6 text-center animate-in fade-in zoom-in-95 duration-300">
            <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-sky-500 to-teal-500 text-white flex items-center justify-center mx-auto shadow-lg shadow-sky-500/25">
              <Lock className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-black text-slate-900 font-display">
                {t.portal.loginTitle || 'Вход в Личный Кабинет Ребенка'}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed max-w-md mx-auto">
                {t.portal.loginSubtitle || '🔒 Медициналык жана педагогикалык купуялуулук: Башка ата-энелер сиздин балаңыздын маалыматын көрө алышпайт.'}
              </p>
            </div>

            {/* Privacy Guarantee Box */}
            <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200 text-left text-xs text-emerald-900 space-y-1.5">
              <div className="flex items-center gap-2 font-bold text-emerald-950">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{isKg ? 'Маалыматтын корголушу' : (isEn ? 'Data Protection Guarantee' : 'Гарантия конфиденциальности')}</span>
              </div>
              <p className="text-[11px] text-emerald-800 leading-relaxed">
                {isKg 
                  ? 'Ар бир баланын диагнозу, динамикасы, дефектологдун жазуулары жана үй тапшырмалары купуя сакталат. Кирүү үчүн баланын карта номерин же катталган телефонду жазыңыз.'
                  : (isEn 
                    ? 'All developmental diagnosis, notes, and homework belong strictly to your child and are protected from other users.'
                    : 'Все записи диагнозов, тестов и рекомендации логопеда строго конфиденциальны и доступны только родителям конкретного ребенка.')}
              </p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-4 text-left">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {isKg ? 'Баланын карта номери же телефон:' : (isEn ? 'Child Card Code or Parent Phone:' : 'Номер карты ребенка или телефон родителя:')}
                </label>
                <input
                  type="text"
                  placeholder={isKg ? 'мис: LOGOS-101 же 0702445566' : (isEn ? 'e.g. LOGOS-101 or 0702445566' : 'напр: LOGOS-101 или 0702445566')}
                  value={loginInput}
                  onChange={(e) => setLoginInput(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 focus:outline-sky-500 text-sm font-medium text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {isKg ? 'PIN код (эгер берилген болсо, демейки: 1234):' : (isEn ? 'Access PIN (optional, default: 1234):' : 'PIN-код (по умолчанию: 1234):')}
                </label>
                <input
                  type="password"
                  placeholder="••••"
                  maxLength={6}
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 focus:outline-sky-500 text-sm font-medium text-slate-900 tracking-widest"
                />
              </div>

              {loginError && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs font-bold text-rose-700">
                  {loginError}
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-sky-600 via-teal-600 to-emerald-600 hover:from-sky-700 hover:to-teal-700 text-white font-bold text-sm shadow-lg shadow-sky-600/30 flex items-center justify-center gap-2 transition-all transform hover:scale-[1.01] active:scale-[0.99]"
              >
                <Unlock className="w-4 h-4" />
                <span>{isKg ? 'Кабинетке кирүү' : (isEn ? 'Enter Private Cabinet' : 'Войти в личный кабинет')}</span>
              </button>
            </form>

            {/* Quick Demo Switcher For Testing */}
            <div className="pt-4 border-t border-slate-100 text-left space-y-2">
              <div className="text-[11px] font-bold text-slate-400">
                {isKg ? 'Ыкчам тестирлөө үчүн профилдер (Демо):' : (isEn ? 'Quick preview profiles (Demo):' : 'Быстрый выбор профиля (для демо-тестирования):')}
              </div>
              <div className="flex flex-wrap gap-2">
                {patients.map(p => (
                  <button
                    key={p.id}
                    onClick={() => handleQuickSelectChild(p)}
                    className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-sky-100 hover:text-sky-800 text-slate-700 text-xs font-bold transition-all flex items-center gap-1.5 border border-slate-200/80"
                  >
                    <img src={p.avatarUrl} alt={p.name} className="w-4 h-4 rounded-full object-cover" />
                    <span>{p.name}</span>
                    <span className="text-[10px] text-slate-400 font-mono">({p.cardCode})</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (

          /* ------------------------------------------------------------- */
          /* CASE 2: AUTHENTICATED -> CHILD'S STRICTLY PRIVATE DASHBOARD  */
          /* ------------------------------------------------------------- */
          <div className="space-y-6 animate-in fade-in duration-300">
            
            {/* Child Header Card */}
            <div className="bg-gradient-to-r from-sky-900 via-teal-950 to-indigo-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
              
              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                
                <div className="flex items-center gap-5">
                  <div className="relative">
                    <img
                      src={activeChild.avatarUrl}
                      alt={activeChild.name}
                      className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl object-cover border-3 border-teal-400 shadow-xl"
                    />
                    <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center text-[10px] text-white font-bold">
                      ✓
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <h3 className="text-2xl font-black font-display text-white">
                        {activeChild.name}
                      </h3>
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-teal-400/25 text-teal-200 border border-teal-300/30">
                        {activeChild.age} {t.crm.ageYears}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-white/15 text-sky-100">
                        {activeChild.cardCode}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-sky-100">
                      <div>
                        {isKg ? 'Диагноз:' : (isEn ? 'Condition:' : 'Диагноз:')} <strong className="text-white bg-white/10 px-2 py-0.5 rounded-md">{activeChild.diagnosis}</strong>
                      </div>
                      <div>
                        {isKg ? 'Адиси:' : (isEn ? 'Therapist:' : 'Специалист:')} <strong className="text-teal-300">{activeChild.assignedSpecialistName}</strong>
                      </div>
                    </div>

                    <div className="text-[11px] text-slate-300 flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{isKg ? 'Купуя жеке кабинет' : (isEn ? 'Confidential Private Cabinet' : 'Конфиденциальный личный кабинет')}</span>
                    </div>
                  </div>
                </div>

                {/* Streak & Balance Widget */}
                <div className="flex items-center gap-3 shrink-0">
                  {/* Streak */}
                  <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-center min-w-[100px]">
                    <div className="flex items-center justify-center gap-1 text-amber-400">
                      <Flame className="w-5 h-5 fill-amber-400" />
                      <span className="text-2xl font-black font-display">{streakDays}</span>
                    </div>
                    <div className="text-[10px] text-slate-300 font-bold uppercase tracking-wider mt-0.5">
                      {isKg ? 'Күндүк стрик' : (isEn ? 'Day streak' : 'Дней подряд')}
                    </div>
                  </div>

                  {/* Lessons */}
                  <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-center min-w-[100px]">
                    <div className="text-2xl font-black font-display text-emerald-400">
                      {activeChild.remainingLessons}
                    </div>
                    <div className="text-[10px] text-slate-300 font-bold uppercase tracking-wider mt-0.5">
                      {isKg ? 'Калган сабак' : (isEn ? 'Lessons left' : 'Осталось сабак')}
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Navigation Tabs for Parent */}
            <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto no-scrollbar">
              <button
                onClick={() => setActiveTab('homework')}
                className={`px-4 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-2 transition-all shrink-0 ${
                  activeTab === 'homework'
                    ? 'bg-sky-600 text-white shadow-md shadow-sky-600/20'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>{isKg ? 'Үй тапшырмалары' : (isEn ? 'Home Tasks' : 'Домашние задания')}</span>
                <span className="px-1.5 py-0.2 rounded-full bg-amber-400 text-amber-950 text-[10px] font-black">
                  {INITIAL_HOMEWORK.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('trainer')}
                className={`px-4 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-2 transition-all shrink-0 ${
                  activeTab === 'trainer'
                    ? 'bg-teal-600 text-white shadow-md shadow-teal-600/20'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <Volume2 className="w-4 h-4" />
                <span>{isKg ? 'Логопедия тренажеру' : (isEn ? 'Speech Trainer' : 'Речевой тренажер')}</span>
              </button>

              <button
                onClick={() => setActiveTab('progress')}
                className={`px-4 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-2 transition-all shrink-0 ${
                  activeTab === 'progress'
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <Activity className="w-4 h-4" />
                <span>{isKg ? 'Өнүгүү динамикасы' : (isEn ? 'Growth Dynamics' : 'Динамика развития')}</span>
              </button>

              <button
                onClick={() => setActiveTab('chat')}
                className={`px-4 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-2 transition-all shrink-0 ${
                  activeTab === 'chat'
                    ? 'bg-pink-600 text-white shadow-md shadow-pink-600/20'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <MessageCircle className="w-4 h-4" />
                <span>{isKg ? 'Адиске суроо' : (isEn ? 'Ask Specialist' : 'Связь с логопедом')}</span>
              </button>
            </div>

            {/* TAB 1: DAILY HOMEWORK & EXERCISES */}
            {activeTab === 'homework' && (
              <div className="space-y-6">
                
                {/* Progress metrics strip */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-4 rounded-2xl bg-white border border-sky-100 shadow-xs space-y-1.5">
                    <div className="flex justify-between text-xs font-bold text-slate-600">
                      <span>{t.crm.speechProgress}</span>
                      <span className="text-sky-600 font-black">{activeChild.speechScore}%</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-sky-500 rounded-full" style={{ width: `${activeChild.speechScore}%` }} />
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-teal-100 shadow-xs space-y-1.5">
                    <div className="flex justify-between text-xs font-bold text-slate-600">
                      <span>{t.crm.sensoryProgress}</span>
                      <span className="text-teal-600 font-black">{activeChild.sensoryScore}%</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-teal-500 rounded-full" style={{ width: `${activeChild.sensoryScore}%` }} />
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-indigo-100 shadow-xs space-y-1.5">
                    <div className="flex justify-between text-xs font-bold text-slate-600">
                      <span>{t.crm.motorProgress}</span>
                      <span className="text-indigo-600 font-black">{activeChild.motorScore}%</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${activeChild.motorScore}%` }} />
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-rose-100 shadow-xs space-y-1.5">
                    <div className="flex justify-between text-xs font-bold text-slate-600">
                      <span>{t.crm.socialProgress}</span>
                      <span className="text-rose-600 font-black">{activeChild.socialScore}%</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-rose-500 rounded-full" style={{ width: `${activeChild.socialScore}%` }} />
                    </div>
                  </div>
                </div>

                {/* Homework Cards */}
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                    <div>
                      <h3 className="text-lg font-black text-slate-900 font-display">
                        {t.portal.homeworkList}
                      </h3>
                      <p className="text-xs text-slate-500">
                        {isKg ? 'Күнүнө 10-15 мүнөт көнүгүүлөрдү жасап, адистин сунуштарын бекемдеңиз' : (isEn ? 'Spend 10-15 minutes daily to reinforce therapist results' : 'Занимайтесь по 10-15 минут в день для закрепления результата')}
                      </p>
                    </div>

                    <div className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3.5 py-1.5 rounded-xl border border-emerald-200 flex items-center gap-1.5 self-start">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>
                        {Object.values(completedExercises).filter(Boolean).length} / {INITIAL_HOMEWORK.length} {isKg ? 'аткарылды' : (isEn ? 'completed' : 'выполнено')}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {INITIAL_HOMEWORK.map((ex) => {
                      const isDone = !!completedExercises[ex.id];
                      return (
                        <div
                          key={ex.id}
                          className={`rounded-3xl p-5 border transition-all duration-300 flex flex-col justify-between space-y-4 ${
                            isDone 
                              ? 'bg-emerald-50/60 border-emerald-300 shadow-xs' 
                              : 'bg-slate-50 border-slate-200 hover:border-sky-300'
                          }`}
                        >
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-sky-800 bg-sky-100 px-2 py-0.5 rounded-md">
                                {ex.category}
                              </span>
                              <span className="text-xs text-slate-500 flex items-center gap-1">
                                <Clock className="w-3.5 h-3.5 text-slate-400" />
                                <span>{ex.durationMinutes} {t.services.min}</span>
                              </span>
                            </div>

                            <h4 className="font-bold text-sm text-slate-900 font-display">
                              {isKg ? ex.titleKg : ex.titleRu}
                            </h4>

                            <p className="text-xs text-slate-600 leading-relaxed">
                              {isKg ? ex.instructionsKg : ex.instructionsRu}
                            </p>
                          </div>

                          <button
                            onClick={() => handleToggleExercise(ex.id)}
                            className={`w-full py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                              isDone
                                ? 'bg-emerald-600 text-white shadow-xs'
                                : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-100'
                            }`}
                          >
                            <Check className="w-4 h-4" />
                            <span>{isDone ? (isKg ? 'Аткарылды! 🌟' : (isEn ? 'Completed! 🌟' : 'Выполнено! 🌟')) : (isKg ? 'Аткарылды деп белгилөө' : (isEn ? 'Mark completed' : 'Отметить как выполненное'))}</span>
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>
            )}

            {/* TAB 2: INTERACTIVE SPEECH TRAINER */}
            {activeTab === 'trainer' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
                <div>
                  <h3 className="text-lg font-black text-slate-900 font-display flex items-center gap-2">
                    <Volume2 className="w-5 h-5 text-teal-600" />
                    <span>{t.portal.speechTrainer}</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    {isKg 
                      ? 'Тыбыштарды туура айтуу жана дем алуу тренажеру. Баскычты басып, балаңыз менен чогуу кайталаңыз!'
                      : (isEn ? 'Pronunciation and oral breath trainer. Click to listen and repeat syllables with your child!' : 'Тренажер постановки звуков и артикуляционной гимнастики. Слушайте и повторяйте!')}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { sound: 'Р', syllableKg: 'Ра-Ро-Ру-Ры-Ре', syllableRu: 'Ра-Ро-Ру-Ры-Ре', promptKg: 'Моторчик жана тилди өйдө көтөрүү', promptRu: 'Моторчик и подъем язычка к небу', color: 'from-amber-500 to-orange-500' },
                    { sound: 'Л', syllableKg: 'Ла-Ло-Лу-Лы-Ле', syllableRu: 'Ла-Ло-Лу-Лы-Ле', promptKg: 'Пароходдун үнү: Ы-ы-ыл', promptRu: 'Гудок парохода: кончик язычка за верхними зубками', color: 'from-sky-500 to-blue-500' },
                    { sound: 'Ш', syllableKg: 'Ша-Шо-Шу-Ши-Ше', syllableRu: 'Ша-Шо-Шу-Ши-Ше', promptKg: 'Жыландын үнү жана чөйчөкчө тил', promptRu: 'Шипение змейки, губы округлены', color: 'from-emerald-500 to-teal-500' },
                    { sound: 'С', syllableKg: 'Са-Со-Су-Сы-Се', syllableRu: 'Са-Со-Су-Сы-Се', promptKg: 'Насос үйлөө жана жылмаюу', promptRu: 'Насос: холодная струя воздуха', color: 'from-indigo-500 to-purple-500' },
                    { sound: 'Ж', syllableKg: 'Жа-Жо-Жу-Жи-Же', syllableRu: 'Жа-Жо-Жу-Жи-Же', promptKg: 'Коңуздун үнү: Ж-ж-ж', promptRu: 'Жужжание жука, теплый выдох', color: 'from-pink-500 to-rose-500' },
                    { sound: 'Ц', syllableKg: 'Ца-Цо-Цу-Цы-Це', syllableRu: 'Ца-Цо-Цу-Цы-Це', promptKg: 'Чөжөлөрдү чакыруу: Цып-цып', promptRu: 'Четкий толчок кончика языка', color: 'from-violet-500 to-fuchsia-500' },
                  ].map((item) => (
                    <div key={item.sound} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-teal-300 transition-all flex flex-col justify-between space-y-3">
                      <div className="flex items-center justify-between">
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${item.color} text-white flex items-center justify-center text-lg font-black shadow-sm`}>
                          [{item.sound}]
                        </div>
                        <span className="text-[11px] font-mono font-bold text-slate-500">
                          {isKg ? item.syllableKg : item.syllableRu}
                        </span>
                      </div>

                      <p className="text-xs text-slate-600 font-medium leading-relaxed">
                        {isKg ? item.promptKg : item.promptRu}
                      </p>

                      <button
                        onClick={() => playArticulationSound(item.sound, isKg ? item.syllableKg : item.syllableRu)}
                        className="w-full py-2 rounded-xl bg-white hover:bg-teal-50 text-teal-800 border border-teal-200 text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-2xs"
                      >
                        <Volume2 className={`w-4 h-4 ${soundPlaying === item.sound ? 'text-teal-600 animate-bounce' : ''}`} />
                        <span>{soundPlaying === item.sound ? (isKg ? 'Үн ойнолууда...' : 'Воспроизведение...') : (isKg ? 'Үнүн угуу & Кайталоо' : 'Слушать и повторять')}</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: DEVELOPMENT DYNAMICS & GOALS */}
            {activeTab === 'progress' && (
              <div className="space-y-6">
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-5">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div>
                      <h3 className="text-lg font-black text-slate-900 font-display">
                        {isKg ? 'Өнүгүү динамикасы жана жыйынтыктары' : (isEn ? 'Development Dynamics & Assessment' : 'Динамика развития и результаты')}
                      </h3>
                      <p className="text-xs text-slate-500">
                        {isKg ? 'Адис тарабынан коюлган максаттар жана үй сунуштары' : (isEn ? 'Goals and recommendations approved by lead specialist' : 'Цели и рекомендации, утвержденные специалистом')}
                      </p>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-bold">
                      {activeChild.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-5 rounded-2xl bg-sky-50/70 border border-sky-100 space-y-3">
                      <h4 className="font-bold text-xs uppercase tracking-wider text-sky-900 flex items-center gap-1.5">
                        <Star className="w-4 h-4 text-sky-600" />
                        <span>{t.crm.iomGoals}</span>
                      </h4>
                      <p className="text-xs text-slate-700 leading-relaxed whitespace-pre-line">
                        {activeChild.iomRoute || (isKg 
                          ? '1. Артикуляциялык аппаратты даярдоо жана логомассаж\n2. Тыбыштарды коюу (Р, Л, Ш)\n3. Сөз байлыгын 100+ сөзгө жеткирүү\n4. Сенсордук залда тең салмактуулукту өстүрүү'
                          : '1. Подготовка артикуляционного аппарата\n2. Постановка звуков (Р, Л, шипящие)\n3. Расширение активного словаря\n4. Сенсорная интеграция в зале')}
                      </p>
                    </div>

                    <div className="p-5 rounded-2xl bg-teal-50/70 border border-teal-100 space-y-3">
                      <h4 className="font-bold text-xs uppercase tracking-wider text-teal-900 flex items-center gap-1.5">
                        <Heart className="w-4 h-4 text-teal-600" />
                        <span>{t.crm.homeRecommendations}</span>
                      </h4>
                      <p className="text-xs text-slate-700 leading-relaxed whitespace-pre-line">
                        {activeChild.notes || (isKg
                          ? '• Күнүнө 10 мүнөт күзгү алдында артикуляциялык гимнастика жасаңыз.\n• Экран убактысын (телефон, мультфильм) күнүнө 20 мүнөттөн ашырбаңыз.\n• Көзгө кароо жана суроо берүү адаттарын кубаттаңыз.'
                          : '• Ежедневно 10 минут перед зеркалом делать гимнастику язычка.\n• Ограничить экранное время (гаджеты) до 20 минут в день.\n• Стимулировать диалог вопросами открытого типа.')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: CONTACT SPECIALIST */}
            {activeTab === 'chat' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-lg">
                    👩‍⚕️
                  </div>
                  <div>
                    <h3 className="text-base font-black text-slate-900 font-display">
                      {activeChild.assignedSpecialistName}
                    </h3>
                    <p className="text-xs text-slate-500">
                      {isKg ? 'Балаңыздын жетектөөчү логопед-дефектологу' : (isEn ? 'Your child’s lead speech therapist' : 'Ведущий логопед-дефектолог вашего ребенка')}
                    </p>
                    <div className="text-xs font-semibold text-emerald-600 flex items-center gap-1 mt-0.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span>{isKg ? 'Суроолор үчүн WhatsApp жеткиликтүү' : (isEn ? 'WhatsApp support active' : 'Доступен в WhatsApp')}</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-3">
                  <p>
                    {isKg 
                      ? 'Сабактардын жүрүшү, үй тапшырмалары же балага тиешелүү суроолорду түз WhatsApp аркылуу адиске жазсаңыз болот.'
                      : (isEn ? 'You can ask any questions regarding homework or session progress directly via WhatsApp.' : 'Вы можете задать любые уточняющие вопросы по домашним заданиям или динамике прямо в WhatsApp.')}
                  </p>
                  
                  <a
                    href={`https://wa.me/996700112233?text=${encodeURIComponent(
                      isKg 
                        ? `Саламатсызбы! Мен ${activeChild.name}дин (Карта: ${activeChild.cardCode}) ата-энесимин. Сабактар боюнча суроом бар эле:` 
                        : `Здравствуйте! Я родитель ребенка ${activeChild.name} (Карта: ${activeChild.cardCode}). У меня вопрос по занятиям:`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/20 transition-all"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>{isKg ? 'WhatsApp аркылуу адиске жазуу' : (isEn ? 'Write to Therapist in WhatsApp' : 'Написать логопеду в WhatsApp')}</span>
                  </a>
                </div>
              </div>
            )}

          </div>
        )}

      </div>
    </section>
  );
};

