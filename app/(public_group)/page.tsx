import MotionHouse from '@/components/page/home/MotionHouse';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const page = async () => {

  const data = await fetch(`${process.env.BACKEND_API_URL}/api/properties`);
  const properties = await data.json();

  console.log(properties);

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

      {/* Properties */}
      <p>{properties[1]}</p>

    </div>
  )
}

export default page