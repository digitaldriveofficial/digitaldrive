import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BarChartBig, ThumbsUp, Users2 } from 'lucide-react'; // Using Users2 for a more distinct "group" icon

const defaultClientResults = [
  {
    name: "Knoativ",
    icon: <BarChartBig className="h-12 w-12 text-primary mb-2 group-hover:scale-110 transition-transform duration-300" />,
    logoUrl: "https://storage.googleapis.com/hostinger-horizons-assets-prod/67722c01-0a4e-486e-bb90-fd82298bf8f9/fc01e9f8f4cf5233ea6aecef3a2b134b.jpg",
    logoAlt: "Knoativ logo",
    results: "Increased lead generation by 75% in 3 months.",
    testimonial: "\"Digital Drive transformed our outreach. The results speak for themselves!\""
  },
  {
    name: "Bramble Tech",
    icon: <ThumbsUp className="h-12 w-12 text-primary mb-2 group-hover:scale-110 transition-transform duration-300" />,
    logoUrl: "https://storage.googleapis.com/hostinger-horizons-assets-prod/67722c01-0a4e-486e-bb90-fd82298bf8f9/3f49e7d54a670b351b12a9b1f0acb5f5.jpg",
    logoAlt: "Bramble Tech logo",
    results: "Achieved a 40% connection acceptance rate on LinkedIn.",
    testimonial: "\"Their strategies are top-notch. We've seen a significant boost in engagement.\""
  },
  {
    name: "Growth Tech",
    icon: <Users2 className="h-12 w-12 text-primary mb-2 group-hover:scale-110 transition-transform duration-300" />,
    logoUrl: "https://storage.googleapis.com/hostinger-horizons-assets-prod/67722c01-0a4e-486e-bb90-fd82298bf8f9/2495744c6acba0a422e3120b5fc3ead6.jpg",
    logoAlt: "Growth Tech logo",
    results: "Booked 20+ qualified meetings in the first month.",
    testimonial: "\"Smart Leads, powered by Digital Drive, is a game-changer for our sales pipeline.\""
  }
];


const ClientResultsSection = ({ clientResults = defaultClientResults }) => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
              Real Results
            </span> for Real Clients
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            Don't just take our word for it. See what our clients are saying.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(clientResults && clientResults.length > 0 ? clientResults : defaultClientResults).map((client, index) => (
            <motion.div
              key={client.name || index}
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15, type: 'spring', stiffness: 100 }}
              className="h-full"
            >
              <Card className="h-full flex flex-col text-center shadow-xl hover:shadow-2xl dark:hover:shadow-primary/20 transition-all duration-300 border-border/20 hover:border-primary/50 bg-card dark:bg-slate-800/50 rounded-xl overflow-hidden group">
                <CardHeader className="items-center pt-8 pb-2 bg-gradient-to-br from-primary/5 via-transparent to-transparent dark:from-primary/10">
                  {client.icon}
                  <CardTitle className="text-2xl sm:text-3xl text-primary group-hover:text-primary/90 transition-colors mt-2">
                    {client.name || 'Valued Client'}
                  </CardTitle>
                  <img
                    alt={client.logoAlt}
                    className="h-8 sm:h-10 w-auto my-3 filter grayscale group-hover:filter-none transition-all duration-300 object-contain"
                    src={client.logoUrl} />
                </CardHeader>
                <CardContent className="flex-grow p-6 pt-2 space-y-3">
                  <p className="text-lg sm:text-xl font-semibold text-foreground my-2">
                    {client.results || 'Significant Improvements'}
                  </p>
                  <CardDescription className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {client.testimonial || 'Outstanding service and incredible results using Smart Leads.'}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientResultsSection;