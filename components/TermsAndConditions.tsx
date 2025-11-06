import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { PageContent } from '../types';

interface TermsAndConditionsProps {
  content: PageContent;
  onBackToHome: () => void;
  companyName: string;
  logoUrl: string;
  contactUrl: string;
  onNavigateToAdmin: () => void;
  onNavigateToPrivacy: () => void;
  onNavigateToTerms: () => void;
}

export const TermsAndConditions: React.FC<TermsAndConditionsProps> = ({ 
  content, onBackToHome, companyName, logoUrl, contactUrl, 
  onNavigateToAdmin, onNavigateToPrivacy, onNavigateToTerms 
}) => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header companyName={companyName} logoUrl={logoUrl} contactUrl={contactUrl} />
      <main className="flex-grow container mx-auto px-6 py-12 md:py-20">
        <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <button onClick={onBackToHome} className="text-teal-600 hover:text-teal-800 font-medium">
                &larr; Back to Home
              </button>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-6">{content.title}</h1>
            <p className="text-sm text-gray-500 mb-8">Last Updated: {content.lastUpdated}</p>
            
            <div className="max-w-none space-y-8">
              {content.content.map((section) => (
                <section key={section.title}>
                  <h2 className="text-2xl font-bold text-gray-800 mb-3">{section.title}</h2>
                  <div className="space-y-4 text-gray-700 leading-relaxed">
                    {section.body.split('\n').map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>
                </section>
              ))}
            </div>
        </div>
      </main>
      <Footer 
        companyName={companyName} 
        contactUrl={contactUrl} 
        onNavigateToAdmin={onNavigateToAdmin} 
        onNavigateToPrivacy={onNavigateToPrivacy} 
        onNavigateToTerms={onNavigateToTerms} 
      />
    </div>
  );
};
