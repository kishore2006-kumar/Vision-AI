import { Link } from "react-router-dom"
import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Cpu,
  MemoryStick,
  Pause,
  Play,
  RefreshCw,
  TrendingDown,
  TrendingUpIcon,
  Minus,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import { PageHeader } from "@/components/shared/page-header"
import { automationAgentsData, type AutomationAgent } from "@/lib/enterprise-data"

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

function AgentCard({ agent }: { agent: AutomationAgent }) {
  const status = statusConfig[agent.status]
  const health = healthConfig[agent.health]
  const isRunning = agent.status === "running"

  return (
    <Link to={`/automation/${agent.id}`}>
      <Card className="hover:border-border/80 hover:shadow-md transition-all cursor-pointer group h-full">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className={`h-10 w-10 rounded-xl ${health.bg}/10 flex items-center justify-center`}>
                <Activity className={`h-5 w-5 ${health.color}`} />
              </div>
              <div>
                <CardTitle className="text-sm font-semibold group-hover:text-foreground">{agent.name}</CardTitle>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline" className={`text-xs ${status.color} border-current`}>
                    {isRunning && <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse mr-1.5" />}
                    {status.label}
                  </Badge>
                  <span className={`text-xs ${health.color}`}>{health.label}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Switch
                checked={agent.enabled}
                onCheckedChange={() => {}}
                onClick={(e) => e.stopPropagation()}
                className="scale-75"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-xs text-muted-foreground line-clamp-2">{agent.description}</p>

          {agent.currentWorkflow && (
            <div className="flex items-center gap-2 p-2 rounded bg-muted/30">
              <Clock className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Now:</span>
              <span className="text-xs font-medium truncate">{agent.currentWorkflow}</span>
            </div>
          )}

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-2 rounded bg-muted/20">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Queue</p>
              <p className="text-lg font-semibold mt-0.5">{agent.metrics.queueLength}</p>
            </div>
            <div className="p-2 rounded bg-muted/20">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Completed</p>
              <p className="text-lg font-semibold mt-0.5">{agent.metrics.tasksCompletedToday}</p>
            </div>
            <div className="p-2 rounded bg-muted/20">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Avg Time</p>
              <p className="text-lg font-semibold mt-0.5">{agent.metrics.averageProcessingTime}</p>
            </div>
            <div className="p-2 rounded bg-muted/20">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Success</p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <p className="text-lg font-semibold">{agent.metrics.successRate}%</p>
                {agent.metrics.performanceTrend === "up" && <TrendingUpIcon className="h-3 w-3 text-emerald-500" />}
                {agent.metrics.performanceTrend === "down" && <TrendingDown className="h-3 w-3 text-destructive" />}
                {agent.metrics.performanceTrend === "stable" && <Minus className="h-3 w-3 text-muted-foreground" />}
              </div>
            </div>
          </div>

          {/* Failed Tasks */}
          {agent.metrics.failedTasks > 0 && (
            <div className="flex items-center gap-2 text-xs text-destructive">
              <AlertTriangle className="h-3.5 w-3.5" />
              <span>{agent.metrics.failedTasks} failed task{agent.metrics.failedTasks > 1 ? "s" : ""} today</span>
            </div>
          )}

          {/* Resource Usage */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground flex items-center gap-1">
                <Cpu className="h-3 w-3" /> CPU
              </span>
              <span className="font-medium">{agent.metrics.cpuUsage}%</span>
            </div>
            <Progress value={agent.metrics.cpuUsage} className="h-1" />
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground flex items-center gap-1">
                <MemoryStick className="h-3 w-3" /> Memory
              </span>
              <span className="font-medium">{agent.metrics.memoryUsage} GB</span>
            </div>
            <Progress value={agent.metrics.memoryUsage / 8 * 100} className="h-1" />
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-border">
            <span className="text-xs text-muted-foreground">Last: {agent.metrics.lastExecutionTime.split(",")[1]}</span>
            <span className="text-xs text-muted-foreground">Uptime: {agent.metrics.uptime.split(" ")[0]}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

export default function AutomationPage() {
  const healthyCount = automationAgentsData.filter(a => a.health === "healthy").length
  const runningCount = automationAgentsData.filter(a => a.status === "running").length
  const totalQueue = automationAgentsData.reduce((sum, a) => sum + a.metrics.queueLength, 0)
  const totalCompleted = automationAgentsData.reduce((sum, a) => sum + a.metrics.tasksCompletedToday, 0)

  return (
    <div className="p-6 space-y-6 max-w-[1600px]">
      <PageHeader
        title="Automation Control Center"
        description="Monitor and manage intelligent automation agents"
      >
        <Button variant="outline" size="sm" className="gap-1.5">
          <RefreshCw className="h-3.5 w-3.5" />
          Refresh All
        </Button>
        <Button variant="outline" size="sm" className="gap-1.5">
          <Pause className="h-3.5 w-3.5" />
          Pause All
        </Button>
      </PageHeader>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Healthy Agents</p>
                <p className="text-2xl font-semibold">{healthyCount}/{automationAgentsData.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                <Play className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Running</p>
                <p className="text-2xl font-semibold">{runningCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
                <Activity className="h-5 w-5 text-amber-500" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Queue Depth</p>
                <p className="text-2xl font-semibold">{totalQueue}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
                <TrendingUpIcon className="h-5 w-5 text-purple-500" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Tasks Today</p>
                <p className="text-2xl font-semibold">{totalCompleted.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Agent Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {automationAgentsData.map(agent => (
          <AgentCard key={agent.id} agent={agent} />
        ))}
      </div>
    </div>
  )
}
