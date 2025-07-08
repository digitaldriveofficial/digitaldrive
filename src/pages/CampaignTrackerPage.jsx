import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabaseClient';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RefreshCw, Download, ListChecks, Loader2, AlertCircle, Users } from 'lucide-react';

const CampaignTrackerPage = () => {
  const { campaignId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [campaign, setCampaign] = useState(null);
  const [leads, setLeads] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [liveUpdates, setLiveUpdates] = useState(true);

  const fetchCampaignDetails = useCallback(async () => {
    if (!campaignId) return;
    try {
      const { data: campaignData, error: campaignError } = await supabase
        .from('linkedin_campaigns')
        .select('*')
        .eq('id', campaignId)
        .single();

      if (campaignError) throw campaignError;
      setCampaign(campaignData);

      const { data: leadsData, error: leadsError } = await supabase
        .from('campaign_leads')
        .select('*')
        .eq('campaign_id', campaignId)
        .order('created_at', { ascending: false });
      
      if (leadsError) throw leadsError;
      setLeads(leadsData || []);

    } catch (error) {
      console.error('Error fetching campaign data:', error);
      toast({ title: 'Error', description: `Failed to fetch campaign details: ${error.message}`, variant: 'destructive' });
      navigate('/linkedin-connect'); 
    } finally {
      setIsLoading(false);
    }
  }, [campaignId, toast, navigate]);

  useEffect(() => {
    fetchCampaignDetails();
  }, [fetchCampaignDetails]);

  useEffect(() => {
    if (!liveUpdates || !campaignId) return;

    const leadsSubscription = supabase
      .channel(`campaign_leads_changes_for_${campaignId}`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'campaign_leads', filter: `campaign_id=eq.${campaignId}` },
        (payload) => {
          console.log('Realtime lead update:', payload);
          fetchCampaignDetails(); 
          toast({ title: 'Lead Updated', description: `Lead ${payload.new?.profile_name || payload.old?.profile_name} status changed.`, variant: 'default' });
        }
      )
      .subscribe();
    
    const campaignSubscription = supabase
      .channel(`campaign_status_changes_for_${campaignId}`)
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'linkedin_campaigns', filter: `id=eq.${campaignId}` },
        (payload) => {
          console.log('Realtime campaign update:', payload);
          if (payload.new) {
            setCampaign(prev => ({ ...prev, ...payload.new }));
            toast({ title: 'Campaign Updated', description: `Campaign status changed to ${payload.new.status}.`, variant: 'default' });
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(leadsSubscription);
      supabase.removeChannel(campaignSubscription);
    };
  }, [liveUpdates, campaignId, fetchCampaignDetails, toast]);

  const handleToggleCampaignStatus = async () => {
    if (!campaign) return;
    setIsUpdatingStatus(true);
    const newStatus = campaign.status === 'active' ? 'paused' : 'active';
    try {
      const { error } = await supabase
        .from('linkedin_campaigns')
        .update({ status: newStatus })
        .eq('id', campaignId);
      if (error) throw error;
      setCampaign(prev => ({ ...prev, status: newStatus }));
      toast({ title: 'Campaign Status Updated', description: `Campaign is now ${newStatus}.` });
    } catch (error) {
      toast({ title: 'Error', description: `Failed to update campaign status: ${error.message}`, variant: 'destructive' });
    } finally {
      setIsUpdatingStatus(false);
    }
  };
  
  const handleExportCSV = () => {
    if (leads.length === 0) {
      toast({ title: 'No Data', description: 'No leads to export.', variant: 'default' });
      return;
    }
    
    const headers = ['Profile Name', 'Profile URL', 'Connection Sent At', 'Connection Accepted At', 'Message Sent At', 'Post Liked At', 'Status', 'Error Message'];
    const rows = leads.map(lead => [
      `"${(lead.profile_name || 'N/A').replace(/"/g, '""')}"`,
      `"${lead.profile_url}"`,
      lead.connection_sent_at ? `"${new Date(lead.connection_sent_at).toLocaleString()}"` : 'No',
      lead.connection_accepted_at ? `"${new Date(lead.connection_accepted_at).toLocaleString()}"` : 'No',
      lead.message_sent_at ? `"${new Date(lead.message_sent_at).toLocaleString()}"` : 'No',
      lead.post_liked_at ? 'Yes' : 'No',
      `"${lead.status}"`,
      `"${(lead.error_message || '').replace(/"/g, '""')}"`
    ].join(','));
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${(campaign?.campaign_name || 'campaign').replace(/[^a-z0-9_.-]/gi, '_')}_leads.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast({ title: 'Exported!', description: 'Leads data exported to CSV.' });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-slate-50 to-sky-100">
        <Loader2 className="h-16 w-16 text-primary animate-spin" />
      </div>
    );
  }

  if (!campaign) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-100 via-slate-50 to-sky-100 p-4">
        <AlertCircle className="h-16 w-16 text-destructive mb-4" />
        <h2 className="text-2xl font-semibold text-destructive">Campaign Not Found</h2>
        <p className="text-muted-foreground">The requested campaign could not be loaded or does not exist.</p>
        <Button onClick={() => navigate('/linkedin-connect')} className="mt-6">Go to Setup</Button>
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-green-500';
      case 'paused': return 'text-yellow-500';
      case 'completed': return 'text-blue-500';
      case 'draft': return 'text-gray-500';
      case 'failed': return 'text-red-500';
      default: return 'text-muted-foreground';
    }
  };
  
  const getLeadStatusPill = (status) => {
    let bgColor = 'bg-gray-100 dark:bg-gray-700';
    let textColor = 'text-gray-800 dark:text-gray-200';
    switch (status) {
      case 'pending': bgColor = 'bg-yellow-100 dark:bg-yellow-700'; textColor = 'text-yellow-800 dark:text-yellow-200'; break;
      case 'connection_sent': bgColor = 'bg-blue-100 dark:bg-blue-700'; textColor = 'text-blue-800 dark:text-blue-200'; break;
      case 'accepted': bgColor = 'bg-green-100 dark:bg-green-700'; textColor = 'text-green-800 dark:text-green-200'; break;
      case 'messaged': bgColor = 'bg-purple-100 dark:bg-purple-700'; textColor = 'text-purple-800 dark:text-purple-200'; break;
      case 'completed': bgColor = 'bg-teal-100 dark:bg-teal-700'; textColor = 'text-teal-800 dark:text-teal-200'; break;
      case 'failed': case 'error': bgColor = 'bg-red-100 dark:bg-red-700'; textColor = 'text-red-800 dark:text-red-200'; break;
    }
    return <span className={`px-2 py-1 text-xs font-medium rounded-full ${bgColor} ${textColor}`}>{status.replace(/_/g, ' ')}</span>;
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-50 to-sky-100 p-4 md:p-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card className="shadow-xl border-primary/10">
          <CardHeader className="border-b pb-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <CardTitle className="text-3xl font-bold text-primary flex items-center">
                  <ListChecks className="w-8 h-8 mr-3" /> Campaign: {campaign.campaign_name}
                </CardTitle>
                <CardDescription className="text-muted-foreground mt-1">
                  Status: <span className={`font-semibold ${getStatusColor(campaign.status)}`}>{campaign.status.toUpperCase()}</span> | Daily Limit: {campaign.connection_limit_per_day}
                </CardDescription>
              </div>
              <div className="flex items-center space-x-3 shrink-0">
                <Button variant="outline" size="sm" onClick={fetchCampaignDetails} disabled={isLoading}>
                  <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} /> Refresh
                </Button>
                <Button 
                  variant={campaign.status === 'active' ? "destructive" : "default"} 
                  size="sm" 
                  onClick={handleToggleCampaignStatus} 
                  disabled={isUpdatingStatus}
                  className={`${campaign.status === 'active' ? 'bg-orange-500 hover:bg-orange-600' : 'bg-green-500 hover:bg-green-600'} text-white`}
                >
                  {isUpdatingStatus ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : (campaign.status === 'active' ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />)}
                  {campaign.status === 'active' ? 'Pause' : 'Resume'} Campaign
                </Button>
              </div>
            </div>
            <div className="flex items-center space-x-2 mt-4">
              <Switch id="live-updates" checked={liveUpdates} onCheckedChange={setLiveUpdates} />
              <Label htmlFor="live-updates" className="text-sm">Live Updates</Label>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="flex justify-end mb-4">
              <Button variant="outline" size="sm" onClick={handleExportCSV} disabled={leads.length === 0}>
                <Download className="w-4 h-4 mr-2" /> Export CSV
              </Button>
            </div>
            {leads.length === 0 ? (
              <div className="text-center py-10">
                <Users className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No leads found for this campaign yet.</p>
                {campaign.status === 'active' && <p className="text-sm text-muted-foreground">The automation is running, leads will appear here as they are processed.</p>}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Profile Name</TableHead>
                      <TableHead>Connection Sent</TableHead>
                      <TableHead>Accepted</TableHead>
                      <TableHead>Message Sent</TableHead>
                      <TableHead>Post Liked</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <AnimatePresence>
                      {leads.map((lead) => (
                        <motion.tr 
                          key={lead.id}
                          layout
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="hover:bg-primary/5"
                        >
                          <TableCell className="font-medium">
                            <a href={lead.profile_url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                              {lead.profile_name || 'N/A'}
                            </a>
                          </TableCell>
                          <TableCell>{lead.connection_sent_at ? new Date(lead.connection_sent_at).toLocaleDateString() : 'No'}</TableCell>
                          <TableCell>{lead.connection_accepted_at ? new Date(lead.connection_accepted_at).toLocaleDateString() : 'No'}</TableCell>
                          <TableCell>{lead.message_sent_at ? new Date(lead.message_sent_at).toLocaleDateString() : 'No'}</TableCell>
                          <TableCell>{lead.post_liked_at ? 'Yes' : 'No'}</TableCell>
                          <TableCell>{getLeadStatusPill(lead.status)}</TableCell>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default CampaignTrackerPage;