import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { IProperty } from '@/lib/types'

const propertyImg =
  "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"

export function ListingsSection({ properties }: { properties: IProperty[] }) {
  return (
    <Card id="listings" className="mt-6">
      <CardHeader>
        <CardTitle>Listings</CardTitle>
        <CardDescription>Every property on the platform.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {properties.map((property) => (
          <div key={property.id} className="flex flex-col gap-3 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex min-w-0 items-center gap-3">
              {property.image ? (
                <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full border">
                  <Image
                    src={property.image ?? propertyImg}
                    alt={property.title}
                    width={48}
                    height={48}
                    unoptimized
                    className="h-full w-full object-cover"
                  />
                </div>
              ) : (
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border bg-muted text-sm font-semibold">
                  {property.title?.charAt(0).toUpperCase()}
                </div>
              )}
              <div className="min-w-0">
                <p className="truncate font-semibold">{property.title}</p>
                <p className="text-sm text-muted-foreground">
                  {property.location} · ${property.rent}/mo · by {property.landlord?.name}
                </p>
              </div>
            </div>
            <Badge
              className={
                property.isAvailable
                  ? 'bg-green-100 text-green-800 hover:bg-green-100'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-100'
              }
            >
              {property.isAvailable ? 'Available' : 'Unavailable'}
            </Badge>
          </div>
        ))}
        {properties.length === 0 && <p className="py-8 text-center text-sm text-muted-foreground">No listings found.</p>}
      </CardContent>
    </Card>
  )
}