import {
  ArrowLeft,
  Users,
  GraduationCap,
  Award,
  Microscope,
  Building2,
  BookOpen,
  TrendingUp,
  ExternalLink,
  Mail,
  Phone,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Header } from "@/components/header"
import { FacultyCard } from "@/components/faculty-card"
import { ReviewCard } from "@/components/review-card"
import { RatingStars, RatingBreakdown } from "@/components/rating-stars"
import Link from "next/link"
import { Department, Faculty } from "@/lib/supabase"

interface DepartmentDetailPageProps {
  params: { id: string; deptId: string }
}

// Mock data for development - will be replaced with real data
const mockDepartment: Department = {
  id: "1",
  college_id: "1",
  name: "Computer Science and Engineering",
  short_name: "CSE",
  description: "The Department of Computer Science and Engineering at IIT Bombay is one of the premier departments in India, known for its cutting-edge research and excellent academic programs. The department offers undergraduate, postgraduate, and doctoral programs in various areas of computer science and engineering.",
  total_students: 800,
  total_faculty: 45,
  rating: 4.7,
  total_reviews: 234,
  labs: [
    "Artificial Intelligence Lab",
    "Computer Networks Lab", 
    "Database Systems Lab",
    "Human-Computer Interaction Lab",
    "Information Security Lab",
    "Software Engineering Lab",
    "Computer Graphics Lab",
    "Machine Learning Lab"
  ],
  collaborations: [
    "Google Research",
    "Microsoft Research",
    "IBM Research",
    "Intel Labs",
    "NVIDIA",
    "Adobe Research",
    "Qualcomm",
    "Samsung Research"
  ],
  accreditations: ["NBA", "NAAC A++", "ABET"],
  created_at: "2024-01-01T00:00:00Z",
  updated_at: "2024-01-01T00:00:00Z",
}

const mockFaculty: Faculty[] = [
  {
    id: "1",
    department_id: "1",
    name: "Dr. Rajesh Kumar",
    designation: "Professor and Head",
    qualification: "Ph.D. in Computer Science, Stanford University",
    specialization: ["Machine Learning", "Artificial Intelligence", "Data Mining"],
    research_areas: ["Deep Learning", "Natural Language Processing", "Computer Vision"],
    experience_years: 20,
    email: "rajesh.kumar@iitb.ac.in",
    phone: "+91-22-2576-7890",
    image_url: "/wise-professor.png",
    rating: 4.8,
    total_reviews: 89,
    is_active: true,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "2",
    department_id: "1",
    name: "Dr. Priya Sharma",
    designation: "Associate Professor",
    qualification: "Ph.D. in Computer Science, MIT",
    specialization: ["Computer Networks", "Distributed Systems", "Cloud Computing"],
    research_areas: ["Network Security", "IoT", "Edge Computing"],
    experience_years: 15,
    email: "priya.sharma@iitb.ac.in",
    image_url: "/female-professor.png",
    rating: 4.6,
    total_reviews: 67,
    is_active: true,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
]

export default async function DepartmentDetailPage({ params }: DepartmentDetailPageProps) {
  // For development, using mock data. In production, this would fetch real data
  const department = mockDepartment
  const faculty = mockFaculty

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative py-16 bg-gradient-to-br from-primary/5 via-secondary/5 to-background overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          {/* Back Button */}
          <div className="mb-8">
            <Link href={`/college/${params.id}`}>
              <Button variant="ghost" className="hover:bg-primary/10">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to College
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Department Info */}
            <div className="lg:col-span-2">
              <div className="flex items-start space-x-6 mb-6">
                {/* Department Icon */}
                <div className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center text-4xl flex-shrink-0">
                  💻
                </div>

                {/* Basic Info */}
                <div className="flex-1">
                  <h1 className="text-4xl font-bold font-space-grotesk text-foreground mb-2">
                    {department.name}
                  </h1>
                  {department.short_name && department.short_name !== department.name && (
                    <p className="text-xl text-muted-foreground font-dm-sans mb-3">
                      {department.short_name}
                    </p>
                  )}

                  {/* Rating */}
                  <div className="flex items-center space-x-4 mb-4">
                    <RatingStars rating={department.rating} readonly showValue size="lg" />
                    <span className="text-muted-foreground font-dm-sans">
                      ({department.total_reviews.toLocaleString()} reviews)
                    </span>
                  </div>

                  {/* Accreditations */}
                  {department.accreditations && department.accreditations.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {department.accreditations.map((accreditation, index) => (
                        <Badge key={index} className="bg-green-100 text-green-700 border-green-200">
                          <Award className="h-3 w-3 mr-1" />
                          {accreditation}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Description */}
              <p className="text-lg text-muted-foreground font-dm-sans leading-relaxed mb-6">
                {department.description}
              </p>
            </div>

            {/* Quick Stats */}
            <div className="lg:col-span-1">
              <Card className="border-2 border-border">
                <CardHeader>
                  <CardTitle className="text-xl font-space-grotesk">Department Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold font-space-grotesk text-primary">
                        {department.total_students}
                      </div>
                      <p className="text-sm text-muted-foreground font-dm-sans">Students</p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold font-space-grotesk text-secondary">
                        {department.total_faculty}
                      </div>
                      <p className="text-sm text-muted-foreground font-dm-sans">Faculty</p>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-3 pt-4 border-t border-border">
                    {department.labs && department.labs.length > 0 && (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Microscope className="h-4 w-4 text-primary" />
                          <span className="text-sm text-muted-foreground font-dm-sans">Labs</span>
                        </div>
                        <span className="text-sm font-semibold">{department.labs.length}</span>
                      </div>
                    )}
                    {department.collaborations && department.collaborations.length > 0 && (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Building2 className="h-4 w-4 text-secondary" />
                          <span className="text-sm text-muted-foreground font-dm-sans">Industry Partners</span>
                        </div>
                        <span className="text-sm font-semibold">{department.collaborations.length}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Content Tabs */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="faculty" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="faculty">Faculty</TabsTrigger>
              <TabsTrigger value="labs">Labs & Facilities</TabsTrigger>
              <TabsTrigger value="collaborations">Industry Partners</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            {/* Faculty Tab */}
            <TabsContent value="faculty" className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold font-space-grotesk text-foreground mb-6">
                  Faculty Members
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {faculty.map((member) => (
                    <FacultyCard
                      key={member.id}
                      faculty={member}
                      collegeId={params.id}
                      departmentId={params.deptId}
                    />
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Labs Tab */}
            <TabsContent value="labs" className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold font-space-grotesk text-foreground mb-6">
                  Labs & Facilities
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {department.labs?.map((lab, index) => (
                    <Card key={index} className="border-2 border-border hover:border-primary/30 transition-all duration-300">
                      <CardHeader>
                        <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center mb-4">
                          <Microscope className="h-6 w-6 text-primary-foreground" />
                        </div>
                        <CardTitle className="text-lg font-space-grotesk">{lab}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground font-dm-sans">
                          State-of-the-art laboratory with modern equipment and facilities for hands-on learning and research.
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Collaborations Tab */}
            <TabsContent value="collaborations" className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold font-space-grotesk text-foreground mb-6">
                  Industry Partnerships
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {department.collaborations?.map((partner, index) => (
                    <Card key={index} className="border-2 border-border hover:border-primary/30 transition-all duration-300">
                      <CardHeader>
                        <div className="w-12 h-12 bg-gradient-to-br from-secondary to-primary rounded-lg flex items-center justify-center mb-4">
                          <Building2 className="h-6 w-6 text-primary-foreground" />
                        </div>
                        <CardTitle className="text-lg font-space-grotesk">{partner}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground font-dm-sans">
                          Strategic partnership for research collaboration, internships, and placement opportunities.
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Reviews Tab */}
            <TabsContent value="reviews" className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold font-space-grotesk text-foreground mb-6">
                  Student Reviews
                </h2>
                <div className="text-center py-12">
                  <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold font-space-grotesk text-foreground mb-2">
                    Reviews Coming Soon
                  </h3>
                  <p className="text-muted-foreground font-dm-sans">
                    Student reviews and ratings for this department will be available soon.
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  )
}
