import { supabase, Review } from '../supabase'

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
    throw error
  }

  return data
}

export async function getReviewsAdmin(filters?: { 
  status?: 'pending' | 'approved' | 'rejected' | 'flagged'
  search?: string
  limit?: number
  offset?: number
}) {
  let query = supabase
    .from('reviews')
    .select(`
      *,
      profiles:user_id (
        full_name,
        username
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
    query = query.range(filters.offset, (filters.offset + (filters.limit || 10)) - 1)
  }

  const { data, error } = await query

  if (error) {
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
        username
      )
    `)
    .eq('id', id)
    .single()

  if (error) {
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
    throw error
  }
  return true
}
