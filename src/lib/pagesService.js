import { supabase } from './supabaseClient';

// Pages table operations
export const pagesService = {
  // Get all pages for the current user
  async getPages(userId) {
    try {
      const { data, error } = await supabase
        .from('pages')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching pages:', error);
        throw error;
      }

      return data || [];
    } catch (error) {
      console.error('Error in getPages:', error);
      throw error;
    }
  },

  // Create a new page
  async createPage(pageData, userId) {
    try {
      const { data, error } = await supabase
        .from('pages')
        .insert([
          {
            user_id: userId,
            title: pageData.title,
            type: pageData.type,
            description: pageData.description,
            header_color: pageData.header_color,
            accent_color: pageData.accent_color,
            feature_image: pageData.feature_image,
            feature_image_link: pageData.feature_image_link,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }
        ])
        .select()
        .single();

      if (error) {
        console.error('Error creating page:', error);
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Error in createPage:', error);
      throw error;
    }
  },

  // Update an existing page
  async updatePage(pageId, pageData, userId) {
    try {
      const { data, error } = await supabase
        .from('pages')
        .update({
          title: pageData.title,
          type: pageData.type,
          description: pageData.description,
          header_color: pageData.header_color,
          accent_color: pageData.accent_color,
          feature_image: pageData.feature_image,
          feature_image_link: pageData.feature_image_link,
          updated_at: new Date().toISOString()
        })
        .eq('id', pageId)
        .eq('user_id', userId)
        .select()
        .single();

      if (error) {
        console.error('Error updating page:', error);
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Error in updatePage:', error);
      throw error;
    }
  },

  // Delete a page
  async deletePage(pageId, userId) {
    try {
      const { error } = await supabase
        .from('pages')
        .delete()
        .eq('id', pageId)
        .eq('user_id', userId);

      if (error) {
        console.error('Error deleting page:', error);
        throw error;
      }

      return true;
    } catch (error) {
      console.error('Error in deletePage:', error);
      throw error;
    }
  },

  // Get a single page by ID
  async getPageById(pageId, userId) {
    try {
      const { data, error } = await supabase
        .from('pages')
        .select('*')
        .eq('id', pageId)
        .eq('user_id', userId)
        .single();

      if (error) {
        console.error('Error fetching page:', error);
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Error in getPageById:', error);
      throw error;
    }
  },

  // Get a single page by ID (public access - no authentication required)
  async getPublicPageById(pageId) {
    try {
      const { data, error } = await supabase
        .from('pages')
        .select('*')
        .eq('id', pageId)
        .single();

      if (error) {
        console.error('Error fetching public page:', error);
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Error in getPublicPageById:', error);
      throw error;
    }
  }
};

// Tiles table operations
export const tilesService = {
  // Get all tiles for a page
  async getTiles(pageId, userId) {
    try {
      const { data, error } = await supabase
        .from('tiles')
        .select('*')
        .eq('page_id', pageId)
        .eq('user_id', userId)
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching tiles:', error);
        throw error;
      }

      return data || [];
    } catch (error) {
      console.error('Error in getTiles:', error);
      throw error;
    }
  },

  // Get all tiles for a page (public access - no authentication required)
  async getPublicTiles(pageId) {
    try {
      const { data, error } = await supabase
        .from('tiles')
        .select('*')
        .eq('page_id', pageId)
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching public tiles:', error);
        throw error;
      }

      return data || [];
    } catch (error) {
      console.error('Error in getPublicTiles:', error);
      throw error;
    }
  },

  // Create a new tile
  async createTile(tileData, pageId, userId) {
    try {
      const { data, error } = await supabase
        .from('tiles')
        .insert([
          {
            title: tileData.title,
            description: tileData.description,
            image_url: tileData.image_url,
            link_url: tileData.link_url,
            link_type: tileData.link_type,
            page_id: pageId,
            user_id: userId,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }
        ])
        .select()
        .single();

      if (error) {
        console.error('Error creating tile:', error);
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Error in createTile:', error);
      throw error;
    }
  },

  // Update an existing tile
  async updateTile(tileId, tileData, pageId, userId) {
    try {
      const { data, error } = await supabase
        .from('tiles')
        .update({
          ...tileData,
          updated_at: new Date().toISOString()
        })
        .eq('id', tileId)
        .eq('page_id', pageId)
        .eq('user_id', userId)
        .select()
        .single();

      if (error) {
        console.error('Error updating tile:', error);
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Error in updateTile:', error);
      throw error;
    }
  },

  // Delete a tile
  async deleteTile(tileId, pageId, userId) {
    try {
      const { error } = await supabase
        .from('tiles')
        .delete()
        .eq('id', tileId)
        .eq('page_id', pageId)
        .eq('user_id', userId);

      if (error) {
        console.error('Error deleting tile:', error);
        throw error;
      }

      return true;
    } catch (error) {
      console.error('Error in deleteTile:', error);
      throw error;
    }
  }
}; 