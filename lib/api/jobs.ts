const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000"

import type { RawJob } from "@/lib/types/jobs"

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
