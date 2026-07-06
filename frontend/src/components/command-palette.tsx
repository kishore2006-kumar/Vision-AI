import { useState, useEffect, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import { useTheme } from "@/components/theme-provider"
import { aiAgents } from "@/lib/agents-data"

const navigationItems = [
  { id: "dashboard", label: "Go to Dashboard", shortcut: "G D", path: "/dashboard" },
  { id: "agents", label: "Go to Agents Hub", shortcut: "G A", path: "/agents" },
  { id: "analytics", label: "Go to Analytics", shortcut: "G N", path: "/analytics" },
  { id: "activity", label: "Go to Activity Center", shortcut: "G C", path: "/activity" },
  { id: "notifications", label: "Go to Notifications", shortcut: "G N", path: "/notifications" },
  { id: "settings", label: "Go to Settings", shortcut: "G S", path: "/settings" },
  { id: "help", label: "Go to Help Center", shortcut: "G H", path: "/help" },
  { id: "profile", label: "Go to Profile", shortcut: "G P", path: "/profile" },
]

export function CommandPalette() {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const { setTheme } = useTheme()

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const runCommand = useCallback((command: () => void) => {
    setOpen(false)
    command()
  }, [])

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search agents..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        {/* Navigation */}
        <CommandGroup heading="Navigation">
          {navigationItems.map((item) => (
            <CommandItem
              key={item.id}
              value={item.label.toLowerCase()}
              onSelect={() => runCommand(() => navigate(item.path))}
            >
              <span className="mr-2">→</span>
              {item.label}
              <CommandShortcut>{item.shortcut}</CommandShortcut>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        {/* AI Agents */}
        <CommandGroup heading="AI Agents">
          {aiAgents.map((agent) => (
            <CommandItem
              key={agent.id}
              value={`agent ${agent.name.toLowerCase()} ${agent.shortName.toLowerCase()}`}
              onSelect={() => runCommand(() => navigate(`/agents/${agent.id}`))}
            >
              <span className="mr-2">🤖</span>
              {agent.name}
              <div className="ml-auto flex items-center gap-2">
                {agent.status === "available" && (
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                )}
                <span className="text-xs text-muted-foreground">{agent.metrics.avgResponseTime}</span>
              </div>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        {/* Quick Actions */}
        <CommandGroup heading="Quick Actions">
          <CommandItem
            value="toggle dark mode"
            onSelect={() => {
              setTheme("dark")
              runCommand(() => {})
            }}
          >
            <span className="mr-2">🌙</span>
            Toggle Dark Mode
            <CommandShortcut>T D</CommandShortcut>
          </CommandItem>
          <CommandItem
            value="toggle light mode"
            onSelect={() => {
              setTheme("light")
              runCommand(() => {})
            }}
          >
            <span className="mr-2">☀️</span>
            Toggle Light Mode
            <CommandShortcut>T L</CommandShortcut>
          </CommandItem>
          <CommandItem
            value="sign out"
            onSelect={() => runCommand(() => navigate("/login"))}
          >
            <span className="mr-2">🚪</span>
            Sign Out
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
