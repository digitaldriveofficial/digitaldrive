import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from './components/ui/toaster';
import ProfileOptimizerPage from './pages/ProfileOptimizerPage.jsx';
import LandingPage from './pages/LandingPage.jsx';
import AuthPage from './pages/AuthPage.jsx';
import DigitalDrivePage from './pages/DigitalDrivePage.jsx';
import BlogListPage from './pages/BlogListPage.jsx';
import BlogPostPage from './pages/BlogPostPage.jsx';
import AdminBlogPage from './pages/AdminBlogPage.jsx';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage.jsx';
import LinkedInConnectPage from './pages/LinkedInConnectPage.jsx';
import AudienceSelectionPage from './pages/AudienceSelectionPage.jsx';
import CampaignSetupPage from './pages/CampaignSetupPage.jsx';
import CampaignTrackerPage from './pages/CampaignTrackerPage.jsx';
import Admin from './Admin.jsx';
import { ThemeProvider } from './components/theme-provider.jsx';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';
import { supabase } from './lib/supabaseClient.js';
import { useToast } from './components/ui/use-toast';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Login from './components/Login';
import PublicPage from './components/PublicPage';
import Layout from './components/Layout.jsx';


const App = () => {
  const [session, setSession] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const getSessionAndHandleAuthStateChange = async () => {
      try {
        const { data: { session: initialSession }, error: initialError } = await supabase.auth.getSession();

        if (initialError) {
          console.error("Error getting initial session:", initialError);
          if (initialError.message.includes("Invalid Refresh Token") || initialError.message.includes("refresh_token_not_found")) {
            await supabase.auth.signOut();
            setSession(null);
            toast({
              title: "Session Expired",
              description: "Your session has expired. Please log in again.",
              variant: "destructive",
            });
          } else {
            setSession(initialSession);
          }
        } else {
          setSession(initialSession);
        }
      } catch (e) {
        console.error("Unexpected error during initial session fetch:", e);
        await supabase.auth.signOut();
        setSession(null);
      } finally {
        setIsLoading(false);
      }

      const { data: authListener } = supabase.auth.onAuthStateChange(async (_event, newSession) => {
        if (_event === 'SIGNED_OUT' || _event === 'USER_DELETED' || _event === 'TOKEN_REFRESHED_ERROR') {
          setSession(null);
          if (_event === 'TOKEN_REFRESHED_ERROR') {
            toast({
              title: "Session Refresh Failed",
              description: "There was an issue refreshing your session. Please log in again.",
              variant: "destructive",
            });
            await supabase.auth.signOut();
          }
        } else if (_event === 'SIGNED_IN') {
          setSession(newSession);
          // Potentially redirect to /linkedin-connect if it's the first step after sign in
          // This logic might need to be more sophisticated based on user progress
        } else {
          setSession(newSession);
        }

        if (isLoading) {
          setIsLoading(false);
        }
      });

      return () => {
        if (authListener && authListener.subscription) {
          authListener.subscription.unsubscribe();
        }
      };
    };

    getSessionAndHandleAuthStateChange();

  }, [toast]);

  const handleLogout = async () => {
    setIsLoading(true);
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Logout Error",
        description: error.message || "Failed to logout. Please try again.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out.",
        variant: "default",
      });
    }
    setSession(null);
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-background">
        <div className="w-16 h-16 rounded-full border-t-4 border-b-4 animate-spin border-primary"></div>
      </div>
    );
  }

  const isAuthenticated = !!session;
  const AuthRedirect = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/auth?mode=login" replace />;
  };

  const NonAuthRedirect = ({ children }) => {
    // If authenticated, and trying to access auth/landing, redirect to a sensible authed page
    // For now, let's assume /linkedin-connect is the first step for a new user.
    // This could be /dashboard or /optimizer if those are more general starting points.
    return !isAuthenticated ? children : <Navigate to="/linkedin-connect" replace />;
  };

  return (
    <ThemeProvider defaultTheme="light" storageKey="smartleads-ui-theme">
      <Router>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen bg-background">
          <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<DigitalDrivePage />} />

              <Route path="/smart-leads" element={<NonAuthRedirect><LandingPage /></NonAuthRedirect>} />
              <Route path="/auth" element={<NonAuthRedirect><AuthPage /></NonAuthRedirect>} />
              <Route path="/login" element={<Login />} />

              <Route path="/optimizer" element={<AuthRedirect><ProfileOptimizerPage /></AuthRedirect>} />
              <Route path="/linkedin-connect" element={<AuthRedirect><LinkedInConnectPage /></AuthRedirect>} />
              <Route path="/audience-selection" element={<AuthRedirect><AudienceSelectionPage /></AuthRedirect>} />
              <Route path="/campaign-setup" element={<AuthRedirect><CampaignSetupPage /></AuthRedirect>} />
              <Route path="/campaign-tracker/:campaignId" element={<AuthRedirect><CampaignTrackerPage /></AuthRedirect>} />
              <Route path="/campaign-tracker" element={<AuthRedirect><Navigate to="/campaign-setup" replace /></AuthRedirect>} />

              {/* Admin routes */}
              <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
              <Route path="/admin/*" element={<ProtectedRoute><Admin /></ProtectedRoute>} />

              {/* Public page route */}
              <Route path="/page/:pageId" element={<Layout><PublicPage /></Layout>} />

              <Route path="/blog" element={<BlogListPage />} />
              <Route path="/blog/:slug" element={<BlogPostPage />} />
              <Route path="/admin/blog" element={<AuthRedirect><AdminBlogPage /></AuthRedirect>} />
              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />

              {/* Catch-all, consider redirecting to a specific dashboard if authenticated */}
              <Route path="*" element={<Navigate to={isAuthenticated ? "/linkedin-connect" : "/"} />} />
            </Routes>
          </main>
          <Footer />
          <Toaster />
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;