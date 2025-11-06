import React, { useState, useEffect, useCallback } from 'react';
import { Professional } from '../types';
import { CloseIcon } from './Icons';

interface ProfessionalCmsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveProfessional: (professional: Omit<Professional, 'id'>, id?: string) => void;
  professionalToEdit: Professional | null;
}

export const ProfessionalCmsPanel: React.FC<ProfessionalCmsPanelProps> = ({ isOpen, onClose, onSaveProfessional, professionalToEdit }) => {
  const [name, setName] = useState('');
  const [role, setRole] = useState<'Supplier' | 'Contractor' | 'Interior Designer'>('Supplier');
  const [bio, setBio] = useState('');
  const [profileImageUrl, setProfileImageUrl] = useState('');
  const [error, setError] = useState<string | null>(null);

  const isEditing = !!professionalToEdit;

  const resetForm = useCallback(() => {
    setName('');
    setRole('Supplier');
    setBio('');
    setProfileImageUrl('');
    setError(null);
  }, []);

  useEffect(() => {
    if (isOpen) {
      if (professionalToEdit) {
        setName(professionalToEdit.name);
        setRole(professionalToEdit.role);
        setBio(professionalToEdit.bio);
        setProfileImageUrl(professionalToEdit.profileImageUrl);
      } else {
        resetForm();
      }
    }
  }, [professionalToEdit, isOpen, resetForm]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !bio || !profileImageUrl) {
      setError('All fields are required.');
      return;
    }

    const professionalData = {
      name,
      role,
      bio,
      profileImageUrl,
    };

    onSaveProfessional(professionalData, professionalToEdit?.id);
    onClose();
  };

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black bg-opacity-60 z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      <div 
        className={`fixed top-0 right-0 h-full w-full max-w-lg bg-white shadow-2xl z-50 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex flex-col h-full">
          <header className="flex items-center justify-between p-6 border-b">
            <h2 className="text-2xl font-bold text-gray-800">{isEditing ? 'Edit Professional' : 'Add New Professional'}</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
              <CloseIcon className="w-6 h-6" />
            </button>
          </header>

          <form onSubmit={handleSubmit} className="flex-grow p-6 overflow-y-auto space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
                placeholder="e.g., Jane Doe"
              />
            </div>

            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">Role</label>
              <select id="role" value={role} onChange={(e) => setRole(e.target.value as 'Supplier' | 'Contractor' | 'Interior Designer')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 bg-white">
                  <option>Supplier</option>
                  <option>Contractor</option>
                  <option>Interior Designer</option>
              </select>
            </div>

            <div>
              <label htmlFor="profileImageUrl" className="block text-sm font-medium text-gray-700 mb-1">Profile Image URL</label>
              <input type="text" id="profileImageUrl" value={profileImageUrl} onChange={(e) => setProfileImageUrl(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
                placeholder="https://.../image.png"
              />
            </div>

            <div>
              <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">Biography</label>
              <textarea id="bio" rows={5} value={bio} onChange={(e) => setBio(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
                placeholder="A short description of the professional..."
              />
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}
          </form>

          <footer className="p-6 border-t bg-gray-50">
            <button
              type="submit"
              onClick={handleSubmit}
              className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-4 rounded-md transition-colors"
            >
              {isEditing ? 'Save Changes' : 'Add Professional'}
            </button>
          </footer>
        </div>
      </div>
    </>
  );
};
