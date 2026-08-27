import React, { useEffect, useRef, useState } from 'react';
import { MapPin, Phone, MessageSquare, Clock, CheckCircle2, Navigation, Sparkles } from 'lucide-react';
import L from 'leaflet';
import { Language, Branch } from '../types';
import { TRANSLATIONS } from '../constants/translations';
import { INITIAL_BRANCHES } from '../constants/logosData';

interface BranchesMapSectionProps {
  language: Language;
  onOpenBookingWithBranch?: (branch: Branch) => void;
}

export const BranchesMapSection: React.FC<BranchesMapSectionProps> = ({
  language,
  onOpenBookingWithBranch
}) => {
  const t = TRANSLATIONS[language];
  const isKg = language === 'ky';
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);
  const [activeBranchId, setActiveBranchId] = useState<string>(INITIAL_BRANCHES[0].id);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Clean up previous map instance
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    const map = L.map(mapContainerRef.current, {
      center: [42.865, 74.605],
      zoom: 12,
      zoomControl: true,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(map);

    mapInstanceRef.current = map;

    // Custom Icon for Logos+ branches
    const customIcon = L.divIcon({
      className: 'custom-map-pin',
      html: `
        <div style="background: linear-gradient(135deg, #0284c7, #0d9488); width: 34px; height: 34px; border-radius: 50%; border: 3px solid white; box-shadow: 0 4px 12px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 13px;">
          ✦
        </div>
      `,
      iconSize: [34, 34],
      iconAnchor: [17, 34],
      popupAnchor: [0, -30],
    });

    markersRef.current = [];

    INITIAL_BRANCHES.forEach((branch) => {
      const marker = L.marker([branch.lat, branch.lng], { icon: customIcon }).addTo(map);
      
      const popupContent = `
        <div style="font-family: sans-serif; padding: 4px; max-width: 220px;">
          <h4 style="margin: 0 0 4px; font-weight: bold; font-size: 13px; color: #0f172a;">
            ${isKg ? branch.nameKg : branch.nameRu}
          </h4>
          <p style="margin: 0 0 6px; font-size: 11px; color: #64748b;">
            ${isKg ? branch.addressKg : branch.addressRu}
          </p>
          <a href="tel:${branch.phone}" style="display: inline-block; font-size: 11px; font-weight: bold; color: #0284c7; text-decoration: none;">
            📞 ${branch.phone}
          </a>
        </div>
      `;

      marker.bindPopup(popupContent);
      marker.on('click', () => {
        setActiveBranchId(branch.id);
      });

      markersRef.current.push(marker);
    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [language, isKg]);

  const handleSelectBranch = (branch: Branch) => {
    setActiveBranchId(branch.id);
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([branch.lat, branch.lng], 14, {
        duration: 1.2
      });
      const targetMarker = markersRef.current.find((_, idx) => INITIAL_BRANCHES[idx].id === branch.id);
      if (targetMarker) {
        targetMarker.openPopup();
      }
    }
  };

  return (
    <section className="py-20 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>{isKg ? 'Бишкек шаарында 3 филиал' : '3 филиала в Бишкеке'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
            {t.branches.title}
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            {t.branches.subtitle}
          </p>
        </div>

        {/* Map & Branch Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Leaflet Map Container */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl overflow-hidden shadow-xl border border-slate-200 relative h-[450px]">
              <div ref={mapContainerRef} className="w-full h-full z-10" />
              <div className="absolute top-3 right-3 z-20 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-200 text-[11px] font-bold text-slate-700 shadow-sm flex items-center gap-1.5">
                <Navigation className="w-3.5 h-3.5 text-sky-600 animate-pulse" />
                <span>Бишкек шаары</span>
              </div>
            </div>
          </div>

          {/* Right Column: 3 Branch Selectable Cards */}
          <div className="lg:col-span-5 space-y-4">
            {INITIAL_BRANCHES.map((branch) => {
              const isActive = activeBranchId === branch.id;
              return (
                <div
                  key={branch.id}
                  onClick={() => handleSelectBranch(branch)}
                  className={`rounded-2xl p-5 border cursor-pointer transition-all duration-200 ${
                    isActive
                      ? 'bg-sky-50/80 border-sky-400 shadow-md ring-2 ring-sky-300/40'
                      : 'bg-slate-50/70 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className={`w-2.5 h-2.5 rounded-full ${isActive ? 'bg-sky-600 animate-ping' : 'bg-slate-400'}`} />
                        <h4 className="font-bold text-sm text-slate-900 font-display">
                          {isKg ? branch.nameKg : branch.nameRu}
                        </h4>
                      </div>
                      <p className="text-xs text-slate-600 flex items-center gap-1.5 pt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                        <span>{isKg ? branch.addressKg : branch.addressRu}</span>
                      </p>
                    </div>

                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700">
                      {branch.roomsCount} {isKg ? 'кабинет' : 'кабинетов'}
                    </span>
                  </div>

                  {/* Work hours & Phone */}
                  <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-slate-200/60 text-xs text-slate-600">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span className="text-[11px]">{isKg ? '08:30 - 19:30' : '08:30 - 19:30'}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5 text-slate-400" />
                      <a 
                        href={`tel:${branch.phone}`} 
                        className="text-[11px] font-bold text-sky-700 hover:underline"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {branch.phone}
                      </a>
                    </div>
                  </div>

                  {/* Features badges */}
                  <div className="flex flex-wrap gap-1 mt-2.5">
                    {branch.specialFeatures.map((feat, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-medium px-2 py-0.5 rounded bg-white text-slate-600 border border-slate-200/80"
                      >
                        ✓ {feat}
                      </span>
                    ))}
                  </div>

                  {/* Direct WhatsApp link */}
                  <div className="mt-3 flex items-center justify-between">
                    <a
                      href={`https://wa.me/${branch.whatsapp.replace('+', '')}?text=${encodeURIComponent(
                        isKg 
                          ? `Саламатсызбы! «Логос+» (${branch.nameKg}) борборуна баламды диагностикага жаздырайын дедим эле.` 
                          : `Здравствуйте! Хочу записать ребенка на диагностику в «Логос+» (${branch.nameRu}).`
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 bg-emerald-100/80 hover:bg-emerald-200/80 px-3 py-1.5 rounded-xl transition-all"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>WhatsApp аркылуу жазылуу</span>
                    </a>

                    {onOpenBookingWithBranch && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenBookingWithBranch(branch);
                        }}
                        className="text-xs font-bold text-sky-700 hover:text-sky-800 underline"
                      >
                        {isKg ? 'Онлайн жазылуу' : 'Записаться онлайн'}
                      </button>
                    )}
                  </div>

                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
