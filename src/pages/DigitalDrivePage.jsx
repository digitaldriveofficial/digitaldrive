import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import HeroSection from '@/pages/DigitalDrivePage/components/HeroSection';
import FunnelSection from '@/pages/DigitalDrivePage/components/FunnelSection';
import ClientResultsSection from '@/pages/DigitalDrivePage/components/ClientResultsSection';
import PartnersSection from '@/pages/DigitalDrivePage/components/PartnersSection';
import ContactFormSection from '@/pages/DigitalDrivePage/components/ContactFormSection';
import BlogSection from '@/pages/DigitalDrivePage/components/BlogSection';
import { supabase } from '@/lib/supabaseClient';
import { useToast } from "@/components/ui/use-toast";
import ScrollToTop from '../components/ScrollToTop';

const DigitalDrivePage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();
  const contactFormRef = useRef(null);

  useEffect(() => {
    if (location.hash === '#contact-form-section' && contactFormRef.current) {
      contactFormRef.current.scrollIntoView({ behavior: 'smooth' });
      // Clean the hash from URL without reloading
      navigate(location.pathname, { replace: true });
    }
  }, [location, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.functions.invoke('send-contact-email', {
        body: {
          ...formData,
          formType: 'Waiting List Signup', // Identify the form source
          toEmail: 'digitaldriveofficial@gmail.com', // Primary recipient
          ccEmail: 'digitaldriveofficial@gmail.com' // CC recipient
        },
      });

      if (error) {
        throw error;
      }

      toast({
        title: "Message Sent! 🎉",
        description: "Thanks for reaching out! We'll be in touch soon.",
        variant: "default",
      });

      setFormData({ name: '', email: '', company: '', message: '' }); // Reset form
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Uh oh! Something went wrong.",
        description: error.message || "There was an issue sending your message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }

  };

  return (
    <div className="flex flex-col">
      <ScrollToTop />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-b from-background via-background to-slate-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 text-foreground"
      >
        <HeroSection
          heroImageDescription="Dynamic hero image showing a professional working on a laptop with data visualizations in the background, representing digital growth and lead generation."
        />
        <PartnersSection />
        <FunnelSection
          funnelImageDescription="A diagram illustrating the automated lead generation funnel, from identifying prospects on LinkedIn to booking meetings."
        />
        <ClientResultsSection />

        <div ref={contactFormRef} id="contact-form-section">
          <ContactFormSection
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        </div>
        <BlogSection />
      </motion.div>
    </div>
  );
};

export default DigitalDrivePage;