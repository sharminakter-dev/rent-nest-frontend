import React from 'react'
import { PropertyCard } from '../_components/PropertyCard';
import { getAllProperties } from '../_actions/propertyActions';
import { IProperty } from '@/lib/types';

const PropertiesPage = async() => {

    const properties = await getAllProperties();

  return (
    <section id="featured" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6 px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {properties.map((property: IProperty) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
    
      </div>
    </section>
  );

}

export default PropertiesPage