'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

interface RequestPropertyButtonProps {
  propertyId: string
  isLoggedIn: boolean
  userRole: string | null
}

export function RequestPropertyButton({
  propertyId,
  isLoggedIn,
  userRole,
}: RequestPropertyButtonProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const router = useRouter()

  // 1. Not logged in — send to login, then back here
  if (!isLoggedIn) {
    return (
      <>
        <Button
          className="w-full"
          size="lg"
          render={<Link href={`/login?redirectTo=/properties/${propertyId}`} />}
          nativeButton={false}
        >
          Request this property
        </Button>
        <p className="text-center text-xs text-muted-foreground">
          You&apos;ll need to sign in before sending a request.
        </p>
      </>
    )
  }

  // 2. Logged in, but not a tenant (e.g. landlord/admin browsing)
  if (userRole !== 'TENANT') {
    return (
      <Button
        className="w-full !bg-gray-400 !text-gray-200 !cursor-not-allowed"
        size="lg"
        disabled
      >
        Only tenants can request properties
      </Button>
    )
  }

  // 3. Logged in tenant — actually submit
  const handleRequest = async () => {
    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('http://localhost:5000/api/rentals', {
        method: 'POST',
        credentials: 'include', // sends the httpOnly accessToken cookie
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          propertyId,
          startDate: new Date().toISOString().slice(0, 10),
          durationMonths: 6,
          message: '',
        }),
      })

      if (res.status === 401) {
        router.push(`/auth/login?redirect=/properties/${propertyId}`)
        return
      }
      if (res.status === 403) {
        setStatus('error')
        setErrorMsg('Only tenants can send rental requests.')
        return
      }
      if (!res.ok) {
        const data = await res.json().catch(() => null)
        setStatus('error')
        setErrorMsg(data?.message ?? 'Something went wrong. Please try again.')
        return
      }

      setStatus('success')
    } catch {
      setStatus('error')
      setErrorMsg('Network error. Please try again.')
    }
  }

  return (
    <>
      <Button
        className="w-full"
        size="lg"
        onClick={handleRequest}
        disabled={status === 'loading' || status === 'success'}
      >
        {status === 'loading'
          ? 'Sending request...'
          : status === 'success'
          ? 'Request sent'
          : 'Request this property'}
      </Button>
      {status === 'error' && (
        <p className="text-center text-xs text-destructive">{errorMsg}</p>
      )}
    </>
  )
}