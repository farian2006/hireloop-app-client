"use client"

import { useEffect, useState } from "react"
import { getJobs } from "@/lib/api/jobs"
import type { RawJob } from "@/lib/types/jobs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { categoryStyles } from "@/lib/constants/jobs"

const noop = () => {}

export default function JobDetailsPage({ params }: { params: { id: string } }) {
  const { id } = params
  const [job, setJob] = useState<RawJob | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    setLoading(true)

    getJobs()
      .then((jobs) => {
        if (mounted) setJob(jobs.find((j) => j._id === id) ?? null)
      })
      .catch(() => {
        if (mounted) setJob(null)
      })
      .finally(() => {
        if (mounted) setLoading(false)
      })

    return () => {
      mounted = false
    }
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 py-12">
        <div className="mx-auto max-w-7xl px-4">
          <div className="py-12 text-center text-muted-foreground">
            Loading job…
          </div>
        </div>
      </div>
    )
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-zinc-950 py-12">
        <div className="mx-auto max-w-7xl px-4">
          <div className="py-12 text-center text-muted-foreground">
            Job not found.
          </div>
        </div>
      </div>
    )
  }

  const match = Object.entries(categoryStyles).find(
    ([key]) => key === job.jobCategory
  )
  const category = match ? match[1].label : (job.jobCategory ?? "Other")
  const isRemote = job.remoteAllowed === true
  const salary =
    job.minSalary && job.maxSalary
      ? `$${job.minSalary} - $${job.maxSalary}${job.frequency ? ` / ${job.frequency}` : ""}`
      : "Competitive"

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-200">
      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Header */}
        <div className="mb-10 flex flex-col justify-between gap-6 border-b border-zinc-800 pb-6 lg:flex-row">
          <div>
            <h1 className="mb-1 text-2xl font-semibold text-foreground">
              {job.jobTitle}
            </h1>
            <p className="text-muted-foreground">{job.companyName}</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={noop}
              aria-label="Bookmark job"
              className="rounded-md p-2 transition-colors hover:bg-zinc-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-zinc-400"
              >
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
              </svg>
            </button>
            <Button
              type="button"
              onClick={noop}
              className="border-zinc-800 bg-zinc-900 text-zinc-200 hover:bg-zinc-800"
            >
              Apply Now
            </Button>
          </div>
        </div>

        {/* Info cards */}
        <div className="mb-10 grid grid-cols-1 gap-4 md:grid-cols-4">
          <Card className="border border-zinc-800 bg-zinc-900/50 p-4">
            <CardHeader className="pb-1">
              <CardTitle className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                Salary Range
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-lg font-medium text-foreground">{salary}</p>
            </CardContent>
          </Card>

          <Card className="border border-zinc-800 bg-zinc-900/50 p-4">
            <CardHeader className="pb-1">
              <CardTitle className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                Location
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-lg font-medium text-foreground">
                {job.jobLocation}
                {isRemote ? " (Remote)" : ""}
              </p>
            </CardContent>
          </Card>

          <Card className="border border-zinc-800 bg-zinc-900/50 p-4">
            <CardHeader className="pb-1">
              <CardTitle className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                Job Type
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <Badge variant="outline" className="text-sm capitalize">
                {job.jobType}
              </Badge>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Main content */}
          <div className="space-y-8 lg:col-span-8">
            <section>
              <h2 className="mb-3 text-lg font-semibold text-foreground">
                Job Description
              </h2>
              <p className="leading-relaxed text-zinc-400">
                {job.keyResponsibilities || "No description available."}
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-lg font-semibold text-foreground">
                Responsibilities
              </h2>
              <ul className="list-inside list-disc space-y-2 leading-relaxed text-zinc-400">
                {(job.keyResponsibilities || "")
                  .split(/[.\n]/)
                  .filter((line) => line.trim().length > 0)
                  .map((line) => (
                    <li key={line}>{line.trim()}</li>
                  ))}
              </ul>
            </section>

            <section>
              <h2 className="mb-3 text-lg font-semibold text-foreground">
                Requirements
              </h2>
              <ul className="list-inside list-disc space-y-2 leading-relaxed text-zinc-400">
                {(job.qualifications || "")
                  .split(/[.\n]/)
                  .filter((line) => line.trim().length > 0)
                  .map((line) => (
                    <li key={line}>{line.trim()}</li>
                  ))}
              </ul>
            </section>
          </div>

          {/* Company Overview */}
          <aside className="space-y-6 lg:col-span-4">
            <Card className="border border-zinc-800 bg-zinc-900/50 p-6">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-semibold text-foreground">
                  Company Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-0">
                <div className="flex items-baseline gap-2">
                  <span className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                    Industry
                  </span>
                  <p className="text-lg font-medium text-foreground">
                    {category}
                  </p>
                </div>
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
    </div>
  )
}
