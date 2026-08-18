import React from 'react'
import { getAllProperties } from '../../_actions/propertyActions';
import { PropertyCard } from './PropertyCard';
import { IProperty } from '@/lib/types';

async function PropertyList({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}) {

     const query = await searchParams;

    const properties = await getAllProperties({query});

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {properties.map((property: IProperty) => (
        <PropertyCard key={property.id} property={property} />
        ))}
    </div>
  )
}

export default PropertyList