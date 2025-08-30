"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { User, Plus, Search, Edit, Trash2, MoreHorizontal, Mail, Calendar, Shield } from "lucide-react"
import { AdminLayout } from "@/components/admin/admin-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface UserProfile {
  id: string
  email: string
  full_name: string
  username?: string
  avatar_url?: string
  role: 'user' | 'admin' | 'moderator'
  status: 'active' | 'inactive' | 'suspended'
  email_verified: boolean
  last_sign_in: string
  created_at: string
  total_reviews: number
  total_posts: number
}

export default function UsersAdminPage() {
  const [search, setSearch] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [items, setItems] = useState<UserProfile[]>([])
  const [loading, setLoading] = useState(true)

  // Mock data for development
  const mockUsers: UserProfile[] = [
    {
      id: "1",
      email: "john.doe@email.com",
      full_name: "John Doe",
      username: "johndoe",
      avatar_url: "",
      role: "user",
      status: "active",
      email_verified: true,
      last_sign_in: "2024-01-20T10:30:00Z",
      created_at: "2024-01-01T00:00:00Z",
      total_reviews: 12,
      total_posts: 8
    },
    {
      id: "2",
      email: "admin@collegefinder.com",
      full_name: "Admin User",
      username: "admin",
      avatar_url: "",
      role: "admin",
      status: "active",
      email_verified: true,
      last_sign_in: "2024-01-21T09:15:00Z",
      created_at: "2023-12-01T00:00:00Z",
      total_reviews: 0,
      total_posts: 0
    },
    {
      id: "3",
      email: "jane.smith@email.com",
      full_name: "Jane Smith",
      username: "janesmith",
      avatar_url: "",
      role: "moderator",
      status: "active",
      email_verified: true,
      last_sign_in: "2024-01-19T14:45:00Z",
      created_at: "2024-01-05T00:00:00Z",
      total_reviews: 5,
      total_posts: 15
    },
    {
      id: "4",
      email: "suspended.user@email.com",
      full_name: "Suspended User",
      username: "suspendeduser",
      avatar_url: "",
      role: "user",
      status: "suspended",
      email_verified: true,
      last_sign_in: "2024-01-10T16:20:00Z",
      created_at: "2024-01-08T00:00:00Z",
      total_reviews: 3,
      total_posts: 2
    }
  ]

  useEffect(() => {
    // For development, using mock data
    setItems(mockUsers)
    setLoading(false)
  }, [search, roleFilter, statusFilter])

  const onDelete = async (id: string) => {
    if (!confirm("Delete this user? This cannot be undone.")) return
    // await deleteUser(id)
    setItems((prev) => prev.filter((u) => u.id !== id))
  }

  const onSuspend = async (id: string) => {
    if (!confirm("Suspend this user?")) return
    // await suspendUser(id)
    setItems((prev) => prev.map(u => u.id === id ? { ...u, status: 'suspended' as const } : u))
  }

  const onActivate = async (id: string) => {
    // await activateUser(id)
    setItems((prev) => prev.map(u => u.id === id ? { ...u, status: 'active' as const } : u))
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-red-100 text-red-700 border-red-200"
      case "moderator":
        return "bg-blue-100 text-blue-700 border-blue-200"
      case "user":
        return "bg-green-100 text-green-700 border-green-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-700 border-green-200"
      case "inactive":
        return "bg-yellow-100 text-yellow-700 border-yellow-200"
      case "suspended":
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
            <h1 className="text-4xl font-bold font-space-grotesk">User Management</h1>
            <p className="text-muted-foreground mt-2">Manage user accounts, roles, and permissions</p>
          </div>
          <Link href="/admin/users/new">
            <Button>
              <Plus className="h-4 w-4 mr-2" /> Add User
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
                    placeholder="Search users by name or email..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Select value={roleFilter} onValueChange={setRoleFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="moderator">Moderator</SelectItem>
                    <SelectItem value="user">User</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="suspended">Suspended</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="h-5 w-5 mr-2 text-primary"/>
              Users ({items.length})
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
                      <TableHead>User</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Activity</TableHead>
                      <TableHead>Last Sign In</TableHead>
                      <TableHead>Joined</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {items.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <Avatar className="w-8 h-8">
                              <AvatarImage src={user.avatar_url} alt={user.full_name} />
                              <AvatarFallback>
                                {user.full_name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-semibold">{user.full_name}</div>
                              <div className="text-sm text-muted-foreground flex items-center">
                                <Mail className="h-3 w-3 mr-1" />
                                {user.email}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={`${getRoleColor(user.role)} capitalize`}>
                            <Shield className="h-3 w-3 mr-1" />
                            {user.role}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={`${getStatusColor(user.status)} capitalize`}>
                            {user.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div>{user.total_reviews} reviews</div>
                            <div className="text-muted-foreground">{user.total_posts} posts</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm text-muted-foreground">
                            {new Date(user.last_sign_in).toLocaleDateString()}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm text-muted-foreground">
                            {new Date(user.created_at).toLocaleDateString()}
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
                                <Link href={`/admin/users/${user.id}/edit`} className="flex items-center">
                                  <Edit className="mr-2 h-4 w-4" /> Edit
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              {user.status === 'suspended' ? (
                                <DropdownMenuItem onClick={() => onActivate(user.id)}>
                                  Activate User
                                </DropdownMenuItem>
                              ) : (
                                <DropdownMenuItem onClick={() => onSuspend(user.id)}>
                                  Suspend User
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600" onClick={() => onDelete(user.id)}>
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
