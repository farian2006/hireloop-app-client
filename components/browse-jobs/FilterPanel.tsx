"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectLabel, SelectTrigger } from "@/components/ui/select"
import { jobTypeOptions, jobCategoryOptions } from "@/lib/constants/jobs"
import { cn } from "@/lib/utils"

export interface FilterPanelProps {
  jobTypes: string[]
  onJobTypeToggle: (value: string) => void
  jobTypeCounts: Record<string, number>
  jobCategory: string
  onJobCategoryChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  companyName: string
  onCompanyNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onApply: () => void
}

export function FilterPanel({
  jobTypes,
  onJobTypeToggle,
  jobTypeCounts,
  jobCategory,
  onJobCategoryChange,
  companyName,
  onCompanyNameChange,
  onApply,
}: FilterPanelProps) {
  const isSelected = (value: string) => jobTypes.includes(value)
  const count = (value: string) => jobTypeCounts[value] ?? 0

  return (
    <div className="space-y-6">
      <h2 className="text-sm font-semibold text-foreground">Filters</h2>

      {/* Job Type */}
      <div className="space-y-2">
        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          Job Type
        </span>
        <div className="grid grid-cols-3 gap-2">
          {jobTypeOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => onJobTypeToggle(option.value)}
              aria-pressed={isSelected(option.value)}
              className={cn(
                "flex items-center justify-between rounded-lg border px-3 py-2 text-sm transition-colors",
                isSelected(option.value)
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-input bg-input/50 text-foreground hover:bg-muted"
              )}
            >
              <span>{option.label}</span>
              <Badge variant="outline" className="text-[10px]">
                {count(option.value)}
              </Badge>
            </button>
          ))}
        </div>
      </div>

      {/* Job Category */}
      <div className="space-y-2">
        <SelectLabel>Job Category</SelectLabel>
        <Select
          onChange={onJobCategoryChange}
          defaultValue={jobCategory || ""}
        >
          <SelectTrigger className="w-full" />
          <SelectContent>
            <SelectItem value="">All</SelectItem>
            {jobCategoryOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Company Name */}
      <div className="space-y-2">
        <SelectLabel>Company Name</SelectLabel>
        <Input
          placeholder="Company name"
          defaultValue={companyName}
          onChange={onCompanyNameChange}
        />
      </div>

      <Button type="button" onClick={onApply} className="w-full" variant="outline">
        Apply Filters
      </Button>
    </div>
  )
}
