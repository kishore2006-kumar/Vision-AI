import { Link, useParams } from "react-router-dom"
import {
  ArrowLeft,
  Activity,
  AlertTriangle,
  CheckCircle2,
  Cpu,
  MemoryStick,
  Pause,
  Play,
  RefreshCw,
  Settings,
  TrendingDown,
  TrendingUpIcon,
  Minus,
  FileText,
  History,
  BarChart3,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, AreaChart, Area } from "recharts"
import { getAgentById, agentExecutionHistory, agentPerformanceData } from "@/lib/enterprise-data"

const statusConfig = {
  running: { color: "text-emerald-500", bg: "bg-emerald-500/10", label: "Running" },
  idle: { color: "text-muted-foreground", bg: "bg-muted", label: "Idle" },
  paused: { color: "text-amber-500", bg: "bg-amber-500/10", label: "Paused" },
  error: { color: "text-destructive", bg: "bg-destructive/10", label: "Error" },
}

const healthConfig = {
  healthy: { color: "text-emerald-500", bg: "bg-emerald-500", label: "Healthy" },
  degraded: { color: "text-amber-500", bg: "bg-amber-500", label: "Degraded" },
  critical: { color: "text-destructive", bg: "bg-destructive", label: "Critical" },
}

const execStatusConfig = {
  running: { icon: Activity, color: "text-blue-500", bg: "bg-blue-500/10" },
  completed: { icon: CheckCircle2, color: "text-emerald-500", bg: "bg-emerald-500/10" },
  failed: { icon: AlertTriangle, color: "text-destructive", bg: "bg-destructive/10" },
}

export default function AgentDetailsPage() {
  const { id } = useParams()
  const agent = getAgentById(id || "")

  if (!agent) {
    return (
      <div className="p-6">
        <Link to="/automation" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Automation Center
        </Link>
        <div className="mt-12 text-center">
          <p className="text-muted-foreground">Agent not found</p>
        </div>
      </div>
    )
  }

  const status = statusConfig[agent.status]
  const health = healthConfig[agent.health]
  const performanceData = agentPerformanceData[agent.id] || []
  const executions = agentExecutionHistory.filter(e => e.agentId === agent.id)

  return (
    <div className="p-6 space-y-6 max-w-[1400px]">
      {/* Back */}
      <Link to="/automation" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to Automation Center
      </Link>

      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-4">
          <div className={`h-14 w-14 rounded-xl ${health.bg}/10 flex items-center justify-center`}>
            <Activity className={`h-7 w-7 ${health.color}`} />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-2xl font-bold tracking-tight">{agent.name}</h1>
              <Badge variant="outline" className={`text-xs ${status.color} border-current`}>
                {agent.status === "running" && <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse mr-1.5" />}
                {status.label}
              </Badge>
              <span className={`text-xs ${health.color}`}>{health.label}</span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">{agent.description}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-1.5">
            <Settings className="h-3.5 w-3.5" />
            Configure
          </Button>
          <Button variant="outline" size="sm" className="gap-1.5">
            <RefreshCw className="h-3.5 w-3.5" />
            Restart
          </Button>
          <Button size="sm" className="gap-1.5">
            {agent.status === "paused" ? (
              <>
                <Play className="h-3.5 w-3.5" />
                Resume
              </>
            ) : (
              <>
                <Pause className="h-3.5 w-3.5" />
                Pause
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Queue Length</p>
            <p className="text-2xl font-semibold mt-1">{agent.metrics.queueLength}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Completed Today</p>
            <p className="text-2xl font-semibold mt-1">{agent.metrics.tasksCompletedToday}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Avg Processing</p>
            <p className="text-2xl font-semibold mt-1">{agent.metrics.averageProcessingTime}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Success Rate</p>
            <div className="flex items-center gap-1.5 mt-1">
              <p className="text-2xl font-semibold">{agent.metrics.successRate}%</p>
              {agent.metrics.performanceTrend === "up" && <TrendingUpIcon className="h-4 w-4 text-emerald-500" />}
              {agent.metrics.performanceTrend === "down" && <TrendingDown className="h-4 w-4 text-destructive" />}
              {agent.metrics.performanceTrend === "stable" && <Minus className="h-4 w-4 text-muted-foreground" />}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Failed Tasks</p>
            <p className="text-2xl font-semibold mt-1 text-destructive">{agent.metrics.failedTasks}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Uptime</p>
            <p className="text-2xl font-semibold mt-1">{agent.metrics.uptime.split(" ")[0]}</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview" className="gap-1.5">
            <Activity className="h-3.5 w-3.5" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="performance" className="gap-1.5">
            <BarChart3 className="h-3.5 w-3.5" />
            Performance
          </TabsTrigger>
          <TabsTrigger value="executions" className="gap-1.5">
            <History className="h-3.5 w-3.5" />
            Executions
          </TabsTrigger>
          <TabsTrigger value="logs" className="gap-1.5">
            <FileText className="h-3.5 w-3.5" />
            Logs
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6 space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Health Metrics */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold">Health Metrics</CardTitle>
                <CardDescription className="text-xs">System resource utilization</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground flex items-center gap-2">
                      <Cpu className="h-4 w-4" /> CPU Usage
                    </span>
                    <span className="font-medium">{agent.metrics.cpuUsage}%</span>
                  </div>
                  <Progress value={agent.metrics.cpuUsage} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground flex items-center gap-2">
                      <MemoryStick className="h-4 w-4" /> Memory Usage
                    </span>
                    <span className="font-medium">{agent.metrics.memoryUsage} GB / 8 GB</span>
                  </div>
                  <Progress value={agent.metrics.memoryUsage / 8 * 100} className="h-2" />
                </div>
                <Separator />
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Last Execution</span>
                  <span className="font-medium">{agent.metrics.lastExecutionTime}</span>
                </div>
              </CardContent>
            </Card>

            {/* Current Activity */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold">Current Activity</CardTitle>
                <CardDescription className="text-xs">Active workflow and queue status</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {agent.currentWorkflow ? (
                  <div className="p-3 rounded-lg border border-border bg-muted/30">
                    <div className="flex items-center gap-2 mb-2">
                      <Activity className="h-4 w-4 text-blue-500 animate-pulse" />
                      <span className="text-xs text-muted-foreground">Processing</span>
                    </div>
                    <p className="text-sm font-medium">{agent.currentWorkflow}</p>
                    <Link to={`/workflows/${agent.currentWorkflowId}`} className="text-xs text-primary hover:underline mt-1 inline-block">
                      View workflow →
                    </Link>
                  </div>
                ) : (
                  <div className="p-3 rounded-lg border border-dashed border-border text-center">
                    <p className="text-sm text-muted-foreground">No active workflow</p>
                  </div>
                )}
                <Separator />
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Queue Depth</span>
                  <Badge variant="secondary">{agent.metrics.queueLength} pending</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Capabilities */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold">Capabilities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {agent.capabilities.map(cap => (
                    <Badge key={cap} variant="outline" className="text-xs">{cap}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Error */}
            {agent.lastError && (
              <Card className="border-destructive/30">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-semibold flex items-center gap-2 text-destructive">
                    <AlertTriangle className="h-4 w-4" />
                    Recent Error
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{agent.lastError}</p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="performance" className="mt-6 space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold">Tasks Completed (7 Days)</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={{}} className="h-64">
                  <AreaChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                    <XAxis dataKey="date" className="text-xs" />
                    <YAxis className="text-xs" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Area type="monotone" dataKey="tasksCompleted" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.2} />
                  </AreaChart>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold">Success Rate (7 Days)</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={{}} className="h-64">
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                    <XAxis dataKey="date" className="text-xs" />
                    <YAxis domain={[90, 100]} className="text-xs" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line type="monotone" dataKey="successRate" stroke="hsl(var(--chart-2))" strokeWidth={2} dot={{ fill: "hsl(var(--chart-2))" }} />
                  </LineChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="executions" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-semibold">Recent Executions</CardTitle>
              <CardDescription className="text-xs">Agent workflow processing history</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {executions.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-sm text-muted-foreground">No recent executions</p>
                  </div>
                ) : (
                  executions.map(exec => {
                    const execStatus = execStatusConfig[exec.status]
                    return (
                      <div key={exec.id} className="flex gap-4 p-4 rounded-lg border border-border">
                        <div className={`shrink-0 h-10 w-10 rounded-full ${execStatus.bg} flex items-center justify-center`}>
                          <execStatus.icon className={`h-5 w-5 ${execStatus.color}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-sm font-medium">{exec.workflowName}</span>
                            <Badge variant="outline" className={`text-xs ${execStatus.color} border-current capitalize`}>
                              {exec.status}
                            </Badge>
                            <span className="text-xs text-muted-foreground ml-auto">{exec.duration}</span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">{exec.result}</p>
                          <p className="text-xs text-muted-foreground mt-2">{exec.details}</p>
                          <div className="flex items-center gap-4 mt-2">
                            <span className="text-xs text-muted-foreground">Started: {exec.startTime}</span>
                            {exec.endTime && <span className="text-xs text-muted-foreground">Ended: {exec.endTime}</span>}
                          </div>
                        </div>
                      </div>
                    )
                  })
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logs" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-semibold">Agent Logs</CardTitle>
              <CardDescription className="text-xs">System and debug logs</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border font-mono text-xs">
                {[
                  { time: "14:32:18", level: "info", message: "Workflow WF-001 validation started" },
                  { time: "14:32:18", level: "info", message: "Policy compliance check: PASS" },
                  { time: "14:32:18", level: "info", message: "Field validation complete: 12/12 fields valid" },
                  { time: "14:32:19", level: "info", message: "SLA tier determined: Critical (8h target)" },
                  { time: "14:32:19", level: "success", message: "Validation complete for WF-001" },
                  { time: "14:28:33", level: "warn", message: "High queue depth detected: 12 pending" },
                  { time: "14:15:00", level: "info", message: "Heartbeat: agent healthy" },
                  { time: "14:00:00", level: "info", message: "Scheduled health check: PASS" },
                ].map((log, i) => (
                  <div key={i} className="flex items-start gap-4 px-6 py-3">
                    <span className="text-muted-foreground/70 shrink-0">{log.time}</span>
                    <Badge
                      variant="outline"
                      className={`text-[10px] h-4 px-1.5 shrink-0 ${
                        log.level === "warn" ? "text-amber-500 border-amber-500/30 bg-amber-500/10"
                        : log.level === "success" ? "text-emerald-500 border-emerald-500/30 bg-emerald-500/10"
                        : log.level === "error" ? "text-red-500 border-red-500/30 bg-red-500/10"
                        : "text-muted-foreground border-border bg-muted"
                      }`}
                    >
                      {log.level.toUpperCase()}
                    </Badge>
                    <span className="text-foreground/80">{log.message}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
