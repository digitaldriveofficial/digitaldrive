import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { PlusCircle, Edit2, Trash2, List } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AdminBlogPage = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentPost, setCurrentPost] = useState(null); // For editing

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const { toast } = useToast();

  const fetchPosts = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast({ title: "Error fetching posts", description: error.message, variant: "destructive" });
    } else {
      setPosts(data || []);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '') // Remove non-word chars
      .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
      .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
  };

  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    if (!currentPost) { // Only auto-generate slug for new posts
      setSlug(generateSlug(newTitle));
    }
  };

  const resetForm = () => {
    setTitle('');
    setSlug('');
    setContent('');
    setCategory('');
    setImageUrl('');
    setCurrentPost(null);
    setIsFormOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const postData = {
      title,
      slug: slug || generateSlug(title), // Ensure slug is generated if empty
      content,
      category,
      image_url: imageUrl,
    };

    let response;
    if (currentPost) { // Editing existing post
      response = await supabase
        .from('blog_posts')
        .update(postData)
        .eq('id', currentPost.id);
    } else { // Creating new post
      response = await supabase.from('blog_posts').insert([postData]);
    }

    if (response.error) {
      toast({ title: "Error saving post", description: response.error.message, variant: "destructive" });
    } else {
      toast({ title: "Success!", description: `Post ${currentPost ? 'updated' : 'created'} successfully.` });
      resetForm();
      fetchPosts(); // Refresh list
    }
    setIsLoading(false);
  };

  const handleEdit = (post) => {
    setCurrentPost(post);
    setTitle(post.title);
    setSlug(post.slug);
    setContent(post.content);
    setCategory(post.category || '');
    setImageUrl(post.image_url || '');
    setIsFormOpen(true);
  };

  const handleDelete = async (postId) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      setIsLoading(true);
      const { error } = await supabase.from('blog_posts').delete().eq('id', postId);
      if (error) {
        toast({ title: "Error deleting post", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Post deleted successfully" });
        fetchPosts(); // Refresh list
      }
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center mb-8"
      >
        <h1 className="text-3xl font-bold text-brand-charcoal">Manage Blog Posts</h1>
        <Button onClick={() => { resetForm(); setIsFormOpen(true); }} className="bg-brand-electric-indigo hover:bg-opacity-90">
          <PlusCircle className="w-5 h-5 mr-2" /> Add New Post
        </Button>
      </motion.div>

      <AnimatePresence>
        {isFormOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-8 overflow-hidden"
          >
            <Card className="shadow-lg border-brand-electric-indigo/30">
              <CardHeader>
                <CardTitle className="text-2xl text-brand-electric-indigo">
                  {currentPost ? 'Edit Post' : 'Create New Post'}
                </CardTitle>
                <CardDescription>Fill in the details for your blog post.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="title" className="text-brand-charcoal font-semibold">Title</Label>
                    <Input id="title" value={title} onChange={handleTitleChange} required className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="slug" className="text-brand-charcoal font-semibold">Slug (URL-friendly)</Label>
                    <Input id="slug" value={slug} onChange={(e) => setSlug(e.target.value)} required className="mt-1" placeholder="auto-generated or custom-slug"/>
                    <p className="text-xs text-muted-foreground mt-1">If left empty, slug will be auto-generated from title.</p>
                  </div>
                  <div>
                    <Label htmlFor="content" className="text-brand-charcoal font-semibold">Content (HTML or Markdown)</Label>
                    <Textarea id="content" value={content} onChange={(e) => setContent(e.target.value)} required rows={10} className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="category" className="text-brand-charcoal font-semibold">Category</Label>
                    <Input id="category" value={category} onChange={(e) => setCategory(e.target.value)} className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="imageUrl" className="text-brand-charcoal font-semibold">Image URL</Label>
                    <Input id="imageUrl" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="mt-1" placeholder="https://example.com/image.jpg" />
                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex justify-end space-x-3 py-4">
                <Button variant="outline" onClick={resetForm} disabled={isLoading}>
                  Cancel
                </Button>
                <Button type="submit" onClick={handleSubmit} disabled={isLoading} className="bg-brand-electric-indigo hover:bg-opacity-80">
                  {isLoading ? 'Saving...' : (currentPost ? 'Update Post' : 'Create Post')}
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
      
      <Card className="shadow-lg border-brand-sky-blue/30">
        <CardHeader>
          <CardTitle className="text-2xl text-brand-sky-blue flex items-center"><List className="mr-2 w-6 h-6"/> Existing Posts</CardTitle>
          <CardDescription>List of all blog posts. Click to edit or delete.</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading && posts.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">Loading posts...</p>
          ) : posts.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">No posts found. Click "Add New Post" to create one.</p>
          ) : (
            <ul className="space-y-3">
              {posts.map((post) => (
                <motion.li 
                  key={post.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex justify-between items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div>
                    <h3 className="font-semibold text-lg text-brand-charcoal">{post.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      Category: {post.category || 'N/A'} | Slug: {post.slug}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Created: {new Date(post.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="space-x-2 flex-shrink-0">
                    <Button variant="outline" size="sm" onClick={() => handleEdit(post)} className="text-brand-sky-blue border-brand-sky-blue hover:bg-brand-sky-blue/10">
                      <Edit2 className="w-4 h-4 mr-1" /> Edit
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(post.id)} className="bg-red-500 hover:bg-red-600">
                      <Trash2 className="w-4 h-4 mr-1" /> Delete
                    </Button>
                  </div>
                </motion.li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminBlogPage;