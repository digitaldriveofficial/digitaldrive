import React from 'react';

const Header = () => {
  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50 w-full border-b border-primary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <a className="flex items-center space-x-2" href="/">
            <img src="/assets/logo.jpg" alt="Digital Drive Logo" className="h-8 w-8" />
            <span className="text-xl font-semibold text-primary">Digital Drive</span>
          </a>
          <div className="hidden md:flex items-center space-x-3">
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors duration-200 p-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              <span className="sr-only">LinkedIn</span>
            </a>
            <a href="https://linkedin-smartleads.com/auth?mode=login" className="text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors duration-200 px-3 py-2 text-sm rounded-md">Log In</a>
            <a href="https://linkedin-smartleads.com/auth?mode=signup" className="bg-primary hover:bg-primary/90 text-primary-foreground transition-transform duration-200 hover:scale-105 px-3 py-2 text-sm rounded-md">Sign Up</a>
          </div>
          <div className="md:hidden">
            <button className="text-muted-foreground hover:text-primary focus:outline-none">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><line x1="4" x2="20" y1="12" y2="12"></line><line x1="4" x2="20" y1="6" y2="6"></line><line x1="4" x2="20" y1="18" y2="18"></line></svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header; 