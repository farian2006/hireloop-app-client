export type JobType = "full-time" | "part-time" | "contract" | "internship"

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

export type JobPost = {
  _id: string
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
