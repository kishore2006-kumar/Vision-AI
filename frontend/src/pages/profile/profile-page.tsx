import { Link } from "react-router-dom"
import {
  GitBranch,
  CheckCircle2,
  Shield,
  Edit2,
  Mail,
  Building2,
  MapPin,
  Calendar,
  TrendingUp,
  Award,
  Activity,
  Settings,
  Bell,
  Lock,
  Key,
  Smartphone,
  ExternalLink,
  ArrowRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { PageHeader } from "@/components/shared/page-header"
import { StatusBadge, PriorityBadge, DepartmentBadge } from "@/components/shared/workflow-badge"
import { workflows } from "@/lib/data"
import { activityEvents } from "@/lib/enterprise-data"
import { usersData } from "@/lib/management-data"

const achievements = [
  { id: 1, name: "Workflow Champion", description: "Completed 100+ workflows", icon: Award, earned: true, date: "May 2026" },
  { id: 2, name: "Speed Demon", description: "Average resolution under 2 hours", icon: TrendingUp, earned: true, date: "Jun 2026" },
  { id: 3, name: "Automation Expert", description: "Configured 10+ automation rules", icon: Settings, earned: true, date: "Jun 2026" },
  { id: 4, name: "Team Player", description: "Collaborated across 5 departments", icon: GitBranch, earned: false, date: null },
  { id: 5, name: "Perfectionist", description: "100% success rate for 30 days", icon: CheckCircle2, earned: false, date: null },
]

const securityOverview = [
  { label: "Two-Factor Authentication", status: "enabled", icon: Smartphone, variant: "success" },
  { label: "Password Strength", status: "Strong", icon: Lock, variant: "success" },
  { label: "Active Sessions", status: "3 devices", icon: Key, variant: "default" },
  { label: "Last Security Review", status: "15 days ago", icon: Shield, variant: "info" },
]

export default function ProfilePage() {
  const currentUser = usersData[0]
  const myWorkflows = workflows.filter(w => w.assignee === "Alex Chen")
  const completed = myWorkflows.filter(w => w.status === "completed").length
  const active = myWorkflows.filter(w => w.status === "active").length
  const myActivity = activityEvents.filter(e => e.user === "Alex Chen").slice(0, 5)

  const performanceData = [
    { label: "Workflows Assigned", value: myWorkflows.length, change: "+2 this week" },
    { label: "Completed", value: completed, change: `${Math.round((completed / myWorkflows.length) * 100)}% rate` },
    { label: "Active", value: active, change: "3 due soon" },
    { label: "Avg Resolution", value: "2.4h", change: "-18% improvement" },
  ]

  return (
    <div className="p-6 space-y-6 max-w-[1400px]">
      <PageHeader title="Profile" description="Manage your personal information and preferences">
        <Link to="/settings">
          <Button variant="outline" size="sm" className="gap-1.5">
            <Settings className="h-3.5 w-3.5" />
            Account Settings
          </Button>
        </Link>
        <Button size="sm" className="gap-1.5">
          <Edit2 className="h-3.5 w-3.5" />
          Edit Profile
        </Button>
      </PageHeader>

      {/* Profile Header Card */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <Avatar className="h-24 w-24 shrink-0">
              <AvatarFallback className="text-3xl font-bold bg-primary text-primary-foreground">
                AC
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 flex-wrap mb-2">
                <h1 className="text-2xl font-bold">{currentUser.name}</h1>
                <Badge variant="secondary">{currentUser.role.toUpperCase()}</Badge>
                <Badge variant="outline" className="text-emerald-600 border-emerald-500/20 bg-emerald-500/10">
                  Active
                </Badge>
              </div>
              <p className="text-muted-foreground mb-3">{currentUser.bio}</p>
              <div className="flex items-center gap-6 flex-wrap text-sm text-muted-foreground">
                <span className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  {currentUser.email}
                </span>
                <span className="flex items-center gap-2">
                  <Building2 className="h-4 w-4" />
                  {currentUser.department}
                </span>
                <span className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  {currentUser.location}
                </span>
                <span className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Joined {currentUser.joinDate}
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-2 shrink-0">
              <div className="text-center p-4 rounded-xl bg-muted/30">
                <p className="text-3xl font-bold text-primary">{currentUser.performanceScore}</p>
                <p className="text-xs text-muted-foreground mt-1">Performance Score</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Performance Stats */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Performance Statistics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {performanceData.map((stat) => (
                <div key={stat.label} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-xl font-semibold mt-0.5">{stat.value}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{stat.change}</span>
                </div>
              ))}
              <Separator />
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Overall Progress</span>
                  <span className="font-medium">{currentUser.performanceScore}%</span>
                </div>
                <Progress value={currentUser.performanceScore} className="h-2" />
              </div>
            </CardContent>
          </Card>

          {/* Skills */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold">Skills & Expertise</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {currentUser.skills.map(skill => (
                  <Badge key={skill} variant="secondary">{skill}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <Award className="h-4 w-4" />
                Achievements
              </CardTitle>
              <CardDescription className="text-xs">{achievements.filter(a => a.earned).length} of {achievements.length} earned</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {achievements.map((achievement) => (
                <div key={achievement.id} className={`flex items-center gap-3 p-3 rounded-lg border border-border ${achievement.earned ? "bg-muted/30" : "opacity-50"}`}>
                  <div className={`h-10 w-10 rounded-full flex items-center justify-center shrink-0 ${achievement.earned ? "bg-amber-500/10" : "bg-muted"}`}>
                    <achievement.icon className={`h-5 w-5 ${achievement.earned ? "text-amber-500" : "text-muted-foreground"}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{achievement.name}</p>
                    <p className="text-xs text-muted-foreground">{achievement.description}</p>
                  </div>
                  {achievement.earned && (
                    <Badge variant="outline" className="text-xs text-amber-500 border-amber-500/20">
                      {achievement.date}
                    </Badge>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Middle Column */}
        <div className="space-y-6">
          {/* Assigned Workflows */}
          <Card>
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-semibold">Assigned Workflows</CardTitle>
              <Link to="/workflows">
                <Button variant="ghost" size="sm" className="h-7 text-xs gap-1">
                  View all
                  <ArrowRight className="h-3 w-3" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border">
                {myWorkflows.slice(0, 4).map((wf) => (
                  <Link key={wf.id} to={`/workflows/${wf.id}`} className="flex items-center gap-4 px-6 py-3.5 hover:bg-muted/40 transition-colors">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                        <span className="text-xs font-mono text-muted-foreground">{wf.id}</span>
                        <StatusBadge status={wf.status} />
                        <PriorityBadge priority={wf.priority} />
                      </div>
                      <p className="text-sm font-medium truncate">{wf.title}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <DepartmentBadge department={wf.department} />
                        <span className="text-xs text-muted-foreground">Due {wf.dueDate}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1 w-24 shrink-0">
                      <span className="text-xs text-muted-foreground">{wf.progress}%</span>
                      <Progress value={wf.progress} className="h-1.5 w-full" />
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <Activity className="h-4 w-4" />
                Recent Activity
              </CardTitle>
              <Link to="/activity">
                <Button variant="ghost" size="sm" className="h-7 text-xs gap-1">
                  View all
                  <ArrowRight className="h-3 w-3" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="space-y-3">
              {myActivity.map((event, i) => (
                <div key={event.id}>
                  <div className="flex items-start gap-3">
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 ${
                      event.status === "success" ? "bg-emerald-500/10" :
                      event.status === "warning" ? "bg-amber-500/10" : "bg-blue-500/10"
                    }`}>
                      <Activity className={`h-4 w-4 ${
                        event.status === "success" ? "text-emerald-500" :
                        event.status === "warning" ? "text-amber-500" : "text-blue-500"
                      }`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{event.title}</p>
                      <p className="text-xs text-muted-foreground line-clamp-1">{event.description}</p>
                      <p className="text-xs text-muted-foreground/70 mt-1">{event.timestamp}</p>
                    </div>
                  </div>
                  {i < myActivity.length - 1 && <Separator className="mt-3" />}
                </div>
              ))}
              {myActivity.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">No recent activity</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Security Overview */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Security Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {securityOverview.map((item) => (
                <div key={item.label} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                  <item.icon className={`h-4 w-4 ${
                    item.variant === "success" ? "text-emerald-500" :
                    item.variant === "info" ? "text-blue-500" : "text-muted-foreground"
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm">{item.label}</p>
                  </div>
                  <Badge variant={item.variant === "success" ? "default" : "secondary"} className="text-xs">
                    {item.status}
                  </Badge>
                </div>
              ))}
              <Separator />
              <Link to="/settings">
                <Button variant="outline" size="sm" className="w-full gap-1.5">
                  <Lock className="h-3.5 w-3.5" />
                  Security Settings
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Account Preferences */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Account Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                <div className="flex items-center gap-3">
                  <Bell className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Notifications</span>
                </div>
                <Badge variant="secondary">Enabled</Badge>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Email Digest</span>
                </div>
                <Badge variant="outline">Daily</Badge>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                <div className="flex items-center gap-3">
                  <Shield className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Privacy Mode</span>
                </div>
                <Badge variant="outline">Standard</Badge>
              </div>
              <Separator />
              <Link to="/settings">
                <Button variant="outline" size="sm" className="w-full gap-1.5">
                  Manage Preferences
                  <ExternalLink className="h-3.5 w-3.5" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
