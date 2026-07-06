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
import { commandPaletteActions } from "@/lib/management-data"
import { workflows } from "@/lib/data"
import { usersData } from "@/lib/management-data"
import { automationAgentsData } from "@/lib/enterprise-data"
import { Badge } from "@/components/ui/badge"

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
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        {/* Navigation */}
        <CommandGroup heading="Navigation">
          {commandPaletteActions
            .filter(action => action.category === "Navigation")
            .map(action => (
              <CommandItem
                key={action.id}
                value={action.label.toLowerCase()}
                onSelect={() => action.path && runCommand(() => navigate(action.path))}
              >
                <span className="mr-2">→</span>
                {action.label}
                <CommandShortcut>{action.shortcut}</CommandShortcut>
              </CommandItem>
            ))}
        </CommandGroup>

        <CommandSeparator />

        {/* Quick Actions */}
        <CommandGroup heading="Quick Actions">
          {commandPaletteActions
            .filter(action => action.category === "Actions")
            .map(action => (
              <CommandItem
                key={action.id}
                value={action.label.toLowerCase()}
                onSelect={() => {
                  if (action.path) runCommand(() => navigate(action.path))
                  else if (action.label.includes("Dark Mode")) {
                    setTheme("dark")
                  }
                }}
              >
                <span className="mr-2">⚡</span>
                {action.label}
                <CommandShortcut>{action.shortcut}</CommandShortcut>
              </CommandItem>
            ))}
        </CommandGroup>

        <CommandSeparator />

        {/* Workflows */}
        <CommandGroup heading="Workflows">
          {workflows.slice(0, 5).map(workflow => (
            <CommandItem
              key={workflow.id}
              value={`workflow ${workflow.title.toLowerCase()} ${workflow.id.toLowerCase()}`}
              onSelect={() => runCommand(() => navigate(`/workflows/${workflow.id}`))}
            >
              <span className="mr-2">🔀</span>
              {workflow.title}
              <Badge variant="outline" className="ml-auto text-xs">{workflow.id}</Badge>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        {/* Users */}
        <CommandGroup heading="Users">
          {usersData.slice(0, 4).map(user => (
            <CommandItem
              key={user.id}
              value={`user ${user.name.toLowerCase()} ${user.email.toLowerCase()}`}
              onSelect={() => runCommand(() => navigate("/users"))}
            >
              <span className="mr-2">👤</span>
              {user.name}
              <span className="ml-auto text-xs text-muted-foreground">{user.department}</span>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        {/* Automation Agents */}
        <CommandGroup heading="Automation Agents">
          {automationAgentsData.slice(0, 4).map(agent => (
            <CommandItem
              key={agent.id}
              value={`agent ${agent.name.toLowerCase()}`}
              onSelect={() => runCommand(() => navigate(`/automation/${agent.id}`))}
            >
              <span className="mr-2">🤖</span>
              {agent.name}
              <span className={`ml-auto text-xs ${agent.health === "healthy" ? "text-emerald-500" : agent.health === "degraded" ? "text-amber-500" : "text-muted-foreground"}`}>
                {agent.health}
              </span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
