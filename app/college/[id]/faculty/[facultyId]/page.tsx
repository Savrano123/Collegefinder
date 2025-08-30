import {
  ArrowLeft,
  Mail,
  Phone,
  GraduationCap,
  Award,
  BookOpen,
  Clock,
  Building2,
  Users,
  Star,
  Calendar,
  ExternalLink,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Header } from "@/components/header"
import { ReviewCard } from "@/components/review-card"
import { RatingStars, RatingBreakdown } from "@/components/rating-stars"
import Link from "next/link"
import { Faculty } from "@/lib/supabase"

interface FacultyDetailPageProps {
  params: { id: string; facultyId: string }
}

// Mock data for development - will be replaced with real data
const mockFaculty: Faculty = {
  id: "1",
  department_id: "1",
  name: "Dr. Rajesh Kumar",
  designation: "Professor and Head of Department",
  qualification: "Ph.D. in Computer Science, Stanford University; M.S. in Computer Science, MIT; B.Tech in Computer Science, IIT Delhi",
  specialization: ["Machine Learning", "Artificial Intelligence", "Data Mining", "Deep Learning"],
  research_areas: [
    "Deep Learning and Neural Networks",
    "Natural Language Processing",
    "Computer Vision",
    "Reinforcement Learning",
    "Big Data Analytics",
    "AI Ethics and Fairness"
  ],
  experience_years: 20,
  email: "rajesh.kumar@iitb.ac.in",
  phone: "+91-22-2576-7890",
  image_url: "/wise-professor.png",
  rating: 4.8,
  total_reviews: 89,
  is_active: true,
  created_at: "2024-01-01T00:00:00Z",
  updated_at: "2024-01-01T00:00:00Z",
}

const mockPublications = [
  {
    title: "Deep Learning Approaches for Natural Language Understanding",
    journal: "IEEE Transactions on Neural Networks and Learning Systems",
    year: 2023,
    citations: 245,
  },
  {
    title: "Ethical AI: Principles and Practices for Responsible Machine Learning",
    journal: "Nature Machine Intelligence",
    year: 2023,
    citations: 189,
  },
  {
    title: "Reinforcement Learning in Complex Environments: A Survey",
    journal: "Journal of Machine Learning Research",
    year: 2022,
    citations: 312,
  },
]

const mockCourses = [
  {
    code: "CS101",
    name: "Introduction to Computer Science",
    level: "Undergraduate",
    semester: "Fall 2024",
  },
  {
    code: "CS561",
    name: "Machine Learning",
    level: "Graduate",
    semester: "Spring 2024",
  },
  {
    code: "CS789",
    name: "Advanced Topics in AI",
    level: "Graduate",
    semester: "Fall 2024",
  },
]

export default async function FacultyDetailPage({ params }: FacultyDetailPageProps) {
  // For development, using mock data. In production, this would fetch real data
  const faculty = mockFaculty

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  const getDesignationColor = (designation?: string) => {
    if (!designation) return "bg-gray-100 text-gray-600"
    const lower = designation.toLowerCase()
    if (lower.includes("professor") || lower.includes("head")) {
      return "bg-purple-100 text-purple-700"
    }
    if (lower.includes("associate")) {
      return "bg-blue-100 text-blue-700"
    }
    if (lower.includes("assistant")) {
      return "bg-green-100 text-green-700"
    }
    return "bg-gray-100 text-gray-600"
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative py-16 bg-gradient-to-br from-primary/5 via-secondary/5 to-background overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          {/* Back Button */}
          <div className="mb-8">
            <Link href={`/college/${params.id}/department/1`}>
              <Button variant="ghost" className="hover:bg-primary/10">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Department
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Faculty Info */}
            <div className="lg:col-span-2">
              <div className="flex items-start space-x-6 mb-6">
                {/* Profile Picture */}
                <Avatar className="w-32 h-32 border-4 border-border">
                  <AvatarImage src={faculty.image_url} alt={faculty.name} />
                  <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-primary-foreground font-bold text-2xl">
                    {getInitials(faculty.name)}
                  </AvatarFallback>
                </Avatar>

                {/* Basic Info */}
                <div className="flex-1">
                  <h1 className="text-4xl font-bold font-space-grotesk text-foreground mb-2">
                    {faculty.name}
                  </h1>
                  {faculty.designation && (
                    <Badge className={`mb-4 ${getDesignationColor(faculty.designation)} border-0 text-base px-3 py-1`}>
                      {faculty.designation}
                    </Badge>
                  )}

                  {/* Rating */}
                  <div className="flex items-center space-x-4 mb-4">
                    <RatingStars rating={faculty.rating} readonly showValue size="lg" />
                    <span className="text-muted-foreground font-dm-sans">
                      ({faculty.total_reviews.toLocaleString()} reviews)
                    </span>
                  </div>

                  {/* Experience */}
                  {faculty.experience_years && (
                    <div className="flex items-center space-x-2 mb-4">
                      <Clock className="h-5 w-5 text-secondary" />
                      <span className="text-lg text-muted-foreground font-dm-sans">
                        {faculty.experience_years} years of experience
                      </span>
                    </div>
                  )}

                  {/* Contact Info */}
                  <div className="flex flex-col space-y-2">
                    {faculty.email && (
                      <a
                        href={`mailto:${faculty.email}`}
                        className="flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors"
                      >
                        <Mail className="h-4 w-4" />
                        <span className="font-dm-sans">{faculty.email}</span>
                      </a>
                    )}
                    {faculty.phone && (
                      <a
                        href={`tel:${faculty.phone}`}
                        className="flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors"
                      >
                        <Phone className="h-4 w-4" />
                        <span className="font-dm-sans">{faculty.phone}</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Qualifications */}
              {faculty.qualification && (
                <div className="mb-6">
                  <h3 className="text-xl font-semibold font-space-grotesk text-foreground mb-3 flex items-center">
                    <GraduationCap className="h-5 w-5 mr-2 text-primary" />
                    Qualifications
                  </h3>
                  <p className="text-lg text-muted-foreground font-dm-sans leading-relaxed">
                    {faculty.qualification}
                  </p>
                </div>
              )}

              {/* Specializations */}
              {faculty.specialization && faculty.specialization.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-xl font-semibold font-space-grotesk text-foreground mb-3 flex items-center">
                    <BookOpen className="h-5 w-5 mr-2 text-secondary" />
                    Specializations
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {faculty.specialization.map((spec, index) => (
                      <Badge key={index} className="bg-secondary/10 text-secondary border-secondary/20 text-sm px-3 py-1">
                        {spec}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Research Areas */}
              {faculty.research_areas && faculty.research_areas.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-xl font-semibold font-space-grotesk text-foreground mb-3 flex items-center">
                    <Award className="h-5 w-5 mr-2 text-green-600" />
                    Research Areas
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {faculty.research_areas.map((area, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                        <span className="text-muted-foreground font-dm-sans">{area}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="lg:col-span-1">
              <Card className="border-2 border-border mb-6">
                <CardHeader>
                  <CardTitle className="text-xl font-space-grotesk">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                    <Mail className="h-4 w-4 mr-2" />
                    Send Email
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule Meeting
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Star className="h-4 w-4 mr-2" />
                    Write Review
                  </Button>
                </CardContent>
              </Card>

              {/* Stats */}
              <Card className="border-2 border-border">
                <CardHeader>
                  <CardTitle className="text-xl font-space-grotesk">Academic Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold font-space-grotesk text-primary">
                      {mockPublications.length}
                    </div>
                    <p className="text-sm text-muted-foreground font-dm-sans">Publications</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold font-space-grotesk text-secondary">
                      {mockCourses.length}
                    </div>
                    <p className="text-sm text-muted-foreground font-dm-sans">Courses Teaching</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold font-space-grotesk text-green-600">
                      {mockPublications.reduce((sum, pub) => sum + pub.citations, 0)}
                    </div>
                    <p className="text-sm text-muted-foreground font-dm-sans">Total Citations</p>
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
          <Tabs defaultValue="publications" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="publications">Publications</TabsTrigger>
              <TabsTrigger value="courses">Courses</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            {/* Publications Tab */}
            <TabsContent value="publications" className="space-y-6">
              <h2 className="text-3xl font-bold font-space-grotesk text-foreground mb-6">
                Recent Publications
              </h2>
              <div className="space-y-4">
                {mockPublications.map((publication, index) => (
                  <Card key={index} className="border-2 border-border hover:border-primary/30 transition-all duration-300">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold font-space-grotesk text-foreground mb-2">
                        {publication.title}
                      </h3>
                      <p className="text-muted-foreground font-dm-sans mb-2">
                        {publication.journal} • {publication.year}
                      </p>
                      <div className="flex items-center space-x-4">
                        <Badge variant="secondary" className="bg-primary/10 text-primary">
                          {publication.citations} citations
                        </Badge>
                        <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                          <ExternalLink className="h-4 w-4 mr-1" />
                          View Paper
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Courses Tab */}
            <TabsContent value="courses" className="space-y-6">
              <h2 className="text-3xl font-bold font-space-grotesk text-foreground mb-6">
                Current Courses
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockCourses.map((course, index) => (
                  <Card key={index} className="border-2 border-border hover:border-primary/30 transition-all duration-300">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge className="bg-secondary/10 text-secondary border-secondary/20">
                          {course.code}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {course.level}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg font-space-grotesk">{course.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground font-dm-sans">
                        {course.semester}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Reviews Tab */}
            <TabsContent value="reviews" className="space-y-6">
              <h2 className="text-3xl font-bold font-space-grotesk text-foreground mb-6">
                Student Reviews
              </h2>
              <div className="text-center py-12">
                <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold font-space-grotesk text-foreground mb-2">
                  Reviews Coming Soon
                </h3>
                <p className="text-muted-foreground font-dm-sans">
                  Student reviews and ratings for this faculty member will be available soon.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  )
}
