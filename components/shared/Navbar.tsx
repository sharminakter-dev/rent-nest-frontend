'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Home, LayoutDashboard, LifeBuoy, Menu, Phone, Settings, User, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { NavbarProps } from '@/lib/types'
import { logout } from '@/service/logOut'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function Navbar( {user}: NavbarProps ) {
  
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: '/properties', label: 'Properties', icon: Home },
    { href: '/about', label: 'About',  icon: User },
    { href: '/contact', label: 'Contact',icon: Phone },
  ];

  // User dropdown options, split into groups.
const userMenuGroups = [
  [
    { title: "Dashboard", action: "dashboard", icon: LayoutDashboard },
    { title: "Profile",  action: "profile", icon: User },
    { title: "Settings",  action: "settings", icon: Settings },
  ],
  [{ title: "Support", action: "support", icon: LifeBuoy }],
]

  const router = useRouter();
  const role = user.data?.result?.role

  const handleUserMenuAction = async(action: string) =>{

    if(action === "dashboard"){

      if(role === "TENANT"){
        router.push("/dashboard/tenant");
      }else if(role === "LANDLORD"){
        router.push("/dashboard/landlord");
      }else if(role === "ADMIN"){
        router.push("/dashboard/admin");
      }

      return;

    }

    if(action === "logout"){
      await logout();
      toast.success("User Logged Out Successfully");
      router.push("/auth/login");
    }
  }

 return (
  <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
    <nav className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">

      {/* Logo */}
      <Link
        href="/"
        className="flex items-center gap-2 text-lg font-bold text-primary transition-opacity hover:opacity-80"
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-sm font-bold text-white">
          RN
        </div>

        <span className="hidden sm:inline">
          RentNest
        </span>
      </Link>


      {/* Desktop Navigation */}
      <div className="hidden items-center gap-8 md:flex">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            {link.label}
          </Link>
        ))}
      </div>


      {/* Authentication-dependent UI */}
      {!user?.success ? (

        /* 
           LOGGED OUT
        */
        <>
          {/* Desktop Actions */}
          <div className="hidden items-center gap-3 md:flex">
            <Link href="/auth/login">
              <Button
                variant="outline"
                size="sm"
                className="cursor-pointer"
              >
                Sign In
              </Button>
            </Link>

            <Link href="/auth/register">
              <Button size="sm">
                Sign Up
              </Button>
            </Link>
          </div>


          {/* Mobile Menu */}
          <Sheet
            open={isOpen}
            onOpenChange={setIsOpen}
          >
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

            <SheetContent
              side="right"
              className="w-[250px]"
            >
              <SheetTitle className="text-left text-lg font-bold">
                Menu
              </SheetTitle>

              <div className="mt-8 flex flex-col gap-4">

                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="py-2 text-base font-medium text-muted-foreground transition-colors hover:text-foreground"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}

                <div className="mt-6 space-y-3 border-t pt-4">

                  <Link href="/auth/login">
                    <Button
                      variant="outline"
                      className="w-full"
                    >
                      Sign In
                    </Button>
                  </Link>

                  <Link href="/auth/register">
                    <Button className="w-full">
                      Sign Up
                    </Button>
                  </Link>

                </div>
              </div>
            </SheetContent>
          </Sheet>
        </>

      ) : (

        /*
           LOGGED IN
       */
        <>
          {/* Mobile Navigation */}
          <DropdownMenu>

            <DropdownMenuTrigger className="cursor-pointer md:hidden">
              <Menu />

              <span className="sr-only">
                Toggle navigation menu
              </span>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="start"
              className="w-48"
            >
              <DropdownMenuGroup>

                {navLinks.map((link) => {
                  const Icon = link.icon

                  return (
                    <DropdownMenuItem
                      key={link.href}
                    >
                      <Link href={link.href}>
                        <Icon className="mr-2 h-4 w-4" />
                        <span>{link.label}</span>
                      </Link>
                    </DropdownMenuItem>
                  )
                })}

              </DropdownMenuGroup>
            </DropdownMenuContent>

          </DropdownMenu>


          {/* User Dropdown */}
          <DropdownMenu>

            <DropdownMenuTrigger className="cursor-pointer">

              <Avatar className="size-9">

                <AvatarImage
                  src="/user-avatar.png"
                  alt={user.data?.result?.name || "User"}
                />

                <AvatarFallback>
                  {user.data?.result?.name?.charAt(0)}
                </AvatarFallback>

              </Avatar>

            </DropdownMenuTrigger>


            <DropdownMenuContent
              align="end"
              className="w-56"
            >

              {/* User Information */}
              <DropdownMenuGroup>

                <DropdownMenuLabel>

                  <div className="flex flex-col gap-0.5">

                    <span className="text-sm font-medium">
                      {user.data?.result?.name}
                    </span>

                    <span className="text-xs font-normal text-muted-foreground">
                      {user.data?.result?.email}
                    </span>

                  </div>

                </DropdownMenuLabel>

              </DropdownMenuGroup>


              <DropdownMenuSeparator />


              {/* User Menu Groups */}
              {userMenuGroups.map((group, i) => (

                <DropdownMenuGroup key={i}>

                  {group.map((item) => {

                    const Icon = item.icon

                    return (
                      <DropdownMenuItem
                        key={item.title}
                        onClick={() =>
                          handleUserMenuAction(item.action)
                        }
                      >
                        <Icon />
                        {item.title}
                      </DropdownMenuItem>
                    )

                  })}

                  <DropdownMenuSeparator />

                </DropdownMenuGroup>

              ))}


              {/* Logout */}
              <DropdownMenuItem
                variant="destructive"
                onClick={() =>
                  handleUserMenuAction("logout")
                }
              >
                <LogOut />
                Log out
              </DropdownMenuItem>

            </DropdownMenuContent>

          </DropdownMenu>
        </>

      )}

    </nav>
  </header>
  )
}