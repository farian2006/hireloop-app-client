"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export interface SearchBarProps {
  onSearch: () => void
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function SearchBar({ onSearch, onSearchChange }: SearchBarProps) {
  return (
  <div className="w-full rounded-xl border border-white/10 bg-zinc-950 p-4">
    <div className="flex items-center gap-4">
      <div className="relative flex-1">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
        <Input
          placeholder="Search by job title, keywords..."
          defaultValue=""
          onChange={onSearchChange}
          className="h-11 border-white/5 bg-zinc-900 pl-10 text-sm text-zinc-200 placeholder:text-xs placeholder:text-zinc-500 focus-visible:ring-1 focus-visible:ring-zinc-600"
        />
      </div>
      <Button
        type="button"
        onClick={onSearch}
        className="h-11 shrink-0 rounded-lg bg-white px-6 text-sm font-semibold text-zinc-900 hover:bg-zinc-200 cursor-pointer"
      >
        Search Jobs
      </Button>
    </div>
  </div>
)
}
