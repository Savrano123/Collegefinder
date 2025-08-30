import { supabase, createAdminClient, College } from '../supabase'

// College-related functions
export async function getColleges(filters?: {
  counseling_category?: string
  type?: string
  state?: string
  search?: string
  limit?: number
  offset?: number
}) {
  if (!supabase) {
    throw new Error('Supabase client not initialized')
  }

  let query = supabase
    .from('colleges')
    .select('*')
    .eq('is_active', true)

  if (filters?.counseling_category) {
    query = query.contains('counseling_categories', [filters.counseling_category])
  }

  if (filters?.type) {
    query = query.eq('type', filters.type)
  }

  if (filters?.state) {
    query = query.eq('state', filters.state)
  }

  if (filters?.search) {
    query = query.or(`name.ilike.%${filters.search}%,location.ilike.%${filters.search}%`)
  }

  if (filters?.limit) {
    query = query.limit(filters.limit)
  }

  if (filters?.offset) {
    query = query.range(filters.offset, (filters.offset + (filters.limit || 10)) - 1)
  }

  query = query.order('nirf_rank', { ascending: true, nullsLast: true })

  const { data, error } = await query

  if (error) {
    throw error
  }

  return data as College[]
}

export async function getCollegeBySlug(slug: string) {
  const { data, error } = await supabase
    .from('colleges')
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .single()

  if (error) {
    throw error
  }

  return data as College
}

export async function getCollegeById(id: string) {
  const { data, error } = await supabase
    .from('colleges')
    .select('*')
    .eq('id', id)
    .eq('is_active', true)
    .single()

  if (error) {
    throw error
  }

  return data as College
}

export async function createCollege(college: Omit<College, 'id' | 'created_at' | 'updated_at' | 'rating' | 'total_reviews' | 'is_active'>) {
  // Generate slug from name
  const slug = college.name.toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()

  const payload = {
    ...college,
    slug,
    rating: 0,
    total_reviews: 0,
    is_active: true
  }

  // Use admin client for college creation
  const adminClient = createAdminClient()
  const { data, error } = await adminClient
    .from('colleges')
    .insert([payload])
    .select()
    .single()

  if (error) {
    throw error
  }

  return data as College
}
