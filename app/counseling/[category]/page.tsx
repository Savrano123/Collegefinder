"use client"

import React, { useState } from "react"
import { Search, Filter, SortAsc, MapPin, Star, Users, Trophy, Building2, GraduationCap, ArrowLeft, Grid3X3, List } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Header } from "@/components/header"
import { CollegeCard } from "@/components/college-card"
import Link from "next/link"
import { getColleges } from "@/lib/database"
import { College } from "@/lib/supabase"

const categoryInfo = {
  "josaa-csab": {
    title: "JOSAA/CSAB Counseling",
    description:
      "Joint Seat Allocation Authority for IITs, NITs, IIITs and other centrally funded technical institutions",
    totalColleges: 1247,
    color: "from-primary to-secondary",
    bgColor: "bg-gradient-to-br from-primary/10 to-secondary/10",
  },
  "jac-delhi": {
    title: "JAC Delhi Counseling",
    description: "Joint Admission Counseling for Delhi University and other Delhi colleges",
    totalColleges: 89,
    color: "from-green-500 to-emerald-600",
    bgColor: "bg-gradient-to-br from-green-50 to-emerald-50",
  },
  "comedk-kcet": {
    title: "COMEDK/KCET Counseling",
    description: "Karnataka engineering college admissions",
    totalColleges: 456,
    color: "from-orange-500 to-red-500",
    bgColor: "bg-gradient-to-br from-orange-50 to-red-50",
  },
  "mht-cet": {
    title: "MHT-CET Counseling",
    description: "Maharashtra engineering and medical college admissions",
    totalColleges: 623,
    color: "from-purple-500 to-pink-500",
    bgColor: "bg-gradient-to-br from-purple-50 to-pink-50",
  },
  wbjee: {
    title: "WBJEE Counseling",
    description: "West Bengal Joint Entrance Examination",
    totalColleges: 234,
    color: "from-teal-500 to-cyan-500",
    bgColor: "bg-gradient-to-br from-teal-50 to-cyan-50",
  },
}

// Mock colleges data for development
const mockColleges: College[] = [
  {
    id: "1",
    name: "Indian Institute of Technology Bombay",
    short_name: "IIT Bombay",
    slug: "iit-bombay",
    description: "Premier engineering and technology institute",
    type: "government",
    counseling_categories: ["josaa-csab"],
    established: 1958,
    location: "Powai, Mumbai, Maharashtra",
    state: "Maharashtra",
    city: "Mumbai",
    website: "https://www.iitb.ac.in",
    phone: "+91-22-2572-2545",
    email: "info@iitb.ac.in",
    logo_url: "/iit-bombay-logo.png",
    banner_url: "/iit-bombay-aerial.png",
    nirf_rank: 3,
    rating: 4.6,
    total_reviews: 1247,
    total_students: 11000,
    total_faculty: 650,
    total_departments: 18,
    placement_rate: 95,
    average_package: "₹18.5 LPA",
    highest_package: "₹2.14 Crore",
    annual_fees: "₹2.5 Lakhs",
    highlights: ["Top 3 NIRF Ranking", "95% Placement Rate", "650+ Faculty"],
    is_active: true,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "2",
    name: "National Institute of Technology Trichy",
    short_name: "NIT Trichy",
    slug: "nit-trichy",
    description: "Leading technical institute in South India",
    type: "government",
    counseling_categories: ["josaa-csab"],
    established: 1964,
    location: "Tiruchirappalli, Tamil Nadu",
    state: "Tamil Nadu",
    city: "Tiruchirappalli",
    website: "https://www.nitt.edu",
    logo_url: "/nit-trichy-logo.png",
    nirf_rank: 9,
    rating: 4.4,
    total_reviews: 892,
    total_students: 8500,
    total_faculty: 420,
    total_departments: 16,
    placement_rate: 88,
    average_package: "₹12.8 LPA",
    highest_package: "₹45 Lakhs",
    annual_fees: "₹1.8 Lakhs",
    highlights: ["Top 10 NIRF Ranking", "88% Placement Rate", "Strong Alumni Network"],
    is_active: true,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
]

function CounselingContent({ category }: { category: typeof categoryInfo[keyof typeof categoryInfo] }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("")
  const [filterType, setFilterType] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  // For development, using mock data. In production, this would fetch real data
  const colleges = mockColleges

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Category Header */}
      <section className={`relative py-20 ${category.bgColor} overflow-hidden`}>
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-float"></div>
          <div
            className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-float"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Back Button */}
          <div className="mb-8">
            <Link href="/">
              <Button variant="ghost" className="hover:bg-primary/10">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>

          <div className="max-w-4xl">
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 px-4 py-2">
              Counseling Category
            </Badge>
            <h1 className="text-6xl font-bold font-space-grotesk text-foreground mb-6">
              {category.title}
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl font-dm-sans leading-relaxed">
              {category.description}
            </p>
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Building2 className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-bold font-space-grotesk text-foreground">
                    {category.totalColleges.toLocaleString()}
                  </div>
                  <div className="text-muted-foreground font-dm-sans">Colleges</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center">
                  <Users className="h-6 w-6 text-secondary" />
                </div>
                <div>
                  <div className="text-2xl font-bold font-space-grotesk text-foreground">50K+</div>
                  <div className="text-muted-foreground font-dm-sans">Students</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-12 bg-muted/30 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search */}
            <div className="flex-1 max-w-2xl">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
                <div className="relative bg-card rounded-xl p-2 border-2 border-border hover:border-primary/50 transition-all duration-300">
                  <div className="flex items-center">
                    <Search className="ml-4 h-6 w-6 text-muted-foreground" />
                    <Input
                      placeholder="Search colleges by name, location, or specialization..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="flex-1 border-0 bg-transparent text-lg placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Filters */}
            <div className="flex items-center space-x-4">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48 border-2 border-border hover:border-primary/50 transition-colors">
                  <SortAsc className="h-4 w-4 mr-2 text-primary" />
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rank">NIRF Ranking</SelectItem>
                  <SelectItem value="placement">Placement Rate</SelectItem>
                  <SelectItem value="package">Average Package</SelectItem>
                  <SelectItem value="fees">Fees (Low to High)</SelectItem>
                  <SelectItem value="rating">Student Rating</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-48 border-2 border-border hover:border-primary/50 transition-colors">
                  <Filter className="h-4 w-4 mr-2 text-secondary" />
                  <SelectValue placeholder="College Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="government">Government</SelectItem>
                  <SelectItem value="private">Private</SelectItem>
                  <SelectItem value="deemed">Deemed</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" className="border-2 border-border hover:border-primary/50 hover:bg-primary/10">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl font-bold font-space-grotesk text-foreground mb-2">
                Showing {colleges.length} colleges
              </h2>
              <p className="text-muted-foreground font-dm-sans">
                Find the perfect college for your engineering journey
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-muted-foreground font-dm-sans">View:</span>
              <div className="flex items-center border border-border rounded-lg p-1">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="px-3"
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="px-3"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* College Cards */}
          <div className={`grid gap-8 ${
            viewMode === "grid"
              ? "grid-cols-1 lg:grid-cols-2 xl:grid-cols-3"
              : "grid-cols-1"
          }`}>
            {colleges.map((college) => (
              <CollegeCard
                key={college.id}
                college={college}
                variant={viewMode === "list" ? "compact" : "detailed"}
                showSaveButton={true}
                showCompareButton={true}
              />
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-16">
            <Button
              variant="outline"
              size="lg"
              className="px-8 py-4 text-lg font-semibold border-2 border-border hover:border-primary/50 hover:bg-primary/10 transition-all duration-300"
            >
              Load More Colleges
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default async function CounselingCategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const resolvedParams = await params
  const category = categoryInfo[resolvedParams.category as keyof typeof categoryInfo]

  if (!category) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-2">Category Not Found</h1>
          <p className="text-muted-foreground mb-4">The counseling category you're looking for doesn't exist.</p>
          <Link href="/">
            <Button>Back to Home</Button>
          </Link>
        </div>
      </div>
    )
  }

  return <CounselingContent category={category} />
}
