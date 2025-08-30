"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import { BasicInfo } from "@/components/admin/college-form-sections/basic-info"
import { LocationInfo } from "@/components/admin/college-form-sections/location-info"
import { ContactInfo } from "@/components/admin/college-form-sections/contact-info"

export default function AddCollegePage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    short_name: "",
    description: "",
    type: "",
    established: "",
    nirf_rank: "",
    location: "",
    state: "",
    city: "",
    pincode: "",
    website: "",
    phone: "",
    email: "",
  })

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Validate required fields
      const requiredFields = ['name', 'description', 'type', 'location', 'state', 'city']
      const missingFields = requiredFields.filter(field => !formData[field])
      
      if (missingFields.length > 0) {
        toast({
          title: "Validation Error",
          description: `Please fill in all required fields: ${missingFields.join(', ')}`,
          variant: "destructive",
        })
        return
      }

      const collegeData = {
        name: formData.name,
        short_name: formData.short_name || null,
        description: formData.description,
        type: formData.type,
        established: formData.established ? parseInt(formData.established) : null,
        location: formData.location,
        state: formData.state,
        city: formData.city,
        pincode: formData.pincode || null,
        website: formData.website || null,
        phone: formData.phone || null,
        email: formData.email || null,
        nirf_rank: formData.nirf_rank ? parseInt(formData.nirf_rank) : null,
      }

      // Create college via API endpoint
      const response = await fetch('/api/admin/colleges', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(collegeData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to create college')
      }

      const result = await response.json()

      toast({
        title: "College Added Successfully",
        description: `${formData.name} has been added to the database.`,
      })

      router.push("/admin/colleges")
    } catch (error) {
      console.error("Error creating college:", error)
      toast({
        title: "Error",
        description: "Failed to add college. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link href="/admin/colleges">
              <Button variant="ghost" className="hover:bg-primary/10">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Colleges
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Add New College</h1>
              <p className="text-muted-foreground">Add a new college to the CollegeHub database</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          <BasicInfo formData={formData} updateFormData={updateFormData} />
          <LocationInfo formData={formData} updateFormData={updateFormData} />
          <ContactInfo formData={formData} updateFormData={updateFormData} />

          {/* Submit Buttons */}
          <div className="flex items-center justify-end space-x-4 pt-8">
            <Link href="/admin/colleges">
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </Link>
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="px-8"
            >
              {isSubmitting ? "Adding College..." : "Add College"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
