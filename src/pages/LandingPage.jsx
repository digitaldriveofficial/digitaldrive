import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { CheckCircle, Zap, Users, BarChart, ArrowRight } from 'lucide-react';

const SMART_LEADS_LOGO_URL = "https://storage.googleapis.com/hostinger-horizons-assets-prod/67722c01-0a4e-486e-bb90-fd82298bf8f9/abd3c822790a68c1006d3fe6134c627d.png";

const LandingPage = () => {
  const features = [
    { icon: <Zap className="w-8 h-8 text-brand-sky-blue" />, title: "AI-Powered Optimization", description: "Utilize AI to craft the perfect LinkedIn profile that attracts leads." },
    { icon: <Users className="w-8 h-8 text-brand-sky-blue" />, title: "Target Audience Identification", description: "Pinpoint your ideal customers with advanced analytics for effective LinkedIn campaigns." },
    { icon: <BarChart className="w-8 h-8 text-brand-sky-blue" />, title: "Automated Outreach", description: "Engage prospects on LinkedIn effortlessly with automated sequences." },
    { icon: <CheckCircle className="w-8 h-8 text-brand-sky-blue" />, title: "Content Strategy", description: "Get a 15-day content calendar to boost brand awareness on LinkedIn and beyond." },
  ];

  return (
    <div className="flex flex-col items-center justify-center bg-gradient-to-br from-brand-steel-gray via-white to-brand-steel-gray p-6 text-brand-charcoal pt-10 pb-20">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="text-center mb-12"
      >
        <img src={SMART_LEADS_LOGO_URL} alt="Smart Leads Logo" className="w-24 h-24 md:w-32 md:h-32 mx-auto mb-6 rounded-lg shadow-xl border-2 border-brand-electric-indigo/30" />
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4">
          Welcome to <span className="text-brand-electric-indigo">Smart Leads</span>
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
          Transform your LinkedIn profile into a powerful lead generation machine.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-white p-6 md:p-10 rounded-xl shadow-2xl w-full max-w-md mb-10 border border-brand-electric-indigo/20"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-3 text-brand-charcoal">Get Started Today!</h2>
        <p className="text-center text-muted-foreground mb-8">
          Sign up for a <span className="font-semibold text-brand-electric-indigo">FREE 1-week trial</span> and experience the difference. No credit card required.
        </p>
        <div className="space-y-4">
          <Button asChild size="lg" className="w-full bg-brand-electric-indigo hover:bg-opacity-90 text-white font-semibold py-3 text-lg group">
            <Link to="/auth?mode=signup">
              Sign Up for Free Trial
              <ArrowRight className="w-5 h-5 ml-2 transform transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="w-full text-brand-electric-indigo border-brand-electric-indigo hover:bg-brand-electric-indigo/10 hover:text-brand-electric-indigo font-semibold py-3 text-base sm:text-lg group">
            <Link to="/auth?mode=login" className="flex items-center justify-center">
              <span className="truncate">Already have an account? Log In</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-1 sm:ml-2 flex-shrink-0 transform transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </motion.div>

      <div className="w-full max-w-4xl mx-auto mt-10">
        <h3 className="text-3xl font-bold text-center mb-8 text-brand-charcoal">Why Choose Smart Leads?</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              className="bg-white p-6 rounded-lg shadow-lg border border-brand-electric-indigo/10 flex items-start space-x-4"
            >
              <div className="flex-shrink-0 p-3 bg-brand-electric-indigo/10 rounded-full">
                {feature.icon}
              </div>
              <div>
                <h4 className="text-xl font-semibold mb-1 text-brand-charcoal">{feature.title}</h4>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;