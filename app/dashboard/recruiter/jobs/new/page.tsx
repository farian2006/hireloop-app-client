"use client"

import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { cn } from "@/lib/utils"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardDescription,
} from "@/components/ui/card"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { createJob } from "@/lib/actions/jobs"

const formSchema = z.object({
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

type FormData = z.infer<typeof formSchema>

const jobTypes = [
  { value: "full-time", label: "Full-time" },
  { value: "part-time", label: "Part-time" },
  { value: "contract", label: "Contract" },
  { value: "internship", label: "Internship" },
]

const jobCategories = [
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

const frequencies = [
  { value: "hour", label: "per hour" },
  { value: "year", label: "per year" },
  { value: "month", label: "per month" },
]

export default function NewJobPage() {
  const [formData, setFormData] = useState<FormData | null>(null)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      jobTitle: "",
      companyName: "",
      jobCategory: "",
      jobType: "",
      remoteAllowed: false,
      jobLocation: "",
      applicationDeadline: "",
      minSalary: "",
      maxSalary: "",
      frequency: "",
      keyResponsibilities: "",
      qualifications: "",
    },
  })

  const jobType = watch("jobType")
  const remoteAllowed = watch("remoteAllowed")

  const onSubmit = async (data: FormData) => {
    setFormData(data)
    setSubmitError(null)
    try {
      const result = await createJob(data)
    } catch (error) {
      console.error("3. createJob failed:", error)
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Something went wrong while publishing the job."
      )
    }
  }
  const onError = (errors: unknown) => {
    console.log("VALIDATION ERRORS:", errors)
  }

  return (
    <div className="flex min-h-screen w-full min-w-0 flex-col bg-background">
      <div className="mx-auto mt-6 flex w-full max-w-2xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-medium tracking-tight text-foreground sm:text-3xl">
              Post a New Job
            </h1>
            <p className="text-sm text-muted-foreground">
              Fill in the position specifications to attract qualified talent
              across our network.
            </p>
          </div>
          <Button
            type="submit"
            form="job-form"
            disabled={isSubmitting}
            className="w-full shrink-0 gap-2 rounded-xl bg-[#5b4cf5] px-5 text-white shadow-lg shadow-indigo-500/40 hover:bg-[#4f40e6] hover:shadow-indigo-500/60 disabled:opacity-60 sm:w-auto"
          >
            {isSubmitting ? "Publishing..." : "Publish Job"}
            {isSubmitting ? (
              <span
                aria-hidden="true"
                className="size-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
              />
            ) : (
              <ArrowRight className="size-4" />
            )}
          </Button>
        </div>
      </div>

      <main className="flex w-full flex-1 items-center justify-center px-4 py-8 md:py-12">
        <form
          id="job-form"
          onSubmit={handleSubmit(onSubmit, onError)}
          className="w-full max-w-2xl space-y-8"
        >
          {submitError && (
            <div
              role="alert"
              className="rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive"
            >
              Failed to publish job: {submitError}
            </div>
          )}
          <Card className="border-border dark:border-input/50">
            <CardHeader>
              <div className="flex items-center gap-2">
                <span className="text-[0.85rem] font-medium text-primary">
                  1. Basic Information
                </span>
              </div>
              <CardDescription>
                Provide the core details about this position.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Field>
                <FieldLabel>
                  <FieldTitle>Job Title *</FieldTitle>
                </FieldLabel>
                <FieldContent>
                  <Input
                    placeholder="Frontend Developer"
                    {...register("jobTitle")}
                  />
                  <FieldError>{errors.jobTitle?.message}</FieldError>
                </FieldContent>
              </Field>

              <FieldGroup>
                <Field>
                  <FieldLabel>
                    <FieldTitle>Company Name *</FieldTitle>
                  </FieldLabel>
                  <FieldContent>
                    <Input
                      placeholder="HirePulse Network"
                      {...register("companyName")}
                    />
                    <FieldError>{errors.companyName?.message}</FieldError>
                  </FieldContent>
                </Field>
                <Field>
                  <FieldLabel>
                    <FieldTitle>Job Category *</FieldTitle>
                  </FieldLabel>
                  <FieldContent>
                    <select
                      {...register("jobCategory")}
                      className="h-9 w-full rounded-lg border border-input bg-transparent px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring/50 dark:bg-input/30"
                    >
                      <option value="" disabled className="bg-background">
                        Select a category
                      </option>
                      {jobCategories.map((cat) => (
                        <option
                          key={cat.value}
                          value={cat.value}
                          className="bg-background"
                        >
                          {cat.label}
                        </option>
                      ))}
                    </select>
                    <FieldError>{errors.jobCategory?.message}</FieldError>
                  </FieldContent>
                </Field>
              </FieldGroup>
              <Field>
                <FieldLabel>
                  <FieldTitle>Job Type *</FieldTitle>
                </FieldLabel>
                <FieldContent>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {jobTypes.map((jt) => {
                      const isChecked = jobType === jt.value
                      return (
                        <button
                          key={jt.value}
                          type="button"
                          onClick={() => setValue("jobType", jt.value)}
                          className={cn(
                            "flex h-9 items-center justify-center rounded-lg border bg-transparent text-sm text-xs font-medium transition-all md:text-sm",
                            isChecked
                              ? "border-primary bg-primary text-primary-foreground shadow-sm"
                              : "border-input hover:bg-muted/50 dark:border-input/30 dark:hover:bg-input/20"
                          )}
                          aria-pressed={isChecked}
                          data-state={isChecked ? "checked" : "unchecked"}
                        >
                          {jt.label}
                        </button>
                      )
                    })}
                  </div>
                  <FieldError>{errors.jobType?.message}</FieldError>
                </FieldContent>
              </Field>
            </CardContent>
          </Card>

          <Card className="border-border dark:border-input/50">
            <CardHeader>
              <div className="flex items-center gap-2">
                <span className="text-[0.85rem] font-medium text-primary">
                  2. Location, Compensation & Timeline
                </span>
              </div>
              <CardDescription>
                Define where the work happens and how candidates are
                compensated.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Field orientation="horizontal">
                <Switch
                  checked={remoteAllowed === true}
                  onChange={(e) => setValue("remoteAllowed", e.target.checked)}
                />
                <FieldContent>
                  <FieldLabel className="ml-3 text-sm leading-none font-medium">
                    Remote Work Allowed (isRemote)
                  </FieldLabel>
                  <FieldDescription>
                    Enable worldwide or distributed candidate applications
                  </FieldDescription>
                </FieldContent>
              </Field>

              <FieldGroup>
                <Field>
                  <FieldLabel>
                    <FieldTitle>Job Location (location) *</FieldTitle>
                  </FieldLabel>
                  <FieldContent>
                    <Input
                      placeholder="New York, USA"
                      {...register("jobLocation")}
                    />
                    <FieldError>{errors.jobLocation?.message}</FieldError>
                  </FieldContent>
                </Field>

                <Field>
                  <FieldLabel>
                    <FieldTitle>Application Deadline (deadline) *</FieldTitle>
                  </FieldLabel>
                  <FieldContent>
                    <Input type="date" {...register("applicationDeadline")} />
                    <FieldError>
                      {errors.applicationDeadline?.message}
                    </FieldError>
                  </FieldContent>
                </Field>
              </FieldGroup>

              <FieldGroup>
                <Field>
                  <FieldLabel>
                    <FieldTitle>Min Salary / Rate</FieldTitle>
                  </FieldLabel>
                  <FieldContent>
                    <Input
                      type="number"
                      placeholder="€ 25"
                      {...register("minSalary")}
                    />
                  </FieldContent>
                </Field>

                <Field>
                  <FieldLabel>
                    <FieldTitle>Max Salary / Rate</FieldTitle>
                  </FieldLabel>
                  <FieldContent>
                    <Input
                      type="number"
                      placeholder="€ 40"
                      {...register("maxSalary")}
                    />
                  </FieldContent>
                </Field>

                <Field>
                  <FieldLabel>
                    <FieldTitle>Frequency</FieldTitle>
                  </FieldLabel>
                  <FieldContent>
                    <select
                      {...register("frequency")}
                      className="h-9 w-full rounded-lg border border-input bg-transparent px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring/50 dark:bg-input/30"
                    >
                      <option value="" className="bg-background">
                        Select frequency
                      </option>
                      {frequencies.map((freq) => (
                        <option
                          key={freq.value}
                          value={freq.value}
                          className="bg-background"
                        >
                          {freq.label}
                        </option>
                      ))}
                    </select>
                  </FieldContent>
                </Field>
              </FieldGroup>
            </CardContent>
          </Card>

          <Card className="border-border dark:border-input/50">
            <CardHeader>
              <div className="flex items-center gap-2">
                <span className="text-[0.85rem] font-medium text-primary">
                  3. Responsibilities & Requirements
                </span>
              </div>
              <CardDescription>
                Describe what the role involves and what you’re looking for.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Field>
                <FieldLabel>
                  <FieldTitle>Key Responsibilities</FieldTitle>
                </FieldLabel>
                <FieldContent>
                  <Textarea
                    rows={5}
                    placeholder="e.g. Build responsive UI components, collaborate with designers and backend engineers..."
                    className="placeholder:text-muted-foreground/60"
                    {...register("keyResponsibilities")}
                  />
                </FieldContent>
              </Field>

              <Field>
                <FieldLabel>
                  <FieldTitle>Qualifications & Requirements</FieldTitle>
                </FieldLabel>
                <FieldContent>
                  <Textarea
                    rows={5}
                    placeholder="e.g. Build responsive UI components, collaborate with designers and backend engineers..."
                    className="placeholder:text-muted-foreground/60"
                    {...register("qualifications")}
                  />
                </FieldContent>
              </Field>
            </CardContent>
          </Card>
        </form>
      </main>
    </div>
  )
}
