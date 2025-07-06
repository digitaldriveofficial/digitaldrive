import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const defaultPartners = [
  {
    name: "LinkedIn",
    alt: "LinkedIn Logo",
    logoUrl: "https://storage.googleapis.com/hostinger-assets/logos/linkedin.svg"
  },
  {
    name: "Dripify",
    alt: "Dripify Logo",
    logoUrl: "https://storage.googleapis.com/hostinger-assets/logos/dripify.svg"
  },
  {
    name: "ChatGPT",
    alt: "ChatGPT Logo",
    logoUrl: "https://storage.googleapis.com/hostinger-assets/logos/chatgpt.svg"
  },
  {
    name: "Seamless.ai",
    alt: "Seamless.ai Logo",
    logoUrl: "https://storage.googleapis.com/hostinger-assets/logos/seamless-ai.svg"
  },
  {
    name: "Calendly",
    alt: "Calendly Logo",
    logoUrl: "https://storage.googleapis.com/hostinger-assets/logos/calendly.svg"
  }
];

const defaultSmartLeadsLogoUrl = "https://storage.googleapis.com/hostinger-horizons-assets-prod/67722c01-0a4e-486e-bb90-fd82298bf8f9/abd3c822790a68c1006d3fe6134c627d.png";

const PartnersSection = ({ partners = defaultPartners, smartLeadsLogoUrl = defaultSmartLeadsLogoUrl }) => {
  const duplicatedPartners = [...partners, ...partners, ...partners, ...partners];
  const smartLeadsPartner = { name: "Smart Leads", alt: "Smart Leads Logo", logoUrl: smartLeadsLogoUrl, isSmartLeads: true };
  
  const firstSetPartners = [...partners.slice(0, Math.floor(partners.length / 2)), smartLeadsPartner, ...partners.slice(Math.floor(partners.length / 2))];
  const allLogos = [...firstSetPartners, ...firstSetPartners, ...firstSetPartners, ...firstSetPartners];

  const carouselRef = useRef(null);
  const [animationDuration, setAnimationDuration] = useState(60);

  useEffect(() => {
    if (carouselRef.current) {
      const containerWidth = carouselRef.current.offsetWidth;
      const contentWidth = carouselRef.current.scrollWidth / 4;
      const calculatedDuration = Math.max(30, contentWidth / 15);
      setAnimationDuration(calculatedDuration);
    }
  }, [partners, smartLeadsLogoUrl]);

  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-brand-charcoal mb-4">Our Technology Partners</h2>
        <p className="text-muted-foreground mb-12 max-w-xl mx-auto">
          We integrate with the best tools to deliver exceptional results for your business.
        </p>
        <div className="relative w-full overflow-hidden group">
          <motion.div
            ref={carouselRef}
            className="flex items-center"
            animate={{ x: ['0%', '-100%'] }}
            transition={{
              ease: 'linear',
              duration: animationDuration,
              repeat: Infinity,
              repeatType: 'loop',
            }}
            style={{ width: `${allLogos.length * 100 / (partners.length + 1)}%` }}
          >
            {allLogos.map((partner, index) => (
              <div 
                key={`${partner.name}-${index}`} 
                className="flex-shrink-0 w-auto px-6 md:px-10 flex justify-center items-center"
                style={{ minWidth: partner.isSmartLeads ? '180px' : '120px' }}
              >
                <img  
                  alt={partner.alt} 
                  className={`
                    ${partner.isSmartLeads ? 'h-16 md:h-24 rounded-md shadow-lg border-2 border-brand-electric-indigo' : 'h-10 md:h-12 grayscale group-hover:grayscale-0 transition-all duration-300'}
                  `}
                 src="https://images.unsplash.com/photo-1592181572975-1d0d8880d175" />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;