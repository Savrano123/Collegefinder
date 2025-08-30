"use client"

import { useState } from "react"
import {
  Building2,
  Plus,
  Search,
  Filter,
  Edit,
  Eye,
  Trash2,
  Download,
  Upload,
  MoreHorizontal,
  MapPin,
  Star,
  Users,
  Calendar,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { AdminLayout } from "@/components/admin/admin-layout"
// import { withAdminAuth, usePermissions } from "@/lib/auth"
import { College } from "@/lib/supabase"
import Link from "next/link"

// Mock data for colleges - will be replaced with real data
const mockColleges: College[] = [
  {
    id: "1",
    name: "Indian Institute of Technology Bombay",
    short_name: "IIT Bombay",
    slug: "iit-bombay",
    description: "Premier engineering and technology institute",
    type: "government",
    counseling_categories: ["josaa-csab"],
    established: 1958,
    location: "Powai, Mumbai, Maharashtra",
    state: "Maharashtra",
    city: "Mumbai",
    website: "https://www.iitb.ac.in",
    phone: "+91-22-2572-2545",
    email: "info@iitb.ac.in",
    logo_url: "/iit-bombay-logo.png",
    nirf_rank: 3,
    rating: 4.6,
    total_reviews: 1247,
    total_students: 11000,
    total_faculty: 650,
    total_departments: 18,
    placement_rate: 95,
    average_package: "₹18.5 LPA",
    highest_package: "₹2.14 Crore",
    annual_fees: "₹2.5 Lakhs",
    highlights: ["Top 3 NIRF Ranking", "95% Placement Rate", "650+ Faculty"],
    is_active: true,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "2",
    name: "National Institute of Technology Trichy",
    short_name: "NIT Trichy",
    slug: "nit-trichy",
    description: "Leading technical institute in South India",
    type: "government",
    counseling_categories: ["josaa-csab"],
    established: 1964,
    location: "Tiruchirappalli, Tamil Nadu",
    state: "Tamil Nadu",
    city: "Tiruchirappalli",
    website: "https://www.nitt.edu",
    logo_url: "/nit-trichy-logo.png",
    nirf_rank: 9,
    rating: 4.4,
    total_reviews: 892,
    total_students: 8500,
    total_faculty: 420,
    total_departments: 16,
    placement_rate: 88,
    average_package: "₹12.8 LPA",
    highest_package: "₹45 Lakhs",
    annual_fees: "₹1.8 Lakhs",
    highlights: ["Top 10 NIRF Ranking", "88% Placement Rate", "Strong Alumni Network"],
    is_active: true,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
]

function CollegesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filterState, setFilterState] = useState("all")
  // Temporary mock permissions for development
  const permissions = { canManageColleges: true }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "government":
        return "bg-green-100 text-green-700 border-green-200"
      case "private":
        return "bg-blue-100 text-blue-700 border-blue-200"
      case "deemed":
        return "bg-purple-100 text-purple-700 border-purple-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  const getRankBadgeColor = (rank?: number) => {
    if (!rank) return "bg-gray-100 text-gray-600"
    if (rank <= 10) return "bg-green-100 text-green-700"
    if (rank <= 50) return "bg-blue-100 text-blue-700"
    if (rank <= 100) return "bg-orange-100 text-orange-700"
    return "bg-gray-100 text-gray-600"
  }

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold font-space-grotesk text-foreground">
              College Management
            </h1>
            <p className="text-muted-foreground font-dm-sans mt-2">
              Manage colleges, their information, and settings
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" className="border-2">
              <Upload className="h-4 w-4 mr-2" />
              Import CSV
            </Button>
            <Button variant="outline" className="border-2">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Link href="/admin/colleges/new">
              <Button className="bg-primary hover:bg-primary/90">
                <Plus className="h-4 w-4 mr-2" />
                Add College
              </Button>
            </Link>
          </div>
        </div>

        {/* Filters */}
        <Card className="border-2 border-border">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              {/* Search */}
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                  <Input
                    placeholder="Search colleges by name, location..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 border-2 border-border focus:border-primary"
                  />
                </div>
              </div>

              {/* Filters */}
              <div className="flex items-center space-x-4">
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-48 border-2 border-border">
                    <SelectValue placeholder="College Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="government">Government</SelectItem>
                    <SelectItem value="private">Private</SelectItem>
                    <SelectItem value="deemed">Deemed</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filterState} onValueChange={setFilterState}>
                  <SelectTrigger className="w-48 border-2 border-border">
                    <SelectValue placeholder="State" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All States</SelectItem>
                    <SelectItem value="maharashtra">Maharashtra</SelectItem>
                    <SelectItem value="tamil-nadu">Tamil Nadu</SelectItem>
                    <SelectItem value="karnataka">Karnataka</SelectItem>
                    <SelectItem value="delhi">Delhi</SelectItem>
                  </SelectContent>
                </Select>

                <Button variant="outline" className="border-2">
                  <Filter className="h-4 w-4 mr-2" />
                  More Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Colleges Table */}
        <Card className="border-2 border-border">
          <CardHeader>
            <CardTitle className="text-2xl font-space-grotesk flex items-center">
              <Building2 className="h-6 w-6 mr-2 text-primary" />
              Colleges ({mockColleges.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>College</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>NIRF Rank</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Students</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockColleges.map((college) => (
                    <TableRow key={college.id} className="hover:bg-muted/50">
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar className="w-10 h-10 border border-border">
                            <AvatarImage src={college.logo_url} alt={college.name} />
                            <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-primary-foreground font-semibold">
                              {college.short_name?.slice(0, 2) || college.name.slice(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-semibold text-foreground font-space-grotesk">
                              {college.name}
                            </div>
                            <div className="text-sm text-muted-foreground font-dm-sans">
                              {college.short_name}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={`${getTypeColor(college.type)} capitalize`}>
                          {college.type}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-dm-sans">{college.city}, {college.state}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {college.nirf_rank ? (
                          <Badge className={`${getRankBadgeColor(college.nirf_rank)}`}>
                            #{college.nirf_rank}
                          </Badge>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span className="font-semibold">{college.rating}</span>
                          <span className="text-sm text-muted-foreground">
                            ({college.total_reviews})
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span className="font-dm-sans">
                            {college.total_students ? `${Math.round(college.total_students / 1000)}K` : "-"}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={college.is_active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}>
                          {college.is_active ? "Active" : "Inactive"}
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
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit College
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-6">
              <p className="text-sm text-muted-foreground font-dm-sans">
                Showing 1-{mockColleges.length} of {mockColleges.length} colleges
              </p>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" disabled>
                  Previous
                </Button>
                <Button variant="outline" size="sm" disabled>
                  Next
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}

// Temporarily disabled auth for development
export default CollegesPage
// export default withAdminAuth(CollegesPage)
