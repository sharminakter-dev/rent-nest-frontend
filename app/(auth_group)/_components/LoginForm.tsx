"use client"

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Mail, Lock, ArrowRight } from 'lucide-react'
import { loginAction } from '../_actions/authAction'
import { useActionState, useEffect } from 'react'
import { toast } from 'sonner'

const LoginForm = () => {

  // .bind(null, redirectTo),
   const [state, action, pending] = useActionState(loginAction, false);

       useEffect(()=>{
        if(!state) return;

        if(!state.success){
            toast.error(state.message || "Login Failed");
        }
        
    }, [state])


  return (
     <form action={action}  className="space-y-5">
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


              {/* Submit Button */}
              <Button
                type="submit"
                // disabled={isLoading}
                className="w-full h-10"
              >
                {pending ? (
                  <>
                    <span className="inline-block animate-spin mr-2">⏳</span>
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="ml-2 size-4" />
                  </>
                )}
              </Button>
            </form>
  )
}

export default LoginForm