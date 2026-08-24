import { Geist_Mono, Inter } from "next/font/google"

import "./globals.css"
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";
import { Navbar } from "@/components/shared/Navbar";
import { getMe } from "@/service/getMe";

const inter = Inter({subsets:['latin'],variable:'--font-sans'})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {

   const user = await getMe();

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased", fontMono.variable, "font-sans", inter.variable)}
    >
      <body>
        <Navbar user={user} />
        <Toaster position="top-right" richColors/>
        {children}
      </body>
    </html>
  )
}


// app/layout.tsx
// import { Suspense } from "react"
// import { Geist_Mono, Inter } from "next/font/google"

// import "./globals.css"
// import { cn } from "@/lib/utils"
// import { Toaster } from "sonner"
// import { NavbarWithUser } from "@/components/shared/NavbarWithUser"

// const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

// const fontMono = Geist_Mono({
//   subsets: ["latin"],
//   variable: "--font-mono",
// })

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode
// }>) {
//   return (
//     <html
//       lang="en"
//       suppressHydrationWarning
//       className={cn("antialiased", fontMono.variable, "font-sans", inter.variable)}
//     >
//       <body>
//         <Suspense fallback={<NavbarSkeleton />}>
//           <NavbarWithUser />
//         </Suspense>
//         <Toaster position="top-right" richColors />
//         {children}
//       </body>
//     </html>
//   )
// }

// function NavbarSkeleton() {
//   // Match your real Navbar's height/layout so there's no CLS jump
//   return <div className="h-16 w-full border-b" />
// }