import React from 'react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  onProjectSelect: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onProjectSelect }) => (
  <button 
    onClick={() => onProjectSelect(project)}
    className="group overflow-hidden rounded-lg shadow-lg bg-white transform transition-transform duration-300 hover:-translate-y-2 text-left w-full focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50"
    aria-label={`View details for ${project.title}`}
  >
    {project.imageUrls && project.imageUrls.length > 0 && (
      <img src={project.imageUrls[0]} alt={project.title} className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105" />
    )}
    <div className="p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-2">{project.title}</h3>
      <p className="text-gray-600 leading-relaxed line-clamp-3">{project.description}</p>
    </div>
  </button>
);
