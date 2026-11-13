import React from 'react';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { DashBoardSidebar } from '@/app/components/DashBoardSideBar';


const Dashboardlayout = ({ children }: { children: React.ReactNode }) => {
   return (
    <SidebarProvider>
      <DashBoardSidebar />
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  )
};

export default Dashboardlayout;