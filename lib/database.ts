import { supabase, createAdminClient, College, Department, Faculty, Hostel, Fest, Club, Review, ForumPost, ForumReply, Poll, EntranceExam } from './supabase'

// College-related functions
export async function getColleges(filters?: {
  counseling_category?: string
  type?: string
  state?: string
  search?: string
  limit?: number
  offset?: number
}) {
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
    query = query.or(`name.ilike.%${filters.search}%,short_name.ilike.%${filters.search}%,location.ilike.%${filters.search}%`)
  }

  if (filters?.limit) {
    query = query.limit(filters.limit)
  }

  if (filters?.offset) {
    query = query.range(filters.offset, filters.offset + (filters.limit || 10) - 1)
  }

  query = query.order('nirf_rank', { ascending: true, nullsLast: true })

  const { data, error } = await query

  if (error) {
    console.error('Error fetching colleges:', error)
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
    console.error('Error fetching college:', error)
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
    console.error('Error fetching college:', error)
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
    console.error('Error creating college:', error)
    throw error
  }

  return data as College
}

// Department-related functions
export async function getDepartmentsByCollegeId(collegeId: string) {
  const { data, error } = await supabase
    .from('departments')
    .select('*')
    .eq('college_id', collegeId)
    .order('name')

  if (error) {
    console.error('Error fetching departments:', error)
    throw error
  }

  return data as Department[]
}

export async function getDepartmentById(id: string) {
  const { data, error } = await supabase
    .from('departments')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching department:', error)
    throw error
  }

  return data as Department
}

// Faculty-related functions
export async function getFacultyByDepartmentId(departmentId: string) {
  const { data, error } = await supabase
    .from('faculty')
    .select('*')
    .eq('department_id', departmentId)
    .eq('is_active', true)
    .order('name')

  if (error) {
    console.error('Error fetching faculty:', error)
    throw error
  }

  return data as Faculty[]
}

// Hostel-related functions
export async function getHostelsByCollegeId(collegeId: string) {
  const { data, error } = await supabase
    .from('hostels')
    .select('*')
    .eq('college_id', collegeId)
    .order('name')

  if (error) {
    console.error('Error fetching hostels:', error)
    throw error
  }

  return data as Hostel[]
}

// Fest-related functions
export async function getFestsByCollegeId(collegeId: string) {
  const { data, error } = await supabase
    .from('fests')
    .select('*')
    .eq('college_id', collegeId)
    .order('name')

  if (error) {
    console.error('Error fetching fests:', error)
    throw error
  }

  return data as Fest[]
}

// Club-related functions
export async function getClubsByCollegeId(collegeId: string) {
  const { data, error } = await supabase
    .from('clubs')
    .select('*')
    .eq('college_id', collegeId)
    .order('name')

  if (error) {
    console.error('Error fetching clubs:', error)
    throw error
  }

  return data as Club[]
}

// Review-related functions
export async function getReviewsByEntity(entityType: string, entityId: string, limit = 10) {
  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .eq('reviewable_type', entityType)
    .eq('reviewable_id', entityId)
    .eq('status', 'approved')
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('Error fetching reviews:', error)
    throw error
  }

  return data
}

export async function getReviewsAdmin(filters?: { status?: 'pending' | 'approved' | 'rejected' | 'flagged'; search?: string; limit?: number; offset?: number; }) {
  let query = supabase
    .from('reviews')
    .select(`
      *,
      profiles:user_id (
        full_name,
        username,
        avatar_url
      )
    `)
    .order('created_at', { ascending: false })

  if (filters?.status) {
    query = query.eq('status', filters.status)
  }
  if (filters?.search) {
    query = query.or(`title.ilike.%${filters.search}%,content.ilike.%${filters.search}%`)
  }
  if (filters?.limit) {
    query = query.limit(filters.limit)
  }
  if (filters?.offset) {
    query = query.range(filters.offset, filters.offset + (filters.limit || 10) - 1)
  }

  const { data, error } = await query
  if (error) {
    console.error('Error fetching admin reviews:', error)
    throw error
  }
  return data
}

export async function createReview(review: Omit<Review, 'id' | 'created_at' | 'updated_at' | 'helpful_count' | 'not_helpful_count' | 'status'>) {
  const { data, error } = await supabase
    .from('reviews')
    .insert([review])
    .select()
    .single()

  if (error) {
    console.error('Error creating review:', error)
    throw error
  }

  return data as Review
}

export async function getReviewById(id: string) {
  const { data, error } = await supabase
    .from('reviews')
    .select(`
      *,
      profiles:user_id (
        full_name,
        username,
        avatar_url
      )
    `)
    .eq('id', id)
    .single()
  if (error) {
    console.error('Error fetching review by id:', error)
    throw error
  }
  return data as Review
}

export async function updateReview(id: string, updates: Partial<Review>) {
  const { data, error } = await supabase
    .from('reviews')
    .update(updates)
    .eq('id', id)
    .select()
    .single()
  if (error) {
    console.error('Error updating review:', error)
    throw error
  }
  return data as Review
}

export async function updateReviewStatus(id: string, status: Review['status']) {
  const { data, error } = await supabase
    .from('reviews')
    .update({ status })
    .eq('id', id)
    .select('id, status')
    .single()
  if (error) {
    console.error('Error updating review status:', error)
    throw error
  }
  return data
}

export async function deleteReview(id: string) {
  const { error } = await supabase
    .from('reviews')
    .delete()
    .eq('id', id)
  if (error) {
    console.error('Error deleting review:', error)
    throw error
  }
  return true
}

// Faculty admin helpers
export async function getFacultyById(id: string) {
  const { data, error } = await supabase
    .from('faculty')
    .select('*')
    .eq('id', id)
    .single()
  if (error) {
    console.error('Error fetching faculty by id:', error)
    throw error
  }
  return data as Faculty
}

export async function listFaculty(filters?: { department_id?: string; search?: string; limit?: number; offset?: number; }) {
  let query = supabase
    .from('faculty')
    .select('*')
    .eq('is_active', true)
    .order('name')

  if (filters?.department_id) query = query.eq('department_id', filters.department_id)
  if (filters?.search) query = query.or(`name.ilike.%${filters.search}%,designation.ilike.%${filters.search}%`)
  if (filters?.limit) query = query.limit(filters.limit)
  if (filters?.offset) query = query.range(filters.offset, filters.offset + (filters.limit || 10) - 1)

  const { data, error } = await query
  if (error) {
    console.error('Error listing faculty:', error)
    throw error
  }
  return data as Faculty[]
}

export async function createFaculty(f: Omit<Faculty, 'id' | 'created_at' | 'updated_at' | 'rating' | 'total_reviews' | 'is_active'>) {
  const payload = { ...f, rating: 0, total_reviews: 0, is_active: true }
  const { data, error } = await supabase
    .from('faculty')
    .insert([payload])
    .select()
    .single()
  if (error) {
    console.error('Error creating faculty:', error)
    throw error
  }
  return data as Faculty
}

export async function updateFaculty(id: string, updates: Partial<Faculty>) {
  const { data, error } = await supabase
    .from('faculty')
    .update(updates)
    .eq('id', id)
    .select()
    .single()
  if (error) {
    console.error('Error updating faculty:', error)
    throw error
  }
  return data as Faculty
}

export async function deleteFaculty(id: string) {
  const { error } = await supabase
    .from('faculty')
    .delete()
    .eq('id', id)
  if (error) {
    console.error('Error deleting faculty:', error)
    throw error
  }
  return true
}

// Forum-related functions
export async function getForumPosts(filters?: {
  category?: string
  college_id?: string
  search?: string
  limit?: number
  offset?: number
}) {
  let query = supabase
    .from('forum_posts')
    .select(`
      *,
      profiles:user_id (
        full_name,
        username,
        avatar_url,
        college_id
      ),
      colleges:college_id (
        name,
        short_name
      )
    `)
    .eq('status', 'approved')

  if (filters?.category) {
    query = query.eq('category', filters.category)
  }

  if (filters?.college_id) {
    query = query.eq('college_id', filters.college_id)
  }

  if (filters?.search) {
    query = query.or(`title.ilike.%${filters.search}%,content.ilike.%${filters.search}%`)
  }

  if (filters?.limit) {
    query = query.limit(filters.limit)
  }

  if (filters?.offset) {
    query = query.range(filters.offset, filters.offset + (filters.limit || 10) - 1)
  }

  query = query.order('is_pinned', { ascending: false })
    .order('is_trending', { ascending: false })
    .order('created_at', { ascending: false })

  const { data, error } = await query

  if (error) {
    console.error('Error fetching forum posts:', error)
    throw error
  }

  return data
}

export async function createForumPost(post: Omit<ForumPost, 'id' | 'created_at' | 'updated_at' | 'upvotes' | 'downvotes' | 'total_replies' | 'is_trending' | 'is_pinned' | 'status'>) {
  const { data, error } = await supabase
    .from('forum_posts')
    .insert([post])
    .select()
    .single()

  if (error) {
    console.error('Error creating forum post:', error)
    throw error
  }

  return data as ForumPost
}

// Search function
export async function searchContent(query: string, type?: 'colleges' | 'posts') {
  const results: any = {}

  if (!supabase) {
    throw new Error('Supabase client not initialized')
  }

  if (!type || type === 'colleges') {
    const { data: colleges } = await supabase
      .from('colleges')
      .select('id, name, short_name, slug, location, logo_url, rating, nirf_rank')
      .eq('is_active', true)
      .or(`name.ilike.%${query}%,short_name.ilike.%${query}%,location.ilike.%${query}%`)
      .limit(5)

    results.colleges = colleges || []
  }

  if (!type || type === 'posts') {
    const { data: posts } = await supabase
      .from('forum_posts')
      .select('id, title, category, created_at')
      .eq('status', 'approved')
      .or(`title.ilike.%${query}%,content.ilike.%${query}%`)
      .limit(5)

    results.posts = posts || []
  }

  return results
}

// Entrance Exam functions
export async function getEntranceExams(filters?: {
  exam_type?: string
  search?: string
  limit?: number
  offset?: number
}) {
  let query = supabase
    .from('entrance_exams')
    .select('*')
    .eq('is_active', true)

  if (filters?.exam_type) {
    query = query.eq('exam_type', filters.exam_type)
  }

  if (filters?.search) {
    query = query.or(`name.ilike.%${filters.search}%,short_name.ilike.%${filters.search}%`)
  }

  if (filters?.limit) {
    query = query.limit(filters.limit)
  }

  if (filters?.offset) {
    query = query.range(filters.offset, filters.offset + (filters.limit || 10) - 1)
  }

  query = query.order('name')

  const { data, error } = await query

  if (error) {
    console.error('Error fetching entrance exams:', error)
    throw error
  }

  return data as EntranceExam[]
}

export async function getEntranceExamById(id: string) {
  const { data, error } = await supabase
    .from('entrance_exams')
    .select('*')
    .eq('id', id)
    .eq('is_active', true)
    .single()

  if (error) {
    console.error('Error fetching entrance exam:', error)
    throw error
  }

  return data as EntranceExam
}

export async function createEntranceExam(exam: Omit<EntranceExam, 'id' | 'created_at' | 'updated_at' | 'is_active'>) {
  const { data, error } = await supabase
    .from('entrance_exams')
    .insert([{ ...exam, is_active: true }])
    .select()
    .single()

  if (error) {
    console.error('Error creating entrance exam:', error)
    throw error
  }

  return data as EntranceExam
}

export async function updateEntranceExam(id: string, updates: Partial<EntranceExam>) {
  const { data, error } = await supabase
    .from('entrance_exams')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error updating entrance exam:', error)
    throw error
  }

  return data as EntranceExam
}

export async function deleteEntranceExam(id: string) {
  const { error } = await supabase
    .from('entrance_exams')
    .update({ is_active: false })
    .eq('id', id)

  if (error) {
    console.error('Error deleting entrance exam:', error)
    throw error
  }

  return true
}

// Enhanced Hostel functions
export async function createHostel(hostel: Omit<Hostel, 'id' | 'created_at' | 'updated_at' | 'rating' | 'total_reviews' | 'is_active'>) {
  const { data, error } = await supabase
    .from('hostels')
    .insert([{ ...hostel, rating: 0, total_reviews: 0, is_active: true }])
    .select()
    .single()

  if (error) {
    console.error('Error creating hostel:', error)
    throw error
  }

  return data as Hostel
}

export async function updateHostel(id: string, updates: Partial<Hostel>) {
  const { data, error } = await supabase
    .from('hostels')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error updating hostel:', error)
    throw error
  }

  return data as Hostel
}

export async function deleteHostel(id: string) {
  const { error } = await supabase
    .from('hostels')
    .update({ is_active: false })
    .eq('id', id)

  if (error) {
    console.error('Error deleting hostel:', error)
    throw error
  }

  return true
}

// Enhanced Fest functions
export async function createFest(fest: Omit<Fest, 'id' | 'created_at' | 'updated_at' | 'rating' | 'total_reviews' | 'is_active'>) {
  const { data, error } = await supabase
    .from('fests')
    .insert([{ ...fest, rating: 0, total_reviews: 0, is_active: true }])
    .select()
    .single()

  if (error) {
    console.error('Error creating fest:', error)
    throw error
  }

  return data as Fest
}

export async function updateFest(id: string, updates: Partial<Fest>) {
  const { data, error } = await supabase
    .from('fests')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error updating fest:', error)
    throw error
  }

  return data as Fest
}

export async function deleteFest(id: string) {
  const { error } = await supabase
    .from('fests')
    .update({ is_active: false })
    .eq('id', id)

  if (error) {
    console.error('Error deleting fest:', error)
    throw error
  }

  return true
}

// Enhanced Club functions
export async function createClub(club: Omit<Club, 'id' | 'created_at' | 'updated_at' | 'rating' | 'total_reviews' | 'is_active'>) {
  const { data, error } = await supabase
    .from('clubs')
    .insert([{ ...club, rating: 0, total_reviews: 0, is_active: true }])
    .select()
    .single()

  if (error) {
    console.error('Error creating club:', error)
    throw error
  }

  return data as Club
}

export async function updateClub(id: string, updates: Partial<Club>) {
  const { data, error } = await supabase
    .from('clubs')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error updating club:', error)
    throw error
  }

  return data as Club
}

export async function deleteClub(id: string) {
  const { error } = await supabase
    .from('clubs')
    .update({ is_active: false })
    .eq('id', id)

  if (error) {
    console.error('Error deleting club:', error)
    throw error
  }

  return true
}

// Poll functions
export async function getPolls(filters?: {
  college_id?: string
  status?: 'active' | 'closed' | 'draft'
  search?: string
  limit?: number
  offset?: number
}) {
  let query = supabase
    .from('polls')
    .select(`
      *,
      profiles:user_id (
        full_name,
        username,
        avatar_url
      ),
      colleges:college_id (
        name,
        short_name
      )
    `)

  if (filters?.college_id) {
    query = query.eq('college_id', filters.college_id)
  }

  if (filters?.status) {
    query = query.eq('status', filters.status)
  }

  if (filters?.search) {
    query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`)
  }

  if (filters?.limit) {
    query = query.limit(filters.limit)
  }

  if (filters?.offset) {
    query = query.range(filters.offset, filters.offset + (filters.limit || 10) - 1)
  }

  query = query.order('created_at', { ascending: false })

  const { data, error } = await query

  if (error) {
    console.error('Error fetching polls:', error)
    throw error
  }

  return data
}

export async function getPollById(id: string) {
  const { data, error } = await supabase
    .from('polls')
    .select(`
      *,
      profiles:user_id (
        full_name,
        username,
        avatar_url
      ),
      colleges:college_id (
        name,
        short_name
      )
    `)
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching poll:', error)
    throw error
  }

  return data as Poll
}

export async function createPoll(poll: Omit<Poll, 'id' | 'created_at' | 'updated_at' | 'total_votes'>) {
  const { data, error } = await supabase
    .from('polls')
    .insert([{ ...poll, total_votes: 0 }])
    .select()
    .single()

  if (error) {
    console.error('Error creating poll:', error)
    throw error
  }

  return data as Poll
}

export async function updatePoll(id: string, updates: Partial<Poll>) {
  const { data, error } = await supabase
    .from('polls')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error updating poll:', error)
    throw error
  }

  return data as Poll
}

export async function deletePoll(id: string) {
  const { error } = await supabase
    .from('polls')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting poll:', error)
    throw error
  }

  return true
}
