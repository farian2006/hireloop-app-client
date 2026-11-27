"use client"

import { usePathname } from "next/navigation"
import { Footer } from "@/components/footer"

export const FooterWrapper = () => {
  const pathname = usePathname()

  if (pathname.startsWith("/dashboard")) return null

  return <Footer />
}
