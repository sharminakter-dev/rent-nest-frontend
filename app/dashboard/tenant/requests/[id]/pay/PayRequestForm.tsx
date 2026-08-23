'use client'

import { useActionState } from 'react'
import { CreditCard } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { initiatePayment } from '../../../../_actions/paymentActions'

export function PayRequestForm({ rentalRequestId }: { rentalRequestId: string }) {
  const action = initiatePayment.bind(null, rentalRequestId)
  const [state, formAction, pending] = useActionState(action, null)

  return (
    <form action={formAction}>
      <Button type="submit" disabled={pending} className="w-full" size="lg">
        <CreditCard data-icon="inline-start" />
        {pending ? 'Redirecting to secure checkout...' : 'Proceed to Payment'}
      </Button>
      {state && !state.success && (
        <p className="mt-2 text-sm text-destructive">{state.message}</p>
      )}
    </form>
  )
}