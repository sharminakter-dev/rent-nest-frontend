'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Pencil, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { EntityAvatar } from '@/components/entity-avatar'
import { IProperty } from '@/lib/types'
import { deleteProperty } from '../../_actions/landlordActions'


export function PropertyRow({ property }: { property: IProperty }) {
  const [deleting, setDeleting] = useState(false)

  const handleDelete = async () => {
    if (!confirm(`Delete "${property.title}"? This can't be undone.`)) return
    setDeleting(true)
    try {
      const result = await deleteProperty(property.id)
      if (result.success) toast.success('Property deleted')
      else toast.error(result.message ?? 'Failed to delete property')
    } catch {
      toast.error('Network error — please try again.')
    } finally {
      setDeleting(false)
    }
  }

  return (
    <Card>
      <CardContent className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-center gap-3">
          <EntityAvatar src={property.image} fallbackSeed={property.title} alt={property.title} size={56} />
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="truncate font-semibold">{property.title}</h3>
              <Badge
                className={
                  property.isAvailable
                    ? 'bg-green-100 text-green-800 hover:bg-green-100'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-100'
                }
              >
                {property.isAvailable ? 'Available' : 'Rented'}
              </Badge>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              {property.location} · {property.bedrooms} bed · {property.bathrooms} bath · ৳{Number(property.rent).toLocaleString()}/mo
            </p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            render={<Link href={`/dashboard/landlord/properties/${property.id}/edit`} />}
            nativeButton={false}
          >
            <Pencil data-icon="inline-start" />
            Edit
          </Button>
          <Button size="sm" variant="destructive" onClick={handleDelete} disabled={deleting}>
            <Trash2 data-icon="inline-start" />
            {deleting ? 'Deleting...' : 'Delete'}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}