export type WorkflowStatus = "active" | "pending" | "completed" | "escalated" | "draft"
export type Priority = "critical" | "high" | "medium" | "low"
export type Department = "IT" | "Facilities" | "Administration" | "HR" | "Security" | "Maintenance"

export interface Workflow {
  id: string
  title: string
  description: string
  status: WorkflowStatus
  priority: Priority
  department: Department
  assignee: string
  createdAt: string
  updatedAt: string
  dueDate: string
  progress: number
  tags: string[]
}

export interface Agent {
  id: string
  name: string
  description: string
  status: "online" | "offline" | "degraded"
  health: number
  successRate: number
  todayTasks: number
  avgProcessingTime: string
  lastActivity: string
  icon: string
}

export interface Activity {
  id: string
  type: "created" | "updated" | "completed" | "escalated" | "assigned" | "commented"
  message: string
  user: string
  timestamp: string
  workflowId?: string
  workflowTitle?: string
}

export const workflows: Workflow[] = [
  {
    id: "WF-001",
    title: "Server Infrastructure Upgrade",
    description: "Upgrade production servers to latest hardware specs",
    status: "active",
    priority: "critical",
    department: "IT",
    assignee: "Alex Chen",
    createdAt: "2026-06-28",
    updatedAt: "2026-07-03",
    dueDate: "2026-07-10",
    progress: 65,
    tags: ["infrastructure", "urgent"],
  },
  {
    id: "WF-002",
    title: "HVAC Maintenance – Building C",
    description: "Scheduled maintenance and inspection of HVAC systems",
    status: "pending",
    priority: "high",
    department: "Facilities",
    assignee: "Maria Santos",
    createdAt: "2026-06-29",
    updatedAt: "2026-07-02",
    dueDate: "2026-07-08",
    progress: 20,
    tags: ["maintenance", "scheduled"],
  },
  {
    id: "WF-003",
    title: "New Employee Onboarding – Q3 Cohort",
    description: "Process onboarding for 12 new employees joining Q3",
    status: "active",
    priority: "high",
    department: "HR",
    assignee: "Jordan Kim",
    createdAt: "2026-07-01",
    updatedAt: "2026-07-03",
    dueDate: "2026-07-15",
    progress: 40,
    tags: ["onboarding", "HR"],
  },
  {
    id: "WF-004",
    title: "Security Badge Renewal Program",
    description: "Renew access badges for all Level 3 personnel",
    status: "pending",
    priority: "medium",
    department: "Security",
    assignee: "Taylor Wu",
    createdAt: "2026-06-30",
    updatedAt: "2026-07-01",
    dueDate: "2026-07-20",
    progress: 15,
    tags: ["security", "compliance"],
  },
  {
    id: "WF-005",
    title: "Annual Software License Audit",
    description: "Audit all enterprise software licenses for compliance",
    status: "completed",
    priority: "medium",
    department: "IT",
    assignee: "Alex Chen",
    createdAt: "2026-06-15",
    updatedAt: "2026-07-02",
    dueDate: "2026-07-02",
    progress: 100,
    tags: ["audit", "compliance"],
  },
  {
    id: "WF-006",
    title: "Printer Fleet Maintenance",
    description: "Service all networked printers across floors 1-4",
    status: "escalated",
    priority: "high",
    department: "Maintenance",
    assignee: "Sam Rivera",
    createdAt: "2026-06-25",
    updatedAt: "2026-07-04",
    dueDate: "2026-07-05",
    progress: 30,
    tags: ["maintenance", "overdue"],
  },
  {
    id: "WF-007",
    title: "Policy Documentation Update",
    description: "Update HR policy docs for new compliance requirements",
    status: "draft",
    priority: "low",
    department: "Administration",
    assignee: "Casey Moore",
    createdAt: "2026-07-02",
    updatedAt: "2026-07-03",
    dueDate: "2026-07-31",
    progress: 5,
    tags: ["documentation", "policy"],
  },
  {
    id: "WF-008",
    title: "VPN Access Request – Remote Team",
    description: "Configure VPN access for 8 remote team members",
    status: "active",
    priority: "high",
    department: "IT",
    assignee: "Alex Chen",
    createdAt: "2026-07-03",
    updatedAt: "2026-07-04",
    dueDate: "2026-07-06",
    progress: 55,
    tags: ["access", "remote"],
  },
]

export const agents: Agent[] = [
  {
    id: "agent-001",
    name: "Validation Agent",
    description: "Validates incoming workflow requests for completeness and policy compliance",
    status: "online",
    health: 99,
    successRate: 98.7,
    todayTasks: 143,
    avgProcessingTime: "1.2s",
    lastActivity: "2 min ago",
    icon: "ShieldCheck",
  },
  {
    id: "agent-002",
    name: "Classification Agent",
    description: "Auto-classifies requests by department, type, and category using ML",
    status: "online",
    health: 97,
    successRate: 96.4,
    todayTasks: 138,
    avgProcessingTime: "2.1s",
    lastActivity: "1 min ago",
    icon: "Tags",
  },
  {
    id: "agent-003",
    name: "Priority Agent",
    description: "Assigns priority levels based on SLA rules and impact scoring",
    status: "online",
    health: 100,
    successRate: 99.1,
    todayTasks: 138,
    avgProcessingTime: "0.8s",
    lastActivity: "Just now",
    icon: "Zap",
  },
  {
    id: "agent-004",
    name: "Assignment Agent",
    description: "Routes workflows to optimal teams based on workload and skills",
    status: "degraded",
    health: 74,
    successRate: 91.2,
    todayTasks: 89,
    avgProcessingTime: "3.4s",
    lastActivity: "8 min ago",
    icon: "UserCheck",
  },
  {
    id: "agent-005",
    name: "Reminder Agent",
    description: "Sends smart reminders and deadline alerts to assignees",
    status: "online",
    health: 96,
    successRate: 99.8,
    todayTasks: 52,
    avgProcessingTime: "0.5s",
    lastActivity: "5 min ago",
    icon: "Bell",
  },
  {
    id: "agent-006",
    name: "Escalation Agent",
    description: "Monitors SLA breaches and auto-escalates critical workflows",
    status: "online",
    health: 98,
    successRate: 97.3,
    todayTasks: 14,
    avgProcessingTime: "1.8s",
    lastActivity: "12 min ago",
    icon: "AlertTriangle",
  },
  {
    id: "agent-007",
    name: "Analytics Agent",
    description: "Aggregates performance data and generates operational insights",
    status: "offline",
    health: 0,
    successRate: 94.5,
    todayTasks: 0,
    avgProcessingTime: "4.2s",
    lastActivity: "2h ago",
    icon: "BarChart3",
  },
]

export const recentActivity: Activity[] = [
  {
    id: "act-001",
    type: "escalated",
    message: "Workflow escalated due to SLA breach",
    user: "Escalation Agent",
    timestamp: "2 min ago",
    workflowId: "WF-006",
    workflowTitle: "Printer Fleet Maintenance",
  },
  {
    id: "act-002",
    type: "completed",
    message: "Workflow marked as completed",
    user: "Alex Chen",
    timestamp: "14 min ago",
    workflowId: "WF-005",
    workflowTitle: "Annual Software License Audit",
  },
  {
    id: "act-003",
    type: "assigned",
    message: "Workflow assigned to IT team",
    user: "Assignment Agent",
    timestamp: "28 min ago",
    workflowId: "WF-008",
    workflowTitle: "VPN Access Request – Remote Team",
  },
  {
    id: "act-004",
    type: "created",
    message: "New workflow request submitted",
    user: "Jordan Kim",
    timestamp: "1h ago",
    workflowId: "WF-003",
    workflowTitle: "New Employee Onboarding – Q3 Cohort",
  },
  {
    id: "act-005",
    type: "commented",
    message: "Left a comment on workflow",
    user: "Maria Santos",
    timestamp: "2h ago",
    workflowId: "WF-002",
    workflowTitle: "HVAC Maintenance – Building C",
  },
]

export const workflowTrendData = [
  { month: "Jan", created: 42, completed: 38, escalated: 4 },
  { month: "Feb", created: 55, completed: 48, escalated: 6 },
  { month: "Mar", created: 61, completed: 57, escalated: 3 },
  { month: "Apr", created: 48, completed: 44, escalated: 5 },
  { month: "May", created: 72, completed: 65, escalated: 8 },
  { month: "Jun", created: 83, completed: 78, escalated: 5 },
  { month: "Jul", created: 67, completed: 60, escalated: 4 },
]

export const departmentPerformanceData = [
  { department: "IT", completed: 89, pending: 12, avg: 2.4 },
  { department: "Facilities", completed: 71, pending: 8, avg: 3.1 },
  { department: "HR", completed: 94, pending: 5, avg: 1.8 },
  { department: "Security", completed: 82, pending: 9, avg: 2.7 },
  { department: "Admin", completed: 68, pending: 14, avg: 4.2 },
  { department: "Maintenance", completed: 61, pending: 18, avg: 5.1 },
]

export const priorityDistributionData = [
  { name: "Critical", value: 8, color: "var(--chart-5)" },
  { name: "High", value: 23, color: "var(--chart-1)" },
  { name: "Medium", value: 41, color: "var(--chart-3)" },
  { name: "Low", value: 28, color: "var(--chart-2)" },
]

export const weeklyProductivityData = [
  { day: "Mon", tasks: 28, automated: 19 },
  { day: "Tue", tasks: 35, automated: 24 },
  { day: "Wed", tasks: 32, automated: 21 },
  { day: "Thu", tasks: 41, automated: 31 },
  { day: "Fri", tasks: 38, automated: 28 },
  { day: "Sat", tasks: 12, automated: 10 },
  { day: "Sun", tasks: 8, automated: 7 },
]

export const automationPerformanceData = [
  { hour: "00:00", requests: 12, automated: 11 },
  { hour: "04:00", requests: 8, automated: 7 },
  { hour: "08:00", requests: 45, automated: 41 },
  { hour: "12:00", requests: 67, automated: 59 },
  { hour: "16:00", requests: 52, automated: 48 },
  { hour: "20:00", requests: 31, automated: 28 },
]
