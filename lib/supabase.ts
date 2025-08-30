import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Public client for general use
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Admin client factory function (server-side only)
export function createAdminClient() {
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  })
}

// Database types
export interface College {
  id: string
  name: string
  short_name?: string
  slug: string
  description?: string
  type: 'government' | 'private' | 'deemed'
  counseling_categories: string[]
  established?: number
  location: string
  state: string
  city: string
  pincode?: string
  website?: string
  phone?: string
  email?: string
  logo_url?: string
  banner_url?: string
  nirf_rank?: number
  rating: number
  total_reviews: number
  total_students?: number
  total_faculty?: number
  total_departments?: number
  placement_rate?: number
  average_package?: string
  highest_package?: string
  annual_fees?: string
  highlights?: string[]
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Department {
  id: string
  college_id: string
  name: string
  short_name?: string
  description?: string
  total_students: number
  total_faculty: number
  rating: number
  total_reviews: number
  labs?: string[]
  collaborations?: string[]
  accreditations?: string[]
  created_at: string
  updated_at: string
}

export interface Faculty {
  id: string
  department_id: string
  name: string
  designation?: string
  qualification?: string
  specialization?: string[]
  research_areas?: string[]
  experience_years?: number
  email?: string
  phone?: string
  image_url?: string
  rating: number
  total_reviews: number
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Hostel {
  id: string
  college_id: string
  name: string
  type: 'boys' | 'girls' | 'mixed'
  capacity: number
  available_rooms: number
  room_types: Array<{
    type: string
    price: string
    amenities: string[]
  }>
  amenities: string[]
  rules?: string
  entry_timings?: string
  exit_timings?: string
  mess_available: boolean
  mess_timings: {
    breakfast?: string
    lunch?: string
    snacks?: string
    dinner?: string
  }
  weekly_menu: Record<string, string[]>
  nearby_facilities: string[]
  images: string[]
  rating: number
  total_reviews: number
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Fest {
  id: string
  college_id: string
  name: string
  description?: string
  type: 'technical' | 'cultural' | 'sports' | 'mixed'
  duration_days: number
  typical_dates?: string
  budget_range?: string
  events: Array<{
    name: string
    description: string
    category: string
    prizes?: string[]
  }>
  highlights: string[]
  celebrity_visits: string[]
  participation_guidelines?: string
  registration_process?: string
  images: string[]
  videos: string[]
  website_url?: string
  social_media: Record<string, string>
  rating: number
  total_reviews: number
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Club {
  id: string
  college_id: string
  name: string
  description?: string
  category: 'technical' | 'cultural' | 'sports' | 'social' | 'academic' | 'entrepreneurship' | 'other'
  membership_requirements?: string
  application_process?: string
  meeting_frequency?: string
  meeting_schedule?: string
  activities: string[]
  achievements: string[]
  projects: Array<{
    name: string
    description: string
    status: string
    year?: string
  }>
  leadership_structure: Record<string, string>
  contact_info: Record<string, string>
  membership_count: number
  images: string[]
  website_url?: string
  social_media: Record<string, string>
  rating: number
  total_reviews: number
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Profile {
  id: string
  email: string
  full_name?: string
  username?: string
  role: 'student' | 'moderator' | 'admin'
  college_id?: string
  graduation_year?: number
  branch?: string
  bio?: string
  avatar_url?: string
  is_verified: boolean
  created_at: string
  updated_at: string
}

export interface Review {
  id: string
  user_id?: string | null
  reviewable_type: string
  reviewable_id: string
  rating: number
  title?: string
  content: string
  pros?: string[]
  cons?: string[]
  tags?: string[]
  helpful_count: number
  not_helpful_count: number
  status: 'pending' | 'approved' | 'rejected' | 'flagged'
  is_anonymous: boolean
  created_at: string
  updated_at: string
}

export interface EntranceExam {
  id: string
  name: string
  short_name?: string
  description?: string
  conducting_body?: string
  exam_type: 'national' | 'state' | 'university' | 'college'
  subjects: string[]
  exam_pattern: {
    duration?: string
    questions?: number
    marking_scheme?: string
  }
  eligibility_criteria?: string
  application_process?: string
  important_dates: {
    application_start?: string
    application_end?: string
    exam_date?: string
    result_date?: string
  }
  exam_centers: string[]
  fees_structure: Record<string, string>
  syllabus_url?: string
  official_website?: string
  preparation_tips: string[]
  counseling_process?: string
  participating_colleges: number
  total_seats: number
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface ForumPost {
  id: string
  user_id?: string
  college_id?: string
  title: string
  content: string
  category: 'general' | 'admissions' | 'placements' | 'campus_life' | 'academics' | 'hostels' | 'fests' | 'clubs' | 'comparison' | 'exam_prep'
  tags: string[]
  upvotes: number
  downvotes: number
  reply_count: number
  view_count: number
  is_pinned: boolean
  is_locked: boolean
  status: 'pending' | 'approved' | 'rejected' | 'flagged'
  created_at: string
  updated_at: string
}

export interface ForumReply {
  id: string
  post_id: string
  user_id?: string
  parent_reply_id?: string
  content: string
  upvotes: number
  downvotes: number
  is_accepted_answer: boolean
  status: 'pending' | 'approved' | 'rejected' | 'flagged'
  created_at: string
  updated_at: string
}

export interface Poll {
  id: string
  user_id?: string
  college_id?: string
  title: string
  description?: string
  poll_type: 'single_choice' | 'multiple_choice' | 'rating' | 'yes_no'
  options: Array<{
    id: string
    text: string
    votes: number
  }>
  total_votes: number
  is_anonymous: boolean
  expires_at?: string
  status: 'active' | 'closed' | 'draft'
  created_at: string
  updated_at: string
}
