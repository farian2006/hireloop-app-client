import { date } from "better-auth"
import { ApplicationRow, JobApplication } from "../types/applications"

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000"

export async function applyToAJob(data: {
  jobId: string
  userId: string
  email: string
  jobTitle: string
  companyName: string
}) {
  const response = await fetch(`${BASE_URL}/applications`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const text = await response.text()
    throw new Error(
      `Request failed (${response.status}): ${text.slice(0, 200)}`
    )
  }

  return response.json()
}

const timeAgo = (value: string) => {
  const time = new Date(value).getTime()

  if (Number.isNaN(time)) return value

  const seconds = Math.floor((Date.now() - time) / 1000)

  if (seconds < 60) return "Just now"
  if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`
  return `${Math.floor(seconds / 86400)} days ago`
}

export const getApplications = async (
  query = ""
): Promise<ApplicationRow[]> => {
  const res = await fetch(`${BASE_URL}/applications?${query}`)

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Request failed (${res.status}): ${text.slice(0, 200)}`)
  }

  const data: JobApplication[] = await res.json()

  return data.map((app) => ({
    id: app._id ?? "",
    jobTitle: app.jobTitle,
    jobType: app.jobType ?? "",
    location: app.location ?? "",
    company: app.companyName ?? app.company ?? "",
    applied: app.applied ? timeAgo(app.applied) : (app.applied ?? ""),
    status: app.status ?? "Applied",
  }))
}
