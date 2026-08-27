import React from 'react';
import { Language } from '../types/spa';
import { AISpaConsultantModal } from './AISpaConsultantModal';

interface AIStyleAdvisorModalProps {
  language: Language;
  isOpen: boolean;
  onClose: () => void;
  onSelectLookForBooking: (look: { id: string }) => void;
}

export const AIStyleAdvisorModal: React.FC<AIStyleAdvisorModalProps> = ({
  language,
  isOpen,
  onClose,
  onSelectLookForBooking
}) => {
  return (
    <AISpaConsultantModal
      language={language}
      isOpen={isOpen}
      onClose={onClose}
      onSelectService={(serviceId) => onSelectLookForBooking({ id: serviceId })}
    />
  );
};
