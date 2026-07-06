import { Link, useParams } from "react-router-dom"
import {
  ArrowLeft,
  Clock,
  User,
  Building2,
  CheckCircle2,
  MessageSquare,
  Paperclip,
  Send,
  MoreHorizontal,
  ChevronRight,
  Plus,
  Bot,
  AlertTriangle,
  History,
  FileText,
  Timer,
  XCircle,
  SkipForward,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StatusBadge, PriorityBadge, DepartmentBadge } from "@/components/shared/workflow-badge"
import { workflows } from "@/lib/data"
import { automationHistory, approvalHistory, recentChanges, slaConfigs, defaultSLA } from "@/lib/workflow-data"

const timelineEvents = [
  { id: 1, status: "completed", label: "Request Submitted", date: "Jun 28, 2026 09:14", by: "Jordan Kim", done: true },
  { id: 2, status: "completed", label: "Validated by Agent", date: "Jun 28, 2026 09:15", by: "Validation Agent", done: true },
  { id: 3, status: "completed", label: "Classified & Prioritized", date: "Jun 28, 2026 09:16", by: "Classification Agent", done: true },
  { id: 4, status: "completed", label: "Assigned to IT Team", date: "Jun 28, 2026 09:18", by: "Assignment Agent", done: true },
  { id: 5, status: "current", label: "In Progress", date: "Jul 3, 2026 14:22", by: "Alex Chen", done: false },
  { id: 6, status: "upcoming", label: "Awaiting Approval", date: "—", by: "—", done: false },
  { id: 7, status: "upcoming", label: "Resolved & Closed", date: "—", by: "—", done: false },
]

const comments = [
  {
    id: 1,
    author: "Alex Chen",
    initials: "AC",
    timestamp: "Jul 3, 2026 at 2:22 PM",
    content: "Starting the server configuration now. Should have the first batch complete by EOD.",
  },
  {
    id: 2,
    author: "Sarah Kim",
    initials: "SK",
    timestamp: "Jul 2, 2026 at 11:05 AM",
    content: "Can you confirm the hardware specs have been approved by procurement? I want to make sure we're aligned.",
  },
  {
    id: 3,
    author: "Alex Chen",
    initials: "AC",
    timestamp: "Jul 2, 2026 at 11:47 AM",
    content: "Yes, procurement approved the Dell PowerEdge R750 units yesterday. We're good to proceed.",
  },
]

const attachments = [
  { name: "server-specs-v2.pdf", size: "2.4 MB", type: "pdf" },
  { name: "procurement-approval.docx", size: "84 KB", type: "doc" },
  { name: "network-diagram.png", size: "1.1 MB", type: "img" },
]

function SLACountdown({ workflowId }: { workflowId: string }) {
  const sla = slaConfigs[workflowId] || defaultSLA
  const progressPercent = Math.min((sla.elapsedHours / sla.targetHours) * 100, 100)
  const remainingHours = Math.max(sla.targetHours - sla.elapsedHours, 0)
  const isWarning = progressPercent >= sla.escalationThreshold && !sla.breached
  const isBreached = sla.breached

  return (
    <Card className={isBreached ? "border-destructive/50" : isWarning ? "border-amber-500/50" : ""}>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-semibold flex items-center gap-2">
          <Timer className={`h-4 w-4 ${isBreached ? "text-destructive" : isWarning ? "text-amber-500" : "text-muted-foreground"}`} />
          SLA Status
          {isBreached && <Badge variant="destructive" className="text-xs">Breached</Badge>}
          {isWarning && !isBreached && <Badge variant="outline" className="text-xs border-amber-500 text-amber-500">At Risk</Badge>}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">{isBreached ? "Overdue by" : "Time remaining"}</span>
          <span className={`font-semibold ${isBreached ? "text-destructive" : isWarning ? "text-amber-500" : ""}`}>
            {isBreached ? `${Math.abs(remainingHours)}h` : `${remainingHours}h`}
          </span>
        </div>
        <Progress value={progressPercent} className={`h-2 ${isBreached ? "[&>div]:bg-destructive" : isWarning ? "[&>div]:bg-amber-500" : ""}`} />
        <div className="grid grid-cols-3 gap-2 text-center pt-2">
          <div>
            <p className="text-xs text-muted-foreground">Target</p>
            <p className="text-sm font-medium">{sla.targetHours}h</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Elapsed</p>
            <p className="text-sm font-medium">{sla.elapsedHours}h</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Priority</p>
            <PriorityBadge priority={sla.priority as "critical" | "high" | "medium" | "low"} />
          </div>
        </div>
        {isWarning && !isBreached && (
          <div className="flex items-start gap-2 p-2 rounded-lg bg-amber-500/10 border border-amber-500/20">
            <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
            <p className="text-xs text-amber-600 dark:text-amber-400">
              SLA escalation threshold ({sla.escalationThreshold}%) reached. Supervisors will be notified.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function AutomationHistoryTab() {
  return (
    <div className="space-y-3">
      {automationHistory.map((event) => {
        const resultConfig = {
          success: { icon: CheckCircle2, color: "text-emerald-500", bg: "bg-emerald-500/10" },
          failed: { icon: XCircle, color: "text-destructive", bg: "bg-destructive/10" },
          skipped: { icon: SkipForward, color: "text-muted-foreground", bg: "bg-muted" },
        }
        const config = resultConfig[event.result]
        return (
          <div key={event.id} className="flex gap-4 p-4 rounded-lg border border-border hover:bg-muted/20 transition-colors">
            <div className={`shrink-0 h-10 w-10 rounded-full ${config.bg} flex items-center justify-center`}>
              <config.icon className={`h-5 w-5 ${config.color}`} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-medium">{event.agent}</span>
                <Badge variant="outline" className="text-xs capitalize">{event.result}</Badge>
                <span className="text-xs text-muted-foreground ml-auto">{event.duration}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">{event.action}</p>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{event.details}</p>
              <p className="text-xs text-muted-foreground mt-2">{event.timestamp}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

function ApprovalHistoryTab() {
  return (
    <div className="space-y-3">
      {approvalHistory.map((approval) => {
        const statusConfig = {
          approved: { icon: CheckCircle2, color: "text-emerald-500", bg: "bg-emerald-500/10" },
          rejected: { icon: XCircle, color: "text-destructive", bg: "bg-destructive/10" },
          pending: { icon: Clock, color: "text-amber-500", bg: "bg-amber-500/10" },
          delegated: { icon: ChevronRight, color: "text-blue-500", bg: "bg-blue-500/10" },
        }
        const config = statusConfig[approval.status]
        return (
          <div key={approval.id} className="flex gap-4 p-4 rounded-lg border border-border">
            <Avatar className="h-10 w-10 shrink-0">
              <AvatarFallback className={config.bg}>{approval.initials}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-medium">{approval.approver}</span>
                <Badge variant="outline" className={`text-xs ${config.color} border-current`}>
                  <config.icon className="h-3 w-3 mr-1" />
                  {approval.status}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-1">{approval.stage}</p>
              {approval.comment && (
                <div className="mt-2 p-2 rounded bg-muted/50 border border-border">
                  <p className="text-sm text-muted-foreground">{approval.comment}</p>
                </div>
              )}
              <p className="text-xs text-muted-foreground mt-2">{approval.timestamp}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

function RecentChangesTab() {
  return (
    <div className="space-y-2">
      {recentChanges.map((change) => (
        <div key={change.id} className="flex items-start gap-3 p-3 rounded-lg border border-border hover:bg-muted/20 transition-colors">
          <History className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-medium">{change.field}</span>
              <span className="text-xs text-muted-foreground">changed by {change.changedBy}</span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs text-muted-foreground line-through">{change.oldValue}</span>
              <ChevronRight className="h-3 w-3 text-muted-foreground" />
              <span className="text-xs font-medium text-foreground">{change.newValue}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">{change.timestamp}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default function WorkflowDetailsPage() {
  const { id } = useParams()
  const workflow = workflows.find(w => w.id === id) ?? workflows[0]

  return (
    <div className="p-6 space-y-6 max-w-[1400px]">
      {/* Back */}
      <Link to="/workflows" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to workflows
      </Link>

      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-mono text-muted-foreground">{workflow.id}</span>
            <StatusBadge status={workflow.status} />
            <PriorityBadge priority={workflow.priority} />
            <DepartmentBadge department={workflow.department} />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">{workflow.title}</h1>
          <p className="text-sm text-muted-foreground">{workflow.description}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
          <Button size="sm">Mark complete</Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview" className="gap-1.5">
            <FileText className="h-3.5 w-3.5" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="automation" className="gap-1.5">
            <Bot className="h-3.5 w-3.5" />
            Automation History
          </TabsTrigger>
          <TabsTrigger value="approvals" className="gap-1.5">
            <CheckCircle2 className="h-3.5 w-3.5" />
            Approvals
          </TabsTrigger>
          <TabsTrigger value="changes" className="gap-1.5">
            <History className="h-3.5 w-3.5" />
            Recent Changes
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Progress */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-semibold">Progress</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Overall completion</span>
                    <span className="font-semibold">{workflow.progress}%</span>
                  </div>
                  <Progress value={workflow.progress} className="h-2" />
                  <div className="grid grid-cols-3 gap-4 pt-2">
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground">Created</p>
                      <p className="text-sm font-medium mt-0.5">{workflow.createdAt}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground">Last updated</p>
                      <p className="text-sm font-medium mt-0.5">{workflow.updatedAt}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground">Due date</p>
                      <p className="text-sm font-medium mt-0.5">{workflow.dueDate}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Status Timeline */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-semibold">Status Timeline</CardTitle>
                </CardHeader>
                <CardContent>
                  <ol className="relative space-y-0">
                    {timelineEvents.map((event, index) => (
                      <li key={event.id} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 z-10 ${
                            event.done
                              ? "border-emerald-500 bg-emerald-500 text-white"
                              : event.status === "current"
                                ? "border-blue-500 bg-blue-500 text-white"
                                : "border-border bg-background"
                          }`}>
                            {event.done ? (
                              <CheckCircle2 className="h-4 w-4" />
                            ) : event.status === "current" ? (
                              <div className="h-2 w-2 rounded-full bg-white" />
                            ) : (
                              <div className="h-2 w-2 rounded-full bg-border" />
                            )}
                          </div>
                          {index < timelineEvents.length - 1 && (
                            <div className={`w-0.5 h-8 mt-1 ${event.done ? "bg-emerald-500/40" : "bg-border"}`} />
                          )}
                        </div>
                        <div className="pb-8 flex-1 min-w-0">
                          <p className={`text-sm font-medium ${event.status === "upcoming" ? "text-muted-foreground" : "text-foreground"}`}>
                            {event.label}
                          </p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-xs text-muted-foreground">{event.date}</span>
                            {event.by !== "—" && (
                              <>
                                <span className="text-xs text-muted-foreground">·</span>
                                <span className="text-xs text-muted-foreground">{event.by}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ol>
                </CardContent>
              </Card>

              {/* Comments */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-semibold flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    Activity & Comments
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {comments.map((comment, index) => (
                    <div key={comment.id}>
                      <div className="flex items-start gap-3">
                        <Avatar className="h-7 w-7 shrink-0 mt-0.5">
                          <AvatarFallback className="text-xs font-semibold">{comment.initials}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-medium">{comment.author}</span>
                            <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                          </div>
                          <div className="rounded-lg bg-muted/50 border border-border p-3">
                            <p className="text-sm text-muted-foreground leading-relaxed">{comment.content}</p>
                          </div>
                        </div>
                      </div>
                      {index < comments.length - 1 && <Separator className="mt-4" />}
                    </div>
                  ))}

                  <Separator />

                  <div className="flex gap-3">
                    <Avatar className="h-7 w-7 shrink-0 mt-0.5">
                      <AvatarFallback className="text-xs font-semibold">AC</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-2">
                      <Textarea
                        placeholder="Write a comment..."
                        className="resize-none text-sm min-h-20"
                      />
                      <div className="flex justify-end">
                        <Button size="sm" className="gap-1.5">
                          <Send className="h-3.5 w-3.5" />
                          Comment
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              {/* SLA */}
              <SLACountdown workflowId={workflow.id} />

              {/* Details */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-semibold">Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground flex items-center gap-1.5">
                      <User className="h-3.5 w-3.5" /> Assignee
                    </span>
                    <div className="flex items-center gap-1.5">
                      <Avatar className="h-5 w-5">
                        <AvatarFallback className="text-[10px]">
                          {workflow.assignee.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-xs font-medium">{workflow.assignee}</span>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground flex items-center gap-1.5">
                      <Building2 className="h-3.5 w-3.5" /> Department
                    </span>
                    <DepartmentBadge department={workflow.department} />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" /> Due date
                    </span>
                    <span className="text-xs font-medium">{workflow.dueDate}</span>
                  </div>
                  <Separator />
                  <div className="flex items-start justify-between">
                    <span className="text-xs text-muted-foreground">Tags</span>
                    <div className="flex flex-wrap gap-1 justify-end">
                      {workflow.tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Attachments */}
              <Card>
                <CardHeader className="pb-3 flex flex-row items-center justify-between">
                  <CardTitle className="text-sm font-semibold flex items-center gap-2">
                    <Paperclip className="h-4 w-4" />
                    Attachments
                    <Badge variant="secondary" className="text-xs h-5 px-1.5">{attachments.length}</Badge>
                  </CardTitle>
                  <Button variant="ghost" size="sm" className="h-6 text-xs gap-1">
                    <Plus className="h-3 w-3" />
                    Add
                  </Button>
                </CardHeader>
                <CardContent className="space-y-2">
                  {attachments.map((file) => (
                    <div key={file.name} className="flex items-center gap-3 p-2.5 rounded-lg border border-border hover:bg-muted/40 transition-colors cursor-pointer">
                      <div className="h-8 w-8 rounded-md bg-muted flex items-center justify-center shrink-0">
                        <span className="text-[10px] font-bold uppercase text-muted-foreground">{file.type}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium truncate">{file.name}</p>
                        <p className="text-xs text-muted-foreground">{file.size}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Related */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-semibold">Related Workflows</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {workflows.filter(w => w.id !== workflow.id && w.department === workflow.department).slice(0, 3).map(wf => (
                    <Link key={wf.id} to={`/workflows/${wf.id}`} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/40 transition-colors group">
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium truncate group-hover:text-foreground">{wf.title}</p>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <StatusBadge status={wf.status} />
                        </div>
                      </div>
                      <ChevronRight className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                    </Link>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="automation" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-semibold">Automation History</CardTitle>
              <CardDescription className="text-xs">Actions performed by automated agents</CardDescription>
            </CardHeader>
            <CardContent>
              <AutomationHistoryTab />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="approvals" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-semibold">Approval History</CardTitle>
              <CardDescription className="text-xs">Review and approval records for this workflow</CardDescription>
            </CardHeader>
            <CardContent>
              <ApprovalHistoryTab />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="changes" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-semibold">Recent Changes</CardTitle>
              <CardDescription className="text-xs">Track all modifications to this workflow</CardDescription>
            </CardHeader>
            <CardContent>
              <RecentChangesTab />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
