"use client"

import * as React from "react"
import { cn } from "cn"

const Switch = React.forwardRef<
  HTMLInputElement,
  React.ComponentPropsWithoutRef<"input">
>(({ className, checked, ...props }, ref) => (
  <input
    ref={ref}
    type="checkbox"
    role="switch"
    checked={checked}
    className={cn(
      "peer shrink-0 rounded-full border border-transparent bg-transparent p-0.5 shadow-sm transition-all focus-visible:ring-3 focus-visible:ring-ring focus-visible:ring-ring/50 data-[checked=false]:bg-input data-[checked=false]:focus-visible:ring-3 data-[checked=false]:focus-visible:ring-input data-[checked=false]:focus-visible:ring-input/20 data-[checked=true]:bg-primary data-[checked=true]:shadow-sm data-[checked=true]:focus-visible:ring-primary/20 dark:bg-transparent",
      className
    )}
    {...props}
  />
))
Switch.displayName = "Switch"

export { Switch }
