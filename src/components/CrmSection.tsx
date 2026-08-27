import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Plus, 
  Filter, 
  Brain, 
  Sparkles, 
  Activity, 
  Phone, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  FileText, 
  ChevronRight, 
  Award, 
  UserPlus, 
  BarChart3, 
  Layers, 
  Check, 
  Send,
  Loader2,
  X
} from 'lucide-react';
import { Language, ChildPatient, ChildDiagnosis, Lead, Specialist } from '../types';
import { TRANSLATIONS } from '../constants/translations';
import { INITIAL_SPECIALISTS, INITIAL_BRANCHES } from '../constants/logosData';

interface CrmSectionProps {
  language: Language;
  patients: ChildPatient[];
  leads: Lead[];
  specialists: Specialist[];
  onAddPatient: (patient: ChildPatient) => void;
  onUpdatePatient: (patient: ChildPatient) => void;
  onConvertLeadToPatient: (lead: Lead) => void;
  onOpenBookingForChild?: (patient: ChildPatient) => void;
}

export const CrmSection: React.FC<CrmSectionProps> = ({
  language,
  patients,
  leads,
  specialists,
  onAddPatient,
  onUpdatePatient,
  onConvertLeadToPatient,
  onOpenBookingForChild
}) => {
  const t = TRANSLATIONS[language];
  const isKg = language === 'ky';

  const [activeTab, setActiveTab] = useState<'patients' | 'leads' | 'specialists' | 'analytics'>('patients');
  const [searchQuery, setSearchQuery] = useState('');
  const [diagnosisFilter, setDiagnosisFilter] = useState<string>('all');
  const [selectedPatient, setSelectedPatient] = useState<ChildPatient | null>(null);
  const [isAddPatientModalOpen, setIsAddPatientModalOpen] = useState(false);
  const [isGeneratingAiIom, setIsGeneratingAiIom] = useState(false);
  const [newSessionNote, setNewSessionNote] = useState('');

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

  // Filtered Patients
  const filteredPatients = patients.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.parentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.phone.includes(searchQuery);
    const matchesDiagnosis = diagnosisFilter === 'all' || p.diagnosis === diagnosisFilter;
    return matchesSearch && matchesDiagnosis;
  });

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
      speechScore: 30,
      sensoryScore: 40,
      motorScore: 50,
      socialScore: 40,
      notes: newPatientNotes,
      createdAt: new Date().toISOString().split('T')[0]
    };

    onAddPatient(newPatient);
    setIsAddPatientModalOpen(false);
    // Reset
    setNewPatientName('');
    setNewPatientParent('');
    setNewPatientPhone('');
    setNewPatientNotes('');
  };

  const handleGenerateAiIom = async (patient: ChildPatient) => {
    setIsGeneratingAiIom(true);
    try {
      const res = await fetch('/api/generate-iom', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          childName: patient.name,
          age: patient.age,
          diagnosis: patient.diagnosis,
          primaryIssues: patient.notes || 'Сүйлөөсү кечиккен, көңүл буруусу начар',
          language
        })
      });

      const data = await res.json();
      if (data && data.data) {
        const updatedPatient: ChildPatient = {
          ...patient,
          iomPlan: {
            goals: data.data.goals || ['Сүйлөө аппаратын даярдоо', 'Сенсориканы жөнгө салуу'],
            recommendedProgram: data.data.recommendedProgram || 'Комплекстүү логопедия + сенсорика',
            frequency: data.data.frequency || 'Жумасына 3 жолу',
            assignedSpecialists: data.data.assignedSpecialists || ['Логопед-дефектолог'],
            milestones: (data.data.milestones || []).map((m: { stage: string; focus: string }) => ({
              stage: m.stage,
              focus: m.focus,
              status: 'in-progress'
            })),
            homeRecommendations: data.data.homeRecommendations || ['Күн сайын 10 мин артикуляция'],
            lastUpdated: new Date().toISOString().split('T')[0]
          }
        };
        onUpdatePatient(updatedPatient);
        setSelectedPatient(updatedPatient);
      }
    } catch (err) {
      console.error('Failed to generate IOM:', err);
    } finally {
      setIsGeneratingAiIom(false);
    }
  };

  const handleLessonIncrement = (patient: ChildPatient, delta: number) => {
    const nextLessons = Math.max(0, patient.remainingLessons + delta);
    const nextCompleted = delta < 0 ? patient.totalSessionsCompleted + 1 : patient.totalSessionsCompleted;
    const updated = {
      ...patient,
      remainingLessons: nextLessons,
      totalSessionsCompleted: nextCompleted
    };
    onUpdatePatient(updated);
    if (selectedPatient?.id === patient.id) {
      setSelectedPatient(updated);
    }
  };

  const handleAddSessionNote = (patient: ChildPatient) => {
    if (!newSessionNote.trim()) return;
    const timestamp = new Date().toLocaleDateString();
    const updatedNotes = `${patient.notes}\n[${timestamp}]: ${newSessionNote.trim()}`;
    const updated = { ...patient, notes: updatedNotes };
    onUpdatePatient(updated);
    setSelectedPatient(updated);
    setNewSessionNote('');
  };

  return (
    <section className="py-8 bg-slate-100/70 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-2xl bg-sky-600 text-white flex items-center justify-center shadow-md shadow-sky-600/20">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-black text-slate-900 font-display">
                  {t.crm.title}
                </h2>
                <p className="text-xs text-slate-500 font-medium">
                  {t.crm.subtitle}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsAddPatientModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold shadow-md shadow-sky-600/20 flex items-center gap-1.5 transition-all"
            >
              <UserPlus className="w-4 h-4" />
              <span>{t.crm.addNewPatient}</span>
            </button>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          <button
            onClick={() => setActiveTab('patients')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-2 shrink-0 transition-all ${
              activeTab === 'patients'
                ? 'bg-slate-900 text-white shadow-md'
                : 'bg-white text-slate-600 hover:bg-slate-200/60 border border-slate-200'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>{t.crm.patientsTab}</span>
            <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-sky-600 text-white font-black">
              {patients.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('leads')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-2 shrink-0 transition-all ${
              activeTab === 'leads'
                ? 'bg-slate-900 text-white shadow-md'
                : 'bg-white text-slate-600 hover:bg-slate-200/60 border border-slate-200'
            }`}
          >
            <Phone className="w-4 h-4" />
            <span>{t.crm.leadsTab}</span>
            <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-amber-500 text-slate-950 font-black">
              {leads.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('specialists')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-2 shrink-0 transition-all ${
              activeTab === 'specialists'
                ? 'bg-slate-900 text-white shadow-md'
                : 'bg-white text-slate-600 hover:bg-slate-200/60 border border-slate-200'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>{t.crm.specialistsTab}</span>
          </button>

          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-2 shrink-0 transition-all ${
              activeTab === 'analytics'
                ? 'bg-slate-900 text-white shadow-md'
                : 'bg-white text-slate-600 hover:bg-slate-200/60 border border-slate-200'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>{t.crm.analyticsTab}</span>
          </button>
        </div>

        {/* TAB 1: PATIENTS DATABASE */}
        {activeTab === 'patients' && (
          <div className="space-y-4">
            
            {/* Search and Filters Bar */}
            <div className="p-4 bg-white rounded-2xl border border-slate-200 flex flex-col md:flex-row gap-3 items-center justify-between">
              <div className="relative w-full md:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder={t.crm.searchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-sky-500"
                />
              </div>

              <div className="flex items-center gap-2 w-full md:w-auto">
                <Filter className="w-4 h-4 text-slate-400 shrink-0" />
                <select
                  value={diagnosisFilter}
                  onChange={(e) => setDiagnosisFilter(e.target.value)}
                  className="w-full md:w-auto px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-700 font-medium"
                >
                  <option value="all">{t.crm.all}</option>
                  <option value="РАС / Аутизм спектри">РАС / Аутизм</option>
                  <option value="ДЦП (Церебралдык шал)">ДЦП</option>
                  <option value="ЗПР / ЗПРР (Кечигүү)">ЗПР / ЗПРР</option>
                  <option value="Дислалия / Дизартрия">Дислалия / Дизартрия</option>
                  <option value="Мотордук / Сенсордук алалия">Алалия</option>
                  <option value="СДВГ / Гиперактивдүүлүк">СДВГ</option>
                </select>
              </div>
            </div>

            {/* Patients Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredPatients.map((patient) => (
                <div
                  key={patient.id}
                  className="rounded-3xl bg-white border border-slate-200/80 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    {/* Top Row: Avatar + Name + Diagnosis Tag */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <img
                          src={patient.avatarUrl}
                          alt={patient.name}
                          className="w-12 h-12 rounded-2xl object-cover border border-slate-200"
                        />
                        <div>
                          <h4 className="font-bold text-sm text-slate-900 font-display">
                            {patient.name}
                          </h4>
                          <span className="text-xs text-slate-500 font-medium">
                            {patient.age} {t.crm.ageYears} • {patient.gender === 'male' ? 'Уул' : 'Кыз'}
                          </span>
                        </div>
                      </div>

                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-sky-100 text-sky-800 shrink-0">
                        {patient.diagnosis.split('/')[0]}
                      </span>
                    </div>

                    {/* Assigned Specialist & Parent */}
                    <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 text-xs space-y-1">
                      <div className="flex items-center justify-between text-slate-600">
                        <span>{t.crm.specialist}</span>
                        <span className="font-bold text-slate-900">{patient.assignedSpecialistName}</span>
                      </div>
                      <div className="flex items-center justify-between text-slate-600">
                        <span>Ата-эне:</span>
                        <span className="font-medium text-slate-800">{patient.parentName}</span>
                      </div>
                      <div className="flex items-center justify-between text-slate-600">
                        <span>{t.crm.phone}</span>
                        <a href={`tel:${patient.phone}`} className="text-sky-700 font-bold hover:underline">
                          {patient.phone}
                        </a>
                      </div>
                    </div>

                    {/* Lesson Counter Controls */}
                    <div className="flex items-center justify-between p-2 rounded-xl bg-sky-50/70 border border-sky-100 text-xs">
                      <div>
                        <div className="text-[10px] text-slate-500">{t.crm.remainingLessons}</div>
                        <div className="text-base font-black text-sky-900">
                          {patient.remainingLessons} <span className="text-[10px] font-medium text-slate-500">/ өткөнү: {patient.totalSessionsCompleted}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleLessonIncrement(patient, -1)}
                          title="Сабак өттү (-1)"
                          className="px-2 py-1 bg-white border border-sky-200 text-sky-800 font-bold rounded-lg hover:bg-sky-100 active:scale-95 text-xs"
                        >
                          -1 сабак
                        </button>
                        <button
                          onClick={() => handleLessonIncrement(patient, 1)}
                          title="Кошуу (+1)"
                          className="px-2 py-1 bg-sky-600 text-white font-bold rounded-lg hover:bg-sky-700 active:scale-95 text-xs"
                        >
                          +1
                        </button>
                      </div>
                    </div>

                    {/* Progress indicators mini */}
                    <div className="grid grid-cols-2 gap-2 text-[11px]">
                      <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                        <div className="flex justify-between text-slate-500 mb-0.5">
                          <span>Кеп:</span>
                          <span className="font-bold text-slate-800">{patient.speechScore}%</span>
                        </div>
                        <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                          <div className="h-full bg-sky-500" style={{ width: `${patient.speechScore}%` }} />
                        </div>
                      </div>

                      <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                        <div className="flex justify-between text-slate-500 mb-0.5">
                          <span>Сенсорика:</span>
                          <span className="font-bold text-slate-800">{patient.sensoryScore}%</span>
                        </div>
                        <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                          <div className="h-full bg-teal-500" style={{ width: `${patient.sensoryScore}%` }} />
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* Open Profile Button */}
                  <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between">
                    <button
                      onClick={() => setSelectedPatient(patient)}
                      className="w-full py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-xs"
                    >
                      <Brain className="w-3.5 h-3.5 text-sky-400" />
                      <span>{t.crm.openCard}</span>
                    </button>
                  </div>

                </div>
              ))}
            </div>

          </div>
        )}

        {/* TAB 2: LEADS PIPELINE */}
        {activeTab === 'leads' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {leads.map((lead) => (
                <div
                  key={lead.id}
                  className="rounded-3xl bg-white border border-slate-200 p-5 shadow-xs flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                        {lead.source === 'chatbot' ? '🤖 AI Чат-боттон' : lead.source === 'screener' ? '✨ Экспресс-тесттен' : '🌐 Сайттан форма'}
                      </span>
                      <span className="text-[11px] text-slate-400 font-medium">
                        {lead.createdAt}
                      </span>
                    </div>

                    <div>
                      <h4 className="font-bold text-sm text-slate-900">
                        {lead.parentName}
                      </h4>
                      <p className="text-xs text-slate-500">
                        Баласы: {lead.childName || 'Аты жазылган эмес'} ({lead.childAge} жаш)
                      </p>
                    </div>

                    <div className="p-3 rounded-2xl bg-amber-50/70 border border-amber-200/60 text-xs text-amber-950 leading-relaxed">
                      <strong>Даттануусу:</strong> {isKg ? lead.concernKg : lead.concernRu}
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-slate-600">
                      <Phone className="w-3.5 h-3.5 text-sky-600" />
                      <a href={`tel:${lead.phone}`} className="font-bold text-sky-700 hover:underline">
                        {lead.phone}
                      </a>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                    <button
                      onClick={() => onConvertLeadToPatient(lead)}
                      className="w-full py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md shadow-sky-600/20 transition-all"
                    >
                      <UserPlus className="w-3.5 h-3.5" />
                      <span>Пациент кылып каттоо</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: SPECIALISTS WORKLOAD */}
        {activeTab === 'specialists' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {specialists.map((spec) => (
              <div
                key={spec.id}
                className="rounded-3xl bg-white border border-slate-200 p-6 shadow-xs space-y-4"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={spec.photoUrl}
                    alt={spec.name}
                    className="w-14 h-14 rounded-2xl object-cover border border-slate-200"
                  />
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">{spec.name}</h4>
                    <p className="text-xs text-sky-600 font-medium">{isKg ? spec.titleKg : spec.titleRu}</p>
                    <span className="text-[11px] text-slate-400">{spec.roomNumber}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-center">
                    <div className="text-lg font-black text-slate-900">{spec.activePatientsCount}</div>
                    <div className="text-[10px] text-slate-500 font-medium">Активдүү бала</div>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-center">
                    <div className="text-lg font-black text-emerald-600">{spec.rating} ★</div>
                    <div className="text-[10px] text-slate-500 font-medium">Рейтинг</div>
                  </div>
                </div>

                <div className="text-xs text-slate-600 space-y-1">
                  <div className="font-bold text-slate-800">Адистештирилген багыттары:</div>
                  <div className="flex flex-wrap gap-1">
                    {spec.specializationTags.map((tag, i) => (
                      <span key={i} className="px-2 py-0.5 bg-slate-100 text-[10px] rounded text-slate-700">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 4: ANALYTICS */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-3xl bg-white border border-slate-200">
                <div className="text-xs text-slate-500 font-bold uppercase">Катталган балдар</div>
                <div className="text-3xl font-black text-sky-600 font-display mt-1">{patients.length}</div>
                <div className="text-xs text-emerald-600 font-medium mt-1">↑ +18% бул айда</div>
              </div>
              <div className="p-5 rounded-3xl bg-white border border-slate-200">
                <div className="text-xs text-slate-500 font-bold uppercase">Аткарылган сабактар</div>
                <div className="text-3xl font-black text-teal-600 font-display mt-1">142</div>
                <div className="text-xs text-slate-500 font-medium mt-1">Орточо: 98% катышуу</div>
              </div>
              <div className="p-5 rounded-3xl bg-white border border-slate-200">
                <div className="text-xs text-slate-500 font-bold uppercase">Жаңы кайрылуулар</div>
                <div className="text-3xl font-black text-amber-600 font-display mt-1">{leads.length}</div>
                <div className="text-xs text-amber-700 font-medium mt-1">Иштелүүдө</div>
              </div>
              <div className="p-5 rounded-3xl bg-white border border-slate-200">
                <div className="text-xs text-slate-500 font-bold uppercase">Жалпы натыйжалуулук</div>
                <div className="text-3xl font-black text-indigo-600 font-display mt-1">94%</div>
                <div className="text-xs text-slate-500 font-medium mt-1">ИОМ көрсөткүчтөрү боюнча</div>
              </div>
            </div>

            {/* Diagnosis Breakdown */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-4">
              <h3 className="text-base font-bold text-slate-900 font-display">
                {isKg ? 'Диагноздор боюнча балдардын бөлүштүрүлүшү' : 'Распределение пациентов по диагнозам'}
              </h3>
              <div className="space-y-3 text-xs">
                <div>
                  <div className="flex justify-between font-bold text-slate-700 mb-1">
                    <span>РАС жана Аутизм (ABA + Сенсорика)</span>
                    <span>35%</span>
                  </div>
                  <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-sky-500 rounded-full w-[35%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-bold text-slate-700 mb-1">
                    <span>ЗПР жана ЗПРР (Дефектолог + Логопед)</span>
                    <span>30%</span>
                  </div>
                  <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500 rounded-full w-[30%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-bold text-slate-700 mb-1">
                    <span>ДЦП жана Мотордук бузулуулар (АФК + Кинезио)</span>
                    <span>20%</span>
                  </div>
                  <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-teal-500 rounded-full w-[20%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-bold text-slate-700 mb-1">
                    <span>Дислалия, Дизартрия жана Алалия</span>
                    <span>15%</span>
                  </div>
                  <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-violet-500 rounded-full w-[15%]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* MODAL: CHILD PATIENT PROFILE & IOM ROUTE */}
        {selectedPatient && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
              
              {/* Header */}
              <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between shrink-0">
                <div className="flex items-center gap-3">
                  <img
                    src={selectedPatient.avatarUrl}
                    alt={selectedPatient.name}
                    className="w-10 h-10 rounded-full object-cover border-2 border-sky-400"
                  />
                  <div>
                    <h3 className="font-bold text-base leading-tight">
                      {selectedPatient.name} ({selectedPatient.age} {t.crm.ageYears})
                    </h3>
                    <p className="text-xs text-sky-400">
                      {selectedPatient.diagnosis} • Адис: {selectedPatient.assignedSpecialistName}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedPatient(null)}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 overflow-y-auto space-y-6">
                
                {/* Top Quick Status & Lesson Balance */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-4 rounded-2xl bg-sky-50 border border-sky-100">
                    <div className="text-[10px] text-sky-800 font-bold uppercase">Абонементте калган:</div>
                    <div className="text-2xl font-black text-sky-900">{selectedPatient.remainingLessons} сабак</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100">
                    <div className="text-[10px] text-emerald-800 font-bold uppercase">Өтүлгөн сабактар:</div>
                    <div className="text-2xl font-black text-emerald-900">{selectedPatient.totalSessionsCompleted} сабак</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                    <div className="text-[10px] text-slate-500 font-bold uppercase">Ата-эне / Байланыш:</div>
                    <div className="text-xs font-bold text-slate-900">{selectedPatient.parentName}</div>
                    <div className="text-xs text-sky-600 font-bold">{selectedPatient.phone}</div>
                  </div>
                </div>

                {/* Individual Correction Route (ИОМ) Box */}
                <div className="p-5 rounded-3xl bg-slate-50 border border-slate-200 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200">
                    <div className="flex items-center gap-2">
                      <Brain className="w-5 h-5 text-sky-600" />
                      <h4 className="font-bold text-sm text-slate-900 font-display">
                        Индивидуалдуу Коррекциялык Маршрут (ИОМ)
                      </h4>
                    </div>

                    <button
                      onClick={() => handleGenerateAiIom(selectedPatient)}
                      disabled={isGeneratingAiIom}
                      className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 text-white text-xs font-bold shadow-xs hover:shadow-md transition-all flex items-center gap-1.5 shrink-0"
                    >
                      {isGeneratingAiIom ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          <span>AI маршрут түзүлүүдө...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                          <span>{t.crm.generateAiIom}</span>
                        </>
                      )}
                    </button>
                  </div>

                  {selectedPatient.iomPlan ? (
                    <div className="space-y-4 text-xs">
                      <div>
                        <div className="font-bold text-slate-800 mb-1">Негизги максаттар:</div>
                        <ul className="space-y-1">
                          {selectedPatient.iomPlan.goals.map((g, idx) => (
                            <li key={idx} className="flex items-center gap-2 text-slate-700">
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                              <span>{g}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Milestones */}
                      <div>
                        <div className="font-bold text-slate-800 mb-2">Этаптык пландар (Milestones):</div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                          {selectedPatient.iomPlan.milestones.map((m, idx) => (
                            <div key={idx} className="p-3 bg-white rounded-xl border border-slate-200 space-y-1">
                              <div className="font-bold text-slate-900 text-[11px]">{m.stage}</div>
                              <div className="text-slate-600 text-[11px]">{m.focus}</div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Home recommendations */}
                      <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-950">
                        <div className="font-bold mb-1">Үйгө тапшырма жана сунуштар:</div>
                        {selectedPatient.iomPlan.homeRecommendations.map((hr, idx) => (
                          <div key={idx} className="text-[11px]">• {hr}</div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-6 space-y-2">
                      <p className="text-xs text-slate-500">
                        Бул балага азырынча ИОМ маршруту түзүлө элек. Жогорудагы AI баскычын басыңыз.
                      </p>
                    </div>
                  )}
                </div>

                {/* Session Notes log */}
                <div className="space-y-3">
                  <h4 className="font-bold text-xs text-slate-900 uppercase tracking-wider">
                    Адистин күндөлүгү жана байкоолору:
                  </h4>
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 whitespace-pre-line max-h-36 overflow-y-auto">
                    {selectedPatient.notes || 'Жаңы жазыктар жок.'}
                  </div>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Жаңы сессиянын жыйынтыгын жазыңыз..."
                      value={newSessionNote}
                      onChange={(e) => setNewSessionNote(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-slate-300 focus:outline-sky-500"
                    />
                    <button
                      onClick={() => handleAddSessionNote(selectedPatient)}
                      className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 shrink-0"
                    >
                      Кошуу
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}

        {/* MODAL: ADD NEW PATIENT */}
        {isAddPatientModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
            <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
              <div className="px-6 py-4 bg-sky-600 text-white flex items-center justify-between">
                <h3 className="font-bold text-sm">Жаңы баланы базага кошуу</h3>
                <button onClick={() => setIsAddPatientModalOpen(false)} className="text-white">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleCreatePatientSubmit} className="p-6 overflow-y-auto space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Баланын аты:</label>
                    <input
                      type="text"
                      required
                      placeholder="Мисалы: Илим Бектемиров"
                      value={newPatientName}
                      onChange={(e) => setNewPatientName(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-300"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Жашы:</label>
                    <input
                      type="number"
                      required
                      min={1}
                      max={18}
                      value={newPatientAge}
                      onChange={(e) => setNewPatientAge(Number(e.target.value))}
                      className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-300"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Диагноз / Өзгөчөлүк:</label>
                  <select
                    value={newPatientDiagnosis}
                    onChange={(e) => setNewPatientDiagnosis(e.target.value as ChildDiagnosis)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-300"
                  >
                    <option value="РАС / Аутизм спектри">РАС / Аутизм спектри</option>
                    <option value="ДЦП (Церебралдык шал)">ДЦП (Церебралдык шал)</option>
                    <option value="ЗПР / ЗПРР (Кечигүү)">ЗПР / ЗПРР (Кечигүү)</option>
                    <option value="Дислалия / Дизартрия">Дислалия / Дизартрия</option>
                    <option value="Мотордук / Сенсордук алалия">Мотордук / Сенсордук алалия</option>
                    <option value="СДВГ / Гиперактивдүүлүк">СДВГ / Гиперактивдүүлүк</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Ата-эненин аты:</label>
                    <input
                      type="text"
                      required
                      placeholder="Мисалы: Чолпон Б."
                      value={newPatientParent}
                      onChange={(e) => setNewPatientParent(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-300"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Телефон:</label>
                    <input
                      type="tel"
                      required
                      placeholder="+996 700 000000"
                      value={newPatientPhone}
                      onChange={(e) => setNewPatientPhone(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-300"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Бекитилген адис:</label>
                    <select
                      value={newPatientSpecialistId}
                      onChange={(e) => setNewPatientSpecialistId(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-300"
                    >
                      {specialists.map(s => (
                        <option key={s.id} value={s.id}>{s.name} ({s.role})</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Абонемент сабак саны:</label>
                    <input
                      type="number"
                      value={newPatientLessons}
                      onChange={(e) => setNewPatientLessons(Number(e.target.value))}
                      className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-300"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Баштапкы анамнез / Эскертүү:</label>
                  <textarea
                    rows={2}
                    placeholder="Баланын абалы, даттануулары..."
                    value={newPatientNotes}
                    onChange={(e) => setNewPatientNotes(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-300"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs shadow-md"
                >
                  Сактоо жана Каттоо
                </button>
              </form>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
