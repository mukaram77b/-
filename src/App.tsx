import React, { useState } from 'react';
import { 
  Language, 
  NavTab, 
  ChildPatient, 
  Lead, 
  Appointment, 
  ServiceItem, 
  Specialist, 
  Branch, 
  AppointmentStatus,
  PaymentRecord,
  SpecialistTimeSlot
} from './types';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ConditionsSection } from './components/ConditionsSection';
import { ServicesSection } from './components/ServicesSection';
import { EquipmentFeaturesSection } from './components/EquipmentFeaturesSection';
import { SpecialistsSection } from './components/SpecialistsSection';
import { BranchesMapSection } from './components/BranchesMapSection';
import { PortalSection } from './components/PortalSection';
import { AdminPanelSection } from './components/AdminPanelSection';
import { BookingModal } from './components/BookingModal';
import { ScreenerModal } from './components/ScreenerModal';
import { ServiceDetailsModal } from './components/ServiceDetailsModal';
import { ChatbotWidget } from './components/ChatbotWidget';
import { Footer } from './components/Footer';
import { 
  INITIAL_PATIENTS, 
  INITIAL_LEADS, 
  INITIAL_APPOINTMENTS, 
  INITIAL_SPECIALISTS,
  INITIAL_PAYMENTS,
  INITIAL_TIME_SLOTS
} from './constants/logosData';
import { Lock, X, Check, KeyRound } from 'lucide-react';
import { TRANSLATIONS } from './constants/translations';

export function App() {
  // App navigation and language state
  const [activeTab, setActiveTab] = useState<NavTab>('website');
  const [language, setLanguage] = useState<Language>('ky');
  const t = TRANSLATIONS[language];
  const isKg = language === 'ky';

  // Admin Authentication State (Hidden from regular clients)
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(false);
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState<boolean>(false);
  const [enteredPin, setEnteredPin] = useState<string>('');
  const [pinError, setPinError] = useState<string>('');

  // Core Data State
  const [patients, setPatients] = useState<ChildPatient[]>(INITIAL_PATIENTS);
  const [leads, setLeads] = useState<Lead[]>(INITIAL_LEADS);
  const [appointments, setAppointments] = useState<Appointment[]>(INITIAL_APPOINTMENTS);
  const [specialists] = useState<Specialist[]>(INITIAL_SPECIALISTS);
  const [payments, setPayments] = useState<PaymentRecord[]>(INITIAL_PAYMENTS);
  const [timeSlots, setTimeSlots] = useState<SpecialistTimeSlot[]>(INITIAL_TIME_SLOTS);

  // Modal States
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isScreenerOpen, setIsScreenerOpen] = useState(false);
  const [selectedServiceForDetails, setSelectedServiceForDetails] = useState<ServiceItem | null>(null);
  const [preselectedService, setPreselectedService] = useState<ServiceItem | null>(null);
  const [preselectedSpecialist, setPreselectedSpecialist] = useState<Specialist | null>(null);
  const [preselectedBranch, setPreselectedBranch] = useState<Branch | null>(null);

  // Handlers
  const handleAddPayment = (newPayment: PaymentRecord) => {
    setPayments(prev => [newPayment, ...prev]);
  };

  const handleToggleTimeSlot = (slotId: string) => {
    setTimeSlots(prev => prev.map(ts => {
      if (ts.id === slotId) {
        const nextStatus: 'available' | 'booked' | 'break' = 
          ts.status === 'available' ? 'booked' : ts.status === 'booked' ? 'break' : 'available';
        return {
          ...ts,
          status: nextStatus,
          isBooked: nextStatus === 'booked'
        };
      }
      return ts;
    }));
  };
  const handleOpenBooking = () => {
    setPreselectedService(null);
    setPreselectedSpecialist(null);
    setPreselectedBranch(null);
    setIsBookingOpen(true);
  };

  const handleOpenBookingWithService = (service: ServiceItem) => {
    setPreselectedService(service);
    setIsBookingOpen(true);
  };

  const handleOpenBookingWithSpecialist = (specialist: Specialist) => {
    setPreselectedSpecialist(specialist);
    setIsBookingOpen(true);
  };

  const handleOpenBookingWithBranch = (branch: Branch) => {
    setPreselectedBranch(branch);
    setIsBookingOpen(true);
  };

  // Appointment creation from Booking modal or Admin
  const handleAddAppointment = (newApp: Omit<Appointment, 'id' | 'createdAt'>) => {
    const created: Appointment = {
      ...newApp,
      id: `app-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    setAppointments(prev => [created, ...prev]);
  };

  const handleUpdateAppointmentStatus = (id: string, status: AppointmentStatus) => {
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, status } : a));
  };

  const handleAddPatient = (newPatient: ChildPatient) => {
    setPatients(prev => [newPatient, ...prev]);
  };

  const handleUpdatePatient = (updated: ChildPatient) => {
    setPatients(prev => prev.map(p => p.id === updated.id ? updated : p));
  };

  const handleSaveLead = (newLeadData: Omit<Lead, 'id' | 'createdAt'>) => {
    const newLead: Lead = {
      ...newLeadData,
      id: `lead-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setLeads(prev => [newLead, ...prev]);
  };

  const handleConvertLeadToPatient = (lead: Lead) => {
    const assignedSpec = specialists[0];
    const newPatient: ChildPatient = {
      id: `p-${Date.now()}`,
      name: lead.childName || 'Жаңы бала',
      birthDate: '2022-01-01',
      age: lead.childAge || 4,
      gender: 'male',
      diagnosis: 'ЗПР / ЗПРР (Кечигүү)',
      parentName: lead.parentName,
      phone: lead.phone,
      branchId: lead.preferredBranch || 'branch-1',
      assignedSpecialistId: assignedSpec.id,
      assignedSpecialistName: assignedSpec.name,
      remainingLessons: 12,
      totalSessionsCompleted: 0,
      status: 'active',
      avatarUrl: 'https://images.unsplash.com/photo-1543332164-6e82f355badc?auto=format&fit=crop&w=300&q=80',
      speechScore: 35,
      sensoryScore: 40,
      motorScore: 50,
      socialScore: 45,
      notes: `Лидден кошулду. Баштапкы даттануу: ${lead.concernKg || lead.concernRu}`,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setPatients(prev => [newPatient, ...prev]);
    setLeads(prev => prev.filter(l => l.id !== lead.id));
  };

  // Admin Access Flow
  const handleAdminEntranceClick = () => {
    if (isAdminAuthenticated) {
      setActiveTab('admin');
    } else {
      setPinError('');
      setEnteredPin('');
      setIsAdminLoginOpen(true);
    }
  };

  const handleVerifyAdminPin = (e: React.FormEvent) => {
    e.preventDefault();
    // Default PIN: 1234 (or any 4-digit code)
    if (enteredPin === '1234' || enteredPin === 'admin' || enteredPin === '0000') {
      setIsAdminAuthenticated(true);
      setIsAdminLoginOpen(false);
      setActiveTab('admin');
    } else {
      setPinError(t.admin.invalidPin);
    }
  };

  const handleQuickDemoAdminLogin = () => {
    setIsAdminAuthenticated(true);
    setIsAdminLoginOpen(false);
    setActiveTab('admin');
  };

  const handleLogoutAdmin = () => {
    setIsAdminAuthenticated(false);
    setActiveTab('website');
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans antialiased selection:bg-sky-500 selection:text-white">
      
      {/* Universal Navigation Bar */}
      {activeTab !== 'admin' && (
        <Navbar
          currentTab={activeTab}
          setCurrentTab={setActiveTab}
          language={language}
          setLanguage={setLanguage}
          onOpenBooking={handleOpenBooking}
          onOpenScreener={() => setIsScreenerOpen(true)}
          onOpenAdminLogin={handleAdminEntranceClick}
          isAdminAuthenticated={isAdminAuthenticated}
        />
      )}

      {/* Main Routing */}
      <main className="flex-1">
        
        {/* PUBLIC WEBSITE */}
        {activeTab === 'website' && (
          <div className="space-y-0">
            <HeroSection
              language={language}
              onOpenBooking={handleOpenBooking}
              onOpenBookingWithService={handleOpenBookingWithService}
              onOpenServiceDetails={(service) => setSelectedServiceForDetails(service)}
              onOpenScreener={() => setIsScreenerOpen(true)}
              onSwitchToCrm={() => {
                const element = document.getElementById('services-section');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                } else {
                  handleOpenBooking();
                }
              }}
              onSwitchTab={setActiveTab}
            />

            <ConditionsSection
              language={language}
              onOpenBooking={handleOpenBooking}
              onOpenBookingWithService={handleOpenBookingWithService}
              onOpenServiceDetails={(service) => setSelectedServiceForDetails(service)}
            />

            <ServicesSection
              language={language}
              onOpenBookingWithService={handleOpenBookingWithService}
              onOpenServiceDetails={(service) => setSelectedServiceForDetails(service)}
            />

            <EquipmentFeaturesSection
              language={language}
            />

            <SpecialistsSection
              language={language}
              onOpenBookingWithSpecialist={handleOpenBookingWithSpecialist}
            />

            <BranchesMapSection
              language={language}
              onOpenBookingWithBranch={handleOpenBookingWithBranch}
            />
          </div>
        )}

        {/* PARENT PORTAL & HOMEWORK */}
        {activeTab === 'portal' && (
          <PortalSection
            language={language}
            patients={patients}
          />
        )}

        {/* SECURE ADMIN PANEL (HIDDEN FROM REGULAR CLIENTS) */}
        {activeTab === 'admin' && isAdminAuthenticated && (
          <AdminPanelSection
            language={language}
            patients={patients}
            leads={leads}
            appointments={appointments}
            specialists={specialists}
            payments={payments}
            timeSlots={timeSlots}
            onAddPatient={handleAddPatient}
            onUpdatePatient={handleUpdatePatient}
            onConvertLeadToPatient={handleConvertLeadToPatient}
            onAddAppointment={handleAddAppointment}
            onUpdateAppointmentStatus={handleUpdateAppointmentStatus}
            onAddPayment={handleAddPayment}
            onToggleTimeSlot={handleToggleTimeSlot}
            onReturnToWebsite={() => setActiveTab('website')}
            onLogoutAdmin={handleLogoutAdmin}
          />
        )}

      </main>

      {/* Footer (only when on website or portal) */}
      {activeTab !== 'admin' && (
        <Footer
          language={language}
          onOpenBooking={handleOpenBooking}
          onOpenScreener={() => setIsScreenerOpen(true)}
          onSwitchTab={setActiveTab}
          onOpenAdminLogin={handleAdminEntranceClick}
        />
      )}

      {/* Interactive AI Chatbot Widget (Floating) */}
      {activeTab !== 'admin' && (
        <ChatbotWidget
          language={language}
          onOpenBooking={handleOpenBooking}
          onOpenScreener={() => setIsScreenerOpen(true)}
        />
      )}

      {/* Online Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        language={language}
        preselectedService={preselectedService}
        preselectedSpecialist={preselectedSpecialist}
        preselectedBranch={preselectedBranch}
        onAddAppointment={handleAddAppointment}
      />

      {/* Service Details Modal */}
      <ServiceDetailsModal
        isOpen={!!selectedServiceForDetails}
        onClose={() => setSelectedServiceForDetails(null)}
        service={selectedServiceForDetails}
        language={language}
        onBookService={(service) => {
          setSelectedServiceForDetails(null);
          handleOpenBookingWithService(service);
        }}
      />

      {/* Interactive Child Speech & Development Screener Modal */}
      <ScreenerModal
        isOpen={isScreenerOpen}
        onClose={() => setIsScreenerOpen(false)}
        language={language}
        onBookDiagnosisWithConcern={() => {
          handleOpenBooking();
        }}
        onSaveLead={handleSaveLead}
      />

      {/* Secure Admin Login Modal (Hidden protection for Admin Panel) */}
      {isAdminLoginOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-slate-900 w-full max-w-sm rounded-3xl shadow-2xl border border-slate-800 p-6 text-white space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-rose-500/20 text-rose-400 border border-rose-500/30 flex items-center justify-center">
                  <Lock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white">
                    {isKg ? 'Администратор кабинети' : 'Кабинет Администратора'}
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    {isKg ? 'Коопсуз кирүү' : 'Защищенный вход'}
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIsAdminLoginOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleVerifyAdminPin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  PIN код же пароль:
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    placeholder={t.admin.passcodePlaceholder}
                    value={enteredPin}
                    onChange={(e) => {
                      setEnteredPin(e.target.value);
                      setPinError('');
                    }}
                    autoFocus
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-sm text-white focus:outline-rose-500"
                  />
                </div>
                {pinError && (
                  <p className="text-[11px] text-rose-400 font-bold mt-1.5">{pinError}</p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-lg shadow-rose-600/30 transition-all"
                >
                  {t.admin.enterBtn}
                </button>
                <button
                  type="button"
                  onClick={handleQuickDemoAdminLogin}
                  className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-all border border-slate-700"
                >
                  {t.admin.demoLoginBtn} (PIN: 1234)
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

export default App;
