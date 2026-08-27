import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { SpaBranch, Language } from '../types/spa';
import { TRANSLATIONS } from '../constants/translations';
import { 
  Navigation, 
  MapPin, 
  Compass, 
  Layers, 
  ExternalLink, 
  Phone, 
  Clock, 
  Sparkles,
  LocateFixed
} from 'lucide-react';

interface InteractiveMapProps {
  branches: SpaBranch[];
  selectedBranchId: string;
  onSelectBranch: (branchId: string) => void;
  language: Language;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  branches,
  selectedBranchId,
  onSelectBranch,
  language
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<{ [id: string]: L.Marker }>({});
  const userMarkerRef = useRef<L.Marker | null>(null);

  const [mapType, setMapType] = useState<'dark' | 'streets' | 'satellite'>('dark');
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [distanceToSelected, setDistanceToSelected] = useState<number | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);

  const t = TRANSLATIONS[language];
  const currentBranch = branches.find(b => b.id === selectedBranchId) || branches[0];

  // Calculate distance between two coordinates in kilometers (Haversine formula)
  const calculateDistanceKm = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Earth radius in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return parseFloat((R * c).toFixed(1));
  };

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [currentBranch.lat || 42.8718, currentBranch.lng || 74.6065],
        zoom: 13,
        zoomControl: false,
        attributionControl: false
      });

      // Default Dark Luxury Tile Layer
      const tileUrl =
        mapType === 'satellite'
          ? 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
          : mapType === 'streets'
          ? 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          : 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';

      const tileLayer = L.tileLayer(tileUrl, {
        maxZoom: 19
      }).addTo(map);

      // Add Zoom control in top right
      L.control.zoom({ position: 'topright' }).addTo(map);

      mapInstanceRef.current = map;
      (map as any)._tileLayer = tileLayer;
    }

    return () => {
      // clean up on unmount
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update Tile Layer when mapType changes
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    const map = mapInstanceRef.current;
    if ((map as any)._tileLayer) {
      map.removeLayer((map as any)._tileLayer);
    }

    const tileUrl =
      mapType === 'satellite'
        ? 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
        : mapType === 'streets'
        ? 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        : 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';

    const newLayer = L.tileLayer(tileUrl, { maxZoom: 19 }).addTo(map);
    (map as any)._tileLayer = newLayer;
  }, [mapType]);

  // Update Markers
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    const map = mapInstanceRef.current;

    // Clear previous branch markers
    Object.values(markersRef.current).forEach((m: L.Marker) => m.remove());
    markersRef.current = {};

    branches.forEach(branch => {
      const isSelected = branch.id === selectedBranchId;
      
      const customHtmlIcon = L.divIcon({
        className: 'custom-spa-marker',
        html: `
          <div class="relative group cursor-pointer flex items-center justify-center">
            <div class="absolute -inset-2 rounded-full ${isSelected ? 'bg-[#c5a059] animate-ping opacity-30' : 'opacity-0'}"></div>
            <div class="w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-300 transform ${
              isSelected 
                ? 'bg-gradient-to-br from-[#c5a059] to-[#9b7b32] text-slate-950 shadow-xl shadow-[#c5a059]/60 scale-110 border-2 border-white' 
                : 'bg-[#0f172a] text-[#c5a059] border-2 border-[#c5a059]/60 shadow-lg hover:scale-105'
            }">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
            </div>
            <div class="absolute -bottom-8 whitespace-nowrap bg-slate-950/90 text-white text-[11px] font-bold px-2 py-0.5 rounded-md border border-[#c5a059]/40 shadow-lg pointer-events-none">
              ${branch.name[language].split(' ')[0]}
            </div>
          </div>
        `,
        iconSize: [40, 40],
        iconAnchor: [20, 20],
        popupAnchor: [0, -25]
      });

      const marker = L.marker([branch.lat, branch.lng], { icon: customHtmlIcon })
        .addTo(map)
        .on('click', () => {
          onSelectBranch(branch.id);
        });

      markersRef.current[branch.id] = marker;
    });
  }, [branches, selectedBranchId, language]);

  // Fly to selected branch
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    const branch = branches.find(b => b.id === selectedBranchId);
    if (branch) {
      mapInstanceRef.current.flyTo([branch.lat, branch.lng], 15, {
        animate: true,
        duration: 1.2
      });

      if (userLocation) {
        const dist = calculateDistanceKm(userLocation.lat, userLocation.lng, branch.lat, branch.lng);
        setDistanceToSelected(dist);
      }
    }
  }, [selectedBranchId, userLocation]);

  // Handle Geolocation Request
  const handleLocateMe = () => {
    setIsLocating(true);
    setLocationError(null);

    if (!navigator.geolocation) {
      setLocationError(language === 'kg' ? 'Геолокация жеткиликсиз' : language === 'ru' ? 'Геолокация недоступна' : 'Geolocation not supported');
      setIsLocating(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setUserLocation({ lat: latitude, lng: longitude });
        setIsLocating(false);

        if (mapInstanceRef.current) {
          const map = mapInstanceRef.current;

          // Remove old user marker
          if (userMarkerRef.current) {
            userMarkerRef.current.remove();
          }

          const userIcon = L.divIcon({
            className: 'user-geo-marker',
            html: `
              <div class="relative flex items-center justify-center">
                <div class="w-8 h-8 rounded-full bg-cyan-400/30 animate-ping absolute"></div>
                <div class="w-5 h-5 rounded-full bg-cyan-500 border-2 border-white shadow-lg flex items-center justify-center text-white">
                  <div class="w-2 h-2 rounded-full bg-white"></div>
                </div>
              </div>
            `,
            iconSize: [24, 24],
            iconAnchor: [12, 12]
          });

          userMarkerRef.current = L.marker([latitude, longitude], { icon: userIcon })
            .addTo(map)
            .bindPopup(language === 'kg' ? 'Сиздин жайгашкан ордуңуз' : language === 'ru' ? 'Ваше местоположение' : 'Your current location')
            .openPopup();

          // Calculate distance
          const dist = calculateDistanceKm(latitude, longitude, currentBranch.lat, currentBranch.lng);
          setDistanceToSelected(dist);

          // Fit bounds to show both user and branch
          const bounds = L.latLngBounds([
            [latitude, longitude],
            [currentBranch.lat, currentBranch.lng]
          ]);
          map.fitBounds(bounds, { padding: [60, 60] });
        }
      },
      (err) => {
        console.warn('Geolocation error:', err);
        setLocationError(language === 'kg' ? 'Геолокацияга уруксат берилген жок' : language === 'ru' ? 'Доступ к локации запрещен' : 'Location permission denied');
        setIsLocating(false);
      },
      { timeout: 8000, enableHighAccuracy: true }
    );
  };

  // Reset View to center of Bishkek
  const handleResetBishkek = () => {
    if (!mapInstanceRef.current) return;
    mapInstanceRef.current.flyTo([42.865, 74.605], 13, { duration: 1 });
  };

  return (
    <div className="flex flex-col h-full rounded-3xl overflow-hidden border border-[#c5a059]/30 bg-[#070b0e] shadow-2xl">
      {/* Top Map Control Bar */}
      <div className="p-4 bg-[#0d131a] border-b border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#c5a059]/15 border border-[#c5a059]/30 text-[#f5d77f] font-semibold">
            <MapPin className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>{branches.length} {language === 'kg' ? 'Филиал Бишкекте' : language === 'ru' ? 'Филиала в Бишкеке' : 'Branches in Bishkek'}</span>
          </span>

          {distanceToSelected !== null && (
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 font-semibold animate-fade-in">
              <Navigation className="w-3.5 h-3.5 text-cyan-400" />
              <span>{language === 'kg' ? 'Аралык:' : language === 'ru' ? 'Расстояние:' : 'Distance:'} {distanceToSelected} км</span>
            </span>
          )}
        </div>

        {/* Map View Switchers */}
        <div className="flex items-center gap-1.5 bg-black/40 p-1 rounded-xl border border-white/10">
          <button
            onClick={() => setMapType('dark')}
            className={`px-2.5 py-1 rounded-lg transition-all font-medium flex items-center gap-1 ${
              mapType === 'dark'
                ? 'bg-[#c5a059] text-slate-950 font-bold shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-3 h-3" />
            <span>{language === 'kg' ? 'Кара карта' : language === 'ru' ? 'Премиум' : 'Luxury'}</span>
          </button>

          <button
            onClick={() => setMapType('streets')}
            className={`px-2.5 py-1 rounded-lg transition-all font-medium flex items-center gap-1 ${
              mapType === 'streets'
                ? 'bg-[#c5a059] text-slate-950 font-bold shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="w-3 h-3" />
            <span>{language === 'kg' ? 'Көчөлөр' : language === 'ru' ? 'Схема' : 'Streets'}</span>
          </button>

          <button
            onClick={() => setMapType('satellite')}
            className={`px-2.5 py-1 rounded-lg transition-all font-medium flex items-center gap-1 ${
              mapType === 'satellite'
                ? 'bg-[#c5a059] text-slate-950 font-bold shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Compass className="w-3 h-3" />
            <span>{language === 'kg' ? 'Спутник' : language === 'ru' ? 'Спутник' : 'Satellite'}</span>
          </button>
        </div>
      </div>

      {/* Main Map Container */}
      <div className="relative w-full h-[380px] sm:h-[460px] bg-[#070b0e]">
        <div ref={mapContainerRef} className="w-full h-full z-0" />

        {/* Floating Quick Navigation overlay buttons */}
        <div className="absolute bottom-4 left-4 z-[400] flex flex-wrap items-center gap-2">
          <button
            onClick={handleLocateMe}
            disabled={isLocating}
            className="px-3.5 py-2 rounded-xl bg-slate-900/90 backdrop-blur-md border border-[#c5a059]/40 text-[#f5d77f] hover:bg-slate-800 text-xs font-bold flex items-center gap-2 shadow-xl transition-all cursor-pointer"
          >
            <LocateFixed className={`w-4 h-4 text-[#c5a059] ${isLocating ? 'animate-spin' : ''}`} />
            <span>
              {isLocating
                ? (language === 'kg' ? 'Аныкталууда...' : language === 'ru' ? 'Определение...' : 'Locating...')
                : (language === 'kg' ? 'Менин ордум' : language === 'ru' ? 'Где я?' : 'My Location')}
            </span>
          </button>

          <button
            onClick={handleResetBishkek}
            className="px-3 py-2 rounded-xl bg-slate-900/90 backdrop-blur-md border border-white/15 text-slate-300 hover:text-white text-xs font-medium flex items-center gap-1.5 shadow-xl transition-all cursor-pointer"
          >
            <Compass className="w-3.5 h-3.5 text-slate-400" />
            <span>{language === 'kg' ? 'Бишкекти толук көрүү' : language === 'ru' ? 'Весь Бишкек' : 'All Bishkek'}</span>
          </button>
        </div>

        {/* Selected Branch Mini Info Overlay (Top Left) */}
        <div className="absolute top-4 left-4 z-[400] max-w-[280px] sm:max-w-xs p-3.5 rounded-2xl bg-slate-950/85 backdrop-blur-md border border-[#c5a059]/30 text-white shadow-2xl pointer-events-auto">
          <div className="flex items-start justify-between gap-2">
            <div>
              <span className="text-[10px] font-bold text-[#c5a059] uppercase tracking-wider block">
                {language === 'kg' ? 'Тандалган Мукка филиалы' : language === 'ru' ? 'Выбранный салон Мукка' : 'Active Mukka Branch'}
              </span>
              <h4 className="font-serif font-bold text-sm text-white mt-0.5 leading-snug">
                {currentBranch.name[language]}
              </h4>
            </div>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse mt-1" />
          </div>

          <p className="text-[11px] text-slate-300 mt-2 flex items-start gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#c5a059] shrink-0 mt-0.5" />
            <span className="line-clamp-2">{currentBranch.address[language]}</span>
          </p>

          <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between text-[11px]">
            <a 
              href={`tel:${currentBranch.phone.replace(/[^0-9]/g, '')}`}
              className="text-slate-300 hover:text-[#f5d77f] flex items-center gap-1"
            >
              <Phone className="w-3 h-3 text-[#c5a059]" />
              <span>{currentBranch.phone}</span>
            </a>
            <span className="text-slate-400 flex items-center gap-1">
              <Clock className="w-3 h-3 text-amber-400" />
              <span>09:00 - 23:00</span>
            </span>
          </div>
        </div>

        {locationError && (
          <div className="absolute top-4 right-4 z-[400] px-3 py-1.5 rounded-xl bg-rose-950/90 border border-rose-500/40 text-rose-200 text-xs shadow-xl">
            {locationError}
          </div>
        )}
      </div>

      {/* Interactive Quick Route Links to 2GIS, Yandex Maps, and Google Maps */}
      <div className="p-4 bg-[#0d131a] border-t border-white/10 grid sm:grid-cols-3 gap-3">
        <a
          href={currentBranch.map2GisUrl}
          target="_blank"
          rel="noreferrer"
          className="px-4 py-3 rounded-xl bg-[#2ecc71]/15 hover:bg-[#2ecc71]/25 border border-[#2ecc71]/40 text-[#2ecc71] font-bold text-xs flex items-center justify-center gap-2 transition-all"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span>2GIS: {language === 'kg' ? 'Маршрут куруу' : language === 'ru' ? 'Маршрут в 2GIS' : 'Directions in 2GIS'}</span>
        </a>

        <a
          href={currentBranch.yandexMapUrl}
          target="_blank"
          rel="noreferrer"
          className="px-4 py-3 rounded-xl bg-[#fc3f1d]/15 hover:bg-[#fc3f1d]/25 border border-[#fc3f1d]/40 text-[#ff6b52] font-bold text-xs flex items-center justify-center gap-2 transition-all"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span>Яндекс: {language === 'kg' ? 'Картадан ачуу' : language === 'ru' ? 'Яндекс Навигатор' : 'Yandex Maps'}</span>
        </a>

        <a
          href={currentBranch.googleMapUrl || `https://maps.google.com/?q=${currentBranch.lat},${currentBranch.lng}`}
          target="_blank"
          rel="noreferrer"
          className="px-4 py-3 rounded-xl bg-blue-500/15 hover:bg-blue-500/25 border border-blue-500/40 text-blue-300 font-bold text-xs flex items-center justify-center gap-2 transition-all"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span>Google Maps: {language === 'kg' ? 'Навигатор' : language === 'ru' ? 'Навигатор Google' : 'Google Maps'}</span>
        </a>
      </div>
    </div>
  );
};
