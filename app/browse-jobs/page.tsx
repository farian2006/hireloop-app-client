"use client"

import { useEffect, useState } from "react"
import { getJobs } from "@/lib/api/jobs"
import type { RawJob } from "@/lib/types/jobs"
import { FaArrowAltCircleLeft, FaArrowCircleRight } from "react-icons/fa"
import { SearchBar } from "@/components/browse-jobs/SearchBar"
import { FilterPanel } from "@/components/browse-jobs/FilterPanel"
import { JobCard } from "@/components/browse-jobs/JobCard"

export default function BrowseJobsPage() {
  const [jobs, setJobs] = useState<RawJob[]>([])
  const [loading, setLoading] = useState(true)
  const [searchInput, setSearchInput] = useState("")

  const [query, setQuery] = useState({
    search: "",
    jobTypes: [] as string[],
    jobCategory: "",
    companyName: "",
    sort: "Most Recent",
  })
  const [draftTypes, setDraftTypes] = useState<string[]>([])
  const [draftCategory, setDraftCategory] = useState("")
  const [draftCompany, setDraftCompany] = useState("")

  useEffect(() => {
    let mounted = true
    setLoading(true)

    const params = new URLSearchParams()
    if (query.search) params.set("search", query.search)
    if (query.jobTypes.length) params.set("jobType", query.jobTypes.join(","))
    if (query.jobCategory) params.set("jobCategory", query.jobCategory)
    if (query.companyName) params.set("companyName", query.companyName)
    if (query.sort === "Salary: High to Low") params.set("sort", "salary_desc")
    if (query.sort === "Salary: Low to High") params.set("sort", "salary_asc")
    params.set("sort", query.sort)

    getJobs(params.toString())
      .then((data) => {
        if (mounted) setJobs(data)
      })
      .catch(() => {
        if (mounted) setJobs([])
      })
      .finally(() => {
        if (mounted) setLoading(false)
      })

    return () => {
      mounted = false
    }
  }, [query])

  const jobTypeCounts = jobs.reduce<Record<string, number>>((acc, job) => {
    const type = job.jobType
    if (type) acc[type] = (acc[type] ?? 0) + 1
    return acc
  }, {})

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value)
  }

  const handleSearch = () => {
    setQuery((prev) => ({ ...prev, search: searchInput.trim() }))
  }

  const handleJobType = (value: string) => {
    setDraftTypes((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    )
  }

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDraftCategory(e.target.value)
  }

  const handleCompanyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDraftCompany(e.target.value)
  }

  const handleApply = () => {
    setQuery((prev) => ({
      ...prev,
      jobTypes: draftTypes,
      jobCategory: draftCategory,
      companyName: draftCompany.trim(),
    }))
  }

  const noop = () => {}

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setQuery((prev) => ({ ...prev, sort: e.target.value }))
  }

  return (
    <div className="pt-20 pb-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SearchBar
          onSearch={handleSearch}
          onSearchChange={handleSearchChange}
        />
        <div className="mt-8 flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
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
              onChange={handleSortChange}
              className="flex h-8 w-[140px] min-w-0 appearance-none items-center justify-between rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:bg-input/30"
            >
              <option value="Most Recent">Most Recent</option>
              <option value="Salary: High to Low">Salary: High to Low</option>
              <option value="Salary: Low to High">Salary: Low to High</option>
            </select>
          </div>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12">
          <aside className="space-y-6 lg:col-span-3">
            <FilterPanel
              jobTypes={draftTypes}
              onJobTypeToggle={handleJobType}
              jobTypeCounts={jobTypeCounts}
              jobCategory={draftCategory}
              onJobCategoryChange={handleCategoryChange}
              companyName={draftCompany}
              onCompanyNameChange={handleCompanyChange}
              onApply={handleApply}
            />
          </aside>

          <div className="space-y-4 lg:col-span-9">
            {loading ? (
              <div className="py-12 text-center text-muted-foreground">
                Loading jobs…
              </div>
            ) : jobs.length === 0 ? (
              <div className="py-12 text-center text-muted-foreground">
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
        <div className="mt-10 flex items-center justify-center gap-1">
          <button
            type="button"
            disabled
            className="flex items-center gap-2 rounded-lg border border-input bg-input/50 px-3 py-1.5 text-sm"
            onClick={noop}
          >
            Prev
            <FaArrowAltCircleLeft />
          </button>
          <button
            type="button"
            className="rounded-lg bg-primary px-3 py-1.5 text-sm text-primary-foreground"
            onClick={noop}
          >
            1
          </button>
          {[2, 3].map((n) => (
            <button
              key={n}
              type="button"
              className="rounded-lg border border-input bg-input/50 px-3 py-1.5 text-sm"
              onClick={noop}
            >
              {n}
            </button>
          ))}
          <button
            type="button"
            className="rounded-lg border border-input bg-input/50 px-1.5 py-1.5 text-sm"
            onClick={noop}
          >
            …
          </button>
          <button
            type="button"
            className="flex items-center gap-2 rounded-lg border border-input bg-input/50 px-3 py-1.5 text-sm"
            onClick={noop}
          >
            Next
            <FaArrowCircleRight />
          </button>
        </div>
      </div>
    </div>
  )
}
