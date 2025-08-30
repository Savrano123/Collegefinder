"use client"

import React from "react"
import {
  ArrowLeft,
  MapPin,
  GraduationCap,
  Phone,
  Mail,
  Globe,
  Users,
  Share2,
  Heart,
  ExternalLink,
  IndianRupee,
  Building2,
  BookOpen,
  Award,
  Wifi,
  Car,
  Utensils,
  Dumbbell,
  Library,
  Microscope,
  Calendar,
  Clock,
  Star,
  TrendingUp,
  Home,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"
import Link from "next/link"
import Image from "next/image"
import { College } from "@/lib/supabase"
import { Hero } from "@/components/college/Hero"
import { QuickStats } from "@/components/college/QuickStats"
import { FeeStructure } from "@/components/college/FeeStructure"
import { HostelInfo } from "@/components/college/HostelInfo"
import { DepartmentsGrid } from "@/components/college/DepartmentsGrid"
import { Infrastructure } from "@/components/college/Infrastructure"
import { ContactInfo } from "@/components/college/ContactInfo"
import { ReviewsSection } from "@/components/college/ReviewsSection"

interface CollegeDetailPageProps {
  params: Promise<{ id: string }>
}

// Mock data for development - will be replaced with real data
const mockCollege: College = {
  id: "1",
  name: "Indian Institute of Technology Bombay",
  short_name: "IIT Bombay",
  slug: "iit-bombay",
  description: "Premier engineering and technology institute known for excellence in education and research with world-class faculty and cutting-edge facilities.",
  type: "government",
  counseling_categories: ["josaa-csab"],
  established: 1958,
  location: "Powai, Mumbai, Maharashtra",
  state: "Maharashtra",
  city: "Mumbai",
  pincode: "400076",
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
  highlights: ["Top 3 NIRF Ranking", "95% Placement Rate", "650+ Faculty", "World-class Research"],
  is_active: true,
  created_at: "2024-01-01T00:00:00Z",
  updated_at: "2024-01-01T00:00:00Z",
}

// Mock fee structure data
const mockFeeStructure = {
  tuition_fees: "₹2,50,000",
  hostel_fees: "₹15,000",
  mess_fees: "₹45,000",
  other_fees: "₹10,000",
  total_annual_fees: "₹3,20,000",
  fee_breakdown: [
    { category: "Tuition Fees", amount: "₹2,50,000", description: "Academic fees for the year" },
    { category: "Hostel Fees", amount: "₹15,000", description: "Accommodation charges" },
    { category: "Mess Fees", amount: "₹45,000", description: "Food and dining charges" },
    { category: "Development Fee", amount: "₹5,000", description: "Infrastructure development" },
    { category: "Other Charges", amount: "₹5,000", description: "Library, sports, and misc fees" },
  ]
}

// Mock hostel information
const mockHostelInfo = {
  total_hostels: 13,
  total_capacity: 8500,
  availability: "Available",
  hostel_types: ["Single Occupancy", "Double Occupancy", "Triple Occupancy"],
  amenities: ["Wi-Fi", "Laundry", "Common Room", "Study Hall", "Gym", "Mess", "Medical Facility"],
  rules: "Strict discipline maintained. No outside food allowed. Visitors allowed till 9 PM.",
  mess_timings: {
    breakfast: "7:30 AM - 9:30 AM",
    lunch: "12:00 PM - 2:00 PM",
    snacks: "4:30 PM - 6:00 PM",
    dinner: "7:30 PM - 9:30 PM"
  }
}

// Mock departments data
const mockDepartments = [
  { id: "1", name: "Computer Science & Engineering", students: 800, faculty: 45, rating: 4.7 },
  { id: "2", name: "Electrical Engineering", students: 600, faculty: 38, rating: 4.6 },
  { id: "3", name: "Mechanical Engineering", students: 700, faculty: 42, rating: 4.5 },
  { id: "4", name: "Chemical Engineering", students: 400, faculty: 28, rating: 4.6 },
  { id: "5", name: "Civil Engineering", students: 500, faculty: 32, rating: 4.4 },
  { id: "6", name: "Aerospace Engineering", students: 300, faculty: 22, rating: 4.8 },
]

// Mock infrastructure data
const mockInfrastructure = {
  labs: [
    { name: "Advanced Computing Lab", capacity: 100, equipment: "High-end workstations, servers" },
    { name: "Electronics Lab", capacity: 60, equipment: "Oscilloscopes, signal generators" },
    { name: "Mechanical Workshop", capacity: 80, equipment: "CNC machines, 3D printers" },
    { name: "Chemical Process Lab", capacity: 40, equipment: "Reactors, distillation units" },
  ],
  libraries: [
    { name: "Central Library", books: 500000, digital_resources: "IEEE, ACM, Springer" },
    { name: "Departmental Libraries", books: 150000, digital_resources: "Subject-specific journals" },
  ],
  sports_facilities: [
    "Olympic-size Swimming Pool", "Cricket Ground", "Football Field", "Basketball Courts",
    "Tennis Courts", "Badminton Courts", "Gymnasium", "Athletics Track"
  ],
  other_facilities: [
    "Auditorium (2000 capacity)", "Convention Center", "Guest House", "Medical Center",
    "Bank & ATM", "Post Office", "Shopping Complex", "Food Courts"
  ]
}

export default function CollegeDetailPage({ params }: CollegeDetailPageProps) {
  const [resolvedParams, setResolvedParams] = React.useState<{ id: string } | null>(null)

  // Resolve params Promise
  React.useEffect(() => {
    params.then(setResolvedParams)
  }, [params])

  if (!resolvedParams) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  // For development, using mock data. In production, this would fetch real data
  const college = mockCollege

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative py-16 bg-gradient-to-br from-primary/5 via-secondary/5 to-background overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          {/* Back Button */}
          <div className="mb-8">
            <Link href="/counseling/josaa-csab">
              <Button variant="ghost" className="hover:bg-primary/10">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Results
              </Button>
            </Link>
          </div>

          <Hero college={{ name: college.name, short_name: college.short_name, location: college.location, logo_url: college.logo_url, rating: college.rating, total_reviews: college.total_reviews }} />

          <div className="lg:col-span-1">
            <QuickStats total_students={college.total_students} total_faculty={college.total_faculty} />
          </div>
        </div>
      </section>

      {/* Fee Structure Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-space-grotesk text-foreground mb-4">Fee Structure</h2>
            <p className="text-lg text-muted-foreground font-dm-sans max-w-2xl mx-auto">Transparent and affordable fee structure with detailed breakdown</p>
          </div>
          <FeeStructure summary={mockFeeStructure} breakdown={mockFeeStructure.fee_breakdown} />
        </div>
      </section>

      {/* Hostel Information Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-space-grotesk text-foreground mb-4">Hostel Information</h2>
            <p className="text-lg text-muted-foreground font-dm-sans max-w-2xl mx-auto">Comfortable and secure accommodation with modern amenities</p>
          </div>
          <HostelInfo info={mockHostelInfo} />
        </div>
      </section>

      {/* Departments Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-space-grotesk text-foreground mb-4">Departments</h2>
            <p className="text-lg text-muted-foreground font-dm-sans max-w-2xl mx-auto">Explore our diverse range of academic departments and programs</p>
          </div>
          <DepartmentsGrid departments={mockDepartments} />
        </div>
      </section>

      {/* Infrastructure Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-space-grotesk text-foreground mb-4">Infrastructure & Facilities</h2>
            <p className="text-lg text-muted-foreground font-dm-sans max-w-2xl mx-auto">State-of-the-art facilities to support learning, research, and recreation</p>
          </div>
          <Infrastructure labs={mockInfrastructure.labs} libraries={mockInfrastructure.libraries} sports={mockInfrastructure.sports_facilities} other={mockInfrastructure.other_facilities} />
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-space-grotesk text-foreground mb-4">Reviews & Ratings</h2>
            <p className="text-lg text-muted-foreground font-dm-sans max-w-2xl mx-auto">Read what current and former students have to say</p>
          </div>
          <ReviewsSection collegeId={college.id} collegeName={college.name} />
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-space-grotesk text-foreground mb-4">Contact Information</h2>
            <p className="text-lg text-muted-foreground font-dm-sans max-w-2xl mx-auto">Get in touch with the college for admissions and inquiries</p>
          </div>
          <ContactInfo phone={college.phone} email={college.email} website={college.website} />
        </div>
      </section>
    </div>
  )
}