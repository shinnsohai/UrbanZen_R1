import React from 'react';
import { BuildingIcon } from './Icons';

interface HeaderProps {
  companyName: string;
  logoUrl: string;
  contactUrl: string;
}

export const Header: React.FC<HeaderProps> = ({ companyName, logoUrl, contactUrl }) => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 bg-white bg-opacity-90 backdrop-blur-md z-50 shadow-sm">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          {logoUrl ? (
            <img src={logoUrl} alt={`${companyName} logo`} className="w-8 h-8 object-contain" />
          ) : (
            <BuildingIcon className="w-8 h-8 text-teal-600" />
          )}
          <span className="text-2xl font-bold text-gray-800 tracking-tight">{companyName}</span>
        </div>
        <nav className="hidden md:flex space-x-8 items-center">
          <button onClick={() => scrollToSection('about')} className="text-gray-600 hover:text-teal-600 transition-colors">About Us</button>
          <button onClick={() => scrollToSection('professionals')} className="text-gray-600 hover:text-teal-600 transition-colors">Professionals</button>
          <button onClick={() => scrollToSection('showcase')} className="text-gray-600 hover:text-teal-600 transition-colors">Our Work</button>
          <a href={contactUrl} target="_blank" rel="noopener noreferrer" className="bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-4 rounded-md transition-colors shadow-sm">Contact</a>
        </nav>
      </div>
    </header>
  );
};
