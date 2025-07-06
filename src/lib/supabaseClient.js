import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://moeclhobbvkqhiyroqvk.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1vZWNsaG9iYnZrcWhpeXJvcXZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE2NjY4OTYsImV4cCI6MjA2NzI0Mjg5Nn0.glNuh2ri_P3d9mNCyKcjQvz_Ry-n-CAVrMzcWSV6OTg';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
