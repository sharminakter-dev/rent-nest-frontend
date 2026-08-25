// app/dashboard/landlord/properties/page.tsx
import Link from 'next/link'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'

import { getMyProperties } from '../../_actions/landlordActions'
import { IProperty } from '@/lib/types'
import { PropertyRow } from '../../_components/landlord/PropertyRow'

export default async function LandlordPropertiesPage() {
  const res = await getMyProperties()
  const properties: IProperty[] = res?.data ?? []

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">My properties</h1>
        <Button render={<Link href="/dashboard/landlord/properties/new" />} nativeButton={false}>
          <Plus data-icon="inline-start" />
          Add property
        </Button>
      </div>

      {properties.length > 0 ? (
        <div className="flex flex-col gap-3">
          {properties.map((property) => (
            <PropertyRow key={property.id} property={property} />
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">No properties yet.</p>
      )}
    </div>
  )
}