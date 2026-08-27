"use client"

import { useActionState, useEffect, useState } from "react"
import { Loader2, Star } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { SubmitReviewState } from "@/lib/types"
import { submitReview } from "../../_actions/reviewActions"

type LeaveReviewDialogProps = {
  rentalId: string
  propertyTitle: string
}

export function ReviewDialog({ rentalId, propertyTitle }: LeaveReviewDialogProps) {
  const [open, setOpen] = useState(false)
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)

  const action = submitReview.bind(null, rentalId)
  const [state, formAction, pending] = useActionState<SubmitReviewState, FormData>(action, null)

  useEffect(() => {
    if (!state) return

    if (state.success) {
      toast.success(state.message || "Review submitted — thank you!")
      // eslint-disable-next-line react-hooks/set-state-in-effect -- closing the dialog is the intended reaction to the server action's result, not a render loop
      setOpen(false)
    } else {
      toast.error(state.message || "Something went wrong")
    }
  }, [state])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button size="sm" variant="outline" />}>
        <Star data-icon="inline-start" />
        Leave Review
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Review {propertyTitle}</DialogTitle>
        </DialogHeader>
        <form action={formAction} className="space-y-4">
          <div className="space-y-2">
            <Label>Rating</Label>
            <input type="hidden" name="rating" value={rating} />
            <div className="flex gap-1" role="radiogroup" aria-label="Rating out of 5">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  aria-label={`${star} star${star !== 1 ? 's' : ''}`}
                  className="p-0.5"
                >
                  <Star
                    className={
                      star <= (hoveredRating || rating)
                        ? 'size-6 fill-amber-400 text-amber-400'
                        : 'size-6 text-muted-foreground'
                    }
                  />
                </button>
              ))}
            </div>
            {state?.errors?.rating && (
              <p className="text-xs text-destructive">{state.errors.rating}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="comment">Comment</Label>
            <Textarea
              id="comment"
              name="comment"
              placeholder="How was your stay?"
              className="min-h-24"
            />
            {state?.errors?.comment && (
              <p className="text-xs text-destructive">{state.errors.comment}</p>
            )}
          </div>
          
          <DialogFooter>
            <Button type="submit" disabled={pending} className="w-full">
              {pending ? (
                <>
                  <Loader2 className="size-4 animate-spin" data-icon="inline-start" />
                  Submitting...
                </>
              ) : (
                'Submit Review'
              )}
            </Button>
          </DialogFooter>

        </form>
      </DialogContent>
    </Dialog>
  )
}