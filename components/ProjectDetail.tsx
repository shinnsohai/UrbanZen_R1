import React, { useState } from 'react';
import { Project } from '../types';
import { Header } from './Header';
import { Footer } from './Footer';

interface ProjectDetailProps {
  project: Project;
  onClose: () => void;
}

const DetailItem: React.FC<{ label: string; value: string | string[] }> = ({ label, value }) => (
  <div>
    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">{label}</h3>
    {Array.isArray(value) ? (
      <div className="flex flex-wrap gap-2 mt-2">
        {value.map(tag => (
          <span key={tag} className="bg-teal-100 text-teal-800 text-xs font-medium px-2.5 py-1 rounded-full">{tag}</span>
        ))}
      </div>
    ) : (
      <p className="text-lg text-gray-800 mt-1">{value}</p>
    )}
  </div>
);

export const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, onClose }) => {
  const [activeImage, setActiveImage] = useState(project.imageUrls[0]);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="container mx-auto px-6 py-12 md:py-20">
        <div className="mb-8">
          <button onClick={onClose} className="text-teal-600 hover:text-teal-800 font-medium">
            &larr; Back to Showcase
          </button>
        </div>
        
        <div className="lg:grid lg:grid-cols-5 lg:gap-12">
          <div className="lg:col-span-3 mb-8 lg:mb-0">
            <div className="sticky top-24">
                <img src={activeImage} alt={project.title} className="w-full h-auto object-cover rounded-lg shadow-lg aspect-[4/3]" />
                <div className="mt-4 grid grid-cols-6 gap-2">
                    {project.imageUrls.map(url => (
                    <button key={url} onClick={() => setActiveImage(url)} className={`rounded-md overflow-hidden focus:outline-none focus:ring-2 focus:ring-teal-500 ${activeImage === url ? 'ring-2 ring-teal-500' : ''}`}>
                        <img src={url} alt="" className="w-full h-20 object-cover" />
                    </button>
                    ))}
                </div>
            </div>
          </div>
          <div className="lg:col-span-2">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">{project.title}</h1>
            <p className="mt-4 text-gray-600 leading-relaxed">{project.description}</p>
            
            <div className="mt-10 space-y-6 border-t pt-6">
                <DetailItem label="House Type" value={project.houseType} />
                <DetailItem label="Location" value={project.location} />
                <DetailItem label="Style" value={project.styleTags} />
                <DetailItem label="Budget" value={project.budget} />
                <DetailItem label="Supplier" value={project.supplier} />
                <DetailItem label="Contractor" value={project.contractor} />
                <DetailItem label="Interior Designer" value={project.interiorDesigner} />
            </div>
          </div>
        </div>
      </main>
      <Footer onNavigateToAdmin={() => { /* In detail view, this might navigate home first or do nothing */ }} />
    </div>
  );
};