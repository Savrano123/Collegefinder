"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { BookOpen, Plus, Search, Edit, Trash2, MoreHorizontal, Users, GraduationCap } from "lucide-react"
import { AdminLayout } from "@/components/admin/admin-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Department } from "@/lib/supabase"
import { getDepartmentsByCollegeId } from "@/lib/database"

export default function DepartmentsAdminPage() {
  const [search, setSearch] = useState("")
  const [collegeFilter, setCollegeFilter] = useState("all")
  const [items, setItems] = useState<Department[]>([])
  const [loading, setLoading] = useState(true)

  // Mock data for development
  const mockDepartments: Department[] = [
    {
      id: "1",
      college_id: "1",
      name: "Computer Science and Engineering",
      short_name: "CSE",
      description: "Leading department in computer science education and research",
      head_of_department: "Dr. Rajesh Kumar",
      established_year: 1970,
      total_faculty: 45,
      total_students: 320,
      programs_offered: ["B.Tech", "M.Tech", "PhD"],
      specializations: ["Artificial Intelligence", "Machine Learning", "Data Science", "Cybersecurity"],
      research_areas: ["AI/ML", "Computer Vision", "Natural Language Processing", "Distributed Systems"],
      labs: ["AI Lab", "Networks Lab", "Software Engineering Lab", "Database Lab"],
      accreditations: ["NBA", "NAAC A+"],
      placement_stats: {
        average_package: "₹12 LPA",
        highest_package: "₹45 LPA",
        placement_percentage: 95
      },
      contact_info: {
        email: "cse@iitb.ac.in",
        phone: "+91-22-2576-7890",
        office: "Main Building, 3rd Floor"
      },
      website_url: "https://cse.iitb.ac.in",
      is_active: true,
      created_at: "2024-01-01T00:00:00Z",
      updated_at: "2024-01-01T00:00:00Z"
    },
    {
      id: "2",
      college_id: "1",
      name: "Mechanical Engineering",
      short_name: "MECH",
      description: "Premier mechanical engineering department with state-of-the-art facilities",
      head_of_department: "Dr. Priya Sharma",
      established_year: 1958,
      total_faculty: 38,
      total_students: 280,
      programs_offered: ["B.Tech", "M.Tech", "PhD"],
      specializations: ["Thermal Engineering", "Design Engineering", "Manufacturing", "Robotics"],
      research_areas: ["Heat Transfer", "Fluid Mechanics", "Manufacturing Processes", "Robotics"],
      labs: ["Thermal Lab", "Manufacturing Lab", "CAD/CAM Lab", "Robotics Lab"],
      accreditations: ["NBA", "NAAC A+"],
      placement_stats: {
        average_package: "₹8.5 LPA",
        highest_package: "₹25 LPA",
        placement_percentage: 88
      },
      contact_info: {
        email: "mech@iitb.ac.in",
        phone: "+91-22-2576-7891",
        office: "Engineering Block, 2nd Floor"
      },
      website_url: "https://mech.iitb.ac.in",
      is_active: true,
      created_at: "2024-01-01T00:00:00Z",
      updated_at: "2024-01-01T00:00:00Z"
    }
  ]

  useEffect(() => {
    // For development, using mock data
    setItems(mockDepartments)
    setLoading(false)
  }, [search, collegeFilter])

  const onDelete = async (id: string) => {
    if (!confirm("Delete this department? This cannot be undone.")) return
    // await deleteDepartment(id)
    setItems((prev) => prev.filter((d) => d.id !== id))
  }

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold font-space-grotesk">Department Management</h1>
            <p className="text-muted-foreground mt-2">Manage academic departments, programs, and faculty information</p>
          </div>
          <Link href="/admin/departments/new">
            <Button>
              <Plus className="h-4 w-4 mr-2" /> Add Department
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
                    placeholder="Search departments by name..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex items-center space-x-4">
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
              <BookOpen className="h-5 w-5 mr-2 text-primary"/>
              Departments ({items.length})
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
                      <TableHead>Department</TableHead>
                      <TableHead>Head</TableHead>
                      <TableHead>Faculty</TableHead>
                      <TableHead>Students</TableHead>
                      <TableHead>Programs</TableHead>
                      <TableHead>Placement</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {items.map((department) => (
                      <TableRow key={department.id}>
                        <TableCell>
                          <div>
                            <div className="font-semibold">{department.short_name}</div>
                            <div className="text-sm text-muted-foreground">
                              {department.name}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            {department.head_of_department}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span>{department.total_faculty}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            <GraduationCap className="h-4 w-4 text-muted-foreground" />
                            <span>{department.total_students}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {department.programs_offered.slice(0, 2).map((program) => (
                              <Badge key={program} variant="secondary" className="text-xs">
                                {program}
                              </Badge>
                            ))}
                            {department.programs_offered.length > 2 && (
                              <Badge variant="secondary" className="text-xs">
                                +{department.programs_offered.length - 2}
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div className="font-semibold">{department.placement_stats.placement_percentage}%</div>
                            <div className="text-muted-foreground">{department.placement_stats.average_package}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={department.is_active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}>
                            {department.is_active ? "Active" : "Inactive"}
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
                                <Link href={`/admin/departments/${department.id}/edit`} className="flex items-center">
                                  <Edit className="mr-2 h-4 w-4" /> Edit
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600" onClick={() => onDelete(department.id)}>
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
