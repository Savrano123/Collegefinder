import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate required fields
    const { name, description, type, location, state, city } = body
    
    if (!name || !description || !type || !location || !state || !city) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Generate slug from name
    const slug = name.toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()

    const payload = {
      name,
      short_name: body.short_name || null,
      slug,
      description,
      type,
      counseling_categories: body.counseling_categories || [],
      established: body.established || null,
      location,
      state,
      city,
      pincode: body.pincode || null,
      website: body.website || null,
      phone: body.phone || null,
      email: body.email || null,
      logo_url: body.logo_url || null,
      banner_url: body.banner_url || null,
      nirf_rank: body.nirf_rank || null,
      total_students: body.total_students || null,
      total_faculty: body.total_faculty || null,
      total_departments: body.total_departments || null,
      placement_rate: body.placement_rate || null,
      average_package: body.average_package || null,
      highest_package: body.highest_package || null,
      annual_fees: body.annual_fees || null,
      highlights: body.highlights || [],
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
      return NextResponse.json(
        { error: 'Failed to create college' },
        { status: 500 }
      )
    }

    return NextResponse.json({ data }, { status: 201 })
  } catch (error) {
    console.error('Error in college creation API:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
