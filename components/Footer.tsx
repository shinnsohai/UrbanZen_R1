
import React from 'react';
import { BuildingIcon } from './Icons';

interface FooterProps {
  onNavigateToAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateToAdmin }) => {
  return (
    <footer id="contact" className="bg-gray-800 text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <div className="flex items-center space-x-2">
              <BuildingIcon className="w-8 h-8 text-teal-500" />
              <span className="text-2xl font-bold tracking-tight">URBAN ZEN</span>
            </div>
            <p className="mt-2 text-gray-400">Redefining the home renovation journey in Singapore.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <h2 className="mb-4 text-sm font-semibold text-gray-200 uppercase tracking-wider">Company</h2>
              <ul className="text-gray-400 space-y-2">
                <li><a href="#about" className="hover:text-white">About Us</a></li>
                <li><a href="#showcase" className="hover:text-white">Our Work</a></li>
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
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Terms & Conditions</a></li>
              </ul>
            </div>
             <div>
              <h2 className="mb-4 text-sm font-semibold text-gray-200 uppercase tracking-wider">Connect</h2>
              <ul className="text-gray-400 space-y-2">
                <li><a href="https://forms.gle/nC1jjRQ196nKV2DG9" target="_blank" rel="noopener noreferrer" className="hover:text-white">Contact Us</a></li>
                <li><a href="#" className="hover:text-white">Facebook</a></li>
                <li><a href="#" className="hover:text-white">Instagram</a></li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-8 border-gray-700" />
        <div className="text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} URBAN ZEN PTE. LTD. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};
