import {
  Star,
  Mail,
  Phone,
  BookOpen,
  Award,
  Clock,
  ExternalLink,
  User,
  GraduationCap,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Faculty } from "@/lib/supabase"
import Link from "next/link"

interface FacultyCardProps {
  faculty: Faculty
  collegeId: string
  departmentId?: string
  variant?: "default" | "compact"
  className?: string
}

export function FacultyCard({
  faculty,
  collegeId,
  departmentId,
  variant = "default",
  className = "",
}: FacultyCardProps) {
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

  if (variant === "compact") {
    return (
      <Card className={`group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/30 ${className}`}>
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <Avatar className="w-12 h-12 border-2 border-border group-hover:border-primary/50 transition-colors">
              <AvatarImage src={faculty.image_url} alt={faculty.name} />
              <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-primary-foreground font-semibold">
                {getInitials(faculty.name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-lg font-space-grotesk text-foreground group-hover:text-primary transition-colors truncate">
                {faculty.name}
              </h3>
              <div className="flex items-center space-x-2 mt-1">
                {faculty.designation && (
                  <Badge className={`text-xs ${getDesignationColor(faculty.designation)} border-0`}>
                    {faculty.designation}
                  </Badge>
                )}
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-semibold">{faculty.rating.toFixed(1)}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={`group hover:shadow-xl transition-all duration-500 hover:-translate-y-1 border-2 hover:border-primary/30 relative overflow-hidden ${className}`}>
      {/* Background gradient on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      <CardHeader className="pb-4 relative z-10">
        <div className="flex items-start space-x-4 mb-4">
          <Avatar className="w-20 h-20 border-4 border-border group-hover:border-primary/50 transition-colors group-hover:scale-110 duration-300">
            <AvatarImage src={faculty.image_url} alt={faculty.name} />
            <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-primary-foreground font-bold text-lg">
              {getInitials(faculty.name)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-xl font-bold font-space-grotesk text-foreground group-hover:text-primary transition-colors duration-300">
                  {faculty.name}
                </CardTitle>
                {faculty.designation && (
                  <Badge className={`mt-2 ${getDesignationColor(faculty.designation)} border-0`}>
                    {faculty.designation}
                  </Badge>
                )}
              </div>
              <div className="flex items-center space-x-1">
                <Star className="h-5 w-5 text-yellow-500 fill-current" />
                <span className="text-lg font-bold font-space-grotesk">{faculty.rating.toFixed(1)}</span>
                <span className="text-sm text-muted-foreground">({faculty.total_reviews})</span>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="relative z-10">
        {/* Qualifications */}
        {faculty.qualification && (
          <div className="mb-4">
            <div className="flex items-center space-x-2 mb-2">
              <GraduationCap className="h-4 w-4 text-primary" />
              <span className="text-sm font-semibold text-foreground">Qualification</span>
            </div>
            <p className="text-sm text-muted-foreground font-dm-sans pl-6">{faculty.qualification}</p>
          </div>
        )}

        {/* Experience */}
        {faculty.experience_years && (
          <div className="mb-4">
            <div className="flex items-center space-x-2 mb-2">
              <Clock className="h-4 w-4 text-secondary" />
              <span className="text-sm font-semibold text-foreground">Experience</span>
            </div>
            <p className="text-sm text-muted-foreground font-dm-sans pl-6">
              {faculty.experience_years} years
            </p>
          </div>
        )}

        {/* Specializations */}
        {faculty.specialization && faculty.specialization.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center space-x-2 mb-2">
              <BookOpen className="h-4 w-4 text-green-600" />
              <span className="text-sm font-semibold text-foreground">Specialization</span>
            </div>
            <div className="flex flex-wrap gap-2 pl-6">
              {faculty.specialization.slice(0, 3).map((spec, index) => (
                <Badge key={index} variant="secondary" className="text-xs bg-green-100 text-green-700">
                  {spec}
                </Badge>
              ))}
              {faculty.specialization.length > 3 && (
                <Badge variant="secondary" className="text-xs bg-muted text-muted-foreground">
                  +{faculty.specialization.length - 3} more
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Research Areas */}
        {faculty.research_areas && faculty.research_areas.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center space-x-2 mb-2">
              <Award className="h-4 w-4 text-purple-600" />
              <span className="text-sm font-semibold text-foreground">Research Areas</span>
            </div>
            <div className="flex flex-wrap gap-2 pl-6">
              {faculty.research_areas.slice(0, 2).map((area, index) => (
                <Badge key={index} variant="secondary" className="text-xs bg-purple-100 text-purple-700">
                  {area}
                </Badge>
              ))}
              {faculty.research_areas.length > 2 && (
                <Badge variant="secondary" className="text-xs bg-muted text-muted-foreground">
                  +{faculty.research_areas.length - 2} more
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Contact Info */}
        <div className="flex items-center space-x-4 mb-6 text-xs text-muted-foreground">
          {faculty.email && (
            <div className="flex items-center space-x-1">
              <Mail className="h-3 w-3" />
              <span className="font-dm-sans">Email available</span>
            </div>
          )}
          {faculty.phone && (
            <div className="flex items-center space-x-1">
              <Phone className="h-3 w-3" />
              <span className="font-dm-sans">Phone available</span>
            </div>
          )}
        </div>

        {/* Action Button */}
        <Link href={`/college/${collegeId}/faculty/${faculty.id}`}>
          <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold transition-all duration-300 hover:scale-105">
            View Profile
            <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}
