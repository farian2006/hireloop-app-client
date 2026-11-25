"use client"

import { Bookmark, DollarSign } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import type { RawJob } from "@/lib/types/jobs"
import { categoryStyles } from "@/lib/constants/jobs"

export interface JobCardProps {
  job: RawJob
  onEasyApply?: () => void
  onBookmark?: () => void
}

export function JobCard({ job, onEasyApply, onBookmark }: JobCardProps) {
  const match = Object.entries(categoryStyles).find(
    ([key, style]) =>
      key === job.jobCategory || style.label === job.jobCategory
  )
  const style = match ? match[1] : categoryStyles.other
  const Icon = style.icon

  const isRemote = job.remoteAllowed === true

  return (
    <Card className="border border-border/50 hover:border-border transition-colors">
      <CardHeader className="flex flex-row items-center justify-between py-3">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg {style.className}">
            <Icon className="h-4 w-4" />
          </div>
          <div className="leading-none">
            <CardTitle className="text-base font-medium leading-none">
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
          className="rounded-md p-1.5 hover:bg-muted transition-colors"
          aria-label="Save job"
        >
          <Bookmark className="h-4 w-4 text-muted-foreground" />
        </button>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm">
            <DollarSign className="h-3 w-3 text-muted-foreground" />
            <span className="font-medium">
              {job.minSalary && job.maxSalary
                ? `$${job.minSalary} - $${job.maxSalary}`
                : "Competitive"}
            </span>
          </div>
          <Badge variant="outline" className="text-xs capitalize">
            {job.jobType}
          </Badge>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          type="button"
          variant="default"
          size="sm"
          className="w-full bg-emerald-500 text-white hover:bg-emerald-600"
          onClick={onEasyApply}
        >
          Easy Apply
        </Button>
      </CardFooter>
    </Card>
  )
}
