"use client"

import { useState } from "react"
import {
  Search,
  Filter,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  TrendingUp,
  Clock,
  Tag,
  Plus,
  GraduationCap,
  ArrowLeft,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import Link from "next/link"

const forumPosts = [
  {
    id: 1,
    title: "IIT Bombay vs IIT Delhi for Computer Science - Which is better?",
    content:
      "I have offers from both IIT Bombay and IIT Delhi for CSE. Can someone help me decide based on placement, faculty, and campus life?",
    author: "Anonymous",
    college: "Aspiring Student",
    timestamp: "2 hours ago",
    upvotes: 24,
    downvotes: 2,
    replies: 15,
    tags: ["IIT", "Computer Science", "Placement", "Comparison"],
    category: "College Comparison",
    trending: true,
  },
  {
    id: 2,
    title: "How is the hostel life at NIT Trichy?",
    content:
      "Planning to join NIT Trichy next year. Can current students share their hostel experience, mess food quality, and overall campus life?",
    author: "StudentSeeker",
    college: "Prospective Student",
    timestamp: "5 hours ago",
    upvotes: 18,
    downvotes: 1,
    replies: 8,
    tags: ["NIT Trichy", "Hostel", "Campus Life"],
    category: "Campus Life",
    trending: false,
  },
  {
    id: 3,
    title: "BITS Pilani placement statistics - Are they accurate?",
    content:
      "I've seen conflicting placement data for BITS Pilani online. Can someone share the real placement scenario for CSE and ECE branches?",
    author: "DataSeeker",
    college: "Research Student",
    timestamp: "1 day ago",
    upvotes: 31,
    downvotes: 4,
    replies: 22,
    tags: ["BITS Pilani", "Placement", "Statistics", "CSE", "ECE"],
    category: "Placements",
    trending: true,
  },
  {
    id: 4,
    title: "Best coaching for JEE preparation in Delhi",
    content:
      "Looking for recommendations for JEE coaching institutes in Delhi. Please share your experiences and success stories.",
    author: "JEEAspirant2025",
    college: "12th Grade",
    timestamp: "2 days ago",
    upvotes: 12,
    downvotes: 0,
    replies: 6,
    tags: ["JEE", "Coaching", "Delhi", "Preparation"],
    category: "Exam Preparation",
    trending: false,
  },
]

const trendingTopics = [
  { name: "IIT Placements 2024", posts: 45 },
  { name: "NIT Admission Process", posts: 32 },
  { name: "BITS vs IIT Comparison", posts: 28 },
  { name: "Hostel Life Reviews", posts: 24 },
  { name: "JEE Preparation Tips", posts: 19 },
]

const categories = [
  { name: "All", count: 1247 },
  { name: "College Comparison", count: 234 },
  { name: "Placements", count: 189 },
  { name: "Campus Life", count: 156 },
  { name: "Exam Preparation", count: 134 },
  { name: "Admissions", count: 98 },
  { name: "Faculty Reviews", count: 87 },
]

export default function CommunityPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [isNewPostOpen, setIsNewPostOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
              <div className="flex items-center space-x-2">
                <GraduationCap className="h-8 w-8 text-blue-600" />
                <span className="text-2xl font-bold text-gray-900">CollegeHub</span>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Dialog open={isNewPostOpen} onOpenChange={setIsNewPostOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    New Post
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Create New Post</DialogTitle>
                    <DialogDescription>Share your question or experience with the community</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="title">Title</Label>
                      <Input id="title" placeholder="What's your question or topic?" />
                    </div>
                    <div>
                      <Label htmlFor="category">Category</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="comparison">College Comparison</SelectItem>
                          <SelectItem value="placements">Placements</SelectItem>
                          <SelectItem value="campus">Campus Life</SelectItem>
                          <SelectItem value="exam">Exam Preparation</SelectItem>
                          <SelectItem value="admissions">Admissions</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="content">Content</Label>
                      <Textarea
                        id="content"
                        placeholder="Describe your question or share your experience..."
                        rows={6}
                      />
                    </div>
                    <div>
                      <Label htmlFor="tags">Tags (comma separated)</Label>
                      <Input id="tags" placeholder="e.g., IIT, Computer Science, Placement" />
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" onClick={() => setIsNewPostOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={() => setIsNewPostOpen(false)}>Post Question</Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              <Button variant="ghost">Login</Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Community Forum</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Connect with students, alumni, and experts. Get answers to your questions about colleges, admissions, and
            campus life.
          </p>

          {/* Search */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Search discussions, questions, or topics..."
                className="pl-12 py-3 text-lg border-2 border-gray-200 focus:border-blue-500"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Categories */}
            <Card>
              <CardHeader>
                <CardTitle>Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.name}
                      onClick={() => setSelectedCategory(category.name)}
                      className={`w-full text-left p-2 rounded-lg transition-colors ${
                        selectedCategory === category.name
                          ? "bg-blue-100 text-blue-700"
                          : "hover:bg-gray-100 text-gray-700"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{category.name}</span>
                        <Badge variant="secondary" className="text-xs">
                          {category.count}
                        </Badge>
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Trending Topics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5" />
                  <span>Trending Topics</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {trendingTopics.map((topic, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm font-medium">{topic.name}</span>
                      <Badge variant="outline" className="text-xs">
                        {topic.posts}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Community Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Community Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Total Posts</span>
                    <span className="font-semibold">12,547</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Active Users</span>
                    <span className="font-semibold">3,421</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Questions Answered</span>
                    <span className="font-semibold">8,932</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Filters */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">
                {selectedCategory === "All" ? "All Discussions" : selectedCategory}
              </h2>
              <div className="flex items-center space-x-4">
                <Select>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recent">Most Recent</SelectItem>
                    <SelectItem value="popular">Most Popular</SelectItem>
                    <SelectItem value="trending">Trending</SelectItem>
                    <SelectItem value="unanswered">Unanswered</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </div>
            </div>

            {/* Forum Posts */}
            <div className="space-y-6">
              {forumPosts
                .filter((post) => selectedCategory === "All" || post.category === selectedCategory)
                .map((post) => (
                  <Card key={post.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            {post.trending && (
                              <Badge className="bg-red-100 text-red-800">
                                <TrendingUp className="h-3 w-3 mr-1" />
                                Trending
                              </Badge>
                            )}
                            <Badge variant="outline">{post.category}</Badge>
                          </div>
                          <CardTitle className="text-xl mb-2 hover:text-blue-600 cursor-pointer">
                            {post.title}
                          </CardTitle>
                          <CardDescription className="text-base">{post.content}</CardDescription>
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mt-3">
                        {post.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            <Tag className="h-3 w-3 mr-1" />
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardHeader>

                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-2">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>{post.author[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="text-sm font-medium">{post.author}</div>
                              <div className="text-xs text-gray-500">{post.college}</div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-1 text-gray-500">
                            <Clock className="h-4 w-4" />
                            <span className="text-sm">{post.timestamp}</span>
                          </div>
                        </div>

                        <div className="flex items-center space-x-4">
                          <Button variant="ghost" size="sm">
                            <ThumbsUp className="h-4 w-4 mr-1" />
                            {post.upvotes}
                          </Button>
                          <Button variant="ghost" size="sm">
                            <ThumbsDown className="h-4 w-4 mr-1" />
                            {post.downvotes}
                          </Button>
                          <Button variant="ghost" size="sm">
                            <MessageSquare className="h-4 w-4 mr-1" />
                            {post.replies} replies
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-8">
              <Button variant="outline" size="lg">
                Load More Posts
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
