import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UploadCloud, Image as ImageIcon, CheckCircle, ArrowRight, Linkedin, AlertTriangle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const SMART_LEADS_LOGO_URL = "https://storage.googleapis.com/hostinger-horizons-assets-prod/67722c01-0a4e-486e-bb90-fd82298bf8f9/437e81196cfaefe31dd82a1b12e8bb90.png";

const steps = [
  { id: 1, title: 'Upload LinkedIn Profile PDF', icon: <Linkedin className="w-6 h-6 text-brand-electric-indigo" /> },
  { id: 2, title: 'Optimize Profile Picture', icon: <ImageIcon className="w-6 h-6 text-brand-electric-indigo" /> },
  { id: 3, title: 'Craft Cover Image', icon: <ImageIcon className="w-6 h-6 text-brand-electric-indigo" /> },
  { id: 4, title: 'Refine Profile Content', icon: <Linkedin className="w-6 h-6 text-brand-electric-indigo" /> },
  { id: 5, title: 'Generate Feature Articles', icon: <Linkedin className="w-6 h-6 text-brand-electric-indigo" /> },
  { id: 6, title: 'Identify Target Audience', icon: <Linkedin className="w-6 h-6 text-brand-electric-indigo" /> },
  { id: 7, title: 'Launch Outreach Sequence', icon: <Linkedin className="w-6 h-6 text-brand-electric-indigo" /> },
  { id: 8, title: 'Create Content Calendar', icon: <Linkedin className="w-6 h-6 text-brand-electric-indigo" /> },
];

const ProfileOptimizerPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [profilePdf, setProfilePdf] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [profileImagePreview, setProfileImagePreview] = useState(null);
  const [processedImages, setProcessedImages] = useState([]);
  const [selectedProcessedImage, setSelectedProcessedImage] = useState(null);
  const { toast } = useToast();
  const [trialDaysLeft, setTrialDaysLeft] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('smartLeadsUser'));
    if (user && user.trialEnds) {
      const days = Math.ceil((user.trialEnds - Date.now()) / (1000 * 60 * 60 * 24));
      setTrialDaysLeft(days > 0 ? days : 0);
    }
  }, []);


  const handlePdfUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      setProfilePdf(file);
      toast({
        title: "Success!",
        description: `${file.name} uploaded. We'll analyze it soon.`,
        className: "bg-green-500 text-white",
      });
    } else {
      toast({
        title: "Error!",
        description: "Please upload a valid PDF file.",
        variant: "destructive",
      });
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      toast({
        title: "Image Uploaded!",
        description: "Simulating background removal...",
        className: "bg-brand-sky-blue text-brand-charcoal",
      });
      // Simulate remove.bg processing
      setTimeout(() => {
        setProcessedImages([
          { id: 'option1', src: 'https://source.unsplash.com/random/150x150/?portrait,professional,smile' },
          { id: 'option2', src: 'https://source.unsplash.com/random/150x150/?person,office,headshot' },
          { id: 'option3', src: 'https://source.unsplash.com/random/150x150/?user,linkedin,ceo' },
        ]);
        toast({
          title: "Processing Complete!",
          description: "Select your preferred profile picture.",
          className: "bg-green-500 text-white",
        });
      }, 2000);
    } else {
      toast({
        title: "Error!",
        description: "Please upload a valid image file.",
        variant: "destructive",
      });
    }
  };

  const handleNextStep = () => {
    if (currentStep === 1 && !profilePdf) {
      toast({ title: "Hold on!", description: "Please upload your LinkedIn profile PDF first.", variant: "destructive" });
      return;
    }
    if (currentStep === 2 && !selectedProcessedImage) {
      toast({ title: "Hold on!", description: "Please select a processed profile picture.", variant: "destructive" });
      return;
    }
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      toast({ title: "Congratulations!", description: "You've completed all optimization steps with Smart Leads!", className: "bg-green-500 text-white" });
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-6 text-center">
            <h1 className="text-3xl font-bold text-brand-charcoal mb-2">Welcome to Smart Leads Optimizer</h1>
            <p className="text-muted-foreground mb-6">Let's start by analyzing your LinkedIn profile. Please upload it as a PDF.</p>
            <div className="grid w-full max-w-sm items-center gap-1.5 mx-auto">
              <Label htmlFor="pdf-upload" className="text-lg font-semibold text-brand-charcoal">Upload PDF</Label>
              <Input id="pdf-upload" type="file" accept=".pdf" onChange={handlePdfUpload} className="file:text-brand-electric-indigo file:font-semibold hover:file:bg-brand-electric-indigo/10 border-brand-electric-indigo/50 focus:border-brand-electric-indigo" />
            </div>
            {profilePdf && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 text-center text-green-600 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 mr-2" />
                <span>{profilePdf.name} uploaded successfully!</span>
              </motion.div>
            )}
            <p className="text-xs text-center text-muted-foreground mt-4">
              We'll analyze your PDF to suggest improvements for lead generation. This is a simulation.
            </p>
          </motion.div>
        );
      case 2:
        return (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-6 text-center">
            <h2 className="text-2xl font-semibold text-brand-charcoal">Step 2: Optimize Profile Picture</h2>
            <p className="text-muted-foreground">A professional photo makes a huge difference. Upload your current picture.</p>
            <div className="grid w-full max-w-sm items-center gap-1.5 mx-auto">
              <Label htmlFor="image-upload" className="text-lg font-semibold text-brand-charcoal">Upload Your Photo</Label>
              <Input id="image-upload" type="file" accept="image/*" onChange={handleImageUpload} className="file:text-brand-electric-indigo file:font-semibold hover:file:bg-brand-electric-indigo/10 border-brand-electric-indigo/50 focus:border-brand-electric-indigo" />
            </div>
            {profileImagePreview && (
              <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="mt-4 text-center">
                <p className="font-semibold mb-2 text-brand-charcoal">Your Uploaded Image:</p>
                <img src={profileImagePreview} alt="Profile preview" className="w-32 h-32 rounded-full object-cover mx-auto shadow-lg border-2 border-brand-electric-indigo" />
              </motion.div>
            )}
            {processedImages.length > 0 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6">
                <p className="font-semibold text-center mb-3 text-brand-charcoal">Select Your New Profile Picture (Simulated Remove.bg):</p>
                <div className="flex flex-wrap justify-center gap-4">
                  {processedImages.map((img) => (
                    <motion.div
                      key={img.id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedProcessedImage(img.src)}
                      className={`cursor-pointer p-1 border-4 rounded-full ${selectedProcessedImage === img.src ? 'border-brand-sky-blue ring-2 ring-brand-sky-blue' : 'border-transparent hover:border-brand-electric-indigo/50'}`}
                    >
                      <img src={img.src} alt={`Processed option ${img.id}`} className="w-24 h-24 rounded-full object-cover shadow-md" />
                    </motion.div>
                  ))}
                </div>
                <p className="text-xs text-center text-muted-foreground mt-4">
                  These are placeholder images. In a real app, these would be generated by remove.bg.
                </p>
              </motion.div>
            )}
          </motion.div>
        );
      default:
        return (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-6 text-center">
            <h2 className="text-2xl font-semibold text-brand-charcoal">Step {currentStep}: {steps[currentStep - 1]?.title || "Coming Soon"}</h2>
            <div className="flex justify-center items-center text-brand-electric-indigo my-8">
              {steps[currentStep - 1]?.icon || <Linkedin className="w-16 h-16" />}
            </div>
            <p className="text-muted-foreground">This step is under construction.</p>
            <p className="text-xs text-muted-foreground">
              Full implementation of {steps[currentStep - 1]?.title} would involve integrations with services like Canva, ChatGPT, Seamless.ai, or Dripify.
            </p>
          </motion.div>
        );
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      {trialDaysLeft !== null && trialDaysLeft > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-3 bg-brand-sky-blue/20 text-brand-electric-indigo border border-brand-sky-blue rounded-lg text-center font-semibold shadow-md"
        >
          You have {trialDaysLeft} {trialDaysLeft === 1 ? 'day' : 'days'} left on your free trial!
        </motion.div>
      )}
      {trialDaysLeft === 0 && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 bg-red-100 text-red-700 border border-red-300 rounded-lg text-center font-semibold shadow-md flex items-center justify-center"
        >
          <AlertTriangle className="w-5 h-5 mr-2" /> Your free trial has ended. Please subscribe to continue.
        </motion.div>
      )}
      <Card className="w-full max-w-2xl mx-auto shadow-2xl overflow-hidden border-brand-electric-indigo/30 bg-white">
        <CardHeader className="bg-gradient-to-r from-brand-electric-indigo to-purple-500 p-6">
          <div className="flex items-center space-x-3">
            <img src={SMART_LEADS_LOGO_URL} alt="Smart Leads Logo" className="w-10 h-10 rounded" />
            <CardTitle className="!text-white !text-3xl drop-shadow-md">Smart Leads Profile Optimizer</CardTitle>
          </div>
          <CardDescription className="text-purple-200">
            Elevate your LinkedIn presence for maximum lead generation. Step: {currentStep} of {steps.length}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 sm:p-8 min-h-[350px] flex flex-col justify-center bg-white">
          <AnimatePresence mode="wait">
            {renderStepContent()}
          </AnimatePresence>
        </CardContent>
        <CardFooter className="flex justify-end p-6 bg-brand-steel-gray/50 border-t border-brand-electric-indigo/20">
          <Button
            onClick={handleNextStep}
            size="lg"
            className="bg-brand-electric-indigo hover:bg-opacity-90 text-white font-bold shadow-lg transform hover:scale-105 transition-transform duration-150"
            disabled={trialDaysLeft === 0}
          >
            {currentStep === steps.length ? 'Finish Optimization' : 'Next Step'}
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProfileOptimizerPage;