'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#properties', label: 'Properties' },
    { href: '#about', label: 'About' },
    { href: '#contact', label: 'Contact' },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-lg text-primary hover:opacity-80 transition-opacity"
        >
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white text-sm font-bold">
            RN
          </div>
          <span className="hidden sm:inline">RentNest</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop Action Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Button variant="outline" size="sm">
            Sign In
          </Button>
          <Button size="sm">Sign Up</Button>
        </div>

        {/* Mobile Menu Sheet */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger
                render={
                    <Button
                    variant="ghost"
                    size="icon"
                    className="md:hidden"
                    aria-label="Toggle menu"
                    />
                }
                >
                <Menu className="h-6 w-6" />
            </SheetTrigger>
          <SheetContent side="right" className="w-[250px]">
            <SheetTitle className="text-left text-lg font-bold">Menu</SheetTitle>
            <div className="mt-8 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-base font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-6 space-y-3 border-t pt-4">
                <Button variant="outline" className="w-full">
                  Sign In
                </Button>
                <Button className="w-full">Sign Up</Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  )
}
