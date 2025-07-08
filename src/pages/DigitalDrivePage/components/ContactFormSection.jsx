import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

const ContactFormSection = ({ onSubmit }) => {
  return (
    <section id="contact-form" className="py-16 md:py-24 bg-gradient-to-br from-brand-charcoal to-gray-800">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to <span className="text-white">Drive Growth?</span>
          </h2>
          <p className="text-gray-300 mb-10 text-lg">
            Fill out the form below to join our waiting list and be the first to know when we launch.
          </p>
        </motion.div>

        <motion.form 
          onSubmit={onSubmit}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-xl mx-auto bg-white/10 backdrop-blur-md p-8 md:p-10 rounded-xl shadow-2xl border border-white/20"
        >
          <div className="grid grid-cols-1 gap-6">
            <div>
              <Label htmlFor="name" className="block text-sm font-medium text-gray-200 mb-1">Full Name</Label>
              <Input type="text" name="name" id="name" required className="bg-white/10 border-white/30 text-white placeholder-gray-400 focus:ring-brand-sky-blue focus:border-brand-sky-blue" placeholder="e.g. Jane Doe" />
            </div>
            <div>
              <Label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-1">Email Address</Label>
              <Input type="email" name="email" id="email" required className="bg-white/10 border-white/30 text-white placeholder-gray-400 focus:ring-brand-sky-blue focus:border-brand-sky-blue" placeholder="you@example.com" />
            </div>
            <div>
              <Label htmlFor="company" className="block text-sm font-medium text-gray-200 mb-1">Company Name (Optional)</Label>
              <Input type="text" name="company" id="company" className="bg-white/10 border-white/30 text-white placeholder-gray-400 focus:ring-brand-sky-blue focus:border-brand-sky-blue" placeholder="Your Company Inc." />
            </div>
            <div>
              <Label htmlFor="message" className="block text-sm font-medium text-gray-200 mb-1">Tell us about your needs (Optional)</Label>
              <Textarea name="message" id="message" rows="4" className="bg-white/10 border-white/30 text-white placeholder-gray-400 focus:ring-brand-sky-blue focus:border-brand-sky-blue" placeholder="What are your biggest marketing challenges?"></Textarea>
            </div>
          </div>
          <div className="mt-8 text-center">
            <Button type="submit" size="lg" className="bg-brand-electric-indigo hover:bg-opacity-90 text-white px-10 py-3 text-lg shadow-lg hover:shadow-xl transition-shadow transform hover:scale-105 w-full sm:w-auto">
              Join the Waiting List
            </Button>
          </div>
        </motion.form>
      </div>
    </section>
  );
};

export default ContactFormSection;