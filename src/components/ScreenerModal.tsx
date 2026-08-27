import React, { useState } from 'react';
import { X, Sparkles, AlertCircle, CheckCircle2, ArrowRight, RotateCcw, Calendar, Phone, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Language, Lead } from '../types';
import { TRANSLATIONS } from '../constants/translations';
import { SCREENING_QUESTIONS } from '../constants/logosData';

interface ScreenerModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onBookDiagnosisWithConcern: (concern: string) => void;
  onSaveLead: (lead: Omit<Lead, 'id' | 'createdAt'>) => void;
}

export const ScreenerModal: React.FC<ScreenerModalProps> = ({
  isOpen,
  onClose,
  language,
  onBookDiagnosisWithConcern,
  onSaveLead
}) => {
  const t = TRANSLATIONS[language];
  const isKg = language === 'ky';

  const [currentStep, setCurrentStep] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [parentName, setParentName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [childAge, setChildAge] = useState<number>(3);
  const [leadSaved, setLeadSaved] = useState<boolean>(false);

  if (!isOpen) return null;

  const currentQ = SCREENING_QUESTIONS[currentStep];

  const handleSelectOption = (points: number) => {
    const nextAnswers = { ...answers, [currentQ.id]: points };
    setAnswers(nextAnswers);

    if (currentStep < SCREENING_QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsFinished(true);
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 }
      });
    }
  };

  const calculateTotalRisk = () => {
    let total = 0;
    Object.values(answers).forEach((p) => {
      total += Number(p) || 0;
    });
    return total;
  };

  const totalPoints = calculateTotalRisk();
  const isHighRisk = totalPoints >= 5;
  const isMediumRisk = totalPoints >= 2 && totalPoints < 5;

  const handleReset = () => {
    setCurrentStep(0);
    setAnswers({});
    setIsFinished(false);
    setLeadSaved(false);
  };

  const handleSaveResultLead = (e: React.FormEvent) => {
    e.preventDefault();
    const concernText = isHighRisk 
      ? 'Экспресс-скринингтен жогорку тобокелдик (Кеп жана жүрүм-турум боюнча комплекстүү диагностика керек)' 
      : 'Скрининг жыйынтыгы: дефектолог жана логопед консультациясы сунушталды';

    onSaveLead({
      parentName: parentName || 'Ата-эне (Скрининг)',
      phone: phone || '+996 700 000000',
      childAge,
      concernKg: concernText,
      concernRu: concernText,
      source: 'screener',
      status: 'new',
      preferredBranch: 'branch-1'
    });

    setLeadSaved(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-sky-600 to-teal-600 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center text-white">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm leading-tight">
                {t.screener.title}
              </h3>
              <p className="text-[11px] text-sky-100">
                {isKg ? 'Кеп жана өнүгүү экспресс-диагностикасы' : 'Экспресс-скрининг речевого развития'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {!isFinished ? (
            <div>
              {/* Progress bar */}
              <div className="space-y-1.5 mb-6">
                <div className="flex justify-between text-xs font-bold text-slate-600">
                  <span>{t.screener.questionOf} {currentStep + 1} / {SCREENING_QUESTIONS.length}</span>
                  <span className="text-sky-600 font-extrabold">{Math.round(((currentStep + 1) / SCREENING_QUESTIONS.length) * 100)}%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-sky-500 to-teal-500 rounded-full transition-all duration-300"
                    style={{ width: `${((currentStep + 1) / SCREENING_QUESTIONS.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Question card */}
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-100">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-sky-700 bg-sky-100 px-2 py-0.5 rounded-md">
                    {currentQ.category} • {currentQ.ageRange}
                  </span>
                  <h4 className="text-base sm:text-lg font-bold text-slate-900 mt-2 leading-snug">
                    {isKg ? currentQ.questionKg : currentQ.questionRu}
                  </h4>
                </div>

                {/* Options */}
                <div className="space-y-2.5">
                  {currentQ.options.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(opt.points)}
                      className="w-full text-left p-4 rounded-2xl border border-slate-200 hover:border-sky-500 hover:bg-sky-50/50 transition-all font-medium text-xs sm:text-sm text-slate-800 flex items-center justify-between group active:scale-98"
                    >
                      <span>{isKg ? opt.labelKg : opt.labelRu}</span>
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-sky-600 group-hover:translate-x-1 transition-all shrink-0 ml-3" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* Results View */
            <div className="space-y-5">
              
              {/* Risk Level Badge Box */}
              <div className={`p-5 rounded-3xl border text-center space-y-2 ${
                isHighRisk 
                  ? 'bg-rose-50 border-rose-200 text-rose-950'
                  : isMediumRisk
                  ? 'bg-amber-50 border-amber-200 text-amber-950'
                  : 'bg-emerald-50 border-emerald-200 text-emerald-950'
              }`}>
                <div className="inline-flex p-3 rounded-2xl bg-white shadow-xs">
                  {isHighRisk ? (
                    <AlertCircle className="w-8 h-8 text-rose-600" />
                  ) : isMediumRisk ? (
                    <Sparkles className="w-8 h-8 text-amber-600" />
                  ) : (
                    <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                  )}
                </div>

                <h4 className="text-lg font-extrabold font-display">
                  {isHighRisk 
                    ? t.screener.riskHigh 
                    : isMediumRisk 
                    ? t.screener.riskMedium 
                    : t.screener.riskLow}
                </h4>

                <p className="text-xs max-w-md mx-auto opacity-90 leading-relaxed">
                  {isHighRisk 
                    ? (isKg 
                        ? 'Скринингтин көрсөткүчтөрү боюнча балага сөзсүз логопед-дефектолог жана сенсордук интеграция адисинин толук оффлайн диагностикасы сунушталат.' 
                        : 'Результаты скрининга указывают на необходимость комплексной очной консультации логопеда-дефектолога и сенсорного терапевта.')
                    : (isKg 
                        ? 'Өнүгүү көрсөткүчтөрү жакшы. Профилактика катары артикуляциялык оюндарды ойноо жана сөз байлыгын өстүрүү сунушталат.' 
                        : 'Показатели в пределах возрастной нормы. Рекомендуются развивающие игры и упражнения.')}
                </p>
              </div>

              {/* Recommended Directions */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="text-xs font-bold text-slate-700">
                  {t.screener.recommendation}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  <span className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-sky-800">
                    ✓ Комплекстүү диагностика (1200 сом)
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-teal-800">
                    ✓ Сенсордук интеграция
                  </span>
                  {isHighRisk && (
                    <span className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-indigo-800">
                      ✓ АВА терапия (РАС/Аутизм)
                    </span>
                  )}
                </div>
              </div>

              {/* Save Lead / Direct booking form */}
              {!leadSaved ? (
                <form onSubmit={handleSaveResultLead} className="p-4 rounded-2xl bg-sky-50/70 border border-sky-100 space-y-3">
                  <div className="text-xs font-bold text-sky-900">
                    {isKg ? 'Адистин акысыз консультациясын алуу үчүн номериңизди калтырыңыз:' : 'Оставьте номер для бесплатной расшифровки результатов:'}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder={isKg ? 'Аты-жөнүңүз' : 'Ваше имя'}
                      value={parentName}
                      onChange={(e) => setParentName(e.target.value)}
                      required
                      className="px-3 py-2 text-xs rounded-xl bg-white border border-slate-300 focus:outline-sky-500"
                    />
                    <input
                      type="tel"
                      placeholder="+996 (___) __-__-__"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      className="px-3 py-2 text-xs rounded-xl bg-white border border-slate-300 focus:outline-sky-500"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs shadow-md transition-all"
                  >
                    {isKg ? 'Жыйынтыкты сактоо жана консультация алуу' : 'Сохранить и получить консультацию'}
                  </button>
                </form>
              ) : (
                <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold text-center flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>{isKg ? 'Рахмат! Сиздин өтүнүчүңүз кабыл алынды. 15 мүнөттө байланышабыз.' : 'Спасибо! Ваша заявка принята. Специалист перезвонит в течение 15 минут.'}</span>
                </div>
              )}

              {/* Bottom Actions */}
              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={handleReset}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-900"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{isKg ? 'Тестти кайра баштоо' : 'Пройти заново'}</span>
                </button>

                <button
                  onClick={() => {
                    onClose();
                    onBookDiagnosisWithConcern('Скринингтен кийинки толук диагностика');
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-sky-600 to-teal-600 text-white text-xs font-bold shadow-md hover:shadow-lg transition-all"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{t.screener.bookFreeConsult}</span>
                </button>
              </div>

            </div>
          )}
        </div>

      </div>
    </div>
  );
};
