"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Calendar, Plus, Search, Edit, Trash2, MoreHorizontal, Star, Trophy, Users } from "lucide-react"
import { AdminLayout } from "@/components/admin/admin-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Fest } from "@/lib/supabase"
import { getFestsByCollegeId } from "@/lib/database"

export default function FestsAdminPage() {
  const [search, setSearch] = useState("")
  const [collegeFilter, setCollegeFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [items, setItems] = useState<Fest[]>([])
  const [loading, setLoading] = useState(true)

  // Mock data for development
  const mockFests: Fest[] = [
    {
      id: "1",
      college_id: "1",
      name: "Techfest",
      description: "Asia's largest science and technology festival",
      type: "technical",
      duration_days: 4,
      typical_dates: "December 15-18",
      budget_range: "₹2-3 Crores",
      events: [
        { name: "Robotics Competition", description: "Build and compete with robots", category: "Competition", prizes: ["₹1 Lakh", "₹50,000", "₹25,000"] },
        { name: "Coding Marathon", description: "24-hour coding challenge", category: "Competition", prizes: ["₹75,000", "₹40,000", "₹20,000"] },
        { name: "Tech Talks", description: "Industry expert sessions", category: "Workshop", prizes: [] }
      ],
      highlights: ["International participation", "Industry partnerships", "Celebrity guests"],
      celebrity_visits: ["Sundar Pichai", "Satya Nadella", "Tim Cook"],
      participation_guidelines: "Open to all engineering students across India",
      registration_process: "Online registration through official website",
      images: ["/technical-fest-robotics.png"],
      videos: [],
      website_url: "https://techfest.org",
      social_media: {
        instagram: "@techfest_iitb",
        facebook: "TechfestIITBombay",
        twitter: "@techfest_iitb"
      },
      rating: 4.8,
      total_reviews: 245,
      is_active: true,
      created_at: "2024-01-01T00:00:00Z",
      updated_at: "2024-01-01T00:00:00Z"
    },
    {
      id: "2",
      college_id: "1",
      name: "Mood Indigo",
      description: "Asia's largest college cultural festival",
      type: "cultural",
      duration_days: 4,
      typical_dates: "December 27-30",
      budget_range: "₹1.5-2 Crores",
      events: [
        { name: "Dance Competition", description: "Various dance forms competition", category: "Competition", prizes: ["₹50,000", "₹30,000", "₹15,000"] },
        { name: "Music Concert", description: "Live performances by artists", category: "Performance", prizes: [] },
        { name: "Drama Competition", description: "Theatre and drama performances", category: "Competition", prizes: ["₹40,000", "₹25,000", "₹10,000"] }
      ],
      highlights: ["Celebrity performances", "International artists", "Cultural diversity"],
      celebrity_visits: ["A.R. Rahman", "Shankar Mahadevan", "Kailash Kher"],
      participation_guidelines: "Open to all college students",
      registration_process: "Online and on-spot registration available",
      images: ["/college-cultural-fest-stage.png"],
      videos: [],
      website_url: "https://moodi.org",
      social_media: {
        instagram: "@mood_indigo",
        facebook: "MoodIndigoIITB",
        twitter: "@mood_indigo"
      },
      rating: 4.7,
      total_reviews: 189,
      is_active: true,
      created_at: "2024-01-01T00:00:00Z",
      updated_at: "2024-01-01T00:00:00Z"
    }
  ]

  useEffect(() => {
    // For development, using mock data
    setItems(mockFests)
    setLoading(false)
  }, [search, collegeFilter, typeFilter])

  const onDelete = async (id: string) => {
    if (!confirm("Delete this fest? This cannot be undone.")) return
    // await deleteFest(id)
    setItems((prev) => prev.filter((f) => f.id !== id))
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "technical":
        return "bg-blue-100 text-blue-700 border-blue-200"
      case "cultural":
        return "bg-purple-100 text-purple-700 border-purple-200"
      case "sports":
        return "bg-green-100 text-green-700 border-green-200"
      case "mixed":
        return "bg-orange-100 text-orange-700 border-orange-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold font-space-grotesk">Fest Management</h1>
            <p className="text-muted-foreground mt-2">Manage college festivals, events, and cultural activities</p>
          </div>
          <Link href="/admin/fests/new">
            <Button>
              <Plus className="h-4 w-4 mr-2" /> Add Fest
            </Button>
          </Link>
        </div>

        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
                  <Input
                    placeholder="Search fests by name..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="technical">Technical</SelectItem>
                    <SelectItem value="cultural">Cultural</SelectItem>
                    <SelectItem value="sports">Sports</SelectItem>
                    <SelectItem value="mixed">Mixed</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={collegeFilter} onValueChange={setCollegeFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="College" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Colleges</SelectItem>
                    <SelectItem value="1">IIT Bombay</SelectItem>
                    <SelectItem value="2">NIT Trichy</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-primary"/>
              Fests ({items.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="p-8 text-center text-muted-foreground">Loading...</div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Events</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {items.map((fest) => (
                      <TableRow key={fest.id}>
                        <TableCell>
                          <div>
                            <div className="font-semibold">{fest.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {fest.typical_dates}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={`${getTypeColor(fest.type)} capitalize`}>
                            {fest.type}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>{fest.duration_days} days</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            <Trophy className="h-4 w-4 text-muted-foreground" />
                            <span>{fest.events.length} events</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 text-yellow-500 fill-current" />
                            <span className="font-semibold">{fest.rating}</span>
                            <span className="text-sm text-muted-foreground">
                              ({fest.total_reviews})
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={fest.is_active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}>
                            {fest.is_active ? "Active" : "Inactive"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem asChild>
                                <Link href={`/admin/fests/${fest.id}/edit`} className="flex items-center">
                                  <Edit className="mr-2 h-4 w-4" /> Edit
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600" onClick={() => onDelete(fest.id)}>
                                <Trash2 className="mr-2 h-4 w-4" /> Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
