import {
  Users,
  Star,
  BookOpen,
  Award,
  Microscope,
  Building2,
  ExternalLink,
  GraduationCap,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Department } from "@/lib/supabase"
import Link from "next/link"

interface DepartmentCardProps {
  department: Department
  collegeId: string
  variant?: "default" | "compact"
  className?: string
}

export function DepartmentCard({
  department,
  collegeId,
  variant = "default",
  className = "",
}: DepartmentCardProps) {
  const getDepartmentIcon = (name: string) => {
    const lowerName = name.toLowerCase()
    if (lowerName.includes("computer") || lowerName.includes("software") || lowerName.includes("information")) {
      return "💻"
    }
    if (lowerName.includes("mechanical") || lowerName.includes("automobile")) {
      return "⚙️"
    }
    if (lowerName.includes("electrical") || lowerName.includes("electronics") || lowerName.includes("communication")) {
      return "⚡"
    }
    if (lowerName.includes("civil") || lowerName.includes("construction")) {
      return "🏗️"
    }
    if (lowerName.includes("chemical") || lowerName.includes("biotechnology")) {
      return "🧪"
    }
    if (lowerName.includes("aerospace") || lowerName.includes("aeronautical")) {
      return "✈️"
    }
    return "🎓"
  }

  if (variant === "compact") {
    return (
      <Card className={`group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/30 ${className}`}>
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center text-2xl flex-shrink-0">
              {getDepartmentIcon(department.name)}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-lg font-space-grotesk text-foreground group-hover:text-primary transition-colors truncate">
                {department.short_name || department.name}
              </h3>
              <div className="flex items-center space-x-4 mt-1">
                <div className="flex items-center space-x-1">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground font-dm-sans">
                    {department.total_students} students
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-semibold">{department.rating.toFixed(1)}</span>
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
        <div className="flex items-start justify-between mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-300">
            {getDepartmentIcon(department.name)}
          </div>
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 text-yellow-500 fill-current" />
            <span className="text-sm font-semibold">{department.rating.toFixed(1)}</span>
            <span className="text-xs text-muted-foreground">({department.total_reviews})</span>
          </div>
        </div>

        <CardTitle className="text-xl font-bold font-space-grotesk text-foreground group-hover:text-primary transition-colors duration-300">
          {department.name}
        </CardTitle>
        {department.short_name && department.short_name !== department.name && (
          <p className="text-sm text-muted-foreground font-dm-sans">
            {department.short_name}
          </p>
        )}
      </CardHeader>

      <CardContent className="relative z-10">
        {/* Description */}
        {department.description && (
          <p className="text-sm text-muted-foreground font-dm-sans leading-relaxed mb-4 line-clamp-3">
            {department.description}
          </p>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1 mb-1">
              <Users className="h-4 w-4 text-primary" />
              <span className="text-lg font-bold font-space-grotesk">{department.total_students}</span>
            </div>
            <p className="text-xs text-muted-foreground font-dm-sans">Students</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1 mb-1">
              <GraduationCap className="h-4 w-4 text-secondary" />
              <span className="text-lg font-bold font-space-grotesk">{department.total_faculty}</span>
            </div>
            <p className="text-xs text-muted-foreground font-dm-sans">Faculty</p>
          </div>
        </div>

        {/* Features */}
        <div className="space-y-3 mb-6">
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
          {department.accreditations && department.accreditations.length > 0 && (
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Award className="h-4 w-4 text-green-600" />
                <span className="text-sm text-muted-foreground font-dm-sans">Accreditations</span>
              </div>
              <span className="text-sm font-semibold">{department.accreditations.length}</span>
            </div>
          )}
        </div>

        {/* Accreditation Badges */}
        {department.accreditations && department.accreditations.length > 0 && (
          <div className="mb-6">
            <div className="flex flex-wrap gap-2">
              {department.accreditations.slice(0, 3).map((accreditation, index) => (
                <Badge key={index} className="text-xs bg-green-100 text-green-700 border-green-200">
                  {accreditation}
                </Badge>
              ))}
              {department.accreditations.length > 3 && (
                <Badge variant="secondary" className="text-xs bg-muted text-muted-foreground">
                  +{department.accreditations.length - 3} more
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Action Button */}
        <Link href={`/college/${collegeId}/department/${department.id}`}>
          <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold transition-all duration-300 hover:scale-105">
            View Department
            <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}
