export type ApplicationStatus =
  "Applied" | "Review" | "Shortlisted" | "Rejected" | "Offered"

export interface JobApplication {
  _id?: string
  jobId: string
  userId: string
  email: string
  jobTitle: string
  companyName: string
  company?: string
  status?: ApplicationStatus
  jobType: string
  location: string
  applied?: string
  appliedAt?: string
}
export interface ApplicationRow {
  id: string
  userId: string
  jobTitle: string
  jobType: string
  location: string
  company: string
  applied: string
  status: ApplicationStatus
}

export interface ApplyResult {
  acknowledged: boolean
  insertedId: string
}
