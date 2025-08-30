"use client"

import { useState, useEffect } from "react"
import { MessageSquare, Plus, Star, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ReviewCard } from "@/components/review-card"
import { getReviewsByEntity } from "@/lib/database"
import { Review } from "@/lib/supabase"

interface ReviewsSectionProps {
  collegeId: string
  collegeName: string
}

export function ReviewsSection({ collegeId, collegeName }: ReviewsSectionProps) {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [showReviewForm, setShowReviewForm] = useState(false)

  useEffect(() => {
    const loadReviews = async () => {
      try {
        setLoading(true)
        console.log('Loading reviews for college:', collegeId)

        // For now, use mock data for demonstration
        const mockReviews: Review[] = [
          {
            id: '1',
            user_id: null,
            reviewable_type: 'college',
            reviewable_id: collegeId,
            rating: 5,
            title: 'Excellent Engineering College',
            content: 'IIT Bombay is truly one of the best engineering institutions in India. The faculty is world-class, infrastructure is top-notch, and the placement opportunities are amazing.',
            pros: ['World-class faculty', 'Excellent infrastructure', 'Great placement opportunities', 'Strong alumni network'],
            cons: ['Very competitive environment', 'High academic pressure'],
            tags: ['engineering', 'iit', 'mumbai'],
            helpful_count: 15,
            not_helpful_count: 2,
            status: 'approved',
            is_anonymous: false,
            created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
            updated_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
          },
          {
            id: '2',
            user_id: null,
            reviewable_type: 'college',
            reviewable_id: collegeId,
            rating: 4,
            title: 'Great Academic Environment',
            content: 'The academic environment is excellent with challenging coursework and supportive faculty. The campus life is vibrant with many opportunities for extracurricular activities.',
            pros: ['Challenging academics', 'Supportive faculty', 'Vibrant campus life', 'Research opportunities'],
            cons: ['High workload', 'Limited social time'],
            tags: ['academics', 'campus', 'research'],
            helpful_count: 8,
            not_helpful_count: 1,
            status: 'approved',
            is_anonymous: true,
            created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
            updated_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
          }
        ]

        setReviews(mockReviews)
      } catch (error) {
        console.error('Error loading reviews:', error)
        setReviews([])
      } finally {
        setLoading(false)
      }
    }

    loadReviews()
  }, [collegeId])

  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
    : 0

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-5 w-5 ${
          i < Math.floor(rating) ? "text-yellow-500 fill-current" : "text-gray-300"
        }`}
      />
    ))
  }

  return (
    <div className="space-y-8">
      {/* Reviews Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <MessageSquare className="h-6 w-6 text-primary" />
            <h3 className="text-2xl font-bold font-space-grotesk">Student Reviews</h3>
          </div>
          {reviews.length > 0 && (
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                {renderStars(averageRating)}
              </div>
              <span className="text-lg font-semibold">{averageRating.toFixed(1)}</span>
              <span className="text-muted-foreground">({reviews.length} reviews)</span>
            </div>
          )}
        </div>
        <Button 
          onClick={() => setShowReviewForm(true)}
          className="bg-primary hover:bg-primary/90"
        >
          <Plus className="h-4 w-4 mr-2" />
          Write Review
        </Button>
      </div>

      {/* Reviews Stats */}
      {reviews.length > 0 && (
        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {[5, 4, 3, 2, 1].map((rating) => {
                const count = reviews.filter(r => r.rating === rating).length
                const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0
                return (
                  <div key={rating} className="flex items-center space-x-2">
                    <span className="text-sm font-medium">{rating}</span>
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-yellow-500 h-2 rounded-full" 
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-sm text-muted-foreground">{count}</span>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Reviews List */}
      <div className="space-y-6">
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="text-muted-foreground mt-2">Loading reviews...</p>
          </div>
        ) : reviews.length > 0 ? (
          <>
            {reviews.map((review) => (
              <ReviewCard 
                key={review.id} 
                review={review} 
                showHelpfulButtons={true}
                variant="default"
              />
            ))}
            {reviews.length >= 10 && (
              <div className="text-center">
                <Button variant="outline">Load More Reviews</Button>
              </div>
            )}
          </>
        ) : (
          <Card>
            <CardContent className="p-8 text-center">
              <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h4 className="text-lg font-semibold mb-2">No Reviews Yet</h4>
              <p className="text-muted-foreground mb-4">
                Be the first to share your experience at {collegeName}
              </p>
              <Button onClick={() => setShowReviewForm(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Write First Review
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Review Form Modal - Placeholder for now */}
      {showReviewForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-2xl mx-4">
            <CardHeader>
              <CardTitle>Write a Review for {collegeName}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Review submission form will be implemented here.
              </p>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowReviewForm(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setShowReviewForm(false)}>
                  Submit Review
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
