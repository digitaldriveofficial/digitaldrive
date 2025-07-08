import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabaseClient';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';
import { Settings, Play, MessageSquare, UserCheck, Bell, ThumbsUp, ArrowRight } from 'lucide-react';

const CampaignSetupPage = () => {
  const [campaignName, setCampaignName] = useState('');
  const [connectionLimit, setConnectionLimit] = useState(50);
  const [followProfile, setFollowProfile] = useState(true);
  const [openNotifications, setOpenNotifications] = useState(true);
  const [likeLatestPost, setLikeLatestPost] = useState(true);
  const [messageContext, setMessageContext] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!campaignName.trim()) {
      toast({ title: 'Error', description: 'Campaign name cannot be empty.', variant: 'destructive' });
      return;
    }
    if (connectionLimit <= 0 || connectionLimit > 100) {
      toast({ title: 'Error', description: 'Connection limit must be between 1 and 100.', variant: 'destructive' });
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

      const { data, error } = await supabase
        .from('linkedin_campaigns')
        .insert({
          user_id: user.id,
          campaign_name: campaignName,
          connection_limit_per_day: connectionLimit,
          follow_profile: followProfile,
          open_profile_notifications: openNotifications,
          like_latest_post: likeLatestPost,
          connection_message_context: messageContext,
          status: 'active' // Or 'draft' if you want a review step
        })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: 'Campaign Created!',
        description: `Campaign "${campaignName}" is set up and ready to go.`,
      });
      navigate(`/campaign-tracker/${data.id}`); // Navigate to tracker for this specific campaign
    } catch (error) {
      console.error('Error creating campaign:', error);
      toast({
        title: 'Campaign Error',
        description: error.message || 'Failed to create campaign. Please try again.',
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
            <Settings className="mx-auto h-16 w-16 text-primary mb-4" />
            <CardTitle className="text-3xl font-bold text-primary">Setup Your Campaign</CardTitle>
            <CardDescription className="text-muted-foreground pt-2">
              Configure your LinkedIn outreach automation settings.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="campaignName" className="font-semibold">Campaign Name</Label>
                <Input
                  id="campaignName"
                  placeholder="e.g., Q4 Tech Leads Outreach"
                  value={campaignName}
                  onChange={(e) => setCampaignName(e.target.value)}
                  required
                  className="py-3 text-base focus:border-primary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="connectionLimit" className="font-semibold">Connection Request Limit per Day</Label>
                <Input
                  id="connectionLimit"
                  type="number"
                  min="1"
                  max="100" 
                  value={connectionLimit}
                  onChange={(e) => setConnectionLimit(parseInt(e.target.value, 10))}
                  required
                  className="py-3 text-base focus:border-primary"
                />
              </div>

              <div className="space-y-3">
                <Label className="font-semibold">Actions per Profile</Label>
                <div className="flex items-center space-x-3">
                  <Checkbox id="followProfile" checked={followProfile} onCheckedChange={setFollowProfile} />
                  <Label htmlFor="followProfile" className="flex items-center text-sm"><UserCheck className="w-4 h-4 mr-2 text-primary"/>Follow the profile</Label>
                </div>
                <div className="flex items-center space-x-3">
                  <Checkbox id="openNotifications" checked={openNotifications} onCheckedChange={setOpenNotifications} />
                  <Label htmlFor="openNotifications" className="flex items-center text-sm"><Bell className="w-4 h-4 mr-2 text-primary"/>Open profile notifications</Label>
                </div>
                <div className="flex items-center space-x-3">
                  <Checkbox id="likeLatestPost" checked={likeLatestPost} onCheckedChange={setLikeLatestPost} />
                  <Label htmlFor="likeLatestPost" className="flex items-center text-sm"><ThumbsUp className="w-4 h-4 mr-2 text-primary"/>Like the latest post</Label>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="messageContext" className="font-semibold">
                  Message Context (Optional)
                  <MessageSquare className="inline w-4 h-4 ml-2 text-primary"/>
                </Label>
                <Textarea
                  id="messageContext"
                  placeholder="Provide context for the AI to draft a personalized message once a connection is accepted. e.g., 'Mention their recent award in AI innovation and ask about their work at Company X.'"
                  value={messageContext}
                  onChange={(e) => setMessageContext(e.target.value)}
                  rows={4}
                  className="text-base focus:border-primary"
                />
                 <p className="text-xs text-muted-foreground pt-1">
                  This message will be sent after a connection request is accepted.
                </p>
              </div>
              
              <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-lg py-3 group" disabled={isLoading}>
                {isLoading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full mr-2"
                  />
                ) : (
                  <Play className="w-5 h-5 mr-2" />
                )}
                {isLoading ? 'Saving Campaign...' : 'Begin Outreach'}
                 {!isLoading && <ArrowRight className="w-5 h-5 ml-2 transform transition-transform group-hover:translate-x-1" />}
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default CampaignSetupPage;