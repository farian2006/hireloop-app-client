"use client"

import {
  ArrowRight,
  Building2,
  Flame,
  GraduationCap,
  MapPin,
  Search,
  Target,
} from "lucide-react"

export function Banner() {
  const statItems = [
    {
      value: "50K",
      label: "Active Jobs",
      icon: <Target className="h-5 w-5" />,
    },
    {
      value: "12K",
      label: "Companies",
      icon: <Building2 className="h-5 w-5" />,
    },
    {
      value: "2M",
      label: "Job Seekers",
      icon: <GraduationCap className="h-5 w-5" />,
    },
    {
      value: "97%",
      label: "Satisfaction Rate",
      icon: <ArrowRight className="h-5 w-5" />,
    },
  ]

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a] via-[#020617] to-[#000000]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_70%,rgba(99,102,241,0.15),transparent_60%)]" />
        <div className="absolute -bottom-[40%] left-1/2 h-[80%] w-[120%] -translate-x-1/2 rounded-full bg-[#6366f1]/10 blur-[120px]" />
        <div
          className="absolute top-0 left-0 h-full w-full bg-[url('/assests/globe.png')] [mask-image:linear-gradient(to_bottom,rgba(0,0,0,1)_,rgba(0,0,0,0)_60%,rgba(0,0,0,1)_100%)] bg-cover bg-center"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-[#000000/60] to-transparent" />
      </div>

      <div className="relative z-10 flex min-h-[70vh] flex-col items-center justify-center px-4 pt-24 text-center">
        <div className="mt-8 mb-8 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 backdrop-blur-sm">
          <Flame className="h-3.5 w-3.5 text-orange-500" />
          <span className="text-xs font-medium text-purple-300">50,000+</span>
          <span className="text-xs font-medium text-muted-foreground">
            NEW JOBS THIS MONTH
          </span>
        </div>

        <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground md:text-6xl">
          Find Your Dream Job Today
        </h1>

        <p className="mb-10 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
          HireLoop connects top talent with world-class companies. Browse
          thousands of career opportunities and find your next role — faster.
        </p>
        <div className="mb-10 flex w-full max-w-3xl flex-col gap-3 md:flex-row">
          <div className="relative flex-1">
            <Search className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Job title, skill or company"
              className="h-12 w-full rounded-xl border border-border bg-background/50 pr-4 pl-10 text-foreground transition-all placeholder:text-muted-foreground focus:ring-2 focus:ring-purple-500/50 focus:outline-none"
            />
          </div>
          <div className="relative flex-1 md:w-72">
            <MapPin className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Location or Remote"
              className="h-12 w-full rounded-xl border border-border bg-background/50 pr-4 pl-10 text-foreground transition-all placeholder:text-muted-foreground focus:ring-2 focus:ring-purple-500/50 focus:outline-none"
            />
          </div>
          <button className="flex h-12 items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-8 font-medium text-white shadow-lg shadow-purple-500/20 transition-all hover:from-blue-700 hover:to-purple-700 md:min-w-[140px]">
            Search
            <Search className="h-4 w-4" />
          </button>
        </div>

        <div className="mb-16 flex flex-wrap justify-center gap-2">
          {[
            "Trending Position",
            "Product Designer",
            "AI Engineering",
            "DevOps Engineer",
          ].map((chip) => (
            <button
              key={chip}
              className="rounded-full border border-border bg-background/50 px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-background hover:text-foreground"
            >
              {chip}
            </button>
          ))}
        </div>

        <div className="mb-10 text-lg font-medium text-gray-400">
          Assisting over <span className="text-white">15,000 job seekers</span>{" "}
          find their dream positions.
        </div>

        <div className="grid w-full max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {statItems.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-white/5 bg-background/50 p-5 backdrop-blur-sm"
            >
              <div className="mb-2 flex items-center gap-3">
                <div className="rounded-lg bg-purple-500/10 p-2 text-purple-400">
                  {stat.icon}
                </div>
                <span className="text-xs tracking-wider text-muted-foreground uppercase">
                  {stat.label}
                </span>
              </div>
              <div className="text-2xl font-bold text-foreground">
                {stat.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
