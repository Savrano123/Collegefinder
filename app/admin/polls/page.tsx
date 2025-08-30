"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { BarChart3, Plus, Search, Edit, Trash2, MoreHorizontal, Users, Calendar, TrendingUp } from "lucide-react"
import { AdminLayout } from "@/components/admin/admin-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Poll } from "@/lib/supabase"
import { getPolls } from "@/lib/database"

export default function PollsAdminPage() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [collegeFilter, setCollegeFilter] = useState("all")
  const [items, setItems] = useState<Poll[]>([])
  const [loading, setLoading] = useState(true)

  // Mock data for development
  const mockPolls: Poll[] = [
    {
      id: "1",
      user_id: "user1",
      college_id: "1",
      title: "Best Engineering Branch for Placements",
      description: "Which engineering branch offers the best placement opportunities?",
      poll_type: "single_choice",
      options: [
        { id: "1", text: "Computer Science", votes: 245 },
        { id: "2", text: "Electronics & Communication", votes: 89 },
        { id: "3", text: "Mechanical", votes: 67 },
        { id: "4", text: "Civil", votes: 34 }
      ],
      total_votes: 435,
      is_anonymous: false,
      expires_at: "2024-12-31T23:59:59Z",
      status: "active",
      created_at: "2024-01-15T00:00:00Z",
      updated_at: "2024-01-15T00:00:00Z"
    },
    {
      id: "2",
      user_id: "user2",
      college_id: "1",
      title: "Campus Hostel Food Quality Rating",
      description: "Rate the overall quality of hostel mess food",
      poll_type: "rating",
      options: [
        { id: "1", text: "1 Star", votes: 12 },
        { id: "2", text: "2 Stars", votes: 34 },
        { id: "3", text: "3 Stars", votes: 89 },
        { id: "4", text: "4 Stars", votes: 45 },
        { id: "5", text: "5 Stars", votes: 23 }
      ],
      total_votes: 203,
      is_anonymous: true,
      expires_at: "2024-06-30T23:59:59Z",
      status: "active",
      created_at: "2024-02-01T00:00:00Z",
      updated_at: "2024-02-01T00:00:00Z"
    },
    {
      id: "3",
      user_id: "user3",
      college_id: "2",
      title: "Should the college extend library hours?",
      description: "Vote on whether the library should stay open 24/7 during exam periods",
      poll_type: "yes_no",
      options: [
        { id: "1", text: "Yes", votes: 156 },
        { id: "2", text: "No", votes: 78 }
      ],
      total_votes: 234,
      is_anonymous: false,
      expires_at: "2024-03-15T23:59:59Z",
      status: "closed",
      created_at: "2024-01-20T00:00:00Z",
      updated_at: "2024-03-15T00:00:00Z"
    }
  ]

  useEffect(() => {
    // For development, using mock data
    setItems(mockPolls)
    setLoading(false)
  }, [search, statusFilter, collegeFilter])

  const onDelete = async (id: string) => {
    if (!confirm("Delete this poll? This cannot be undone.")) return
    // await deletePoll(id)
    setItems((prev) => prev.filter((p) => p.id !== id))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-700 border-green-200"
      case "closed":
        return "bg-red-100 text-red-700 border-red-200"
      case "draft":
        return "bg-yellow-100 text-yellow-700 border-yellow-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  const getPollTypeColor = (type: string) => {
    switch (type) {
      case "single_choice":
        return "bg-blue-100 text-blue-700 border-blue-200"
      case "multiple_choice":
        return "bg-purple-100 text-purple-700 border-purple-200"
      case "rating":
        return "bg-orange-100 text-orange-700 border-orange-200"
      case "yes_no":
        return "bg-green-100 text-green-700 border-green-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold font-space-grotesk">Poll Management</h1>
            <p className="text-muted-foreground mt-2">Manage community polls, surveys, and voting systems</p>
          </div>
          <Link href="/admin/polls/new">
            <Button>
              <Plus className="h-4 w-4 mr-2" /> Create Poll
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
                    placeholder="Search polls by title..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
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
              <BarChart3 className="h-5 w-5 mr-2 text-primary"/>
              Polls ({items.length})
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
                      <TableHead>Title</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Votes</TableHead>
                      <TableHead>Options</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {items.map((poll) => (
                      <TableRow key={poll.id}>
                        <TableCell>
                          <div>
                            <div className="font-semibold">{poll.title}</div>
                            <div className="text-sm text-muted-foreground">
                              {poll.description?.substring(0, 60)}...
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={`${getPollTypeColor(poll.poll_type)} capitalize`}>
                            {poll.poll_type.replace('_', ' ')}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            <TrendingUp className="h-4 w-4 text-muted-foreground" />
                            <span className="font-semibold">{poll.total_votes}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            <BarChart3 className="h-4 w-4 text-muted-foreground" />
                            <span>{poll.options.length} options</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={`${getStatusColor(poll.status)} capitalize`}>
                            {poll.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm text-muted-foreground">
                            {new Date(poll.created_at).toLocaleDateString()}
                          </div>
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
                                <Link href={`/admin/polls/${poll.id}/edit`} className="flex items-center">
                                  <Edit className="mr-2 h-4 w-4" /> Edit
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600" onClick={() => onDelete(poll.id)}>
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
