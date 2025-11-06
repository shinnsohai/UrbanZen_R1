
import React from 'react';
import { TargetIcon, HeartIcon, LightbulbIcon, UsersIcon, SparklesIcon, BuildingIcon } from './Icons';

const FeatureCard: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode }> = ({ title, icon, children }) => (
  <div className="text-center">
    <div className="flex items-center justify-center mb-4">
      <div className="bg-teal-100 text-teal-600 p-4 rounded-full">
        {icon}
      </div>
    </div>
    <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-600 leading-relaxed">{children}</p>
  </div>
);


export const About: React.FC = () => {
  return (
    <section id="about" className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-6">
        {/* Headline Section */}
        <div className="text-center max-w-4xl mx-auto mb-16 md:mb-24">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight">Transforming Spaces, Inspiring Lives.</h1>
            <p className="mt-6 text-lg md:text-xl text-gray-600">
                Your Journey to a Beautiful Home, Simplified with Trust and Community.
            </p>
        </div>

        {/* Our Story Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
            <div className="order-2 md:order-1">
                <h2 className="text-3xl font-bold text-gray-900 tracking-tight mb-4">Our Story: From Frustration to Inspiration</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                    Every great idea is born from a need. For us at URBAN ZEN, it was the shared frustration of watching friends and family navigate the daunting, opaque, and often stressful process of home renovation in Singapore. We saw talented designers struggling to find the right clients, and homeowners like you feeling overwhelmed by endless options and uncertainty.
                </p>
                <p className="text-gray-600 leading-relaxed">
                    We asked a simple question: What if creating your dream home could be a source of excitement, not anxiety? URBAN ZEN was founded to answer that question. We are a team of tech enthusiasts, design lovers, and community builders who believe that everyone deserves a beautiful, functional space they love—a personal sanctuary of Urban Zen.
                </p>
            </div>
            <div className="order-1 md:order-2">
                <img src="https://picsum.photos/seed/about-story/800/600" alt="A beautifully designed modern living room" className="rounded-lg shadow-lg aspect-video object-cover" />
            </div>
        </div>

        {/* Pull-quote Section */}
        <div className="text-center my-24">
            <blockquote className="text-2xl md:text-3xl font-medium text-gray-800 max-w-3xl mx-auto italic border-l-4 border-teal-500 pl-6">
                "What if creating your dream home could be a source of excitement, not anxiety?"
            </blockquote>
        </div>

        {/* Our Mission Section */}
        <div className="mb-24">
            <div className="text-center max-w-3xl mx-auto mb-12">
                <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Our Mission: Building Trust, One Home at a Time</h2>
                <p className="mt-4 text-gray-600">Our mission is to bring clarity and confidence to the home renovation industry. We are committed to:</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
                <FeatureCard title="Empowering Homeowners" icon={<UsersIcon className="w-8 h-8" />}>
                    With the knowledge, tools, and community support to make informed decisions.
                </FeatureCard>
                <FeatureCard title="Elevating Professionals" icon={<BuildingIcon className="w-8 h-8" />}>
                    By connecting them with clients who appreciate their craft and expertise.
                </FeatureCard>
                <FeatureCard title="Fostering Transparency" icon={<HeartIcon className="w-8 h-8" />}>
                    Through a system built on genuine reviews, shared experiences, and open communication.
                </FeatureCard>
            </div>
        </div>

        {/* The URBAN ZEN Difference Section */}
        <div className="mb-24 bg-gray-50 rounded-lg p-8 md:p-12">
            <div className="text-center max-w-3xl mx-auto mb-12">
                <h2 className="text-3xl font-bold text-gray-900 tracking-tight">The URBAN ZEN Difference</h2>
                 <p className="mt-4 text-gray-600">Why we're the right partner for you. We go beyond being just a directory. We are an ecosystem.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-10">
                <div>
                    <h3 className="text-xl font-bold mb-2">A Community of Real People, Real Stories</h3>
                    <p className="text-gray-600">Forget staged photos. Dive into a vibrant community where real homeowners share their authentic journeys—the triumphs, the challenges, and the invaluable lessons learned. This is your most honest look at what your renovation could be.</p>
                </div>
                <div>
                    <h3 className="text-xl font-bold mb-2">A Vetted Network of Professionals</h3>
                    <p className="text-gray-600">We handpick and verify our partners. Every designer, contractor, and architect on our platform is evaluated to ensure they meet our standards for quality and professionalism. Your peace of mind is our priority.</p>
                </div>
                <div>
                    <h3 className="text-xl font-bold mb-2">Singaporean at Heart</h3>
                    <p className="text-gray-600">Our content, our experts, and our community understanding are rooted in the unique context of Singaporean living—from maximizing space in a BTO to navigating the nuances of a landed property.</p>
                </div>
                 <div>
                    <h3 className="text-xl font-bold mb-2">Tools for a Seamless Journey</h3>
                    <p className="text-gray-600">From initial budget planning to final walkthrough, we provide the digital tools and guides you need to stay organized, on track, and in control from start to finish.</p>
                </div>
            </div>
        </div>
        
        {/* Our Values Section */}
        <div className="mb-24">
            <div className="text-center max-w-3xl mx-auto mb-12">
                <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Our Values: The Pillars of Everything We Do</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <FeatureCard title="Trust & Transparency" icon={<HeartIcon className="w-7 h-7" />}>
                    Honest reviews and clear information are the foundation of our platform.
                </FeatureCard>
                <FeatureCard title="Community First" icon={<UsersIcon className="w-7 h-7" />}>
                    We believe in the power of shared knowledge and mutual support.
                </FeatureCard>
                <FeatureCard title="Innovation with Purpose" icon={<LightbulbIcon className="w-7 h-7" />}>
                    We leverage technology to solve real-world problems simply and effectively.
                </FeatureCard>
                <FeatureCard title="Passion for Design" icon={<SparklesIcon className="w-7 h-7" />}>
                    We are driven by a genuine love for creating beautiful, functional living spaces.
                </FeatureCard>
            </div>
        </div>

        {/* Join Community CTA */}
        <div className="text-center bg-teal-600 text-white rounded-lg p-12 shadow-lg">
            <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
            <p className="max-w-2xl mx-auto mb-6">
                Whether you're just dreaming about your future home or are ready to pick up a hammer, your journey starts here. Explore, connect, and be inspired.
            </p>
            <h3 className="text-2xl font-semibold tracking-tight">Let's build your sanctuary, together.</h3>
        </div>
      </div>
    </section>
  );
};
