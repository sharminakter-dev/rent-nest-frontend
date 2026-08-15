import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  ArrowLeft,
  Bath,
  BedDouble,
  CheckCircle2,
  Heart,
  MapPin,
  Maximize2,
  ShieldCheck,
  Star,
  Users,
} from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { getPropertyById } from '../../_actions/propertyActions'

interface PropertiesByIdPageProps {
  params: Promise<{ id: string }>
}

export default async function PropertiesByIdPage({
  params,
}: PropertiesByIdPageProps) {
  const { id } = await params
  const property = await getPropertyById(id);

  if (!property) {
    notFound()
  }

  const landlordName = property.landlord?.name ?? 'RentNest landlord'
  const amenities = property.amenities ?? []

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
        <Button
          variant="ghost"
          className="w-fit gap-2 px-0"
          render={<Link href="/properties" />}
        >
          <ArrowLeft data-icon="inline-start" />
          Back to properties
        </Button>

        <section className="grid gap-8 lg:grid-cols-[1.45fr_1fr] lg:items-start">
          <div className="flex flex-col gap-6">
            <div className="relative flex min-h-80 items-end overflow-hidden rounded-xl bg-muted p-6 sm:min-h-[30rem]">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-muted to-primary/5" />
              <div className="relative z-10 flex w-full items-end justify-between gap-4">
                <div>
                  <Badge variant="secondary" className="mb-3">
                    {property.available === false ? 'Currently rented' : 'Available now'}
                  </Badge>
                  <p className="max-w-md text-sm text-muted-foreground">
                    Property preview for {property.title}
                  </p>
                </div>
                <Button variant="secondary" size="icon" aria-label="Save property">
                  <Heart data-icon="inline-start" />
                </Button>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex flex-col gap-2">
                  <h1 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
                    {property.title}
                  </h1>
                  <p className="flex items-center gap-2 text-muted-foreground">
                    <MapPin data-icon="inline-start" />
                    {property.location}
                  </p>
                </div>
                {property.featured && <Badge>Featured</Badge>}
              </div>

              <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-2">
                  <BedDouble data-icon="inline-start" />
                  {property.bedrooms} bedrooms
                </span>
                <span className="flex items-center gap-2">
                  <Bath data-icon="inline-start" />
                  {property.bathrooms} bathrooms
                </span>
                {/* <span className="flex items-center gap-2">
                  <Maximize2 data-icon="inline-start" />
                  {property.area.toLocaleString()} sq ft
                </span>
                <span className="flex items-center gap-2">
                  <Users data-icon="inline-start" />
                  Up to {property.capacity} guests
                </span> */}
              </div>
            </div>

            <Separator />

            <section className="flex flex-col gap-3">
              <h2 className="text-xl font-semibold">About this property</h2>
              <p className="leading-7 text-muted-foreground">{property.description}</p>
            </section>

            <section className="flex flex-col gap-4">
              <h2 className="text-xl font-semibold">Amenities</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {amenities.map((amenity) => (
                  <div key={amenity} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="text-primary" />
                    {amenity}
                  </div>
                ))}
              </div>
            </section>
          </div>

          <Card className="lg:sticky lg:top-24">
            <CardHeader>
              <div className="flex items-end justify-between gap-4">
                <div>
                  <CardDescription>Monthly rent</CardDescription>
                  <CardTitle className="text-3xl">${property.rent.toLocaleString()}</CardTitle>
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <Star className="fill-current text-amber-500" />
                  <span className="font-medium">{property.reviews.rating}</span>
                  <span className="text-muted-foreground">({property.reviews} reviews)</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-5">
              <div className="rounded-lg bg-muted/60 p-4 text-sm text-muted-foreground">
                Send a request to the landlord and start your rental application.
              </div>
              <div className="flex items-start gap-3 text-sm">
                <ShieldCheck className="mt-0.5 text-primary" />
                <span>Secure requests and verified RentNest accounts.</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 font-semibold text-primary">
                  {landlordName.slice(0, 1).toUpperCase()}
                </div>
                <div>
                  <p className="font-medium">Hosted by {landlordName}</p>
                  <p className="text-sm text-muted-foreground">RentNest landlord</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-3">
              <Button
                className="w-full"
                size="lg"
                render={<Link href={`/auth/login?redirect=/properties/${property.id}`} />}
              >
                Request this property
              </Button>
              <p className="text-center text-xs text-muted-foreground">
                You&apos;ll need to sign in before sending a request.
              </p>
            </CardFooter>
          </Card>
        </section>
      </div>
    </main>
  )
}



export const dynamicParams = true
