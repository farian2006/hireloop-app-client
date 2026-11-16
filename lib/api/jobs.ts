const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000"

/**
 * Raw job document as returned by the HirePulse API
 * (a MongoDB document created by the "Post a New Job" form).
 */
export type RawJob = {
  _id: string
  jobTitle?: string
  companyName?: string
  jobCategory?: string
  jobType?: string
  remoteAllowed?: boolean
  jobLocation?: string
  applicationDeadline?: string
  minSalary?: string
  maxSalary?: string
  frequency?: string
  keyResponsibilities?: string
  qualifications?: string
  applicants?: number
  postedDaysAgo?: number
}

export const getJobs = async (): Promise<RawJob[]> => {
  const res = await fetch(`${BASE_URL}/jobs`, {
    // Always show the latest listings, never a cached copy
    cache: "no-store",
  })
  if (!res.ok) {
    throw new Error(`Failed to load jobs (HTTP ${res.status})`)
  }
  return res.json()
}
