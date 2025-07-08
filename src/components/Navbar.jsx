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
    <nav className="sticky top-0 z-50 bg-white border-b-2 shadow-lg border-brand-electric-indigo/30">
      <div className="container px-4 mx-auto sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <Link to="/" className="flex flex-shrink-0 items-center group" onClick={() => setIsMobileMenuOpen(false)}>
              <img src={DIGITAL_DRIVE_LOGO_URL} alt="Digital Drive Logo" className="w-auto h-36 transition-transform duration-300 group-hover:scale-105" />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden justify-between items-center w-full md:flex">
            {/* Centered Nav Links */}
            <div className="flex flex-1 justify-center space-x-6">
              <Button variant="ghost" size="sm" onClick={scrollToBlog} className="transition-colors duration-200 text-brand-charcoal hover:bg-brand-electric-indigo/10 hover:text-brand-electric-indigo">
                Blog
              </Button>
              <Button variant="ghost" size="sm" asChild className="transition-colors duration-200 text-brand-charcoal hover:bg-brand-electric-indigo/10 hover:text-brand-electric-indigo">
                <Link to="/product">Product</Link>
              </Button>
              <Button variant="ghost" size="sm" asChild className="transition-colors duration-200 text-brand-charcoal hover:bg-brand-electric-indigo/10 hover:text-brand-electric-indigo">
                <Link to="/team">Team</Link>
              </Button>
            </div>
            {/* Right Side (auth/user, dropdown, etc.) */}
            <div className="flex items-center space-x-3">
              <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="p-2 transition-colors duration-200 text-brand-charcoal hover:text-brand-electric-indigo">
                <Linkedin className="w-5 h-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
              {isAuthenticated ? (
                <>
                  <Button variant="ghost" size="sm" asChild className="transition-colors duration-200 text-brand-charcoal hover:bg-brand-electric-indigo/10 hover:text-brand-electric-indigo">
                    <Link to="/optimizer">
                      <LayoutDashboard className="mr-2 w-4 h-4" />
                      Optimizer
                    </Link>
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="p-0 w-10 h-10 rounded-full focus-visible:ring-2 focus-visible:ring-brand-electric-indigo focus-visible:ring-offset-2">
                        <UserCircle className="w-8 h-8 transition-colors text-brand-charcoal hover:text-brand-electric-indigo" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="mt-1 mr-2 w-48 rounded-md shadow-lg border-brand-electric-indigo/30" align="end">
                      <DropdownMenuLabel className="px-3 py-2 font-normal text-brand-charcoal">My Account</DropdownMenuLabel>
                      <DropdownMenuSeparator className="bg-brand-electric-indigo/10" />
                      <DropdownMenuItem className="cursor-pointer hover:!bg-brand-electric-indigo/10 focus:!bg-brand-electric-indigo/10 text-brand-charcoal px-3 py-2">
                        <Settings className="mr-2 w-4 h-4 text-brand-sky-blue" />
                        <span>Settings</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator className="bg-brand-electric-indigo/10" />
                      <DropdownMenuItem onClick={handleLogoutClick} className="cursor-pointer text-red-600 hover:!bg-red-500/10 focus:!bg-red-500/10 focus:!text-red-700 px-3 py-2">
                        <LogOut className="mr-2 w-4 h-4" />
                        <span>Log out</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              ) : (
                <>
                  <Button variant="ghost" asChild className="transition-colors duration-200 text-brand-charcoal hover:bg-brand-electric-indigo/10 hover:text-brand-electric-indigo">
                    <Link to="https://linkedin-smartleads.com/auth?mode=login" target='_blank'>Log In</Link>
                  </Button>
                  <Button asChild className="text-white transition-transform duration-200 bg-brand-electric-indigo hover:bg-opacity-90 hover:scale-105">
                    <Link to="https://linkedin-smartleads.com/auth?mode=signup" target='_blank'>Sign Up</Link>
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex justify-center items-center p-2 rounded-md mobile-menu-button text-brand-charcoal hover:text-brand-electric-indigo hover:bg-brand-electric-indigo/10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand-electric-indigo"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? <X className="block w-6 h-6" aria-hidden="true" /> : <Menu className="block w-6 h-6" aria-hidden="true" />}
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
            className="absolute right-0 left-0 top-20 z-40 bg-white border-t shadow-xl md:hidden border-brand-electric-indigo/20"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <button onClick={scrollToBlog} className={mobileNavLinkClasses}>
                <BookOpen className="inline-block mr-3 w-5 h-5" />Blog
              </button>

              <button onClick={scrollToContactForm} className={mobileNavLinkClasses}>
                <ListPlus className="inline-block mr-3 w-5 h-5 text-brand-sky-blue" />Join Waiting List
              </button>
              <Button variant="outline" asChild className={`${mobileNavLinkClasses} border-brand-electric-indigo text-brand-electric-indigo hover:bg-brand-electric-indigo hover:text-white`}>
                <Link to="/smart-leads" onClick={() => setIsMobileMenuOpen(false)}>
                  <Rocket className="inline-block mr-3 w-5 h-5" />Smart Leads Prototype
                </Link>
              </Button>

              <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className={`flex items-center ${mobileNavLinkClasses}`}>
                <Linkedin className="inline-block mr-3 w-5 h-5" />LinkedIn
              </a>

              {isAuthenticated ? (
                <>
                  <Button variant="ghost" asChild className={mobileNavLinkClasses}>
                    <Link to="/optimizer" onClick={() => setIsMobileMenuOpen(false)}>
                      <LayoutDashboard className="inline-block mr-3 w-5 h-5" />Optimizer
                    </Link>
                  </Button>
                  <button onClick={() => { setIsMobileMenuOpen(false); navigate('/'); }} className={mobileNavLinkClasses}>
                    <Settings className="inline-block mr-3 w-5 h-5 text-brand-sky-blue" />Settings
                  </button>
                  <button onClick={handleLogoutClick} className={`${mobileNavLinkClasses} text-red-600 hover:!bg-red-500/10 focus:!bg-red-500/10 focus:!text-red-700`}>
                    <LogOut className="inline-block mr-3 w-5 h-5" />Log out
                  </button>
                </>
              ) : (
                <>
                  <Button variant="ghost" asChild className={mobileNavLinkClasses}>
                    <Link to="/auth?mode=login" onClick={() => setIsMobileMenuOpen(false)}>Log In</Link>
                  </Button>
                  <Button asChild className={`text-white ${mobileButtonClasses} bg-brand-electric-indigo hover:bg-opacity-90`}>
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