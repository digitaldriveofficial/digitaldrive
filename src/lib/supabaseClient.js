import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://elsonvyclqgifyegilhv.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVsc29udnljbHFnaWZ5ZWdpbGh2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgxNzI2NjksImV4cCI6MjA2Mzc0ODY2OX0.uLjt-DGNlhDjtXnD0XatmxZQpX2BTbCLoatOgE8GjMI';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);