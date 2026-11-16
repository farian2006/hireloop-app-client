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
        "flex h-8 w-full min-w-0 appearance-none items-center justify-between rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 data-[invalid=true]:border-destructive data-[invalid=true]:ring-3 data-[invalid=true]:ring-destructive/20 md:text-sm dark:bg-input/30",
        className
      )}
      {...props}
    >
      {children}
    </select>
  )
}

function SelectGroup({
  className,
  ...props
}: React.ComponentProps<"optgroup">) {
  return <optgroup className={cn(className)} {...props} />
}

function SelectValue({ children, ...props }: React.ComponentProps<"option">) {
  return (
    <option className="text-muted-foreground" {...props}>
      {children}
    </option>
  )
}

function SelectTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("flex items-center justify-between", className)}
      {...props}
    >
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
      className={cn(
        "px-2 py-1.5 text-sm font-semibold text-muted-foreground",
        className
      )}
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
        "cursor-pointer items-center rounded-sm px-2 py-1.5 text-sm transition-colors outline-none select-none focus:bg-accent focus:text-accent-foreground",
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
  return <hr className={cn("-mx-1 h-px bg-muted", className)} {...props} />
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
