import Image from "next/image"
import Link from "next/link"

import { CircleLetterC } from "lucide-react"

export function Footer() {
  const productLinks = [
    { label: "Job discovery", href: "#" },
    { label: "Worker AI", href: "#" },
    { label: "Companies", href: "#" },
    { label: "Salary data", href: "#" },
  ]

  const navigationLinks = [
    { label: "Help center", href: "#" },
    { label: "Career library", href: "#" },
    { label: "Contact", href: "#" },
  ]

  const resourceLinks = [
    { label: "Brand Guideline", href: "#" },
    { label: "Newsroom", href: "#" },
  ]

  return (
    <footer className="border-t border-border bg-background">
      <section className="relative overflow-hidden px-4 py-20 lg:py-32">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#050508] to-[#000000]" />
          <div
            className="absolute -top-[20%] left-1/2 h-[80vw] max-h-[600px] w-[120vw] max-w-[1200px] -translate-x-1/2 bg-[url('/assests/globe.png')] bg-cover bg-center opacity-40 blur-[40px]"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.15),transparent_70%)]" />
        </div>

        <div className="relative z-10 mx-auto max-w-5xl text-center">
          <h1 className="mb-6 text-5xl font-bold tracking-tight text-foreground md:text-7xl">
            Your next role is already looking for you
          </h1>

          <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            Build a profile in three minutes. The matches start arriving
            tomorrow morning.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button className="min-w-[180px] rounded-xl bg-white px-8 py-3 text-sm font-medium text-black transition-colors hover:bg-gray-100">
              Create a free account
            </button>
            <button className="min-w-[150px] rounded-xl bg-gray-900 px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-800">
              View pricing
            </button>
          </div>
        </div>
      </section>

      <div className="px-4 py-12 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-4 lg:gap-16">
          <div className="lg:col-span-1">
            <div className="mb-6 flex items-center gap-2">
              <Image
                src="/assests/logo.png"
                alt="Logo of hireloop"
                width={32}
                height={32}
                className="h-8 w-auto"
              />
            </div>
            <p className="mb-8 max-w-xs text-sm leading-relaxed text-muted-foreground">
              The AI-native career platform. Built for people who take their
              work seriously.
            </p>

            <div className="flex gap-3">
              <Link
                href=""
                className="flex h-8 w-8 items-center justify-center rounded bg-gray-900 text-xs text-white transition-colors hover:bg-gray-800"
              >
                <Image
                  src="/assests/socials/facebook.png"
                  alt="Linkdin Logo"
                  width={34}
                  height={34}
                />
              </Link>
              <Link
                href="#"
                className="flex h-8 w-8 items-center justify-center rounded bg-gray-900 text-xs text-purple-400 transition-colors hover:bg-gray-800"
              >
                <Image
                  src="/assests/socials/pinterest.png"
                  alt="Pinterest Logo"
                  width={34}
                  height={34}
                />
              </Link>
              <Link
                href="#"
                className="flex h-8 w-8 items-center justify-center rounded bg-gray-900 text-xs text-white transition-colors hover:bg-gray-800"
              >
                <Image
                  src="/assests/socials/linkedin.png"
                  alt="LinkedIn Logo"
                  height={34}
                  width={34}
                />
              </Link>
            </div>
          </div>

          <div className="lg:pl-4">
            <h3 className="mb-6 text-sm font-medium tracking-wider text-purple-400 uppercase">
              Product
            </h3>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:pl-4">
            <h3 className="mb-6 text-sm font-medium tracking-wider text-purple-400 uppercase">
              Navigations
            </h3>
            <ul className="space-y-3">
              {navigationLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:pl-4">
            <h3 className="mb-6 text-sm font-medium tracking-wider text-purple-400 uppercase">
              Resources
            </h3>
            <ul className="space-y-3">
              {resourceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-xs text-muted-foreground md:flex-row">
          <div className="flex items-center justify-center gap-2">
            <CircleLetterC className="h-15" />
            <p>Copyright 2026 — HireLoop</p>
          </div>
          <div className="flex items-center gap-6">
            <Link href="#" className="transition-colors hover:text-foreground">
              Terms & Policy
            </Link>
            <a href="#" className="transition-colors hover:text-foreground">
              Privacy Guideline
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
