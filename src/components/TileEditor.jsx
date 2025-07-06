
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, ExternalLink, Link } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';

const TileEditor = ({ tile, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image_url: '',
    link_url: '',
    link_type: 'external'
  });

  useEffect(() => {
    if (tile) {
      setFormData({
        title: tile.title || '',
        description: tile.description || '',
        image_url: tile.image_url || '',
        link_url: tile.link_url || '',
        link_type: tile.link_type || 'external'
      });
    }
  }, [tile]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      toast({
        variant: "destructive",
        title: "Title Required! 📝",
        description: "Please enter a title for your tile."
      });
      return;
    }
    onSave(formData);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {tile ? 'Edit Tile' : 'Add New Tile'}
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="title" className="text-gray-700 font-medium">Tile Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Enter tile title..."
              className="mt-2"
              required
            />
          </div>

          <div>
            <Label htmlFor="description" className="text-gray-700 font-medium">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Brief description of this tile..."
              className="mt-2"
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="image_url" className="text-gray-700 font-medium">Image URL</Label>
            <Input
              id="image_url"
              value={formData.image_url}
              onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
              placeholder="https://example.com/image.jpg"
              className="mt-2"
            />
            {formData.image_url && (
              <div className="mt-3">
                <img 
                  src={formData.image_url} 
                  alt="Preview"
                  className="w-full h-32 object-cover rounded-lg border"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
            )}
          </div>

          <div>
            <Label className="text-gray-700 font-medium">Link Type</Label>
            <div className="grid grid-cols-2 gap-3 mt-2">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, link_type: 'external' })}
                className={`p-3 rounded-xl border-2 transition-all text-center ${
                  formData.link_type === 'external'
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-gray-300 text-gray-600'
                }`}
              >
                <ExternalLink className="w-5 h-5 mx-auto mb-1" />
                <span className="text-sm font-medium">External URL</span>
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, link_type: 'internal' })}
                className={`p-3 rounded-xl border-2 transition-all text-center ${
                  formData.link_type === 'internal'
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-gray-300 text-gray-600'
                }`}
              >
                <Link className="w-5 h-5 mx-auto mb-1" />
                <span className="text-sm font-medium">Internal Page</span>
              </button>
            </div>
          </div>

          <div>
            <Label htmlFor="link_url" className="text-gray-700 font-medium">
              {formData.link_type === 'external' ? 'External URL' : 'Internal Page Path'}
            </Label>
            <Input
              id="link_url"
              value={formData.link_url}
              onChange={(e) => setFormData({ ...formData, link_url: e.target.value })}
              placeholder={
                formData.link_type === 'external' 
                  ? "https://example.com" 
                  : "/page/your-page-id"
              }
              className="mt-2"
            />
            <p className="text-sm text-gray-500 mt-1">
              {formData.link_type === 'external' 
                ? 'Enter the full URL including https://' 
                : 'Enter the path like /page/your-page-id'
              }
            </p>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white"
            >
              {tile ? 'Update Tile' : 'Add Tile'}
            </Button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default TileEditor;
