"use client"

import * as React from "react"
import { cn } from "cn"

function Select({
  className,
  children,
  ...props
}: React.ComponentProps<"select">) {
  return (
    <select
      className={cn(
        "h-8 w-full min-w-0 flex items-center justify-between rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-input/30 md:text-sm appearance-none data-[invalid=true]:border-destructive data-[invalid=true]:ring-3 data-[invalid=true]:ring-destructive/20",
        className
      )}
      {...props}
    >
      {children}
    </select>
  )
}

function SelectGroup({ className, ...props }: React.ComponentProps<"optgroup">) {
  return (
    <optgroup className={cn(className)} {...props} />
  )
}

function SelectValue({ children, ...props }: React.ComponentProps<"option">) {
  return (
    <option className="text-muted-foreground" {...props}>
      {children}
    </option>
  )
}

function SelectTrigger({ className, children, ...props }: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex items-center justify-between", className)} {...props}>
      {children}
    </div>
  )
}

function SelectContent({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn(className)} {...props}>
      {children}
    </div>
  )
}

function SelectLabel({ className, ...props }: React.ComponentProps<"label">) {
  return (
    <label
      className={cn("px-2 py-1.5 text-sm font-semibold text-muted-foreground", className)}
      {...props}
    />
  )
}

function SelectItem({
  className,
  children,
  value,
  ...props
}: React.ComponentProps<"option"> & { value?: string }) {
  return (
    <option
      className={cn(
        "cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground",
        className
      )}
      value={value}
      {...props}
    >
      {children}
    </option>
  )
}

function SelectSeparator({ className, ...props }: React.ComponentProps<"hr">) {
  return (
    <hr
      className={cn("-mx-1 h-px bg-muted", className)}
      {...props}
    />
  )
}

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
}
