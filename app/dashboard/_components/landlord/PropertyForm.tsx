'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

import { IProperty } from '@/lib/types'
import { toast } from 'sonner'
import { createProperty, updateProperty } from '../../_actions/landlordActions'

export function PropertyForm({ property }: { property?: IProperty }) {
  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitting(true)
    const form = new FormData(e.currentTarget)

    const basePayload = {
      title: String(form.get('title')),
      description: String(form.get('description')),
      location: String(form.get('location')),
      bedrooms: Number(form.get('bedrooms')),
      bathrooms: Number(form.get('bathrooms')),
      rent: Number(form.get('rent')),
      image: String(form.get('image') || ''),
    }

    const res = property
      ? await updateProperty(property.id, {
          ...basePayload,
          isAvailable: form.get('isAvailable') === 'on',
        })
      : await createProperty({
          ...basePayload,
          category: {
            name: String(form.get('category')),
            slug: String(form.get('category')).toLowerCase().replace(/\s+/g, '-'),
          },
        })

    setSubmitting(false)

    if (res.success) {
      toast.success(property ? 'Property updated' : 'Property created')
      router.push('/dashboard/landlord')
      router.refresh()
    } else {
      toast.error(res.message ?? 'Something went wrong')
    }
  }

  return (
    <main className="mx-auto max-w-3xl p-4 py-8 sm:p-6 lg:p-8">
      <div className="mb-8">
        <p className="text-sm font-medium text-primary">Property management</p>
        <h1 className="mt-1 text-3xl font-bold">{property ? 'Edit property' : 'Create property'}</h1>
        <p className="mt-2 text-muted-foreground">Add the details tenants need to choose their next home.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Listing details</CardTitle>
          <CardDescription>All fields can be updated later.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <label className="flex flex-col gap-2 text-sm font-medium">
              Property title
              <Input name="title" defaultValue={property?.title} placeholder="Modern city apartment" required />
            </label>

            <label className="flex flex-col gap-2 text-sm font-medium">
              Location
              <Input name="location" defaultValue={property?.location} placeholder="Street, city, state" required />
            </label>

            <div className="grid gap-5 sm:grid-cols-3">
              <label className="flex flex-col gap-2 text-sm font-medium">
                Monthly rent
                <Input name="rent" type="number" defaultValue={property?.rent} required />
              </label>
              <label className="flex flex-col gap-2 text-sm font-medium">
                Bedrooms
                <Input name="bedrooms" type="number" defaultValue={property?.bedrooms} required />
              </label>
              <label className="flex flex-col gap-2 text-sm font-medium">
                Bathrooms
                <Input name="bathrooms" type="number" defaultValue={property?.bathrooms} required />
              </label>
            </div>

            <label className="flex flex-col gap-2 text-sm font-medium">
              Image URL
              <Input name="image" defaultValue={property?.image ?? ''} placeholder="https://..." />
            </label>

            {!property && (
              <label className="flex flex-col gap-2 text-sm font-medium">
                Category
                <Input name="category" placeholder="Villa, Apartment, Studio..." required />
              </label>
            )}

            <label className="flex flex-col gap-2 text-sm font-medium">
              Description
              <textarea
                name="description"
                defaultValue={property?.description}
                className="min-h-28 rounded-md border bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                required
              />
            </label>

            {property && (
              <label className="flex items-center gap-2 text-sm font-medium">
                <input type="checkbox" name="isAvailable" defaultChecked={property.isAvailable} className="size-4" />
                Available for rent
              </label>
            )}

            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" render={<Link href="/dashboard/landlord" />}>
                Cancel
              </Button>
              <Button type="submit" disabled={submitting}>
                {submitting ? 'Saving...' : property ? 'Save changes' : 'Create property'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  )
}