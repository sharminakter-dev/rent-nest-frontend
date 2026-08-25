import { PropertyForm } from "@/app/dashboard/_components/landlord/PropertyForm";

export default function NewPropertyPage() {
  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-2xl font-bold tracking-tight">Add a new property</h1>
      <div className="mt-6">
        <PropertyForm mode="create" />
      </div>
    </div>
  )
}