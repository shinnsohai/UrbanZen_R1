import React, { useState, useCallback } from 'react';
import { Project } from '../types';
import { generateProjectDescription } from '../services/geminiService';
import { CloseIcon, SparklesIcon } from './Icons';

interface CmsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProject: (project: Omit<Project, 'id'>) => void;
}

export const CmsPanel: React.FC<CmsPanelProps> = ({ isOpen, onClose, onAddProject }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const resetForm = useCallback(() => {
    setTitle('');
    setDescription('');
    setImage(null);
    setImagePreview(null);
    setIsLoading(false);
    setError(null);
  }, []);

  const handleClose = () => {
    resetForm();
    onClose();
  };
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerateDescription = async () => {
    if (!title || !imagePreview) {
      setError('Please provide a project title and upload an image to generate a description.');
      return;
    }

    const imageParts = imagePreview.match(/^data:(.+);base64,(.+)$/);
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
    } catch (err: any) {
      setError(err.message || 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !imagePreview) {
      setError('All fields are required.');
      return;
    }
    onAddProject({ title, description, imageUrl: imagePreview });
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
            <h2 className="text-2xl font-bold text-gray-800">Add New Project</h2>
            <button onClick={handleClose} className="text-gray-500 hover:text-gray-800">
              <CloseIcon className="w-6 h-6" />
            </button>
          </header>

          <form onSubmit={handleSubmit} className="flex-grow p-6 overflow-y-auto">
            <div className="space-y-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Project Title</label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
                  placeholder="e.g., Modern Scandinavian BTO"
                />
              </div>

              <div>
                <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">Project Image</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    {imagePreview ? (
                      <img src={imagePreview} alt="Preview" className="mx-auto h-48 w-auto rounded-md object-contain" />
                    ) : (
                      <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                    <div className="flex text-sm text-gray-600">
                      <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-teal-600 hover:text-teal-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-teal-500">
                        <span>Upload a file</span>
                        <input id="file-upload" name="file-upload" type="file" className="sr-only" accept="image/*" onChange={handleImageChange}/>
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <div className="relative">
                  <textarea
                    id="description"
                    rows={6}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
                    placeholder="Describe the project..."
                  />
                  <button
                    type="button"
                    onClick={handleGenerateDescription}
                    disabled={isLoading || !title || !imagePreview}
                    className="absolute bottom-2 right-2 inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    <SparklesIcon className={`-ml-0.5 mr-2 h-4 w-4 ${isLoading ? 'animate-spin' : ''}`}/>
                    {isLoading ? 'Generating...' : 'Generate with AI'}
                  </button>
                </div>
              </div>

              {error && <p className="text-sm text-red-600">{error}</p>}
            </div>
          </form>

          <footer className="p-6 border-t bg-gray-50">
            <p className="text-xs text-gray-500 text-center mb-4">Note: Projects added are stored only for this session and will be lost on page reload.</p>
            <button
              type="submit"
              onClick={handleSubmit}
              className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-4 rounded-md transition-colors"
            >
              Add Project to Showcase
            </button>
          </footer>
        </div>
      </div>
    </>
  );
};
