
import React from 'react';
import { BuildingIcon } from './Icons';

export const Header: React.FC = () => {
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
          <BuildingIcon className="w-8 h-8 text-teal-600" />
          <span className="text-2xl font-bold text-gray-800 tracking-tight">URBAN ZEN</span>
        </div>
        <nav className="hidden md:flex space-x-8">
          <button onClick={() => scrollToSection('about')} className="text-gray-600 hover:text-teal-600 transition-colors">About Us</button>
          <button onClick={() => scrollToSection('showcase')} className="text-gray-600 hover:text-teal-600 transition-colors">Our Work</button>
          <a href="https://forms.gle/nC1jjRQ196nKV2DG9" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-teal-600 transition-colors">Contact</a>
        </nav>
      </div>
    </header>
  );
};
