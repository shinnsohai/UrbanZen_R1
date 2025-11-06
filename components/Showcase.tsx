import React from 'react';
import { Project } from '../types';
import { ProjectCard } from './ProjectCard';

interface ShowcaseProps {
  projects: Project[];
  onProjectSelect: (project: Project) => void;
}

export const Showcase: React.FC<ShowcaseProps> = ({ projects, onProjectSelect }) => {
  return (
    <section id="showcase" className="py-20 md:py-28 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">Our Work</h2>
            <p className="mt-4 text-lg text-gray-600">
                Explore a curated gallery of real homeowner projects. Get inspired by the possibilities and see the quality our network of professionals delivers.
            </p>
        </div>
        
        {projects.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map(project => (
              <ProjectCard key={project.id} project={project} onProjectSelect={onProjectSelect} />
            ))}
          </div>
        ) : (
           <div className="text-center py-16 px-6 bg-white rounded-lg shadow-md">
                <h3 className="text-2xl font-bold text-gray-800">Showcase Coming Soon</h3>
                <p className="text-gray-600 mt-2">We are currently curating our project gallery. Please check back later!</p>
           </div>
        )}
      </div>
    </section>
  );
};
