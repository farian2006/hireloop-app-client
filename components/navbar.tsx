"use client"

import Image from "next/image"
import { useState } from "react"
import { Menu, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import Link from "next/link"

const navLinks = [
  { label: "Browse Jobs", href: "/jobs" },
  { label: "Company", href: "/company" },
  { label: "Pricing", href: "/pricing" },
]

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto flex max-w-7xl">
        <nav className="sticky top-0 z-50 mt-3 w-full rounded-3xl border-b border-border bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex h-16 items-center justify-between px-4 lg:px-8">
            <Link href="/">
              <div className="flex items-center gap-2">
                <Image
                  src="/assests/logo.png"
                  alt="hireloop"
                  width={32}
                  height={32}
                  className="h-8 w-auto"
                />
              </div>
            </Link>

            <div className="hidden items-center gap-8 lg:flex">
              <div className="flex items-center gap-6 text-sm font-medium text-muted-foreground">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
              <div className="h-4 w-px bg-border"></div>
              <div className="flex items-center gap-4">
                <Link
                  href="#"
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  Sign In
                </Link>
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-sm transition-all hover:from-blue-700 hover:to-purple-700">
                  Get Started
                </Button>
              </div>
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileOpen((prev) => !prev)}
              className="text-foreground lg:hidden"
              aria-label="Open menu"
            >
              {mobileOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>

          {mobileOpen && (
            <div className="border-t border-border bg-background lg:hidden">
              <div className="space-y-4 px-4 py-4">
                <div className="flex flex-col gap-3">
                  {navLinks.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
                <div className="h-px bg-border"></div>
                <div className="flex flex-col gap-3">
                  <Link
                    href="#"
                    onClick={() => setMobileOpen(false)}
                    className="rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Sign In
                  </Link>
                  <Button
                    className="mx-4 w-auto bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-sm hover:from-blue-700 hover:to-purple-700"
                    onClick={() => setMobileOpen(false)}
                  >
                    Get Started
                  </Button>
                </div>
              </div>
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}
