import { Outlet } from "react-router-dom"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "./app-sidebar"
import { AppHeader } from "./app-header"
import { CommandPalette } from "@/components/command-palette"
import { AssistantChat } from "@/components/assistant/assistant-chat"

export function AppShell() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AppHeader />
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </SidebarInset>
      <CommandPalette />
      <AssistantChat />
    </SidebarProvider>
  )
}
