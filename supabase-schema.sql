-- Create pages table
CREATE TABLE IF NOT EXISTS pages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  type TEXT DEFAULT 'product',
  description TEXT,
  header_color TEXT DEFAULT '#4F46E5',
  accent_color TEXT DEFAULT '#06B6D4',
  feature_image TEXT,
  feature_image_link TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create tiles table
CREATE TABLE IF NOT EXISTS tiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  page_id UUID REFERENCES pages(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  link_url TEXT,
  link_type TEXT DEFAULT 'external',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create profiles table for role-based authentication
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  role TEXT DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE tiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for pages
CREATE POLICY "Users can view their own pages" ON pages
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Public can view all pages" ON pages
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own pages" ON pages
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own pages" ON pages
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own pages" ON pages
  FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for tiles
CREATE POLICY "Users can view their own tiles" ON tiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Public can view all tiles" ON tiles
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own tiles" ON tiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own tiles" ON tiles
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own tiles" ON tiles
  FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for profiles
CREATE POLICY "Users can view their own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_pages_user_id ON pages(user_id);
CREATE INDEX IF NOT EXISTS idx_pages_created_at ON pages(created_at);
CREATE INDEX IF NOT EXISTS idx_tiles_page_id ON tiles(page_id);
CREATE INDEX IF NOT EXISTS idx_tiles_user_id ON tiles(user_id);
CREATE INDEX IF NOT EXISTS idx_tiles_created_at ON tiles(created_at);
CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers to automatically update updated_at
CREATE TRIGGER update_pages_updated_at BEFORE UPDATE ON pages
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tiles_updated_at BEFORE UPDATE ON tiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create function to handle new user signup and create profile
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name', 'user');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to automatically create profile on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- -- After creating a new user from authentication, update the role to builder-admin
-- update profiles set role = 'builder-admin' where id = '8abeabf3-d4b5-4c82-b1aa-8607ef60dcac';