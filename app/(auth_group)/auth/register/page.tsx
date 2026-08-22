import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import React from 'react'
import RegisterForm from '../../_components/RegisterForm'

const RegisterPage = () => {
   return (
    <main className="min-h-screen bg-gradient-to-br from-background to-muted/30 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center size-12 rounded-lg bg-primary text-primary-foreground font-bold mb-4">
            RN
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Welcome to RentNest</h1>
          <p className="mt-2 text-muted-foreground">
            Sign up to discover beautiful rental properties from trusted landlords
          </p>
        </div>

        {/* Register Card */}
        <Card className="border-border shadow-lg">
          <CardHeader className="space-y-1 ">
            <CardTitle className='text-center '>Sign up</CardTitle>
            {/* <hr /> */}
          </CardHeader>

          <CardContent>
            <RegisterForm/>
          </CardContent>
        </Card>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-muted-foreground">
          By signing up, you agree to our{' '}
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

export default RegisterPage