import React from 'react';
import { Language, AppointmentBooking } from '../types/spa';
import { TRANSLATIONS } from '../constants/translations';
import { SPA_INFO } from '../constants/spaData';
import { 
  X, 
  Calendar, 
  Clock, 
  MapPin, 
  Trash2, 
  MessageCircle, 
  Building2,
  CheckCircle,
  Flower2
} from 'lucide-react';

interface MyBookingsDrawerProps {
  language: Language;
  isOpen: boolean;
  onClose: () => void;
  bookings: AppointmentBooking[];
  onCancelBooking: (bookingId: string) => void;
}

export const MyBookingsDrawer: React.FC<MyBookingsDrawerProps> = ({
  language,
  isOpen,
  onClose,
  bookings,
  onCancelBooking
}) => {
  const t = TRANSLATIONS[language];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0c1117] border-l border-[#c5a059]/30 p-6 flex flex-col justify-between shadow-2xl text-slate-200">
          
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-2">
              <Flower2 className="w-5 h-5 text-[#c5a059]" />
              <h3 className="text-lg font-serif font-bold text-white">
                {t.myBookings.title}
              </h3>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Bookings List */}
          <div className="py-6 overflow-y-auto flex-1 space-y-4">
            {bookings.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-slate-500">
                  <Calendar className="w-6 h-6" />
                </div>
                <p className="text-sm text-slate-400">
                  {t.myBookings.empty}
                </p>
              </div>
            ) : (
              bookings.map((b) => (
                <div
                  key={b.id}
                  className="p-4 rounded-2xl border border-white/10 bg-[#121921] space-y-3 relative group hover:border-[#c5a059]/50 transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-mono text-[#c5a059] uppercase">
                        {b.confirmationCode}
                      </span>
                      <h4 className="text-sm font-serif font-bold text-white leading-snug">
                        {b.serviceName}
                      </h4>
                    </div>

                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-950 border border-emerald-500/40 text-emerald-300">
                      {language === 'kg' ? 'Тастыкталды' : language === 'ru' ? 'Подтвержден' : 'Confirmed'}
                    </span>
                  </div>

                  <div className="space-y-1 text-xs text-slate-300">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-[#c5a059]" />
                      <span>{b.date} саат {b.timeSlot} ({b.durationMin} {language === 'kg' ? 'мүнөт' : language === 'ru' ? 'мин' : 'min'})</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Building2 className="w-3.5 h-3.5 text-[#c5a059]" />
                      <span>{b.branchName}</span>
                    </div>

                    <div className="flex items-center gap-2 text-slate-400">
                      <span>Мастер: {b.therapistName}</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                    <span className="text-sm font-bold text-[#f5d77f]">
                      {b.totalPrice.toLocaleString()} {t.currency}
                    </span>

                    <div className="flex items-center gap-2">
                      <a
                        href={`https://wa.me/${SPA_INFO.whatsapp}?text=${encodeURIComponent(`Саламатсызбы! Менин жазылуум: ${b.confirmationCode}, ${b.serviceName}, ${b.date} ${b.timeSlot}`)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 rounded-lg bg-emerald-950 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-900 transition-colors"
                        title="WhatsApp"
                      >
                        <MessageCircle className="w-4 h-4" />
                      </a>

                      <button
                        onClick={() => onCancelBooking(b.id)}
                        className="p-1.5 rounded-lg bg-rose-950/60 border border-rose-500/30 text-rose-300 hover:bg-rose-900 transition-colors"
                        title={t.myBookings.cancelBooking}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Contact */}
          <div className="border-t border-white/10 pt-4 text-center space-y-2">
            <span className="text-xs text-slate-400 block">
              {language === 'kg' ? 'Суроолор боюнча колдоо кызматы:' : language === 'ru' ? 'Служба поддержки гостей:' : 'Guest concierge:'}
            </span>
            <a 
              href={`tel:${SPA_INFO.phone.replace(/[^0-9]/g, '')}`}
              className="text-sm font-bold text-[#f5d77f] hover:underline block"
            >
              {SPA_INFO.phone}
            </a>
          </div>

        </div>
      </div>
    </div>
  );
};
