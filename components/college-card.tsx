import {
  MapPin,
  Star,
  Users,
  GraduationCap,
  TrendingUp,
  Award,
  Building2,
  Heart,
  ExternalLink,
  IndianRupee,
  Check,
} from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { College } from "@/lib/supabase"
import { useComparison } from "@/lib/comparison-context"
import Link from "next/link"
import Image from "next/image"

interface CollegeCardProps {
  college: College
  showSaveButton?: boolean
  showCompareButton?: boolean
  variant?: "default" | "compact" | "detailed"
  className?: string
}

export function CollegeCard({
  college,
  showSaveButton = true,
  showCompareButton = true,
  variant = "default",
  className = "",
}: CollegeCardProps) {
  const { addToComparison, removeFromComparison, isInComparison } = useComparison()
  const isCompared = isInComparison(college.id)
  const getRankBadgeColor = (rank?: number) => {
    if (!rank) return "bg-gray-100 text-gray-600"
    if (rank <= 10) return "bg-green-100 text-green-700"
    if (rank <= 50) return "bg-blue-100 text-blue-700"
    if (rank <= 100) return "bg-orange-100 text-orange-700"
    return "bg-gray-100 text-gray-600"
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "government":
        return "bg-green-100 text-green-700"
      case "private":
        return "bg-blue-100 text-blue-700"
      case "deemed":
        return "bg-purple-100 text-purple-700"
      default:
        return "bg-gray-100 text-gray-600"
    }
  }

  if (variant === "compact") {
    return (
      <Card className={`group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/30 ${className}`}>
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <div className="relative w-16 h-16 flex-shrink-0">
              {college.logo_url ? (
                <Image
                  src={college.logo_url}
                  alt={`${college.name} logo`}
                  fill
                  className="object-contain rounded-lg"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                  <GraduationCap className="h-8 w-8 text-primary-foreground" />
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-lg font-space-grotesk text-foreground group-hover:text-primary transition-colors truncate">
                    {college.short_name || college.name}
                  </h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground font-dm-sans">{college.location}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-semibold">{college.rating.toFixed(1)}</span>
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
          <div className="relative w-20 h-20 flex-shrink-0">
            {college.logo_url ? (
              <Image
                src={college.logo_url}
                alt={`${college.name} logo`}
                fill
                className="object-contain rounded-xl group-hover:scale-110 transition-transform duration-300"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <GraduationCap className="h-10 w-10 text-primary-foreground" />
              </div>
            )}
          </div>
          <div className="flex flex-col items-end space-y-2">
            {college.nirf_rank && (
              <Badge className={`${getRankBadgeColor(college.nirf_rank)} border-0 font-semibold`}>
                NIRF #{college.nirf_rank}
              </Badge>
            )}
            <Badge className={`${getTypeColor(college.type)} border-0 capitalize`}>
              {college.type}
            </Badge>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold font-space-grotesk text-foreground group-hover:text-primary transition-colors duration-300 mb-2">
            {college.name}
          </h3>
          {college.short_name && college.short_name !== college.name && (
            <p className="text-sm text-muted-foreground font-dm-sans mb-3">
              {college.short_name}
            </p>
          )}
          <div className="flex items-center space-x-2 mb-3">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground font-dm-sans">{college.location}</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="relative z-10">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1 mb-1">
              <Star className="h-4 w-4 text-yellow-500 fill-current" />
              <span className="text-lg font-bold font-space-grotesk">{college.rating.toFixed(1)}</span>
            </div>
            <p className="text-xs text-muted-foreground font-dm-sans">
              {college.total_reviews} reviews
            </p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1 mb-1">
              <Users className="h-4 w-4 text-primary" />
              <span className="text-lg font-bold font-space-grotesk">
                {college.total_students ? `${Math.round(college.total_students / 1000)}K` : "N/A"}
              </span>
            </div>
            <p className="text-xs text-muted-foreground font-dm-sans">Students</p>
          </div>
        </div>

        {/* Key Info */}
        {variant === "detailed" && (
          <div className="space-y-3 mb-6">
            {college.annual_fees && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground font-dm-sans">Annual Fees</span>
                <div className="flex items-center space-x-1">
                  <IndianRupee className="h-4 w-4 text-primary" />
                  <span className="text-sm font-semibold">{college.annual_fees}</span>
                </div>
              </div>
            )}
            {college.placement_rate && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground font-dm-sans">Placement Rate</span>
                <span className="text-sm font-semibold text-green-600">{college.placement_rate}%</span>
              </div>
            )}
            {college.highest_package && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground font-dm-sans">Highest Package</span>
                <span className="text-sm font-semibold">{college.highest_package}</span>
              </div>
            )}
          </div>
        )}

        {/* Highlights */}
        {college.highlights && college.highlights.length > 0 && (
          <div className="mb-6">
            <div className="flex flex-wrap gap-2">
              {college.highlights.slice(0, 3).map((highlight, index) => (
                <Badge key={index} variant="secondary" className="text-xs bg-primary/10 text-primary">
                  {highlight}
                </Badge>
              ))}
              {college.highlights.length > 3 && (
                <Badge variant="secondary" className="text-xs bg-muted text-muted-foreground">
                  +{college.highlights.length - 3} more
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center space-x-2">
          <Link href={`/college/${college.id}`} className="flex-1">
            <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold transition-all duration-300 hover:scale-105">
              View Details
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          {showSaveButton && (
            <Button
              variant="outline"
              size="icon"
              className="border-2 hover:border-red-300 hover:bg-red-50 hover:text-red-600 transition-all duration-300"
            >
              <Heart className="h-4 w-4" />
            </Button>
          )}
        </div>

        {showCompareButton && (
          <Button
            variant={isCompared ? "default" : "ghost"}
            className={`w-full mt-2 font-semibold transition-all duration-300 ${
              isCompared
                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                : "text-primary hover:bg-primary/10"
            }`}
            onClick={() => {
              if (isCompared) {
                removeFromComparison(college.id)
              } else {
                addToComparison(college)
              }
            }}
          >
            {isCompared ? (
              <>
                <Check className="mr-2 h-4 w-4" />
                Added to Compare
              </>
            ) : (
              "Add to Compare"
            )}
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
