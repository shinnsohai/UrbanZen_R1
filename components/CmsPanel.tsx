import React, { useState, useCallback, useEffect } from 'react';
import { Project } from '../types';
import { generateProjectDescription } from '../services/geminiService';
import { CloseIcon, SparklesIcon } from './Icons';

interface CmsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveProject: (project: Omit<Project, 'id'>, id?: string) => void;
  projectToEdit: Project | null;
}

export const CmsPanel: React.FC<CmsPanelProps> = ({ isOpen, onClose, onSaveProject, projectToEdit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [imageUrlInput, setImageUrlInput] = useState('');
  const [houseType, setHouseType] = useState<'HDB' | 'Condo' | 'Landed'>('HDB');
  const [styleTags, setStyleTags] = useState('');
  const [location, setLocation] = useState('');
  const [budget, setBudget] = useState('');
  const [supplier, setSupplier] = useState('');
  const [contractor, setContractor] = useState('');
  const [interiorDesigner, setInteriorDesigner] = useState('');
  
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingUrl, setIsFetchingUrl] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isEditing = !!projectToEdit;

  const resetForm = useCallback(() => {
    setTitle('');
    setDescription('');
    setImagePreviews([]);
    setImageUrlInput('');
    setHouseType('HDB');
    setStyleTags('');
    setLocation('');
    setBudget('');
    setSupplier('');
    setContractor('');
    setInteriorDesigner('');
    setIsLoading(false);
    setIsFetchingUrl(false);
    setError(null);
  }, []);

  useEffect(() => {
    if (isOpen) {
      if (projectToEdit) {
        setTitle(projectToEdit.title);
        setDescription(projectToEdit.description);
        setImagePreviews(projectToEdit.imageUrls);
        setHouseType(projectToEdit.houseType);
        setStyleTags(projectToEdit.styleTags.join(', '));
        setLocation(projectToEdit.location);
        setBudget(projectToEdit.budget);
        setSupplier(projectToEdit.supplier);
        setContractor(projectToEdit.contractor);
        setInteriorDesigner(projectToEdit.interiorDesigner);
        setImageUrlInput('');
      } else {
        resetForm();
      }
    }
  }, [projectToEdit, isOpen, resetForm]);

  const handleClose = () => {
    onClose();
  };
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      files.forEach(file => {
          const reader = new FileReader();
          reader.onloadend = () => {
              setImagePreviews(prev => [...prev, reader.result as string]);
          };
          reader.readAsDataURL(file);
      })
    }
  };
  
  const handleRemoveImage = (indexToRemove: number) => {
    setImagePreviews(prev => prev.filter((_, index) => index !== indexToRemove));
  };

  const handleLoadFromUrl = async () => {
    if (!imageUrlInput) {
        setError('Please enter an image URL.');
        return;
    }

    setIsFetchingUrl(true);
    setError(null);
    
    try {
        let url = imageUrlInput;
        if (url.includes('github.com') && url.includes('/blob/')) {
            url = url.replace('github.com', 'raw.githubusercontent.com').replace('/blob/', '/');
        }
        
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Failed to fetch image. Status: ${response.status}`);
        }

        const blob = await response.blob();
        if (!blob.type.startsWith('image/')) {
            throw new Error('The URL does not point to a valid image file.');
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreviews(prev => [...prev, reader.result as string]);
            setImageUrlInput('');
        };
        reader.readAsDataURL(blob);

    } catch (err: any) {
        setError(`Error loading image from URL: ${err.message}. Please check the URL and ensure it's a direct link to an image.`);
    } finally {
        setIsFetchingUrl(false);
    }
  };

  const handleGenerateDescription = async () => {
    if (!title || !imagePreviews || imagePreviews.length === 0) {
      setError('Please provide a project title and at least one image to generate a description.');
      return;
    }

    const firstImage = imagePreviews[0];
    const imageParts = firstImage.match(/^data:(.+);base64,(.+)$/);
    if (!imageParts || imageParts.length !== 3) {
        setError('Invalid image format. Please upload a valid image file.');
        return;
    }
    
    const mimeType = imageParts[1];
    const imageBase64 = imageParts[2];

    setIsLoading(true);
    setError(null);
    try {
      const generatedDesc = await generateProjectDescription(title, imageBase64, mimeType);
      setDescription(generatedDesc);
    } catch (err: any)
{
      setError(err.message || 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !imagePreviews || imagePreviews.length === 0) {
      setError('Title, description and at least one image are required.');
      return;
    }
    
    const projectData = {
      title,
      description,
      imageUrls: imagePreviews,
      houseType,
      styleTags: styleTags.split(',').map(tag => tag.trim()).filter(tag => tag),
      location,
      budget,
      supplier,
      contractor,
      interiorDesigner,
    };

    onSaveProject(projectData, projectToEdit?.id);
    handleClose();
  };

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black bg-opacity-60 z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={handleClose}
      />
      <div 
        className={`fixed top-0 right-0 h-full w-full max-w-lg bg-white shadow-2xl z-50 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex flex-col h-full">
          <header className="flex items-center justify-between p-6 border-b">
            <h2 className="text-2xl font-bold text-gray-800">{isEditing ? 'Edit Project' : 'Add New Project'}</h2>
            <button onClick={handleClose} className="text-gray-500 hover:text-gray-800">
              <CloseIcon className="w-6 h-6" />
            </button>
          </header>

          <form onSubmit={handleSubmit} className="flex-grow p-6 overflow-y-auto">
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900 border-b pb-2">Project Details</h3>
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Project Title</label>
                <input
                  type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
                  placeholder="e.g., Modern Scandinavian BTO"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div>
                    <label htmlFor="houseType" className="block text-sm font-medium text-gray-700 mb-1">House Type</label>
                    <select id="houseType" value={houseType} onChange={(e) => setHouseType(e.target.value as 'HDB' | 'Condo' | 'Landed')}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 bg-white">
                        <option>HDB</option>
                        <option>Condo</option>
                        <option>Landed</option>
                    </select>
                </div>
                 <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                    <input type="text" id="location" value={location} onChange={(e) => setLocation(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500" placeholder="e.g., Tampines"/>
                </div>
              </div>

              <div>
                <label htmlFor="styleTags" className="block text-sm font-medium text-gray-700 mb-1">Style Tags</label>
                <input type="text" id="styleTags" value={styleTags} onChange={(e) => setStyleTags(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500" placeholder="e.g., Minimalist, Scandinavian, Muji"/>
                 <p className="mt-1 text-xs text-gray-500">Separate tags with a comma.</p>
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <div className="relative">
                  <textarea id="description" rows={6} value={description} onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500" placeholder="Describe the project..." />
                  <button type="button" onClick={handleGenerateDescription} disabled={isLoading || !title || !imagePreviews || imagePreviews.length === 0}
                    className="absolute bottom-2 right-2 inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:bg-gray-400 disabled:cursor-not-allowed">
                    <SparklesIcon className={`-ml-0.5 mr-2 h-4 w-4 ${isLoading ? 'animate-spin' : ''}`}/>
                    {isLoading ? 'Generating...' : 'Generate with AI'}
                  </button>
                </div>
                <p className="mt-2 text-xs text-gray-500">AI generation will be based on the first image in the gallery.</p>
              </div>

              <h3 className="text-lg font-medium text-gray-900 border-b pb-2">Project Images</h3>
              
              <div>
                <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-1">Add Image from URL</label>
                <div className="flex space-x-2">
                    <input type="text" id="imageUrl" value={imageUrlInput} onChange={(e) => setImageUrlInput(e.target.value)}
                        className="flex-grow px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500" placeholder="https://.../image.png" />
                    <button type="button" onClick={handleLoadFromUrl} disabled={isFetchingUrl}
                        className="px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:bg-gray-400">
                        {isFetchingUrl ? 'Adding...' : 'Add'}
                    </button>
                </div>
              </div>

              <div className="relative flex items-center">
                  <div className="flex-grow border-t border-gray-300"></div><span className="flex-shrink mx-4 text-sm text-gray-500">OR</span><div className="flex-grow border-t border-gray-300"></div>
              </div>
              
              <div>
                <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">Upload from Device</label>
                <div className="mt-1">
                      <label htmlFor="file-upload" className="relative w-full flex justify-center px-6 py-4 border-2 border-gray-300 border-dashed rounded-md cursor-pointer hover:border-teal-500 bg-gray-50">
                        <div className="space-y-1 text-center">
                            <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true"><path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                            <span className="text-sm text-teal-600 font-medium">Click to upload file(s)</span>
                            <input id="file-upload" name="file-upload" type="file" className="sr-only" accept="image/*" onChange={handleImageChange} multiple/>
                        </div>
                      </label>
                </div>
              </div>

              {imagePreviews.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Image Previews</label>
                  <div className="grid grid-cols-3 gap-4">
                    {imagePreviews.map((src, index) => (
                      <div key={index} className="relative group">
                        <img src={src} alt={`Preview ${index + 1}`} className="w-full h-24 object-cover rounded-md" />
                        <button type="button" onClick={() => handleRemoveImage(index)} className="absolute top-1 right-1 bg-black bg-opacity-50 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity" aria-label="Remove image">
                          <CloseIcon className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <h3 className="text-lg font-medium text-gray-900 border-b pb-2">Team & Budget</h3>
               <div>
                    <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-1">Budget</label>
                    <input type="text" id="budget" value={budget} onChange={(e) => setBudget(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500" placeholder="e.g., S$ 50,000 - S$ 70,000"/>
                </div>
                 <div>
                    <label htmlFor="supplier" className="block text-sm font-medium text-gray-700 mb-1">Supplier</label>
                    <input type="text" id="supplier" value={supplier} onChange={(e) => setSupplier(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500" placeholder="e.g., Hafary Tiles"/>
                </div>
                 <div>
                    <label htmlFor="contractor" className="block text-sm font-medium text-gray-700 mb-1">Contractor</label>
                    <input type="text" id="contractor" value={contractor} onChange={(e) => setContractor(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500" placeholder="e.g., Zenith Construction"/>
                </div>
                 <div>
                    <label htmlFor="interiorDesigner" className="block text-sm font-medium text-gray-700 mb-1">Interior Designer</label>
                    <input type="text" id="interiorDesigner" value={interiorDesigner} onChange={(e) => setInteriorDesigner(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500" placeholder="e.g., Emily Tan"/>
                </div>

              {error && <p className="text-sm text-red-600">{error}</p>}
            </div>
          </form>

          <footer className="p-6 border-t bg-gray-50">
            <p className="text-xs text-gray-500 text-center mb-4">Note: Projects are stored for this session. In a live app, new images would be uploaded to a secure backend.</p>
            <button
              type="submit"
              onClick={handleSubmit}
              className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-4 rounded-md transition-colors"
            >
              {isEditing ? 'Save Changes' : 'Add Project to Showcase'}
            </button>
          </footer>
        </div>
      </div>
    </>
  );
};