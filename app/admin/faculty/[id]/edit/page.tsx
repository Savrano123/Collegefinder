"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import Link from "next/link"
import { Save, ArrowLeft, Users } from "lucide-react"
import { AdminLayout } from "@/components/admin/admin-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { getFacultyById, updateFaculty } from "@/lib/database"
import type { Faculty } from "@/lib/supabase"

export default function EditFacultyPage() {
  const router = useRouter()
  const params = useParams<{ id: string }>()
  const id = params?.id
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [form, setForm] = useState({
    department_id: "",
    name: "",
    designation: "",
    qualification: "",
    specialization: "",
    research_areas: "",
    experience_years: "",
    email: "",
    phone: "",
    image_url: "",
  })

  useEffect(() => {
    let cancelled = false
    if (!id) return
    ;(async () => {
      setLoading(true)
      try {
        const f = (await getFacultyById(id)) as Faculty
        if (cancelled) return
        setForm({
          department_id: f.department_id || "",
          name: f.name || "",
          designation: f.designation || "",
          qualification: f.qualification || "",
          specialization: (f.specialization || []).join(", "),
          research_areas: (f.research_areas || []).join(", "),
          experience_years: f.experience_years?.toString?.() || "",
          email: f.email || "",
          phone: f.phone || "",
          image_url: f.image_url || "",
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
      await updateFaculty(id, {
        department_id: form.department_id,
        name: form.name,
        designation: form.designation || undefined,
        qualification: form.qualification || undefined,
        specialization: form.specialization ? form.specialization.split(",").map(s=>s.trim()).filter(Boolean) : undefined,
        research_areas: form.research_areas ? form.research_areas.split(",").map(s=>s.trim()).filter(Boolean) : undefined,
        experience_years: form.experience_years ? Number(form.experience_years) : undefined,
        email: form.email || undefined,
        phone: form.phone || undefined,
        image_url: form.image_url || undefined,
      })
      router.push("/admin/faculty")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex items-center gap-4">
          <Link href="/admin/faculty">
            <Button variant="ghost"><ArrowLeft className="h-4 w-4 mr-2"/>Back</Button>
          </Link>
          <h1 className="text-3xl font-bold flex items-center"><Users className="h-6 w-6 mr-2 text-primary"/>Edit Faculty</h1>
        </div>

        {loading ? (
          <div className="p-8 text-center text-muted-foreground">Loading...</div>
        ) : (
          <form onSubmit={submit} className="space-y-8">
            <Card>
              <CardHeader><CardTitle>Details</CardTitle></CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label>Department ID</Label>
                  <Input value={form.department_id} onChange={(e)=>handleChange("department_id", e.target.value)} required />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label>Name</Label>
                    <Input value={form.name} onChange={(e)=>handleChange("name", e.target.value)} required />
                  </div>
                  <div>
                    <Label>Designation</Label>
                    <Input value={form.designation} onChange={(e)=>handleChange("designation", e.target.value)} />
                  </div>
                  <div>
                    <Label>Qualification</Label>
                    <Input value={form.qualification} onChange={(e)=>handleChange("qualification", e.target.value)} />
                  </div>
                  <div>
                    <Label>Experience (years)</Label>
                    <Input type="number" value={form.experience_years} onChange={(e)=>handleChange("experience_years", e.target.value)} />
                  </div>
                  <div>
                    <Label>Specialization (comma separated)</Label>
                    <Textarea value={form.specialization} onChange={(e)=>handleChange("specialization", e.target.value)} rows={2} />
                  </div>
                  <div>
                    <Label>Research Areas (comma separated)</Label>
                    <Textarea value={form.research_areas} onChange={(e)=>handleChange("research_areas", e.target.value)} rows={2} />
                  </div>
                  <div>
                    <Label>Email</Label>
                    <Input type="email" value={form.email} onChange={(e)=>handleChange("email", e.target.value)} />
                  </div>
                  <div>
                    <Label>Phone</Label>
                    <Input value={form.phone} onChange={(e)=>handleChange("phone", e.target.value)} />
                  </div>
                  <div>
                    <Label>Image URL</Label>
                    <Input value={form.image_url} onChange={(e)=>handleChange("image_url", e.target.value)} />
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end gap-3">
              <Link href="/admin/faculty"><Button variant="outline">Cancel</Button></Link>
              <Button type="submit" disabled={submitting}><Save className="h-4 w-4 mr-2"/>Save Changes</Button>
            </div>
          </form>
        )}
      </div>
    </AdminLayout>
  )
}

