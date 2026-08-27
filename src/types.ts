export type Language = 'ky' | 'ru' | 'en';

export type NavTab = 'website' | 'portal' | 'admin';

export type ChildDiagnosis = 
  | 'РАС / Аутизм спектри'
  | 'Аутизм (Классикалык)'
  | 'ДЦП (Церебралдык шал)'
  | 'ЗПР / ЗПРР (Кечигүү)'
  | 'Дислалия / Дизартрия'
  | 'Мотордук / Сенсордук алалия'
  | 'Кекечтенүү (Заикание)'
  | 'СДВГ / Гиперактивдүүлүк'
  | 'Сенсордук дисфункция';

export type SpecialistRole = 
  | 'логопед-дефектолог'
  | 'дефектолог'
  | 'сенсордук_терапевт'
  | 'ава_терапевт'
  | 'афк_инструктор'
  | 'нейропсихолог'
  | 'сурдопедагог';

export type ServiceCategory = 
  | 'диагностика'
  | 'логопедия'
  | 'дефектолог'
  | 'сенсорика'
  | 'ава'
  | 'афк'
  | 'комплекс';

export interface MilestoneStep {
  stage: string;
  focus: string;
  status?: 'completed' | 'in-progress' | 'pending';
}

export interface IOMPlan {
  goals: string[];
  recommendedProgram: string;
  frequency: string;
  assignedSpecialists: string[];
  milestones: MilestoneStep[];
  homeRecommendations: string[];
  lastUpdated: string;
}

export interface ChildPatient {
  id: string;
  cardCode?: string; // e.g. LOGOS-101
  accessPin?: string; // e.g. 1234
  name: string;
  birthDate: string;
  age: number;
  gender: 'male' | 'female';
  diagnosis: ChildDiagnosis;
  parentName: string;
  phone: string;
  email?: string;
  branchId: string;
  assignedSpecialistId: string;
  assignedSpecialistName: string;
  remainingLessons: number;
  totalSessionsCompleted: number;
  status: 'active' | 'diagnostic' | 'on_break' | 'graduated';
  avatarUrl: string;
  speechScore: number;     // 0 - 100
  sensoryScore: number;    // 0 - 100
  motorScore: number;      // 0 - 100
  socialScore: number;     // 0 - 100
  notes: string;
  allergiesOrPrecautions?: string;
  iomPlan?: IOMPlan;
  createdAt: string;
}

export interface Specialist {
  id: string;
  name: string;
  role: SpecialistRole;
  titleKg: string;
  titleRu: string;
  experienceYears: number;
  photoUrl: string;
  bioKg: string;
  bioRu: string;
  phone: string;
  rating: number;
  roomNumber: string;
  hourlyRate: number;
  activePatientsCount: number;
  specializationTags: string[];
}

export interface ServiceItem {
  id: string;
  nameKg: string;
  nameRu: string;
  category: ServiceCategory;
  price: number;
  durationMinutes: number;
  descriptionKg: string;
  descriptionRu: string;
  targetConditions: string[];
  icon: string;
  isPopular?: boolean;
}

export type AppointmentStatus = 'scheduled' | 'in-progress' | 'completed' | 'cancelled' | 'no-show';
export type PaymentStatus = 'paid' | 'unpaid' | 'subscription';

export interface Appointment {
  id: string;
  childId?: string;
  childName: string;
  childAge: number;
  parentName: string;
  phone: string;
  serviceId: string;
  serviceName: string;
  specialistId: string;
  specialistName: string;
  room: string;
  branchId: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  status: AppointmentStatus;
  paymentStatus: PaymentStatus;
  price: number;
  notes?: string;
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  suggestions?: string[];
}

export interface Lead {
  id: string;
  parentName: string;
  phone: string;
  childName?: string;
  childAge?: number;
  concernKg: string;
  concernRu: string;
  source: 'website_form' | 'chatbot' | 'call' | 'screener';
  status: 'new' | 'contacted' | 'diagnosed' | 'enrolled' | 'cancelled';
  preferredBranch: string;
  createdAt: string;
}

export interface HomeworkTask {
  id: string;
  childId: string;
  titleKg: string;
  titleRu: string;
  instructionsKg: string;
  instructionsRu: string;
  category: 'articular' | 'sensory' | 'motor' | 'behavior';
  durationMinutes: number;
  isCompleted: boolean;
  assignedDate: string;
  completedAt?: string;
  icon: string;
}

export interface ScreeningQuestion {
  id: number;
  questionKg: string;
  questionRu: string;
  category: 'speech' | 'autism_mchat' | 'sensory' | 'motor';
  ageRange: string;
  options: {
    labelKg: string;
    labelRu: string;
    points: number;
    riskWeight?: number;
  }[];
}

export interface PaymentRecord {
  id: string;
  childName: string;
  parentName: string;
  phone: string;
  amount: number;
  paymentMethod: 'mbank' | 'odengi' | 'cash' | 'elkart' | 'visa';
  serviceType: 'subscription_12' | 'subscription_8' | 'single_lesson' | 'diagnostic' | 'sensory' | 'other';
  serviceName: string;
  receiptNumber: string;
  date: string;
  time: string;
  status: 'paid' | 'pending' | 'refunded';
  notes?: string;
}

export interface SpecialistTimeSlot {
  id: string;
  specialistId: string;
  specialistName: string;
  date: string;
  time: string; // '09:00', '10:00', etc.
  isBooked: boolean;
  status: 'available' | 'booked' | 'break';
  childName?: string;
  serviceName?: string;
  room?: string;
  notes?: string;
}

export interface Branch {
  id: string;
  nameKg: string;
  nameRu: string;
  addressKg: string;
  addressRu: string;
  lat: number;
  lng: number;
  phone: string;
  whatsapp: string;
  workHoursKg: string;
  workHoursRu: string;
  roomsCount: number;
  specialFeatures: string[];
}
