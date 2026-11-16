"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import {
  Briefcase,
  Building2,
  Calculator,
  Code,
  Ellipsis,
  FolderOpen,
  Headphones,
  LayoutList,
  type LucideIcon,
  Megaphone,
  Palette,
  Pencil,
  Plus,
  Settings,
  Target,
  Trash2,
  TrendingUp,
  Users,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import type { RawJob } from "@/lib/api/jobs"

type JobType = "full-time" | "part-time" | "contract" | "internship"

type JobPost = {
  id: string
  jobTitle: string
  jobCategory: string
  companyName: string
  jobLocation: string
  remoteAllowed: boolean
  jobType: string
  minSalary: string
  maxSalary: string
  frequency: string
  applicationDeadline: string
  applicants: number
  postedDaysAgo: number
}

const jobTypes: Record<JobType, string> = {
  "full-time": "Full-time",
  "part-time": "Part-time",
  contract: "Contract",
  internship: "Internship",
}

const categoryStyles: Record<
  string,
  { label: string; icon: LucideIcon; className: string }
> = {
  "engineering-tech": {
    label: "Engineering",
    icon: Code,
    className: "bg-[#5b4cf5]/15 text-[#8f86ff]",
  },
  design: {
    label: "Design",
    icon: Palette,
    className: "bg-orange-500/15 text-orange-400",
  },
  marketing: {
    label: "Marketing",
    icon: Megaphone,
    className: "bg-pink-500/15 text-pink-400",
  },
  sales: {
    label: "Sales",
    icon: TrendingUp,
    className: "bg-emerald-500/15 text-emerald-400",
  },
  product: {
    label: "Product",
    icon: Target,
    className: "bg-violet-500/15 text-violet-400",
  },
  operations: {
    label: "Operations",
    icon: Settings,
    className: "bg-sky-500/15 text-sky-400",
  },
  "customer-success": {
    label: "Customer Success",
    icon: Headphones,
    className: "bg-amber-500/15 text-amber-400",
  },
  hr: {
    label: "Human Resources",
    icon: Users,
    className: "bg-rose-500/15 text-rose-400",
  },
  finance: {
    label: "Finance",
    icon: Calculator,
    className: "bg-teal-500/15 text-teal-400",
  },
  other: {
    label: "Other",
    icon: Briefcase,
    className: "bg-muted text-muted-foreground",
  },
}

const DAY_MS = 86_400_000

const parseDate = (value: string) => {
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? null : date
}

const mapApiJob = (doc: RawJob): JobPost => {
  const createdAtMs = doc._id
    ? parseInt(doc._id.slice(0, 8), 16) * 1000
    : Number.NaN
  const postedDaysAgo = Number.isNaN(createdAtMs)
    ? 0
    : Math.max(0, Math.floor((Date.now() - createdAtMs) / DAY_MS))

  return {
    id: doc._id,
    jobTitle: doc.jobTitle?.trim() || "Untitled role",
    jobCategory: doc.jobCategory ?? "other",
    companyName: doc.companyName?.trim() || "—",
    jobLocation: doc.jobLocation?.trim() || "—",
    remoteAllowed: Boolean(doc.remoteAllowed),
    jobType: doc.jobType ?? "",
    minSalary: doc.minSalary ?? "",
    maxSalary: doc.maxSalary ?? "",
    frequency: doc.frequency ?? "",
    applicationDeadline: doc.applicationDeadline ?? "",
    applicants: doc.applicants ?? 0,
    postedDaysAgo: doc.postedDaysAgo ?? postedDaysAgo,
  }
}

const formatCompensation = (job: JobPost) => {
  const { minSalary, maxSalary, frequency } = job
  const min = Number(minSalary)
  const max = Number(maxSalary)
  if (!min && !max) return "—"

  const unit =
    frequency === "year"
      ? { div: 1000, suffix: "k", per: "/ yr" }
      : frequency === "month"
        ? { div: 1000, suffix: "k", per: "/ mo" }
        : { div: 1, suffix: "", per: "/ hr" }

  const format = (value: number) =>
    `$${Math.round(value / unit.div)}${unit.suffix}`
  return `${format(min)} – ${format(max)} ${unit.per}`
}

const isExpired = (job: JobPost) => {
  const deadline = parseDate(job.applicationDeadline)
  return deadline !== null && deadline < new Date()
}

const formatDeadline = (deadline: string) => {
  const date = parseDate(deadline)
  if (!date) return "—"
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

type ManageJobsTableProps = {
  jobs: RawJob[]
  loadError: string | null
}

const ManageJobsTable = ({ jobs, loadError }: ManageJobsTableProps) => {
  const jobPosts = jobs.map(mapApiJob)

  return (
    <div className="flex min-h-screen w-full min-w-0 flex-col bg-background">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-8 md:py-10">
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-xs text-muted-foreground"
        >
          <span className="flex items-center gap-1.5">
            <FolderOpen className="size-3.5" />
            Manage Jobs
          </span>
          <span aria-hidden="true">›</span>
          <span className="flex items-center gap-1.5">
            <LayoutList className="size-3.5" />
            Job Listings &amp; Postings
          </span>
        </nav>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-medium tracking-tight text-foreground sm:text-3xl">
              Manage Job Posts
            </h1>
            <p className="text-sm text-muted-foreground">
              Review live listings, monitor applicants, and update job details
              across your organization.
            </p>
          </div>
          <Link
            href="/dashboard/recruiter/jobs/new"
            className={cn(
              buttonVariants(),
              "w-full shrink-0 gap-2 rounded-xl bg-[#5b4cf5] px-5 text-white shadow-lg shadow-indigo-500/40 hover:bg-[#4f40e6] hover:shadow-indigo-500/60 sm:w-auto"
            )}
          >
            <Plus className="size-4" />
            New Job Post
          </Link>
        </div>

        {loadError && (
          <div
            role="alert"
            className="rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive"
          >
            Failed to load job posts: {loadError}
          </div>
        )}

        <div className="min-w-0 overflow-hidden rounded-xl border border-border bg-card dark:border-input/50">
          <Table className="min-w-[960px]">
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent dark:border-input/50">
                <TableHead className="h-11 px-5 text-[0.7rem] font-medium tracking-wider text-muted-foreground uppercase">
                  Job Title &amp; Dept
                </TableHead>
                <TableHead className="text-[0.7rem] font-medium tracking-wider text-muted-foreground uppercase">
                  Company &amp; Location
                </TableHead>
                <TableHead className="text-[0.7rem] font-medium tracking-wider text-muted-foreground uppercase">
                  Type
                </TableHead>
                <TableHead className="text-[0.7rem] font-medium tracking-wider text-muted-foreground uppercase">
                  Compensation
                </TableHead>
                <TableHead className="text-[0.7rem] font-medium tracking-wider text-muted-foreground uppercase">
                  Applicants
                </TableHead>
                <TableHead className="text-[0.7rem] font-medium tracking-wider text-muted-foreground uppercase">
                  Status
                </TableHead>
                <TableHead className="text-[0.7rem] font-medium tracking-wider text-muted-foreground uppercase">
                  Deadline
                </TableHead>
                <TableHead className="px-5 text-right text-[0.7rem] font-medium tracking-wider text-muted-foreground uppercase">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {jobPosts.length === 0 && !loadError && (
                <TableRow className="border-border hover:bg-transparent dark:border-input/50">
                  <TableCell
                    colSpan={8}
                    className="h-32 px-5 text-center text-sm text-muted-foreground"
                  >
                    No job posts yet. Publish your first job to see it listed
                    here.
                  </TableCell>
                </TableRow>
              )}
              {jobPosts.map((job) => {
                const category =
                  categoryStyles[job.jobCategory] ?? categoryStyles.other
                const CategoryIcon = category.icon
                const expired = isExpired(job)

                return (
                  <TableRow
                    key={job.id}
                    className="border-border dark:border-input/50"
                  >
                    <TableCell className="px-5">
                      <div className="flex items-center gap-3">
                        <span
                          className={cn(
                            "flex size-8 shrink-0 items-center justify-center rounded-lg",
                            category.className
                          )}
                        >
                          <CategoryIcon className="size-4" />
                        </span>
                        <div className="flex min-w-0 flex-col gap-0.5">
                          <span className="truncate text-sm font-medium text-foreground">
                            {job.jobTitle}
                          </span>
                          <span className="w-fit rounded border border-border px-1.5 py-px text-[0.65rem] text-muted-foreground dark:border-input/50">
                            {category.label}
                          </span>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="flex flex-col gap-0.5">
                        <span className="flex items-center gap-1.5 text-sm font-medium text-foreground">
                          <Building2 className="size-3.5 text-muted-foreground" />
                          {job.companyName}
                        </span>
                        <span className="pl-5 text-xs text-muted-foreground">
                          {job.jobLocation} (
                          {job.remoteAllowed ? "Remote" : "Onsite"})
                        </span>
                      </div>
                    </TableCell>

                    <TableCell>
                      <Badge
                        variant="outline"
                        className="rounded-md border-border px-2 py-0.5 text-xs font-normal text-muted-foreground dark:border-input/50"
                      >
                        {(job.jobType && jobTypes[job.jobType as JobType]) ||
                          "—"}
                      </Badge>
                    </TableCell>

                    <TableCell className="text-sm whitespace-nowrap text-foreground">
                      {formatCompensation(job)}
                    </TableCell>

                    <TableCell>
                      <span className="flex items-center gap-1.5 text-sm whitespace-nowrap text-foreground">
                        <Users className="size-4 text-muted-foreground" />
                        {job.applicants} Candidates
                      </span>
                    </TableCell>

                    <TableCell>
                      <Badge
                        className={cn(
                          "gap-1 rounded-md px-2 py-0.5 text-xs font-medium",
                          expired
                            ? "bg-muted text-muted-foreground"
                            : "bg-emerald-500/15 text-emerald-400"
                        )}
                      >
                        <span
                          className={cn(
                            "size-1.5 rounded-full",
                            expired ? "bg-muted-foreground" : "bg-emerald-400"
                          )}
                        />
                        {expired ? "Expired" : "Active"}
                      </Badge>
                    </TableCell>

                    <TableCell>
                      <div className="flex flex-col gap-0.5 whitespace-nowrap">
                        <span className="text-sm text-foreground">
                          {formatDeadline(job.applicationDeadline)}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {job.postedDaysAgo > 0
                            ? `Posted ${job.postedDaysAgo}d ago`
                            : "Posted today"}
                        </span>
                      </div>
                    </TableCell>

                    <TableCell className="px-5">
                      <div className="flex items-center justify-end gap-1.5">
                        <Button
                          variant="outline"
                          size="sm"
                          className="gap-1.5 rounded-lg border-[#5b4cf5]/50 bg-transparent px-3 text-xs font-medium text-[#8f86ff] hover:bg-[#5b4cf5]/10 hover:text-[#8f86ff] dark:border-[#5b4cf5]/50 dark:hover:bg-[#5b4cf5]/15"
                        >
                          <Pencil className="size-3.5" />
                          Update
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          aria-label={`Delete ${job.jobTitle}`}
                          className="text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 className="size-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger
                            render={
                              <Button
                                variant="ghost"
                                size="icon-sm"
                                aria-label={`More actions for ${job.jobTitle}`}
                                className="text-muted-foreground"
                              />
                            }
                          >
                            <Ellipsis className="size-4" />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-44">
                            <DropdownMenuGroup>
                              <DropdownMenuLabel>Job Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                View Applicants
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                Duplicate Post
                              </DropdownMenuItem>
                              <DropdownMenuItem>Share Link</DropdownMenuItem>
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem variant="destructive">
                              Close Listing
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}

export default ManageJobsTable
