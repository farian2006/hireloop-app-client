import type { LucideIcon } from "lucide-react"
import {
  Briefcase,
  Calculator,
  Code,
  Headphones,
  Megaphone,
  Palette,
  Settings,
  Target,
  TrendingUp,
  Users,
} from "lucide-react"
import { z } from "zod"

import type { JobType } from "@/lib/types/jobs"

/** Validation schema for the "Post a New Job" form. */
export const jobFormSchema = z.object({
  jobTitle: z.string().min(1, "Job title is required"),
  companyName: z.string().min(1, "Company name is required"),
  jobCategory: z.string().min(1, "Job category is required"),
  jobType: z.string().min(1, "Job type is required"),
  remoteAllowed: z.boolean().optional(),
  jobLocation: z.string().min(1, "Job location is required"),
  applicationDeadline: z.string().min(1, "Application deadline is required"),
  minSalary: z.string().optional(),
  maxSalary: z.string().optional(),
  frequency: z.string().optional(),
  keyResponsibilities: z.string().optional(),
  qualifications: z.string().optional(),
})

export type JobFormData = z.infer<typeof jobFormSchema>

/** Selectable job types, used by the "Post a New Job" form. */
export const jobTypeOptions: { value: JobType; label: string }[] = [
  { value: "full-time", label: "Full-time" },
  { value: "part-time", label: "Part-time" },
  { value: "contract", label: "Contract" },
  { value: "internship", label: "Internship" },
]

/** Display label for each job type, keyed by `JobType`. */
export const jobTypeLabels: Record<JobType, string> = Object.fromEntries(
  jobTypeOptions.map((option) => [option.value, option.label]),
) as Record<JobType, string>

/** Selectable job categories, used by the "Post a New Job" form. */
export const jobCategoryOptions = [
  { value: "engineering-tech", label: "Engineering & Tech" },
  { value: "design", label: "Design" },
  { value: "marketing", label: "Marketing" },
  { value: "sales", label: "Sales" },
  { value: "product", label: "Product" },
  { value: "operations", label: "Operations" },
  { value: "customer-success", label: "Customer Success" },
  { value: "hr", label: "Human Resources" },
  { value: "finance", label: "Finance" },
  { value: "other", label: "Other" },
]

/** Selectable salary frequencies, used by the "Post a New Job" form. */
export const frequencyOptions = [
  { value: "hour", label: "per hour" },
  { value: "year", label: "per year" },
  { value: "month", label: "per month" },
]

export type CategoryStyle = {
  label: string
  icon: LucideIcon
  className: string
}

/** Badge icon and color styling per job category, used by the manage-jobs table. */
export const categoryStyles: Record<string, CategoryStyle> = {
  "engineering-tech": {
    label: "Engineering",
    icon: Code,
    className: "bg-[#5b4cf5]/15 text-[#8f86ff]",
  },
  design: {
    label: "Design",
    icon: Palette,
    className: "bg-orange-500/15 text-orange-400",
  },
  marketing: {
    label: "Marketing",
    icon: Megaphone,
    className: "bg-pink-500/15 text-pink-400",
  },
  sales: {
    label: "Sales",
    icon: TrendingUp,
    className: "bg-emerald-500/15 text-emerald-400",
  },
  product: {
    label: "Product",
    icon: Target,
    className: "bg-violet-500/15 text-violet-400",
  },
  operations: {
    label: "Operations",
    icon: Settings,
    className: "bg-sky-500/15 text-sky-400",
  },
  "customer-success": {
    label: "Customer Success",
    icon: Headphones,
    className: "bg-amber-500/15 text-amber-400",
  },
  hr: {
    label: "Human Resources",
    icon: Users,
    className: "bg-rose-500/15 text-rose-400",
  },
  finance: {
    label: "Finance",
    icon: Calculator,
    className: "bg-teal-500/15 text-teal-400",
  },
  other: {
    label: "Other",
    icon: Briefcase,
    className: "bg-muted text-muted-foreground",
  },
}
