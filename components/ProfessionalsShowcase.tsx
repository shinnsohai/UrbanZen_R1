
import React from 'react';
import { Professional } from '../types';
import { ProfessionalCard } from './ProfessionalCard';
import { SearchIcon } from './Icons';

interface ProfessionalsShowcaseProps {
  professionals: Professional[];
  onSelectProfessional: (professional: Professional) => void;
  filter: 'All' | 'Supplier' | 'Contractor' | 'Interior Designer';
  onFilterChange: (filter: 'All' | 'Supplier' | 'Contractor' | 'Interior Designer') => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

export const ProfessionalsShowcase: React.FC<ProfessionalsShowcaseProps> = ({ professionals, onSelectProfessional, filter, onFilterChange, searchTerm, onSearchChange }) => {
  return (
    <section id="professionals" className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">Meet Our Professionals</h2>
            <p className="mt-4 text-lg text-gray-600">
                A curated network of Singapore's finest suppliers, contractors, and interior designers, all vetted for quality and reliability.
            </p>
        </div>
        
        {/* Filter and Search Section */}
        <div className="mb-12 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex-shrink-0">
                <div className="flex flex-wrap justify-center space-x-1 bg-gray-200 p-1 rounded-full">
                    {(['All', 'Supplier', 'Contractor', 'Interior Designer'] as const).map((type) => (
                        <button
                            key={type}
                            onClick={() => onFilterChange(type)}
                            className={`px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200 ${
                                filter === type
                                    ? 'bg-white text-teal-700 shadow'
                                    : 'text-gray-600 hover:bg-white/60'
                            }`}
                        >
                            {type}
                        </button>
                    ))}
                </div>
            </div>

            <div className="relative w-full md:w-auto">
                <input
                    type="text"
                    placeholder="Search by name, role..."
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="w-full md:w-72 pl-4 pr-10 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <SearchIcon className="w-5 h-5 text-gray-400" />
                </div>
            </div>
        </div>
        
        {professionals.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-12 gap-x-8">
              {professionals.map(professional => (
                <ProfessionalCard key={professional.id} professional={professional} onSelectProfessional={onSelectProfessional} />
              ))}
          </div>
        ) : (
           <div className="text-center py-16 px-6 bg-gray-50 rounded-lg shadow-inner">
                <h3 className="text-2xl font-bold text-gray-800">No Professionals Found</h3>
                <p className="text-gray-600 mt-2">Try adjusting your filter or search term to find the right expert.</p>
           </div>
        )}
      </div>
    </section>
  );
};
