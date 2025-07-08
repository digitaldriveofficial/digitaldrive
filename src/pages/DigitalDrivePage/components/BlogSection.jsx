import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowRight, CalendarDays, Edit3, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';

const defaultBlogPosts = [
  {
    id: 1,
    slug: 'ai-automation-future',
    category: 'AI & AUTOMATION',
    title: 'AI & Automation: The Future of AI in Lead Generation',
    date: '2025-05-20',
    snippet: "In today's hyper-competitive digital economy, generating high-quality leads is the lifeline of business growth. But with attention spans shrinking and...",
    imageUrl: "https://storage.googleapis.com/hostinger-horizons-assets-prod/67722c01-0a4e-486e-bb90-fd82298bf8f9/09d02d472a30b9b004c63cc4663178fb.png",
    externalLink: "https://www.linkedin.com/pulse/ai-automation-future-lead-generation-ali-abdullah-founder-twpbe/?trackingId=pMW8tmN7Qm6EDCfLDTwddA%3D%3D",
  },
  {
    id: 2,
    slug: 'mastering-linkedin-profile-optimization',
    category: 'SOCIAL MEDIA MARKETING',
    title: 'Mastering LinkedIn: Tips for Profile Optimization',
    date: '2025-05-15',
    snippet: 'Your LinkedIn profile is more than a resume. Learn how to turn it into a powerful tool for attracting and converting leads...',
    imageUrl: "https://storage.googleapis.com/hostinger-horizons-assets-prod/67722c01-0a4e-486e-bb90-fd82298bf8f9/c6330f9971ee5f5085ea37283653edc2.png",
    externalLink: "https://www.linkedin.com/pulse/social-media-marketing-mastering-linkedin-tips-profile-clsqe/",
  },
  {
    id: 3,
    slug: 'content-strategies-that-convert-2025',
    category: 'CONTENT MARKETING',
    title: 'Content Strategies That Convert in 2025',
    date: '2025-05-10',
    snippet: 'Content is king, but not all content is created equal. Explore strategies that drive engagement and conversions...',
    imageUrl: "https://storage.googleapis.com/hostinger-horizons-assets-prod/67722c01-0a4e-486e-bb90-fd82298bf8f9/2bdfa0ad9c73d52fc5559bbf0880ceab.png",
    externalLink: "https://www.linkedin.com/pulse/content-marketing-strategies-convert-2025-ali-abdullah-eende/",
  }
];

const BlogSection = ({ blogPosts = defaultBlogPosts }) => {
  return (
    <section id="blog-section" className="py-16 md:py-24 bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12 md:mb-16"
        >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
                Latest Insights & News
            </h2>
            <p className="mt-4 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
                Stay updated with the latest trends in AI, marketing automation, and lead generation from our experts.
            </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => ( 
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1, type: 'spring', stiffness: 100 }}
              className="h-full"
            >
              <Card className="h-full flex flex-col overflow-hidden shadow-lg hover:shadow-primary/20 dark:hover:shadow-primary/20 transition-all duration-300 rounded-xl group border-transparent hover:border-primary/30 bg-card">
                <div className="h-52 w-full bg-gray-200 dark:bg-slate-800 overflow-hidden rounded-t-xl">
                  <img 
                    alt={post.title} 
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    src={post.imageUrl || "https://images.unsplash.com/photo-1606498679340-0aec3185edbd"} />
                </div>
                <CardHeader className="pb-3">
                   {post.category && (
                    <span className="inline-flex items-center text-xs text-primary font-semibold uppercase tracking-wider mb-1">
                      <Tag className="w-3.5 h-3.5 mr-1.5"/>
                      {post.category}
                    </span>
                  )}
                  <CardTitle className="text-xl text-foreground group-hover:text-primary transition-colors mt-1 line-clamp-2">
                    {post.externalLink ? (
                      <a href={post.externalLink} target="_blank" rel="noopener noreferrer">{post.title}</a>
                    ) : (
                      <Link to={`/blog/${post.slug || post.id}`}>{post.title}</Link>
                    )}
                  </CardTitle>
                  <CardDescription className="text-xs text-muted-foreground flex items-center mt-1.5">
                    <CalendarDays className="w-3.5 h-3.5 mr-1.5" /> 
                    {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow pt-0">
                  <p className="text-sm text-muted-foreground line-clamp-3">
                     {post.snippet}
                  </p>
                </CardContent>
                <CardContent className="pt-2 pb-5">
                   <Button asChild variant="link" className="p-0 text-primary hover:text-primary/80 font-semibold group">
                    {post.externalLink ? (
                      <a href={post.externalLink} target="_blank" rel="noopener noreferrer">
                        Read More <ArrowRight className="w-4 h-4 ml-1.5 transform transition-transform group-hover:translate-x-1" />
                      </a>
                    ) : (
                      <Link to={`/blog/${post.slug || post.id}`}>
                        Read More <ArrowRight className="w-4 h-4 ml-1.5 transform transition-transform group-hover:translate-x-1" />
                      </Link>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
         <div className="text-center mt-12">
          <Button asChild size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10 hover:text-primary font-semibold group">
            <Link to="/blog">
                View All Posts <Edit3 className="w-4 h-4 ml-2 transform transition-transform group-hover:rotate-[15deg]" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;