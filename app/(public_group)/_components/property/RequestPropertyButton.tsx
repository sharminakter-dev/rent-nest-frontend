'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { RequestPropertyDialog } from './RequestPropertyDialog'

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

  // 2. Logged in, but not a tenant
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

  // 3. Logged in tenant — opens the dialog
  return <RequestPropertyDialog propertyId={propertyId} />
}