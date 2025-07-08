import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import '@/index.css';
import Router from './router';
import { Toaster } from './components/ui/toaster';
import { Helmet } from 'react-helmet';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Helmet>
      <title>Digital Drive - Dynamic Pages</title>
      <meta name="description" content="Professional admin panel and viewer for product, blog, and talent pages. Built for Digital Drive." />
    </Helmet>
    <BrowserRouter>
      <Router />
      <Toaster />
    </BrowserRouter>
  </React.StrictMode>
);

