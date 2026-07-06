import { useState } from "react"
import { Link } from "react-router-dom"
import {
  Workflow,
  UserPlus,
  CheckCircle2,
  AlertTriangle,
  Bot,
  Bell,
  BarChart3,
  Settings,
  Clock,
  Search,
  Filter,
  ArrowUpRight,
  RefreshCw,
  TrendingUp,
  AlertCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { PageHeader } from "@/components/shared/page-header"
import { activityEvents, type ActivityEvent, type ActivityEventType } from "@/lib/enterprise-data"

const eventTypeConfig: Record<ActivityEventType, { icon: React.ElementType; color: string; bg: string; label: string }> = {
  workflow_created: { icon: Workflow, color: "text-blue-500", bg: "bg-blue-500/10", label: "Workflow Created" },
  workflow_assigned: { icon: UserPlus, color: "text-purple-500", bg: "bg-purple-500/10", label: "Workflow Assigned" },
  workflow_approved: { icon: CheckCircle2, color: "text-emerald-500", bg: "bg-emerald-500/10", label: "Workflow Approved" },
  workflow_completed: { icon: CheckCircle2, color: "text-emerald-500", bg: "bg-emerald-500/10", label: "Workflow Completed" },
  automation_started: { icon: Bot, color: "text-cyan-500", bg: "bg-cyan-500/10", label: "Automation Started" },
  automation_finished: { icon: Bot, color: "text-cyan-500", bg: "bg-cyan-500/10", label: "Automation Finished" },
  reminder_sent: { icon: Bell, color: "text-amber-500", bg: "bg-amber-500/10", label: "Reminder Sent" },
  approval_requested: { icon: CheckCircle2, color: "text-purple-500", bg: "bg-purple-500/10", label: "Approval Requested" },
  analytics_generated: { icon: BarChart3, color: "text-indigo-500", bg: "bg-indigo-500/10", label: "Analytics Generated" },
  department_updated: { icon: Settings, color: "text-muted-foreground", bg: "bg-muted", label: "Department Updated" },
  user_assigned: { icon: UserPlus, color: "text-purple-500", bg: "bg-purple-500/10", label: "User Assigned" },
  sla_breach: { icon: AlertTriangle, color: "text-destructive", bg: "bg-destructive/10", label: "SLA Breach" },
  escalation_triggered: { icon: AlertCircle, color: "text-orange-500", bg: "bg-orange-500/10", label: "Escalation Triggered" },
}

const statusConfig = {
  success: { color: "text-emerald-500", bg: "bg-emerald-500/10" },
  failed: { color: "text-destructive", bg: "bg-destructive/10" },
  pending: { color: "text-blue-500", bg: "bg-blue-500/10" },
  warning: { color: "text-amber-500", bg: "bg-amber-500/10" },
}

function TimelineEvent({ event }: { event: ActivityEvent }) {
  const typeConfig = eventTypeConfig[event.type]
  const status = statusConfig[event.status]
  const Icon = typeConfig.icon

  return (
    <div className="flex gap-4 group">
      {/* Timeline marker */}
      <div className="flex flex-col items-center">
        <div className={`h-10 w-10 rounded-full ${typeConfig.bg} flex items-center justify-center shrink-0 z-10`}>
          <Icon className={`h-5 w-5 ${typeConfig.color}`} />
        </div>
        <div className="w-0.5 flex-1 bg-border mt-2" />
      </div>

      {/* Content */}
      <Card className="flex-1 mb-6 hover:border-border/80 hover:shadow-sm transition-all">
        <CardContent className="p-4">
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-sm font-semibold">{event.title}</h3>
                <Badge variant="outline" className={`text-xs ${status.color} border-current capitalize`}>
                  {event.status}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-1">{event.description}</p>
            </div>
            <span className="text-xs text-muted-foreground shrink-0">{event.timestamp}</span>
          </div>

          <div className="flex items-center gap-3 mt-3 flex-wrap">
            {event.user && (
              <Badge variant="secondary" className="text-xs gap-1">
                <UserPlus className="h-3 w-3" />
                {event.user}
              </Badge>
            )}
            {event.agent && (
              <Link to={`/automation/${event.agentId}`} className="flex items-center gap-1 text-xs text-primary hover:underline">
                <Bot className="h-3 w-3" />
                {event.agent}
              </Link>
            )}
            <Badge variant="outline" className="text-xs">{event.department}</Badge>
          </div>

          {event.workflowName && (
            <div className="mt-3 flex items-center gap-2">
              <Link to={`/workflows/${event.workflowId}`} className="flex items-center gap-1.5 text-xs text-primary hover:underline">
                {event.workflowName}
                <ArrowUpRight className="h-3 w-3" />
              </Link>
            </div>
          )}

          {event.metadata && Object.keys(event.metadata).length > 0 && (
            <div className="mt-3 p-2 rounded bg-muted/30 text-xs">
              {Object.entries(event.metadata).map(([key, value]) => (
                <span key={key} className="text-muted-foreground mr-3">
                  <span className="capitalize">{key.replace(/([A-Z])/g, " $1")}</span>: <span className="text-foreground">{value}</span>
                </span>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default function ActivityCenterPage() {
  const [events] = useState(activityEvents)
  const [search, setSearch] = useState("")
  const [typeFilter, setTypeFilter] = useState<string>("all")
  const [departmentFilter, setDepartmentFilter] = useState<string>("all")
  const [statusFilter, setStatusFilter] = useState<string>("all")

  const filtered = events.filter(event => {
    const matchSearch = event.title.toLowerCase().includes(search.toLowerCase()) ||
      event.description.toLowerCase().includes(search.toLowerCase())
    const matchType = typeFilter === "all" || event.type === typeFilter
    const matchDepartment = departmentFilter === "all" || event.department === departmentFilter
    const matchStatus = statusFilter === "all" || event.status === statusFilter
    return matchSearch && matchType && matchDepartment && matchStatus
  })

  // Group by date
  const groupedByDate = filtered.reduce((groups, event) => {
    const date = new Date(event.timestamp).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    })
    if (!groups[date]) groups[date] = []
    groups[date].push(event)
    return groups
  }, {} as Record<string, ActivityEvent[]>)

  // Stats
  const todayCount = events.filter(e => {
    const today = new Date().toDateString()
    return new Date(e.timestamp).toDateString() === today
  }).length

  const automationCount = events.filter(e => e.agent).length
  const successCount = events.filter(e => e.status === "success").length

  return (
    <div className="p-6 space-y-6 max-w-[1200px]">
      <PageHeader
        title="Activity Center"
        description="Enterprise-wide event timeline and audit trail"
      >
        <Button variant="outline" size="sm" className="gap-1.5">
          <RefreshCw className="h-3.5 w-3.5" />
          Refresh
        </Button>
        <Button variant="outline" size="sm" className="gap-1.5">
          <Filter className="h-3.5 w-3.5" />
          Export
        </Button>
      </PageHeader>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="cursor-pointer hover:border-border/80 transition-all">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                <Clock className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Today</p>
                <p className="text-2xl font-semibold">{todayCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:border-border/80 transition-all">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-cyan-500/10 flex items-center justify-center">
                <Bot className="h-5 w-5 text-cyan-500" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Automated</p>
                <p className="text-2xl font-semibold">{automationCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:border-border/80 transition-all">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Successful</p>
                <p className="text-2xl font-semibold">{successCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:border-border/80 transition-all">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-purple-500" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Total Events</p>
                <p className="text-2xl font-semibold">{events.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="relative flex-1 min-w-48 max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <Input
                placeholder="Search events..."
                className="pl-9 h-8 text-sm"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-40 h-8 text-sm">
                <SelectValue placeholder="Event type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All events</SelectItem>
                <SelectItem value="workflow_created">Workflow Created</SelectItem>
                <SelectItem value="workflow_assigned">Workflow Assigned</SelectItem>
                <SelectItem value="workflow_approved">Workflow Approved</SelectItem>
                <SelectItem value="workflow_completed">Workflow Completed</SelectItem>
                <SelectItem value="automation_started">Automation Started</SelectItem>
                <SelectItem value="automation_finished">Automation Finished</SelectItem>
                <SelectItem value="sla_breach">SLA Breach</SelectItem>
                <SelectItem value="escalation_triggered">Escalation</SelectItem>
              </SelectContent>
            </Select>
            <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
              <SelectTrigger className="w-36 h-8 text-sm">
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All departments</SelectItem>
                <SelectItem value="IT">IT</SelectItem>
                <SelectItem value="HR">HR</SelectItem>
                <SelectItem value="Security">Security</SelectItem>
                <SelectItem value="Administration">Administration</SelectItem>
                <SelectItem value="Finance">Finance</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-28 h-8 text-sm">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All statuses</SelectItem>
                <SelectItem value="success">Success</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="warning">Warning</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Timeline */}
      <div className="space-y-6">
        {Object.entries(groupedByDate).map(([date, dateEvents]) => (
          <div key={date}>
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4 sticky top-0 bg-background z-20 py-2">
              {date}
            </h2>
            <div className="space-y-0">
              {dateEvents.map(event => (
                <TimelineEvent key={event.id} event={event} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <Clock className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">No events found</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
