import { Link } from "react-router-dom"
import {
  Building2,
  Users,
  Monitor,
  DollarSign,
  Settings,
  Shield,
  Scale,
  ClipboardList,
  Megaphone,
  TrendingUp,
  TrendingDown,
  Minus,
  User,
  Briefcase,
  ArrowUpRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { PageHeader } from "@/components/shared/page-header"
import { departmentsData, type DepartmentData } from "@/lib/management-data"

const iconMap: Record<string, React.ElementType> = {
  Users,
  Monitor,
  DollarSign,
  Settings,
  Shield,
  Scale,
  ClipboardList,
  Megaphone,
}

const trendConfig = {
  up: { icon: TrendingUp, color: "text-emerald-500" },
  down: { icon: TrendingDown, color: "text-destructive" },
  stable: { icon: Minus, color: "text-muted-foreground" },
}

function DepartmentCard({ department }: { department: DepartmentData }) {
  const Icon = iconMap[department.icon] || Building2
  const trend = trendConfig[department.performanceTrend]

  return (
    <Link to={`/departments/${department.id}`}>
      <Card className="hover:border-border/80 hover:shadow-sm transition-all cursor-pointer group h-full">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className={`h-11 w-11 rounded-xl ${department.bg} flex items-center justify-center shrink-0`}>
                <Icon className={`h-5.5 w-5.5 ${department.color}`} />
              </div>
              <div>
                <CardTitle className="text-sm font-semibold group-hover:text-foreground">{department.name}</CardTitle>
                <p className="text-xs text-muted-foreground mt-0.5">{department.location}</p>
              </div>
            </div>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-xs text-muted-foreground line-clamp-2">{department.description}</p>

          {/* Manager */}
          <div className="flex items-center gap-2">
            <User className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Manager:</span>
            <span className="text-xs font-medium">{department.manager}</span>
          </div>

          <Separator />

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-2.5 rounded-lg bg-muted/30">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
                <Users className="h-3 w-3" />
                Employees
              </div>
              <p className="text-lg font-semibold">{department.employeeCount}</p>
            </div>
            <div className="p-2.5 rounded-lg bg-muted/30">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
                <Briefcase className="h-3 w-3" />
                Active
              </div>
              <p className="text-lg font-semibold">{department.activeWorkflows}</p>
            </div>
            <div className="p-2.5 rounded-lg bg-muted/30">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
                <Monitor className="h-3 w-3" />
                Completed
              </div>
              <p className="text-lg font-semibold">{department.completedWorkflows}</p>
            </div>
            <div className="p-2.5 rounded-lg bg-muted/30">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
                <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                Avg Time
              </div>
              <p className="text-lg font-semibold">{department.avgCompletionTime}</p>
            </div>
          </div>

          <Separator />

          {/* Performance Score */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Performance Score</span>
              <div className="flex items-center gap-1">
                <span className={`font-semibold ${department.performanceScore >= 90 ? "text-emerald-500" : department.performanceScore >= 80 ? "text-amber-500" : ""}`}>
                  {department.performanceScore}
                </span>
                <trend.icon className={`h-3.5 w-3.5 ${trend.color}`} />
              </div>
            </div>
            <Progress value={department.performanceScore} className={`h-2 ${
              department.performanceScore >= 90 ? "[&>div]:bg-emerald-500" :
              department.performanceScore >= 80 ? "[&>div]:bg-amber-500" : ""
            }`} />
          </div>

          {/* Budget */}
          <div className="flex items-center justify-between pt-3 border-t border-border">
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <DollarSign className="h-3 w-3" />
              Budget
            </span>
            <span className="text-xs font-semibold">{department.budget}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

export default function DepartmentsPage() {
  const totalEmployees = departmentsData.reduce((sum, d) => sum + d.employeeCount, 0)
  const totalActive = departmentsData.reduce((sum, d) => sum + d.activeWorkflows, 0)
  const totalCompleted = departmentsData.reduce((sum, d) => sum + d.completedWorkflows, 0)
  const avgScore = Math.round(departmentsData.reduce((sum, d) => sum + d.performanceScore, 0) / departmentsData.length)

  return (
    <div className="p-6 space-y-6 max-w-[1600px]">
      <PageHeader
        title="Department Management"
        description={`${departmentsData.length} departments with ${totalEmployees} employees`}
      >
        <Link to="/reports">
          <Button variant="outline" size="sm" className="gap-1.5">
            <Building2 className="h-3.5 w-3.5" />
            Department Reports
          </Button>
        </Link>
        <Button size="sm" className="gap-1.5">
          <Settings className="h-3.5 w-3.5" />
          Configure
        </Button>
      </PageHeader>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                <Users className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Total Employees</p>
                <p className="text-2xl font-semibold">{totalEmployees}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
                <Briefcase className="h-5 w-5 text-amber-500" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Active Workflows</p>
                <p className="text-2xl font-semibold">{totalActive}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                <Monitor className="h-5 w-5 text-emerald-500" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Completed</p>
                <p className="text-2xl font-semibold">{totalCompleted.toLocaleString()}</p>
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
                <p className="text-xs text-muted-foreground">Avg Performance</p>
                <p className="text-2xl font-semibold">{avgScore}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Links */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold">Quick Links</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          <Link to="/users">
            <Button variant="outline" size="sm" className="gap-1.5">
              <Users className="h-3.5 w-3.5" />
              Manage Users
            </Button>
          </Link>
          <Link to="/activity">
            <Button variant="outline" size="sm" className="gap-1.5">
              <Settings className="h-3.5 w-3.5" />
              Activity Log
            </Button>
          </Link>
          <Link to="/reports">
            <Button variant="outline" size="sm" className="gap-1.5">
              <Building2 className="h-3.5 w-3.5" />
              Generate Report
            </Button>
          </Link>
        </CardContent>
      </Card>

      {/* Departments Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">All Departments</h2>
          <Badge variant="secondary" className="text-xs">{departmentsData.length} departments</Badge>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {departmentsData.map(department => (
            <DepartmentCard key={department.id} department={department} />
          ))}
        </div>
      </div>
    </div>
  )
}
