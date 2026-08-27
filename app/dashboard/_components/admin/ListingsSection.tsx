import { Bath, BedDouble, MapPin } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { EntityAvatar } from '@/components/entity-avatar'
import { IProperty } from '@/lib/types'

function formatRent(rent: string | number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(Number(rent))
}

export function ListingsSection({ properties }: { properties: IProperty[] }) {
  return (
    <Card id="listings" className="mt-6 scroll-mt-24">
      <CardHeader>
        <div className="flex items-center justify-between gap-4">
          <div>
            <CardTitle>Listings</CardTitle>
            <CardDescription>Every property on the platform.</CardDescription>
          </div>
          <Badge variant="secondary">{properties.length} total</Badge>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col divide-y">
        {properties.map((property) => (
          <div key={property.id} className="flex flex-col gap-3 py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex min-w-0 items-center gap-3">
              <EntityAvatar src={property.image} fallbackSeed={property.title} alt={property.title} />
              <div className="min-w-0">
                <p className="truncate font-semibold">{property.title}</p>
                <p className="mt-0.5 flex items-center gap-1 truncate text-sm text-muted-foreground">
                  <MapPin className="size-3.5 shrink-0" />
                  {property.location}
                </p>
                <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <BedDouble className="size-3.5" />{property.bedrooms}
                  </span>
                  <span className="flex items-center gap-1">
                    <Bath className="size-3.5" />{property.bathrooms}
                  </span>
                  <span className="font-medium text-foreground">{formatRent(property.rent)}/mo</span>
                  <span>by {property.landlord?.name}</span>
                </div>
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