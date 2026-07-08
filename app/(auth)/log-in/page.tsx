"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import Link from "next/link"
import { Button } from "@/components/ui/Button"

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email").endsWith(".edu", "Must be a .edu email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
})

type LoginFormValues = z.infer<typeof loginSchema>

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true)
    // TODO: Supabase login integration
    console.log("Login data:", data)
    setTimeout(() => setIsLoading(false), 1000)
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-2">Welcome Back</h1>
        <p className="text-sm text-white/70">Enter your university email to log in.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">University Email</label>
          <input
            {...register("email")}
            type="email"
            placeholder="student@university.edu"
            className="w-full bg-black/20 border border-white/20 rounded-xl px-4 py-2 text-white placeholder:text-white/30 focus:outline-none focus:border-accent-teal transition-colors"
          />
          {errors.email && <p className="text-accent-coral text-xs">{errors.email.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Password</label>
          <input
            {...register("password")}
            type="password"
            className="w-full bg-black/20 border border-white/20 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-accent-teal transition-colors"
          />
          {errors.password && <p className="text-accent-coral text-xs">{errors.password.message}</p>}
        </div>

        <Button type="submit" className="w-full mt-6" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Log In"}
        </Button>
      </form>

      <div className="text-center text-sm text-white/70">
        Don&apos;t have an account?{" "}
        <Link href="/sign-up" className="text-accent-teal hover:underline">
          Sign up
        </Link>
      </div>
    </div>
  )
}
