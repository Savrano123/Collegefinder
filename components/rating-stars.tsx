"use client"

import { useState } from "react"
import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface RatingStarsProps {
  rating: number
  onRatingChange?: (rating: number) => void
  readonly?: boolean
  size?: "sm" | "md" | "lg"
  showValue?: boolean
  showCount?: boolean
  count?: number
  className?: string
}

export function RatingStars({
  rating,
  onRatingChange,
  readonly = false,
  size = "md",
  showValue = false,
  showCount = false,
  count,
  className = "",
}: RatingStarsProps) {
  const [hoverRating, setHoverRating] = useState(0)

  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
  }

  const textSizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  }

  const handleStarClick = (starRating: number) => {
    if (!readonly && onRatingChange) {
      onRatingChange(starRating)
    }
  }

  const handleStarHover = (starRating: number) => {
    if (!readonly) {
      setHoverRating(starRating)
    }
  }

  const handleMouseLeave = () => {
    if (!readonly) {
      setHoverRating(0)
    }
  }

  const displayRating = hoverRating || rating

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <div 
        className="flex items-center space-x-1"
        onMouseLeave={handleMouseLeave}
      >
        {Array.from({ length: 5 }, (_, i) => {
          const starRating = i + 1
          const isFilled = starRating <= displayRating
          const isPartiallyFilled = starRating - 0.5 <= displayRating && displayRating < starRating

          return (
            <button
              key={i}
              type="button"
              disabled={readonly}
              onClick={() => handleStarClick(starRating)}
              onMouseEnter={() => handleStarHover(starRating)}
              className={cn(
                "relative transition-all duration-200",
                !readonly && "hover:scale-110 cursor-pointer",
                readonly && "cursor-default"
              )}
            >
              <Star
                className={cn(
                  sizeClasses[size],
                  "transition-colors duration-200",
                  isFilled
                    ? "text-yellow-500 fill-current"
                    : isPartiallyFilled
                    ? "text-yellow-500"
                    : "text-gray-300",
                  !readonly && "hover:text-yellow-400"
                )}
              />
              {isPartiallyFilled && (
                <Star
                  className={cn(
                    sizeClasses[size],
                    "absolute top-0 left-0 text-yellow-500 fill-current transition-colors duration-200",
                    "clip-path-half"
                  )}
                  style={{
                    clipPath: "polygon(0 0, 50% 0, 50% 100%, 0 100%)",
                  }}
                />
              )}
            </button>
          )
        })}
      </div>

      {showValue && (
        <span className={cn("font-semibold text-foreground", textSizeClasses[size])}>
          {rating.toFixed(1)}
        </span>
      )}

      {showCount && count !== undefined && (
        <span className={cn("text-muted-foreground", textSizeClasses[size])}>
          ({count.toLocaleString()})
        </span>
      )}
    </div>
  )
}

interface RatingBreakdownProps {
  ratings: {
    5: number
    4: number
    3: number
    2: number
    1: number
  }
  totalReviews: number
  className?: string
}

export function RatingBreakdown({ ratings, totalReviews, className = "" }: RatingBreakdownProps) {
  const getPercentage = (count: number) => {
    return totalReviews > 0 ? (count / totalReviews) * 100 : 0
  }

  const averageRating = totalReviews > 0 
    ? (ratings[5] * 5 + ratings[4] * 4 + ratings[3] * 3 + ratings[2] * 2 + ratings[1] * 1) / totalReviews
    : 0

  return (
    <div className={cn("space-y-4", className)}>
      {/* Overall Rating */}
      <div className="text-center">
        <div className="text-4xl font-bold font-space-grotesk text-foreground mb-2">
          {averageRating.toFixed(1)}
        </div>
        <RatingStars rating={averageRating} readonly size="lg" className="justify-center mb-2" />
        <p className="text-sm text-muted-foreground font-dm-sans">
          Based on {totalReviews.toLocaleString()} reviews
        </p>
      </div>

      {/* Rating Breakdown */}
      <div className="space-y-2">
        {[5, 4, 3, 2, 1].map((star) => (
          <div key={star} className="flex items-center space-x-3">
            <div className="flex items-center space-x-1 w-12">
              <span className="text-sm font-medium text-foreground">{star}</span>
              <Star className="h-4 w-4 text-yellow-500 fill-current" />
            </div>
            <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
              <div
                className="bg-yellow-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${getPercentage(ratings[star as keyof typeof ratings])}%` }}
              />
            </div>
            <div className="w-12 text-right">
              <span className="text-sm text-muted-foreground font-dm-sans">
                {ratings[star as keyof typeof ratings]}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

interface RatingInputProps {
  label: string
  rating: number
  onRatingChange: (rating: number) => void
  required?: boolean
  className?: string
}

export function RatingInput({
  label,
  rating,
  onRatingChange,
  required = false,
  className = "",
}: RatingInputProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <label className="block text-sm font-semibold text-foreground font-dm-sans">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="flex items-center space-x-3">
        <RatingStars
          rating={rating}
          onRatingChange={onRatingChange}
          size="lg"
        />
        <span className="text-sm text-muted-foreground font-dm-sans">
          {rating > 0 ? `${rating}/5` : "Click to rate"}
        </span>
      </div>
    </div>
  )
}
