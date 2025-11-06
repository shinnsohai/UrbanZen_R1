
import React from 'react';
import { Professional } from '../types';

interface ProfessionalCardProps {
  professional: Professional;
  onSelectProfessional: (professional: Professional) => void;
}

export const ProfessionalCard: React.FC<ProfessionalCardProps> = ({ professional, onSelectProfessional }) => (
  <button 
    onClick={() => onSelectProfessional(professional)}
    className="group text-center transition-transform duration-300 transform hover:-translate-y-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 rounded-lg"
    aria-label={`View profile for ${professional.name}`}
  >
    <img src={professional.profileImageUrl} alt={professional.name} className="w-36 h-36 rounded-full mx-auto shadow-lg mb-4 object-cover" />
    <h3 className="text-lg font-bold text-gray-800">{professional.name}</h3>
    <p className="text-teal-600 font-medium">{professional.role}</p>
  </button>
);
