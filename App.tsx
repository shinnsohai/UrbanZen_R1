
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Showcase } from './components/Showcase';
import { Footer } from './components/Footer';
import { Project } from './types';
import AdminLogin from './components/AdminLogin';
import AdminPage from './components/AdminPage';

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
    },
  ]);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [route, setRoute] = useState('home');

  const handleLoginSuccess = useCallback(() => {
    setIsAuthenticated(true);
  }, []);
  
  const handleLogout = useCallback(() => {
    setIsAuthenticated(false);
    setRoute('home');
  }, []);

  const navigateToAdmin = useCallback(() => {
    setRoute('admin');
  }, []);

  if (route === 'admin') {
    if (!isAuthenticated) {
      return <AdminLogin onLoginSuccess={handleLoginSuccess} />;
    }
    return <AdminPage 
      projects={projects} 
      setProjects={setProjects}
      onLogout={handleLogout}
    />;
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <About />
        <Showcase projects={projects} />
      </main>
      <Footer onNavigateToAdmin={navigateToAdmin} />
    </div>
  );
};

export default App;
