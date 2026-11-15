import React from "react"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { DashBoardSidebar } from "@/app/components/DashBoardSideBar"

const Dashboardlayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <DashBoardSidebar />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  )
}

export default Dashboardlayout
