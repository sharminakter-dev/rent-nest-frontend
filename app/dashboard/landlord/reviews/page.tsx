// app/dashboard/landlord/reviews/page.tsx
import { Star } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { IReview } from '@/lib/types'
import { getMyReviews } from '../../_actions/landlordActions'

export default async function LandlordReviewsPage() {
  const res = await getMyReviews()
  const reviews: IReview[] = res?.data ?? []

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold tracking-tight">Reviews</h1>
      {reviews.length > 0 ? (
        <div className="flex flex-col gap-3">
          {reviews.map((review) => (
            <Card key={review.id}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <p className="font-medium">{review.property.title}</p>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={i < review.rating ? 'size-4 fill-amber-400 text-amber-400' : 'size-4 text-muted-foreground'} />
                    ))}
                  </div>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{review.comment}</p>
                <p className="mt-2 text-xs text-muted-foreground">by {review.tenant.name}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">No reviews yet.</p>
      )}
    </div>
  )
}