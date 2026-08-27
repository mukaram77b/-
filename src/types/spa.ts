export type Language = 'kg' | 'ru' | 'en';

export interface ServiceAddon {
  id: string;
  name: {
    kg: string;
    ru: string;
    en: string;
  };
  price: number; // in KGS (сом)
  durationMin: number;
  description: {
    kg: string;
    ru: string;
    en: string;
  };
}

export type MassageCategory = 
  | 'therapeutic' 
  | 'thai' 
  | 'relax_aroma' 
  | 'stone' 
  | 'anti_cellulite' 
  | 'couples' 
  | 'facial';

export interface MassageService {
  id: string;
  category: MassageCategory;
  name: {
    kg: string;
    ru: string;
    en: string;
  };
  tagline: {
    kg: string;
    ru: string;
    en: string;
  };
  price: number; // in KGS
  durationMin: number;
  featured?: boolean;
  intensity: {
    kg: 'Жумшак' | 'Орточо' | 'Терең/Күчтүү';
    ru: 'Мягкий' | 'Средний' | 'Глубокий/Интенсивный';
    en: 'Gentle' | 'Medium' | 'Deep/Intense';
  };
  image: string;
  description: {
    kg: string;
    ru: string;
    en: string;
  };
  steps: {
    kg: string[];
    ru: string[];
    en: string[];
  };
  benefits: {
    kg: string[];
    ru: string[];
    en: string[];
  };
  recommendedAddons?: string[];
}

export interface MasterTherapist {
  id: string;
  name: string;
  title: {
    kg: string;
    ru: string;
    en: string;
  };
  bio: {
    kg: string;
    ru: string;
    en: string;
  };
  experienceYears: number;
  photo: string;
  rating: number;
  reviewCount: number;
  specialties: {
    kg: string[];
    ru: string[];
    en: string[];
  };
  certificates: string[];
  favoriteTechnique: {
    kg: string;
    ru: string;
    en: string;
  };
  availableDays: string[];
  branch: string;
}

export interface SpaBranch {
  id: string;
  name: {
    kg: string;
    ru: string;
    en: string;
  };
  address: {
    kg: string;
    ru: string;
    en: string;
  };
  landmark: {
    kg: string;
    ru: string;
    en: string;
  };
  phone: string;
  whatsapp: string;
  hours: string;
  map2GisUrl: string;
  yandexMapUrl: string;
  googleMapUrl?: string;
  lat: number;
  lng: number;
  image: string;
}

export interface AppointmentBooking {
  id: string;
  confirmationCode: string;
  serviceId: string;
  serviceName: string;
  addonIds: string[];
  addonNames: string[];
  therapistId: string;
  therapistName: string;
  branchId: string;
  branchName: string;
  date: string; // YYYY-MM-DD
  timeSlot: string;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  aromaOilPreference: string;
  pressurePreference: 'light' | 'medium' | 'firm';
  notes?: string;
  isVipSuite: boolean;
  totalPrice: number; // in KGS
  durationMin: number;
  status: 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface MembershipTier {
  id: string;
  name: string;
  tierSubtitle: {
    kg: string;
    ru: string;
    en: string;
  };
  monthlyPrice: number; // in KGS
  featured?: boolean;
  sessionsCount: string;
  perks: {
    kg: string[];
    ru: string[];
    en: string[];
  };
  badgeColor: string;
}

export interface BodySymptomMatch {
  id: string;
  title: {
    kg: string;
    ru: string;
    en: string;
  };
  bodyArea: 'neck_shoulders' | 'lower_back' | 'legs_feet' | 'full_body_stress' | 'post_workout' | 'face_lymph';
  icon: string;
  recommendedServiceId: string;
  recommendedDuration: string;
  advice: {
    kg: string;
    ru: string;
    en: string;
  };
}

export interface CustomerReview {
  id: string;
  authorName: string;
  city: string;
  rating: number;
  date: string;
  serviceName: string;
  therapistName: string;
  comment: {
    kg: string;
    ru: string;
    en: string;
  };
  avatar?: string;
}

export interface GiftVoucher {
  id: string;
  code: string;
  amount: number;
  recipientName: string;
  recipientPhone: string;
  senderName: string;
  message: string;
  theme: 'gold' | 'emerald' | 'rose';
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
}

// Backward-compatibility aliases
export type BarberService = MassageService;
export type MasterBarber = MasterTherapist;
