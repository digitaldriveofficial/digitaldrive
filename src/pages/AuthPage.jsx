import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { supabase } from '@/lib/supabaseClient';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, LogIn, UserPlus, Mail, Linkedin } from 'lucide-react';

const SMART_LEADS_LOGO_URL = "https://storage.googleapis.com/hostinger-horizons-assets-prod/67722c01-0a4e-486e-bb90-fd82298bf8f9/abd3c822790a68c1006d3fe6134c627d.png";

const AuthPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [mode, setMode] = useState(searchParams.get('mode') || 'login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLinkedInLoading, setIsLinkedInLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    setMode(searchParams.get('mode') || 'login');
  }, [searchParams]);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  const sendSignupNotification = async (userEmail, method = "Email") => {
    try {
      const { error } = await supabase.functions.invoke('send-contact-email', {
        body: {
          email: userEmail,
          formType: `New Smart Leads User Signup (${method})`,
          toEmail: 'hello@digitaldrive.pk',
          ccEmail: 'digitaldriveofficial@gmail.com'
        },
      });
      if (error) {
        console.error("Error sending signup notification:", error);
      }
    } catch (e) {
      console.error("Exception sending signup notification:", e);
    }
  };

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (mode === 'signup' && password !== confirmPassword) {
      toast({
        title: "Passwords do not match!",
        description: "Please ensure your passwords match.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    try {
      if (mode === 'signup') {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        await sendSignupNotification(email, "Email");

        if (data.user && data.user.identities && data.user.identities.length === 0) {
           toast({
            title: "Signup successful! User already exists.",
            description: "Please log in with your existing account.",
            variant: "default",
          });
          setMode('login');
        } else if (data.user && data.session) {
          toast({
            title: "Signup Successful!",
            description: "Welcome to Smart Leads! You are now logged in.",
            variant: "default",
          });
          navigate('/linkedin-connect'); // First step after signup
        } else {
          toast({
            title: "Confirmation Email Sent!",
            description: "Please check your email to confirm your account before logging in.",
            variant: "default",
          });
        }

      } else { // Login mode
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        toast({
          title: "Login Successful!",
          description: "Welcome back to Smart Leads!",
          variant: "default",
        });
        navigate('/linkedin-connect'); // First step after login
      }
    } catch (error) {
      toast({
        title: "Authentication Error",
        description: error.message || "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLinkedInAuth = async () => {
    setIsLinkedInLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'linkedin',
        options: {
          redirectTo: `${window.location.origin}/linkedin-connect` // Redirect to first step after OAuth
        }
      });
      if (error) throw error;
      // Supabase handles redirection. If user is new, they will be signed up.
      // Notification for new LinkedIn signups can be handled by a trigger/webhook on Supabase if needed,
      // or by checking user's created_at vs last_sign_in_at on the redirect page.
      // For simplicity, we'll assume the auth state change listener in App.jsx handles session.
    } catch (error) {
      toast({
        title: "LinkedIn Auth Error",
        description: error.message || "Could not sign in with LinkedIn. Please try again.",
        variant: "destructive",
      });
      setIsLinkedInLoading(false);
    }
    // setIsLoading(false) will be handled by page navigation or error
  };


  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-brand-steel-gray via-white to-brand-light-blue/30 p-4">
      <Link to="/" className="mb-8">
        <img src={SMART_LEADS_LOGO_URL} alt="Smart Leads Logo" className="w-24 h-24 mx-auto rounded-lg shadow-lg border-2 border-brand-electric-indigo/30" />
      </Link>
      <AnimatePresence mode="wait">
        <motion.div
          key={mode}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="w-full max-w-md shadow-2xl border-brand-electric-indigo/20">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-brand-electric-indigo">
                {mode === 'login' ? 'Welcome Back!' : 'Create Your Account'}
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                {mode === 'login' ? 'Log in to access your Smart Leads dashboard.' : 'Sign up for a free trial of Smart Leads.'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleEmailAuth} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-brand-charcoal">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="pl-10 border-brand-charcoal/30 focus:border-brand-electric-indigo"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-brand-charcoal">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="pr-10 border-brand-charcoal/30 focus:border-brand-electric-indigo"
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute inset-y-0 right-0 px-3 flex items-center text-muted-foreground hover:text-brand-electric-indigo"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>
                {mode === 'signup' && (
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-brand-charcoal">Confirm Password</Label>
                     <div className="relative">
                        <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className="pr-10 border-brand-charcoal/30 focus:border-brand-electric-indigo"
                        />
                        <button
                        type="button"
                        onClick={toggleConfirmPasswordVisibility}
                        className="absolute inset-y-0 right-0 px-3 flex items-center text-muted-foreground hover:text-brand-electric-indigo"
                        aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                        >
                        {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                    </div>
                  </div>
                )}
                <Button type="submit" className="w-full bg-brand-electric-indigo hover:bg-opacity-90 text-white font-semibold py-3 text-lg group" disabled={isLoading || isLinkedInLoading}>
                  {isLoading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                    />
                  ) : (mode === 'login' ? <LogIn className="w-5 h-5 mr-2" /> : <UserPlus className="w-5 h-5 mr-2" />)}
                  {isLoading ? 'Processing...' : (mode === 'login' ? 'Log In' : 'Sign Up with Email')}
                </Button>
              </form>
              
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-brand-charcoal/30" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
                </div>
              </div>

              <Button 
                variant="outline" 
                className="w-full border-blue-600 text-blue-600 hover:bg-blue-50 hover:text-blue-700 font-semibold py-3 text-lg group" 
                onClick={handleLinkedInAuth}
                disabled={isLoading || isLinkedInLoading}
              >
                {isLinkedInLoading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full mr-2"
                  />
                ) : (
                  <Linkedin className="w-5 h-5 mr-2" />
                )}
                {isLinkedInLoading ? 'Redirecting...' : (mode === 'login' ? 'Sign In with LinkedIn' : 'Sign Up with LinkedIn')}
              </Button>

            </CardContent>
            <CardFooter className="flex flex-col items-center space-y-3 pt-6">
              <p className="text-sm text-muted-foreground">
                {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}
                <Button
                  variant="link"
                  className="text-brand-electric-indigo hover:underline pl-1"
                  onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                  disabled={isLoading || isLinkedInLoading}
                >
                  {mode === 'login' ? 'Sign Up' : 'Log In'}
                </Button>
              </p>
               {mode === 'login' && (
                 <Button variant="link" size="sm" className="text-muted-foreground hover:text-brand-electric-indigo text-xs" disabled={isLoading || isLinkedInLoading}>
                    Forgot password?
                 </Button>
               )}
            </CardFooter>
          </Card>
        </motion.div>
      </AnimatePresence>
       <p className="text-xs text-muted-foreground text-center mt-8 max-w-md">
        By signing up or logging in, you agree to our <Link to="/privacy-policy" className="underline hover:text-brand-electric-indigo">Privacy Policy</Link> and Terms of Service (link to be added).
      </p>
    </div>
  );
};

export default AuthPage;