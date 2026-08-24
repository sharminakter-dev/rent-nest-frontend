import { notFound } from 'next/navigation'
import { IProperty } from '@/lib/types'
import { getMyProperties } from '@/app/dashboard/_actions/landlordActions'
import { PropertyForm } from '@/app/dashboard/_components/landlord/PropertyForm'

export default async function EditPropertyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const res = await getMyProperties()
  const properties: IProperty[] = res?.data ?? []
  const property = properties.find((p) => p.id === id)

  if (!property) notFound()

  return <PropertyForm property={property} />
}