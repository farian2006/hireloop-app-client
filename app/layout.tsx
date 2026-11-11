import { Geist, Geist_Mono, Manrope } from "next/font/google"

import "./globals.css"
import { Navbar } from "@/components/navbar"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import { Footer } from "@/components/footer"
import { Toaster } from "@/components/ui/toast"

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        geist.variable,
        manrope.variable,
        "font-sans"
      )}
    >
      <body>
        <ThemeProvider>
          <Navbar />
          {children}
          <Footer/>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
