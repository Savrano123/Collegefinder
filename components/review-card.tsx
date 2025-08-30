import {
  Star,
  ThumbsUp,
  ThumbsDown,
  Flag,
  User,
  Calendar,
  CheckCircle,
  Shield,
} from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Review } from "@/lib/supabase"
import { formatDistanceToNow } from "date-fns"

interface ReviewCardProps {
  review: Review & {
    profiles?: {
      full_name?: string
      username?: string
      avatar_url?: string
      college_id?: string
    }
  }
  showHelpfulButtons?: boolean
  variant?: "default" | "compact"
  className?: string
}

export function ReviewCard({
  review,
  showHelpfulButtons = true,
  variant = "default",
  className = "",
}: ReviewCardProps) {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? "text-yellow-500 fill-current" : "text-gray-300"
        }`}
      />
    ))
  }

  const getInitials = (name?: string) => {
    if (!name) return "U"
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  const getVerificationBadge = () => {
    if (review.profiles?.college_id) {
      return (
        <Badge className="bg-green-100 text-green-700 border-green-200 text-xs">
          <CheckCircle className="h-3 w-3 mr-1" />
          Verified Student
        </Badge>
      )
    }
    return null
  }

  if (variant === "compact") {
    return (
      <Card className={`border-l-4 border-l-primary/30 ${className}`}>
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <Avatar className="w-10 h-10 border border-border">
              <AvatarImage src={review.profiles?.avatar_url} />
              <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-primary-foreground text-sm">
                {review.is_anonymous ? "A" : getInitials(review.profiles?.full_name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-2">
                <div className="flex items-center space-x-1">
                  {renderStars(review.rating)}
                </div>
                <span className="text-sm text-muted-foreground">
                  {formatDistanceToNow(new Date(review.created_at), { addSuffix: true })}
                </span>
              </div>
              <p className="text-sm text-foreground font-dm-sans line-clamp-2">
                {review.content}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={`hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20 ${className}`}>
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4">
            <Avatar className="w-12 h-12 border-2 border-border">
              <AvatarImage src={review.profiles?.avatar_url} />
              <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-primary-foreground font-semibold">
                {review.is_anonymous ? "A" : getInitials(review.profiles?.full_name)}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <h4 className="font-semibold text-foreground font-space-grotesk">
                  {review.is_anonymous 
                    ? "Anonymous User" 
                    : review.profiles?.full_name || review.profiles?.username || "User"
                  }
                </h4>
                {getVerificationBadge()}
                {review.is_anonymous && (
                  <Badge className="bg-gray-100 text-gray-600 text-xs">
                    <Shield className="h-3 w-3 mr-1" />
                    Anonymous
                  </Badge>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  {renderStars(review.rating)}
                  <span className="text-sm font-semibold ml-1">{review.rating}/5</span>
                </div>
                <div className="flex items-center space-x-1 text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  <span className="text-xs font-dm-sans">
                    {formatDistanceToNow(new Date(review.created_at), { addSuffix: true })}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-red-600">
            <Flag className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        {/* Review Title */}
        {review.title && (
          <h5 className="font-semibold text-foreground font-space-grotesk mb-3">
            {review.title}
          </h5>
        )}

        {/* Review Content */}
        <p className="text-muted-foreground font-dm-sans leading-relaxed mb-4">
          {review.content}
        </p>

        {/* Pros and Cons */}
        {(review.pros && review.pros.length > 0) || (review.cons && review.cons.length > 0) ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {review.pros && review.pros.length > 0 && (
              <div>
                <h6 className="font-semibold text-green-700 mb-2 text-sm font-space-grotesk">
                  👍 Pros
                </h6>
                <ul className="space-y-1">
                  {review.pros.map((pro, index) => (
                    <li key={index} className="text-sm text-muted-foreground font-dm-sans flex items-start">
                      <span className="text-green-600 mr-2">•</span>
                      {pro}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {review.cons && review.cons.length > 0 && (
              <div>
                <h6 className="font-semibold text-red-700 mb-2 text-sm font-space-grotesk">
                  👎 Cons
                </h6>
                <ul className="space-y-1">
                  {review.cons.map((con, index) => (
                    <li key={index} className="text-sm text-muted-foreground font-dm-sans flex items-start">
                      <span className="text-red-600 mr-2">•</span>
                      {con}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ) : null}

        {/* Tags */}
        {review.tags && review.tags.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {review.tags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="text-xs bg-primary/10 text-primary">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Helpful Buttons */}
        {showHelpfulButtons && (
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-green-600">
                <ThumbsUp className="h-4 w-4 mr-2" />
                Helpful ({review.helpful_count})
              </Button>
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-red-600">
                <ThumbsDown className="h-4 w-4 mr-2" />
                Not Helpful ({review.not_helpful_count})
              </Button>
            </div>
            <Badge 
              className={`text-xs ${
                review.status === 'approved' 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-yellow-100 text-yellow-700'
              }`}
            >
              {review.status === 'approved' ? 'Verified' : 'Pending'}
            </Badge>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
