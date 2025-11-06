import React, { useState, useCallback, useMemo } from 'react';
import { Project, HeroData, Professional, PageContent } from '../types';
import { CmsPanel } from './CmsPanel';
import { ProfessionalCmsPanel } from './ProfessionalCmsPanel';
import { PlusIcon, SortUpDownIcon } from './Icons';

type SortDirection = 'asc' | 'desc';

interface SortConfig<T> {
  key: keyof T;
  direction: SortDirection;
}

// Helper for sorting
const sortData = <T,>(data: T[], sortConfig: SortConfig<T> | null): T[] => {
  if (!sortConfig) return data;
  const sortedData = [...data];
  sortedData.sort((a, b) => {
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];
    if (aValue < bValue) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });
  return sortedData;
};

// Manage Professionals Section Component
const ManageProfessionalsSection: React.FC<{
  professionals: Professional[];
  onAdd: () => void;
  onEdit: (pro: Professional) => void;
  onDelete: (id: string) => void;
}> = ({ professionals, onAdd, onEdit, onDelete }) => {
  const [filters, setFilters] = useState<{ name: string; role: string }>({ name: '', role: '' });
  const [sortConfig, setSortConfig] = useState<SortConfig<Professional> | null>(null);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const requestSort = (key: keyof Professional) => {
    let direction: SortDirection = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };
  
  const filteredProfessionals = useMemo(() => {
    let filteredData = professionals.filter(pro => 
      pro.name.toLowerCase().includes(filters.name.toLowerCase()) &&
      (filters.role === '' || pro.role === filters.role)
    );
    return sortData(filteredData, sortConfig);
  }, [professionals, filters, sortConfig]);

  return (
    <div>
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold">Manage Professionals</h2>
            <button onClick={onAdd} className="inline-flex items-center px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-md shadow-sm">
                <PlusIcon className="w-5 h-5 mr-2" /> Add Professional
            </button>
        </div>
        <div className="bg-white shadow rounded-lg overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                           <button onClick={() => requestSort('name')} className="flex items-center group">Name <SortUpDownIcon className="w-4 h-4 ml-1 text-gray-400 group-hover:text-gray-600" /></button>
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            <button onClick={() => requestSort('role')} className="flex items-center group">Role <SortUpDownIcon className="w-4 h-4 ml-1 text-gray-400 group-hover:text-gray-600" /></button>
                        </th>
                        <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                    </tr>
                    <tr className="bg-gray-100">
                        <th className="px-6 py-2"></th>
                        <th className="px-6 py-2">
                            <input type="text" name="name" placeholder="Filter by name..." value={filters.name} onChange={handleFilterChange} className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md" />
                        </th>
                         <th className="px-6 py-2">
                             <select name="role" value={filters.role} onChange={handleFilterChange} className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md bg-white">
                                 <option value="">All Roles</option>
                                 <option value="Supplier">Supplier</option>
                                 <option value="Contractor">Contractor</option>
                                 <option value="Interior Designer">Interior Designer</option>
                             </select>
                        </th>
                         <th className="px-6 py-2"></th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {filteredProfessionals.map(pro => (
                        <tr key={pro.id}>
                            <td className="px-6 py-4 whitespace-nowrap"><img src={pro.profileImageUrl} alt={pro.name} className="w-12 h-12 object-cover rounded-full"/></td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{pro.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{pro.role}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <button onClick={() => onEdit(pro)} className="text-teal-600 hover:text-teal-900 mr-4">Edit</button>
                                <button onClick={() => onDelete(pro.id)} className="text-red-600 hover:text-red-900">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  );
}

// Manage Projects Section Component
const ManageProjectsSection: React.FC<{
  projects: Project[];
  onAdd: () => void;
  onEdit: (pro: Project) => void;
  onDelete: (id: string) => void;
}> = ({ projects, onAdd, onEdit, onDelete }) => {
  const [filters, setFilters] = useState<{ title: string; houseType: string; location: string }>({ title: '', houseType: '', location: '' });
  const [sortConfig, setSortConfig] = useState<SortConfig<Project> | null>(null);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };
  
  const requestSort = (key: keyof Project) => {
    let direction: SortDirection = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const filteredProjects = useMemo(() => {
    let filteredData = projects.filter(proj => 
      proj.title.toLowerCase().includes(filters.title.toLowerCase()) &&
      proj.location.toLowerCase().includes(filters.location.toLowerCase()) &&
      (filters.houseType === '' || proj.houseType === filters.houseType)
    );
    return sortData(filteredData, sortConfig);
  }, [projects, filters, sortConfig]);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Manage Projects</h2>
        <button onClick={onAdd} className="inline-flex items-center px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-md shadow-sm">
          <PlusIcon className="w-5 h-5 mr-2" /> Add New Project
        </button>
      </div>
      <div className="bg-white shadow rounded-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button onClick={() => requestSort('title')} className="flex items-center group">Title <SortUpDownIcon className="w-4 h-4 ml-1 text-gray-400 group-hover:text-gray-600" /></button>
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button onClick={() => requestSort('houseType')} className="flex items-center group">House Type <SortUpDownIcon className="w-4 h-4 ml-1 text-gray-400 group-hover:text-gray-600" /></button>
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button onClick={() => requestSort('location')} className="flex items-center group">Location <SortUpDownIcon className="w-4 h-4 ml-1 text-gray-400 group-hover:text-gray-600" /></button>
              </th>
              <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
            </tr>
            <tr className="bg-gray-100">
                <th className="px-6 py-2"></th>
                <th className="px-6 py-2">
                    <input type="text" name="title" placeholder="Filter by title..." value={filters.title} onChange={handleFilterChange} className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md" />
                </th>
                <th className="px-6 py-2">
                    <select name="houseType" value={filters.houseType} onChange={handleFilterChange} className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md bg-white">
                        <option value="">All Types</option>
                        <option value="HDB">HDB</option>
                        <option value="Condo">Condo</option>
                        <option value="Landed">Landed</option>
                    </select>
                </th>
                <th className="px-6 py-2">
                     <input type="text" name="location" placeholder="Filter by location..." value={filters.location} onChange={handleFilterChange} className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md" />
                </th>
                <th className="px-6 py-2"></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredProjects.map(project => (
              <tr key={project.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {project.imageUrls && project.imageUrls.length > 0 && (
                    <img src={project.imageUrls[0]} alt={project.title} className="w-24 h-16 object-cover rounded"/>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{project.title}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{project.houseType}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{project.location}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button onClick={() => onEdit(project)} className="text-teal-600 hover:text-teal-900 mr-4">Edit</button>
                  <button onClick={() => onDelete(project.id)} className="text-red-600 hover:text-red-900">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

interface AdminPageProps {
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
  heroData: HeroData;
  setHeroData: React.Dispatch<React.SetStateAction<HeroData>>;
  companyName: string;
  setCompanyName: React.Dispatch<React.SetStateAction<string>>;
  logoUrl: string;
  setLogoUrl: React.Dispatch<React.SetStateAction<string>>;
  contactUrl: string;
  setContactUrl: React.Dispatch<React.SetStateAction<string>>;
  facebookUrl: string;
  setFacebookUrl: React.Dispatch<React.SetStateAction<string>>;
  instagramUrl: string;
  setInstagramUrl: React.Dispatch<React.SetStateAction<string>>;
  professionals: Professional[];
  setProfessionals: React.Dispatch<React.SetStateAction<Professional[]>>;
  privacyContent: PageContent;
  setPrivacyContent: React.Dispatch<React.SetStateAction<PageContent>>;
  termsContent: PageContent;
  setTermsContent: React.Dispatch<React.SetStateAction<PageContent>>;
  onLogout: () => void;
}

const AdminPage: React.FC<AdminPageProps> = ({ 
  projects, setProjects, heroData, setHeroData, 
  companyName, setCompanyName, logoUrl, setLogoUrl, contactUrl, setContactUrl,
  facebookUrl, setFacebookUrl, instagramUrl, setInstagramUrl,
  professionals, setProfessionals, privacyContent, setPrivacyContent,
  termsContent, setTermsContent, onLogout 
}) => {
  const [isCmsOpen, setIsCmsOpen] = useState(false);
  const [projectToEdit, setProjectToEdit] = useState<Project | null>(null);
  
  const [isProfessionalCmsOpen, setIsProfessionalCmsOpen] = useState(false);
  const [professionalToEdit, setProfessionalToEdit] = useState<Professional | null>(null);

  const [localHeroData, setLocalHeroData] = useState<HeroData>(heroData);
  const [localCompanyName, setLocalCompanyName] = useState(companyName);
  const [localLogoUrl, setLocalLogoUrl] = useState(logoUrl);
  const [localContactUrl, setLocalContactUrl] = useState(contactUrl);
  const [localFacebookUrl, setLocalFacebookUrl] = useState(facebookUrl);
  const [localInstagramUrl, setLocalInstagramUrl] = useState(instagramUrl);
  const [localPrivacyContent, setLocalPrivacyContent] = useState(privacyContent);
  const [localTermsContent, setLocalTermsContent] = useState(termsContent);

  const handleSaveSiteSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setCompanyName(localCompanyName);
    setLogoUrl(localLogoUrl);
    setContactUrl(localContactUrl);
    setFacebookUrl(localFacebookUrl);
    setInstagramUrl(localInstagramUrl);
    setHeroData(localHeroData);
    alert('Site settings updated!');
  };

  const handleSaveContent = (type: 'privacy' | 'terms') => {
    if (type === 'privacy') {
      setPrivacyContent(localPrivacyContent);
      alert('Privacy Policy updated!');
    } else {
      setTermsContent(localTermsContent);
      alert('Terms & Conditions updated!');
    }
  };

  const handleContentChange = (
    type: 'privacy' | 'terms', 
    sectionIndex: number, 
    value: string
  ) => {
    if (type === 'privacy') {
      const updatedContent = { ...localPrivacyContent };
      updatedContent.content[sectionIndex].body = value;
      setLocalPrivacyContent(updatedContent);
    } else {
      const updatedContent = { ...localTermsContent };
      updatedContent.content[sectionIndex].body = value;
      setLocalTermsContent(updatedContent);
    }
  }

  // Project CMS Handlers
  const handleAddProjectClick = () => {
    setProjectToEdit(null);
    setIsCmsOpen(true);
  };
  const handleEditProjectClick = (project: Project) => {
    setProjectToEdit(project);
    setIsCmsOpen(true);
  };
  const handleDeleteProject = (projectId: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
        setProjects(prevProjects => prevProjects.filter(p => p.id !== projectId));
    }
  };
  const handleSaveProject = useCallback((projectData: Omit<Project, 'id' | 'supplierId' | 'contractorId' | 'interiorDesignerId'> & { supplier: string, contractor: string, interiorDesigner: string }, id?: string) => {
    const { supplier, contractor, interiorDesigner, ...restOfProjectData } = projectData;
    const professionalIds = {
      supplierId: supplier.toLowerCase().replace(/\s/g, ''),
      contractorId: contractor.toLowerCase().replace(/\s/g, ''),
      interiorDesignerId: interiorDesigner.toLowerCase().replace(/\s/g, ''),
    }
    if (id) {
      setProjects(prevProjects => 
        prevProjects.map(p => p.id === id ? { ...restOfProjectData, ...professionalIds, id } : p)
      );
    } else {
      setProjects(prevProjects => [
        { ...restOfProjectData, ...professionalIds, id: new Date().toISOString() } as Project,
        ...prevProjects,
      ]);
    }
    setIsCmsOpen(false);
    setProjectToEdit(null);
  }, [setProjects]);
  
  // Professional CMS Handlers
  const handleAddProfessionalClick = () => {
    setProfessionalToEdit(null);
    setIsProfessionalCmsOpen(true);
  };
  const handleEditProfessionalClick = (professional: Professional) => {
    setProfessionalToEdit(professional);
    setIsProfessionalCmsOpen(true);
  };
  const handleDeleteProfessional = (professionalId: string) => {
    if (window.confirm('Are you sure you want to delete this professional? This cannot be undone.')) {
        setProfessionals(prev => prev.filter(p => p.id !== professionalId));
    }
  };
  const handleSaveProfessional = useCallback((professionalData: Omit<Professional, 'id'>, id?: string) => {
    if (id) {
        setProfessionals(prev => prev.map(p => p.id === id ? { ...professionalData, id } : p));
    } else {
        setProfessionals(prev => [{ ...professionalData, id: new Date().toISOString() }, ...prev]);
    }
    setIsProfessionalCmsOpen(false);
    setProfessionalToEdit(null);
  }, [setProfessionals]);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">{companyName} CMS</h1>
          <button 
            onClick={onLogout}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </header>
      <main className="container mx-auto px-6 py-8 space-y-12">
        {/* Site-wide Settings Section */}
        <div>
            <h2 className="text-3xl font-bold mb-4">Site-wide Settings</h2>
            <form onSubmit={handleSaveSiteSettings} className="bg-white shadow rounded-lg p-6 space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                        <input type="text" id="companyName" value={localCompanyName} onChange={(e) => setLocalCompanyName(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500" />
                    </div>
                     <div>
                        <label htmlFor="logoUrl" className="block text-sm font-medium text-gray-700 mb-1">Logo URL (optional)</label>
                        <input type="text" id="logoUrl" value={localLogoUrl} onChange={(e) => setLocalLogoUrl(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500" placeholder="https://.../logo.png" />
                    </div>
                </div>
                <h3 className="text-lg font-medium text-gray-900 border-t pt-6">Contact & Social Links</h3>
                <div>
                    <label htmlFor="contactUrl" className="block text-sm font-medium text-gray-700 mb-1">Contact Us Link</label>
                    <input type="text" id="contactUrl" value={localContactUrl} onChange={(e) => setLocalContactUrl(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500" />
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="facebookUrl" className="block text-sm font-medium text-gray-700 mb-1">Facebook URL</label>
                        <input type="text" id="facebookUrl" value={localFacebookUrl} onChange={(e) => setLocalFacebookUrl(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500" placeholder="https://facebook.com/yourpage"/>
                    </div>
                     <div>
                        <label htmlFor="instagramUrl" className="block text-sm font-medium text-gray-700 mb-1">Instagram URL</label>
                        <input type="text" id="instagramUrl" value={localInstagramUrl} onChange={(e) => setLocalInstagramUrl(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500" placeholder="https://instagram.com/yourprofile" />
                    </div>
                </div>
                <h3 className="text-lg font-medium text-gray-900 border-t pt-6">Hero Section</h3>
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Hero Title</label>
                    <input type="text" id="title" name="title" value={localHeroData.title} onChange={(e) => setLocalHeroData(p => ({...p, title: e.target.value}))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500" />
                </div>
                <div>
                    <label htmlFor="subtitle" className="block text-sm font-medium text-gray-700 mb-1">Hero Subtitle</label>
                    <textarea id="subtitle" name="subtitle" rows={3} value={localHeroData.subtitle} onChange={(e) => setLocalHeroData(p => ({...p, subtitle: e.target.value}))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500" />
                </div>
                <div>
                    <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-1">Background Image URL</label>
                    <input type="text" id="imageUrl" name="imageUrl" value={localHeroData.imageUrl} onChange={(e) => setLocalHeroData(p => ({...p, imageUrl: e.target.value}))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500" />
                </div>
                <div className="text-right">
                    <button type="submit" className="inline-flex items-center px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-md shadow-sm">
                        Save Site Settings
                    </button>
                </div>
            </form>
        </div>
        
        <ManageProfessionalsSection
            professionals={professionals}
            onAdd={handleAddProfessionalClick}
            onEdit={handleEditProfessionalClick}
            onDelete={handleDeleteProfessional}
        />

        <ManageProjectsSection
          projects={projects}
          onAdd={handleAddProjectClick}
          onEdit={handleEditProjectClick}
          onDelete={handleDeleteProject}
        />
        
        {/* Content Management Section */}
        <div>
          <h2 className="text-3xl font-bold mb-4">Page Content Management</h2>
          <div className="space-y-8">
            {/* Privacy Policy Editor */}
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4">{localPrivacyContent.title}</h3>
              <div className="space-y-4">
                {localPrivacyContent.content.map((section, index) => (
                  <div key={index}>
                    <label htmlFor={`privacy-${index}`} className="block text-sm font-medium text-gray-700">{section.title}</label>
                    <textarea id={`privacy-${index}`} rows={6} value={section.body} onChange={(e) => handleContentChange('privacy', index, e.target.value)}
                      className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500" />
                  </div>
                ))}
              </div>
              <div className="text-right mt-6">
                <button onClick={() => handleSaveContent('privacy')} className="inline-flex items-center px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-md shadow-sm">
                  Save Privacy Policy
                </button>
              </div>
            </div>

            {/* Terms and Conditions Editor */}
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4">{localTermsContent.title}</h3>
              <div className="space-y-4">
                {localTermsContent.content.map((section, index) => (
                  <div key={index}>
                    <label htmlFor={`terms-${index}`} className="block text-sm font-medium text-gray-700">{section.title}</label>
                    <textarea id={`terms-${index}`} rows={6} value={section.body} onChange={(e) => handleContentChange('terms', index, e.target.value)}
                      className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500" />
                  </div>
                ))}
              </div>
              <div className="text-right mt-6">
                <button onClick={() => handleSaveContent('terms')} className="inline-flex items-center px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-md shadow-sm">
                  Save Terms & Conditions
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <CmsPanel 
        isOpen={isCmsOpen}
        onClose={() => { setIsCmsOpen(false); setProjectToEdit(null); }}
        onSaveProject={handleSaveProject}
        projectToEdit={projectToEdit}
      />
      <ProfessionalCmsPanel
        isOpen={isProfessionalCmsOpen}
        onClose={() => { setIsProfessionalCmsOpen(false); setProfessionalToEdit(null); }}
        onSaveProfessional={handleSaveProfessional}
        professionalToEdit={professionalToEdit}
      />
    </div>
  );
};

export default AdminPage;