import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const defaultPartners = [
  {
    name: "LinkedIn",
    alt: "LinkedIn Logo",
    logoUrl: "https://storage.googleapis.com/hostinger-horizons-assets-prod/67722c01-0a4e-486e-bb90-fd82298bf8f9/0da841fe66ed1bce381b05e2c70d620f.png"
  },
  {
    name: "Canva",
    alt: "Canva Logo",
    logoUrl: "https://storage.googleapis.com/hostinger-horizons-assets-prod/67722c01-0a4e-486e-bb90-fd82298bf8f9/c3339fea5ba840c8b713a9e98ffa249e.png"
  },
  {
    name: "ChatGPT",
    alt: "ChatGPT Logo",
    logoUrl: "https://storage.googleapis.com/hostinger-horizons-assets-prod/67722c01-0a4e-486e-bb90-fd82298bf8f9/160436dec54371df59de53a240afd465.png"
  },
  {
    name: "Dripify",
    alt: "Dripify Logo",
    logoUrl: "https://storage.googleapis.com/hostinger-horizons-assets-prod/67722c01-0a4e-486e-bb90-fd82298bf8f9/5b9171da295ce90dd9700f1e8df6c314.png"
  }
];

const defaultSmartLeadsLogoUrl = "https://storage.googleapis.com/hostinger-horizons-assets-prod/67722c01-0a4e-486e-bb90-fd82298bf8f9/45274117d90b9c113aa2c4a4258d5232.png";

const PartnersSection = ({ partners = defaultPartners, smartLeadsLogoUrl = defaultSmartLeadsLogoUrl }) => {
  const smartLeadsPartner = { name: "Smart Leads", alt: "Smart Leads Logo", logoUrl: smartLeadsLogoUrl, isSmartLeads: true };
  
  const middleIndex = Math.ceil(partners.length / 2);
  const firstHalf = partners.slice(0, middleIndex);
  const secondHalf = partners.slice(middleIndex);

  const arrangedPartners = [...firstHalf, smartLeadsPartner, ...secondHalf];
  const duplicatedLogos = [...arrangedPartners, ...arrangedPartners, ...arrangedPartners];

  const carouselRef = useRef(null);
  const [animationDuration, setAnimationDuration] = useState(40);

  useEffect(() => {
    if (carouselRef.current) {
      const contentWidth = carouselRef.current.scrollWidth / 3;
      const calculatedDuration = Math.max(20, contentWidth / 25);
      setAnimationDuration(calculatedDuration);
    }
  }, [partners, smartLeadsLogoUrl]);

  return (
    <section className="py-16 bg-white dark:bg-slate-900 overflow-hidden">
      <div className="container mx-auto px-6 text-center">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl font-bold text-brand-charcoal dark:text-white mb-4"
        >
          Our Technology Partners
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-muted-foreground dark:text-slate-300 mb-12 max-w-xl mx-auto"
        >
          We integrate with the best tools to deliver exceptional results for your business.
        </motion.p>
        <div className="relative w-full overflow-hidden group mask-gradient">
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
          >
            {duplicatedLogos.map((partner, index) => (
              <div 
                key={`${partner.name}-${index}`} 
                className={`flex-shrink-0 px-8 md:px-12 flex justify-center items-center h-28 transition-transform duration-300 ease-in-out`}
                style={{ minWidth: partner.isSmartLeads ? '180px' : '160px' }}
              >
                <img  
                  alt={partner.alt} 
                  src={partner.logoUrl}
                  className={`
                    object-contain
                    ${partner.isSmartLeads 
                      ? 'h-14 md:h-16 drop-shadow-lg' 
                      : 'h-10 md:h-12 transition-all duration-300'
                    }
                  `}
                />
              </div>
            ))}
          </motion.div>
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-white via-transparent to-white dark:from-slate-900 dark:via-transparent dark:to-slate-900"></div>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;