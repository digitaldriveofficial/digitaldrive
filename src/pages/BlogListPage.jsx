import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/lib/supabaseClient';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, CalendarDays, Edit3, Tag } from 'lucide-react';
import { motion } from 'framer-motion';

const BlogListPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const { data, error: dbError } = await supabase
          .from('blog_posts')
          .select('*')
          .order('created_at', { ascending: false });

        if (dbError) throw dbError;
        setPosts(data || []);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching blog posts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-6 py-12 text-center">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto mb-10"></div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-gray-100 p-6 rounded-lg shadow-md">
                <div className="h-40 bg-gray-200 rounded mb-4"></div>
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                <div className="h-10 bg-gray-200 rounded w-1/3"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-6 py-12 text-center text-red-600">
        <h1 className="text-2xl font-bold mb-4">Error Fetching Posts</h1>
        <p>{error}</p>
        <p>Please try again later or contact support.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-brand-charcoal mb-3">
          Digital Drive <span className="text-brand-electric-indigo">Blog</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Explore insights, strategies, and news on AI, marketing automation, and effective lead generation.
        </p>
      </motion.div>

      {posts.length === 0 ? (
        <div className="text-center py-10">
          <Edit3 className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <p className="text-xl text-muted-foreground">No blog posts found yet. Stay tuned for updates!</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full flex flex-col overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 border-brand-electric-indigo/20 hover:border-brand-electric-indigo/50 transform hover:-translate-y-1">
                <div className="h-52 w-full bg-gray-200 overflow-hidden">
                  <img
                    src={post.image_url || `https://source.unsplash.com/random/400x300/?technology,marketing,${index}`}
                    alt={post.title || "Blog post image"}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <CardHeader className="pb-3">
                  {post.category && (
                    <span className="inline-flex items-center text-xs text-brand-electric-indigo font-semibold uppercase tracking-wider mb-1">
                      <Tag className="w-3.5 h-3.5 mr-1.5"/>
                      {post.category}
                    </span>
                  )}
                  <CardTitle className="text-xl md:text-2xl mt-1 line-clamp-2 hover:text-brand-electric-indigo transition-colors">
                    <Link to={`/blog/${post.slug || post.id}`}>{post.title}</Link>
                  </CardTitle>
                  <CardDescription className="text-xs text-muted-foreground flex items-center mt-1.5">
                    <CalendarDays className="w-3.5 h-3.5 mr-1.5" />
                    {new Date(post.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow pt-0">
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {post.content ? post.content.substring(0, 150) + '...' : 'No snippet available.'}
                  </p>
                </CardContent>
                <CardContent className="pt-2 pb-5">
                  <Button asChild variant="link" className="p-0 text-brand-electric-indigo hover:text-brand-sky-blue font-semibold group">
                    <Link to={`/blog/${post.slug || post.id}`}>
                      Read More <ArrowRight className="w-4 h-4 ml-1.5 transform transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogListPage;