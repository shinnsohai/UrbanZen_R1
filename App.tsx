import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Showcase } from './components/Showcase';
import { Footer } from './components/Footer';
import { Project, HeroData } from './types';
import AdminLogin from './components/AdminLogin';
import AdminPage from './components/AdminPage';
import { ProjectDetail } from './components/ProjectDetail';

const App: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: '1',
      title: 'Serene Tampines BTO',
      description: 'A minimalist sanctuary blending natural wood tones with a neutral palette. This design maximizes space and light, creating a tranquil urban retreat perfect for unwinding after a busy day.',
      imageUrls: [
        'https://picsum.photos/seed/project1-1/800/600',
        'https://picsum.photos/seed/project1-2/800/600',
        'https://picsum.photos/seed/project1-3/800/600',
        'https://picsum.photos/seed/project1-4/800/600',
        'https://picsum.photos/seed/project1-5/800/600',
        'https://picsum.photos/seed/project1-6/800/600',
      ],
      houseType: 'HDB',
      styleTags: ['Minimalist', 'Scandinavian', 'Muji'],
      location: 'Tampines',
      budget: 'S$ 50,000 - S$ 70,000',
      supplier: 'Hafary Tiles',
      contractor: 'Zenith Construction',
      interiorDesigner: 'Emily Tan',
    },
    {
      id: '2',
      title: 'Modern Luxury Condo at Orchard',
      description: 'Experience sophisticated living with bespoke carpentry, marble accents, and smart home integration. The open-plan layout is ideal for entertaining, offering breathtaking city views.',
      imageUrls: [
        'https://picsum.photos/seed/project2-1/800/600',
        'https://picsum.photos/seed/project2-2/800/600',
        'https://picsum.photos/seed/project2-3/800/600',
        'https://picsum.photos/seed/project2-4/800/600',
        'https://picsum.photos/seed/project2-5/800/600',
        'https://picsum.photos/seed/project2-6/800/600',
      ],
      houseType: 'Condo',
      styleTags: ['Modern', 'Luxury', 'Contemporary'],
      location: 'Orchard Road',
      budget: 'S$ 120,000 - S$ 150,000',
      supplier: 'Formica Laminates',
      contractor: 'Prestige Builders',
      interiorDesigner: 'Jonathan Lee',
    },
    {
      id: '3',
      title: 'Cozy Industrial Loft in Tiong Bahru',
      description: 'Exposed brick, black metal frames, and warm lighting define this character-filled loft. A functional and stylish space that pays homage to the neighborhood\'s heritage with a modern twist.',
      imageUrls: [
        'https://picsum.photos/seed/project3-1/800/600',
        'https://picsum.photos/seed/project3-2/800/600',
        'https://picsum.photos/seed/project3-3/800/600',
        'https://picsum.photos/seed/project3-4/800/600',
        'https://picsum.photos/seed/project3-5/800/600',
        'https://picsum.photos/seed/project3-6/800/600',
      ],
      houseType: 'Landed',
      styleTags: ['Industrial', 'Loft', 'Vintage'],
      location: 'Tiong Bahru',
      budget: 'S$ 85,000 - S$ 100,000',
      supplier: 'Edison Light Globes',
      contractor: 'Urban Constructors',
      interiorDesigner: 'Sarah Chen',
    },
  ]);

  const [heroData, setHeroData] = useState<HeroData>({
    title: 'Your Sanctuary, Redefined.',
    subtitle: 'A trusted digital ecosystem that seamlessly connects homeowners with verified design professionals in Singapore.',
    imageUrl: 'https://picsum.photos/seed/hero/1920/1080',
  });

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [route, setRoute] = useState('home');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleLoginSuccess = useCallback(() => {
    setIsAuthenticated(true);
  }, []);
  
  const handleLogout = useCallback(() => {
    setIsAuthenticated(false);
    setRoute('home');
  }, []);

  const navigateToAdmin = useCallback(() => {
    setSelectedProject(null); // Ensure no project detail is open when going to admin
    setRoute('admin');
  }, []);
  
  const handleSelectProject = useCallback((project: Project) => {
    setSelectedProject(project);
  }, []);

  const handleCloseProjectDetail = useCallback(() => {
    setSelectedProject(null);
  }, []);

  if (route === 'admin') {
    if (!isAuthenticated) {
      return <AdminLogin onLoginSuccess={handleLoginSuccess} />;
    }
    return <AdminPage 
      projects={projects} 
      setProjects={setProjects}
      heroData={heroData}
      setHeroData={setHeroData}
      onLogout={handleLogout}
    />;
  }

  if (selectedProject) {
    return <ProjectDetail project={selectedProject} onClose={handleCloseProjectDetail} />
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero heroData={heroData} />
        <About />
        <Showcase projects={projects} onProjectSelect={handleSelectProject} />
      </main>
      <Footer onNavigateToAdmin={navigateToAdmin} />
    </div>
  );
};

export default App;