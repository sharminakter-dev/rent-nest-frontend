'use client'
import {  Mail, MapPin, Phone } from 'lucide-react'


export default function ContactPage() {

  return (
    <main className="min-h-screen bg-background">
      <section className="border-b bg-muted/40">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Contact RentNest</p>
          <h1 className="mt-4 max-w-3xl text-balance text-4xl font-bold tracking-tight sm:text-6xl">Let&apos;s make renting easier.</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">Have a question about a listing, your rental request, or managing your property? Send us a note and our team will get back to you.</p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8 lg:py-16">
        <div className="flex flex-col gap-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Reach us directly
            </p>
            <h2 className="mt-3 text-2xl font-bold">We&apos;re here to help</h2>
            <p className="mt-3 leading-7 text-muted-foreground">Our support team can help with account questions, listing guidance, and anything in between.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            {[  
              { icon: Mail, label: 'Email', value: 'hello@rentnest.com' }, 
              { icon: Phone, label: 'Phone', value: '+1 (800) 555-0148' }, 
              { icon: MapPin, label: 'Office', value: 'Chittagong, Bangladesh' }
            ].map(({ icon: Icon, label, value }) => 
              <div key={label} className="flex items-center gap-4">
                <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{label}</p>
                  <p className="font-medium">{value}</p>
                </div>
              </div>
            )}
          </div>
        </div>

      </section>
    </main>
  )
}
