"use client"

import {
  Bookmark,
  Building2,
  ChartLine,
  FileText,
  Hexagon,
  Search,
  TrendingUp,
  Zap,
} from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"

export function Features() {
  const featureItems = [
    {
      title: "Smart Search",
      description: "Find your ideal job with advanced filters.",
      icon: <Search className="h-5 w-5" />,
    },
    {
      title: "Salary Insights",
      description: "Get real salary data to negotiate confidently.",
      icon: <ChartLine className="h-5 w-5" />,
    },
    {
      title: "Top Companies",
      description: "Apply to vetted companies that are hiring.",
      icon: <Building2 className="h-5 w-5" />,
    },
    {
      title: "Saved Jobs",
      description: "Manage apps & favorites on your dashboard.",
      icon: <Bookmark className="h-5 w-5" />,
    },
    {
      title: "One-Click Apply",
      description: "Simplify your job applications for an easier process!",
      icon: <Zap className="h-5 w-5" />,
    },
    {
      title: "Resume Builder",
      description: "Create professional resumes with modern templates.",
      icon: <FileText className="h-5 w-5" />,
    },
    {
      title: "Skill-Based Matching",
      description: "Discover jobs that match your skills and experience.",
      icon: <Hexagon className="h-5 w-5" />,
    },
    {
      title: "Career Growth Resources",
      description: "Boost your career with quick interview tips.",
      icon: <TrendingUp className="h-5 w-5" />,
    },
  ]

  return (
    <section className="relative overflow-hidden bg-background py-20">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a] via-[#020617] to-[#000000]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_70%,rgba(99,102,241,0.1),transparent_60%)]" />
        <div className="absolute -bottom-[40%] left-1/2 h-[80%] w-[120%] -translate-x-1/2 rounded-full bg-[#6366f1]/10 blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-center gap-1.5 px-3 py-1 backdrop-blur-sm">
          <span className="h-[4px] w-[4px] rounded-full bg-purple-400" />
          <span className="text-xs font-medium tracking-wider text-purple-300 uppercase">
            features
          </span>
          <span className="text-xs font-medium tracking-wider text-purple-300 uppercase">
            job
          </span>
          <span className="h-[4px] w-[4px] rounded-full bg-purple-400" />
        </div>

        <h2 className="mt-6 mb-12 text-center text-4xl tracking-tight text-foreground md:text-5xl lg:text-6xl">
          Everything you need to succeed
        </h2>

        <div className="grid w-full grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          {featureItems.map((feature) => (
            <Card
              key={feature.title}
              className={cn(
                "border border-white/5 bg-background/50 backdrop-blur-sm transition-all hover:border-white/10 hover:bg-background/60"
              )}
            >
              <CardHeader className="flex flex-row items-center gap-3 pb-2">
                <div className="rounded-lg bg-purple-500/10 p-2 text-purple-400">
                  {feature.icon}
                </div>
                <CardTitle className="leading-none">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
