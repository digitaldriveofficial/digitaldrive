import React from 'react';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children,noHeader=false,noFooter=false }) => {
  return (
    <div className="min-h-screen flex flex-col">
      {!noHeader && <Header />}
      <main className="flex-1">
        {children}
      </main>
      {!noFooter && <Footer />}
    </div>
  );
};

export default Layout; 