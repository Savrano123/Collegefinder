"use client"

import { AdminLayout } from "@/components/admin/admin-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, Users, Building2, MessageSquare, TrendingUp, Eye, Calendar, Star } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function AnalyticsAdminPage() {
  // Mock analytics data
  const stats = {
    totalUsers: 12450,
    totalColleges: 156,
    totalReviews: 8920,
    totalPageViews: 245600,
    monthlyGrowth: {
      users: 12.5,
      colleges: 8.2,
      reviews: 15.3,
      pageViews: 22.1
    }
  }

  const topColleges = [
    { name: "IIT Bombay", views: 15420, reviews: 245, rating: 4.8 },
    { name: "IIT Delhi", views: 13890, reviews: 198, rating: 4.7 },
    { name: "NIT Trichy", views: 11250, reviews: 167, rating: 4.6 },
    { name: "BITS Pilani", views: 9870, reviews: 134, rating: 4.5 },
    { name: "IIT Madras", views: 8960, reviews: 156, rating: 4.7 }
  ]

  const recentActivity = [
    { type: "review", content: "New review added for IIT Bombay", time: "2 minutes ago" },
    { type: "college", content: "College profile updated: NIT Trichy", time: "15 minutes ago" },
    { type: "user", content: "New user registration: john.doe@email.com", time: "1 hour ago" },
    { type: "review", content: "Review flagged for moderation", time: "2 hours ago" },
    { type: "college", content: "New college added: IIIT Hyderabad", time: "3 hours ago" }
  ]

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold font-space-grotesk">Analytics Dashboard</h1>
          <p className="text-muted-foreground mt-2">Monitor platform performance and user engagement</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+{stats.monthlyGrowth.users}%</span> from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Colleges</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalColleges}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+{stats.monthlyGrowth.colleges}%</span> from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Reviews</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalReviews.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+{stats.monthlyGrowth.reviews}%</span> from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Page Views</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalPageViews.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+{stats.monthlyGrowth.pageViews}%</span> from last month
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Top Colleges */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-primary" />
                Top Performing Colleges
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topColleges.map((college, index) => (
                  <div key={college.name} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-sm font-semibold text-primary">#{index + 1}</span>
                      </div>
                      <div>
                        <div className="font-semibold">{college.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {college.views.toLocaleString()} views • {college.reviews} reviews
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="font-semibold">{college.rating}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-primary" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 border rounded-lg">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <div className="flex-1">
                      <div className="text-sm">{activity.content}</div>
                      <div className="text-xs text-muted-foreground mt-1">{activity.time}</div>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {activity.type}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>User Growth Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center text-muted-foreground">
                <div className="text-center">
                  <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Chart visualization would be implemented here</p>
                  <p className="text-sm">Using libraries like Recharts or Chart.js</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Review Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center text-muted-foreground">
                <div className="text-center">
                  <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Chart visualization would be implemented here</p>
                  <p className="text-sm">Showing review ratings distribution</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  )
}
