import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import LoginForm from '../../_components/LoginForm'


export default function LoginPage() {

  return (
    <main className="min-h-screen bg-gradient-to-br from-background to-muted/30 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center size-12 rounded-lg bg-primary text-primary-foreground font-bold mb-4">
            RN
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Welcome Back</h1>
          <p className="mt-2 text-muted-foreground">
            Sign in to your RentNest account
          </p>
        </div>

        {/* Login Card */}
        <Card className="border-border shadow-lg">
          <CardHeader className="space-y-1 ">
            <CardTitle className='text-center '>Sign In</CardTitle>
            {/* <hr /> */}
          </CardHeader>

          <CardContent>
           <LoginForm/>
           
          </CardContent>
        </Card>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-muted-foreground">
          By signing in, you agree to our{' '}
          <Link href="#" className="hover:underline">
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link href="#" className="hover:underline">
            Privacy Policy
          </Link>
        </p>
      </div>
    </main>
  )
}
