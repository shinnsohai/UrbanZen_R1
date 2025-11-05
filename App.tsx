
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Showcase } from './components/Showcase';
import { CmsPanel } from './components/CmsPanel';
import { Footer } from './components/Footer';
import { Project } from './types';
import { PlusIcon } from './components/Icons';

const App: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: '1',
      title: 'Serene Tampines BTO',
      description: 'A minimalist sanctuary blending natural wood tones with a neutral palette. This design maximizes space and light, creating a tranquil urban retreat perfect for unwinding after a busy day.',
      imageUrl: 'https://picsum.photos/seed/project1/800/600',
    },
    {
      id: '2',
      title: 'Modern Luxury Condo at Orchard',
      description: 'Experience sophisticated living with bespoke carpentry, marble accents, and smart home integration. The open-plan layout is ideal for entertaining, offering breathtaking city views.',
      imageUrl: 'https://picsum.photos/seed/project2/800/600',
    },
    {
      id: '3',
      title: 'Cozy Industrial Loft in Tiong Bahru',
      description: 'Exposed brick, black metal frames, and warm lighting define this character-filled loft. A functional and stylish space that pays homage to the neighborhood\'s heritage with a modern twist.',
      imageUrl: 'https://picsum.photos/seed/project3/800/600',
    },
  ]);

  const [isCmsOpen, setIsCmsOpen] = useState(false);

  const handleAddProject = useCallback((newProject: Omit<Project, 'id'>) => {
    setProjects(prevProjects => [
      { ...newProject, id: new Date().toISOString() },
      ...prevProjects,
    ]);
    setIsCmsOpen(false);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <About />
        <Showcase projects={projects} />
      </main>
      <Footer />
      
      <button
        onClick={() => setIsCmsOpen(true)}
        className="fixed bottom-6 right-6 bg-teal-600 hover:bg-teal-700 text-white rounded-full p-4 shadow-lg transition-transform transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-teal-300"
        aria-label="Add new project"
      >
        <PlusIcon className="w-8 h-8" />
      </button>

      <CmsPanel 
        isOpen={isCmsOpen}
        onClose={() => setIsCmsOpen(false)}
        onAddProject={handleAddProject}
      />
    </div>
  );
};

export default App;
