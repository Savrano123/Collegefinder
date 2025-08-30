const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = 'https://hjsqbvxiwjbqdteydwsj.supabase.co'
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'your-service-role-key-here'

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

async function createAdminUser() {
  try {
    // Create user in auth.users
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: 'admin@collegehub.com',
      password: 'admin123',
      email_confirm: true,
      user_metadata: {
        full_name: 'Admin User',
        role: 'admin'
      }
    })

    if (authError) {
      throw new Error(`Error creating auth user: ${authError.message}`)
    }

    // Create profile
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .insert({
        id: authData.user.id,
        email: 'admin@collegehub.com',
        full_name: 'Admin User',
        username: 'admin',
        role: 'admin',
        is_verified: true
      })

    if (profileError) {
      throw new Error(`Error creating profile: ${profileError.message}`)
    }

    return {
      success: true,
      message: 'Admin user created successfully!',
      credentials: {
        email: 'admin@collegehub.com',
        password: 'admin123'
      }
    }

  } catch (error) {
    return {
      success: false,
      error: error.message
    }
  }
}

createAdminUser()
