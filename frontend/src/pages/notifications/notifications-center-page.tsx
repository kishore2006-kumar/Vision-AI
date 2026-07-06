import { useState } from "react"
import { Link } from "react-router-dom"
import {
  AlertTriangle,
  CheckCircle2,
  Bell,
  FileText,
  Bot,
  Workflow,
  Clock,
  Search,
  X,
  Check,
  Archive,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PageHeader } from "@/components/shared/page-header"
import { enterpriseNotifications, type EnterpriseNotification, type NotificationType, type NotificationPriority } from "@/lib/enterprise-data"

const typeConfig: Record<NotificationType, { icon: React.ElementType; color: string; bg: string }> = {
  alert: { icon: AlertTriangle, color: "text-red-500", bg: "bg-red-500/10" },
  approval: { icon: CheckCircle2, color: "text-purple-500", bg: "bg-purple-500/10" },
  workflow: { icon: Workflow, color: "text-blue-500", bg: "bg-blue-500/10" },
  automation: { icon: Bot, color: "text-cyan-500", bg: "bg-cyan-500/10" },
  system: { icon: FileText, color: "text-muted-foreground", bg: "bg-muted" },
  reminder: { icon: Clock, color: "text-amber-500", bg: "bg-amber-500/10" },
}

const priorityConfig: Record<NotificationPriority, { color: string; label: string }> = {
  critical: { color: "text-destructive", label: "Critical" },
  high: { color: "text-orange-500", label: "High" },
  medium: { color: "text-amber-500", label: "Medium" },
  low: { color: "text-muted-foreground", label: "Low" },
}

function NotificationCard({ notification, onMarkRead, onArchive }: {
  notification: EnterpriseNotification
  onMarkRead: () => void
  onArchive: () => void
}) {
  const type = typeConfig[notification.type]
  const priority = priorityConfig[notification.priority]
  const Icon = type.icon

  return (
    <Card className={`transition-all ${notification.read ? "opacity-70" : ""} hover:border-border/80`}>
      <CardContent className="p-4">
        <div className="flex gap-4">
          <div className={`shrink-0 h-10 w-10 rounded-xl ${type.bg} flex items-center justify-center`}>
            <Icon className={`h-5 w-5 ${type.color}`} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className={`text-sm font-medium ${notification.read ? "" : "font-semibold"}`}>
                  {notification.title}
                </h3>
                <Badge variant="outline" className={`text-xs ${priority.color} border-current`}>
                  {priority.label}
                </Badge>
                {!notification.read && (
                  <span className="h-2 w-2 rounded-full bg-primary" />
                )}
              </div>
              <span className="text-xs text-muted-foreground shrink-0">{notification.timestamp.split(",")[1]}</span>
            </div>
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{notification.message}</p>
            <div className="flex items-center gap-3 mt-3 flex-wrap">
              <Badge variant="secondary" className="text-xs">{notification.source}</Badge>
              <Badge variant="outline" className="text-xs">{notification.department}</Badge>
              {notification.workflowName && (
                <Link to={`/workflows/${notification.workflowId}`} className="text-xs text-primary hover:underline flex items-center gap-1">
                  {notification.workflowName}
                  <ExternalLink className="h-3 w-3" />
                </Link>
              )}
            </div>
            <div className="flex items-center gap-2 mt-3">
              {notification.actions.map(action => (
                <Button key={action.action} variant="outline" size="sm" className="h-7 text-xs">
                  {action.label}
                </Button>
              ))}
              <div className="flex-1" />
              {!notification.read && (
                <Button variant="ghost" size="sm" className="h-7 text-xs gap-1" onClick={onMarkRead}>
                  <Check className="h-3 w-3" />
                  Read
                </Button>
              )}
              <Button variant="ghost" size="sm" className="h-7 text-xs gap-1" onClick={onArchive}>
                <Archive className="h-3 w-3" />
                Archive
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function NotificationsCenterPage() {
  const [notifications, setNotifications] = useState(enterpriseNotifications)
  const [search, setSearch] = useState("")
  const [typeFilter, setTypeFilter] = useState<string>("all")
  const [priorityFilter, setPriorityFilter] = useState<string>("all")
  const [departmentFilter, setDepartmentFilter] = useState<string>("all")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [page, setPage] = useState(1)
  const pageSize = 10

  const filtered = notifications
    .filter(n => !n.archived)
    .filter(n => {
      const matchSearch = n.title.toLowerCase().includes(search.toLowerCase()) ||
        n.message.toLowerCase().includes(search.toLowerCase())
      const matchType = typeFilter === "all" || n.type === typeFilter
      const matchPriority = priorityFilter === "all" || n.priority === priorityFilter
      const matchDepartment = departmentFilter === "all" || n.department === departmentFilter
      const matchStatus = statusFilter === "all" ||
        (statusFilter === "unread" && !n.read) ||
        (statusFilter === "read" && n.read)
      return matchSearch && matchType && matchPriority && matchDepartment && matchStatus
    })

  const unread = notifications.filter(n => !n.read && !n.archived)
  const critical = notifications.filter(n => n.priority === "critical" && !n.archived)
  const approvals = notifications.filter(n => n.type === "approval" && !n.archived)

  const totalPages = Math.ceil(filtered.length / pageSize)
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize)

  const handleMarkRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n))
  }

  const handleArchive = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, archived: true } : n))
  }

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  }

  const departments = ["all", "IT", "HR", "Security", "Administration", "Finance", "Operations"]
  const types = ["all", "alert", "approval", "workflow", "automation", "system", "reminder"]
  const priorities = ["all", "critical", "high", "medium", "low"]

  return (
    <div className="p-6 space-y-6 max-w-[1400px]">
      <PageHeader
        title="Notification Center"
        description={`${unread.length} unread notifications`}
      >
        <Button variant="outline" size="sm" className="gap-1.5" onClick={markAllRead}>
          <Check className="h-3.5 w-3.5" />
          Mark all read
        </Button>
        <Link to="/settings">
          <Button variant="outline" size="sm" className="gap-1.5">
            <Bell className="h-3.5 w-3.5" />
            Preferences
          </Button>
        </Link>
      </PageHeader>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="cursor-pointer hover:border-border/80 transition-all" onClick={() => setStatusFilter("unread")}>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Bell className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Unread</p>
                <p className="text-2xl font-semibold">{unread.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:border-border/80 transition-all" onClick={() => setPriorityFilter("critical")}>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-red-500/10 flex items-center justify-center">
                <AlertTriangle className="h-5 w-5 text-red-500" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Critical</p>
                <p className="text-2xl font-semibold">{critical.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:border-border/80 transition-all" onClick={() => setTypeFilter("approval")}>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
                <CheckCircle2 className="h-5 w-5 text-purple-500" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Approvals</p>
                <p className="text-2xl font-semibold">{approvals.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:border-border/80 transition-all" onClick={() => setStatusFilter("read")}>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-muted flex items-center justify-center">
                <FileText className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Read</p>
                <p className="text-2xl font-semibold">{notifications.filter(n => n.read && !n.archived).length}</p>
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
                placeholder="Search notifications..."
                className="pl-9 h-8 text-sm"
                value={search}
                onChange={e => { setSearch(e.target.value); setPage(1) }}
              />
            </div>
            <Select value={typeFilter} onValueChange={v => { setTypeFilter(v); setPage(1) }}>
              <SelectTrigger className="w-32 h-8 text-sm">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                {types.map(t => (
                  <SelectItem key={t} value={t} className="capitalize">{t === "all" ? "All types" : t}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={priorityFilter} onValueChange={v => { setPriorityFilter(v); setPage(1) }}>
              <SelectTrigger className="w-32 h-8 text-sm">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                {priorities.map(p => (
                  <SelectItem key={p} value={p} className="capitalize">{p === "all" ? "All priorities" : p}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={departmentFilter} onValueChange={v => { setDepartmentFilter(v); setPage(1) }}>
              <SelectTrigger className="w-32 h-8 text-sm">
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                {departments.map(d => (
                  <SelectItem key={d} value={d}>{d === "all" ? "All departments" : d}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={v => { setStatusFilter(v); setPage(1) }}>
              <SelectTrigger className="w-28 h-8 text-sm">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="unread">Unread</SelectItem>
                <SelectItem value="read">Read</SelectItem>
              </SelectContent>
            </Select>
            {(typeFilter !== "all" || priorityFilter !== "all" || departmentFilter !== "all" || statusFilter !== "all" || search) && (
              <Button
                variant="ghost"
                size="sm"
                className="h-8 text-xs gap-1"
                onClick={() => {
                  setTypeFilter("all")
                  setPriorityFilter("all")
                  setDepartmentFilter("all")
                  setStatusFilter("all")
                  setSearch("")
                  setPage(1)
                }}
              >
                <X className="h-3 w-3" />
                Clear
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All ({notifications.filter(n => !n.archived).length})</TabsTrigger>
          <TabsTrigger value="unread">Unread ({unread.length})</TabsTrigger>
          <TabsTrigger value="approvals">Approvals ({approvals.length})</TabsTrigger>
          <TabsTrigger value="alerts">Alerts ({notifications.filter(n => n.type === "alert" && !n.archived).length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <div className="space-y-3">
            {paginated.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <Bell className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground">No notifications found</p>
                </CardContent>
              </Card>
            ) : (
              paginated.map(notification => (
                <NotificationCard
                  key={notification.id}
                  notification={notification}
                  onMarkRead={() => handleMarkRead(notification.id)}
                  onArchive={() => handleArchive(notification.id)}
                />
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="unread" className="mt-6">
          <div className="space-y-3">
            {unread.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <CheckCircle2 className="h-8 w-8 text-emerald-500 mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground">All caught up!</p>
                </CardContent>
              </Card>
            ) : (
              unread.map(notification => (
                <NotificationCard
                  key={notification.id}
                  notification={notification}
                  onMarkRead={() => handleMarkRead(notification.id)}
                  onArchive={() => handleArchive(notification.id)}
                />
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="approvals" className="mt-6">
          <div className="space-y-3">
            {approvals.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <CheckCircle2 className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground">No pending approvals</p>
                </CardContent>
              </Card>
            ) : (
              approvals.map(notification => (
                <NotificationCard
                  key={notification.id}
                  notification={notification}
                  onMarkRead={() => handleMarkRead(notification.id)}
                  onArchive={() => handleArchive(notification.id)}
                />
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="alerts" className="mt-6">
          <div className="space-y-3">
            {notifications.filter(n => n.type === "alert" && !n.archived).length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <AlertTriangle className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground">No alerts</p>
                </CardContent>
              </Card>
            ) : (
              notifications.filter(n => n.type === "alert" && !n.archived).map(notification => (
                <NotificationCard
                  key={notification.id}
                  notification={notification}
                  onMarkRead={() => handleMarkRead(notification.id)}
                  onArchive={() => handleArchive(notification.id)}
                />
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={page === 1}
            onClick={() => setPage(p => p - 1)}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm text-muted-foreground">
            Page {page} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            disabled={page === totalPages}
            onClick={() => setPage(p => p + 1)}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  )
}
