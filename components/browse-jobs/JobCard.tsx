"use client"

import { Bookmark, DollarSign } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BsLightningCharge } from "react-icons/bs"
import { FaRegClock } from "react-icons/fa"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { RawJob } from "@/lib/types/jobs"
import { categoryStyles } from "@/lib/constants/jobs"
import { redirect } from "next/navigation"
import { useRouter } from "next/router"

export interface JobCardProps {
  job: RawJob
  onEasyApply?: () => void
  onBookmark?: () => void
}

export function JobCard({ job, onEasyApply, onBookmark }: JobCardProps) {
  const match = Object.entries(categoryStyles).find(
    ([key, style]) => key === job.jobCategory || style.label === job.jobCategory
  )
  const style = match ? match[1] : categoryStyles.other
  const Icon = style.icon

  const isRemote = job.remoteAllowed === true

  const router = useRouter();

  const handleViewJobDetail = (jobId:string) => {
    router.push(`/browse-jobs/${jobId}`)
  }

  return (
    <Card className="border border-border/50 transition-colors hover:border-border">
      <CardHeader className="flex flex-row items-center justify-between py-3">
        <div className="flex items-center gap-3">
          <div className="{style.className} flex h-8 w-8 items-center justify-center rounded-lg">
            <Icon className="h-4 w-4" />
          </div>
          <div className="leading-none">
            <CardTitle className="text-base leading-none font-medium">
              {job.jobTitle}
            </CardTitle>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              {job.companyName}
              <span className="mx-0.5 h-1 w-1 rounded-full bg-muted-foreground/30"></span>
              {job.jobLocation}
              {isRemote && <span className="mx-0.5">• (Remote)</span>}
            </div>
          </div>
        </div>
        <button
          type="button"
          onClick={onBookmark}
          className="rounded-md p-1.5 transition-colors hover:bg-muted"
          aria-label="Save job"
        >
          <Bookmark className="h-4 w-4 text-muted-foreground" />
        </button>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-sm">
            <DollarSign className="h-3 w-3 text-muted-foreground" />
            <span className="font-medium">
              {job.minSalary && job.maxSalary
                ? `$${job.minSalary} - $${job.maxSalary}`
                : "Competitive"}
            </span>
          </div>

          <Badge variant="outline" className="text-sm capitalize">
            <FaRegClock />
            {job.jobType}
          </Badge>

          <Button
            type="button"
            variant="outline"
            size="sm"
            className="cursor-pointer gap-2 rounded-lg border-2 border-emerald-800 bg-emerald-950/60 text-emerald-500 transition-colors hover:border-emerald-500 hover:bg-emerald-950 hover:text-emerald-400"
            onClick={onEasyApply}
          >
            <BsLightningCharge />
            Easy Apply
          </Button>

          <Button
            type="button"
            size="sm"
            className="ml-auto cursor-pointer rounded-lg border-2 border-white bg-white px-4 font-semibold text-zinc-900 transition-colors hover:border-blue-900 hover:bg-blue-950 hover:text-white"
            onClick={() => handleViewJobDetail(job._id)}
          >
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
