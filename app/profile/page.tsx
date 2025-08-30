"use client"

import { useState } from "react"
import {
  Settings,
  Heart,
  BarChart3,
  MessageSquare,
  Edit,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Star,
  Trash2,
  Eye,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Header } from "@/components/header"
import Link from "next/link"

const userData = {
  name: "Rahul Sharma",
  email: "rahul.sharma@email.com",
  phone: "+91 98765 43210",
  location: "Mumbai, Maharashtra",
  userType: "Student",
  joinDate: "January 2024",
  avatar: "/placeholder.svg",
  bio: "Aspiring computer science student looking for the best engineering colleges in India. Interested in AI and machine learning.",
  stats: {
    savedColleges: 12,
    reviews: 8,
    forumPosts: 15,
    helpfulVotes: 47,
  },
}

const savedColleges = [
  {
    id: "iit-bombay",
    name: "IIT Bombay",
    location: "Mumbai, Maharashtra",
    logo: "/iit-bombay-logo.png",
    rating: 4.8,
    savedDate: "2 days ago",
    status: "Applied",
  },
  {
    id: "iit-delhi",
    name: "IIT Delhi",
    location: "New Delhi, Delhi",
    logo: "/generic-university-logo.png",
    rating: 4.7,
    savedDate: "1 week ago",
    status: "Interested",
  },
  {
    id: "bits-pilani",
    name: "BITS Pilani",
    location: "Pilani, Rajasthan",
    logo: "/bits-pilani-logo.png",
    rating: 4.5,
    savedDate: "2 weeks ago",
    status: "Considering",
  },
]

const recentActivity = [
  {
    id: 1,
    type: "review",
    action: "Posted a review for",
    target: "IIT Bombay",
    timestamp: "2 hours ago",
    icon: Star,
  },
  {
    id: 2,
    type: "save",
    action: "Saved college",
    target: "NIT Trichy",
    timestamp: "1 day ago",
    icon: Heart,
  },
  {
    id: 3,
    type: "forum",
    action: "Posted in forum",
    target: "IIT vs NIT Comparison",
    timestamp: "3 days ago",
    icon: MessageSquare,
  },
  {
    id: 4,
    type: "compare",
    action: "Compared colleges",
    target: "IIT Bombay vs IIT Delhi",
    timestamp: "1 week ago",
    icon: BarChart3,
  },
]

const myReviews = [
  {
    id: 1,
    college: "IIT Bombay",
    rating: 5,
    title: "Excellent faculty and infrastructure",
    content: "The computer science department has world-class faculty and the research opportunities are amazing...",
    date: "2 days ago",
    helpful: 12,
    replies: 3,
  },
  {
    id: 2,
    college: "BITS Pilani",
    rating: 4,
    title: "Good academics but expensive",
    content: "The academic quality is very good and the campus life is vibrant, but the fees are quite high...",
    date: "1 week ago",
    helpful: 8,
    replies: 1,
  },
]

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Profile Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <Avatar className="w-24 h-24 mx-auto mb-4">
                    <AvatarImage src={userData.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="text-2xl">
                      {userData.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <h2 className="text-2xl font-bold text-gray-900 mb-1">{userData.name}</h2>
                  <Badge variant="secondary" className="mb-2">
                    {userData.userType}
                  </Badge>
                  <p className="text-gray-600 text-sm">{userData.bio}</p>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center space-x-3 text-gray-600">
                    <Mail className="h-4 w-4" />
                    <span className="text-sm">{userData.email}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-600">
                    <Phone className="h-4 w-4" />
                    <span className="text-sm">{userData.phone}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm">{userData.location}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm">Joined {userData.joinDate}</span>
                  </div>
                </div>

                <Button className="w-full mb-4">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>

                <Button variant="outline" className="w-full bg-transparent">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
              </CardContent>
            </Card>

            {/* Stats Card */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Profile Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Saved Colleges</span>
                    <span className="font-semibold">{userData.stats.savedColleges}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Reviews Written</span>
                    <span className="font-semibold">{userData.stats.reviews}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Forum Posts</span>
                    <span className="font-semibold">{userData.stats.forumPosts}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Helpful Votes</span>
                    <span className="font-semibold">{userData.stats.helpfulVotes}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="saved">Saved Colleges</TabsTrigger>
                <TabsTrigger value="reviews">My Reviews</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Dashboard</CardTitle>
                    <CardDescription>Your college research progress and recent activity</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <Heart className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-blue-600">{userData.stats.savedColleges}</div>
                        <div className="text-sm text-gray-600">Saved Colleges</div>
                      </div>
                      <div className="text-center p-4 bg-emerald-50 rounded-lg">
                        <Star className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-emerald-600">{userData.stats.reviews}</div>
                        <div className="text-sm text-gray-600">Reviews</div>
                      </div>
                      <div className="text-center p-4 bg-orange-50 rounded-lg">
                        <MessageSquare className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-orange-600">{userData.stats.forumPosts}</div>
                        <div className="text-sm text-gray-600">Forum Posts</div>
                      </div>
                      <div className="text-center p-4 bg-purple-50 rounded-lg">
                        <BarChart3 className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-purple-600">{userData.stats.helpfulVotes}</div>
                        <div className="text-sm text-gray-600">Helpful Votes</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentActivity.map((activity) => {
                        const IconComponent = activity.icon
                        return (
                          <div key={activity.id} className="flex items-center space-x-4 p-3 border rounded-lg">
                            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                              <IconComponent className="h-5 w-5 text-gray-600" />
                            </div>
                            <div className="flex-1">
                              <p className="text-sm">
                                <span className="font-medium">{activity.action}</span>{" "}
                                <span className="text-blue-600">{activity.target}</span>
                              </p>
                              <p className="text-xs text-gray-500">{activity.timestamp}</p>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Saved Colleges Tab */}
              <TabsContent value="saved" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Saved Colleges ({savedColleges.length})</CardTitle>
                    <CardDescription>Colleges you've bookmarked for future reference</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {savedColleges.map((college) => (
                        <div key={college.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center space-x-4">
                            <img
                              src={college.logo || "/placeholder.svg"}
                              alt={college.name}
                              className="w-12 h-12 rounded-lg"
                            />
                            <div>
                              <h4 className="font-semibold">{college.name}</h4>
                              <p className="text-sm text-gray-600">{college.location}</p>
                              <div className="flex items-center space-x-2 mt-1">
                                <div className="flex items-center space-x-1">
                                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                  <span className="text-sm font-medium">{college.rating}</span>
                                </div>
                                <Badge
                                  variant={
                                    college.status === "Applied"
                                      ? "default"
                                      : college.status === "Interested"
                                        ? "secondary"
                                        : "outline"
                                  }
                                  className="text-xs"
                                >
                                  {college.status}
                                </Badge>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-500">Saved {college.savedDate}</span>
                            <Link href={`/college/${college.id}`}>
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4 mr-1" />
                                View
                              </Button>
                            </Link>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Reviews Tab */}
              <TabsContent value="reviews" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>My Reviews ({myReviews.length})</CardTitle>
                    <CardDescription>Reviews you've written for colleges</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {myReviews.map((review) => (
                        <div key={review.id} className="p-4 border rounded-lg">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h4 className="font-semibold">{review.college}</h4>
                              <div className="flex items-center space-x-2 mt-1">
                                <div className="flex">
                                  {[1, 2, 3, 4, 5].map((star) => (
                                    <Star
                                      key={star}
                                      className={`h-4 w-4 ${
                                        star <= review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                      }`}
                                    />
                                  ))}
                                </div>
                                <span className="text-sm text-gray-500">{review.date}</span>
                              </div>
                            </div>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                          <h5 className="font-medium mb-2">{review.title}</h5>
                          <p className="text-gray-600 text-sm mb-3">{review.content}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span>{review.helpful} found this helpful</span>
                            <span>{review.replies} replies</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Activity Tab */}
              <TabsContent value="activity" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Activity Timeline</CardTitle>
                    <CardDescription>Your complete activity history on CollegeHub</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentActivity.concat(recentActivity).map((activity, index) => {
                        const IconComponent = activity.icon
                        return (
                          <div key={`${activity.id}-${index}`} className="flex items-start space-x-4">
                            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                              <IconComponent className="h-5 w-5 text-gray-600" />
                            </div>
                            <div className="flex-1 pb-4 border-b border-gray-100 last:border-b-0">
                              <p className="text-sm">
                                <span className="font-medium">{activity.action}</span>{" "}
                                <span className="text-blue-600">{activity.target}</span>
                              </p>
                              <p className="text-xs text-gray-500 mt-1">{activity.timestamp}</p>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
