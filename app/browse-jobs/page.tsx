"use client"

import { useEffect, useState } from "react"
import { getJobs } from "@/lib/api/jobs"
import type { RawJob } from "@/lib/types/jobs"
import { MoreHorizontal } from "lucide-react"
import { SearchBar } from "@/components/browse-jobs/SearchBar"
import { FilterPanel } from "@/components/browse-jobs/FilterPanel"
import { JobCard } from "@/components/browse-jobs/JobCard"

export default function BrowseJobsPage() {
  const [jobs, setJobs] = useState<RawJob[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    getJobs("")
      .then((data) => {
        if (mounted) {
          setJobs(data)
          setLoading(false)
        }
      })
      .catch(() => {
        if (mounted) {
          setJobs([])
          setLoading(false)
        }
      })
    return () => {
      mounted = false
    }
  }, [])

  // Job type counts for the filter sidebar (display only).
  const jobTypeCounts = jobs.reduce<Record<string, number>>((acc, job) => {
    const type = job.jobType
    if (type) acc[type] = (acc[type] ?? 0) + 1
    return acc
  }, {})

  // --------------------------------------------------------------------------
  // NOTE: All search/filter handlers below are intentionally left empty.
  // Wire up the actual search/filter logic (e.g. updating the query string
  // and re-fetching jobs) here. The job list is not re-filtered when these
  // change, per requirements.
  // --------------------------------------------------------------------------
  const noop = () => {
    // TODO: implement search / filter / apply / pagination
  }

  return (
    <div className="pt-20 pb-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Search Bar */}
        <SearchBar
          onSearch={noop}
          onSearchChange={noop}
        />

        {/* Results header */}
        <div className="mt-8 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-foreground">
              Found {jobs.length} Professional Jobs
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-muted-foreground">
              Sort by:
            </span>
            <select
              defaultValue="Most Recent"
              onChange={noop}
              className="flex h-8 w-[140px] min-w-0 appearance-none items-center justify-between rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:bg-input/30"
            >
              <option value="Most Recent">Most Recent</option>
              <option value="Salary: High to Low">Salary: High to Low</option>
              <option value="Salary: Low to High">Salary: Low to High</option>
            </select>
          </div>
        </div>

        {/* Filters + Jobs grid */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          <aside className="lg:col-span-3 space-y-6">
            <FilterPanel
              jobTypes={[]}
              onJobTypeToggle={noop}
              jobTypeCounts={jobTypeCounts}
              jobCategory=""
              onJobCategoryChange={noop}
              companyName=""
              onCompanyNameChange={noop}
              onApply={noop}
            />
          </aside>

          <div className="lg:col-span-9 space-y-4">
            {loading ? (
              <div className="text-center py-12 text-muted-foreground">
                Loading jobs…
              </div>
            ) : jobs.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                No jobs found matching your criteria.
              </div>
            ) : (
              jobs.map((job) => (
                <JobCard
                  key={job._id}
                  job={job}
                  onEasyApply={noop}
                  onBookmark={noop}
                />
              ))
            )}
          </div>
        </div>

        {/* Pagination */}
        <div className="mt-10 flex items-center justify-center gap-1">
          <button
            type="button"
            disabled
            className="px-3 py-1.5 rounded-lg border border-input bg-input/50 text-sm text-muted-foreground"
            onClick={noop}
          >
            <MoreHorizontal className="h-4 w-4 mr-1" />
            Prev
          </button>
          <button
            type="button"
            className="px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-sm"
            onClick={noop}
          >
            1
          </button>
          {[2, 3].map((n) => (
            <button
              key={n}
              type="button"
              className="px-3 py-1.5 rounded-lg border border-input bg-input/50 text-sm"
              onClick={noop}
            >
              {n}
            </button>
          ))}
          <button
            type="button"
            className="px-1.5 py-1.5 rounded-lg border border-input bg-input/50 text-sm"
            onClick={noop}
          >
            …
          </button>
          <button
            type="button"
            className="px-3 py-1.5 rounded-lg border border-input bg-input/50 text-sm"
            onClick={noop}
          >
            42
          </button>
          <button
            type="button"
            className="px-3 py-1.5 rounded-lg border border-input bg-input/50 text-sm"
            onClick={noop}
          >
            Next
            <MoreHorizontal className="h-4 w-4 ml-1" />
          </button>
        </div>
      </div>
    </div>
  )
}
