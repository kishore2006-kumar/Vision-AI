import { useState } from "react"
import {
  FileText,
  BarChart3,
  Download,
  Eye,
  Clock,
  User,
  Building2,
  Pin,
  RefreshCw,
  Calendar,
  Search,
  MoreHorizontal,
  TrendingUp,
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"
import { PageHeader } from "@/components/shared/page-header"
import { EmptyState } from "@/components/shared/empty-state"
import { reportsData, type EnterpriseReport, type ReportType, type ReportStatus } from "@/lib/management-data"

const statusConfig: Record<ReportStatus, { color: string; bg: string; label: string }> = {
  ready: { color: "text-emerald-500", bg: "bg-emerald-500/10", label: "Ready" },
  generating: { color: "text-blue-500", bg: "bg-blue-500/10", label: "Generating" },
  scheduled: { color: "text-amber-500", bg: "bg-amber-500/10", label: "Scheduled" },
  failed: { color: "text-destructive", bg: "bg-destructive/10", label: "Failed" },
}

const typeConfig: Record<ReportType, { color: string; label: string }> = {
  executive: { color: "text-purple-500", label: "Executive" },
  workflow: { color: "text-blue-500", label: "Workflow" },
  department: { color: "text-amber-500", label: "Department" },
  automation: { color: "text-cyan-500", label: "Automation" },
  productivity: { color: "text-emerald-500", label: "Productivity" },
  performance: { color: "text-orange-500", label: "Performance" },
}

const typeIcons: Record<ReportType, React.ElementType> = {
  executive: BarChart3,
  workflow: FileText,
  department: Building2,
  automation: RefreshCw,
  productivity: TrendingUp,
  performance: TrendingUp,
}

function ReportCard({ report }: { report: EnterpriseReport }) {
  const status = statusConfig[report.status]
  const type = typeConfig[report.type]
  const Icon = typeIcons[report.type]

  return (
    <Card className="hover:border-border/80 hover:shadow-sm transition-all group">
      <CardContent className="p-5">
        <div className="flex items-start gap-4">
          <div className={`h-12 w-12 rounded-xl ${type.color.replace("text", "bg")}/10 flex items-center justify-center shrink-0`}>
            <Icon className={`h-6 w-6 ${type.color}`} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <h3 className="text-sm font-semibold group-hover:text-foreground truncate">{report.title}</h3>
              {report.pinned && <Pin className="h-3.5 w-3.5 text-amber-500" />}
              <Badge variant="outline" className={`text-xs ${type.color} border-current`}>
                {type.label}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{report.description}</p>

            <div className="flex items-center gap-4 text-xs text-muted-foreground flex-wrap">
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {report.generatedDate}
              </span>
              <span className="flex items-center gap-1">
                <User className="h-3 w-3" />
                {report.owner}
              </span>
              <span className="flex items-center gap-1">
                <Building2 className="h-3 w-3" />
                {report.department}
              </span>
            </div>

            {report.status === "generating" && (
              <div className="mt-3 flex items-center gap-2">
                <RefreshCw className="h-3.5 w-3.5 text-blue-500 animate-spin" />
                <span className="text-xs text-blue-500">Generating report...</span>
                <Progress value={45} className="h-1 flex-1" />
              </div>
            )}

            {report.status === "ready" && report.data.completionRate && (
              <div className="mt-3 grid grid-cols-3 gap-3">
                <div className="p-2 rounded bg-muted/30">
                  <p className="text-[10px] text-muted-foreground uppercase">Workflows</p>
                  <p className="text-sm font-semibold mt-0.5">{report.data.workflowsCount?.toLocaleString()}</p>
                </div>
                <div className="p-2 rounded bg-muted/30">
                  <p className="text-[10px] text-muted-foreground uppercase">Completion</p>
                  <p className="text-sm font-semibold mt-0.5">{report.data.completionRate}%</p>
                </div>
                <div className="p-2 rounded bg-muted/30">
                  <p className="text-[10px] text-muted-foreground uppercase">Avg Time</p>
                  <p className="text-sm font-semibold mt-0.5">{report.data.avgResolutionTime}</p>
                </div>
              </div>
            )}

            <div className="flex items-center gap-2 mt-4">
              <Badge variant={report.status === "ready" ? "outline" : "secondary"} className={`text-xs ${report.status === "ready" ? status.color : ""}`}>
                {status.label}
              </Badge>
              {report.scheduled && (
                <Badge variant="outline" className="text-xs gap-1">
                  <Clock className="h-3 w-3" />
                  {report.scheduleFrequency}
                </Badge>
              )}
              <span className="text-xs text-muted-foreground">{report.size}</span>
              <span className="text-xs text-muted-foreground ml-auto">{report.format}</span>
            </div>

            <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border">
              <Button variant="outline" size="sm" className="h-7 gap-1 flex-1" disabled={report.status !== "ready"}>
                <Eye className="h-3.5 w-3.5" />
                Preview
              </Button>
              <Button variant="outline" size="sm" className="h-7 gap-1 flex-1" disabled={report.status !== "ready"}>
                <Download className="h-3.5 w-3.5" />
                Download
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-7 w-7">
                    <MoreHorizontal className="h-3.5 w-3.5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>{report.pinned ? "Unpin" : "Pin"}</DropdownMenuItem>
                  <DropdownMenuItem>Schedule</DropdownMenuItem>
                  <DropdownMenuItem>Share</DropdownMenuItem>
                  <DropdownMenuItem>Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function ReportsCenterPage() {
  const [search, setSearch] = useState("")
  const [typeFilter, setTypeFilter] = useState<string>("all")
  const [statusFilter, setStatusFilter] = useState<string>("all")

  const filtered = reportsData.filter(report => {
    const matchSearch = report.title.toLowerCase().includes(search.toLowerCase()) ||
      report.description.toLowerCase().includes(search.toLowerCase())
    const matchType = typeFilter === "all" || report.type === typeFilter
    const matchStatus = statusFilter === "all" || report.status === statusFilter
    return matchSearch && matchType && matchStatus
  })

  const pinnedReports = reportsData.filter(r => r.pinned)

  const totalWorkflows = reportsData.reduce((sum, r) => sum + (r.data.workflowsCount || 0), 0)
  const avgCompletion = Math.round(reportsData.filter(r => r.data.completionRate).reduce((sum, r) => sum + (r.data.completionRate || 0), 0) / reportsData.filter(r => r.data.completionRate).length)

  return (
    <div className="p-6 space-y-6 max-w-[1600px]">
      <PageHeader
        title="Reports Center"
        description="Generate, schedule, and export enterprise reports"
      >
        <Button variant="outline" size="sm" className="gap-1.5">
          <RefreshCw className="h-3.5 w-3.5" />
          Refresh
        </Button>
        <Button size="sm" className="gap-1.5">
          <FileText className="h-3.5 w-3.5" />
          New Report
        </Button>
      </PageHeader>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                <FileText className="h-5 w-5 text-emerald-500" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Total Reports</p>
                <p className="text-2xl font-semibold">{reportsData.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                <RefreshCw className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Scheduled</p>
                <p className="text-2xl font-semibold">{reportsData.filter(r => r.scheduled).length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-amber-500" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Workflow Data</p>
                <p className="text-2xl font-semibold">{totalWorkflows.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
                <BarChart3 className="h-5 w-5 text-purple-500" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Avg Completion</p>
                <p className="text-2xl font-semibold">{avgCompletion}%</p>
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
                placeholder="Search reports..."
                className="pl-9 h-8 text-sm"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-36 h-8 text-sm">
                <SelectValue placeholder="Report type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All types</SelectItem>
                <SelectItem value="executive">Executive</SelectItem>
                <SelectItem value="workflow">Workflow</SelectItem>
                <SelectItem value="department">Department</SelectItem>
                <SelectItem value="automation">Automation</SelectItem>
                <SelectItem value="productivity">Productivity</SelectItem>
                <SelectItem value="performance">Performance</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-32 h-8 text-sm">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All statuses</SelectItem>
                <SelectItem value="ready">Ready</SelectItem>
                <SelectItem value="generating">Generating</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Pinned Reports */}
      {typeFilter === "all" && !search && pinnedReports.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Pin className="h-4 w-4 text-amber-500" />
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Pinned Reports</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {pinnedReports.map(report => (
              <ReportCard key={report.id} report={report} />
            ))}
          </div>
        </div>
      )}

      {/* All Reports */}
      <div>
        {typeFilter === "all" && !search && (
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">All Reports</h2>
            <Badge variant="secondary" className="text-xs">{filtered.length} reports</Badge>
          </div>
        )}
        {filtered.length === 0 ? (
          <EmptyState
            icon={FileText}
            title="No reports found"
            description="Try adjusting your search or filters"
          />
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map(report => (
              <ReportCard key={report.id} report={report} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
