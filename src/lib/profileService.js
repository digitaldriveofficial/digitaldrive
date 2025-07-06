import { supabase } from './supabaseClient';

export const profileService = {
  // Get user profile with role
  async getUserProfile(userId) {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching user profile:', error);
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Error in getUserProfile:', error);
      throw error;
    }
  },

  // Check if user has builder-admin role
  async isBuilderAdmin(userId) {
    try {
      const profile = await this.getUserProfile(userId);
      return profile?.role === 'builder-admin';
    } catch (error) {
      console.error('Error checking builder-admin role:', error);
      return false;
    }
  },

  
}; 