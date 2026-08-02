"use client"

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Mail, Lock, ArrowRight } from 'lucide-react'
import { loginAction, registerAction } from '../_actions/authAction'
import { useActionState, useEffect, useState } from 'react'
import { toast } from 'sonner'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


const RegisterForm = () => {

  const items = [
    { label: "TENANT", value: "TENANT" },
    { label: "LANDLORD", value: "LANDLORD" },
  ]

  const [role, setRole] = useState("");

  // .bind(null, redirectTo),
   const [state, action, pending] = useActionState(registerAction, false);

       useEffect(()=>{
        if(!state) return;

        if(!state.success){
            toast.error(state.message || "Registration Failed");
        }
        
    }, [state]);


  return (
     <form action={action}  className="space-y-5">

              {/* Name Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Your Name:
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Your Name"
                    className="pl-10 h-10"
                  />
                </div>
                {state.errors?.name && (
                  <p className="text-xs text-destructive">{state.errors.name}</p>
                )}
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    className="pl-10 h-10"
                  />
                </div>
                {state.errors?.email && (
                  <p className="text-xs text-destructive">{state.errors.email}</p>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-sm font-medium">
                    Password
                  </Label>

                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10 h-10"
                  />
                </div>
                {state.errors?.password && (
                  <p className="text-xs text-destructive">{state.errors.password}</p>
                )}
              </div>

              {/* Select Role */}
              <input type="hidden" name="role" value={role} />
               <Select items={items}  value={role} onValueChange={(value) => setRole(value ?? "")}>
                <SelectTrigger className="w-full max-w-48">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Role</SelectLabel>
                    {items.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
                {state.errors?.role && (
                  <p className="text-xs text-destructive">{state.errors.role}</p>
                )}
              </Select>


              {/* photo Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                 Profile photo
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
                  <Input
                    id="photoUrl"
                    name="profilePhoto"
                    type="photoUrl"
                    placeholder="Enter Your Photo Url"
                    className="pl-10 h-10"
                  />
                </div>
              </div>


              {/* Submit Button */}
              <Button
                type="submit"
                // disabled={isLoading}
                className="w-full h-10"
              >
                {pending ? (
                  <>
                    <span className="inline-block animate-spin mr-2">⏳</span>
                    Signing up...
                  </>
                ) : (
                  <>
                    Sign Up
                    <ArrowRight className="ml-2 size-4" />
                  </>
                )}
              </Button>
            </form>
  )
}

export default RegisterForm