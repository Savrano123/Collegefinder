"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Home, Plus, Search, Edit, Trash2, MoreHorizontal, Building2, Users, Star } from "lucide-react"
import { AdminLayout } from "@/components/admin/admin-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Hostel } from "@/lib/supabase"
import { getHostelsByCollegeId } from "@/lib/database"

export default function HostelsAdminPage() {
  const [search, setSearch] = useState("")
  const [collegeFilter, setCollegeFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [items, setItems] = useState<Hostel[]>([])
  const [loading, setLoading] = useState(true)

  // Mock data for development
  const mockHostels: Hostel[] = [
    {
      id: "1",
      college_id: "1",
      name: "Hostel Block A",
      type: "boys",
      capacity: 200,
      available_rooms: 15,
      room_types: [
        { type: "Single", price: "₹15,000/year", amenities: ["AC", "WiFi", "Study Table"] },
        { type: "Double", price: "₹12,000/year", amenities: ["WiFi", "Study Table"] }
      ],
      amenities: ["WiFi", "Laundry", "Common Room", "Gym", "Cafeteria"],
      rules: "Entry by 10 PM, No outside guests after 8 PM",
      entry_timings: "6:00 AM - 10:00 PM",
      exit_timings: "6:00 AM - 10:00 PM",
      mess_available: true,
      mess_timings: {
        breakfast: "7:00 AM - 9:00 AM",
        lunch: "12:00 PM - 2:00 PM",
        snacks: "4:00 PM - 6:00 PM",
        dinner: "7:00 PM - 9:00 PM"
      },
      weekly_menu: {
        "Monday": ["Poha", "Dal Rice", "Tea", "Roti Sabzi"],
        "Tuesday": ["Upma", "Rajma Rice", "Coffee", "Paratha Dal"]
      },
      nearby_facilities: ["Medical Center", "Library", "Sports Complex", "Canteen"],
      images: ["/hostel-room-interior.png", "/girls-hostel-room.png"],
      rating: 4.2,
      total_reviews: 89,
      is_active: true,
      created_at: "2024-01-01T00:00:00Z",
      updated_at: "2024-01-01T00:00:00Z"
    },
    {
      id: "2",
      college_id: "1",
      name: "Hostel Block B",
      type: "girls",
      capacity: 180,
      available_rooms: 8,
      room_types: [
        { type: "Single", price: "₹16,000/year", amenities: ["AC", "WiFi", "Study Table", "Balcony"] },
        { type: "Double", price: "₹13,000/year", amenities: ["WiFi", "Study Table"] }
      ],
      amenities: ["WiFi", "Laundry", "Common Room", "Security", "Garden"],
      rules: "Entry by 9 PM, Visitor hours 10 AM - 6 PM",
      entry_timings: "6:00 AM - 9:00 PM",
      exit_timings: "6:00 AM - 9:00 PM",
      mess_available: true,
      mess_timings: {
        breakfast: "7:00 AM - 9:00 AM",
        lunch: "12:00 PM - 2:00 PM",
        snacks: "4:00 PM - 6:00 PM",
        dinner: "7:00 PM - 9:00 PM"
      },
      weekly_menu: {
        "Monday": ["Idli Sambar", "Curd Rice", "Tea", "Chapati Curry"],
        "Tuesday": ["Dosa", "Biryani", "Coffee", "Dal Rice"]
      },
      nearby_facilities: ["Medical Center", "Library", "Shopping Complex", "ATM"],
      images: ["/girls-hostel-room.png"],
      rating: 4.5,
      total_reviews: 124,
      is_active: true,
      created_at: "2024-01-01T00:00:00Z",
      updated_at: "2024-01-01T00:00:00Z"
    }
  ]

  useEffect(() => {
    // For development, using mock data
    setItems(mockHostels)
    setLoading(false)
  }, [search, collegeFilter, typeFilter])

  const onDelete = async (id: string) => {
    if (!confirm("Delete this hostel? This cannot be undone.")) return
    // await deleteHostel(id)
    setItems((prev) => prev.filter((h) => h.id !== id))
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "boys":
        return "bg-blue-100 text-blue-700 border-blue-200"
      case "girls":
        return "bg-pink-100 text-pink-700 border-pink-200"
      case "mixed":
        return "bg-purple-100 text-purple-700 border-purple-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold font-space-grotesk">Hostel Management</h1>
            <p className="text-muted-foreground mt-2">Manage hostel information, facilities, and room details</p>
          </div>
          <Link href="/admin/hostels/new">
            <Button>
              <Plus className="h-4 w-4 mr-2" /> Add Hostel
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
                    placeholder="Search hostels by name..."
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
                    <SelectItem value="boys">Boys</SelectItem>
                    <SelectItem value="girls">Girls</SelectItem>
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
              <Home className="h-5 w-5 mr-2 text-primary"/>
              Hostels ({items.length})
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
                      <TableHead>Capacity</TableHead>
                      <TableHead>Available</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {items.map((hostel) => (
                      <TableRow key={hostel.id}>
                        <TableCell>
                          <div>
                            <div className="font-semibold">{hostel.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {hostel.amenities.slice(0, 3).join(", ")}
                              {hostel.amenities.length > 3 && ` +${hostel.amenities.length - 3} more`}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={`${getTypeColor(hostel.type)} capitalize`}>
                            {hostel.type}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span>{hostel.capacity}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            <Building2 className="h-4 w-4 text-muted-foreground" />
                            <span>{hostel.available_rooms}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 text-yellow-500 fill-current" />
                            <span className="font-semibold">{hostel.rating}</span>
                            <span className="text-sm text-muted-foreground">
                              ({hostel.total_reviews})
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={hostel.is_active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}>
                            {hostel.is_active ? "Active" : "Inactive"}
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
                                <Link href={`/admin/hostels/${hostel.id}/edit`} className="flex items-center">
                                  <Edit className="mr-2 h-4 w-4" /> Edit
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600" onClick={() => onDelete(hostel.id)}>
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
