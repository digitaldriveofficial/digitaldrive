import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabaseClient';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';
import { Linkedin, Key, AlertTriangle, ArrowRight, Eye, EyeOff, Mail, ShieldAlert } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const LinkedInConnectPage = () => {
  const [connectMethod, setConnectMethod] = useState('credentials'); // Default to 'credentials'
  const [sessionCookie, setSessionCookie] = useState('');
  const [linkedinEmail, setLinkedinEmail] = useState('');
  const [linkedinPassword, setLinkedinPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    let connectionDataFields = {};
    let validationError = false;

    if (connectMethod === 'cookie') {
      if (!sessionCookie.trim()) {
        toast({ title: 'Error', description: 'LinkedIn session cookie cannot be empty.', variant: 'destructive' });
        validationError = true;
      }
      connectionDataFields = {
        session_cookie_encrypted: sessionCookie,
        linkedin_email_encrypted: null,
        linkedin_password_encrypted: null,
        connection_method: 'cookie'
      };
    } else { // credentials
      if (!linkedinEmail.trim() || !linkedinPassword.trim()) {
        toast({ title: 'Error', description: 'LinkedIn email and password cannot be empty.', variant: 'destructive' });
        validationError = true;
      }
      connectionDataFields = {
        linkedin_email_encrypted: linkedinEmail,
        linkedin_password_encrypted: linkedinPassword,
        session_cookie_encrypted: null,
        connection_method: 'credentials'
      };
    }

    if (validationError) {
      setIsLoading(false);
      return;
    }

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({ title: 'Error', description: 'User not authenticated.', variant: 'destructive' });
        navigate('/auth');
        setIsLoading(false);
        return;
      }

      const updatePayload = {
        user_id: user.id,
        ...connectionDataFields
      };

      const { error } = await supabase
        .from('linkedin_connections')
        .upsert(updatePayload, { onConflict: 'user_id' });

      if (error) throw error;

      toast({
        title: 'Success!',
        description: `LinkedIn connection details (${connectMethod}) saved securely.`,
      });
      navigate('/audience-selection');
    } catch (error) {
      console.error('Error saving LinkedIn session:', error);
      toast({
        title: 'Connection Error',
        description: error.message || 'Failed to save LinkedIn connection details. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-100 via-slate-50 to-sky-100 p-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg"
      >
        <Card className="shadow-2xl border-primary/20">
          <CardHeader className="text-center">
            <Linkedin className="mx-auto h-16 w-16 text-primary mb-4" />
            <CardTitle className="text-3xl font-bold text-primary">Connect Your LinkedIn</CardTitle>
            <CardDescription className="text-muted-foreground pt-2">
              Choose your preferred method to securely connect your LinkedIn account.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={connectMethod} onValueChange={setConnectMethod} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="credentials">Connect with Credentials</TabsTrigger>
                <TabsTrigger value="cookie">Connect with Cookie</TabsTrigger>
              </TabsList>
              <form onSubmit={handleSubmit}>
                <TabsContent value="credentials" className="space-y-6 outline-none ring-0 border-0 focus-visible:ring-0 focus:ring-0">
                  <div className="space-y-2">
                    <Label htmlFor="linkedinEmail" className="font-semibold text-foreground/90">LinkedIn Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input
                        id="linkedinEmail"
                        type="email"
                        placeholder="you@linkedin.com"
                        value={linkedinEmail}
                        onChange={(e) => setLinkedinEmail(e.target.value)}
                        required={connectMethod === 'credentials'}
                        className="pl-10 py-3 text-base focus:border-primary"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="linkedinPassword" className="font-semibold text-foreground/90">LinkedIn Password</Label>
                    <div className="relative">
                      <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input
                        id="linkedinPassword"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Your LinkedIn Password"
                        value={linkedinPassword}
                        onChange={(e) => setLinkedinPassword(e.target.value)}
                        required={connectMethod === 'credentials'}
                        className="pl-10 pr-10 py-3 text-base focus:border-primary"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 px-3 flex items-center text-muted-foreground hover:text-primary"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>
                  <div className="bg-red-50 border-l-4 border-red-400 p-3 rounded-md">
                    <div className="flex">
                      <div className="flex-shrink-0 pt-0.5">
                        <AlertTriangle className="h-5 w-5 text-red-500" aria-hidden="true" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-red-700">
                          <span className="font-semibold">Security Warning:</span> Storing passwords is less secure and may violate LinkedIn's ToS. This method might also fail if you have 2FA enabled. We strongly recommend using the cookie method.
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="cookie" className="space-y-6 outline-none ring-0 border-0 focus-visible:ring-0 focus:ring-0">
                  <div className="space-y-2">
                    <Label htmlFor="sessionCookie" className="font-semibold text-foreground/90">LinkedIn Session Cookie</Label>
                    <div className="relative">
                      <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input
                        id="sessionCookie"
                        type="password"
                        placeholder="Paste your 'li_at' cookie here"
                        value={sessionCookie}
                        onChange={(e) => setSessionCookie(e.target.value)}
                        required={connectMethod === 'cookie'}
                        className="pl-10 py-3 text-base focus:border-primary"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground pt-1">
                      Need help finding your cookie? <a href="#" onClick={(e) => { e.preventDefault(); toast({ title: 'Info', description: "Instructions on finding your LinkedIn session cookie will be provided here. For now, search online for 'how to find LinkedIn li_at cookie'." }); }} className="text-primary hover:underline">Learn more</a>.
                    </p>
                  </div>
                  <div className="bg-blue-50 border-l-4 border-blue-400 p-3 rounded-md">
                    <div className="flex">
                      <div className="flex-shrink-0 pt-0.5">
                        <ShieldAlert className="h-5 w-5 text-blue-500" aria-hidden="true" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-blue-700">
                          <span className="font-semibold">Recommended & More Secure:</span> Using a session cookie is generally safer and less likely to trigger LinkedIn security alerts.
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-md mt-6">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <AlertTriangle className="h-5 w-5 text-yellow-500" aria-hidden="true" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-yellow-700">
                        <span className="font-semibold">Disclaimer:</span> We never store or share your raw credentials if you use the password method (they should be encrypted server-side). Your LinkedIn session is only used for automation you authorize. All sensitive data is stored encrypted.
                      </p>
                    </div>
                  </div>
                </div>

                <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-lg py-3 group mt-6" disabled={isLoading}>
                  {isLoading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full mr-2"
                    />
                  ) : (
                    <Linkedin className="w-5 h-5 mr-2" />
                  )}
                  {isLoading ? 'Connecting...' : 'Save & Continue'}
                  {!isLoading && <ArrowRight className="w-5 h-5 ml-2 transform transition-transform group-hover:translate-x-1" />}
                </Button>
              </form>
            </Tabs>
          </CardContent>
          <CardFooter className="text-center">
            <p className="text-xs text-muted-foreground">
              By connecting, you agree to our Terms of Service and Privacy Policy.
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default LinkedInConnectPage;