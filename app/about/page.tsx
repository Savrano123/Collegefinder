import {
  GraduationCap,
  Users,
  Target,
  Heart,
  Award,
  Zap,
  Shield,
  BookOpen,
  TrendingUp,
  Star,
  CheckCircle,
  ArrowRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"
import Link from "next/link"

const teamMembers = [
  {
    name: "Rahul Sharma",
    role: "Founder & CEO",
    description: "Former IIT graduate with 10+ years in EdTech. Passionate about democratizing education access.",
    image: "/placeholder-user.jpg",
  },
  {
    name: "Priya Patel",
    role: "Head of Product",
    description: "Product strategist with expertise in user experience and educational platforms.",
    image: "/placeholder-user.jpg",
  },
  {
    name: "Amit Kumar",
    role: "CTO",
    description: "Tech leader with experience building scalable platforms for millions of users.",
    image: "/placeholder-user.jpg",
  },
  {
    name: "Sneha Gupta",
    role: "Head of Content",
    description: "Education expert ensuring accuracy and relevance of all college information.",
    image: "/placeholder-user.jpg",
  },
]

const values = [
  {
    icon: Shield,
    title: "Transparency",
    description: "We believe in providing honest, unbiased information to help students make informed decisions.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Heart,
    title: "Student-First",
    description: "Every feature and decision is made with the student's best interests at heart.",
    color: "bg-red-100 text-red-600",
  },
  {
    icon: CheckCircle,
    title: "Accuracy",
    description: "We maintain the highest standards of data accuracy through continuous verification.",
    color: "bg-green-100 text-green-600",
  },
  {
    icon: Users,
    title: "Community",
    description: "Building a supportive community where students help each other succeed.",
    color: "bg-blue-100 text-blue-600",
  },
]

const achievements = [
  { label: "Colleges Listed", value: "3,200+", icon: GraduationCap },
  { label: "Student Reviews", value: "50,000+", icon: Star },
  { label: "Active Users", value: "25,000+", icon: Users },
  { label: "Success Stories", value: "10,000+", icon: Award },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-primary/5 via-secondary/5 to-background overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-float"></div>
          <div
            className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-float"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 px-4 py-2">
              About CollegeHub
            </Badge>
            <h1 className="text-6xl md:text-7xl font-bold font-space-grotesk mb-6">
              Empowering <span className="gradient-text">Student Dreams</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto font-dm-sans leading-relaxed">
              We're on a mission to democratize access to quality education information, helping students make
              informed decisions about their future through comprehensive, verified college data.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
              {achievements.map((achievement, index) => {
                const IconComponent = achievement.icon
                return (
                  <div key={index} className="text-center group">
                    <div className="mb-4 flex justify-center">
                      <div className="w-16 h-16 bg-card rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-border">
                        <IconComponent className="h-8 w-8 text-primary" />
                      </div>
                    </div>
                    <div className="text-4xl font-bold font-space-grotesk text-foreground mb-2 group-hover:scale-105 transition-transform duration-300">
                      {achievement.value}
                    </div>
                    <div className="text-muted-foreground font-dm-sans">{achievement.label}</div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <Badge className="mb-6 bg-secondary/10 text-secondary border-secondary/20">
                  Our Mission
                </Badge>
                <h2 className="text-5xl font-bold font-space-grotesk text-foreground mb-6">
                  Making College <span className="gradient-text">Information Accessible</span>
                </h2>
                <p className="text-xl text-muted-foreground font-dm-sans leading-relaxed mb-8">
                  Every year, millions of students struggle to find reliable information about colleges, courses, and
                  career opportunities. We're changing that by creating the most comprehensive, accurate, and
                  user-friendly platform for college research in India.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-6 w-6 text-primary" />
                    <span className="text-lg font-dm-sans">Verified information from official sources</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-6 w-6 text-primary" />
                    <span className="text-lg font-dm-sans">Real student reviews and experiences</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-6 w-6 text-primary" />
                    <span className="text-lg font-dm-sans">Comprehensive comparison tools</span>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl blur-3xl"></div>
                <Card className="relative bg-card/80 backdrop-blur-sm border-2 border-border">
                  <CardHeader className="pb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mb-4">
                      <Target className="h-8 w-8 text-primary-foreground" />
                    </div>
                    <CardTitle className="text-2xl font-space-grotesk">Our Vision</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground font-dm-sans leading-relaxed">
                      To become the definitive platform for Indian engineering college information, empowering every
                      student with the knowledge they need to choose the right path for their future.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
              Our Values
            </Badge>
            <h2 className="text-5xl font-bold font-space-grotesk text-foreground mb-6">
              What <span className="gradient-text">Drives Us</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-dm-sans leading-relaxed">
              Our core values guide every decision we make and every feature we build.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {values.map((value, index) => {
              const IconComponent = value.icon
              return (
                <Card key={index} className="text-center group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/30">
                  <CardHeader className="pb-4">
                    <div className={`w-20 h-20 ${value.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-300`}>
                      <IconComponent className="h-10 w-10" />
                    </div>
                    <CardTitle className="text-2xl font-space-grotesk group-hover:text-primary transition-colors duration-300">
                      {value.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground font-dm-sans leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <Badge className="mb-6 bg-secondary/10 text-secondary border-secondary/20">
              Our Team
            </Badge>
            <h2 className="text-5xl font-bold font-space-grotesk text-foreground mb-6">
              Meet the <span className="gradient-text">People</span> Behind CollegeHub
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-dm-sans leading-relaxed">
              A passionate team of educators, technologists, and student advocates working to transform college discovery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {teamMembers.map((member, index) => (
              <Card key={index} className="text-center group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/30">
                <CardHeader className="pb-4">
                  <div className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-full mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Users className="h-12 w-12 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-xl font-space-grotesk group-hover:text-primary transition-colors duration-300">
                    {member.name}
                  </CardTitle>
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    {member.role}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground font-dm-sans leading-relaxed text-sm">
                    {member.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-primary/5 via-secondary/5 to-background">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl font-bold font-space-grotesk text-foreground mb-6">
              Ready to Find Your <span className="gradient-text">Perfect College?</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto font-dm-sans leading-relaxed">
              Join thousands of students who have found their ideal college through CollegeHub. Start your journey today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg font-semibold transition-all duration-300 hover:scale-105">
                  Explore Colleges
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" className="px-8 py-4 text-lg font-semibold transition-all duration-300 hover:scale-105">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
              <GraduationCap className="h-7 w-7 text-primary-foreground" />
            </div>
            <span className="text-3xl font-bold font-space-grotesk gradient-text">CollegeHub</span>
          </div>
          <p className="text-muted-foreground font-dm-sans">
            &copy; 2024 CollegeHub. All rights reserved. Made with ❤️ for students.
          </p>
        </div>
      </footer>
    </div>
  )
}
