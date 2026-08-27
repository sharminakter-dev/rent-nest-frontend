'use client'

import { useActionState } from 'react'
import { CreditCard, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { initiatePayment } from '../../../../_actions/paymentActions'

export function PayRequestForm({ rentalRequestId }: { rentalRequestId: string }) {
  const action = initiatePayment.bind(null, rentalRequestId)
  const [state, formAction, pending] = useActionState(action, null)

  return (
    <form action={formAction}>
      <Button
        type="submit"
        disabled={pending}
        className="w-full bg-green-600 text-white hover:bg-green-700"
        size="lg"
      >
        {pending ? (
          <>
            <Loader2 className="size-4 animate-spin" data-icon="inline-start" />
            Redirecting to secure checkout...
          </>
        ) : (
          <>
            <CreditCard data-icon="inline-start" />
            Proceed to Payment
          </>
        )}
      </Button>
      {state && !state.success && (
        <p className="mt-2 text-sm text-destructive">{state.message}</p>
      )}
    </form>
  )
}