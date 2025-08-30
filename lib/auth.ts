"use client"

import React, { createContext, useContext, useEffect, useState } from "react"
import { User } from "@supabase/supabase-js"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"

interface Profile {
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

interface AuthContextType {
  user: User | null
  profile: Profile | null
  loading: boolean
  signOut: () => Promise<void>
  isAdmin: boolean
  isModerator: boolean
  hasAdminAccess: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check for development session first
    const checkDevSession = () => {
      const devSession = localStorage.getItem('dev_admin_session')
      if (devSession) {
        try {
          const devProfile = JSON.parse(devSession)
          setProfile(devProfile)
          // Create a mock user object
          setUser({
            id: devProfile.id,
            email: devProfile.email,
            created_at: devProfile.created_at,
            updated_at: devProfile.updated_at,
            aud: 'authenticated',
            role: 'authenticated'
          } as User)
          setLoading(false)
          return true
        } catch (error) {
          console.error('Error parsing dev session:', error)
          localStorage.removeItem('dev_admin_session')
        }
      }
      return false
    }

    // Get initial session
    const getInitialSession = async () => {
      // Check dev session first
      if (checkDevSession()) {
        return
      }

      const { data: { session } } = await supabase.auth.getSession()
      if (session?.user) {
        setUser(session.user)
        await fetchProfile(session.user.id)
      }
      setLoading(false)
    }

    getInitialSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        // Don't override dev session
        if (localStorage.getItem('dev_admin_session')) {
          return
        }

        if (session?.user) {
          setUser(session.user)
          await fetchProfile(session.user.id)
        } else {
          setUser(null)
          setProfile(null)
        }
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()

      if (error) {
        console.error('Error fetching profile:', error)
        return
      }

      setProfile(data)
    } catch (error) {
      console.error('Error fetching profile:', error)
    }
  }

  const signOut = async () => {
    try {
      // Clear development session
      localStorage.removeItem('dev_admin_session')

      // Sign out from Supabase
      await supabase.auth.signOut()
      setUser(null)
      setProfile(null)
      router.push('/admin/login')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  const isAdmin = profile?.role === 'admin'
  const isModerator = profile?.role === 'moderator'
  const hasAdminAccess = isAdmin || isModerator

  const value = {
    user,
    profile,
    loading,
    signOut,
    isAdmin,
    isModerator,
    hasAdminAccess,
  }

  return React.createElement(AuthContext.Provider, { value }, children)
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

// Higher-order component for protecting admin routes
export function withAdminAuth<P extends object>(
  WrappedComponent: React.ComponentType<P>
) {
  return function AdminProtectedComponent(props: P) {
    const { hasAdminAccess, loading } = useAuth()
    const router = useRouter()

    useEffect(() => {
      if (!loading && !hasAdminAccess) {
        router.push('/admin/login')
      }
    }, [hasAdminAccess, loading, router])

    if (loading) {
      return React.createElement('div',
        { className: "min-h-screen flex items-center justify-center" },
        React.createElement('div', { className: "animate-spin rounded-full h-12 w-12 border-b-2 border-primary" })
      )
    }

    if (!hasAdminAccess) {
      return null
    }

    return React.createElement(WrappedComponent, props)
  }
}

// Hook for checking specific permissions
export function usePermissions() {
  const { profile, isAdmin, isModerator, hasAdminAccess } = useAuth()

  const canManageColleges = isAdmin || isModerator
  const canManageFaculty = isAdmin || isModerator
  const canManageReviews = isAdmin || isModerator
  const canManageUsers = isAdmin
  const canManageSettings = isAdmin
  const canViewAnalytics = isAdmin || isModerator
  const canModerateContent = isAdmin || isModerator

  return {
    canManageColleges,
    canManageFaculty,
    canManageReviews,
    canManageUsers,
    canManageSettings,
    canViewAnalytics,
    canModerateContent,
    isAdmin,
    isModerator,
    hasAdminAccess,
    role: profile?.role,
  }
}

// Utility function to check if user has required role
export function hasRole(userRole: string | undefined, requiredRoles: string[]): boolean {
  if (!userRole) return false
  return requiredRoles.includes(userRole)
}

// Utility function to redirect unauthorized users
export function redirectUnauthorized() {
  if (typeof window !== 'undefined') {
    window.location.href = '/admin/login'
  }
}
