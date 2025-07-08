import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Navbar from './Navbar';
import { ThemeProvider } from './theme-provider';

const Layout = ({ children, noHeader = false, noFooter = false }) => {
  return (
    <ThemeProvider defaultTheme="light" storageKey="smartleads-ui-theme">
      <div className="flex flex-col min-h-screen">
        {!noHeader && <Navbar isAuthenticated={false} onLogout={() => { }} />}
        <main className="flex-1">
          {children}
        </main>
        {!noFooter && <Footer />}
      </div>
    </ThemeProvider>
  );
};

export default Layout; 