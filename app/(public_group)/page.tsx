import MotionHouse from '@/components/page/home/MotionHouse';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PropertyCard } from './_components/PropertyCard';
import { getAllProperties } from './_actions/propertyActions';
import { IProperty } from '@/lib/types';

const page = async () => {

  const properties = await getAllProperties();
  console.log(properties)

  return (
    <div>
      {/* Banner */}
      <section className="bg-black text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
            <div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                Find Your Perfect Place to Stay
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">
                Discover beautiful rental properties from trusted landlords. Whether you&apos;re looking for a short-term stay or a long-term rental, RentNest has you covered.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Button size="lg">
                  <Link href="/properties">Browse Properties</Link>
                </Button>
                <Button size="lg" >
                  <Link href="#featured">Learn More</Link>
                </Button>
              </div>
            </div>
            <div className="relative h-96  rounded-lg overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                    <MotionHouse/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section id="featured" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-3xl font-bold tracking-tight">Featured Properties</h2>
          <p className="mt-2 text-muted-foreground">
            Explore our handpicked selection of premium rental properties
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {properties.map((property : IProperty) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button size="lg" variant="outline" >
            <Link href="/properties">View All Properties</Link>
          </Button>
        </div>
      </section>


      {/* How It Works Section */}
      <section className="bg-muted/30 mx-auto max-w-7xl w-full px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-3xl font-bold tracking-tight">How RentNest Works</h2>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {[
            {
              title: 'Browse',
              description: 'Explore a wide variety of rental properties across different locations and price ranges.'
            },
            {
              title: 'Request',
              description: 'Send a rental request to your desired property and wait for landlord approval.'
            },
            {
              title: 'Pay & Move',
              description: 'Complete the payment process securely and get access to your new rental home.'
            }
          ].map((step, index) => (
            <div key={index} className="relative">
              <div className="mb-4">
                <div className="flex items-center justify-center size-12 rounded-lg bg-primary text-primary-foreground font-bold text-lg">
                  {index + 1}
                </div>
              </div>
              <h3 className="text-xl font-semibold">{step.title}</h3>
              <p className="mt-2 text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

       {/* CTA Section */}
      <section className='bg-black'>
        <div className="rounded-lg bg-primary px-6 py-12 text-center sm:px-12">
          <h2 className="text-3xl font-bold text-primary-foreground">
            Ready to find your perfect rental?
          </h2>
          <p className="mt-3 text-lg text-primary-foreground/90">
            Join thousands of happy tenants and landlords on RentNest
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Button size="lg" variant="secondary">
              <Link href="/auth/register?role=tenant">Start as a Tenant</Link>
            </Button>
            <Button size="lg" variant="secondary">
              <Link href="/auth/register?role=landlord">List Your Property</Link>
            </Button>
          </div>
        </div>
      </section>

    </div>
  )
}

export default page