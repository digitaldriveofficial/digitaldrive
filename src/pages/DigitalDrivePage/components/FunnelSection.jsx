import React from 'react';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

const NEW_FUNNEL_IMAGE_URL = "https://storage.googleapis.com/hostinger-horizons-assets-prod/67722c01-0a4e-486e-bb90-fd82298bf8f9/9c219a65290df19ce73d0601b4a1ef5f.png";

const FunnelSection = ({ funnelImageDescription }) => {
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, delay: 0.2 } }
  };

  return (
    <motion.section
      className="py-16 sm:py-24 bg-gradient-to-br from-brand-steel-gray/30 via-white to-brand-light-blue/20"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          variants={itemVariants}
        >
          <Zap className="mx-auto h-12 w-12 text-brand-electric-indigo mb-4" />
          <h2 className="text-4xl sm:text-5xl font-extrabold text-brand-charcoal mb-4">
            How It <span className="text-brand-electric-indigo">Works</span>
          </h2>
          <p className="text-lg text-brand-charcoal/80 max-w-3xl mx-auto">
            Our automated system streamlines your lead generation process, particularly for platforms like LinkedIn, delivering consistent results and allowing you to focus on closing deals. The funnel below illustrates key stages of our approach.
          </p>
        </motion.div>

        <motion.div
          className="max-w-5xl mx-auto bg-white p-4 sm:p-8 rounded-xl shadow-2xl overflow-hidden"
          variants={itemVariants}
          style={{
            background: 'linear-gradient(145deg, rgba(255,255,255,0.95) 0%, rgba(245,248,255,0.95) 100%)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(190, 200, 220, 0.4)'
          }}
        >
          <img
            src={NEW_FUNNEL_IMAGE_URL}
            alt={funnelImageDescription || "Digital Drive Lead Generation Funnel Diagram for LinkedIn"}
            className="w-full h-auto object-contain rounded-lg"
          />
        </motion.div>
      </div>
    </motion.section>
  );
};

export default FunnelSection;