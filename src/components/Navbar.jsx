import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LogOut, UserCircle, Settings, LayoutDashboard, Zap, BookOpen, Menu, X, Linkedin, ChevronDown, ListPlus, Rocket } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion, AnimatePresence } from 'framer-motion';

const DIGITAL_DRIVE_LOGO_URL = "https://storage.googleapis.com/hostinger-horizons-assets-prod/67722c01-0a4e-486e-bb90-fd82298bf8f9/0565f10241a5210af44535fa248e7a14.png";
const LINKEDIN_URL = "https://www.linkedin.com/company/digital-drive-pk/?viewAsMember=true";

const Navbar = ({ isAuthenticated, onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef(null);

  const handleLogoutClick = () => {
    onLogout();
    setIsMobileMenuOpen(false);
    navigate('/');
  };

  const scrollToSection = (sectionId) => {
    setIsMobileMenuOpen(false);
    if (location.pathname === '/') {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(`/#${sectionId}`);
    }
  };
  
  const scrollToBlog = (e) => {
    e.preventDefault();
    scrollToSection('blog-section');
  };

  const scrollToContactForm = (e) => {
    e.preventDefault();
    scrollToSection('contact-form-section');
  };


  const handleLinkClick = (path) => {
    setIsMobileMenuOpen(false);
    navigate(path);
  };
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        if (event.target.closest && event.target.closest('.mobile-menu-button')) {
          return;
        }
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  const mobileNavLinkClasses = "block w-full text-left py-3 px-4 text-lg text-brand-charcoal rounded hover:bg-brand-electric-indigo/10 hover:text-brand-electric-indigo transition-colors duration-200";
  const mobileButtonClasses = "w-full mt-3 py-3 px-4 text-lg";

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50 border-b-2 border-brand-electric-indigo/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center space-x-2 sm:space-x-3 group" onClick={() => setIsMobileMenuOpen(false)}>
              <img src={DIGITAL_DRIVE_LOGO_URL} alt="Digital Drive Logo" className="h-10 sm:h-12 w-auto transition-transform duration-300 group-hover:scale-105" />
              <span className="font-bold text-2xl sm:text-3xl text-brand-charcoal group-hover:text-brand-electric-indigo transition-colors duration-300">Digital Drive</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-3">
            <Button variant="ghost" size="sm" onClick={scrollToBlog} className="text-brand-charcoal hover:bg-brand-electric-indigo/10 hover:text-brand-electric-indigo transition-colors duration-200">
              <BookOpen className="w-4 h-4 mr-2" />
              Blog
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="border-brand-electric-indigo text-brand-electric-indigo hover:bg-brand-electric-indigo hover:text-white transition-colors duration-200">
                  <Zap className="w-4 h-4 mr-2" />
                  Smart Leads
                  <ChevronDown className="w-4 h-4 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 mr-2 mt-1 border-brand-electric-indigo/30 shadow-lg rounded-md bg-white">
                <DropdownMenuItem 
                  onClick={scrollToContactForm} 
                  className="cursor-pointer hover:!bg-brand-electric-indigo/10 focus:!bg-brand-electric-indigo/10 text-brand-charcoal px-3 py-2 flex items-center"
                >
                  <ListPlus className="mr-2 h-4 w-4 text-brand-sky-blue" />
                  <span>Join Waiting List</span>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  asChild 
                  className="cursor-pointer hover:!bg-brand-electric-indigo/10 focus:!bg-brand-electric-indigo/10 text-brand-charcoal px-3 py-2 flex items-center"
                >
                  <Link to="/smart-leads">
                    <Rocket className="mr-2 h-4 w-4 text-brand-sky-blue" />
                    <span>Smart Leads Prototype</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="text-brand-charcoal hover:text-brand-electric-indigo transition-colors duration-200 p-2">
              <Linkedin className="w-5 h-5" />
              <span className="sr-only">LinkedIn</span>
            </a>
            {isAuthenticated ? (
              <>
                <Button variant="ghost" size="sm" asChild className="text-brand-charcoal hover:bg-brand-electric-indigo/10 hover:text-brand-electric-indigo transition-colors duration-200">
                  <Link to="/optimizer">
                    <LayoutDashboard className="w-4 h-4 mr-2" />
                    Optimizer
                  </Link>
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="rounded-full p-0 h-10 w-10 focus-visible:ring-2 focus-visible:ring-brand-electric-indigo focus-visible:ring-offset-2">
                       <UserCircle className="h-8 w-8 text-brand-charcoal hover:text-brand-electric-indigo transition-colors" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-48 mr-2 mt-1 border-brand-electric-indigo/30 shadow-lg rounded-md" align="end">
                    <DropdownMenuLabel className="font-normal text-brand-charcoal px-3 py-2">My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-brand-electric-indigo/10"/>
                    <DropdownMenuItem className="cursor-pointer hover:!bg-brand-electric-indigo/10 focus:!bg-brand-electric-indigo/10 text-brand-charcoal px-3 py-2">
                      <Settings className="mr-2 h-4 w-4 text-brand-sky-blue" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-brand-electric-indigo/10"/>
                    <DropdownMenuItem onClick={handleLogoutClick} className="cursor-pointer text-red-600 hover:!bg-red-500/10 focus:!bg-red-500/10 focus:!text-red-700 px-3 py-2">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Button variant="ghost" asChild className="text-brand-charcoal hover:bg-brand-electric-indigo/10 hover:text-brand-electric-indigo transition-colors duration-200">
                  <Link to="/auth?mode=login">Log In</Link>
                </Button>
                <Button asChild className="bg-brand-electric-indigo hover:bg-opacity-90 text-white transition-transform duration-200 hover:scale-105">
                  <Link to="/auth?mode=signup">Sign Up</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="mobile-menu-button inline-flex items-center justify-center p-2 rounded-md text-brand-charcoal hover:text-brand-electric-indigo hover:bg-brand-electric-indigo/10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand-electric-indigo"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? <X className="block h-6 w-6" aria-hidden="true" /> : <Menu className="block h-6 w-6" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            ref={mobileMenuRef}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute top-20 left-0 right-0 bg-white shadow-xl z-40 border-t border-brand-electric-indigo/20"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <button onClick={scrollToBlog} className={mobileNavLinkClasses}>
                <BookOpen className="w-5 h-5 mr-3 inline-block" />Blog
              </button>
              
              <button onClick={scrollToContactForm} className={mobileNavLinkClasses}>
                <ListPlus className="w-5 h-5 mr-3 inline-block text-brand-sky-blue" />Join Waiting List
              </button>
              <Button variant="outline" asChild className={`${mobileNavLinkClasses} border-brand-electric-indigo text-brand-electric-indigo hover:bg-brand-electric-indigo hover:text-white`}>
                <Link to="/smart-leads" onClick={() => setIsMobileMenuOpen(false)}>
                  <Rocket className="w-5 h-5 mr-3 inline-block" />Smart Leads Prototype
                </Link>
              </Button>

              <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className={`${mobileNavLinkClasses} flex items-center`}>
                <Linkedin className="w-5 h-5 mr-3 inline-block" />LinkedIn
              </a>

              {isAuthenticated ? (
                <>
                  <Button variant="ghost" asChild className={mobileNavLinkClasses}>
                    <Link to="/optimizer" onClick={() => setIsMobileMenuOpen(false)}>
                      <LayoutDashboard className="w-5 h-5 mr-3 inline-block" />Optimizer
                    </Link>
                  </Button>
                  <button onClick={() => { setIsMobileMenuOpen(false); navigate('/'); }} className={mobileNavLinkClasses}>
                    <Settings className="w-5 h-5 mr-3 inline-block text-brand-sky-blue" />Settings
                  </button>
                  <button onClick={handleLogoutClick} className={`${mobileNavLinkClasses} text-red-600 hover:!bg-red-500/10 focus:!bg-red-500/10 focus:!text-red-700`}>
                    <LogOut className="w-5 h-5 mr-3 inline-block" />Log out
                  </button>
                </>
              ) : (
                <>
                  <Button variant="ghost" asChild className={mobileNavLinkClasses}>
                    <Link to="/auth?mode=login" onClick={() => setIsMobileMenuOpen(false)}>Log In</Link>
                  </Button>
                  <Button asChild className={`${mobileButtonClasses} bg-brand-electric-indigo hover:bg-opacity-90 text-white`}>
                    <Link to="/auth?mode=signup" onClick={() => setIsMobileMenuOpen(false)}>Sign Up</Link>
                  </Button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;