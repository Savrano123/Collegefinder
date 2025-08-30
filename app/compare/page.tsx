"use client"

import { useState } from "react"
import {
  Search,
  Plus,
  X,
  Star,
  MapPin,
  Building2,
  Users,
  Trophy,
  GraduationCap,
  ArrowLeft,
  Check,
  Minus,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Link from "next/link"

const mockColleges = [
  {
    id: "iit-bombay",
    name: "IIT Bombay",
    fullName: "Indian Institute of Technology Bombay",
    location: "Mumbai, Maharashtra",
    logo: "/iit-bombay-logo.png",
    nirfRank: 3,
    rating: 4.8,
    reviews: 1247,
    fees: "2.18 LPA",
    placementRate: 95,
    averagePackage: "21.82 LPA",
    highestPackage: "1.8 CPA",
    type: "Government",
    established: 1958,
    students: 11000,
    faculty: 650,
    departments: 18,
    campusSize: "550 acres",
    hostelFees: "15,000/year",
    features: {
      library: true,
      gym: true,
      wifi: true,
      sports: true,
      medical: true,
      canteen: true,
      labs: true,
      auditorium: true,
    },
  },
  {
    id: "iit-delhi",
    name: "IIT Delhi",
    fullName: "Indian Institute of Technology Delhi",
    location: "New Delhi, Delhi",
    logo: "/generic-university-logo.png",
    nirfRank: 2,
    rating: 4.7,
    reviews: 1156,
    fees: "2.18 LPA",
    placementRate: 93,
    averagePackage: "20.5 LPA",
    highestPackage: "1.5 CPA",
    type: "Government",
    established: 1961,
    students: 10500,
    faculty: 620,
    departments: 16,
    campusSize: "325 acres",
    hostelFees: "14,000/year",
    features: {
      library: true,
      gym: true,
      wifi: true,
      sports: true,
      medical: true,
      canteen: true,
      labs: true,
      auditorium: true,
    },
  },
  {
    id: "bits-pilani",
    name: "BITS Pilani",
    fullName: "Birla Institute of Technology and Science, Pilani",
    location: "Pilani, Rajasthan",
    logo: "/bits-pilani-logo.png",
    nirfRank: 24,
    rating: 4.5,
    reviews: 987,
    fees: "4.45 LPA",
    placementRate: 88,
    averagePackage: "16.8 LPA",
    highestPackage: "60 LPA",
    type: "Private",
    established: 1964,
    students: 15000,
    faculty: 450,
    departments: 12,
    campusSize: "328 acres",
    hostelFees: "45,000/year",
    features: {
      library: true,
      gym: true,
      wifi: true,
      sports: true,
      medical: true,
      canteen: true,
      labs: true,
      auditorium: false,
    },
  },
]

const comparisonCategories = [
  { id: "basic", name: "Basic Information", icon: Building2 },
  { id: "academics", name: "Academics", icon: GraduationCap },
  { id: "placements", name: "Placements", icon: Trophy },
  { id: "facilities", name: "Facilities", icon: Users },
]

export default function ComparePage() {
  const [selectedColleges, setSelectedColleges] = useState<string[]>(["iit-bombay", "iit-delhi"])
  const [isAddCollegeOpen, setIsAddCollegeOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState("basic")

  const addCollege = (collegeId: string) => {
    if (selectedColleges.length < 4 && !selectedColleges.includes(collegeId)) {
      setSelectedColleges([...selectedColleges, collegeId])
    }
    setIsAddCollegeOpen(false)
  }

  const removeCollege = (collegeId: string) => {
    setSelectedColleges(selectedColleges.filter((id) => id !== collegeId))
  }

  const getSelectedCollegeData = () => {
    return selectedColleges.map((id) => mockColleges.find((college) => college.id === id)).filter(Boolean)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
              <div className="flex items-center space-x-2">
                <GraduationCap className="h-8 w-8 text-blue-600" />
                <span className="text-2xl font-bold text-gray-900">CollegeHub</span>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Button variant="ghost">Login</Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Compare Colleges</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Compare colleges side by side to make informed decisions about your future education.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* College Selection */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Selected Colleges ({selectedColleges.length}/4)</h2>
            <Dialog open={isAddCollegeOpen} onOpenChange={setIsAddCollegeOpen}>
              <DialogTrigger asChild>
                <Button disabled={selectedColleges.length >= 4}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add College
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Add College to Compare</DialogTitle>
                  <DialogDescription>Search and select a college to add to your comparison</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input placeholder="Search colleges..." className="pl-10" />
                  </div>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {mockColleges
                      .filter((college) => !selectedColleges.includes(college.id))
                      .map((college) => (
                        <div
                          key={college.id}
                          className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                          onClick={() => addCollege(college.id)}
                        >
                          <div className="flex items-center space-x-3">
                            <img
                              src={college.logo || "/placeholder.svg"}
                              alt={college.name}
                              className="w-10 h-10 rounded-lg"
                            />
                            <div>
                              <div className="font-medium">{college.name}</div>
                              <div className="text-sm text-gray-600">{college.location}</div>
                            </div>
                          </div>
                          <Button size="sm">Add</Button>
                        </div>
                      ))}
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {getSelectedCollegeData().map((college) => (
              <Card key={college.id} className="relative">
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 right-2 h-8 w-8 p-0"
                  onClick={() => removeCollege(college.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
                <CardHeader className="pb-2">
                  <img
                    src={college.logo || "/placeholder.svg"}
                    alt={college.name}
                    className="w-16 h-16 rounded-lg mx-auto mb-2"
                  />
                  <CardTitle className="text-center text-lg">{college.name}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="text-center space-y-1">
                    <div className="flex items-center justify-center space-x-1">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{college.location}</span>
                    </div>
                    <div className="flex items-center justify-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{college.rating}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {selectedColleges.length < 4 && (
              <Card className="border-dashed border-2 border-gray-300">
                <CardContent className="flex items-center justify-center h-full min-h-[200px]">
                  <Button variant="ghost" onClick={() => setIsAddCollegeOpen(true)}>
                    <Plus className="h-8 w-8 text-gray-400" />
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Comparison Categories */}
        <div className="mb-6">
          <div className="flex space-x-2 overflow-x-auto">
            {comparisonCategories.map((category) => {
              const IconComponent = category.icon
              return (
                <Button
                  key={category.id}
                  variant={activeCategory === category.id ? "default" : "outline"}
                  onClick={() => setActiveCategory(category.id)}
                  className="flex items-center space-x-2 whitespace-nowrap"
                >
                  <IconComponent className="h-4 w-4" />
                  <span>{category.name}</span>
                </Button>
              )
            })}
          </div>
        </div>

        {/* Comparison Table */}
        {selectedColleges.length > 0 && (
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-4 font-medium text-gray-600 w-48">Criteria</th>
                      {getSelectedCollegeData().map((college) => (
                        <th key={college.id} className="text-center p-4 min-w-[200px]">
                          <div className="flex flex-col items-center space-y-2">
                            <img
                              src={college.logo || "/placeholder.svg"}
                              alt={college.name}
                              className="w-12 h-12 rounded-lg"
                            />
                            <span className="font-medium">{college.name}</span>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {activeCategory === "basic" && (
                      <>
                        <tr className="border-b">
                          <td className="p-4 font-medium">Full Name</td>
                          {getSelectedCollegeData().map((college) => (
                            <td key={college.id} className="p-4 text-center">
                              {college.fullName}
                            </td>
                          ))}
                        </tr>
                        <tr className="border-b">
                          <td className="p-4 font-medium">Location</td>
                          {getSelectedCollegeData().map((college) => (
                            <td key={college.id} className="p-4 text-center">
                              {college.location}
                            </td>
                          ))}
                        </tr>
                        <tr className="border-b">
                          <td className="p-4 font-medium">Established</td>
                          {getSelectedCollegeData().map((college) => (
                            <td key={college.id} className="p-4 text-center">
                              {college.established}
                            </td>
                          ))}
                        </tr>
                        <tr className="border-b">
                          <td className="p-4 font-medium">Type</td>
                          {getSelectedCollegeData().map((college) => (
                            <td key={college.id} className="p-4 text-center">
                              <Badge variant={college.type === "Government" ? "default" : "secondary"}>
                                {college.type}
                              </Badge>
                            </td>
                          ))}
                        </tr>
                        <tr className="border-b">
                          <td className="p-4 font-medium">NIRF Rank</td>
                          {getSelectedCollegeData().map((college) => (
                            <td key={college.id} className="p-4 text-center font-semibold text-blue-600">
                              #{college.nirfRank}
                            </td>
                          ))}
                        </tr>
                        <tr className="border-b">
                          <td className="p-4 font-medium">Student Rating</td>
                          {getSelectedCollegeData().map((college) => (
                            <td key={college.id} className="p-4 text-center">
                              <div className="flex items-center justify-center space-x-1">
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                <span className="font-medium">{college.rating}</span>
                                <span className="text-gray-500">({college.reviews})</span>
                              </div>
                            </td>
                          ))}
                        </tr>
                      </>
                    )}

                    {activeCategory === "academics" && (
                      <>
                        <tr className="border-b">
                          <td className="p-4 font-medium">Total Students</td>
                          {getSelectedCollegeData().map((college) => (
                            <td key={college.id} className="p-4 text-center">
                              {college.students.toLocaleString()}
                            </td>
                          ))}
                        </tr>
                        <tr className="border-b">
                          <td className="p-4 font-medium">Faculty Count</td>
                          {getSelectedCollegeData().map((college) => (
                            <td key={college.id} className="p-4 text-center">
                              {college.faculty}
                            </td>
                          ))}
                        </tr>
                        <tr className="border-b">
                          <td className="p-4 font-medium">Departments</td>
                          {getSelectedCollegeData().map((college) => (
                            <td key={college.id} className="p-4 text-center">
                              {college.departments}
                            </td>
                          ))}
                        </tr>
                        <tr className="border-b">
                          <td className="p-4 font-medium">Campus Size</td>
                          {getSelectedCollegeData().map((college) => (
                            <td key={college.id} className="p-4 text-center">
                              {college.campusSize}
                            </td>
                          ))}
                        </tr>
                        <tr className="border-b">
                          <td className="p-4 font-medium">Annual Fees</td>
                          {getSelectedCollegeData().map((college) => (
                            <td key={college.id} className="p-4 text-center font-semibold text-green-600">
                              {college.fees}
                            </td>
                          ))}
                        </tr>
                      </>
                    )}

                    {activeCategory === "placements" && (
                      <>
                        <tr className="border-b">
                          <td className="p-4 font-medium">Placement Rate</td>
                          {getSelectedCollegeData().map((college) => (
                            <td key={college.id} className="p-4 text-center font-semibold text-emerald-600">
                              {college.placementRate}%
                            </td>
                          ))}
                        </tr>
                        <tr className="border-b">
                          <td className="p-4 font-medium">Average Package</td>
                          {getSelectedCollegeData().map((college) => (
                            <td key={college.id} className="p-4 text-center font-semibold text-blue-600">
                              {college.averagePackage}
                            </td>
                          ))}
                        </tr>
                        <tr className="border-b">
                          <td className="p-4 font-medium">Highest Package</td>
                          {getSelectedCollegeData().map((college) => (
                            <td key={college.id} className="p-4 text-center font-semibold text-purple-600">
                              {college.highestPackage}
                            </td>
                          ))}
                        </tr>
                      </>
                    )}

                    {activeCategory === "facilities" && (
                      <>
                        <tr className="border-b">
                          <td className="p-4 font-medium">Hostel Fees</td>
                          {getSelectedCollegeData().map((college) => (
                            <td key={college.id} className="p-4 text-center">
                              ₹{college.hostelFees}
                            </td>
                          ))}
                        </tr>
                        {Object.entries(getSelectedCollegeData()[0]?.features || {}).map(([feature, _]) => (
                          <tr key={feature} className="border-b">
                            <td className="p-4 font-medium capitalize">{feature.replace(/([A-Z])/g, " $1")}</td>
                            {getSelectedCollegeData().map((college) => (
                              <td key={college.id} className="p-4 text-center">
                                {college.features[feature as keyof typeof college.features] ? (
                                  <Check className="h-5 w-5 text-green-500 mx-auto" />
                                ) : (
                                  <Minus className="h-5 w-5 text-gray-400 mx-auto" />
                                )}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
