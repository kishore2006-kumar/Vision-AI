import { Link } from "react-router-dom"
import { Clock, CircleCheck as CheckCircle2, TrendingUp, Zap, ChevronRight, ArrowUpRight, Code as Code2, FileSearch, Bug, TestTube, FileText, Database, GitPullRequest, Rocket } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { PageHeader } from "@/components/shared/page-header"
import { aiAgents, getRecentAgentRuns, agentHubSummary, type AIAgent, type AgentRun } from "@/lib/agents-data"

const agentIcons: Record<string, React.ElementType> = {
  "code-gen": Code2,
  "code-review": FileSearch,
  "debug": Bug,
  "unit-test": TestTube,
  "api-docs": FileText,
  "sql": Database,
  "github-pr": GitPullRequest,
  "devops": Rocket,
}

function AgentQuickLaunchCard({ agent }: { agent: AIAgent }) {
  const Icon = agentIcons[agent.id] || Zap

  return (
    <Link to={`/agents/${agent.id}`}>
      <Card className="hover:border-border/80 hover:shadow-md transition-all cursor-pointer group h-full">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className={`h-10 w-10 rounded-lg ${agent.color.replace('text-', 'bg-')}/10 flex items-center justify-center shrink-0`}>
              <Icon className={`h-5 w-5 ${agent.color}`} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-sm font-semibold group-hover:text-foreground truncate">{agent.shortName}</h3>
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className={`h-2 w-2 rounded-full ${agent.status === "available" ? "bg-emerald-500" : "bg-amber-500"}`} />
                </div>
              </div>
              <p className="text-xs text-muted-foreground line-clamp-2 mt-1">{agent.description}</p>
              <div className="flex items-center gap-3 mt-2">
                <span className="text-[10px] text-muted-foreground">{agent.metrics.avgResponseTime} avg</span>
                <span className="text-[10px] text-muted-foreground">{agent.metrics.successRate}% success</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

function RecentRunCard({ run }: { run: AgentRun }) {
  const statusConfig = {
    success: { color: "text-emerald-500", bg: "bg-emerald-500/10", icon: CheckCircle2 },
    failed: { color: "text-red-500", bg: "bg-red-500/10", icon: CheckCircle2 },
    running: { color: "text-blue-500", bg: "bg-blue-500/10", icon: Clock },
  }
  const config = statusConfig[run.status]
  const Icon = config.icon

  return (
    <Link to={`/agents/${run.agentId}`}>
      <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/40 transition-colors cursor-pointer group">
        <div className={`h-8 w-8 rounded-full ${config.bg} flex items-center justify-center shrink-0`}>
          <Icon className={`h-4 w-4 ${config.color}`} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium group-hover:text-foreground">{run.agentName}</span>
            <Badge variant="outline" className={`text-[10px] h-4 px-1 ${config.color} border-current`}>
              {run.status}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground truncate mt-0.5">{run.inputPreview}</p>
          <div className="flex items-center gap-3 mt-1">
            <span className="text-[10px] text-muted-foreground">{run.duration}</span>
            <span className="text-[10px] text-muted-foreground">{run.timestamp.split(",")[1]}</span>
          </div>
        </div>
        <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
      </div>
    </Link>
  )
}

export default function DashboardPage() {
  const recentRuns = getRecentAgentRuns(5)

  return (
    <div className="p-6 space-y-6 max-w-[1600px]">
      <PageHeader
        title="Welcome back"
        description="Your AI development workspace at a glance"
      >
        <Link to="/agents">
          <Button variant="outline" size="sm" className="gap-1.5">
            View all agents
            <ChevronRight className="h-3.5 w-3.5" />
          </Button>
        </Link>
      </PageHeader>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                <Zap className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Total Agents</p>
                <p className="text-2xl font-semibold">{agentHubSummary.totalAgents}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Available</p>
                <p className="text-2xl font-semibold">{agentHubSummary.availableAgents}</p>
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
                <p className="text-xs text-muted-foreground">Requests Today</p>
                <p className="text-2xl font-semibold">{agentHubSummary.totalRequestsToday.toLocaleString()}</p>
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
                <p className="text-xs text-muted-foreground">Avg Response</p>
                <p className="text-2xl font-semibold">{agentHubSummary.avgResponseTime}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Agent Quick Launch Grid */}
      <Card>
        <CardHeader className="pb-4 flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-base font-semibold">Quick Launch</CardTitle>
            <CardDescription className="text-xs">Start working with any AI agent instantly</CardDescription>
          </div>
          <Link to="/agents">
            <Button variant="ghost" size="sm" className="gap-1 text-xs h-7">
              View all
              <ChevronRight className="h-3 w-3" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
            {aiAgents.map(agent => (
              <AgentQuickLaunchCard key={agent.id} agent={agent} />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Bottom Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card>
          <CardHeader className="pb-4 flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-base font-semibold">Recent Agent Runs</CardTitle>
              <CardDescription className="text-xs">Your latest agent interactions</CardDescription>
            </div>
            <Link to="/activity">
              <Button variant="ghost" size="sm" className="gap-1 text-xs h-7">
                View all
                <ChevronRight className="h-3 w-3" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border">
              {recentRuns.map((run, index) => (
                <div key={run.id}>
                  <RecentRunCard run={run} />
                  {index < recentRuns.length - 1 && <Separator />}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Most Used Agents */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-semibold">Popular This Week</CardTitle>
            <CardDescription className="text-xs">Most-used agents across the platform</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {aiAgents
              .sort((a, b) => b.metrics.totalRequests - a.metrics.totalRequests)
              .slice(0, 5)
              .map((agent, index) => {
                const Icon = agentIcons[agent.id] || Zap
                return (
                  <Link key={agent.id} to={`/agents/${agent.id}`}>
                    <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/40 transition-colors cursor-pointer group">
                      <div className="w-6 text-center text-xs text-muted-foreground font-medium">
                        {index + 1}
                      </div>
                      <div className={`h-8 w-8 rounded-lg ${agent.color.replace('text-', 'bg-')}/10 flex items-center justify-center shrink-0`}>
                        <Icon className={`h-4 w-4 ${agent.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium group-hover:text-foreground">{agent.name}</p>
                        <p className="text-xs text-muted-foreground">{agent.metrics.successRate}% success rate</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-sm font-semibold">{(agent.metrics.totalRequests / 1000).toFixed(1)}K</p>
                        <p className="text-[10px] text-muted-foreground">requests</p>
                      </div>
                    </div>
                  </Link>
                )
              })}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
