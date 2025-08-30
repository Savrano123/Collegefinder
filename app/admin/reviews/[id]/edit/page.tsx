"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import Link from "next/link"
import { Save, ArrowLeft, MessageSquare } from "lucide-react"
import { AdminLayout } from "@/components/admin/admin-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { updateReview, getReviewById } from "@/lib/database"

export default function EditReviewPage() {
  const router = useRouter()
  const params = useParams<{ id: string }>()
  const id = params?.id
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [form, setForm] = useState({
    title: "",
    content: "",
    rating: "",
    status: "pending" as "pending" | "approved" | "rejected" | "flagged",
  })

  useEffect(() => {
    let cancelled = false
    if (!id) return
    ;(async () => {
      setLoading(true)
      try {
        const found = await getReviewById(id)
        if (cancelled || !found) return
        setForm({
          title: found.title || "",
          content: found.content || "",
          rating: String(found.rating || ''),
          status: found.status,
        })
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => { cancelled = true }
  }, [id])

  const handleChange = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }))

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!id) return
    setSubmitting(true)
    try {
      await updateReview(id, {
        title: form.title || undefined,
        content: form.content,
        rating: form.rating ? Number(form.rating) : undefined,
        status: form.status,
      })
      router.push("/admin/reviews")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex items-center gap-4">
          <Link href="/admin/reviews">
            <Button variant="ghost"><ArrowLeft className="h-4 w-4 mr-2"/>Back</Button>
          </Link>
          <h1 className="text-3xl font-bold flex items-center"><MessageSquare className="h-6 w-6 mr-2 text-primary"/>Edit Review</h1>
        </div>

        {loading ? (
          <div className="p-8 text-center text-muted-foreground">Loading...</div>
        ) : (
          <form onSubmit={submit} className="space-y-8">
            <Card>
              <CardHeader><CardTitle>Details</CardTitle></CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label>Title</Label>
                    <Input value={form.title} onChange={(e)=>handleChange("title", e.target.value)} />
                  </div>
                  <div>
                    <Label>Rating</Label>
                    <Input type="number" min={1} max={5} value={form.rating} onChange={(e)=>handleChange("rating", e.target.value)} />
                  </div>
                  <div>
                    <Label>Status</Label>
                    <select className="w-full border rounded-md h-10 px-3" value={form.status} onChange={(e)=>handleChange("status", e.target.value)}>
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                      <option value="flagged">Flagged</option>
                    </select>
                  </div>
                </div>
                <div>
                  <Label>Content</Label>
                  <Textarea rows={8} value={form.content} onChange={(e)=>handleChange("content", e.target.value)} />
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end gap-3">
              <Link href="/admin/reviews"><Button variant="outline">Cancel</Button></Link>
              <Button type="submit" disabled={submitting}><Save className="h-4 w-4 mr-2"/>Save Changes</Button>
            </div>
          </form>
        )}
      </div>
    </AdminLayout>
  )
}

