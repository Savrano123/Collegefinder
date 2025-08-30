"use client"

import { Input } from "@/components/ui/input"
import { Phone } from "lucide-react"

interface ContactInfoProps {
  formData: {
    website: string
    phone: string
    email: string
  }
  updateFormData: (field: string, value: string) => void
}

export function ContactInfo({ formData, updateFormData }: ContactInfoProps) {
  return (
    <div className="bg-card rounded-xl border border-border p-8 space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
          <Phone className="h-5 w-5 text-accent" />
        </div>
        <h3 className="text-xl font-semibold text-foreground">Contact Information</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Website</label>
          <Input
            placeholder="https://www.college.edu"
            value={formData.website}
            onChange={(e) => updateFormData('website', e.target.value)}
            className="border-2 border-border focus:border-primary/50 transition-colors"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Phone Number</label>
          <Input
            placeholder="+91-11-2659-1234"
            value={formData.phone}
            onChange={(e) => updateFormData('phone', e.target.value)}
            className="border-2 border-border focus:border-primary/50 transition-colors"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Email Address</label>
          <Input
            type="email"
            placeholder="info@college.edu"
            value={formData.email}
            onChange={(e) => updateFormData('email', e.target.value)}
            className="border-2 border-border focus:border-primary/50 transition-colors"
          />
        </div>
      </div>
    </div>
  )
}
