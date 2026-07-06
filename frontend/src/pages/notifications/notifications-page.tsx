import {
  AlertTriangle,
  CheckCircle2,
  GitBranch,
  UserCheck,
  Bell,
  Settings,
  Trash2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

import { PageHeader } from "@/components/shared/page-header"

const notifications = {
  today: [
    {
      id: 1,
      type: "escalation",
      icon: AlertTriangle,
      iconClass: "text-red-500",
      bgClass: "bg-red-500/10",
      title: "Workflow escalated",
      body: "WF-006 Printer Fleet Maintenance has been escalated due to SLA breach. Immediate attention required.",
      time: "2 minutes ago",
      read: false,
    },
    {
      id: 2,
      type: "completion",
      icon: CheckCircle2,
      iconClass: "text-emerald-500",
      bgClass: "bg-emerald-500/10",
      title: "Workflow completed",
      body: "Annual Software License Audit (WF-005) has been marked as completed by Alex Chen.",
      time: "14 minutes ago",
      read: false,
    },
    {
      id: 3,
      type: "assignment",
      icon: UserCheck,
      iconClass: "text-blue-500",
      bgClass: "bg-blue-500/10",
      title: "You've been assigned",
      body: "New workflow VPN Access Request – Remote Team (WF-008) has been assigned to you.",
      time: "28 minutes ago",
      read: false,
    },
    {
      id: 4,
      type: "new_workflow",
      icon: GitBranch,
      iconClass: "text-purple-500",
      bgClass: "bg-purple-500/10",
      title: "New workflow submitted",
      body: "Jordan Kim submitted New Employee Onboarding – Q3 Cohort (WF-003). Awaiting classification.",
      time: "1 hour ago",
      read: true,
    },
  ],
  yesterday: [
    {
      id: 5,
      type: "reminder",
      icon: Bell,
      iconClass: "text-amber-500",
      bgClass: "bg-amber-500/10",
      title: "Deadline approaching",
      body: "HVAC Maintenance – Building C (WF-002) is due in 2 days. Progress is at 20%.",
      time: "Yesterday at 4:30 PM",
      read: true,
    },
    {
      id: 6,
      type: "completion",
      icon: CheckCircle2,
      iconClass: "text-emerald-500",
      bgClass: "bg-emerald-500/10",
      title: "Workflow approved",
      body: "Your request for Security Badge Renewal Program (WF-004) has been approved.",
      time: "Yesterday at 2:15 PM",
      read: true,
    },
    {
      id: 7,
      type: "assignment",
      icon: UserCheck,
      iconClass: "text-blue-500",
      bgClass: "bg-blue-500/10",
      title: "Team reassignment",
      body: "IT Support Team has been reassigned to Server Infrastructure Upgrade (WF-001).",
      time: "Yesterday at 10:44 AM",
      read: true,
    },
  ],
  earlier: [
    {
      id: 8,
      type: "new_workflow",
      icon: GitBranch,
      iconClass: "text-purple-500",
      bgClass: "bg-purple-500/10",
      title: "New workflow created",
      body: "Server Infrastructure Upgrade (WF-001) was created and auto-classified as Critical/IT.",
      time: "Jun 28 at 9:14 AM",
      read: true,
    },
    {
      id: 9,
      type: "escalation",
      icon: AlertTriangle,
      iconClass: "text-red-500",
      bgClass: "bg-red-500/10",
      title: "System alert",
      body: "Analytics Agent went offline at 2:04 AM. Engineering team has been notified.",
      time: "Jun 27 at 11:05 PM",
      read: true,
    },
  ],
}

function NotificationGroup({ title, items }: { title: string; items: typeof notifications.today }) {
  const unreadCount = items.filter(n => !n.read).length
  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{title}</h2>
        {unreadCount > 0 && (
          <Badge variant="destructive" className="text-xs h-4 px-1.5">{unreadCount} new</Badge>
        )}
      </div>
      <Card>
        <CardContent className="p-0 divide-y divide-border">
          {items.map((notification) => (
            <div
              key={notification.id}
              className={`flex items-start gap-4 p-4 hover:bg-muted/30 transition-colors group ${!notification.read ? "bg-muted/20" : ""}`}
            >
              <div className={`h-8 w-8 rounded-full ${notification.bgClass} flex items-center justify-center shrink-0 mt-0.5`}>
                <notification.icon className={`h-4 w-4 ${notification.iconClass}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className={`text-sm font-medium ${!notification.read ? "text-foreground" : "text-muted-foreground"}`}>
                      {notification.title}
                    </p>
                    <p className="text-sm text-muted-foreground mt-0.5 leading-relaxed">{notification.body}</p>
                    <p className="text-xs text-muted-foreground/70 mt-1.5">{notification.time}</p>
                  </div>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                    {!notification.read && (
                      <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0 mt-1.5" />
                    )}
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

export default function NotificationsPage() {
  const totalUnread = [...notifications.today, ...notifications.yesterday, ...notifications.earlier].filter(n => !n.read).length

  return (
    <div className="p-6 space-y-6 max-w-[800px]">
      <PageHeader
        title="Notifications"
        description={`${totalUnread} unread notifications`}
      >
        <Button variant="ghost" size="sm" className="gap-1.5">
          <CheckCircle2 className="h-3.5 w-3.5" />
          Mark all read
        </Button>
        <Button variant="outline" size="sm" className="gap-1.5">
          <Settings className="h-3.5 w-3.5" />
          Preferences
        </Button>
      </PageHeader>

      <NotificationGroup title="Today" items={notifications.today} />
      <NotificationGroup title="Yesterday" items={notifications.yesterday} />
      <NotificationGroup title="Earlier" items={notifications.earlier} />
    </div>
  )
}
