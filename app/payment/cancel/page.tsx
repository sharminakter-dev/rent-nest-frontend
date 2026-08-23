// app/payment/cancel/page.tsx
import Link from 'next/link'
import { XCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export default function PaymentCancelPage() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md items-center justify-center px-4">
      <Card className="w-full">
        <CardContent className="flex flex-col items-center gap-4 p-8 text-center">
          <XCircle className="size-12 text-red-600" />
          <h1 className="text-xl font-bold">Payment cancelled</h1>
          <p className="text-muted-foreground">
            No charge was made. You can try again anytime from your requests.
          </p>
          <Button render={<Link href="/dashboard/tenant#requests" />} nativeButton={false} className="w-full">
            Back to my requests
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}