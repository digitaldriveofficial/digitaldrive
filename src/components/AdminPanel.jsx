import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Eye, Trash2, Edit3, ExternalLink, Image, FilePlus2, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PageEditor from '@/components/PageEditor';
import TileEditor from '@/components/TileEditor';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from '@/contexts/AuthContext';

const AdminPanel = ({
  pages,
  onPreviewPage,
  onCreatePage,
  onUpdatePage,
  onDeletePage,
  onAddTile,
  onUpdateTile,
  onDeleteTile,
}) => {
  const [currentPage, setCurrentPage] = useState(null);
  const [showPageEditor, setShowPageEditor] = useState(false);
  const [editingPage, setEditingPage] = useState(null);
  const [showTileEditor, setShowTileEditor] = useState(false);
  const [editingTile, setEditingTile] = useState(null);

  useEffect(() => {
    if (currentPage) {
      const updatedCurrentPage = pages.find(p => p.id === currentPage.id);
      setCurrentPage(updatedCurrentPage || null);
    } else if (pages.length > 0 && !currentPage) {
      setCurrentPage(pages[0]);
    }
  }, [pages, currentPage]);

  const handleEditPage = (page) => {
    setEditingPage(page);
    setShowPageEditor(true);
  };

  const handleSavePage = (pageData) => {
    if (editingPage) {
      onUpdatePage(editingPage.id, pageData);
    } else {
      onCreatePage(pageData);
    }
    setShowPageEditor(false);
    setEditingPage(null);
  };

  const handleSaveTile = (tileData) => {
    if (!currentPage) return;
    if (editingTile) {
      onUpdateTile(currentPage.id, editingTile.id, tileData);
    } else {
      onAddTile(currentPage.id, tileData);
    }
    setShowTileEditor(false);
    setEditingTile(null);
  };

  const handleDeleteTile = (tileId) => {
    if (!currentPage) return;
    onDeleteTile(currentPage.id, tileId);
  };

  const handleEditTile = (tile) => {
    setEditingTile(tile);
    setShowTileEditor(true);
  };

  const handleDeletePage = (pageId) => {
    if (currentPage?.id === pageId) {
      setCurrentPage(null);
    }
    onDeletePage(pageId);
  };

  const handleSelectPage = (pageId) => {
    const page = pages.find(p => p.id === pageId);
    setCurrentPage(page);
  };

  const { signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex justify-between items-center mb-8">
            <div></div>
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                Digital Drive Admin Panel
              </h1>
              <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                Create stunning product, blog, and talent pages with dynamic tiles and seamless linking
              </p>
            </div>
            <Button
              onClick={handleSignOut}
              variant="ghost"
              className="text-white hover:bg-white/10"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 mb-8"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <h2 className="text-2xl font-bold text-white flex-shrink-0">Select Page</h2>
              <Select onValueChange={handleSelectPage} value={currentPage?.id || ""}>
                <SelectTrigger className="w-full sm:w-[250px] bg-white/10 border-white/20 text-white placeholder:text-blue-200">
                  <SelectValue placeholder="Choose a page to edit..." />
                </SelectTrigger>
                <SelectContent>
                  {pages.length > 0 ? (
                    pages.map((page) => (
                      <SelectItem key={page.id} value={page.id}>
                        {page.title}
                      </SelectItem>
                    ))
                  ) : (
                    <div className="p-4 text-center text-sm text-gray-500">No pages yet.</div>
                  )}
                </SelectContent>
              </Select>
            </div>
            <Button
              onClick={() => { setEditingPage(null); setShowPageEditor(true); }}
              className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white w-full sm:w-auto"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Page
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {currentPage ? (
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-white">{currentPage.title}</h2>
                  <p className="text-blue-200 capitalize">{currentPage.type} Page</p>
                </div>
                <div className="flex gap-3 flex-shrink-0">
                  <Button onClick={() => handleEditPage(currentPage)} className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white">
                    <Edit3 className="w-4 h-4 mr-2" />
                    Edit Page
                  </Button>
                  <Button onClick={() => onPreviewPage(currentPage)} className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white">
                    <Eye className="w-4 h-4 mr-2" />
                    Preview
                  </Button>
                  <Button onClick={() => { setEditingTile(null); setShowTileEditor(true); }} className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Tile
                  </Button>
                  <Button size="icon" variant="destructive" onClick={() => handleDeletePage(currentPage.id)} className="bg-red-500/80 hover:bg-red-500">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {currentPage.tiles.map((tile) => (
                  <motion.div key={tile.id} whileHover={{ scale: 1.02 }} className="bg-white/5 rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-all">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-white mb-1">{tile.title}</h3>
                        <p className="text-sm text-blue-200 line-clamp-2">{tile.description}</p>
                      </div>
                      <div className="flex gap-2 ml-3">
                        <Button size="sm" variant="ghost" onClick={() => handleEditTile(tile)} className="text-white hover:bg-white/10">
                          <Edit3 className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => handleDeleteTile(tile.id)} className="text-red-300 hover:bg-red-500/20">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    {tile.image_url && (<div className="mb-3"><img src={tile.image_url} alt={tile.title} className="w-full h-32 object-cover rounded-lg" /></div>)}
                    {tile.link_url && (<div className="flex items-center text-cyan-300 text-sm"><ExternalLink className="w-4 h-4 mr-1" /><span className="truncate">{tile.link_url}</span></div>)}
                  </motion.div>
                ))}
                {currentPage.tiles.length === 0 && (
                  <div className="md:col-span-2 lg:col-span-3 text-center py-12">
                    <Image className="w-16 h-16 text-blue-300 mx-auto mb-4" />
                    <p className="text-blue-200 text-lg">No tiles added yet</p>
                    <p className="text-blue-300 mb-6">Add your first tile to start building your page</p>
                    <Button onClick={() => { setEditingTile(null); setShowTileEditor(true); }} className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white">
                      <Plus className="w-4 h-4 mr-2" />
                      Add First Tile
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-12 border border-white/20 text-center">
              <FilePlus2 className="w-20 h-20 text-blue-300 mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-white mb-4">Select or Create a Page</h2>
              <p className="text-blue-200 mb-6">Choose a page from the dropdown above or create a new one to begin</p>
              <Button onClick={() => { setEditingPage(null); setShowPageEditor(true); }} className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Create New Page
              </Button>
            </div>
          )}
        </motion.div>
      </div>

      {showPageEditor && (
        <PageEditor
          pageToEdit={editingPage}
          onSave={handleSavePage}
          onClose={() => { setShowPageEditor(false); setEditingPage(null); }}
        />
      )}

      {showTileEditor && (
        <TileEditor
          tile={editingTile}
          onSave={handleSaveTile}
          onClose={() => { setShowTileEditor(false); setEditingTile(null); }}
        />
      )}
    </div>
  );
};

export default AdminPanel;