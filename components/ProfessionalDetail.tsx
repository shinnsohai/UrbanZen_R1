import React from 'react';
import { Professional, Project } from '../types';
import { Header } from './Header';
import { Footer } from './Footer';
import { ProjectCard } from './ProjectCard';

interface ProfessionalDetailProps {
  professional: Professional;
  projects: Project[];
  onClose: () => void;
  onProjectSelect: (project: Project) => void;
}

export const ProfessionalDetail: React.FC<ProfessionalDetailProps> = ({ professional, projects, onClose, onProjectSelect }) => {
  
  const professionalProjects = projects.filter(p => {
    switch (professional.role) {
      case 'Supplier':
        return p.supplierId === professional.id;
      case 'Contractor':
        return p.contractorId === professional.id;
      case 'Interior Designer':
        return p.interiorDesignerId === professional.id;
      default:
        return false;
    }
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-6 py-12 md:py-20">
        <div className="mb-8">
          <button onClick={onClose} className="text-teal-600 hover:text-teal-800 font-medium">
            &larr; Back to Project
          </button>
        </div>
        
        <div className="md:flex md:space-x-12">
          <div className="md:w-1/3 mb-8 md:mb-0">
            <div className="sticky top-24 text-center md:text-left">
              <img src={professional.profileImageUrl} alt={professional.name} className="w-48 h-48 rounded-full mx-auto md:mx-0 shadow-lg mb-4" />
              <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">{professional.name}</h1>
              <h2 className="text-xl font-medium text-teal-600 mt-1">{professional.role}</h2>
              <p className="mt-4 text-gray-600 leading-relaxed">{professional.bio}</p>
            </div>
          </div>
          <div className="md:w-2/3">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Projects by {professional.name}
            </h2>
            {professionalProjects.length > 0 ? (
              <div className="grid sm:grid-cols-2 gap-8">
                {professionalProjects.map(project => (
                  <ProjectCard key={project.id} project={project} onProjectSelect={onProjectSelect} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 px-6 bg-white rounded-lg shadow-md">
                <h3 className="text-2xl font-bold text-gray-800">No Projects to Display</h3>
                <p className="text-gray-600 mt-2">This professional's projects are not yet in our showcase.</p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer onNavigateToAdmin={() => {}} />
    </div>
  );
};
