import Link from 'next/link'
import { ArrowRight, Check, Heart, ShieldCheck, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const values = [
  { icon: ShieldCheck, title: 'Trust, built in', text: 'Clear listings, verified details, and straightforward communication help everyone rent with confidence.' },
  { icon: Heart, title: 'People first', text: 'We design every part of RentNest around the real needs of tenants and responsible landlords.' },
  { icon: Sparkles, title: 'Better renting', text: 'From discovery to move-in, simple tools make the rental journey feel less stressful.' },
]

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <section className="border-b bg-muted/40">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-20 sm:px-6 lg:flex-row lg:items-end lg:justify-between lg:px-8">
          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-primary">About RentNest</p>
            <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-6xl">
                Renting should feel like finding your place.
            </h1>
            <p className="mt-6 max-w-2xl text-pretty text-lg leading-8 text-muted-foreground">
                RentNest brings tenants and landlords together with a simpler, more transparent way to discover, request, and manage rental homes.
            </p>
          </div>
          <Button size="lg">
            <Link href="/properties">Explore homes <ArrowRight data-icon="inline-end" /></Link>
          </Button>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">Our mission</p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">More clarity. Better homes. Happier moves.</h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">We believe a rental platform should do more than show listings. It should make expectations clear, keep conversations organized, and give every person a reliable path from first search to settled home.</p>
        </div>
        <Card className="bg-primary text-primary-foreground">
          <CardHeader><CardTitle className="text-2xl">The RentNest promise</CardTitle></CardHeader>
          <CardContent className="flex flex-col gap-4 text-primary-foreground/85">
            {['Listings that are easy to understand', 'A request process without guesswork', 'Tools that respect both sides of the rental'] .map((item) => <div key={item} className="flex items-start gap-3"><Check className="mt-1 size-5 shrink-0" /><span>{item}</span></div>)}
          </CardContent>
        </Card>
      </section>

      <section className="bg-muted/40">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">What guides us</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight">A better experience for everyone</h2>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {values.map(({ icon: Icon, title, text }) => 
                <Card key={title}>
                    <CardHeader>
                        <div className="flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                            <Icon />
                        </div>
                        <CardTitle className="pt-2">{title}</CardTitle>
                    </CardHeader>
                    <CardContent className="leading-7 text-muted-foreground">{text}</CardContent>
                </Card>)}
            </div>
        </div>
      </section>
    </main>
  )
}
