import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Download } from "lucide-react"
import { PageHeader } from "@/components/shared/page-header"
import { StatCard } from "@/components/shared/stat-card"
import { ChartBar as BarChart3, Zap, Clock, Bot } from "lucide-react"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { aiAgents } from "@/lib/agents-data"

const weeklyData = [
  { day: "Mon", requests: 234, success: 228, avgTime: 2.1 },
  { day: "Tue", requests: 287, success: 279, avgTime: 2.3 },
  { day: "Wed", requests: 312, success: 305, avgTime: 2.0 },
  { day: "Thu", requests: 298, success: 291, avgTime: 2.2 },
  { day: "Fri", requests: 256, success: 250, avgTime: 2.1 },
  { day: "Sat", requests: 124, success: 121, avgTime: 2.4 },
  { day: "Sun", requests: 89, success: 87, avgTime: 2.5 },
]

const agentUsageData = [
  { agent: "Code Gen", requests: 12847, success: 98.2 },
  { agent: "Code Review", requests: 8234, success: 99.1 },
  { agent: "Debug", requests: 6129, success: 97.8 },
  { agent: "Unit Test", requests: 4521, success: 98.5 },
  { agent: "API Docs", requests: 2847, success: 99.2 },
  { agent: "SQL Agent", requests: 5632, success: 96.4 },
  { agent: "PR Review", requests: 3421, success: 97.1 },
  { agent: "DevOps", requests: 1892, success: 99.4 },
]

const responseTimeData = [
  { agent: "Code Gen", p50: 2.1, p90: 3.8, p99: 5.2 },
  { agent: "Code Review", p50: 2.8, p90: 4.5, p99: 6.8 },
  { agent: "Debug", p50: 2.4, p90: 4.1, p99: 6.2 },
  { agent: "Unit Test", p50: 3.2, p90: 5.4, p99: 8.1 },
  { agent: "API Docs", p50: 1.8, p90: 3.2, p99: 4.9 },
  { agent: "SQL Agent", p50: 1.5, p90: 2.8, p99: 4.2 },
  { agent: "PR Review", p50: 3.8, p90: 6.2, p99: 9.4 },
  { agent: "DevOps", p50: 1.0, p90: 2.1, p99: 3.2 },
]

const successRateTrend = [
  { week: "W1", rate: 97.2 },
  { week: "W2", rate: 97.8 },
  { week: "W3", rate: 98.1 },
  { week: "W4", rate: 97.9 },
  { week: "W5", rate: 98.3 },
  { week: "W6", rate: 98.5 },
  { week: "W7", rate: 98.2 },
]

const chartConfig = {
  requests: { label: "Total Requests", color: "var(--chart-1)" },
  success: { label: "Successful", color: "var(--chart-2)" },
  avgTime: { label: "Avg Time (s)", color: "var(--chart-3)" },
  rate: { label: "Success Rate %", color: "var(--chart-2)" },
  p50: { label: "Median", color: "var(--chart-2)" },
  p90: { label: "P90", color: "var(--chart-3)" },
  p99: { label: "P99", color: "var(--chart-5)" },
}

const totalRequests = aiAgents.reduce((sum, a) => sum + a.metrics.totalRequests, 0)
const avgSuccessRate = (aiAgents.reduce((sum, a) => sum + a.metrics.successRate, 0) / aiAgents.length).toFixed(1)

export default function AnalyticsPage() {
  return (
    <div className="p-6 space-y-6 max-w-[1600px]">
      <PageHeader
        title="Analytics"
        description="Agent performance metrics and usage insights"
      >
        <Select defaultValue="7d">
          <SelectTrigger className="w-32 h-8 text-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="24h">Last 24 hours</SelectItem>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="90d">Last 90 days</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" size="sm" className="gap-1.5 h-8">
          <Download className="h-3.5 w-3.5" />
          Export
        </Button>
      </PageHeader>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Requests"
          value={(totalRequests / 1000).toFixed(1) + "K"}
          description="All-time requests"
          icon={BarChart3}
          trend={{ value: 24, label: "vs last week" }}
        />
        <StatCard
          title="Success Rate"
          value={avgSuccessRate + "%"}
          description="Across all agents"
          icon={Zap}
          variant="success"
          trend={{ value: 2, label: "improvement" }}
        />
        <StatCard
          title="Avg Response"
          value="2.4s"
          description="Mean latency"
          icon={Clock}
          variant="info"
          trend={{ value: -12, label: "faster" }}
        />
        <StatCard
          title="Active Agents"
          value={aiAgents.length.toString()}
          description="All operational"
          icon={Bot}
          variant="success"
        />
      </div>

      {/* Row 1 */}
      <div className="grid lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base font-semibold">Request Volume</CardTitle>
                <CardDescription className="text-xs">Daily agent requests this week</CardDescription>
              </div>
              <Badge variant="secondary" className="text-xs">+18% vs last week</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-56 w-full">
              <AreaChart data={weeklyData}>
                <defs>
                  <linearGradient id="gradRequests" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--chart-1)" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="var(--chart-1)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gradSuccess" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--chart-2)" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="var(--chart-2)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area type="monotone" dataKey="requests" stroke="var(--chart-1)" strokeWidth={2} fill="url(#gradRequests)" name="Requests" />
                <Area type="monotone" dataKey="success" stroke="var(--chart-2)" strokeWidth={2} fill="url(#gradSuccess)" name="Success" />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold">Success Rate Trend</CardTitle>
            <CardDescription className="text-xs">Weekly success rate over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-56 w-full">
              <LineChart data={successRateTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="week" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                <YAxis domain={[95, 100]} tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} unit="%" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line type="monotone" dataKey="rate" stroke="var(--chart-2)" strokeWidth={2.5} dot={{ r: 4, fill: "var(--chart-2)" }} name="Success %" />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Row 2 */}
      <div className="grid lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold">Response Time by Agent</CardTitle>
            <CardDescription className="text-xs">P50, P90, and P99 latency in seconds</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-52 w-full">
              <BarChart data={responseTimeData} barCategoryGap="20%">
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="agent" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} angle={-20} textAnchor="end" height={60} />
                <YAxis tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} unit="s" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="p50" fill="var(--chart-2)" radius={[2, 2, 0, 0]} name="Median" />
                <Bar dataKey="p90" fill="var(--chart-3)" radius={[2, 2, 0, 0]} name="P90" />
                <Bar dataKey="p99" fill="var(--chart-5)" radius={[2, 2, 0, 0]} name="P99" />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold">Agent Usage Distribution</CardTitle>
            <CardDescription className="text-xs">Total requests per agent</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-52 w-full">
              <BarChart data={agentUsageData} layout="vertical" barCategoryGap="15%">
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                <YAxis dataKey="agent" type="category" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} width={80} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="requests" fill="var(--chart-1)" radius={[0, 3, 3, 0]} name="Requests" />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Agent Performance Table */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">Agent Performance Scorecard</CardTitle>
          <CardDescription className="text-xs">Key metrics for each AI agent</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/50 border-b border-border">
                <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground">Agent</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Total Requests</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Success Rate</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Avg Response</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Last Used</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {aiAgents.map((agent) => (
                <tr key={agent.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-3 font-medium">{agent.name}</td>
                  <td className="px-4 py-3 tabular-nums">{agent.metrics.totalRequests.toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <span className={`${agent.metrics.successRate >= 98 ? "text-emerald-600 dark:text-emerald-400" : agent.metrics.successRate >= 95 ? "text-amber-600 dark:text-amber-400" : "text-red-600 dark:text-red-400"}`}>
                      {agent.metrics.successRate}%
                    </span>
                  </td>
                  <td className="px-4 py-3 tabular-nums">{agent.metrics.avgResponseTime}</td>
                  <td className="px-4 py-3 text-muted-foreground">{agent.metrics.lastUsed}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}
