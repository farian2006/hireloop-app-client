"use client"

import { useEffect, useState } from "react"
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
import { getApplications } from "@/lib/actions/applications"
import { useSession } from "@/lib/auth-client"
import type {
  ApplicationRow,
  ApplicationStatus,
} from "@/lib/types/applications"

type BadgeVariant =
  "default" | "secondary" | "destructive" | "outline" | "ghost" | "link"

const STATUS_CONFIG: Record<
  ApplicationStatus,
  { label: string; variant: BadgeVariant }
> = {
  Applied: { label: "Applied", variant: "default" },
  Review: { label: "Review", variant: "default" },
  Shortlisted: { label: "Shortlisted", variant: "default" },
  Rejected: { label: "Rejected", variant: "destructive" },
  Offered: { label: "Offered", variant: "default" },
}

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
  const [applications, setApplications] = useState<ApplicationRow[]>([])
  const [loading, setLoading] = useState(true)
  const perPage = 5

  const { data: session, isPending } = useSession()
  const user = session?.user

  useEffect(() => {
    if (isPending) return
    if (!user?.id) {
      setLoading(false)
      return
    }

    let mounted = true
    setLoading(true)

    getApplications(`userId=${user.id}`)
      .then((data) => {
        if (mounted)
          setApplications(data.filter((app) => app.userId === user.id))
      })
      .catch(() => {
        if (mounted) setApplications([])
      })
      .finally(() => {
        if (mounted) setLoading(false)
      })

    return () => {
      mounted = false
    }
  }, [isPending, user?.id])

  const total = applications.length
  const totalPages = Math.max(1, Math.ceil(total / perPage))

  const paginated = applications.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  )

  const shortlistedCount = applications.filter(
    (app) => app.status === "Shortlisted"
  ).length
  const interviewsCount = applications.filter(
    (app) => app.status === "Review"
  ).length
  const offeredCount = applications.filter(
    (app) => app.status === "Offered"
  ).length
  const successRate = total > 0 ? Math.round((offeredCount / total) * 100) : 0

  const start = total === 0 ? 0 : (currentPage - 1) * perPage + 1
  const end = Math.min(currentPage * perPage, total)

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 py-12 pt-28">
        <div className="mx-auto max-w-7xl px-4">
          <div className="py-12 text-center text-muted-foreground">
            Loading applications…
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-zinc-950 px-4 py-8 pt-28 text-zinc-200 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
          <div>
            <h1 className="text-3xl font-semibold text-foreground">
              My Applications
            </h1>
            <p className="text-sm text-muted-foreground">
              Track your job applications and interview progress in real-time.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
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
            <Button variant="outline" className="rounded-md text-sm">
              <MdDownload className="mr-2 h-4 w-4" /> Export PDF
            </Button>
          </div>
        </div>
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="border border-zinc-800 bg-zinc-900/50 p-4">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Applied
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{total}</div>
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
              <div className="text-2xl font-bold text-blue-400">
                {shortlistedCount}
              </div>
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
              <div className="text-2xl font-bold text-amber-400">
                {interviewsCount}
              </div>
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
              <div className="text-2xl font-bold text-emerald-400">
                {successRate}%
              </div>
              <CardDescription className="text-xs text-muted-foreground">
                Offer rate
              </CardDescription>
            </CardContent>
          </Card>
        </div>
        <Card className="overflow-hidden border border-zinc-800 bg-zinc-900/50">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="text-xs text-zinc-500 uppercase">
                  <TableHead className="w-1/3 px-4 py-3 text-left font-medium">
                    Job Title
                  </TableHead>
                  <TableHead className="px-4 py-3 text-left font-medium">
                    Company
                  </TableHead>
                  <TableHead className="px-4 py-3 text-left font-medium">
                    Applied
                  </TableHead>
                  <TableHead className="px-4 py-3 text-left font-medium">
                    Status
                  </TableHead>
                  <TableHead className="px-4 py-3 text-right font-medium">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginated.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="px-4 py-10 text-center text-zinc-500"
                    >
                      No applications yet.
                    </TableCell>
                  </TableRow>
                ) : (
                  paginated.map((app) => (
                    <TableRow key={app.id} className="hover:bg-zinc-800/30">
                      <TableCell className="px-4 py-3 font-medium text-foreground">
                        <div className="flex items-center gap-2">
                          <div className="flex h-8 w-8 items-center justify-center rounded bg-zinc-800 text-xs font-medium text-zinc-400">
                            {app.jobTitle.charAt(0)}
                          </div>
                          <div>
                            <div>{app.jobTitle}</div>
                            <div className="flex gap-2 text-xs text-zinc-500">
                              <p> {app.jobType}</p>
                              <p>{app.location} </p>
                            </div>
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
                          className="border-zinc-800 text-xs text-zinc-400 hover:border-zinc-600 hover:text-zinc-200"
                        >
                          Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </Card>
        <div className="mt-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <p className="text-sm text-zinc-500">
            Showing {start}-{end} of {total} applications
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
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                size="sm"
                variant={currentPage === page ? "default" : "outline"}
                className={`min-w-[2.5rem] rounded-md text-sm font-medium ${
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
