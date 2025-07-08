import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { PlayCircle, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";


const HERO_BACKGROUND_IMAGE_URL = "https://storage.googleapis.com/hostinger-horizons-assets-prod/67722c01-0a4e-486e-bb90-fd82298bf8f9/8451a6c118de5e1838dea6aefe1cf05b.png";
const DEMO_VIDEO_URL = "https://www.youtube.com/embed/UrXeqVYV16U";

const HeroSection = () => {
  const [showVideoModal, setShowVideoModal] = useState(false);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="py-28 md:py-40 text-center bg-cover bg-center relative flex flex-col items-center justify-center min-h-[75vh] md:min-h-[90vh] overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-center bg-cover opacity-10"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80')",
          zIndex: 0
        }}
      >
        <img alt="Faint starfield or galaxy texture" className="hidden" src="https://images.unsplash.com/photo-1573650703601-b8f6f92eedea" />
      </div>
      <div
        className="absolute inset-0 bg-center bg-cover"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.8)), url('${HERO_BACKGROUND_IMAGE_URL}')`,
          zIndex: 1
        }}
      />
      <motion.div
        className="overflow-hidden absolute inset-0 z-0"
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 20,
          ease: "linear",
          repeat: Infinity,
        }}
        style={{
          backgroundImage: 'radial-gradient(ellipse at center, rgba(102, 16, 242, 0.15) 0%, rgba(102, 16, 242, 0) 60%)',
          backgroundSize: '300% 300%',
        }}
      />
      <div className="container flex relative z-10 flex-col justify-center items-center px-6 mx-auto">

        <motion.div
          className="flex relative justify-center items-center mb-10 md:mb-12"
          initial={{ opacity: 0, y: -30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <h1 className="text-4xl font-extrabold leading-tight text-white drop-shadow-xl sm:text-5xl md:text-6xl lg:text-7xl">
            Marketing That <br className="sm:hidden" />
            <span
              className="block mt-1 text-fuchsia-400 sm:inline sm:mt-0"
              style={{ textShadow: '0 0 8px rgba(221, 75, 221, 0.7), 0 0 12px rgba(221, 75, 221, 0.5)' }}
            >
              Drives Itself
            </span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
          className="mx-auto mb-8 max-w-2xl text-lg text-gray-100 drop-shadow-md md:text-xl"
        >
          We employ cutting-edge AI and automation to supercharge your lead generation and grow your business. Find out how Smart Leads can revolutionize your outreach.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8, ease: "easeOut" }}
          className="flex flex-col gap-4 justify-center items-center sm:flex-row"
        >
          <Button size="lg" asChild className="px-10 py-3 text-lg text-white shadow-lg transition-shadow transform bg-brand-electric-indigo hover:bg-opacity-90 hover:shadow-xl hover:scale-105">
            <Link to="https://linkedin-smartleads.com/smart-leads" target='_blank'>Explore Smart Leads</Link>
          </Button>
          <Dialog open={showVideoModal} onOpenChange={setShowVideoModal}>
            <DialogTrigger asChild>
              <Button
                size="lg"
                className="px-8 py-3 text-lg text-white shadow-lg transition-shadow transform bg-brand-electric-indigo hover:bg-opacity-90 hover:shadow-xl hover:scale-105"
                onClick={() => setShowVideoModal(true)}
              >
                <PlayCircle className="mr-2 w-5 h-5" />
                Watch Demo
              </Button>
            </DialogTrigger>
            <DialogContent className="p-0 max-w-3xl bg-black border-purple-500 shadow-2xl">
              <DialogHeader className="flex flex-row justify-between items-center p-4 text-white bg-gray-900">
                <DialogTitle className="text-xl">Smart Leads Demo</DialogTitle>
                <Button variant="ghost" size="icon" onClick={() => setShowVideoModal(false)} className="text-white hover:bg-gray-700">
                  <X className="w-6 h-6" />
                </Button>
              </DialogHeader>
              <div className="aspect-video">
                <iframe
                  width="100%"
                  height="100%"
                  src={DEMO_VIDEO_URL}
                  title="YouTube video player - Smart Leads Demo"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
            </DialogContent>
          </Dialog>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default HeroSection;