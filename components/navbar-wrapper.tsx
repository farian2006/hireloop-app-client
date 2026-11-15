"use client"
import { usePathname } from "next/navigation"
import { Navbar } from "@/components/navbar"

export function NavbarWrapper() {
  const pathname = usePathname()

  // Hide the navbar on dashboard routes so it doesn't collide with the sidebar
  if (pathname?.startsWith("/dashboard")) {
    return null
  }

  return <Navbar />
}
