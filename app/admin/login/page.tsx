"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  GraduationCap,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Shield,
  AlertCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/lib/supabase"
import Link from "next/link"

export default function AdminLoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()
  const { toast } = useToast()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      // Development mode: Allow admin@collegehub.com with admin123
      if (email === 'admin@collegehub.com' && password === 'admin123') {
        // Set development admin session in localStorage
        const devAdmin = {
          id: '00000000-0000-0000-0000-000000000001',
          email: 'admin@collegehub.com',
          full_name: 'Admin User',
          username: 'admin',
          role: 'admin',
          is_verified: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }

        localStorage.setItem('dev_admin_session', JSON.stringify(devAdmin))

        toast({
          title: "Login Successful (Development Mode)",
          description: `Welcome back, ${devAdmin.full_name}!`,
        })

        router.push("/admin/dashboard")
        return
      }

      // Try Supabase Auth for production
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (authError) {
        setError(authError.message)
        return
      }

      if (!authData.user) {
        setError("Login failed. Please try again.")
        return
      }

      // Check if user has admin or moderator role
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role, full_name')
        .eq('id', authData.user.id)
        .single()

      if (profileError) {
        setError("Failed to verify admin access. Please contact support.")
        return
      }

      if (!profile || (profile.role !== 'admin' && profile.role !== 'moderator')) {
        setError("Access denied. Admin or moderator privileges required.")
        await supabase.auth.signOut()
        return
      }

      toast({
        title: "Login Successful",
        description: `Welcome back, ${profile.full_name || 'Admin'}!`,
      })

      router.push("/admin/dashboard")
    } catch (err) {
      setError("An unexpected error occurred. Please try again.")
      console.error("Login error:", err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-background flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-float"></div>
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
              <GraduationCap className="h-7 w-7 text-primary-foreground" />
            </div>
            <span className="text-3xl font-bold font-space-grotesk gradient-text">CollegeHub</span>
          </Link>
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 px-4 py-2">
            <Shield className="h-4 w-4 mr-2" />
            Admin Portal
          </Badge>
          <h1 className="text-4xl font-bold font-space-grotesk text-foreground mb-2">
            Admin Login
          </h1>
          <p className="text-muted-foreground font-dm-sans">
            Sign in to access the administrative dashboard
          </p>
        </div>

        {/* Login Form */}
        <Card className="border-2 border-border shadow-xl">
          <CardHeader className="pb-4">
            <CardTitle className="text-2xl font-space-grotesk text-center">
              Welcome Back
            </CardTitle>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert className="mb-6 border-red-200 bg-red-50">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-700">
                  {error}
                </AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2 font-dm-sans">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                  <Input
                    type="email"
                    placeholder="admin@collegehub.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="pl-12 border-2 border-border focus:border-primary h-12"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2 font-dm-sans">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="pl-12 pr-12 border-2 border-border focus:border-primary h-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-12 text-lg font-semibold transition-all duration-300 hover:scale-105"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-foreground mr-2"></div>
                    Signing In...
                  </>
                ) : (
                  <>
                    <Shield className="h-5 w-5 mr-2" />
                    Sign In to Admin Panel
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                <p className="text-sm text-blue-700 font-dm-sans">
                  <strong>Development Mode:</strong> Use admin@collegehub.com / admin123
                </p>
              </div>
              <p className="text-sm text-muted-foreground font-dm-sans">
                Forgot your password?{" "}
                <Link href="/admin/forgot-password" className="text-primary hover:text-primary/80 font-semibold">
                  Reset it here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground font-dm-sans">
            Need help? Contact{" "}
            <Link href="/contact" className="text-primary hover:text-primary/80 font-semibold">
              support
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
