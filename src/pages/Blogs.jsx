import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { pagesService, tilesService } from '../lib/pagesService';

const Blogs = () => {
  const  pageId  = "a483dd6d-2da8-45eb-88cf-aebcf25d1715";
  const [page, setPage] = useState(null);
  const [tiles, setTiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPageData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch page data
        const pageData = await pagesService.getPublicPageById(pageId);
        setPage(pageData);
        
        // Fetch tiles for the page
        const tilesData = await tilesService.getPublicTiles(pageId);
        setTiles(tilesData);
      } catch (err) {
        console.error('Error fetching page data:', err);
        setError('Failed to load page data');
      } finally {
        setLoading(false);
      }
    };

    if (pageId) {
      fetchPageData();
    }
  }, [pageId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading page...</p>
        </div>
      </div>
    );
  }

  if (error || !page) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-red-500 mb-4">404 - Page Not Found</h1>
          <p className="text-gray-600">The page you are looking for does not exist.</p>
          <Link to="/admin" className="mt-6 inline-block bg-blue-500 text-white px-6 py-2 rounded-lg">
            Go to Admin Panel
          </Link>
        </div>
      </div>
    );
  }

  const handleTileClick = (tile) => {
    if (tile.link_url) {
      if (tile.link_type === 'external') {
        window.open(tile.link_url, '_blank');
      }
    }
  };

  return (
    <div className="min-h-screen" style={{ 
      background: `linear-gradient(135deg, ${page.header_color}20, ${page.accent_color}20)` 
    }}>
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
          style={{ color: page.header_color }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4">{page.title}</h1>
          {page.description && (
            <p className="text-xl max-w-2xl mx-auto opacity-80">{page.description}</p>
          )}
        </motion.div>

        {page.feature_image && (
          <motion.div 
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <img
              src={page.feature_image}
              alt={page.title}
              className="w-full max-h-[400px] object-cover rounded-2xl shadow-lg"
            />
          </motion.div>
        )}

        {tiles.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {tiles.map((tile, index) => {
              const TileContent = () => (
                <motion.div
                  key={tile.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden group h-full flex flex-col"
                >
                  {tile.image_url && (
                    <div className="aspect-video overflow-hidden">
                      <img 
                        src={tile.image_url} 
                        alt={tile.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  )}
                  
                  <div className="p-6 flex-grow flex flex-col">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {tile.title}
                    </h3>
                    {tile.description && (
                      <p className="text-gray-600 mb-4 line-clamp-3 flex-grow">{tile.description}</p>
                    )}
                    
                    {tile.link_url && (
                      <div className="flex items-center justify-between mt-auto pt-4">
                        <span 
                          className="text-sm font-medium px-3 py-1 rounded-full"
                          style={{ 
                            backgroundColor: `${page.accent_color}20`,
                            color: page.accent_color 
                          }}
                        >
                          {tile.link_type === 'external' ? 'External Link' : 'Internal Page'}
                        </span>
                        <ExternalLink 
                          className="w-5 h-5 opacity-50 group-hover:opacity-100 transition-opacity"
                          style={{ color: page.accent_color }}
                        />
                      </div>
                    )}
                  </div>
                </motion.div>
              );

              if (tile.link_url && tile.link_type === 'internal') {
                return <Link to={tile.link_url} className="block h-full"><TileContent /></Link>;
              }
              
              return <div onClick={() => handleTileClick(tile)} className="cursor-pointer h-full"><TileContent /></div>;
            })}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="text-6xl mb-4">📄</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No Tiles Added</h2>
            <p className="text-gray-600">This page doesn't have any tiles yet.</p>
          </motion.div>
        )}
      </div>
        
     
    </div>
  );
};

export default Blogs;