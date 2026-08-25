// app/dashboard/landlord/properties/PropertyForm.tsx
'use client'

import { useActionState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { IProperty } from '@/lib/types'
import { createProperty, updateProperty } from '../../_actions/landlordActions'


type PropertyFormProps = { mode: 'create' } | { mode: 'edit'; property: IProperty }

export function PropertyForm(props: PropertyFormProps) {
  const router = useRouter()
  const action = props.mode === 'create' ? createProperty : updateProperty.bind(null, props.property.id)
  const [state, formAction, pending] = useActionState(action, null) as any

  useEffect(() => {
    if (!state) return
    if (state.success) {
      toast.success(props.mode === 'create' ? 'Property created' : 'Property updated')
      if (props.mode === 'create') router.push('/dashboard/landlord/properties')
    } else {
      toast.error(state.message || 'Something went wrong')
    }
  }, [state])

  const property = props.mode === 'edit' ? props.property : undefined

  return (
    <form action={formAction} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input id="title" name="title" defaultValue={property?.title} required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" name="description" defaultValue={property?.description} required className="min-h-24" />
      </div>

      {props.mode === 'create' && (
        <>
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input id="location" name="location" required />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="bedrooms">Bedrooms</Label>
              <Input id="bedrooms" name="bedrooms" type="number" min={0} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bathrooms">Bathrooms</Label>
              <Input id="bathrooms" name="bathrooms" type="number" min={0} required />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Category</Label>
            <div className="grid grid-cols-3 gap-2">
              <Input name="categoryName" placeholder="Name (e.g. Villa)" required />
              <Input name="categorySlug" placeholder="Slug (e.g. villa)" required />
              <Input name="categoryDescription" placeholder="Description" required />
            </div>
          </div>
        </>
      )}

      <div className="space-y-2">
        <Label htmlFor="rent">Monthly rent</Label>
        <Input id="rent" name="rent" type="number" min={0} defaultValue={property?.rent} required />
      </div>

      {props.mode === 'edit' && (
        <Label className="flex items-center gap-2">
          <Checkbox name="isAvailable" defaultChecked={property?.isAvailable} />
          Available for rent
        </Label>
      )}

      <Button type="submit" disabled={pending} className="w-full">
        {pending ? 'Saving...' : props.mode === 'create' ? 'Create Property' : 'Save Changes'}
      </Button>
    </form>
  )
}