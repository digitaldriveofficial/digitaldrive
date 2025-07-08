import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '@/lib/supabaseClient';
import { ArrowLeft, CalendarDays, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const BlogPostPage = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      setError(null); 
      try {
        const { data, error: dbError } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('slug', slug) 
          .single();

        if (dbError) {
          if (dbError.code === 'PGRST116') { 
            setError(`Post with slug "${slug}" not found.`);
            setPost(null);
          } else {
            throw dbError;
          }
        } else {
          setPost(data);
        }
      } catch (err) {
        setError(err.message);
        console.error("Error fetching blog post:", err);
        setPost(null);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchPost();
    } else {
      setError("No slug provided to fetch blog post.");
      setLoading(false);
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="container mx-auto px-6 py-12">
        <div className="animate-pulse max-w-3xl mx-auto">
          <div className="h-10 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-6 bg-gray-200 rounded w-1/2 mb-2"></div>
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-8"></div>
          <div className="h-64 bg-gray-200 rounded mb-8"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-4/6"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="container mx-auto px-6 py-12 text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">
          {error && error.includes("not found") ? "Post Not Found" : "Error Fetching Post"}
        </h1>
        <p className="text-muted-foreground mb-6">
          {error || "The blog post you're looking for doesn't exist or may have been moved."}
        </p>
        <Button asChild variant="outline" className="border-brand-electric-indigo text-brand-electric-indigo hover:bg-brand-electric-indigo/10">
          <Link to="/blog">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Blog List
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto bg-white p-6 sm:p-8 md:p-10 rounded-xl shadow-xl border border-gray-200"
      >
        <header className="mb-8">
          <div className="mb-4">
            <Button asChild variant="ghost" className="text-brand-electric-indigo hover:bg-brand-electric-indigo/10 pl-0">
              <Link to="/blog">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to all posts
              </Link>
            </Button>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-brand-charcoal leading-tight mb-3">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center text-sm text-muted-foreground space-x-4">
            <div className="flex items-center">
              <CalendarDays className="w-4 h-4 mr-1.5 text-brand-sky-blue" />
              <span>{new Date(post.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
            {post.category && (
              <div className="flex items-center">
                <Tag className="w-4 h-4 mr-1.5 text-brand-sky-blue" />
                <span>{post.category}</span>
              </div>
            )}
          </div>
        </header>

        {post.image_url && (
          <div className="mb-8 rounded-lg overflow-hidden shadow-lg">
            <img src={post.image_url} alt={post.title} className="w-full h-auto max-h-[500px] object-cover" />
          </div>
        )}

        <div 
          className="prose prose-lg sm:prose-xl max-w-none text-brand-charcoal/90 
                     prose-headings:text-brand-charcoal prose-h2:text-3xl prose-h3:text-2xl prose-h4:text-xl
                     prose-a:text-brand-electric-indigo hover:prose-a:text-brand-sky-blue prose-a:transition-colors
                     prose-strong:text-brand-charcoal
                     prose-blockquote:border-l-brand-electric-indigo prose-blockquote:text-brand-charcoal/80
                     prose-code:bg-gray-100 prose-code:p-1 prose-code:rounded prose-code:font-mono prose-code:text-sm
                     prose-ul:list-disc prose-ol:list-decimal prose-li:my-1"
          dangerouslySetInnerHTML={{ __html: post.content ? post.content.replace(/\n/g, '<br />') : '' }} 
        />
      </motion.article>
    </div>
  );
};

export default BlogPostPage;