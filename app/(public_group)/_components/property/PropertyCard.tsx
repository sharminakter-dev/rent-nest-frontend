'use client'

import { IProperty } from '@/lib/types'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { MapPin, Star, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'


interface PropertyCardProps {
  property: IProperty
}

export function PropertyCard({ property }: PropertyCardProps) {

  const reviews = property.reviews ?? []
  const reviewCount = reviews.length
  const averageRating = reviewCount > 0
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviewCount
    : 0

    const propertyImage = property.image?? "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";


  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
      {/* Image Container */}
      <div className="relative h-48 bg-muted overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            <Image
                  src={propertyImage}
                  unoptimized
                  alt= {property.title}
                  width={500}
                  height={500}
            />
          </div>
        </div>
        {/* {property.featured && (
          <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground">
            Featured
          </Badge>
        )} */}
      </div>

      {/* Content */}
      <CardHeader className="pb-3 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg line-clamp-1">{property.title}</CardTitle>
            <CardDescription className="flex items-center gap-1 mt-1">
              <MapPin className="size-4 flex-shrink-0" />
              <span className="line-clamp-1">{property.location}</span>
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Price and Rating */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold">{property.rent}</p>
            <p className="text-xs text-muted-foreground">per month</p>
          </div>
          <div className="flex items-center gap-1">
            {reviewCount > 0 ? (
                <div className="flex items-center gap-1">
                  <Star className="size-4 fill-amber-400 text-amber-400" />
                  <span className="text-sm font-medium">
                    {averageRating}
                  </span>
                </div>
              ) : (
                <span className="text-sm text-gray-500">No rating</span>
            )}
            
          </div>
        </div>

        {/* Amenities */}
        {/* <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">Amenities</p>
          <div className="flex flex-wrap gap-1">
            {property.amenities.slice(0, 3).map((amenity) => (
              <Badge key={amenity} variant="secondary" className="text-xs">
                {amenity}
              </Badge>
            ))}
            {property.amenities.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{property.amenities.length - 3}
              </Badge>
            )}
          </div>
        </div> */}

        {/* Occupancy */}
        {/* <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Users className="size-4" />
          <span>{property.capacity} guests max</span>
        </div> */}

        {/* CTA Button */}
        <Button
          className="w-full"
          render={<Link href={`/properties/${property.id}`} />}
          nativeButton={false}
        >
         View Property
        </Button>

        
      </CardContent>
    </Card>
  )
}