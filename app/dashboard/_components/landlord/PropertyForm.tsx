'use client'

import { useActionState, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ICategory, IProperty, PropertyFormState } from '@/lib/types'
import { createProperty, getAllCategoriesFull, updateProperty } from '../../_actions/landlordActions'

type PropertyFormProps = { mode: 'create' } | { mode: 'edit'; property: IProperty }

export function PropertyForm(props: PropertyFormProps) {
  const router = useRouter()
  const property = props.mode === 'edit' ? props.property : undefined

  const action = props.mode === 'create' ? createProperty : updateProperty.bind(null, property!.id)
  const [state, formAction, pending] = useActionState<PropertyFormState, FormData>(action, null)

  const [categories, setCategories] = useState<ICategory[]>([])
  const [categoriesLoading, setCategoriesLoading] = useState(true)
  const [selectedSlug, setSelectedSlug] = useState(property?.category.slug ?? '')

  useEffect(() => {
    getAllCategoriesFull()
      .then((data: ICategory[]) => setCategories(data))
      .finally(() => setCategoriesLoading(false))
  }, [])

  useEffect(() => {
  if (!state) return
  if (state.success) {
    toast.success(props.mode === 'create' ? 'Property created' : 'Property updated')
    router.push('/dashboard/landlord/properties')
  } else {
    toast.error(state.message || 'Something went wrong')
  }
}, [state])

  const selectedCategory = categories.find((category) => category.slug === selectedSlug)

  return (
    <form action={formAction} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input id="title" name="title" defaultValue={property?.title ?? ''} required />
        {state?.errors?.title && <p className="text-xs text-destructive">{state.errors.title}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" name="description" defaultValue={property?.description ?? ''} className="min-h-24" />
        {state?.errors?.description && <p className="text-xs text-destructive">{state.errors.description}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="image">Image URL</Label>
        <Input id="image" name="image" type="url" placeholder="https://..." defaultValue={property?.image ?? ''} />
        {state?.errors?.image && <p className="text-xs text-destructive">{state.errors.image}</p>}
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
        </>
      )}

      <div className="space-y-2">
        <Label htmlFor="categorySlug">Category</Label>
        <Select
          name="categorySlug"
          defaultValue={property?.category.slug}
          onValueChange={(value) => setSelectedSlug(value ?? '')}
        >
          <SelectTrigger id="categorySlug" className="w-full">
            <SelectValue placeholder={categoriesLoading ? 'Loading categories...' : 'Select a category'} />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category.slug} value={category.slug}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {/* hidden — auto-filled from the selected category, never shown or edited directly */}
        <input type="hidden" name="categoryName" value={selectedCategory?.name ?? ''} />
        <input type="hidden" name="categoryDescription" value={selectedCategory?.description ?? ''} />
        {state?.errors?.categorySlug && <p className="text-xs text-destructive">{state.errors.categorySlug}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="rent">Monthly rent</Label>
        <Input id="rent" name="rent" type="number" min={0} defaultValue={property?.rent ?? ''} required />
        {state?.errors?.rent && <p className="text-xs text-destructive">{state.errors.rent}</p>}
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