"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import Link from "next/link"
import { Button } from "@/components/ui/Button"

// 18+ check
const eighteenYearsAgo = new Date()
eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18)

const signUpSchema = z.object({
  email: z.string().email("Invalid email").endsWith(".edu", "Must be a .edu email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  dob: z.string().refine((val) => new Date(val) <= eighteenYearsAgo, {
    message: "You must be at least 18 years old",
  }),
  acceptGuidelines: z.boolean().refine((val) => val === true, {
    message: "You must accept the Community Guidelines",
  }),
})

type SignUpFormValues = z.infer<typeof signUpSchema>

export default function SignUpPage() {
  const [isLoading, setIsLoading] = useState(false)
  
  const { register, handleSubmit, formState: { errors } } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
  })

  const onSubmit = async (data: SignUpFormValues) => {
    setIsLoading(true)
    // TODO: Supabase sign up integration
    console.log("Sign up data:", data)
    setTimeout(() => setIsLoading(false), 1000)
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-2">Join Recharge</h1>
        <p className="text-sm text-white/70">Create an account with your university email.</p>
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

        <div className="space-y-2">
          <label className="text-sm font-medium">Date of Birth</label>
          <input
            {...register("dob")}
            type="date"
            className="w-full bg-black/20 border border-white/20 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-accent-teal transition-colors [color-scheme:dark]"
          />
          {errors.dob && <p className="text-accent-coral text-xs">{errors.dob.message}</p>}
        </div>

        <div className="flex items-start space-x-2 pt-2">
          <input
            {...register("acceptGuidelines")}
            type="checkbox"
            className="mt-1 bg-black/20 border-white/20 rounded"
          />
          <div className="text-xs text-white/70 leading-tight">
            I agree to the <Link href="/guidelines" className="text-accent-teal hover:underline">Community Guidelines</Link>. I understand that violation of these rules will result in account suspension.
          </div>
        </div>
        {errors.acceptGuidelines && <p className="text-accent-coral text-xs">{errors.acceptGuidelines.message}</p>}

        <Button type="submit" className="w-full mt-6" disabled={isLoading}>
          {isLoading ? "Creating account..." : "Sign Up"}
        </Button>
      </form>

      <div className="text-center text-sm text-white/70">
        Already have an account?{" "}
        <Link href="/log-in" className="text-accent-teal hover:underline">
          Log in
        </Link>
      </div>
    </div>
  )
}
