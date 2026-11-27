"use client"

import { use, useEffect, useState } from "react"
import { getJobById } from "@/lib/api/jobs"
import type { RawJob } from "@/lib/types/jobs"
import type { JobApplication } from "@/lib/types/applications"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { categoryStyles } from "@/lib/constants/jobs"
import { IoCheckmarkCircle, IoLocationOutline } from "react-icons/io5"
import { CiBookmark } from "react-icons/ci"
import { MdAttachMoney } from "react-icons/md"
import { FaRegClock } from "react-icons/fa"
import Image from "next/image"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { useSession } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import { applyToAJob } from "@/lib/actions/applications"
import { toast } from "sonner"

const noop = () => {}

export default function JobDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const [job, setJob] = useState<RawJob | null>(null)
  const [loading, setLoading] = useState(true)

  const { data: session } = useSession()
  const user = session?.user
  const router = useRouter()
  const handleApplyNow = async () => {
    if (!user) {
      router.push(`/auth/sign-in?redirectTo=/browse-jobs/${job?._id}`)
      return
    } else if (user.role === "seeker") {
      const application: JobApplication = {
        jobId: job?._id ?? "",
        userId: user.id,
        email: user.email,
        jobTitle: job?.jobTitle ?? "",
        companyName: job?.companyName ?? "",
      }

      try {
        const result = await applyToAJob(application)
        if (result.insertedId) {
          toast.success("Apply Successful", {
            description: "",
          })
          router.push("/browse-jobs")
        }
      } catch (error) {
        console.error(error)
        toast.error("Apply Failed", {
          description: "Something went wrong. Please try again.",
        })
      }
    } else {
      toast.error("Only Job Seeker Can Apply", {
        description: "",
      })
    }
  }

  useEffect(() => {
    let mounted = true
    setLoading(true)

    getJobById(id)
      .then((job) => {
        if (mounted) setJob(job ?? null)
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
      <div className="min-h-screen bg-zinc-950 py-12 pt-28">
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
        <div className="mt-20 mb-10 flex flex-col justify-between gap-6 border-b border-zinc-800 pb-6 lg:flex-row">
          <div>
            <div className="flex items-center-safe gap-4">
              <Avatar className="mb-4 h-12 w-12">
                <AvatarImage src={job.companyName || undefined} />
                <AvatarFallback>
                  {job.companyName?.charAt(0) || "C"}
                </AvatarFallback>
              </Avatar>
              <h1 className="mb-1 text-4xl font-semibold text-foreground">
                {job.jobTitle}
              </h1>
            </div>
            <div className="flex gap-4">
              <p className="text-2xl text-zinc-400">{job.companyName}</p>
              <p className="flex items-center gap-1.5 text-green-400">
                <IoCheckmarkCircle />
                Verified Employer
              </p>
            </div>
          </div>
          <div className="flex w-full items-center gap-3 lg:w-auto">
            <button
              type="button"
              onClick={noop}
              aria-label="Bookmark job"
              className="shrink-0 rounded-md p-2 transition-colors hover:bg-zinc-800"
            >
              <CiBookmark className="h-6 w-6" />
            </button>
            <Button
              type="button"
              size="sm"
              className="flex cursor-pointer rounded-lg border-2 border-white bg-white px-4 font-semibold text-zinc-900 transition-colors hover:border-blue-900 hover:bg-blue-950 hover:text-white lg:flex-none"
              onClick={handleApplyNow}
            >
              Apply Now
            </Button>
          </div>
        </div>
        <div className="mb-10 grid grid-cols-1 gap-4 md:grid-cols-4">
          <Card className="border border-zinc-800 bg-zinc-900/50 p-4">
            <CardHeader className="pb-1">
              <CardTitle className="flex flex-col items-start gap-2 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                <MdAttachMoney className="h-5 w-5" />
                Salary Range
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-lg font-medium text-foreground">{salary}</p>
            </CardContent>
          </Card>

          <Card className="border border-zinc-800 bg-zinc-900/50 p-4">
            <CardHeader className="pb-1">
              <CardTitle className="flex flex-col items-start gap-2 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                <IoLocationOutline className="h-5 w-5" />
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
              <CardTitle className="flex flex-col items-start gap-2 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                <FaRegClock className="h-5 w-5" />
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
          <aside className="space-y-6 lg:col-span-4">
            <Card className="border border-zinc-800 bg-zinc-900/50 p-6">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-semibold text-foreground">
                  Company Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-5 pt-0">
                <div className="overflow-hidden rounded-xl border border-zinc-800">
                  <Image
                    src="/assests/office.png"
                    alt={`${job.companyName} office`}
                    height={100}
                    width={100}
                    className="h-48 w-full object-cover"
                  />
                </div>

                <div className="divide-y divide-zinc-800">
                  <div className="flex flex-col gap-1 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                    <span className="shrink-0 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                      Industry
                    </span>
                    <p className="text-base font-medium break-words text-foreground sm:text-right">
                      {category}
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="w-full cursor-pointer border-zinc-800 bg-zinc-900 text-zinc-200 hover:bg-zinc-800"
                >
                  Visit Website
                </Button>
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
    </div>
  )
}
