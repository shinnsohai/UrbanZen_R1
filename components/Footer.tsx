import React from 'react';
import { BuildingIcon } from './Icons';

interface FooterProps {
  companyName: string;
  contactUrl: string;
  facebookUrl: string;
  instagramUrl: string;
  onNavigateToAdmin: () => void;
  onNavigateToPrivacy: () => void;
  onNavigateToTerms: () => void;
}

export const Footer: React.FC<FooterProps> = ({ companyName, contactUrl, facebookUrl, instagramUrl, onNavigateToAdmin, onNavigateToPrivacy, onNavigateToTerms }) => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer id="contact" className="bg-gray-800 text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <div className="flex items-center space-x-2">
              <BuildingIcon className="w-8 h-8 text-teal-500" />
              <span className="text-2xl font-bold tracking-tight">{companyName}</span>
            </div>
            <p className="mt-2 text-gray-400">Redefining the home renovation journey in Singapore.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <h2 className="mb-4 text-sm font-semibold text-gray-200 uppercase tracking-wider">Company</h2>
              <ul className="text-gray-400 space-y-2">
                <li><button onClick={() => scrollToSection('about')} className="hover:text-white text-left">About Us</button></li>
                <li><button onClick={() => scrollToSection('showcase')} className="hover:text-white text-left">Our Work</button></li>
                <li>
                  <button onClick={onNavigateToAdmin} className="hover:text-white text-left">
                    Admin Login
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-4 text-sm font-semibold text-gray-200 uppercase tracking-wider">Legal</h2>
              <ul className="text-gray-400 space-y-2">
                <li><button onClick={onNavigateToPrivacy} className="hover:text-white text-left">Privacy Policy</button></li>
                <li><button onClick={onNavigateToTerms} className="hover:text-white text-left">Terms & Conditions</button></li>
              </ul>
            </div>
             <div>
              <h2 className="mb-4 text-sm font-semibold text-gray-200 uppercase tracking-wider">Connect</h2>
              <ul className="text-gray-400 space-y-2">
                <li><a href={contactUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white">Contact Us</a></li>
                <li><a href={facebookUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white">Facebook</a></li>
                <li><a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white">Instagram</a></li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-8 border-gray-700" />
        <div className="text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} {companyName} PTE. LTD. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};