import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabaseClient';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';
import { Users, Search, Link as LinkIcon, ArrowRight } from 'lucide-react';

const AudienceSelectionPage = () => {
  const [searchUrl, setSearchUrl] = useState('');
  const [searchType, setSearchType] = useState(''); // 'basic' or 'sales_navigator'
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const isValidLinkedInSearchUrl = (url) => {
    try {
      const parsedUrl = new URL(url);
      return (
        parsedUrl.hostname.endsWith('linkedin.com') &&
        (parsedUrl.pathname.startsWith('/search/results/') || parsedUrl.pathname.startsWith('/sales/search/'))
      );
    } catch (e) {
      return false;
    }
  };

  const handleSearchTypeSelection = (type) => {
    setSearchType(type);
    toast({
      title: `${type === 'basic' ? 'Basic' : 'Sales Navigator'} Search Selected`,
      description: "Now, please paste the LinkedIn search URL below.",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!searchType) {
      toast({ title: 'Error', description: 'Please select a search type (Basic or Sales Navigator).', variant: 'destructive' });
      return;
    }
    if (!searchUrl.trim()) {
      toast({ title: 'Error', description: 'LinkedIn search URL cannot be empty.', variant: 'destructive' });
      return;
    }
    if (!isValidLinkedInSearchUrl(searchUrl)) {
      toast({ title: 'Error', description: 'Please enter a valid LinkedIn or Sales Navigator search URL.', variant: 'destructive' });
      return;
    }

    setIsLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({ title: 'Error', description: 'User not authenticated.', variant: 'destructive' });
        navigate('/auth');
        return;
      }

      const { error } = await supabase
        .from('linkedin_audiences')
        .insert({ user_id: user.id, search_url: searchUrl, search_type: searchType });

      if (error) throw error;

      toast({
        title: 'Success!',
        description: 'Audience search URL saved.',
      });
      navigate('/campaign-setup');
    } catch (error) {
      console.error('Error saving audience search URL:', error);
      toast({
        title: 'Save Error',
        description: error.message || 'Failed to save audience URL. Please try again.',
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
            <Users className="mx-auto h-16 w-16 text-primary mb-4" />
            <CardTitle className="text-3xl font-bold text-primary">Define Your Audience</CardTitle>
            <CardDescription className="text-muted-foreground pt-2">
              Specify your target audience by providing a LinkedIn search URL.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-3">
                <Label className="font-semibold text-foreground/90">1. Select Search Type</Label>
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    type="button"
                    variant={searchType === 'basic' ? 'default' : 'outline'}
                    onClick={() => handleSearchTypeSelection('basic')}
                    className={`py-3 text-base ${searchType === 'basic' ? 'bg-primary text-primary-foreground' : 'border-primary text-primary hover:bg-primary/10'}`}
                  >
                    <Search className="w-5 h-5 mr-2" /> Basic LinkedIn
                  </Button>
                  <Button
                    type="button"
                    variant={searchType === 'sales_navigator' ? 'default' : 'outline'}
                    onClick={() => handleSearchTypeSelection('sales_navigator')}
                    className={`py-3 text-base ${searchType === 'sales_navigator' ? 'bg-primary text-primary-foreground' : 'border-primary text-primary hover:bg-primary/10'}`}
                  >
                    <Search className="w-5 h-5 mr-2" /> Sales Navigator
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="searchUrl" className="font-semibold text-foreground/90">2. Paste LinkedIn Search URL</Label>
                <div className="relative">
                  <LinkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="searchUrl"
                    type="url"
                    placeholder="https://www.linkedin.com/search/results/..."
                    value={searchUrl}
                    onChange={(e) => setSearchUrl(e.target.value)}
                    required
                    disabled={!searchType}
                    className="pl-10 py-3 text-base focus:border-primary"
                  />
                </div>
                <p className="text-xs text-muted-foreground pt-1">
                  Ensure you copy the URL directly from your LinkedIn search results page.
                </p>
              </div>

              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-lg py-3 group" disabled={isLoading || !searchType || !searchUrl}>
                {isLoading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full mr-2"
                  />
                ) : null}
                {isLoading ? 'Saving...' : 'Save Audience & Proceed'}
                {!isLoading && <ArrowRight className="w-5 h-5 ml-2 transform transition-transform group-hover:translate-x-1" />}
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default AudienceSelectionPage;