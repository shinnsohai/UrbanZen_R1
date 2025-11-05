
import React, { useState, useCallback } from 'react';
import { Project } from '../types';
import { CmsPanel } from './CmsPanel';
import { PlusIcon } from './Icons';

interface AdminPageProps {
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
  onLogout: () => void;
}

const AdminPage: React.FC<AdminPageProps> = ({ projects, setProjects, onLogout }) => {
  const [isCmsOpen, setIsCmsOpen] = useState(false);
  const [projectToEdit, setProjectToEdit] = useState<Project | null>(null);

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

  const handleSaveProject = useCallback((projectData: Omit<Project, 'id'>, id?: string) => {
    if (id) {
      // Editing existing project
      setProjects(prevProjects => 
        prevProjects.map(p => p.id === id ? { ...projectData, id } : p)
      );
    } else {
      // Adding new project
      setProjects(prevProjects => [
        { ...projectData, id: new Date().toISOString() },
        ...prevProjects,
      ]);
    }
    setIsCmsOpen(false);
    setProjectToEdit(null);
  }, [setProjects]);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Urban Zen CMS</h1>
          <button 
            onClick={onLogout}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </header>
      <main className="container mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Projects</h2>
          <button
            onClick={handleAddProjectClick}
            className="inline-flex items-center px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-md shadow-sm"
          >
            <PlusIcon className="w-5 h-5 mr-2" />
            Add New Project
          </button>
        </div>
        <div className="bg-white shadow rounded-lg overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {projects.map(project => (
                <tr key={project.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {project.imageUrls && project.imageUrls.length > 0 && (
                      <img src={project.imageUrls[0]} alt={project.title} className="w-24 h-16 object-cover rounded"/>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{project.title}</td>
                  <td className="px-6 py-4 text-sm text-gray-500 max-w-sm">
                    <p className="truncate w-full">{project.description}</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button onClick={() => handleEditProjectClick(project)} className="text-teal-600 hover:text-teal-900 mr-4">Edit</button>
                    <button onClick={() => handleDeleteProject(project.id)} className="text-red-600 hover:text-red-900">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      <CmsPanel 
        isOpen={isCmsOpen}
        onClose={() => {
          setIsCmsOpen(false);
          setProjectToEdit(null);
        }}
        onSaveProject={handleSaveProject}
        projectToEdit={projectToEdit}
      />
    </div>
  );
};

export default AdminPage;
