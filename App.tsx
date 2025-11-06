import React, { useState, useCallback, useMemo } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Showcase } from './components/Showcase';
import { Footer } from './components/Footer';
import { Project, HeroData, Professional, PageContent } from './types';
import AdminLogin from './components/AdminLogin';
import AdminPage from './components/AdminPage';
import { ProjectDetail } from './components/ProjectDetail';
import { ProfessionalDetail } from './components/ProfessionalDetail';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { TermsAndConditions } from './components/TermsAndConditions';
import { ProfessionalsShowcase } from './components/ProfessionalsShowcase';
import { initialPrivacyPolicy, initialTermsAndConditions } from './initialData';

const App: React.FC = () => {
  const [companyName, setCompanyName] = useState('URBAN ZEN');
  const [logoUrl, setLogoUrl] = useState(''); // Empty string means use default icon
  const [contactUrl, setContactUrl] = useState('https://forms.gle/nC1jjRQ196nKV2DG9');
  const [facebookUrl, setFacebookUrl] = useState('#');
  const [instagramUrl, setInstagramUrl] = useState('#');
  
  const [professionals, setProfessionals] = useState<Professional[]>([
    { id: 'sup1', name: 'Hafary Tiles', role: 'Supplier', bio: 'Hafary is a leading supplier of premium tiles, stones, and mosaics, offering a vast collection of high-quality surface materials for residential and commercial projects.', profileImageUrl: 'https://picsum.photos/seed/sup1/400/400' },
    { id: 'sup2', name: 'Formica Laminates', role: 'Supplier', bio: 'Formica Group is a global leader in the design, manufacture and distribution of innovative surfacing products for commercial and residential applications.', profileImageUrl: 'https://picsum.photos/seed/sup2/400/400' },
    { id: 'sup3', name: 'Edison Light Globes', role: 'Supplier', bio: 'Specializing in vintage and industrial lighting, Edison Light Globes provides unique fixtures that add character and warmth to any space.', profileImageUrl: 'https://picsum.photos/seed/sup3/400/400' },
    { id: 'con1', name: 'Zenith Construction', role: 'Contractor', bio: 'Zenith Construction is known for its meticulous attention to detail and commitment to quality craftsmanship, ensuring every project is built to last.', profileImageUrl: 'https://picsum.photos/seed/con1/400/400' },
    { id: 'con2', name: 'Prestige Builders', role: 'Contractor', bio: 'With a focus on luxury residential projects, Prestige Builders delivers exceptional results through expert project management and skilled execution.', profileImageUrl: 'https://picsum.photos/seed/con2/400/400' },
    { id: 'con3', name: 'Urban Constructors', role: 'Contractor', bio: 'Urban Constructors specializes in transforming urban spaces with innovative building solutions and sustainable practices.', profileImageUrl: 'https://picsum.photos/seed/con3/400/400' },
    { id: 'des1', name: 'Emily Tan', role: 'Interior Designer', bio: 'Emily Tan is celebrated for her minimalist and user-centric designs that create calm, functional, and beautiful living environments.', profileImageUrl: 'https://picsum.photos/seed/des1/400/400' },
    { id: 'des2', name: 'Jonathan Lee', role: 'Interior Designer', bio: 'Jonathan Lee architects sophisticated and luxurious interiors, blending timeless elegance with modern technology for a seamless living experience.', profileImageUrl: 'https://picsum.photos/seed/des2/400/400' },
    { id: 'des3', name: 'Sarah Chen', role: 'Interior Designer', bio: 'Sarah Chen draws inspiration from history and context, creating eclectic and story-rich spaces that are both stylish and deeply personal.', profileImageUrl: 'https://picsum.photos/seed/des3/400/400' },
  ]);

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
      supplierId: 'sup1',
      contractorId: 'con1',
      interiorDesignerId: 'des1',
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
      supplierId: 'sup2',
      contractorId: 'con2',
      interiorDesignerId: 'des2',
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
      supplierId: 'sup3',
      contractorId: 'con3',
      interiorDesignerId: 'des3',
    },
  ]);

  const [heroData, setHeroData] = useState<HeroData>({
    title: 'Your Sanctuary, Redefined.',
    subtitle: 'A trusted digital ecosystem that seamlessly connects homeowners with verified design professionals in Singapore.',
    imageUrl: 'https://picsum.photos/seed/hero/1920/1080',
  });
  
  const [privacyContent, setPrivacyContent] = useState<PageContent>(initialPrivacyPolicy);
  const [termsContent, setTermsContent] = useState<PageContent>(initialTermsAndConditions);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [route, setRoute] = useState('home');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedProfessional, setSelectedProfessional] = useState<Professional | null>(null);
  
  // State for project filtering
  const [filter, setFilter] = useState<'All' | 'HDB' | 'Condo' | 'Landed'>('All');
  const [searchTerm, setSearchTerm] = useState('');
  
  // State for professional filtering
  const [professionalFilter, setProfessionalFilter] = useState<'All' | 'Supplier' | 'Contractor' | 'Interior Designer'>('All');
  const [professionalSearchTerm, setProfessionalSearchTerm] = useState('');

  const filteredProjects = useMemo(() => {
    return projects
      .filter(project => {
        if (filter === 'All') return true;
        return project.houseType === filter;
      })
      .filter(project => {
        if (!searchTerm) return true;
        const lowercasedTerm = searchTerm.toLowerCase();
        return (
          project.title.toLowerCase().includes(lowercasedTerm) ||
          project.description.toLowerCase().includes(lowercasedTerm) ||
          project.location.toLowerCase().includes(lowercasedTerm) ||
          project.styleTags.some(tag => tag.toLowerCase().includes(lowercasedTerm))
        );
      });
  }, [projects, filter, searchTerm]);

  const filteredProfessionals = useMemo(() => {
    return professionals
      .filter(professional => {
        if (professionalFilter === 'All') return true;
        return professional.role === professionalFilter;
      })
      .filter(professional => {
        if (!professionalSearchTerm) return true;
        const lowercasedTerm = professionalSearchTerm.toLowerCase();
        return (
          professional.name.toLowerCase().includes(lowercasedTerm) ||
          professional.bio.toLowerCase().includes(lowercasedTerm) ||
          professional.role.toLowerCase().includes(lowercasedTerm)
        );
      });
  }, [professionals, professionalFilter, professionalSearchTerm]);


  const handleLoginSuccess = useCallback(() => {
    setIsAuthenticated(true);
  }, []);
  
  const handleLogout = useCallback(() => {
    setIsAuthenticated(false);
    setRoute('home');
  }, []);

  const navigateToAdmin = useCallback(() => {
    setSelectedProject(null);
    setSelectedProfessional(null);
    setRoute('admin');
  }, []);

  const navigateToPrivacy = useCallback(() => {
    setSelectedProject(null);
    setSelectedProfessional(null);
    setRoute('privacy');
  }, []);

  const navigateToTerms = useCallback(() => {
    setSelectedProject(null);
    setSelectedProfessional(null);
    setRoute('terms');
  }, []);

  const navigateToHome = useCallback(() => {
    setRoute('home');
    setSelectedProject(null);
    setSelectedProfessional(null);
  }, []);
  
  const handleSelectProject = useCallback((project: Project) => {
    setSelectedProject(project);
    setSelectedProfessional(null);
  }, []);

  const handleCloseProjectDetail = useCallback(() => {
    setSelectedProject(null);
  }, []);

  const handleSelectProfessional = useCallback((professional: Professional) => {
    setSelectedProfessional(professional);
  }, []);

  const handleCloseProfessionalDetail = useCallback(() => {
    setSelectedProfessional(null);
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
      companyName={companyName}
      setCompanyName={setCompanyName}
      logoUrl={logoUrl}
      setLogoUrl={setLogoUrl}
      contactUrl={contactUrl}
      setContactUrl={setContactUrl}
      facebookUrl={facebookUrl}
      setFacebookUrl={setFacebookUrl}
      instagramUrl={instagramUrl}
      setInstagramUrl={setInstagramUrl}
      professionals={professionals}
      setProfessionals={setProfessionals}
      privacyContent={privacyContent}
      setPrivacyContent={setPrivacyContent}
      termsContent={termsContent}
      setTermsContent={setTermsContent}
      onLogout={handleLogout}
    />;
  }

  if (route === 'privacy') {
    return <PrivacyPolicy 
      content={privacyContent}
      onBackToHome={navigateToHome}
      companyName={companyName}
      logoUrl={logoUrl}
      contactUrl={contactUrl}
      facebookUrl={facebookUrl}
      instagramUrl={instagramUrl}
      onNavigateToAdmin={navigateToAdmin}
      onNavigateToPrivacy={navigateToPrivacy}
      onNavigateToTerms={navigateToTerms}
    />
  }

  if (route === 'terms') {
    return <TermsAndConditions
      content={termsContent}
      onBackToHome={navigateToHome}
      companyName={companyName}
      logoUrl={logoUrl}
      contactUrl={contactUrl}
      facebookUrl={facebookUrl}
      instagramUrl={instagramUrl}
      onNavigateToAdmin={navigateToAdmin}
      onNavigateToPrivacy={navigateToPrivacy}
      onNavigateToTerms={navigateToTerms}
    />
  }
  
  if (selectedProfessional) {
    return <ProfessionalDetail 
      professional={selectedProfessional} 
      projects={projects}
      onClose={handleCloseProfessionalDetail}
      onProjectSelect={handleSelectProject}
      companyName={companyName}
      logoUrl={logoUrl}
      contactUrl={contactUrl}
      facebookUrl={facebookUrl}
      instagramUrl={instagramUrl}
      onNavigateToAdmin={navigateToAdmin}
      onNavigateToPrivacy={navigateToPrivacy}
      onNavigateToTerms={navigateToTerms}
    />
  }

  if (selectedProject) {
    return <ProjectDetail 
      project={selectedProject} 
      professionals={professionals}
      onClose={handleCloseProjectDetail} 
      onSelectProfessional={handleSelectProfessional}
      companyName={companyName}
      logoUrl={logoUrl}
      contactUrl={contactUrl}
      facebookUrl={facebookUrl}
      instagramUrl={instagramUrl}
      onNavigateToAdmin={navigateToAdmin}
      onNavigateToPrivacy={navigateToPrivacy}
      onNavigateToTerms={navigateToTerms}
    />
  }

  return (
    <div className="min-h-screen bg-white">
      <Header companyName={companyName} logoUrl={logoUrl} contactUrl={contactUrl} />
      <main>
        <Hero heroData={heroData} />
        <About />
        <ProfessionalsShowcase 
          professionals={filteredProfessionals} 
          onSelectProfessional={handleSelectProfessional}
          filter={professionalFilter}
          onFilterChange={setProfessionalFilter}
          searchTerm={professionalSearchTerm}
          onSearchChange={setProfessionalSearchTerm}
        />
        <Showcase 
          projects={filteredProjects} 
          onProjectSelect={handleSelectProject}
          filter={filter}
          onFilterChange={setFilter}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />
      </main>
      <Footer 
        companyName={companyName} 
        contactUrl={contactUrl} 
        facebookUrl={facebookUrl}
        instagramUrl={instagramUrl}
        onNavigateToAdmin={navigateToAdmin} 
        onNavigateToPrivacy={navigateToPrivacy} 
        onNavigateToTerms={navigateToTerms} 
      />
    </div>
  );
};

export default App;