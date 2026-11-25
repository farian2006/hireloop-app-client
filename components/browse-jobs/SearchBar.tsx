"use client"

import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export interface SearchBarProps {
  onSearch: () => void
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function SearchBar({ onSearch, onSearchChange }: SearchBarProps) {
  return (
    <div className="w-full">
      <div className="relative">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
        />
        <Input
          placeholder="Search by job title, keywords..."
          defaultValue=""
          onChange={onSearchChange}
          className="pl-10"
        />
        <Button type="button" onClick={onSearch} className="ml-3">
          Search Jobs
        </Button>
      </div>
    </div>
  )
}
