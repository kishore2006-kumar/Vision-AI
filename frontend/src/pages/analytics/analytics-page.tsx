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
import { Download, TrendingUp, TrendingDown } from "lucide-react"
import { PageHeader } from "@/components/shared/page-header"
import { StatCard } from "@/components/shared/stat-card"
import { BarChart3, Activity, Clock, Zap } from "lucide-react"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const monthlyData = [
  { month: "Jan", workflows: 142, completed: 128, escalated: 14, automated: 118, avgTime: 3.2 },
  { month: "Feb", workflows: 168, completed: 152, escalated: 16, automated: 141, avgTime: 2.9 },
  { month: "Mar", workflows: 194, completed: 181, escalated: 13, automated: 168, avgTime: 2.6 },
  { month: "Apr", workflows: 171, completed: 159, escalated: 12, automated: 150, avgTime: 2.8 },
  { month: "May", workflows: 223, completed: 207, escalated: 16, automated: 196, avgTime: 2.4 },
  { month: "Jun", workflows: 261, completed: 248, escalated: 13, automated: 235, avgTime: 2.2 },
  { month: "Jul", workflows: 198, completed: 186, escalated: 12, automated: 178, avgTime: 2.1 },
]

const resolutionTimeData = [
  { dept: "IT", p50: 1.8, p90: 4.2, p99: 8.1 },
  { dept: "Facilities", p50: 3.1, p90: 7.4, p99: 16.2 },
  { dept: "HR", p50: 1.2, p90: 3.8, p99: 7.4 },
  { dept: "Security", p50: 2.4, p90: 5.1, p99: 11.3 },
  { dept: "Admin", p50: 4.2, p90: 9.8, p99: 22.1 },
  { dept: "Maint.", p50: 5.1, p90: 12.4, p99: 28.6 },
]

const automationGrowthData = [
  { month: "Jan", rate: 82 },
  { month: "Feb", rate: 85 },
  { month: "Mar", rate: 87 },
  { month: "Apr", rate: 88 },
  { month: "May", rate: 88 },
  { month: "Jun", rate: 91 },
  { month: "Jul", rate: 94 },
]

const priorityTrendData = [
  { month: "Jan", critical: 8, high: 34, medium: 62, low: 38 },
  { month: "Feb", critical: 11, high: 42, medium: 74, low: 41 },
  { month: "Mar", critical: 7, high: 48, medium: 91, low: 48 },
  { month: "Apr", critical: 9, high: 38, medium: 81, low: 43 },
  { month: "May", critical: 13, high: 54, medium: 102, low: 54 },
  { month: "Jun", critical: 10, high: 63, medium: 124, low: 64 },
  { month: "Jul", critical: 8, high: 47, medium: 94, low: 49 },
]

const chartConfig = {
  workflows: { label: "Total", color: "var(--chart-1)" },
  completed: { label: "Completed", color: "var(--chart-2)" },
  escalated: { label: "Escalated", color: "var(--chart-5)" },
  automated: { label: "Automated", color: "var(--chart-1)" },
  avgTime: { label: "Avg Time (h)", color: "var(--chart-3)" },
  rate: { label: "Automation Rate %", color: "var(--chart-2)" },
  p50: { label: "Median", color: "var(--chart-2)" },
  p90: { label: "P90", color: "var(--chart-3)" },
  p99: { label: "P99", color: "var(--chart-5)" },
  critical: { label: "Critical", color: "var(--chart-5)" },
  high: { label: "High", color: "var(--chart-1)" },
  medium: { label: "Medium", color: "var(--chart-3)" },
  low: { label: "Low", color: "var(--chart-2)" },
}

export default function AnalyticsPage() {
  return (
    <div className="p-6 space-y-6 max-w-[1600px]">
      <PageHeader
        title="Analytics"
        description="Executive performance intelligence and operational insights"
      >
        <Select defaultValue="30d">
          <SelectTrigger className="w-32 h-8 text-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="90d">Last 90 days</SelectItem>
            <SelectItem value="12m">Last 12 months</SelectItem>
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
          title="Total Workflows"
          value="1,357"
          description="YTD"
          icon={BarChart3}
          trend={{ value: 24, label: "vs last period" }}
        />
        <StatCard
          title="Automation Rate"
          value="94.2%"
          description="AI-handled tasks"
          icon={Zap}
          variant="success"
          trend={{ value: 6, label: "vs last period" }}
        />
        <StatCard
          title="Mean Resolution"
          value="2.1h"
          description="Avg across all depts"
          icon={Clock}
          variant="info"
          trend={{ value: -34, label: "improvement" }}
        />
        <StatCard
          title="SLA Compliance"
          value="97.3%"
          description="Within agreed time"
          icon={Activity}
          variant="success"
          trend={{ value: 2, label: "vs last period" }}
        />
      </div>

      {/* Row 1 */}
      <div className="grid lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base font-semibold">Workflow Volume</CardTitle>
                <CardDescription className="text-xs">Monthly workflow activity over the past 7 months</CardDescription>
              </div>
              <Badge variant="secondary" className="text-xs">+24% YoY</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-56 w-full">
              <AreaChart data={monthlyData}>
                <defs>
                  <linearGradient id="gradWorkflows" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--chart-1)" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="var(--chart-1)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gradCompleted" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--chart-2)" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="var(--chart-2)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area type="monotone" dataKey="workflows" stroke="var(--chart-1)" strokeWidth={2} fill="url(#gradWorkflows)" name="Total" />
                <Area type="monotone" dataKey="completed" stroke="var(--chart-2)" strokeWidth={2} fill="url(#gradCompleted)" name="Completed" />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold">Automation Growth</CardTitle>
            <CardDescription className="text-xs">Automation rate over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-56 w-full">
              <LineChart data={automationGrowthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                <YAxis domain={[75, 100]} tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} unit="%" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line type="monotone" dataKey="rate" stroke="var(--chart-2)" strokeWidth={2.5} dot={{ r: 4, fill: "var(--chart-2)" }} name="Rate %" />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Row 2 */}
      <div className="grid lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold">Resolution Time by Department</CardTitle>
            <CardDescription className="text-xs">P50, P90, and P99 resolution times (hours)</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-52 w-full">
              <BarChart data={resolutionTimeData} barCategoryGap="25%">
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="dept" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} unit="h" />
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
            <CardTitle className="text-base font-semibold">Priority Trend</CardTitle>
            <CardDescription className="text-xs">Workflow volumes by priority level over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-52 w-full">
              <BarChart data={priorityTrendData} barCategoryGap="25%">
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="critical" stackId="a" fill="var(--chart-5)" name="Critical" />
                <Bar dataKey="high" stackId="a" fill="var(--chart-1)" name="High" />
                <Bar dataKey="medium" stackId="a" fill="var(--chart-3)" name="Medium" />
                <Bar dataKey="low" stackId="a" fill="var(--chart-2)" radius={[3, 3, 0, 0]} name="Low" />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Department efficiency table */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">Department Performance Scorecard</CardTitle>
          <CardDescription className="text-xs">Key performance indicators by department</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/50 border-b border-border">
                <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground">Department</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Total</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Completed</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">SLA Rate</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Avg Resolution</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Efficiency Score</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Trend</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                { dept: "HR", total: 312, completed: 298, sla: "97.8%", avg: "1.8h", score: 94, trend: 3 },
                { dept: "IT", total: 489, completed: 452, sla: "96.2%", avg: "2.4h", score: 89, trend: 2 },
                { dept: "Security", total: 148, completed: 134, sla: "94.1%", avg: "2.7h", score: 82, trend: -1 },
                { dept: "Facilities", total: 267, completed: 231, sla: "90.8%", avg: "3.1h", score: 72, trend: 4 },
                { dept: "Administration", total: 193, completed: 156, sla: "88.4%", avg: "4.2h", score: 68, trend: -2 },
                { dept: "Maintenance", total: 148, completed: 113, sla: "85.1%", avg: "5.1h", score: 62, trend: 1 },
              ].map((row) => (
                <tr key={row.dept} className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-3 font-medium">{row.dept}</td>
                  <td className="px-4 py-3 tabular-nums">{row.total}</td>
                  <td className="px-4 py-3 tabular-nums text-emerald-600 dark:text-emerald-400">{row.completed}</td>
                  <td className="px-4 py-3 tabular-nums">{row.sla}</td>
                  <td className="px-4 py-3 tabular-nums">{row.avg}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-1.5 rounded-full bg-muted overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            row.score >= 90 ? "bg-emerald-500" : row.score >= 75 ? "bg-blue-500" : row.score >= 60 ? "bg-amber-500" : "bg-red-500"
                          }`}
                          style={{ width: `${row.score}%` }}
                        />
                      </div>
                      <span className="text-xs font-medium tabular-nums">{row.score}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className={`flex items-center gap-1 text-xs font-medium ${row.trend > 0 ? "text-emerald-500" : "text-red-500"}`}>
                      {row.trend > 0 ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
                      {row.trend > 0 ? "+" : ""}{row.trend}%
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}
