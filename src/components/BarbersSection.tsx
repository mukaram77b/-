import React from 'react';
import { Language } from '../types/spa';
import { TherapistsSection } from './TherapistsSection';

interface BarbersSectionProps {
  language: Language;
  onOpenBooking: () => void;
}

export const BarbersSection: React.FC<BarbersSectionProps> = ({
  language,
  onOpenBooking
}) => {
  return (
    <TherapistsSection 
      language={language}
      onSelectTherapistForBooking={() => onOpenBooking()}
    />
  );
};
