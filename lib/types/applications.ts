export type ApplicationStatus = "Applied" | "Review" | "Shortlisted" | "Rejected" | "Offered"

export interface JobApplication {
  _id?: string
  jobId: string
  userId: string
  email: string
  jobTitle: string
  companyName: string
  status?: ApplicationStatus
  appliedAt?: string
}
