import React from 'react';
import { Link } from 'react-router-dom';
import { Linkedin } from 'lucide-react';

const LINKEDIN_URL = "https://www.linkedin.com/company/digital-drive-pk/?viewAsMember=true";
const DIGITAL_DRIVE_WEBSITE_URL = "https://www.digitaldrive.pk";
const CONTACT_EMAIL = "hello@digitaldrive.pk";

const Footer = () => {
  return (
    <footer className="bg-background py-6 mt-auto border-t border-border/40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-4 md:space-x-6 mb-3">
          <a
            href={DIGITAL_DRIVE_WEBSITE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-primary hover:underline"
          >
            Digital Drive
          </a>
          <Link
            to="/privacy-policy"
            className="text-sm text-muted-foreground hover:text-primary hover:underline"
          >
            Privacy Policy
          </Link>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-sm text-muted-foreground hover:text-primary hover:underline"
          >
            {CONTACT_EMAIL}
          </a>
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors duration-200"
            aria-label="Digital Drive LinkedIn"
          >
            <Linkedin className="w-5 h-5" />
          </a>
        </div>
        <p className="text-xs text-muted-foreground/80">
          © {new Date().getFullYear()} Digital Drive. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;