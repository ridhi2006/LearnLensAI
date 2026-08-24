import React from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Hero } from '../components/landing/Hero';
import { ProductPreview } from '../components/landing/ProductPreview';
import { HowItWorks } from '../components/landing/HowItWorks';
import { FeatureCards } from '../components/landing/FeatureCards';
import { GraphShowcase } from '../components/landing/GraphShowcase';
import { TutorShowcase } from '../components/landing/TutorShowcase';
import { GapRoadmapShowcase } from '../components/landing/GapRoadmapShowcase';
import { CtaSection } from '../components/landing/CtaSection';

export const Landing = () => {
  return (
    <div className="min-h-screen bg-dark-900 text-text-primary flex flex-col selection:bg-brand-indigo/30 selection:text-brand-lightViolet">
      {/* Sticky Glass Navbar */}
      <Navbar />

      {/* Main Landing Flow */}
      <main className="flex-1">
        <Hero />
        <ProductPreview />
        <HowItWorks />
        <FeatureCards />
        <GraphShowcase />
        <TutorShowcase />
        <GapRoadmapShowcase />
        <CtaSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};
