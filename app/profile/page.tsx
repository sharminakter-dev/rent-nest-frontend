import Link from "next/link";
import {
  Camera,
  ChevronLeft,
  Mail,
  Phone,
  ShieldCheck,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { getMe } from "@/service/getMe";
import Image from "next/image";
import { EntityAvatar } from "@/components/entity-avatar";

export const metadata = {
  title: "Profile Settings | RentNest",
  description: "Manage your RentNest account profile and preferences.",
};

export default async function Page() {
  const user = await getMe();
  const userData = user?.data?.result;
  
  const dashboardPath =
  userData?.role === "TENANT"
    ? "/dashboard/tenant"
    : userData?.role === "LANDLORD"
      ? "/dashboard/landlord"
      : userData?.role === "ADMIN"
        ? "/dashboard/admin"
        : "/";

  return (
    <main className="min-h-screen bg-muted/30 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <div className="relative overflow-hidden rounded-2xl border bg-background p-6 shadow-sm sm:p-8">
          <div className="absolute right-0 top-0 size-40 rounded-full bg-primary/10 blur-3xl" aria-hidden="true" />
          <div className="relative flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Link
                href={dashboardPath}
                className="-ml-3 mb-2 inline-flex h-9 items-center gap-2 rounded-md px-3 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                <ChevronLeft className="size-4" />
                Back to dashboard
            </Link>
            <h1 className="text-3xl font-bold tracking-tight">Profile settings</h1>
            <p className="mt-1 text-muted-foreground">Manage your RentNest account details and preferences.</p>
          </div>
          <Badge variant="secondary" className="w-fit gap-2">
            <ShieldCheck data-icon="inline-start" /> Verified account
          </Badge>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
          <Card className="h-fit">
            <CardContent className="flex flex-col items-center gap-4 p-6 text-center">
              <div className="relative">
                <EntityAvatar
                src={
                  userData?.profile?.profilePhoto ||
                        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1170&auto=format&fit=crop"
                }  
                fallbackSeed={userData?.name ?? '?'}
                alt={userData?.name || 'User'}
                size={96}
              />
                <Button size="icon" variant="secondary" className="absolute -bottom-1 -right-1 size-9 rounded-full" aria-label="Change profile photo">
                  <Camera />
                </Button>
              </div>
              <div>
                <p className="text-xl font-semibold">{userData?.name}</p>
                <p className="text-sm text-muted-foreground">{userData?.role} account</p>
              </div>
              <Separator />
              <div className="flex w-full flex-col gap-3 text-left text-sm">
                <div className="flex items-center gap-3 text-muted-foreground"><Mail className="size-4" />
                    <span>{userData?.email}</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                    <Phone className="size-4" /><span>{userData?.phone || "No phone number" }</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Personal information</CardTitle>
              <CardDescription>Update the information landlords see when reviewing your requests.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-5 sm:grid-cols-2">
              <div>
                <p className="text-sm text-muted-foreground">Full name</p>
                <p className="mt-1 font-medium">{userData?.name}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Phone number</p>
                <p className="mt-1 font-medium">{userData?.phone || "No phone number" }</p>
              </div>
              <div className="sm:col-span-2">
                <p className="text-sm text-muted-foreground">Email address</p>
                <p className="mt-1 font-medium">{userData?.email}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
