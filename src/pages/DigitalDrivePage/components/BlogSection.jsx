import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowRight, CalendarDays, Edit3, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';

const BlogSection = ({ blogPosts }) => {
  return (
    <section id="blog-section" className="py-16 bg-brand-steel-gray/70">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-brand-charcoal mb-3">
            Latest Insights & News
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Stay updated with the latest trends in AI, marketing automation, and lead generation from our experts.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {(blogPosts || []).slice(0, 3).map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <Card className="h-full flex flex-col overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 border-brand-electric-indigo/20 hover:border-brand-electric-indigo/50 transform hover:-translate-y-1">
                <div className="h-52 w-full bg-gray-200 overflow-hidden">
                  <img
                    src={post.imageUrl || `https://source.unsplash.com/random/400x300/?abstract,tech,${index}`}
                    alt={post.imageDescription || post.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <CardHeader className="pb-3">
                  {post.category && (
                    <span className="inline-flex items-center text-xs text-brand-electric-indigo font-semibold uppercase tracking-wider mb-1">
                      <Tag className="w-3.5 h-3.5 mr-1.5" />
                      {post.category}
                    </span>
                  )}
                  <CardTitle className="text-xl mt-1 line-clamp-2 hover:text-brand-electric-indigo transition-colors">
                    {post.externalLink ? (
                      <a href={post.externalLink} target="_blank" rel="noopener noreferrer">{post.title}</a>
                    ) : (
                      <Link to={`/blog/${post.slug || post.id}`}>{post.title}</Link>
                    )}
                  </CardTitle>
                  <CardDescription className="text-xs text-muted-foreground flex items-center mt-1.5">
                    <CalendarDays className="w-3.5 h-3.5 mr-1.5" />
                    {new Date(post.date || Date.now()).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow pt-0">
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {post.snippet ? post.snippet.substring(0, 150) + (post.snippet.length > 150 ? '...' : '') : 'Read more to find out...'}
                  </p>
                </CardContent>
                <CardContent className="pt-2 pb-5">
                  <Button asChild variant="link" className="p-0 text-brand-electric-indigo hover:text-brand-sky-blue font-semibold group">
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
          <Button asChild size="lg" variant="outline" className="border-brand-electric-indigo text-brand-electric-indigo hover:bg-brand-electric-indigo/10 hover:text-brand-electric-indigo font-semibold group">
            <a href="https://www.linkedin.com/company/107391611/admin/page-posts/published/" target="_blank" rel="noopener noreferrer">
              View All Posts <Edit3 className="w-4 h-4 ml-2 transform transition-transform group-hover:rotate-[15deg]" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;