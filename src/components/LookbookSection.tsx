import React from 'react';
import { Language } from '../types/spa';
import { MassageBenefitsSection } from './MassageBenefitsSection';

interface LookbookSectionProps {
  language: Language;
  onOpenBooking: () => void;
}

export const LookbookSection: React.FC<LookbookSectionProps> = ({
  language,
  onOpenBooking
}) => {
  return (
    <MassageBenefitsSection 
      language={language}
      onSelectServiceForBooking={() => onOpenBooking()}
    />
  );
};
