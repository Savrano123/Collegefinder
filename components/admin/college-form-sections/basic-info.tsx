"use client"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Building2 } from "lucide-react"

interface BasicInfoProps {
  formData: {
    name: string
    short_name: string
    description: string
    type: string
    established: string
    nirf_rank: string
  }
  updateFormData: (field: string, value: string) => void
}

export function BasicInfo({ formData, updateFormData }: BasicInfoProps) {
  return (
    <div className="bg-card rounded-xl border border-border p-8 space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <Building2 className="h-5 w-5 text-primary" />
        </div>
        <h3 className="text-xl font-semibold text-foreground">Basic Information</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">College Name *</label>
          <Input
            placeholder="Enter college name"
            value={formData.name}
            onChange={(e) => updateFormData('name', e.target.value)}
            className="border-2 border-border focus:border-primary/50 transition-colors"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Short Name</label>
          <Input
            placeholder="e.g., IIT Delhi"
            value={formData.short_name}
            onChange={(e) => updateFormData('short_name', e.target.value)}
            className="border-2 border-border focus:border-primary/50 transition-colors"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Description *</label>
        <Textarea
          placeholder="Brief description of the college"
          value={formData.description}
          onChange={(e) => updateFormData('description', e.target.value)}
          className="border-2 border-border focus:border-primary/50 transition-colors min-h-[100px]"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">College Type *</label>
          <Select value={formData.type} onValueChange={(value) => updateFormData('type', value)}>
            <SelectTrigger className="border-2 border-border focus:border-primary/50 transition-colors">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="government">Government</SelectItem>
              <SelectItem value="private">Private</SelectItem>
              <SelectItem value="deemed">Deemed</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Established Year</label>
          <Input
            type="number"
            placeholder="e.g., 1961"
            value={formData.established}
            onChange={(e) => updateFormData('established', e.target.value)}
            className="border-2 border-border focus:border-primary/50 transition-colors"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">NIRF Rank</label>
          <Input
            type="number"
            placeholder="e.g., 1"
            value={formData.nirf_rank}
            onChange={(e) => updateFormData('nirf_rank', e.target.value)}
            className="border-2 border-border focus:border-primary/50 transition-colors"
          />
        </div>
      </div>
    </div>
  )
}
