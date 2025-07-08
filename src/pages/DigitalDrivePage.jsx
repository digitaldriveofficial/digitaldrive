import React from 'react';
import HeroSection from '@/pages/DigitalDrivePage/components/HeroSection';
import FunnelSection from '@/pages/DigitalDrivePage/components/FunnelSection';
import ClientResultsSection from '@/pages/DigitalDrivePage/components/ClientResultsSection';
import BlogSection from '@/pages/DigitalDrivePage/components/BlogSection';
import ContactFormSection from '@/pages/DigitalDrivePage/components/ContactFormSection';
import PartnersSection from '@/pages/DigitalDrivePage/components/PartnersSection';

const DigitalDrivePage = () => {
  return (
    <div className="flex flex-col">
      <HeroSection 
        heroImageDescription="Dynamic hero image showing a professional working on a laptop with data visualizations in the background, representing digital growth and lead generation."
      />
      <PartnersSection />
      <FunnelSection 
        funnelImageDescription="A diagram illustrating the automated lead generation funnel, from identifying prospects on LinkedIn to booking meetings."
      />
      <ClientResultsSection />
      <BlogSection />
      <ContactFormSection />
    </div>
  );
};

export default DigitalDrivePage;