// app/payment/success/page.tsx
import Link from 'next/link'
import { CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export default function PaymentSuccessPage() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md items-center justify-center px-4">
      <Card className="w-full">
        <CardContent className="flex flex-col items-center gap-4 p-8 text-center">
          <CheckCircle2 className="size-12 text-green-600" />
          <h1 className="text-xl font-bold">Payment successful</h1>
          <p className="text-muted-foreground">
            Your payment has been processed. You can view the details in your dashboard.
          </p>
          <Button render={<Link href="/dashboard/tenant#payments" />} nativeButton={false} className="w-full">
            View payment history
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}