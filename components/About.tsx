
import React from 'react';
import { TargetIcon, HeartIcon, LightbulbIcon, UsersIcon } from './Icons';

const SectionCard: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode }> = ({ title, icon, children }) => (
  <div className="bg-gray-50 p-6 rounded-lg">
    <div className="flex items-center mb-4">
      <div className="bg-teal-100 text-teal-600 p-3 rounded-full mr-4">
        {icon}
      </div>
      <h3 className="text-2xl font-bold text-gray-800">{title}</h3>
    </div>
    <p className="text-gray-600 leading-relaxed">{children}</p>
  </div>
);

export const About: React.FC = () => {
  return (
    <section id="about" className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">Welcome to Urban Zen</h2>
            <p className="mt-4 text-lg text-gray-600">
                URBAN ZEN PTE. LTD. is a Singapore-based technology company redefining the home renovation journey. We are the creators of a trusted digital ecosystem that seamlessly connects homeowners with verified design professionals, transforming the often stressful process of creating a home into a source of inspiration, community, and zen.
            </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <SectionCard title="Who We Are" icon={<UsersIcon className="w-6 h-6" />}>
            Founded in Singapore, URBAN ZEN was born from a simple yet powerful vision: to bring clarity, trust, and harmony to the home renovation industry. We understand that a home is more than just a space—it's a sanctuary. Our platform empowers homeowners to make confident decisions by providing them with a wealth of real-world inspiration, transparent peer reviews, and direct access to a curated network of top-tier renovation specialists.
          </SectionCard>
          <SectionCard title="Our Mission" icon={<TargetIcon className="w-6 h-6" />}>
            To demystify home renovation through technology, community, and education. We are dedicated to building a transparent and trusted marketplace where homeowners can plan, connect, and create their dream homes with confidence and peace of mind.
          </SectionCard>
          <SectionCard title="Our Core Solution" icon={<LightbulbIcon className="w-6 h-6" />}>
            The URBAN ZEN platform is an all-in-one digital destination addressing the entire renovation lifecycle: Discover & Be Inspired, Connect with Confidence, Plan with Clarity, and foster a vibrant Community & Trust. It's designed for Singapore's unique HDB, condo, and landed property landscape.
          </SectionCard>
          <SectionCard title="Our Brand Promise" icon={<HeartIcon className="w-6 h-6" />}>
            URBAN ZEN is more than a service; it's a partner in your renovation journey. We are committed to fostering an ecosystem built on transparency, reliability, and a shared passion for creating beautiful, functional living spaces—your personal urban zen.
          </SectionCard>
        </div>
      </div>
    </section>
  );
};
