import React, { useState } from 'react';
import { Language } from '../types/spa';
import { TRANSLATIONS } from '../constants/translations';
import { SPA_INFO } from '../constants/spaData';
import { 
  Gift, 
  X, 
  Sparkles, 
  Check, 
  MessageCircle, 
  Heart,
  Flower2
} from 'lucide-react';

interface GiftCardsModalProps {
  language: Language;
  isOpen: boolean;
  onClose: () => void;
}

export const GiftCardsModal: React.FC<GiftCardsModalProps> = ({
  language,
  isOpen,
  onClose
}) => {
  const t = TRANSLATIONS[language];
  const [selectedAmount, setSelectedAmount] = useState<number>(5000);
  const [recipientName, setRecipientName] = useState('');
  const [recipientPhone, setRecipientPhone] = useState('+996 ');
  const [senderName, setSenderName] = useState('');
  const [giftMessage, setGiftMessage] = useState('');
  const [theme, setTheme] = useState<'gold' | 'emerald' | 'rose'>('gold');
  const [isGenerated, setIsGenerated] = useState(false);
  const [voucherCode, setVoucherCode] = useState('');

  if (!isOpen) return null;

  const amounts = [3000, 5000, 7500, 10000, 15000];

  const handleGenerateVoucher = () => {
    if (!recipientName.trim() || !senderName.trim()) {
      alert(language === 'kg' ? 'Сураныч, алуучунун жана өзүңүздүн атыңызды жазыңыз' : language === 'ru' ? 'Пожалуйста, укажите имя получателя и ваше имя' : 'Please enter recipient and sender names');
      return;
    }
    const code = 'GIFT-ARA-' + Math.floor(100000 + Math.random() * 900000);
    setVoucherCode(code);
    setIsGenerated(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#0c1117] border border-[#c5a059]/40 rounded-3xl max-w-2xl w-full max-h-[92vh] flex flex-col justify-between overflow-hidden shadow-2xl relative text-slate-200">
        
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-[#070a0e]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#c5a059]/20 border border-[#c5a059]/40 flex items-center justify-center text-[#f5d77f]">
              <Gift className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-serif font-bold text-white">
                {t.giftCardModal.title}
              </h3>
              <p className="text-xs text-slate-400">
                {t.giftCardModal.subtitle}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {!isGenerated ? (
            <>
              {/* Amount Picker */}
              <div>
                <label className="text-xs font-bold text-[#f5d77f] uppercase tracking-wider block mb-2.5">
                  {t.giftCardModal.chooseAmount}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {amounts.map((amt) => {
                    const isSelected = selectedAmount === amt;
                    return (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => setSelectedAmount(amt)}
                        className={`p-3 rounded-xl border text-center font-bold text-xs transition-all ${
                          isSelected
                            ? 'bg-gradient-to-r from-[#c5a059] to-[#e6ca85] text-slate-950 shadow'
                            : 'bg-white/[0.03] border-white/10 text-slate-300 hover:border-white/20'
                        }`}
                      >
                        {amt.toLocaleString()} {t.currency}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">
                    {t.giftCardModal.recipientName} *
                  </label>
                  <input
                    type="text"
                    placeholder="Мисалы: Айпери Садырова"
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    className="w-full p-3 rounded-xl bg-white/[0.04] border border-white/15 text-white text-xs focus:border-[#c5a059] outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">
                    {t.giftCardModal.recipientPhone}
                  </label>
                  <input
                    type="tel"
                    placeholder="+996 700 123456"
                    value={recipientPhone}
                    onChange={(e) => setRecipientPhone(e.target.value)}
                    className="w-full p-3 rounded-xl bg-white/[0.04] border border-white/15 text-white text-xs focus:border-[#c5a059] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">
                  {t.giftCardModal.senderName} *
                </label>
                <input
                  type="text"
                  placeholder="Мисалы: Нурлан"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  className="w-full p-3 rounded-xl bg-white/[0.04] border border-white/15 text-white text-xs focus:border-[#c5a059] outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">
                  {t.giftCardModal.giftMessage}
                </label>
                <textarea
                  rows={2}
                  placeholder="Туулган күнүң менен! Ден соолукта бол, эс ал..."
                  value={giftMessage}
                  onChange={(e) => setGiftMessage(e.target.value)}
                  className="w-full p-3 rounded-xl bg-white/[0.04] border border-white/15 text-white text-xs focus:border-[#c5a059] outline-none"
                />
              </div>
            </>
          ) : (
            /* Generated Voucher Card Display */
            <div className="py-4 space-y-6 animate-fadeIn">
              <div className="p-8 rounded-3xl border border-[#c5a059] bg-gradient-to-br from-[#1a150c] via-[#101419] to-[#0a0e14] shadow-2xl relative overflow-hidden">
                <div className="flex items-center justify-between border-b border-[#c5a059]/30 pb-4">
                  <div className="flex items-center gap-2">
                    <Flower2 className="w-5 h-5 text-[#f5d77f]" />
                    <span className="font-serif font-bold text-white tracking-wider text-sm">
                      {t.brandName}
                    </span>
                  </div>
                  <span className="text-[10px] text-[#c5a059] uppercase tracking-widest font-bold">
                    SPA GIFT CERTIFICATE
                  </span>
                </div>

                <div className="my-6 text-center space-y-2">
                  <span className="text-xs text-slate-400 uppercase tracking-wider block">
                    {language === 'kg' ? 'Сертификаттын суммасы:' : language === 'ru' ? 'Номинал сертификата:' : 'Amount:'}
                  </span>
                  <div className="text-4xl font-serif font-bold text-[#f5d77f]">
                    {selectedAmount.toLocaleString()} {t.currency}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-4 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 block">{t.giftCardModal.recipientName}:</span>
                    <span className="font-bold text-white text-sm">{recipientName}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block">{t.giftCardModal.senderName}:</span>
                    <span className="font-bold text-white text-sm">{senderName}</span>
                  </div>
                </div>

                {giftMessage && (
                  <div className="mt-4 p-3 rounded-xl bg-white/5 text-xs text-slate-300 italic text-center">
                    "{giftMessage}"
                  </div>
                )}

                <div className="mt-6 pt-4 border-t border-[#c5a059]/20 flex items-center justify-between text-[11px] text-[#c5a059]">
                  <span>Код: <strong className="text-white font-mono">{voucherCode}</strong></span>
                  <span>Бишкек • Эркиндик • Асанбай • Манас</span>
                </div>
              </div>

              {/* Share / WhatsApp button */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={`https://wa.me/${SPA_INFO.whatsapp}?text=${encodeURIComponent(`Саламатсызбы! Мен белек сертификатын тариздедим.\nКод: ${voucherCode}\nСумма: ${selectedAmount} сом\nАлуучу: ${recipientName}\nКимден: ${senderName}`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp аркылуу жөнөтүү</span>
                </a>

                <button
                  onClick={() => setIsGenerated(false)}
                  className="w-full sm:w-auto px-5 py-3 rounded-xl bg-white/10 text-white font-semibold text-xs"
                >
                  {language === 'kg' ? 'Жаңы сертификат' : language === 'ru' ? 'Создать еще' : 'Create another'}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer CTA */}
        {!isGenerated && (
          <div className="p-5 border-t border-white/10 bg-[#070a0e] flex items-center justify-between">
            <div className="text-xs">
              <span className="text-slate-400 block">{language === 'kg' ? 'Төлөнүүчү сумма:' : language === 'ru' ? 'К оплате:' : 'Total:'}</span>
              <span className="text-base font-bold text-[#f5d77f]">{selectedAmount.toLocaleString()} {t.currency}</span>
            </div>

            <button
              onClick={handleGenerateVoucher}
              className="px-7 py-3 rounded-xl bg-gradient-to-r from-[#c5a059] via-[#f7e4a8] to-[#c5a059] text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg hover:brightness-110 flex items-center gap-2 cursor-pointer"
            >
              <Gift className="w-4 h-4" />
              <span>{t.giftCardModal.payAndSend}</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
