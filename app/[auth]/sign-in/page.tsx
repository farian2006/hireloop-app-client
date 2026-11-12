"use client"

import { useState } from "react"

import Link from "next/link"
import Image from "next/image"
import { Mail, Lock, Eye, EyeOff } from "lucide-react"
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
import { authClient, signIn } from "@/lib/auth-client"
import { useRouter } from "next/navigation"

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    const { error } = await authClient.signIn.email({
      email,
      password,
      callbackURL: "/",
    })

    if (error) {
      toast.error("Sign In failed", {
        description: error.message ?? "Something went wrong. Please try again.",
      })
      return
    }
    toast.success("Sign In Successful", {
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
    <div className="mt-6 flex min-h-screen flex-col items-center justify-center bg-background px-4 py-10">
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
          <CardTitle className="text-3xl font-bold">Sign in</CardTitle>
          <CardDescription className="text-base">
            Welcome back to{" "}
            <span className="bg-gradient-to-r from-blue-600 via-sky-500 to-orange-500 bg-clip-text font-semibold text-transparent">
              HireLoop
            </span>
          </CardDescription>
        </CardHeader>

        <CardContent className="px-8">
          <form onSubmit={handleSubmit} className="space-y-5">
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
                  autoComplete="email"
                  required
                  className="h-12 pl-10 text-base"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-sm font-medium">
                  Password
                </Label>
                <Link
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
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

            <Button
              type="submit"
              className="h-12 w-full border-0 bg-gradient-to-r from-blue-600 via-sky-500 to-orange-500 text-base font-semibold text-white transition-opacity hover:opacity-90"
            >
              Sign in
            </Button>

            <p className="flex justify-center font-extrabold text-blue-500">
              Or
            </p>
            <div>
              <Button
                variant="outline"
                type="button"
                onClick={handleGoogleSignIn}
                className="w-full"
              >
                <FcGoogle className="size-5" />
                Continue with Google
              </Button>
            </div>
          </form>
        </CardContent>

        <CardFooter className="justify-center px-8 pb-8">
          <p className="text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link
              href="/auth/sign-up"
              className="font-medium text-foreground hover:underline"
            >
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
