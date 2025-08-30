"use client"

import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin } from "lucide-react"

interface LocationInfoProps {
  formData: {
    location: string
    state: string
    city: string
    pincode: string
  }
  updateFormData: (field: string, value: string) => void
}

const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana",
  "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Delhi", "Jammu and Kashmir",
  "Ladakh", "Puducherry", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu", "Lakshadweep",
  "Andaman and Nicobar Islands"
]

export function LocationInfo({ formData, updateFormData }: LocationInfoProps) {
  return (
    <div className="bg-card rounded-xl border border-border p-8 space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
          <MapPin className="h-5 w-5 text-secondary" />
        </div>
        <h3 className="text-xl font-semibold text-foreground">Location Information</h3>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Full Address *</label>
        <Input
          placeholder="Enter complete address"
          value={formData.location}
          onChange={(e) => updateFormData('location', e.target.value)}
          className="border-2 border-border focus:border-primary/50 transition-colors"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">State *</label>
          <Select value={formData.state} onValueChange={(value) => updateFormData('state', value)}>
            <SelectTrigger className="border-2 border-border focus:border-primary/50 transition-colors">
              <SelectValue placeholder="Select state" />
            </SelectTrigger>
            <SelectContent>
              {indianStates.map((state) => (
                <SelectItem key={state} value={state}>
                  {state}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">City *</label>
          <Input
            placeholder="Enter city"
            value={formData.city}
            onChange={(e) => updateFormData('city', e.target.value)}
            className="border-2 border-border focus:border-primary/50 transition-colors"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Pincode</label>
          <Input
            placeholder="e.g., 110016"
            value={formData.pincode}
            onChange={(e) => updateFormData('pincode', e.target.value)}
            className="border-2 border-border focus:border-primary/50 transition-colors"
          />
        </div>
      </div>
    </div>
  )
}
