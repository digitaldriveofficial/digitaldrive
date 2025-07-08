import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

const ContactFormSection = ({ handleSubmit, isSubmitting, handleChange, formData }) => {

  return (
    <section id="contact-form" className="py-16 bg-gradient-to-br to-gray-800 md:py-24 from-brand-charcoal">
      <div className="container px-6 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
            Ready to <span className="text-white">Drive Growth?</span>
          </h2>
          <p className="mb-10 text-lg text-gray-300">
            Fill out the form below to join our waiting list and be the first to know when we launch.
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="p-8 mx-auto max-w-xl rounded-xl border shadow-2xl backdrop-blur-md bg-white/10 md:p-10 border-white/20"
          onChange={handleChange}
        >
          <div className="grid grid-cols-1 gap-6" >
            <div>
              <Label htmlFor="name" className="block mb-1 text-sm font-medium text-gray-200">Full Name</Label>
              <Input value={formData["name"]} type="text" name="name" id="name" required className="placeholder-gray-400 text-white bg-white/10 border-white/30 focus:ring-brand-sky-blue focus:border-brand-sky-blue" placeholder="e.g. Jane Doe" />
            </div>
            <div>
              <Label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-200">Email Address</Label>
              <Input value={formData["email"]} type="email" name="email" id="email" required className="placeholder-gray-400 text-white bg-white/10 border-white/30 focus:ring-brand-sky-blue focus:border-brand-sky-blue" placeholder="you@example.com" />
            </div>
            <div>
              <Label htmlFor="company" className="block mb-1 text-sm font-medium text-gray-200">Company Name (Optional)</Label>
              <Input value={formData["company"]} type="text" name="company" id="company" className="placeholder-gray-400 text-white bg-white/10 border-white/30 focus:ring-brand-sky-blue focus:border-brand-sky-blue" placeholder="Your Company Inc." />
            </div>
            <div>
              <Label htmlFor="message" className="block mb-1 text-sm font-medium text-gray-200">Tell us about your needs (Optional)</Label>
              <Textarea value={formData["message"]} name="message" id="message" rows="4" className="placeholder-gray-400 text-white bg-white/10 border-white/30 focus:ring-brand-sky-blue focus:border-brand-sky-blue" placeholder="What are your biggest marketing challenges?"></Textarea>
            </div>
          </div>
          <div className="mt-8 text-center">
            <Button type="submit" size="lg" className="px-10 py-3 w-full text-lg text-white shadow-lg transition-shadow transform bg-brand-electric-indigo hover:bg-opacity-90 hover:shadow-xl hover:scale-105 sm:w-auto">
              Join the Waiting List
            </Button>
          </div>
        </motion.form>
      </div>
    </section>
  );
};

export default ContactFormSection;