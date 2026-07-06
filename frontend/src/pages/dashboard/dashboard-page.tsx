import { Link } from "react-router-dom"
import {
  GitBranch,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Zap,
  TrendingUp,
  Activity,
  Users,
  Plus,
  ChevronRight,
  ArrowUpRight,
  Bell,
  Bot,
} from "lucide-react"
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { StatCard } from "@/components/shared/stat-card"
import { PageHeader } from "@/components/shared/page-header"
import { StatusBadge, PriorityBadge, DepartmentBadge } from "@/components/shared/workflow-badge"
import {
  workflows,
  workflowTrendData,
  departmentPerformanceData,
  weeklyProductivityData,
} from "@/lib/data"
import {
  dashboardSummary,
  automationAgentsData,
  getUnreadNotifications,
  activityEvents,
  type ActivityEvent,
} from "@/lib/enterprise-data"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const chartConfig = {
  created: { label: "Created", color: "var(--chart-1)" },
  completed: { label: "Completed", color: "var(--chart-2)" },
  escalated: { label: "Escalated", color: "var(--chart-5)" },
  tasks: { label: "Total Tasks", color: "var(--chart-1)" },
  automated: { label: "Automated", color: "var(--chart-2)" },
  completed_dept: { label: "Completed", color: "var(--chart-2)" },
  pending: { label: "Pending", color: "var(--chart-3)" },
}

const eventTypeIcon: Record<string, React.ElementType> = {
  workflow_created: GitBranch,
  workflow_assigned: Users,
  workflow_approved: CheckCircle2,
  workflow_completed: CheckCircle2,
  automation_started: Bot,
  automation_finished: Bot,
  sla_breach: AlertTriangle,
  escalation_triggered: AlertTriangle,
}

const eventStatusConfig = {
  success: { color: "text-emerald-500", bg: "bg-emerald-500/10" },
  failed: { color: "text-destructive", bg: "bg-destructive/10" },
  pending: { color: "text-blue-500", bg: "bg-blue-500/10" },
  warning: { color: "text-amber-500", bg: "bg-amber-500/10" },
}

function RecentEnterpriseEvent({ event }: { event: ActivityEvent }) {
  const Icon = eventTypeIcon[event.type] || Activity
  const status = eventStatusConfig[event.status]
  return (
    <div className="flex items-start gap-3">
      <div className={`h-7 w-7 rounded-full ${status.bg} flex items-center justify-center shrink-0 mt-0.5`}>
        <Icon className={`h-3.5 w-3.5 ${status.color}`} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium truncate">{event.title}</p>
        <p className="text-xs text-muted-foreground truncate">{event.description}</p>
        <p className="text-xs text-muted-foreground/70 mt-0.5">{event.timestamp.split(",")[1]}</p>
      </div>
    </div>
  )
}

export default function DashboardPage() {
  const pendingWorkflows = workflows.filter(w => w.status === "pending" || w.status === "active").slice(0, 4)
  const unreadNotifications = getUnreadNotifications()
  const healthyAgents = automationAgentsData.filter(a => a.health === "healthy").length
  const recentEvents = activityEvents.slice(0, 5)

  return (
    <div className="p-6 space-y-6 max-w-[1600px]">
      <PageHeader
        title="Operations Dashboard"
        description="Real-time overview of your organization's workflow performance"
      >
        <Link to="/workflows">
          <Button variant="outline" size="sm" className="gap-1.5">
            <GitBranch className="h-3.5 w-3.5" />
            View workflows
          </Button>
        </Link>
        <Link to="/workflows/new">
          <Button size="sm" className="gap-1.5">
            <Plus className="h-3.5 w-3.5" />
            New workflow
          </Button>
        </Link>
      </PageHeader>

      {/* KPI Grid - Connected to Enterprise Data */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Link to="/workflows">
          <StatCard
            title="Active Workflows"
            value={dashboardSummary.activeWorkflows.toString()}
            description="Across all departments"
            icon={GitBranch}
            variant="info"
            trend={{ value: 12, label: "vs last week" }}
            className="hover:border-border/80 hover:shadow-sm transition-all cursor-pointer"
          />
        </Link>
        <Link to="/notifications">
          <StatCard
            title="Pending Approvals"
            value={dashboardSummary.pendingApprovals.toString()}
            description="Awaiting action"
            icon={Clock}
            variant="warning"
            trend={{ value: -3, label: "vs yesterday" }}
            className="hover:border-border/80 hover:shadow-sm transition-all cursor-pointer"
          />
        </Link>
        <Link to="/workflows">
          <StatCard
            title="Completed Today"
            value={dashboardSummary.completedToday.toString()}
            description="Across all teams"
            icon={CheckCircle2}
            variant="success"
            trend={{ value: 8, label: "vs yesterday" }}
            className="hover:border-border/80 hover:shadow-sm transition-all cursor-pointer"
          />
        </Link>
        <Link to="/notifications">
          <StatCard
            title="SLA Breaches"
            value={dashboardSummary.slaBreaches.toString()}
            description="Requires immediate action"
            icon={AlertTriangle}
            variant={dashboardSummary.slaBreaches > 0 ? "danger" : "default"}
            trend={{ value: 1, label: "new today" }}
            className="hover:border-border/80 hover:shadow-sm transition-all cursor-pointer"
          />
        </Link>
        <Link to="/automation">
          <StatCard
            title="Automation Rate"
            value="94%"
            description="Of tasks fully automated"
            icon={Zap}
            variant="success"
            trend={{ value: 2, label: "vs last month" }}
            className="hover:border-border/80 hover:shadow-sm transition-all cursor-pointer"
          />
        </Link>
        <Link to="/automation">
          <StatCard
            title="Avg Resolution"
            value="2.4h"
            description="Mean time to resolve"
            icon={TrendingUp}
            variant="default"
            trend={{ value: -18, label: "improvement" }}
            className="hover:border-border/80 hover:shadow-sm transition-all cursor-pointer"
          />
        </Link>
        <Link to="/automation">
          <StatCard
            title="Agent Health"
            value={`${healthyAgents}/${dashboardSummary.agentsTotal}`}
            description="Agents operational"
            icon={Activity}
            variant={healthyAgents === dashboardSummary.agentsTotal ? "success" : "warning"}
            trend={{ value: 0, label: "stable" }}
            className="hover:border-border/80 hover:shadow-sm transition-all cursor-pointer"
          />
        </Link>
        <Link to="/activity">
          <StatCard
            title="Active Users"
            value="142"
            description="Currently online"
            icon={Users}
            variant="default"
            trend={{ value: 5, label: "vs yesterday" }}
            className="hover:border-border/80 hover:shadow-sm transition-all cursor-pointer"
          />
        </Link>
      </div>

      {/* Charts row 1 */}
      <div className="grid lg:grid-cols-3 gap-4">
        {/* Workflow trend */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-semibold">Workflow Trend</CardTitle>
            <CardDescription className="text-xs">Created vs completed workflows over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-52 w-full">
              <AreaChart data={workflowTrendData}>
                <defs>
                  <linearGradient id="colorCreated" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--chart-1)" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="var(--chart-1)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--chart-2)" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="var(--chart-2)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area type="monotone" dataKey="created" stroke="var(--chart-1)" strokeWidth={2} fill="url(#colorCreated)" />
                <Area type="monotone" dataKey="completed" stroke="var(--chart-2)" strokeWidth={2} fill="url(#colorCompleted)" />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Notifications Quick View */}
        <Card>
          <CardHeader className="pb-4 flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <Bell className="h-4 w-4" />
                Notifications
                {dashboardSummary.notificationsUnread > 0 && (
                  <Badge variant="default" className="h-5 px-1.5 text-xs">{dashboardSummary.notificationsUnread}</Badge>
                )}
              </CardTitle>
              <CardDescription className="text-xs">Recent alerts and updates</CardDescription>
            </div>
            <Link to="/notifications">
              <Button variant="ghost" size="sm" className="gap-1 text-xs h-7">
                View all
                <ChevronRight className="h-3 w-3" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {unreadNotifications.slice(0, 4).map(notif => (
              <Link key={notif.id} to="/notifications" className="block">
                <div className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted/40 transition-colors">
                  <div className={`h-2 w-2 rounded-full mt-1.5 shrink-0 ${
                    notif.priority === "critical" ? "bg-destructive" :
                    notif.priority === "high" ? "bg-orange-500" : "bg-amber-500"
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium truncate">{notif.title}</p>
                    <p className="text-xs text-muted-foreground truncate">{notif.timestamp.split(",")[1]}</p>
                  </div>
                </div>
              </Link>
            ))}
            {unreadNotifications.length === 0 && (
              <div className="text-center py-4">
                <CheckCircle2 className="h-6 w-6 text-emerald-500 mx-auto mb-2" />
                <p className="text-xs text-muted-foreground">All caught up!</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Charts row 2 */}
      <div className="grid lg:grid-cols-2 gap-4">
        {/* Department performance */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-semibold">Department Performance</CardTitle>
            <CardDescription className="text-xs">Completed vs pending workflows by department</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-48 w-full">
              <BarChart data={departmentPerformanceData} layout="vertical" barCategoryGap="30%">
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                <YAxis dataKey="department" type="category" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} width={72} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="completed" fill="var(--chart-2)" radius={[0, 3, 3, 0]} name="Completed" />
                <Bar dataKey="pending" fill="var(--chart-3)" radius={[0, 3, 3, 0]} name="Pending" />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Weekly productivity */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-semibold">Weekly Productivity</CardTitle>
            <CardDescription className="text-xs">Total tasks vs automated tasks this week</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-48 w-full">
              <BarChart data={weeklyProductivityData} barCategoryGap="30%">
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="tasks" fill="var(--chart-1)" radius={[3, 3, 0, 0]} name="Total Tasks" />
                <Bar dataKey="automated" fill="var(--chart-2)" radius={[3, 3, 0, 0]} name="Automated" />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Bottom row */}
      <div className="grid lg:grid-cols-3 gap-4">
        {/* Pending tasks */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-4 flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-base font-semibold">Active Workflows</CardTitle>
              <CardDescription className="text-xs">Workflows requiring attention</CardDescription>
            </div>
            <Link to="/workflows">
              <Button variant="ghost" size="sm" className="gap-1 text-xs h-7">
                View all
                <ChevronRight className="h-3 w-3" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border">
              {pendingWorkflows.map((wf) => (
                <div key={wf.id} className="flex items-center gap-4 px-6 py-3.5 hover:bg-muted/40 transition-colors">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono text-muted-foreground">{wf.id}</span>
                      <StatusBadge status={wf.status} />
                      <PriorityBadge priority={wf.priority} />
                    </div>
                    <p className="text-sm font-medium truncate">{wf.title}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <DepartmentBadge department={wf.department} />
                      <span className="text-xs text-muted-foreground">Due {wf.dueDate}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1.5 shrink-0 w-28">
                    <span className="text-xs text-muted-foreground">{wf.progress}%</span>
                    <Progress value={wf.progress} className="h-1.5 w-full" />
                  </div>
                  <Link to={`/workflows/${wf.id}`}>
                    <Button variant="ghost" size="icon" className="h-7 w-7 shrink-0">
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Enterprise Activity */}
        <Card>
          <CardHeader className="pb-4 flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-base font-semibold">Recent Activity</CardTitle>
              <CardDescription className="text-xs">Enterprise events</CardDescription>
            </div>
            <Link to="/activity">
              <Button variant="ghost" size="sm" className="gap-1 text-xs h-7">
                View all
                <ChevronRight className="h-3 w-3" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentEvents.map((event, index) => (
              <div key={event.id}>
                <RecentEnterpriseEvent event={event} />
                {index < recentEvents.length - 1 && <Separator className="mt-3" />}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Agent health quick view - Connected to Enterprise Data */}
      <Card>
        <CardHeader className="pb-4 flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-base font-semibold">Agent Health Monitor</CardTitle>
            <CardDescription className="text-xs">Real-time automation agent status</CardDescription>
          </div>
          <Link to="/automation">
            <Button variant="ghost" size="sm" className="gap-1 text-xs h-7">
              Manage agents
              <ChevronRight className="h-3 w-3" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
            {automationAgentsData.map((agent) => (
              <Link key={agent.id} to={`/automation/${agent.id}`}>
                <div className="flex flex-col items-center gap-2 p-3 rounded-xl border border-border bg-muted/30 text-center hover:border-border/80 hover:shadow-sm transition-all cursor-pointer">
                  <div
                    className={`h-2.5 w-2.5 rounded-full ${
                      agent.health === "healthy"
                        ? "bg-emerald-500"
                        : agent.health === "degraded"
                          ? "bg-amber-500"
                          : "bg-destructive"
                    }`}
                  />
                  <p className="text-xs font-medium leading-none truncate w-full">{agent.name.split(" ")[0]}</p>
                  <p className={`text-sm font-bold tabular-nums ${
                    agent.health === "healthy" ? "text-emerald-500" :
                    agent.health === "degraded" ? "text-amber-500" : "text-destructive"
                  }`}>
                    {agent.metrics.successRate}%
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
