// app/dashboard/landlord/properties/PropertyRow.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Pencil, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { IProperty } from '@/lib/types'
import { deleteProperty } from '../../_actions/landlordActions'
import Image from 'next/image'


export function PropertyRow({ property }: { property: IProperty }) {
  const [deleting, setDeleting] = useState(false)

  const handleDelete = async () => {
    if (!confirm(`Delete "${property.title}"? This can't be undone.`)) return

    setDeleting(true)
    const result = await deleteProperty(property.id)
    setDeleting(false)

    if (result.success) {
      toast.success('Property deleted')
    } else {
      toast.error(result.message ?? 'Failed to delete property')
    }
  }

  const propertyImg =
  "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"


  return (
    <Card>
      <CardContent className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
        <Image
          src={property?.image || propertyImg}
          unoptimized
          alt= {property.title}
          width={200}
          height={200}
        />
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="truncate font-semibold">{property.title}</h3>
            <Badge variant={property.isAvailable ? 'secondary' : 'outline'}>
              {property.isAvailable ? 'Available' : 'Rented'}
            </Badge>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            {property.location} · {property.bedrooms} bed · {property.bathrooms} bath · ৳{Number(property.rent).toLocaleString()}/mo
          </p>
        </div>
        <div className="flex items-center gap-2">
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