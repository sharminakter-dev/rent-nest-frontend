// app/dashboard/landlord/properties/[id]/edit/page.tsx
import { getMyProperties } from '@/app/dashboard/_actions/landlordActions'
import { PropertyForm } from '@/app/dashboard/_components/landlord/PropertyForm'
import { notFound } from 'next/navigation'

export default async function EditPropertyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const res = await getMyProperties()
  const property = (res?.data ?? []).find((p: { id: string }) => p.id === id)

  if (!property) notFound()

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-2xl font-bold tracking-tight">Edit property</h1>
      <div className="mt-6">
        <PropertyForm key={`${property.id}-${property.updatedAt}`} mode="edit" property={property} />
      </div>
    </div>
  )
}