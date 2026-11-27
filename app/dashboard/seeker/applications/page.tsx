"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { MdDownload } from "react-icons/md"
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai"

export type ApplicationStatus = "Applied" | "Review" | "Shortlisted" | "Rejected" | "Offered"

export interface ApplicationRow {
  id: string
  jobTitle: string
  jobType: string
  location: string
  company: string
  applied: string
  status: ApplicationStatus
}

type BadgeVariant = "default" | "secondary" | "destructive" | "outline" | "ghost" | "link"

const STATUS_CONFIG: Record<ApplicationStatus, { label: string; variant: BadgeVariant }> = {
  Applied: { label: "Applied", variant: "default" },
  Review: { label: "Review", variant: "default" },
  Shortlisted: { label: "Shortlisted", variant: "default" },
  Rejected: { label: "Rejected", variant: "destructive" },
  Offered: { label: "Offered", variant: "default" },
}

const DUMMY_APPLICATIONS: ApplicationRow[] = [
  {
    id: "1",
    jobTitle: "Senior Frontend Engineer",
    jobType: "Full-time • Remote",
    location: "Remote",
    company: "Stark Industries",
    applied: "2 hours ago",
    status: "Applied",
  },
  {
    id: "2",
    jobTitle: "Product Designer",
    jobType: "Contract • Hybrid",
    location: "Hybrid",
    company: "Cyberdyne Systems",
    applied: "1 day ago",
    status: "Review",
  },
  {
    id: "3",
    jobTitle: "Lead Data Scientist",
    jobType: "Full-time • On-site",
    location: "New York, NY",
    company: "Wayne Enterprises",
    applied: "4 days ago",
    status: "Shortlisted",
  },
  {
    id: "4",
    jobTitle: "Cloud Architect",
    jobType: "Full-time • Remote",
    location: "Remote",
    company: "Oscorp Tech",
    applied: "1 week ago",
    status: "Rejected",
  },
  {
    id: "5",
    jobTitle: "AI Research Engineer",
    jobType: "Full-time • Hybrid",
    location: "Hybrid",
    company: "Hooli Corp",
    applied: "2 weeks ago",
    status: "Offered",
  },
]

const STATUS_COLOR: Record<ApplicationStatus, string> = {
  Applied: "bg-zinc-800 text-zinc-200 border-zinc-800",
  Review: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  Shortlisted: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  Rejected: "bg-rose-500/10 text-rose-400 border-rose-500/20",
  Offered: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
}

export default function ApplicationsPage() {
  const [activeTab, setActiveTab] = useState<"Active" | "Archived">("Active")
  const [currentPage, setCurrentPage] = useState(1)
  const perPage = 5
  const total = 24
  const totalPages = Math.ceil(total / perPage)

  const paginated = DUMMY_APPLICATIONS.slice(0, perPage)

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-200 py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-xl font-semibold text-foreground">
              My Applications
            </h1>
            <p className="text-sm text-muted-foreground">
              Track your job applications and interview progress in real-time.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex items-center gap-1 rounded-md border border-zinc-800 bg-zinc-900 px-1 py-0.5">
              <Button
                variant={activeTab === "Active" ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveTab("Active")}
                className="rounded-md text-sm font-medium transition-colors"
              >
                Active
              </Button>
              <Button
                variant={activeTab === "Archived" ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveTab("Archived")}
                className="rounded-md text-sm font-medium transition-colors"
              >
                Archived
              </Button>
            </div>
            <Button variant="outline" className="text-sm rounded-md">
              <MdDownload className="mr-2 h-4 w-4" /> Export PDF
            </Button>
          </div>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card className="border border-zinc-800 bg-zinc-900/50 p-4">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Applied
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">24</div>
              <CardDescription className="text-xs text-muted-foreground">
                Applications submitted
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border border-zinc-800 bg-zinc-900/50 p-4">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Shortlisted
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-400">8</div>
              <CardDescription className="text-xs text-muted-foreground">
                Moved to next round
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border border-zinc-800 bg-zinc-900/50 p-4">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Interviews
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-400">3</div>
              <CardDescription className="text-xs text-muted-foreground">
                Scheduled interviews
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border border-zinc-800 bg-zinc-900/50 p-4">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Success Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-emerald-400">12%</div>
              <CardDescription className="text-xs text-muted-foreground">
                Offer rate
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* Applications table */}
        <Card className="border border-zinc-800 bg-zinc-900/50 overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="text-xs text-zinc-500 uppercase">
                  <TableHead className="w-1/3 px-4 py-3 font-medium text-left">
                    Job Title
                  </TableHead>
                  <TableHead className="px-4 py-3 font-medium text-left">
                    Company
                  </TableHead>
                  <TableHead className="px-4 py-3 font-medium text-left">
                    Applied
                  </TableHead>
                  <TableHead className="px-4 py-3 font-medium text-left">
                    Status
                  </TableHead>
                  <TableHead className="px-4 py-3 font-medium text-left text-right">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginated.map((app) => (
                  <TableRow key={app.id} className="hover:bg-zinc-800/30">
                    <TableCell className="px-4 py-3 font-medium text-foreground">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded bg-zinc-800 flex items-center justify-center text-zinc-400 text-xs font-medium">
                          {app.jobTitle.charAt(0)}
                        </div>
                        <div>
                          <div>{app.jobTitle}</div>
                          <div className="text-xs text-zinc-500">{app.jobType}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="px-4 py-3 text-zinc-200">
                      {app.company}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-zinc-400">
                      {app.applied}
                    </TableCell>
                    <TableCell className="px-4 py-3">
                      <Badge
                        variant={STATUS_CONFIG[app.status].variant}
                        className={`px-2.5 py-1 text-xs ${STATUS_COLOR[app.status]}`}
                      >
                        {STATUS_CONFIG[app.status].label}
                      </Badge>
                    </TableCell>
                    <TableCell className="px-4 py-3 text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-xs text-zinc-400 hover:text-zinc-200 border-zinc-800 hover:border-zinc-600"
                      >
                        Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>

        {/* Pagination */}
        <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <p className="text-sm text-zinc-500">
            Showing {1}-{paginated.length} of {total} applications
          </p>
          <div className="flex items-center gap-1 rounded-md border border-zinc-800 bg-zinc-900/50 p-0.5">
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="rounded-md text-zinc-400 hover:text-zinc-200 disabled:opacity-50"
            >
              <AiOutlineArrowLeft className="h-4 w-4" />
            </Button>
            {[1, 2, 3].map((page) => (
              <Button
                key={page}
                size="sm"
                variant={currentPage === page ? "default" : "outline"}
                className={`rounded-md text-sm font-medium min-w-[2.5rem] ${
                  currentPage === page
                    ? "bg-white text-zinc-900"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </Button>
            ))}
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="rounded-md text-zinc-400 hover:text-zinc-200 disabled:opacity-50"
            >
              <AiOutlineArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
