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
      <h2 className="text-base font-semibold text-foreground">Filters</h2>
      <div className="space-y-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
          Job Type
        </span>
        <div className="flex flex-wrap gap-2">
          {jobTypeOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => onJobTypeToggle(option.value)}
              aria-pressed={isSelected(option.value)}
              className={cn(
                "flex items-center gap-2 rounded-xl border px-4 py-3 text-left text-sm font-medium transition-colors",
                isSelected(option.value)
                  ? "border-white bg-white text-zinc-900"
                  : "border-white/10 bg-zinc-900 text-zinc-100 hover:bg-zinc-800"
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
      <div className="space-y-2">
        <SelectLabel className="flex">Job Category</SelectLabel>
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
      <div className="space-y-2">
        <SelectLabel className="flex">Company Name</SelectLabel>
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
