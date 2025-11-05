
import React from 'react';

export const Hero: React.FC = () => {
    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

  return (
    <section className="relative h-[60vh] md:h-[80vh] bg-cover bg-center text-white" style={{backgroundImage: "url('https://picsum.photos/seed/hero/1920/1080')"}}>
      <div className="absolute inset-0 bg-black bg-opacity-50" />
      <div className="relative container mx-auto px-6 h-full flex flex-col justify-center items-center text-center">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-4">Your Sanctuary, Redefined.</h1>
        <p className="text-lg md:text-xl max-w-3xl mb-8">
          A trusted digital ecosystem that seamlessly connects homeowners with verified design professionals in Singapore.
        </p>
        <button 
          onClick={() => scrollToSection('showcase')}
          className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-8 rounded-full text-lg transition-transform transform hover:scale-105"
        >
          Explore Our Projects
        </button>
      </div>
    </section>
  );
};
