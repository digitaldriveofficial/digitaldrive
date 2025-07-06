import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-background py-6 mt-auto border-t border-border/40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-6 mb-3">
          <a
            href="https://www.digitaldrive.pk"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-primary hover:underline"
          >
            Digital Drive
          </a>
          <a
            href="mailto:hello@digitaldrive.pk"
            className="text-sm text-muted-foreground hover:text-primary hover:underline"
          >
            hello@digitaldrive.pk
          </a>
          <a
            href="https://www.linkedin.com/company/digital-drive-pk/?viewAsMember=true"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors duration-200"
            aria-label="Digital Drive LinkedIn"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>
          </a>
        </div>
        <p className="text-xs text-muted-foreground/80">© 2025 Digital Drive. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer; 