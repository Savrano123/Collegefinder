"use client"

import {
  Building2,
  Users,
  BookOpen,
  MessageSquare,
  TrendingUp,
  TrendingDown,
  Plus,
  Eye,
  Edit,
  BarChart3,
  Calendar,
  Star,
  AlertCircle,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { AdminLayout } from "@/components/admin/admin-layout"
import { withAdminAuth, usePermissions } from "@/lib/auth"
import Link from "next/link"

// Mock data for dashboard - will be replaced with real data
const dashboardStats = {
  totalColleges: 1247,
  totalDepartments: 8934,
  totalFaculty: 45678,
  totalReviews: 89234,
  pendingReviews: 234,
  activeUsers: 12456,
  monthlyGrowth: {
    colleges: 12,
    reviews: 234,
    users: 567,
  },
}

const recentActivity = [
  {
    id: 1,
    type: "college_added",
    title: "New college added: IIT Hyderabad",
    time: "2 hours ago",
    user: "Admin",
  },
  {
    id: 2,
    type: "review_pending",
    title: "Review pending approval for NIT Trichy",
    time: "4 hours ago",
    user: "Student",
  },
  {
    id: 3,
    type: "faculty_updated",
    title: "Faculty profile updated: Dr. Rajesh Kumar",
    time: "6 hours ago",
    user: "Moderator",
  },
  {
    id: 4,
    type: "user_registered",
    title: "New user registration: 15 users today",
    time: "8 hours ago",
    user: "System",
  },
]

const quickActions = [
  {
    title: "Add New College",
    description: "Add a new college to the database",
    href: "/admin/colleges/new",
    icon: Building2,
    color: "bg-primary/10 text-primary",
  },
  {
    title: "Manage Reviews",
    description: "Review and moderate pending reviews",
    href: "/admin/reviews",
    icon: MessageSquare,
    color: "bg-secondary/10 text-secondary",
  },
  {
    title: "Add Faculty",
    description: "Add new faculty members",
    href: "/admin/faculty/new",
    icon: Users,
    color: "bg-green-100 text-green-600",
  },
  {
    title: "View Analytics",
    description: "Check platform analytics and insights",
    href: "/admin/analytics",
    icon: BarChart3,
    color: "bg-purple-100 text-purple-600",
  },
]

function AdminDashboardPage() {
  const permissions = usePermissions()

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "college_added":
        return <Building2 className="h-4 w-4 text-primary" />
      case "review_pending":
        return <MessageSquare className="h-4 w-4 text-orange-500" />
      case "faculty_updated":
        return <Users className="h-4 w-4 text-secondary" />
      case "user_registered":
        return <TrendingUp className="h-4 w-4 text-green-500" />
      default:
        return <AlertCircle className="h-4 w-4 text-muted-foreground" />
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold font-space-grotesk text-foreground">
              Dashboard
            </h1>
            <p className="text-muted-foreground font-dm-sans mt-2">
              Welcome back! Here's what's happening with CollegeHub today.
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Badge className="bg-green-100 text-green-700 border-green-200">
              <Calendar className="h-3 w-3 mr-1" />
              {new Date().toLocaleDateString()}
            </Badge>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-2 border-border hover:border-primary/30 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Colleges
              </CardTitle>
              <Building2 className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold font-space-grotesk text-foreground">
                {dashboardStats.totalColleges.toLocaleString()}
              </div>
              <div className="flex items-center space-x-1 mt-2">
                <TrendingUp className="h-4 w-4 text-green-500" />
                <span className="text-sm text-green-600 font-semibold">
                  +{dashboardStats.monthlyGrowth.colleges}
                </span>
                <span className="text-sm text-muted-foreground">this month</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-border hover:border-secondary/30 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Faculty
              </CardTitle>
              <Users className="h-5 w-5 text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold font-space-grotesk text-foreground">
                {dashboardStats.totalFaculty.toLocaleString()}
              </div>
              <div className="flex items-center space-x-1 mt-2">
                <TrendingUp className="h-4 w-4 text-green-500" />
                <span className="text-sm text-green-600 font-semibold">+156</span>
                <span className="text-sm text-muted-foreground">this month</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-border hover:border-green-300 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Reviews
              </CardTitle>
              <MessageSquare className="h-5 w-5 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold font-space-grotesk text-foreground">
                {dashboardStats.totalReviews.toLocaleString()}
              </div>
              <div className="flex items-center space-x-1 mt-2">
                <TrendingUp className="h-4 w-4 text-green-500" />
                <span className="text-sm text-green-600 font-semibold">
                  +{dashboardStats.monthlyGrowth.reviews}
                </span>
                <span className="text-sm text-muted-foreground">this month</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-border hover:border-purple-300 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Active Users
              </CardTitle>
              <Star className="h-5 w-5 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold font-space-grotesk text-foreground">
                {dashboardStats.activeUsers.toLocaleString()}
              </div>
              <div className="flex items-center space-x-1 mt-2">
                <TrendingUp className="h-4 w-4 text-green-500" />
                <span className="text-sm text-green-600 font-semibold">
                  +{dashboardStats.monthlyGrowth.users}
                </span>
                <span className="text-sm text-muted-foreground">this month</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Quick Actions */}
          <Card className="border-2 border-border">
            <CardHeader>
              <CardTitle className="text-2xl font-space-grotesk">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {quickActions.map((action, index) => {
                const Icon = action.icon
                return (
                  <Link key={index} href={action.href}>
                    <div className="flex items-center space-x-4 p-4 rounded-lg border border-border hover:border-primary/30 hover:bg-primary/5 transition-all duration-300 cursor-pointer">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${action.color}`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold font-space-grotesk text-foreground">
                          {action.title}
                        </h3>
                        <p className="text-sm text-muted-foreground font-dm-sans">
                          {action.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="border-2 border-border">
            <CardHeader>
              <CardTitle className="text-2xl font-space-grotesk">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="mt-1">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground font-dm-sans">
                        {activity.title}
                      </p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-xs text-muted-foreground">
                          {activity.time}
                        </span>
                        <span className="text-xs text-muted-foreground">•</span>
                        <span className="text-xs text-muted-foreground">
                          by {activity.user}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <Button variant="outline" className="w-full">
                  View All Activity
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Pending Tasks */}
        {permissions.canManageReviews && dashboardStats.pendingReviews > 0 && (
          <Card className="border-2 border-orange-200 bg-orange-50">
            <CardHeader>
              <CardTitle className="text-2xl font-space-grotesk text-orange-800 flex items-center">
                <AlertCircle className="h-6 w-6 mr-2" />
                Pending Tasks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-700 font-dm-sans">
                    You have <strong>{dashboardStats.pendingReviews}</strong> reviews waiting for approval.
                  </p>
                  <p className="text-sm text-orange-600 mt-1">
                    Reviews help students make informed decisions. Please review them promptly.
                  </p>
                </div>
                <Link href="/admin/reviews?status=pending">
                  <Button className="bg-orange-600 hover:bg-orange-700 text-white">
                    Review Now
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  )
}

export default withAdminAuth(AdminDashboardPage)
