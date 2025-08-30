import {
  Search,
  GraduationCap,
  Users,
  MapPin,
  Star,
  BookOpen,
  Building2,
  Trophy,
  TrendingUp,
  Award,
  Zap,
  Shield,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"
import Link from "next/link"

const counselingCategories = [
  {
    id: "josaa-csab",
    title: "JOSAA/CSAB",
    description: "JEE Main/Advanced counseling for IITs, NITs, IIITs",
    colleges: 1247,
    color: "bg-primary",
    hoverColor: "hover:bg-primary/90",
    icon: GraduationCap,
    popular: true,
    gradient: "from-primary to-secondary",
  },
  {
    id: "jac-delhi",
    title: "JAC Delhi",
    description: "Delhi University and other Delhi colleges",
    colleges: 89,
    color: "bg-secondary",
    hoverColor: "hover:bg-secondary/90",
    icon: Building2,
    popular: true,
    gradient: "from-secondary to-primary",
  },
  {
    id: "comedk-kcet",
    title: "COMEDK/KCET",
    description: "Karnataka engineering colleges",
    colleges: 456,
    color: "bg-orange-500",
    hoverColor: "hover:bg-orange-600",
    icon: BookOpen,
    popular: false,
  },
  {
    id: "mht-cet",
    title: "MHT-CET",
    description: "Maharashtra engineering and medical colleges",
    colleges: 623,
    color: "bg-purple-500",
    hoverColor: "hover:bg-purple-600",
    icon: Trophy,
    popular: true,
  },
  {
    id: "wbjee",
    title: "WBJEE",
    description: "West Bengal engineering colleges",
    colleges: 234,
    color: "bg-teal-500",
    hoverColor: "hover:bg-teal-600",
    icon: Users,
    popular: false,
  },
  {
    id: "tnea",
    title: "TNEA",
    description: "Tamil Nadu engineering admissions",
    colleges: 567,
    color: "bg-red-500",
    hoverColor: "hover:bg-red-600",
    icon: MapPin,
    popular: false,
  },
]

const stats = [
  { label: "Total Colleges", value: "3,200+", icon: Building2, color: "text-primary" },
  { label: "Student Reviews", value: "50,000+", icon: Star, color: "text-secondary" },
  { label: "Active Users", value: "25,000+", icon: Users, color: "text-orange-500" },
  { label: "Success Stories", value: "10,000+", icon: Trophy, color: "text-purple-500" },
]

const features = [
  {
    icon: Star,
    title: "Real Reviews",
    description: "Authentic student reviews and ratings for faculty, infrastructure, and campus life.",
    color: "bg-primary/10 text-primary",
    stats: "50K+ reviews",
  },
  {
    icon: BookOpen,
    title: "Detailed Info",
    description: "Complete information about academics, placements, hostels, and campus facilities.",
    color: "bg-secondary/10 text-secondary",
    stats: "3K+ colleges",
  },
  {
    icon: Users,
    title: "Community",
    description: "Connect with current students, alumni, and fellow aspirants in our active community.",
    color: "bg-orange-100 text-orange-600",
    stats: "25K+ members",
  },
  {
    icon: Shield,
    title: "Verified Data",
    description: "All information is verified and regularly updated to ensure accuracy and reliability.",
    color: "bg-purple-100 text-purple-600",
    stats: "100% verified",
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-primary/5 via-secondary/5 to-background overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-float"></div>
          <div
            className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-float"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-6xl md:text-7xl font-bold font-space-grotesk mb-6">
              Find Your <span className="gradient-text">Perfect College</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto font-dm-sans leading-relaxed">
              Comprehensive information about colleges, admissions, placements, and student life. Make informed
              decisions with real student reviews and detailed insights.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-16">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
                <div className="relative bg-card rounded-xl p-2 border-2 border-border hover:border-primary/50 transition-all duration-300">
                  <div className="flex items-center">
                    <Search className="ml-4 h-6 w-6 text-muted-foreground" />
                    <Input
                      placeholder="Search colleges, courses, or locations..."
                      className="flex-1 border-0 bg-transparent text-lg placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                    <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105">
                      Search
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon
                return (
                  <div key={index} className="text-center group">
                    <div className="mb-4 flex justify-center">
                      <div className="w-16 h-16 bg-card rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-border">
                        <IconComponent className={`h-8 w-8 ${stat.color}`} />
                      </div>
                    </div>
                    <div className="text-4xl font-bold font-space-grotesk text-foreground mb-2 group-hover:scale-105 transition-transform duration-300">
                      {stat.value}
                    </div>
                    <div className="text-muted-foreground font-dm-sans">{stat.label}</div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Counseling Categories */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold font-space-grotesk text-foreground mb-6">
              Explore by <span className="gradient-text">Counseling Process</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-dm-sans leading-relaxed">
              Choose your counseling category to discover colleges, admission processes, and get insights from current
              students and alumni.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {counselingCategories.map((category, index) => {
              const IconComponent = category.icon
              return (
                <Link key={category.id} href={`/counseling/${category.id}`}>
                  <Card className="cursor-pointer transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 border-2 hover:border-primary/30 relative overflow-hidden group bg-card">
                    {/* Gradient overlay on hover */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                    ></div>

                    {category.popular && (
                      <Badge className="absolute top-4 right-4 bg-gradient-to-r from-primary to-secondary text-primary-foreground border-0 animate-pulse-glow">
                        Popular
                      </Badge>
                    )}

                    <CardHeader className="pb-4 relative z-10">
                      <div
                        className={`w-20 h-20 rounded-2xl ${category.color} ${category.hoverColor} flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg`}
                      >
                        <IconComponent className="h-10 w-10 text-primary-foreground" />
                      </div>
                      <CardTitle className="text-2xl font-bold font-space-grotesk text-card-foreground group-hover:text-primary transition-colors duration-300">
                        {category.title}
                      </CardTitle>
                      <CardDescription className="text-muted-foreground text-base font-dm-sans leading-relaxed">
                        {category.description}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="relative z-10">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-2">
                          <Building2 className="h-5 w-5 text-muted-foreground" />
                          <span className="text-muted-foreground font-medium font-dm-sans">
                            {category.colleges.toLocaleString()} colleges
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <TrendingUp className="h-4 w-4 text-primary" />
                          <span className="text-sm text-primary font-semibold">Active</span>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 font-semibold"
                      >
                        Explore Category →
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold font-space-grotesk text-foreground mb-6">
              Why Choose <span className="gradient-text">CollegeHub?</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-dm-sans leading-relaxed">
              Get comprehensive insights and connect with a thriving community to make the best decision for your
              future.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {features.map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <div key={index} className="text-center group">
                  <div
                    className={`w-20 h-20 ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-300 shadow-lg`}
                  >
                    <IconComponent className="h-10 w-10" />
                  </div>
                  <h3 className="text-2xl font-semibold font-space-grotesk text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground font-dm-sans leading-relaxed mb-4">{feature.description}</p>
                  <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                    {feature.stats}
                  </Badge>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                  <GraduationCap className="h-7 w-7 text-primary-foreground" />
                </div>
                <span className="text-3xl font-bold font-space-grotesk gradient-text">CollegeHub</span>
              </div>
              <p className="text-muted-foreground font-dm-sans leading-relaxed mb-6 max-w-md">
                Your trusted companion for college research and admission guidance. Join thousands of students making
                informed decisions about their future.
              </p>
              <div className="flex items-center space-x-4">
                <Badge variant="secondary" className="bg-primary/10 text-primary">
                  <Award className="h-4 w-4 mr-2" />
                  Trusted Platform
                </Badge>
                <Badge variant="secondary" className="bg-secondary/10 text-secondary">
                  <Zap className="h-4 w-4 mr-2" />
                  Real-time Updates
                </Badge>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold font-space-grotesk text-foreground mb-6">Quick Links</h3>
              <ul className="space-y-3 text-muted-foreground font-dm-sans">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <Link href="/admin/login" className="hover:text-primary transition-colors font-semibold">
                    Admin Login
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold font-space-grotesk text-foreground mb-6">Popular Categories</h3>
              <ul className="space-y-3 text-muted-foreground font-dm-sans">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    JOSAA/CSAB
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    JAC Delhi
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    MHT-CET
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    WBJEE
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border mt-12 pt-8 text-center">
            <p className="text-muted-foreground font-dm-sans">
              &copy; 2024 CollegeHub. All rights reserved. Made with ❤️ for students.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
