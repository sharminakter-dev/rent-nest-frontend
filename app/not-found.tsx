import Link from 'next/link'
import { Home, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-background px-4 py-16">
      <section className="w-full max-w-2xl text-center">
        <div className="mx-auto flex size-20 items-center justify-center rounded-2xl bg-primary text-2xl font-bold text-primary-foreground shadow-sm">
          404
        </div>
        <p className="mt-8 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
          Page not found
        </p>
        <h1 className="mt-3 text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          This rental has moved on.
        </h1>
        <p className="mx-auto mt-5 max-w-lg text-pretty text-base leading-7 text-muted-foreground sm:text-lg">
          We couldn&apos;t find the page you were looking for. Head back home or explore available properties on RentNest.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button 
            size="lg" 
            render={<Link href="/" />}
             nativeButton={false}
          >
            <Home data-icon="inline-start" />
            Back to home
          </Button>
        
          <Button 
           size="lg" 
           variant="outline" 
           render={<Link href="/properties" />}
           nativeButton={false} 
          >
            <Search data-icon="inline-start" />
            Browse properties
          </Button>
        </div>
      </section>
    </main>
  )
}
