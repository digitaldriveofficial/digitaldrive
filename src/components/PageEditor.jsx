
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, FileText, ShoppingBag, Users, Link } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const PageEditor = ({ pageToEdit, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    type: 'product',
    description: '',
    header_color: '#4F46E5',
    accent_color: '#06B6D4',
    feature_image: '',
    feature_image_link: ''
  });

  useEffect(() => {
    if (pageToEdit) {
      setFormData({
        title: pageToEdit.title || '',
        type: pageToEdit.type || 'product',
        description: pageToEdit.description || '',
        header_color: pageToEdit.header_color || '#4F46E5',
        accent_color: pageToEdit.accent_color || '#06B6D4',
        feature_image: pageToEdit.feature_image || '',
        feature_image_link: pageToEdit.feature_image_link || ''
      });
    }
  }, [pageToEdit]);

  const pageTypes = [
    { value: 'product', label: 'Product Page', icon: ShoppingBag },
    { value: 'blog', label: 'Blog Page', icon: FileText },
    { value: 'talent', label: 'Talent Page', icon: Users }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;
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
        className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">{pageToEdit ? 'Edit Page' : 'Create New Page'}</h2>
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
            <Label htmlFor="title" className="text-gray-700 font-medium">Page Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Enter page title..."
              className="mt-2"
              required
            />
          </div>

          <div>
            <Label className="text-gray-700 font-medium">Page Type</Label>
            <div className="grid grid-cols-3 gap-3 mt-2">
              {pageTypes.map((type) => {
                const Icon = type.icon;
                return (
                  <button
                    key={type.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, type: type.value })}
                    className={`p-3 rounded-xl border-2 transition-all text-center ${
                      formData.type === type.value
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-gray-300 text-gray-600'
                    }`}
                  >
                    <Icon className="w-6 h-6 mx-auto mb-1" />
                    <span className="text-xs font-medium">{type.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <Label htmlFor="description" className="text-gray-700 font-medium">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Brief description of your page..."
              className="mt-2"
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="feature_image" className="text-gray-700 font-medium">Feature Image URL</Label>
            <Input
              id="feature_image"
              value={formData.feature_image}
              onChange={(e) => setFormData({ ...formData, feature_image: e.target.value })}
              placeholder="https://example.com/image.jpg"
              className="mt-2"
            />
            {formData.feature_image && (
              <div className="mt-3">
                <img
                  src={formData.feature_image}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded-lg border"
                />
              </div>
            )}
          </div>

          <div>
            <Label htmlFor="feature_image_link" className="text-gray-700 font-medium flex items-center">
              <Link className="w-4 h-4 mr-2" />
              Feature Image Link
            </Label>
            <Input
              id="feature_image_link"
              value={formData.feature_image_link}
              onChange={(e) => setFormData({ ...formData, feature_image_link: e.target.value })}
              placeholder="https://example.com"
              className="mt-2"
            />
            <p className="text-sm text-gray-500 mt-1">Optional: Make the feature image a clickable link.</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="header_color" className="text-gray-700 font-medium">Header Color</Label>
              <div className="flex items-center gap-2 mt-2">
                <input
                  type="color"
                  id="header_color"
                  value={formData.header_color}
                  onChange={(e) => setFormData({ ...formData, header_color: e.target.value })}
                  className="w-12 h-10 rounded-lg border border-gray-300"
                />
                <Input
                  value={formData.header_color}
                  onChange={(e) => setFormData({ ...formData, header_color: e.target.value })}
                  className="flex-1"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="accent_color" className="text-gray-700 font-medium">Accent Color</Label>
              <div className="flex items-center gap-2 mt-2">
                <input
                  type="color"
                  id="accent_color"
                  value={formData.accent_color}
                  onChange={(e) => setFormData({ ...formData, accent_color: e.target.value })}
                  className="w-12 h-10 rounded-lg border border-gray-300"
                />
                <Input
                  value={formData.accent_color}
                  onChange={(e) => setFormData({ ...formData, accent_color: e.target.value })}
                  className="flex-1"
                />
              </div>
            </div>
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
              className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
            >
              {pageToEdit ? 'Update Page' : 'Create Page'}
            </Button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default PageEditor;
