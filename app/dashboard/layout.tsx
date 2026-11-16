import React from "react"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { DashBoardSidebar } from "@/app/components/DashBoardSideBar"
import { Toaster } from "@/components/ui/toast"

const Dashboardlayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <DashBoardSidebar />
      <SidebarInset>{children}</SidebarInset>
      <Toaster/>
    </SidebarProvider>
  )
}

export default Dashboardlayout
