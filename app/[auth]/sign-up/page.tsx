"use client"

import Link from "next/link"
import Image from "next/image"
import {
  Briefcase,
  Mail,
  Shield,
  User,
  Lock,
  LockKeyhole,
  Eye,
  EyeOff,
} from "lucide-react"
import { FcGoogle } from "react-icons/fc"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { authClient } from "@/lib/auth-client"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"

export default function SignUpPage() {
  const router = useRouter()

  const [showPassword, setShowPassword] = useState(false)
  const [role, setRole] = useState<"seeker" | "recruiter" | "admin">("seeker")

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)

    const name = formData.get("fullName") as string
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const confirmPassword = formData.get("confirmPassword") as string

    if (password !== confirmPassword) {
      console.log("Passwords Do Not Match!!")
      return
    }

    const { error } = await authClient.signUp.email({
      name,
      email,
      password,
      role,
      callbackURL: "/",
    } as Parameters<typeof authClient.signUp.email>[0] & { role: string })

    if (error) {
      toast.error("Sign up failed", {
        description: error.message ?? "Something went wrong. Please try again.",
      })
      return
    }
    toast.success("Account Created", {
      description: "Welcome To HireLoop",
    })
    router.push("/")
  }
  const handleGoogleSignIn = async () => {
    const { error } = await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    })

    if (error) {
      toast.error("Sign In failed", {
        description: error.message ?? "Something went wrong. Please try again.",
      })
    }
  }

  return (
    <div className="relative mt-6 flex min-h-screen flex-col items-center justify-center bg-background px-4 py-10">
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 h-[640px] w-[640px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-blue-500/20 via-purple-500/10 to-transparent blur-[128px] sm:h-[800px] sm:w-[800px]" />
      </div>
      <Card className="w-full max-w-lg shadow-lg">
        <CardHeader className="space-y-3 px-8 pt-8 text-center">
          <div className="flex justify-center">
            <Image
              src="/assests/logo.png"
              alt="HireLoop logo"
              width={160}
              height={57}
              className="h-auto w-40"
              priority
            />
          </div>
          <CardTitle className="text-3xl font-bold">Create account</CardTitle>
          <CardDescription className="text-base">
            Join{" "}
            <span className="bg-gradient-to-r from-blue-600 via-sky-500 to-orange-500 bg-clip-text font-semibold text-transparent">
              HireLoop
            </span>{" "}
            to find your dream job
          </CardDescription>
        </CardHeader>

        <CardContent className="px-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-sm font-medium">
                Full Name
              </Label>
              <div className="relative">
                <User className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="fullName"
                  name="fullName"
                  type="text"
                  placeholder="John Doe"
                  className="h-12 pl-10 text-base"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email
              </Label>
              <div className="relative">
                <Mail className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  className="h-12 pl-10 text-base"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">
                Password
              </Label>
              <div className="relative">
                <Lock className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  required
                  className="h-12 pr-10 pl-10 text-base"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-sm font-medium">
                Confirm Password
              </Label>
              <div className="relative">
                <LockKeyhole className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  required
                  className="h-12 pr-12 pl-10 text-base"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  aria-pressed={showPassword}
                  className="absolute top-1/2 right-3 -translate-y-1/2 rounded-sm p-1 text-muted-foreground transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="role" className="text-sm font-medium">
                Role
              </Label>
              <div className="grid grid-cols-3 gap-2">
                {(
                  [
                    {
                      value: "seeker",
                      label: "Job Seeker",
                      icon: <User className="h-4 w-4" />,
                    },
                    {
                      value: "recruiter",
                      label: "Recruiter",
                      icon: <Briefcase className="h-4 w-4" />,
                    },
                    {
                      value: "admin",
                      label: "Admin",
                      icon: <Shield className="h-4 w-4" />,
                    },
                  ] as const
                ).map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    role="radio"
                    aria-checked={role === option.value}
                    onClick={() => setRole(option.value)}
                    className={cn(
                      "flex h-12 items-center justify-center gap-2 rounded-lg border text-sm font-medium transition-all",
                      role === option.value
                        ? "border-blue-600 bg-blue-600 text-white shadow-sm"
                        : "border-input bg-background text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                    )}
                  >
                    {option.icon}
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <Button
              type="submit"
              className="h-12 w-full border-0 bg-gradient-to-r from-blue-600 via-sky-500 to-orange-500 text-base font-semibold text-white transition-opacity hover:opacity-90"
            >
              Create account
            </Button>
            <p className="flex justify-center font-extrabold text-blue-500">
              Or
            </p>
            <div>
              <Button
                variant="outline"
                type="button"
                className="w-full"
                onClick={handleGoogleSignIn}
              >
                <FcGoogle className="size-5" />
                Continue with Google
              </Button>
            </div>
            <p className="mx-auto mb-3 max-w-xs text-center text-xs leading-relaxed text-muted-foreground">
              Signing in with Google creates a Job Seeker account. To register
              as a recruiter, use email sign-up.
            </p>
          </form>
        </CardContent>

        <CardFooter className="justify-center px-8 pb-8">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/auth/sign-in"
              className="font-medium text-foreground hover:underline"
            >
              Sign in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
