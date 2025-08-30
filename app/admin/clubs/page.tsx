"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Users, Plus, Search, Edit, Trash2, MoreHorizontal, Star, Award, Activity } from "lucide-react"
import { AdminLayout } from "@/components/admin/admin-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Club } from "@/lib/supabase"
import { getClubsByCollegeId } from "@/lib/database"

export default function ClubsAdminPage() {
  const [search, setSearch] = useState("")
  const [collegeFilter, setCollegeFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [items, setItems] = useState<Club[]>([])
  const [loading, setLoading] = useState(true)

  // Mock data for development
  const mockClubs: Club[] = [
    {
      id: "1",
      college_id: "1",
      name: "Robotics Club",
      description: "Building the future with robotics and automation",
      category: "technical",
      membership_requirements: "Basic programming knowledge, passion for robotics",
      application_process: "Online application followed by technical interview",
      meeting_frequency: "Weekly",
      meeting_schedule: "Every Saturday 2 PM",
      activities: ["Robot building workshops", "Competition participation", "Tech talks", "Project development"],
      achievements: ["Winner at National Robotics Championship 2023", "Best Innovation Award 2022", "Published 5 research papers"],
      projects: [
        { name: "Autonomous Drone", description: "Self-navigating drone for surveillance", status: "Completed", year: "2023" },
        { name: "Robotic Arm", description: "Industrial grade robotic arm", status: "In Progress", year: "2024" }
      ],
      leadership_structure: {
        "President": "Rahul Sharma",
        "Vice President": "Priya Patel",
        "Technical Head": "Arjun Kumar",
        "Secretary": "Sneha Gupta"
      },
      contact_info: {
        "email": "robotics@iitb.ac.in",
        "phone": "+91-9876543210",
        "instagram": "@robotics_iitb"
      },
      membership_count: 85,
      images: [],
      website_url: "https://robotics.iitb.ac.in",
      social_media: {
        "instagram": "@robotics_iitb",
        "facebook": "RoboticsIITB",
        "linkedin": "robotics-club-iitb"
      },
      rating: 4.6,
      total_reviews: 42,
      is_active: true,
      created_at: "2024-01-01T00:00:00Z",
      updated_at: "2024-01-01T00:00:00Z"
    },
    {
      id: "2",
      college_id: "1",
      name: "Dance Society",
      description: "Expressing creativity through various dance forms",
      category: "cultural",
      membership_requirements: "Passion for dance, basic dance skills preferred",
      application_process: "Audition followed by interview",
      meeting_frequency: "Bi-weekly",
      meeting_schedule: "Tuesday and Friday 6 PM",
      activities: ["Dance workshops", "Performance preparation", "Inter-college competitions", "Cultural events"],
      achievements: ["1st Prize at Inter-IIT Cultural Meet 2023", "Best Choreography Award 2022", "Featured in national TV show"],
      projects: [
        { name: "Fusion Dance Performance", description: "Blend of classical and modern dance", status: "Completed", year: "2023" },
        { name: "Dance Documentary", description: "Documentary on Indian classical dance", status: "In Progress", year: "2024" }
      ],
      leadership_structure: {
        "Captain": "Ananya Singh",
        "Vice Captain": "Rohan Mehta",
        "Choreographer": "Kavya Nair",
        "Coordinator": "Vikram Joshi"
      },
      contact_info: {
        "email": "dance@iitb.ac.in",
        "phone": "+91-9876543211",
        "instagram": "@dance_iitb"
      },
      membership_count: 65,
      images: [],
      website_url: "",
      social_media: {
        "instagram": "@dance_iitb",
        "facebook": "DanceSocietyIITB",
        "youtube": "DanceIITB"
      },
      rating: 4.4,
      total_reviews: 38,
      is_active: true,
      created_at: "2024-01-01T00:00:00Z",
      updated_at: "2024-01-01T00:00:00Z"
    }
  ]

  useEffect(() => {
    // For development, using mock data
    setItems(mockClubs)
    setLoading(false)
  }, [search, collegeFilter, categoryFilter])

  const onDelete = async (id: string) => {
    if (!confirm("Delete this club? This cannot be undone.")) return
    // await deleteClub(id)
    setItems((prev) => prev.filter((c) => c.id !== id))
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "technical":
        return "bg-blue-100 text-blue-700 border-blue-200"
      case "cultural":
        return "bg-purple-100 text-purple-700 border-purple-200"
      case "sports":
        return "bg-green-100 text-green-700 border-green-200"
      case "social":
        return "bg-orange-100 text-orange-700 border-orange-200"
      case "academic":
        return "bg-indigo-100 text-indigo-700 border-indigo-200"
      case "entrepreneurship":
        return "bg-red-100 text-red-700 border-red-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold font-space-grotesk">Club Management</h1>
            <p className="text-muted-foreground mt-2">Manage student clubs, societies, and organizations</p>
          </div>
          <Link href="/admin/clubs/new">
            <Button>
              <Plus className="h-4 w-4 mr-2" /> Add Club
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
                    placeholder="Search clubs by name..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="technical">Technical</SelectItem>
                    <SelectItem value="cultural">Cultural</SelectItem>
                    <SelectItem value="sports">Sports</SelectItem>
                    <SelectItem value="social">Social</SelectItem>
                    <SelectItem value="academic">Academic</SelectItem>
                    <SelectItem value="entrepreneurship">Entrepreneurship</SelectItem>
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
              <Users className="h-5 w-5 mr-2 text-primary"/>
              Clubs ({items.length})
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
                      <TableHead>Category</TableHead>
                      <TableHead>Members</TableHead>
                      <TableHead>Activities</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {items.map((club) => (
                      <TableRow key={club.id}>
                        <TableCell>
                          <div>
                            <div className="font-semibold">{club.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {club.meeting_frequency} meetings
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={`${getCategoryColor(club.category)} capitalize`}>
                            {club.category}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span>{club.membership_count}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            <Activity className="h-4 w-4 text-muted-foreground" />
                            <span>{club.activities.length} activities</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 text-yellow-500 fill-current" />
                            <span className="font-semibold">{club.rating}</span>
                            <span className="text-sm text-muted-foreground">
                              ({club.total_reviews})
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={club.is_active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}>
                            {club.is_active ? "Active" : "Inactive"}
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
                                <Link href={`/admin/clubs/${club.id}/edit`} className="flex items-center">
                                  <Edit className="mr-2 h-4 w-4" /> Edit
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600" onClick={() => onDelete(club.id)}>
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
