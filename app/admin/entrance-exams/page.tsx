"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { FileText, Plus, Search, Edit, Trash2, MoreHorizontal, Star, Users, Calendar } from "lucide-react"
import { AdminLayout } from "@/components/admin/admin-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { EntranceExam } from "@/lib/supabase"
import { getEntranceExams } from "@/lib/database"

export default function EntranceExamsAdminPage() {
  const [search, setSearch] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [items, setItems] = useState<EntranceExam[]>([])
  const [loading, setLoading] = useState(true)

  // Mock data for development
  const mockExams: EntranceExam[] = [
    {
      id: "1",
      name: "Joint Entrance Examination Advanced",
      short_name: "JEE Advanced",
      description: "National level entrance exam for admission to IITs and other premier engineering institutes",
      conducting_body: "Indian Institute of Technology (IIT)",
      exam_type: "national",
      subjects: ["Physics", "Chemistry", "Mathematics"],
      exam_pattern: {
        duration: "6 hours (3 hours each for Paper 1 and Paper 2)",
        questions: 54,
        marking_scheme: "Partial marking for multiple correct answers"
      },
      eligibility_criteria: "Must qualify JEE Main with top 2,50,000 ranks",
      application_process: "Online application through official JEE Advanced website",
      important_dates: {
        application_start: "May 1, 2024",
        application_end: "May 15, 2024",
        exam_date: "May 26, 2024",
        result_date: "June 15, 2024"
      },
      exam_centers: ["Delhi", "Mumbai", "Bangalore", "Chennai", "Kolkata", "Hyderabad"],
      fees_structure: {
        "General/OBC": "₹2,800",
        "SC/ST/PwD": "₹1,400"
      },
      syllabus_url: "https://jeeadv.ac.in/syllabus",
      official_website: "https://jeeadv.ac.in",
      preparation_tips: [
        "Focus on conceptual understanding",
        "Practice previous year papers",
        "Time management is crucial",
        "Regular mock tests"
      ],
      counseling_process: "JoSAA counseling for seat allocation",
      participating_colleges: 23,
      total_seats: 17000,
      is_active: true,
      created_at: "2024-01-01T00:00:00Z",
      updated_at: "2024-01-01T00:00:00Z"
    },
    {
      id: "2",
      name: "Joint Entrance Examination Main",
      short_name: "JEE Main",
      description: "National level entrance exam for admission to NITs, IIITs, and other engineering colleges",
      conducting_body: "National Testing Agency (NTA)",
      exam_type: "national",
      subjects: ["Physics", "Chemistry", "Mathematics"],
      exam_pattern: {
        duration: "3 hours",
        questions: 90,
        marking_scheme: "+4 for correct, -1 for incorrect"
      },
      eligibility_criteria: "12th pass with PCM and minimum 75% marks",
      application_process: "Online application through NTA website",
      important_dates: {
        application_start: "January 1, 2024",
        application_end: "January 31, 2024",
        exam_date: "April 6-15, 2024",
        result_date: "April 30, 2024"
      },
      exam_centers: ["All major cities across India"],
      fees_structure: {
        "General/OBC": "₹1,000",
        "SC/ST/PwD": "₹500"
      },
      syllabus_url: "https://jeemain.nta.nic.in/syllabus",
      official_website: "https://jeemain.nta.nic.in",
      preparation_tips: [
        "Cover NCERT thoroughly",
        "Practice numerical problems",
        "Focus on speed and accuracy",
        "Regular revision"
      ],
      counseling_process: "JoSAA and state counseling processes",
      participating_colleges: 1200,
      total_seats: 150000,
      is_active: true,
      created_at: "2024-01-01T00:00:00Z",
      updated_at: "2024-01-01T00:00:00Z"
    }
  ]

  useEffect(() => {
    // For development, using mock data
    setItems(mockExams)
    setLoading(false)
  }, [search, typeFilter])

  const onDelete = async (id: string) => {
    if (!confirm("Delete this entrance exam? This cannot be undone.")) return
    // await deleteEntranceExam(id)
    setItems((prev) => prev.filter((e) => e.id !== id))
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "national":
        return "bg-blue-100 text-blue-700 border-blue-200"
      case "state":
        return "bg-green-100 text-green-700 border-green-200"
      case "university":
        return "bg-purple-100 text-purple-700 border-purple-200"
      case "college":
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
            <h1 className="text-4xl font-bold font-space-grotesk">Entrance Exam Management</h1>
            <p className="text-muted-foreground mt-2">Manage entrance exams, eligibility criteria, and exam information</p>
          </div>
          <Link href="/admin/entrance-exams/new">
            <Button>
              <Plus className="h-4 w-4 mr-2" /> Add Entrance Exam
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
                    placeholder="Search entrance exams..."
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
                    <SelectItem value="national">National</SelectItem>
                    <SelectItem value="state">State</SelectItem>
                    <SelectItem value="university">University</SelectItem>
                    <SelectItem value="college">College</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="h-5 w-5 mr-2 text-primary"/>
              Entrance Exams ({items.length})
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
                      <TableHead>Conducting Body</TableHead>
                      <TableHead>Colleges</TableHead>
                      <TableHead>Total Seats</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {items.map((exam) => (
                      <TableRow key={exam.id}>
                        <TableCell>
                          <div>
                            <div className="font-semibold">{exam.short_name}</div>
                            <div className="text-sm text-muted-foreground">
                              {exam.name}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={`${getTypeColor(exam.exam_type)} capitalize`}>
                            {exam.exam_type}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            {exam.conducting_body}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span>{exam.participating_colleges}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>{exam.total_seats.toLocaleString()}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={exam.is_active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}>
                            {exam.is_active ? "Active" : "Inactive"}
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
                                <Link href={`/admin/entrance-exams/${exam.id}/edit`} className="flex items-center">
                                  <Edit className="mr-2 h-4 w-4" /> Edit
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600" onClick={() => onDelete(exam.id)}>
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
