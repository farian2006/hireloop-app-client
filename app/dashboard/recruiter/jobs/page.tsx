import { getJobs } from "@/lib/api/jobs"
import type { RawJob } from "@/lib/types/jobs"

import ManageJobsTable from "./manage-jobs-table"

const ManageJobsPage = async () => {
  let jobs: RawJob[] = []
  let loadError: string | null = null

  try {
    jobs = await getJobs()
  } catch (error) {
    loadError =
      error instanceof Error ? error.message : "Failed to load job posts."
  }

  return <ManageJobsTable jobs={jobs} loadError={loadError} />
}

export default ManageJobsPage
