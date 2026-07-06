import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { WorkflowStatus, Priority } from "@/lib/data"

const statusConfig: Record<WorkflowStatus, { label: string; className: string }> = {
  active: { label: "Active", className: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20" },
  pending: { label: "Pending", className: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20" },
  completed: { label: "Completed", className: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20" },
  escalated: { label: "Escalated", className: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20" },
  draft: { label: "Draft", className: "bg-muted text-muted-foreground border-border" },
}

const priorityConfig: Record<Priority, { label: string; className: string }> = {
  critical: { label: "Critical", className: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20" },
  high: { label: "High", className: "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20" },
  medium: { label: "Medium", className: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20" },
  low: { label: "Low", className: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20" },
}

export function StatusBadge({ status }: { status: WorkflowStatus }) {
  const config = statusConfig[status]
  return (
    <Badge variant="outline" className={cn("text-xs font-medium", config.className)}>
      {config.label}
    </Badge>
  )
}

export function PriorityBadge({ priority }: { priority: Priority }) {
  const config = priorityConfig[priority]
  return (
    <Badge variant="outline" className={cn("text-xs font-medium", config.className)}>
      {config.label}
    </Badge>
  )
}

export function DepartmentBadge({ department }: { department: string }) {
  return (
    <Badge variant="secondary" className="text-xs font-medium">
      {department}
    </Badge>
  )
}
