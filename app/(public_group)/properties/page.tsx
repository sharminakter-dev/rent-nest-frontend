import React, { Suspense } from 'react'
import { PropertyCard } from '../_components/property/PropertyCard';
import { getAllCategories, getAllProperties } from '../_actions/propertyActions';
import { IProperty } from '@/lib/types';
import { PropertySkeleton } from '../_components/property/PropertySkeleton';
import PropertyList from '../_components/property/PropertyList';
import { PropertySearchBar } from '../_components/property/PropertySearchBar';

const PropertiesPage = async({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) => {

  const propertyCategories = await getAllCategories();

  return (
    <section id="featured" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6 px-4 py-10 sm:px-6 lg:px-8">
        <PropertySearchBar propertyCategories={propertyCategories} />
        <Suspense fallback= {<PropertySkeleton/>}>
          <PropertyList searchParams={searchParams} />
        </Suspense>
    
      </div>
    </section>
  );

}

export default PropertiesPage