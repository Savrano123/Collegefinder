"use client"

import { useEffect, useState } from "react"
import { MessageSquare, Check, X, Flag, Edit, Trash2, Search } from "lucide-react"
import { AdminLayout } from "@/components/admin/admin-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { getReviewsAdmin, updateReviewStatus, deleteReview } from "@/lib/database"

interface AdminReview {
  id: string
  title?: string
  content: string
  rating: number
  status: "pending" | "approved" | "rejected" | "flagged"
  created_at: string
  profiles?: { full_name?: string; username?: string }
}

export default function ReviewsAdminPage() {
  const [status, setStatus] = useState<AdminReview["status"] | undefined>("pending")
  const [search, setSearch] = useState("")
  const [items, setItems] = useState<AdminReview[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    async function load() {
      setLoading(true)
      try {
        const data = await getReviewsAdmin({ status, search, limit: 50 })
        if (!cancelled) setItems(data as any)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return ()=>{ cancelled = true }
  }, [status, search])

  const approve = async (id: string) => {
    await updateReviewStatus(id, "approved")
    setItems((prev) => prev.filter((r) => r.id !== id))
  }
  const reject = async (id: string) => {
    await updateReviewStatus(id, "rejected")
    setItems((prev) => prev.filter((r) => r.id !== id))
  }
  const remove = async (id: string) => {
    if (!confirm("Delete this review?")) return
    await deleteReview(id)
    setItems((prev) => prev.filter((r) => r.id !== id))
  }

  const statusBadge = (s: AdminReview["status"]) => {
    switch (s) {
      case "approved": return <Badge className="bg-green-100 text-green-700">Approved</Badge>
      case "pending": return <Badge className="bg-yellow-100 text-yellow-700">Pending</Badge>
      case "rejected": return <Badge className="bg-red-100 text-red-700">Rejected</Badge>
      case "flagged": return <Badge className="bg-orange-100 text-orange-700">Flagged</Badge>
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold font-space-grotesk">Reviews Moderation</h1>
            <p className="text-muted-foreground mt-2">Approve, reject, edit, or delete user reviews</p>
          </div>
        </div>

        <Card>
          <CardContent className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
              <div className="relative col-span-2">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="Search title or content..." className="pl-10"/>
              </div>
              <div className="flex gap-2">
                <Button variant={status === "pending" ? "default" : "outline"} onClick={()=>setStatus("pending")}>Pending</Button>
                <Button variant={status === "approved" ? "default" : "outline"} onClick={()=>setStatus("approved")}>Approved</Button>
                <Button variant={status === "rejected" ? "default" : "outline"} onClick={()=>setStatus("rejected")}>Rejected</Button>
                <Button variant={status === "flagged" ? "default" : "outline"} onClick={()=>setStatus("flagged")}>Flagged</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center"><MessageSquare className="h-5 w-5 mr-2 text-primary"/>Reviews ({items.length})</CardTitle>
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
                      <TableHead>Rating</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Content</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {items.map((r) => (
                      <TableRow key={r.id}>
                        <TableCell>{r.profiles?.full_name || r.profiles?.username || 'User'}</TableCell>
                        <TableCell>{r.rating}</TableCell>
                        <TableCell className="max-w-[200px] truncate">{r.title || '-'}</TableCell>
                        <TableCell className="max-w-[400px] truncate">{r.content}</TableCell>
                        <TableCell>{statusBadge(r.status)}</TableCell>
                        <TableCell className="text-right space-x-2">
                          {r.status !== 'approved' && (
                            <Button size="sm" onClick={()=>approve(r.id)}><Check className="h-4 w-4 mr-1"/>Approve</Button>
                          )}
                          {r.status !== 'rejected' && (
                            <Button variant="outline" size="sm" onClick={()=>reject(r.id)}><X className="h-4 w-4 mr-1"/>Reject</Button>
                          )}
                          <Button asChild variant="outline" size="sm"><a href={`/admin/reviews/${r.id}/edit`}><Edit className="h-4 w-4 mr-1"/>Edit</a></Button>
                          <Button variant="outline" size="sm" className="text-red-600" onClick={()=>remove(r.id)}><Trash2 className="h-4 w-4 mr-1"/>Delete</Button>
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

