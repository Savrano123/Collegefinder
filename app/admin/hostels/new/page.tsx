"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Home, Plus, Trash2 } from "lucide-react"
import { AdminLayout } from "@/components/admin/admin-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

interface RoomType {
  type: string
  price: string
  amenities: string[]
}

interface HostelFormData {
  name: string
  college_id: string
  type: "boys" | "girls" | "mixed" | ""
  capacity: string
  available_rooms: string
  room_types: RoomType[]
  amenities: string[]
  rules: string
  entry_timings: string
  exit_timings: string
  mess_available: boolean
  mess_timings: {
    breakfast: string
    lunch: string
    snacks: string
    dinner: string
  }
  nearby_facilities: string[]
}

const initialFormData: HostelFormData = {
  name: "",
  college_id: "",
  type: "",
  capacity: "",
  available_rooms: "",
  room_types: [{ type: "", price: "", amenities: [] }],
  amenities: [],
  rules: "",
  entry_timings: "",
  exit_timings: "",
  mess_available: true,
  mess_timings: {
    breakfast: "",
    lunch: "",
    snacks: "",
    dinner: ""
  },
  nearby_facilities: []
}

const commonAmenities = [
  "WiFi", "Laundry", "Common Room", "Gym", "Cafeteria", "Security", "Garden", 
  "Study Hall", "Recreation Room", "Medical Facility", "ATM", "Parking"
]

const commonFacilities = [
  "Medical Center", "Library", "Sports Complex", "Canteen", "Shopping Complex", 
  "ATM", "Bank", "Post Office", "Stationery Shop", "Photocopy Center"
]

export default function NewHostelPage() {
  const [formData, setFormData] = useState<HostelFormData>(initialFormData)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleInputChange = (field: keyof HostelFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleMessTimingChange = (meal: keyof HostelFormData['mess_timings'], value: string) => {
    setFormData(prev => ({
      ...prev,
      mess_timings: { ...prev.mess_timings, [meal]: value }
    }))
  }

  const handleRoomTypeChange = (index: number, field: keyof RoomType, value: any) => {
    const updatedRoomTypes = [...formData.room_types]
    updatedRoomTypes[index] = { ...updatedRoomTypes[index], [field]: value }
    setFormData(prev => ({ ...prev, room_types: updatedRoomTypes }))
  }

  const addRoomType = () => {
    setFormData(prev => ({
      ...prev,
      room_types: [...prev.room_types, { type: "", price: "", amenities: [] }]
    }))
  }

  const removeRoomType = (index: number) => {
    if (formData.room_types.length > 1) {
      setFormData(prev => ({
        ...prev,
        room_types: prev.room_types.filter((_, i) => i !== index)
      }))
    }
  }

  const handleAmenityToggle = (amenity: string, checked: boolean) => {
    if (checked) {
      setFormData(prev => ({ ...prev, amenities: [...prev.amenities, amenity] }))
    } else {
      setFormData(prev => ({ ...prev, amenities: prev.amenities.filter(a => a !== amenity) }))
    }
  }

  const handleFacilityToggle = (facility: string, checked: boolean) => {
    if (checked) {
      setFormData(prev => ({ ...prev, nearby_facilities: [...prev.nearby_facilities, facility] }))
    } else {
      setFormData(prev => ({ ...prev, nearby_facilities: prev.nearby_facilities.filter(f => f !== facility) }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Here you would normally submit to your API
      // const response = await createHostel(formData)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))

      toast({
        title: "Hostel Added Successfully",
        description: `${formData.name} has been added to the database.`,
      })

      router.push("/admin/hostels")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add hostel. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/admin/hostels">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Hostels
              </Button>
            </Link>
            <div>
              <h1 className="text-4xl font-bold font-space-grotesk text-foreground">Add New Hostel</h1>
              <p className="text-muted-foreground font-dm-sans mt-2">
                Create a new hostel with detailed information and facilities
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <Card className="border-2 border-border">
            <CardHeader>
              <CardTitle className="text-2xl font-space-grotesk flex items-center">
                <Home className="h-6 w-6 mr-2 text-primary" />
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label className="text-sm font-semibold text-foreground">Hostel Name *</Label>
                  <Input
                    placeholder="e.g., Hostel Block A"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="mt-2 border-2 border-border focus:border-primary"
                    required
                  />
                </div>
                <div>
                  <Label className="text-sm font-semibold text-foreground">College *</Label>
                  <Select value={formData.college_id} onValueChange={(value) => handleInputChange("college_id", value)}>
                    <SelectTrigger className="mt-2 border-2 border-border focus:border-primary">
                      <SelectValue placeholder="Select college" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">IIT Bombay</SelectItem>
                      <SelectItem value="2">NIT Trichy</SelectItem>
                      <SelectItem value="3">BITS Pilani</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-sm font-semibold text-foreground">Type *</Label>
                  <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)}>
                    <SelectTrigger className="mt-2 border-2 border-border focus:border-primary">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="boys">Boys</SelectItem>
                      <SelectItem value="girls">Girls</SelectItem>
                      <SelectItem value="mixed">Mixed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-sm font-semibold text-foreground">Total Capacity *</Label>
                  <Input
                    type="number"
                    placeholder="e.g., 200"
                    value={formData.capacity}
                    onChange={(e) => handleInputChange("capacity", e.target.value)}
                    className="mt-2 border-2 border-border focus:border-primary"
                    required
                  />
                </div>
                <div>
                  <Label className="text-sm font-semibold text-foreground">Available Rooms</Label>
                  <Input
                    type="number"
                    placeholder="e.g., 15"
                    value={formData.available_rooms}
                    onChange={(e) => handleInputChange("available_rooms", e.target.value)}
                    className="mt-2 border-2 border-border focus:border-primary"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Room Types */}
          <Card className="border-2 border-border">
            <CardHeader>
              <CardTitle className="text-2xl font-space-grotesk">Room Types & Pricing</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {formData.room_types.map((roomType, index) => (
                <div key={index} className="p-4 border-2 border-border rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold">Room Type {index + 1}</h4>
                    {formData.room_types.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeRoomType(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-semibold">Room Type</Label>
                      <Input
                        placeholder="e.g., Single, Double, Triple"
                        value={roomType.type}
                        onChange={(e) => handleRoomTypeChange(index, "type", e.target.value)}
                        className="mt-2 border-2 border-border focus:border-primary"
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-semibold">Price</Label>
                      <Input
                        placeholder="e.g., ₹15,000/year"
                        value={roomType.price}
                        onChange={(e) => handleRoomTypeChange(index, "price", e.target.value)}
                        className="mt-2 border-2 border-border focus:border-primary"
                      />
                    </div>
                  </div>
                </div>
              ))}
              <Button type="button" variant="outline" onClick={addRoomType}>
                <Plus className="h-4 w-4 mr-2" />
                Add Room Type
              </Button>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <Link href="/admin/hostels">
              <Button type="button" variant="outline">Cancel</Button>
            </Link>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Adding..." : "Add Hostel"}
            </Button>
          </div>
        </form>
      </div>
    </AdminLayout>
  )
}
