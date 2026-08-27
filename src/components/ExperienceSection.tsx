import React, { useState, useEffect } from 'react';
import { Language } from '../types/spa';
import { TRANSLATIONS } from '../constants/translations';
import { SPA_INFO } from '../constants/spaData';
import { spaAudioEngine } from '../utils/audioSynthesizer';
import { 
  Sparkles, 
  Volume2, 
  VolumeX, 
  Coffee, 
  Flame, 
  Heart, 
  Eye, 
  Wind, 
  Radio, 
  Play, 
  Pause,
  CheckCircle
} from 'lucide-react';

interface ExperienceSectionProps {
  language: Language;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ language }) => {
  const t = TRANSLATIONS[language];
  const [activeSound, setActiveSound] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const sounds = [
    {
      id: 'mountain_stream',
      label: t.experience.soundMountainStream,
      icon: '🌊',
      desc: language === 'kg' ? 'Ала-Арча капчыгайынын шаркыраган таза суусу' : language === 'ru' ? 'Живой шум горной реки Ала-Арча' : 'Pure roaring alpine stream'
    },
    {
      id: 'rain_retreat',
      label: t.experience.soundRain,
      icon: '🌧️',
      desc: language === 'kg' ? 'Терезени черткен тынч жамгырдын дабышы' : language === 'ru' ? 'Мягкий успокаивающий шум дождя' : 'Gentle calming rain'
    },
    {
      id: 'tibetan_bowl',
      label: t.experience.soundTibetanBowl,
      icon: '🔔',
      desc: language === 'kg' ? 'Чакраларды тазалоочу 432Hz табигый термелүү' : language === 'ru' ? 'Целительные вибрации поющих чаш 432Гц' : '432Hz singing bowl resonance'
    },
    {
      id: 'zen_breeze',
      label: t.experience.soundZenBreeze,
      icon: '🍃',
      desc: language === 'kg' ? 'Тянь-Шань тоолорунун салкын жумшак жели' : language === 'ru' ? 'Шелест хвойного леса и горный бриз' : 'Pine forest mountain breeze'
    },
    {
      id: 'deep_meditation',
      label: t.experience.soundDeepDrone,
      icon: '🧘',
      desc: language === 'kg' ? 'Мээ толкундарын тынчтандыруучу дельта резонатор' : language === 'ru' ? 'Глубокая дельта-релаксация для сна' : 'Delta wave binaural harmony'
    }
  ];

  const handleToggleSound = (soundId: string) => {
    if (activeSound === soundId && isPlaying) {
      spaAudioEngine.stopSound();
      setIsPlaying(false);
      setActiveSound(null);
    } else {
      spaAudioEngine.playSound(soundId as 'mountain_stream' | 'rain_retreat' | 'tibetan_bowl' | 'zen_breeze' | 'deep_meditation');
      setActiveSound(soundId);
      setIsPlaying(true);
    }
  };

  const handleStopAll = () => {
    spaAudioEngine.stopSound();
    setIsPlaying(false);
    setActiveSound(null);
  };

  useEffect(() => {
    return () => {
      spaAudioEngine.stopSound();
    };
  }, []);

  return (
    <section id="experience" className="py-20 bg-[#070b0e] relative overflow-hidden">
      {/* Visual background lights */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-emerald-950/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#c5a059]/30 bg-[#16221c] text-[#f5d77f] text-xs font-semibold tracking-wider uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>{t.experience.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
            {t.experience.title}
          </h2>
          <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
            {t.experience.subtitle}
          </p>
        </div>

        {/* Interactive Sound Generator Console */}
        <div className="mb-16 p-6 sm:p-8 rounded-3xl border border-[#c5a059]/40 bg-gradient-to-b from-[#11171f] via-[#0d1218] to-[#070a0d] shadow-2xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-5 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#c5a059]/20 border border-[#c5a059]/40 flex items-center justify-center text-[#f5d77f]">
                {isPlaying ? <Volume2 className="w-5 h-5 animate-pulse" /> : <VolumeX className="w-5 h-5 text-slate-400" />}
              </div>
              <div>
                <h3 className="text-base font-bold text-white font-serif">
                  {t.experience.soundPlayerTitle}
                </h3>
                <span className="text-xs text-emerald-400">
                  {isPlaying ? `● ${t.experience.playingState}` : (language === 'kg' ? 'Үндү тандап, эс алыңыз' : language === 'ru' ? 'Нажмите для погружения в релакс' : 'Select a soundscape to unwind')}
                </span>
              </div>
            </div>

            {isPlaying && (
              <button
                onClick={handleStopAll}
                className="px-4 py-2 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer"
              >
                <VolumeX className="w-4 h-4" />
                <span>{t.experience.stopAudio}</span>
              </button>
            )}
          </div>

          {/* Sound selector chips */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
            {sounds.map((snd) => {
              const active = activeSound === snd.id && isPlaying;
              return (
                <button
                  key={snd.id}
                  onClick={() => handleToggleSound(snd.id)}
                  className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between h-32 cursor-pointer ${
                    active
                      ? 'bg-[#18232e] border-[#c5a059] ring-2 ring-[#c5a059]/50 shadow-lg shadow-black/60'
                      : 'bg-white/[0.03] border-white/10 hover:border-white/20 hover:bg-white/[0.06]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">{snd.icon}</span>
                    <span className={`w-7 h-7 rounded-full flex items-center justify-center ${active ? 'bg-[#c5a059] text-slate-950' : 'bg-white/5 text-slate-400'}`}>
                      {active ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                    </span>
                  </div>
                  <div>
                    <h4 className={`text-xs font-bold leading-tight ${active ? 'text-[#f5d77f]' : 'text-slate-200'}`}>
                      {snd.label}
                    </h4>
                    <p className="text-[10px] text-slate-400 line-clamp-1 mt-1">
                      {snd.desc}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 4 Pillars of Arashan Luxury Spa */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SPA_INFO.amenities.map((item, idx) => (
            <div 
              key={idx}
              className="p-6 rounded-2xl border border-white/10 bg-[#0e141a] hover:border-[#c5a059]/40 transition-all space-y-4"
            >
              <div className="w-12 h-12 rounded-xl bg-[#c5a059]/10 border border-[#c5a059]/30 flex items-center justify-center text-[#f5d77f]">
                {idx === 0 && <Flame className="w-6 h-6 text-amber-400" />}
                {idx === 1 && <Coffee className="w-6 h-6 text-emerald-400" />}
                {idx === 2 && <Sparkles className="w-6 h-6 text-[#f5d77f]" />}
                {idx === 3 && <Heart className="w-6 h-6 text-rose-400" />}
              </div>

              <h3 className="text-base font-serif font-bold text-white">
                {item.title[language]}
              </h3>

              <p className="text-xs text-slate-300 leading-relaxed">
                {item.desc[language]}
              </p>
            </div>
          ))}
        </div>

        {/* Complimentary Tea Ceremony Banner */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl border border-emerald-500/30 bg-gradient-to-r from-emerald-950/60 via-[#0e141a] to-emerald-950/60 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-300 shrink-0">
              <Coffee className="w-7 h-7" />
            </div>
            <div>
              <h4 className="text-lg font-serif font-bold text-white">
                {t.experience.teaCeremonyTitle}
              </h4>
              <p className="text-xs text-slate-300 max-w-2xl mt-1 leading-relaxed">
                {t.experience.teaCeremonyDesc}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 shrink-0 bg-emerald-950/80 px-4 py-2 rounded-xl border border-emerald-500/30">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span>{language === 'kg' ? 'Бардык конокторго акысыз' : language === 'ru' ? 'Бесплатно для всех гостей' : 'Complimentary for all'}</span>
          </div>
        </div>

      </div>
    </section>
  );
};
