-- Fix RLS policies for admin operations
-- This migration adds proper RLS policies for colleges, departments, faculty, and other tables

-- Enable RLS on all tables
ALTER TABLE public.colleges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faculty ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Colleges policies
-- Allow public read access to active colleges
CREATE POLICY IF NOT EXISTS "Allow public read active colleges" ON public.colleges
  FOR SELECT USING (is_active = true);

-- Allow authenticated users to read all colleges (for admin interface)
CREATE POLICY IF NOT EXISTS "Allow authenticated read all colleges" ON public.colleges
  FOR SELECT USING (auth.role() = 'authenticated');

-- Allow service role (admin) to insert colleges
CREATE POLICY IF NOT EXISTS "Allow service role insert colleges" ON public.colleges
  FOR INSERT WITH CHECK (auth.role() = 'service_role');

-- Allow service role (admin) to update colleges
CREATE POLICY IF NOT EXISTS "Allow service role update colleges" ON public.colleges
  FOR UPDATE USING (auth.role() = 'service_role');

-- Allow service role (admin) to delete colleges
CREATE POLICY IF NOT EXISTS "Allow service role delete colleges" ON public.colleges
  FOR DELETE USING (auth.role() = 'service_role');

-- Departments policies
-- Allow public read access to departments of active colleges
CREATE POLICY IF NOT EXISTS "Allow public read departments" ON public.departments
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.colleges 
      WHERE colleges.id = departments.college_id 
      AND colleges.is_active = true
    )
  );

-- Allow service role full access to departments
CREATE POLICY IF NOT EXISTS "Allow service role all departments" ON public.departments
  FOR ALL USING (auth.role() = 'service_role');

-- Faculty policies
-- Allow public read access to active faculty
CREATE POLICY IF NOT EXISTS "Allow public read active faculty" ON public.faculty
  FOR SELECT USING (is_active = true);

-- Allow service role full access to faculty
CREATE POLICY IF NOT EXISTS "Allow service role all faculty" ON public.faculty
  FOR ALL USING (auth.role() = 'service_role');

-- Profiles policies
-- Allow users to read their own profile
CREATE POLICY IF NOT EXISTS "Allow users read own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

-- Allow users to update their own profile
CREATE POLICY IF NOT EXISTS "Allow users update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Allow service role full access to profiles
CREATE POLICY IF NOT EXISTS "Allow service role all profiles" ON public.profiles
  FOR ALL USING (auth.role() = 'service_role');

-- Reviews policies (update existing ones)
-- Drop existing policies first
DROP POLICY IF EXISTS "Allow read approved" ON public.reviews;
DROP POLICY IF EXISTS "Allow insert authenticated" ON public.reviews;
DROP POLICY IF EXISTS "Allow owner update" ON public.reviews;

-- Allow public read access to approved reviews
CREATE POLICY IF NOT EXISTS "Allow public read approved reviews" ON public.reviews
  FOR SELECT USING (status = 'approved');

-- Allow authenticated users to insert reviews
CREATE POLICY IF NOT EXISTS "Allow authenticated insert reviews" ON public.reviews
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Allow users to update their own reviews
CREATE POLICY IF NOT EXISTS "Allow users update own reviews" ON public.reviews
  FOR UPDATE USING (auth.uid() = user_id);

-- Allow service role full access to reviews (for moderation)
CREATE POLICY IF NOT EXISTS "Allow service role all reviews" ON public.reviews
  FOR ALL USING (auth.role() = 'service_role');
