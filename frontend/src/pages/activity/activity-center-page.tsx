import { useState } from "react"
import { Link } from "react-router-dom"
import { CircleCheck as CheckCircle2, Bot, Clock, Search, RefreshCw, TrendingUp, CircleAlert as AlertCircle, Zap } from "lucide-react"
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
import { agentRunHistory, aiAgents, type AgentRun } from "@/lib/agents-data"

const agentColors: Record<string, string> = {
  "code-gen": "text-blue-500",
  "code-review": "text-amber-500",
  "debug": "text-red-500",
  "unit-test": "text-green-500",
  "api-docs": "text-cyan-500",
  "sql": "text-purple-500",
  "github-pr": "text-orange-500",
  "devops": "text-indigo-500",
}

function TimelineEvent({ run }: { run: AgentRun }) {
  const statusConfig = {
    success: { icon: CheckCircle2, color: "text-emerald-500", bg: "bg-emerald-500/10" },
    failed: { icon: AlertCircle, color: "text-red-500", bg: "bg-red-500/10" },
    running: { icon: Clock, color: "text-blue-500", bg: "bg-blue-500/10" },
  }
  const config = statusConfig[run.status]
  const Icon = config.icon
  const agentColor = agentColors[run.agentId] || "text-muted-foreground"

  return (
    <div className="flex gap-4 group">
      <div className="flex flex-col items-center">
        <div className={`h-10 w-10 rounded-full ${config.bg} flex items-center justify-center shrink-0 z-10`}>
          <Icon className={`h-5 w-5 ${config.color}`} />
        </div>
        <div className="w-0.5 flex-1 bg-border mt-2" />
      </div>

      <Card className="flex-1 mb-6 hover:border-border/80 hover:shadow-sm transition-all">
        <CardContent className="p-4">
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-sm font-semibold">{run.agentName}</h3>
                <Badge variant="outline" className={`text-xs ${config.color} border-current capitalize`}>
                  {run.status}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{run.inputPreview}</p>
            </div>
            <span className="text-xs text-muted-foreground shrink-0">{run.timestamp}</span>
          </div>

          <div className="flex items-center gap-3 mt-3 flex-wrap">
            <Link to={`/agents/${run.agentId}`} className="flex items-center gap-1 text-xs hover:underline">
              <Bot className={`h-3 w-3 ${agentColor}`} />
              View Agent
            </Link>
            <Badge variant="outline" className="text-xs">{run.duration}</Badge>
          </div>

          {run.outputPreview && (
            <div className="mt-3 p-2 rounded bg-muted/30 text-xs text-muted-foreground font-mono truncate">
              {run.outputPreview}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default function ActivityCenterPage() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [agentFilter, setAgentFilter] = useState<string>("all")

  const filtered = agentRunHistory.filter(run => {
    const matchSearch = run.agentName.toLowerCase().includes(search.toLowerCase()) ||
      run.inputPreview.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === "all" || run.status === statusFilter
    const matchAgent = agentFilter === "all" || run.agentId === agentFilter
    return matchSearch && matchStatus && matchAgent
  })

  const groupedByDate = filtered.reduce((groups, run) => {
    const date = new Date(run.timestamp).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    })
    if (!groups[date]) groups[date] = []
    groups[date].push(run)
    return groups
  }, {} as Record<string, AgentRun[]>)

  const successCount = agentRunHistory.filter(r => r.status === "success").length

  return (
    <div className="p-6 space-y-6 max-w-[1200px]">
      <PageHeader
        title="Activity Center"
        description="Track your AI agent runs and request history"
      >
        <Button variant="outline" size="sm" className="gap-1.5">
          <RefreshCw className="h-3.5 w-3.5" />
          Refresh
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
                <p className="text-xs text-muted-foreground">Total Runs</p>
                <p className="text-2xl font-semibold">{agentRunHistory.length}</p>
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
              <div className="h-10 w-10 rounded-xl bg-cyan-500/10 flex items-center justify-center">
                <Zap className="h-5 w-5 text-cyan-500" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Active Agents</p>
                <p className="text-2xl font-semibold">{aiAgents.length}</p>
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
                <p className="text-xs text-muted-foreground">Success Rate</p>
                <p className="text-2xl font-semibold">{Math.round((successCount / agentRunHistory.length) * 100)}%</p>
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
                placeholder="Search runs..."
                className="pl-9 h-8 text-sm"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <Select value={agentFilter} onValueChange={setAgentFilter}>
              <SelectTrigger className="w-40 h-8 text-sm">
                <SelectValue placeholder="Agent" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All agents</SelectItem>
                {aiAgents.map(agent => (
                  <SelectItem key={agent.id} value={agent.id}>{agent.shortName}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-28 h-8 text-sm">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All statuses</SelectItem>
                <SelectItem value="success">Success</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
                <SelectItem value="running">Running</SelectItem>
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
              {dateEvents.map(run => (
                <TimelineEvent key={run.id} run={run} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <Clock className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">No agent runs found</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
