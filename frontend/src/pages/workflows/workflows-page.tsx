import { useState } from "react"
import { Link } from "react-router-dom"
import {
  Plus,
  Search,
  LayoutGrid,
  Table2,
  GitBranch,
  CalendarDays,
  ArrowUpRight,
  SlidersHorizontal,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { PageHeader } from "@/components/shared/page-header"
import { StatusBadge, PriorityBadge, DepartmentBadge } from "@/components/shared/workflow-badge"
import { EmptyState } from "@/components/shared/empty-state"
import { workflows, type Workflow } from "@/lib/data"
import { teamMembers } from "@/lib/workflow-data"

function WorkflowKanbanCard({ workflow }: { workflow: Workflow }) {
  return (
    <Link to={`/workflows/${workflow.id}`}>
      <Card className="hover:border-border/80 hover:shadow-sm transition-all cursor-pointer group">
        <CardContent className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-muted-foreground">{workflow.id}</span>
            <PriorityBadge priority={workflow.priority} />
          </div>
          <h3 className="text-sm font-medium leading-snug group-hover:text-foreground">{workflow.title}</h3>
          <div className="flex items-center gap-2 flex-wrap">
            <DepartmentBadge department={workflow.department} />
          </div>
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">{workflow.progress}% complete</span>
              <span className="text-xs text-muted-foreground">Due {workflow.dueDate}</span>
            </div>
            <Progress value={workflow.progress} className="h-1" />
          </div>
          <div className="flex items-center gap-2">
            <Avatar className="h-5 w-5">
              <AvatarFallback className="text-[10px]">
                {workflow.assignee.split(" ").map(n => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <span className="text-xs text-muted-foreground truncate">{workflow.assignee}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

function KanbanView({ items }: { items: Workflow[] }) {
  const columns = [
    { id: "draft", label: "Draft", color: "text-muted-foreground" },
    { id: "pending", label: "Pending", color: "text-amber-500" },
    { id: "active", label: "Active", color: "text-blue-500" },
    { id: "escalated", label: "Escalated", color: "text-red-500" },
    { id: "completed", label: "Completed", color: "text-emerald-500" },
  ] as const

  return (
    <div className="flex gap-4 overflow-x-auto pb-4">
      {columns.map((col) => {
        const colItems = items.filter(w => w.status === col.id)
        return (
          <div key={col.id} className="flex-shrink-0 w-72">
            <div className="flex items-center justify-between mb-3 px-1">
              <div className="flex items-center gap-2">
                <span className={`text-sm font-semibold ${col.color}`}>{col.label}</span>
                <Badge variant="secondary" className="text-xs h-5 px-1.5">{colItems.length}</Badge>
              </div>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <Plus className="h-3 w-3" />
              </Button>
            </div>
            <div className="space-y-3">
              {colItems.length === 0 ? (
                <div className="rounded-lg border border-dashed border-border p-6 text-center">
                  <p className="text-xs text-muted-foreground">No workflows</p>
                </div>
              ) : (
                colItems.map(wf => <WorkflowKanbanCard key={wf.id} workflow={wf} />)
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

function TableView({ items }: { items: Workflow[] }) {
  return (
    <div className="rounded-xl border border-border overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-muted/50 border-b border-border">
            <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">ID</th>
            <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Title</th>
            <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Status</th>
            <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Priority</th>
            <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Department</th>
            <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Assignee</th>
            <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Progress</th>
            <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Due Date</th>
            <th className="px-4 py-3" />
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {items.map((wf) => (
            <tr key={wf.id} className="hover:bg-muted/30 transition-colors group">
              <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{wf.id}</td>
              <td className="px-4 py-3">
                <span className="font-medium text-sm line-clamp-1">{wf.title}</span>
              </td>
              <td className="px-4 py-3"><StatusBadge status={wf.status} /></td>
              <td className="px-4 py-3"><PriorityBadge priority={wf.priority} /></td>
              <td className="px-4 py-3"><DepartmentBadge department={wf.department} /></td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarFallback className="text-[10px]">
                      {wf.assignee.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-xs">{wf.assignee}</span>
                </div>
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-2 w-28">
                  <Progress value={wf.progress} className="h-1.5 flex-1" />
                  <span className="text-xs text-muted-foreground w-7 text-right">{wf.progress}%</span>
                </div>
              </td>
              <td className="px-4 py-3 text-xs text-muted-foreground">{wf.dueDate}</td>
              <td className="px-4 py-3">
                <Link to={`/workflows/${wf.id}`}>
                  <Button variant="ghost" size="icon" className="h-7 w-7 opacity-0 group-hover:opacity-100">
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function TimelineView({ items }: { items: Workflow[] }) {
  return (
    <div className="space-y-1">
      {/* Timeline header */}
      <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
        <div className="w-64 shrink-0" />
        {["Jun 30", "Jul 1", "Jul 2", "Jul 3", "Jul 4", "Jul 5", "Jul 6", "Jul 7", "Jul 8", "Jul 9", "Jul 10", "Jul 11", "Jul 12"].map(d => (
          <div key={d} className="w-16 shrink-0 text-center text-xs text-muted-foreground">{d}</div>
        ))}
      </div>
      {items.map((wf) => {
        const colors: Record<string, string> = {
          active: "bg-blue-500/20 border-blue-500/40 text-blue-600 dark:text-blue-400",
          pending: "bg-amber-500/20 border-amber-500/40 text-amber-600 dark:text-amber-400",
          completed: "bg-emerald-500/20 border-emerald-500/40 text-emerald-600 dark:text-emerald-400",
          escalated: "bg-red-500/20 border-red-500/40 text-red-600 dark:text-red-400",
          draft: "bg-muted border-border text-muted-foreground",
        }
        return (
          <div key={wf.id} className="flex items-center gap-2">
            <div className="w-64 shrink-0 flex items-center gap-2 pr-4">
              <StatusBadge status={wf.status} />
              <span className="text-xs font-medium truncate">{wf.title}</span>
            </div>
            <div className="flex gap-2 overflow-x-auto">
              {["Jun 30", "Jul 1", "Jul 2", "Jul 3", "Jul 4", "Jul 5", "Jul 6", "Jul 7", "Jul 8", "Jul 9", "Jul 10", "Jul 11", "Jul 12"].map((d, i) => {
                const active = i >= 2 && i <= Math.floor(2 + (wf.progress / 100) * 8)
                return (
                  <div key={d} className={`w-16 shrink-0 h-7 rounded border ${active ? colors[wf.status] : "border-transparent"}`} />
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default function WorkflowsPage() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [departmentFilter, setDepartmentFilter] = useState("all")
  const [assigneeFilter, setAssigneeFilter] = useState("all")
  const [createdDateFrom, setCreatedDateFrom] = useState("")
  const [createdDateTo, setCreatedDateTo] = useState("")
  const [sortBy, setSortBy] = useState<string>("dueDate")
  const [view, setView] = useState<"kanban" | "table" | "timeline">("kanban")
  const [showFilters, setShowFilters] = useState(false)

  const activeFilters = [
    statusFilter !== "all" && { key: "status", label: `Status: ${statusFilter}`, clear: () => setStatusFilter("all") },
    priorityFilter !== "all" && { key: "priority", label: `Priority: ${priorityFilter}`, clear: () => setPriorityFilter("all") },
    departmentFilter !== "all" && { key: "department", label: `Dept: ${departmentFilter}`, clear: () => setDepartmentFilter("all") },
    assigneeFilter !== "all" && { key: "assignee", label: `Assignee: ${assigneeFilter}`, clear: () => setAssigneeFilter("all") },
  ].filter(Boolean) as { key: string; label: string; clear: () => void }[]

  const filtered = workflows
    .filter(wf => {
      const matchSearch = wf.title.toLowerCase().includes(search.toLowerCase()) || wf.id.toLowerCase().includes(search.toLowerCase())
      const matchStatus = statusFilter === "all" || wf.status === statusFilter
      const matchPriority = priorityFilter === "all" || wf.priority === priorityFilter
      const matchDepartment = departmentFilter === "all" || wf.department === departmentFilter
      const matchAssignee = assigneeFilter === "all" || wf.assignee === assigneeFilter
      // Note: created date filtering would require a proper date field
      return matchSearch && matchStatus && matchPriority && matchDepartment && matchAssignee
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "dueDate":
          return a.dueDate.localeCompare(b.dueDate)
        case "priority": {
          const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 }
          return priorityOrder[a.priority] - priorityOrder[b.priority]
        }
        case "progress":
          return a.progress - b.progress
        case "title":
          return a.title.localeCompare(b.title)
        default:
          return 0
      }
    })

  const clearAllFilters = () => {
    setStatusFilter("all")
    setPriorityFilter("all")
    setDepartmentFilter("all")
    setAssigneeFilter("all")
    setCreatedDateFrom("")
    setCreatedDateTo("")
    setSearch("")
  }

  return (
    <div className="p-6 space-y-6 max-w-[1600px]">
      <PageHeader
        title="Workflow Center"
        description={`${filtered.length} of ${workflows.length} workflows`}
      >
        <Link to="/templates">
          <Button variant="outline" size="sm" className="gap-1.5">
            <GitBranch className="h-3.5 w-3.5" />
            Templates
          </Button>
        </Link>
        <Link to="/workflows/new">
          <Button size="sm" className="gap-1.5">
            <Plus className="h-3.5 w-3.5" />
            New workflow
          </Button>
        </Link>
      </PageHeader>

      {/* Toolbar */}
      <div className="space-y-3">
        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative flex-1 min-w-48 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <Input
              placeholder="Search workflows..."
              className="pl-9 h-8 text-sm"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-36 h-8 text-sm">
              <SelectValue placeholder="All statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="escalated">Escalated</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
            </SelectContent>
          </Select>

          <Select value={priorityFilter} onValueChange={setPriorityFilter}>
            <SelectTrigger className="w-32 h-8 text-sm">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All priorities</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant={showFilters ? "secondary" : "outline"}
            size="sm"
            className="gap-1.5 h-8"
            onClick={() => setShowFilters(!showFilters)}
          >
            <SlidersHorizontal className="h-3.5 w-3.5" />
            Filters
            {activeFilters.length > 0 && (
              <Badge variant="default" className="h-4 px-1 text-[10px]">{activeFilters.length}</Badge>
            )}
          </Button>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-36 h-8 text-sm ml-auto">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="dueDate">Due Date</SelectItem>
              <SelectItem value="priority">Priority</SelectItem>
              <SelectItem value="progress">Progress</SelectItem>
              <SelectItem value="title">Title</SelectItem>
            </SelectContent>
          </Select>

          <div className="ml-2 flex items-center gap-1 border border-border rounded-lg p-0.5">
            <Button
              variant={view === "kanban" ? "secondary" : "ghost"}
              size="icon"
              className="h-7 w-7"
              onClick={() => setView("kanban")}
            >
              <LayoutGrid className="h-3.5 w-3.5" />
            </Button>
            <Button
              variant={view === "table" ? "secondary" : "ghost"}
              size="icon"
              className="h-7 w-7"
              onClick={() => setView("table")}
            >
              <Table2 className="h-3.5 w-3.5" />
            </Button>
            <Button
              variant={view === "timeline" ? "secondary" : "ghost"}
              size="icon"
              className="h-7 w-7"
              onClick={() => setView("timeline")}
            >
              <CalendarDays className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>

        {/* Active filter chips */}
        {activeFilters.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap">
            {activeFilters.map(filter => (
              <Badge key={filter.key} variant="secondary" className="gap-1 pr-1">
                {filter.label}
                <button onClick={filter.clear} className="ml-1 hover:bg-muted-foreground/20 rounded-sm p-0.5">
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
            <Button variant="ghost" size="sm" className="h-6 text-xs" onClick={clearAllFilters}>
              Clear all
            </Button>
          </div>
        )}

        {/* Expanded filters panel */}
        {showFilters && (
          <Card className="border-border">
            <CardContent className="p-4">
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-muted-foreground">Department</label>
                  <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                    <SelectTrigger className="h-8 text-sm">
                      <SelectValue placeholder="All departments" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All departments</SelectItem>
                      <SelectItem value="IT">IT</SelectItem>
                      <SelectItem value="HR">HR</SelectItem>
                      <SelectItem value="Facilities">Facilities</SelectItem>
                      <SelectItem value="Security">Security</SelectItem>
                      <SelectItem value="Administration">Administration</SelectItem>
                      <SelectItem value="Finance">Finance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-muted-foreground">Assignee</label>
                  <Select value={assigneeFilter} onValueChange={setAssigneeFilter}>
                    <SelectTrigger className="h-8 text-sm">
                      <SelectValue placeholder="All users" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All users</SelectItem>
                      {teamMembers.map(member => (
                        <SelectItem key={member} value={member}>{member}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-muted-foreground">Created From</label>
                  <Input
                    type="date"
                    value={createdDateFrom}
                    onChange={e => setCreatedDateFrom(e.target.value)}
                    className="h-8 text-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-muted-foreground">Created To</label>
                  <Input
                    type="date"
                    value={createdDateTo}
                    onChange={e => setCreatedDateTo(e.target.value)}
                    className="h-8 text-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-muted-foreground">Status</label>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="h-8 text-sm">
                      <SelectValue placeholder="All statuses" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All statuses</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="escalated">Escalated</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-muted-foreground">Priority</label>
                  <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                    <SelectTrigger className="h-8 text-sm">
                      <SelectValue placeholder="All priorities" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All priorities</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Content */}
      {filtered.length === 0 ? (
        <EmptyState
          icon={GitBranch}
          title="No workflows found"
          description="Try adjusting your search or filters to find what you're looking for."
          action={{ label: "Clear filters", onClick: clearAllFilters }}
        />
      ) : view === "kanban" ? (
        <KanbanView items={filtered} />
      ) : view === "table" ? (
        <TableView items={filtered} />
      ) : (
        <div className="rounded-xl border border-border bg-card p-6">
          <TimelineView items={filtered} />
        </div>
      )}
    </div>
  )
}
