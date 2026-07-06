import { Link } from "react-router-dom"
import { CircleCheck as CheckCircle2, Clock, RefreshCw, TrendingUp, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PageHeader } from "@/components/shared/page-header"
import { aiAgents, type AIAgent } from "@/lib/agents-data"

const statusConfig = {
  available: { color: "text-emerald-500", bg: "bg-emerald-500", label: "Available" },
  busy: { color: "text-amber-500", bg: "bg-amber-500", label: "Busy" },
  offline: { color: "text-muted-foreground", bg: "bg-muted-foreground", label: "Offline" },
}

function AgentCard({ agent }: { agent: AIAgent }) {
  const status = statusConfig[agent.status]
  const Icon = agent.icon

  return (
    <Link to={`/agents/${agent.id}`}>
      <Card className="hover:border-border/80 hover:shadow-md transition-all cursor-pointer group h-full">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className={`h-11 w-11 rounded-xl ${agent.color.replace('text-', 'bg-')}/10 flex items-center justify-center`}>
                <Icon className={`h-5.5 w-5.5 ${agent.color}`} />
              </div>
              <div>
                <h3 className="text-sm font-semibold group-hover:text-foreground">{agent.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex items-center gap-1.5">
                    <span className={`h-2 w-2 rounded-full ${status.bg}`} />
                    <span className={`text-xs ${status.color}`}>{status.label}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-xs text-muted-foreground line-clamp-2">{agent.description}</p>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-2.5 rounded bg-muted/30">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Total Requests</p>
              <p className="text-lg font-semibold mt-0.5">{agent.metrics.totalRequests.toLocaleString()}</p>
            </div>
            <div className="p-2.5 rounded bg-muted/30">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Success Rate</p>
              <div className="flex items-center gap-1 mt-0.5">
                <p className="text-lg font-semibold">{agent.metrics.successRate}%</p>
              </div>
            </div>
            <div className="p-2.5 rounded bg-muted/30">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Avg Response</p>
              <p className="text-lg font-semibold mt-0.5">{agent.metrics.avgResponseTime}</p>
            </div>
            <div className="p-2.5 rounded bg-muted/30">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Last Used</p>
              <p className="text-sm font-semibold mt-1">{agent.metrics.lastUsed}</p>
            </div>
          </div>

          {/* Capabilities */}
          <div className="flex flex-wrap gap-1.5">
            {agent.capabilities.slice(0, 3).map(cap => (
              <Badge key={cap} variant="outline" className="text-[10px] px-1.5 py-0 h-4">{cap}</Badge>
            ))}
            {agent.capabilities.length > 3 && (
              <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-4">+{agent.capabilities.length - 3}</Badge>
            )}
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-border">
            <span className="text-xs text-muted-foreground">{agent.metrics.totalRequests.toLocaleString()} total runs</span>
            <span className="text-xs text-muted-foreground">Success: {agent.metrics.successRate}%</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

export default function AgentsHubPage() {
  const availableCount = aiAgents.filter(a => a.status === "available").length
  const totalRequests = aiAgents.reduce((sum, a) => sum + a.metrics.totalRequests, 0)
  const avgSuccessRate = (aiAgents.reduce((sum, a) => sum + a.metrics.successRate, 0) / aiAgents.length).toFixed(1)

  return (
    <div className="p-6 space-y-6 max-w-[1600px]">
      <PageHeader
        title="Agents Hub"
        description="AI-powered developer agents to supercharge your workflow"
      >
        <Button variant="outline" size="sm" className="gap-1.5">
          <RefreshCw className="h-3.5 w-3.5" />
          Refresh
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
                <p className="text-xs text-muted-foreground">Available Agents</p>
                <p className="text-2xl font-semibold">{availableCount}/{aiAgents.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                <Zap className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Total Agents</p>
                <p className="text-2xl font-semibold">{aiAgents.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-purple-500" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Total Requests</p>
                <p className="text-2xl font-semibold">{(totalRequests / 1000).toFixed(1)}K</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-cyan-500/10 flex items-center justify-center">
                <Clock className="h-5 w-5 text-cyan-500" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Avg Success Rate</p>
                <p className="text-2xl font-semibold">{avgSuccessRate}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Agent Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {aiAgents.map(agent => (
          <AgentCard key={agent.id} agent={agent} />
        ))}
      </div>
    </div>
  )
}
