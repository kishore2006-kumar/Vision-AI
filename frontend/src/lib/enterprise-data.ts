// Centralized enterprise mock data — Sprint 2

export type AgentStatus = "running" | "idle" | "paused" | "error"
export type NotificationPriority = "critical" | "high" | "medium" | "low"
export type NotificationType = "alert" | "approval" | "workflow" | "automation" | "system" | "reminder"
export type ActivityEventType =
  | "workflow_created"
  | "workflow_assigned"
  | "workflow_approved"
  | "workflow_completed"
  | "automation_started"
  | "automation_finished"
  | "reminder_sent"
  | "approval_requested"
  | "analytics_generated"
  | "department_updated"
  | "user_assigned"
  | "sla_breach"
  | "escalation_triggered"

// ─── Agent Types ─────────────────────────────────────────────────────────────

export interface AgentMetrics {
  queueLength: number
  tasksCompletedToday: number
  averageProcessingTime: string
  successRate: number
  failedTasks: number
  lastExecutionTime: string
  performanceTrend: "up" | "down" | "stable"
  cpuUsage: number
  memoryUsage: number
  uptime: string
}

export interface AutomationAgent {
  id: string
  name: string
  description: string
  status: AgentStatus
  health: "healthy" | "degraded" | "critical"
  currentWorkflow: string | null
  currentWorkflowId: string | null
  metrics: AgentMetrics
  capabilities: string[]
  lastError: string | null
  enabled: boolean
  icon: string
  color: string
}

export interface AgentExecution {
  id: string
  agentId: string
  workflowId: string
  workflowName: string
  startTime: string
  endTime: string | null
  duration: string
  status: "running" | "completed" | "failed"
  result: string
  details: string
}

export interface AgentPerformanceData {
  date: string
  tasksCompleted: number
  avgProcessingTime: number
  successRate: number
}

// ─── Notification Types ───────────────────────────────────────────────────────

export interface EnterpriseNotification {
  id: string
  type: NotificationType
  priority: NotificationPriority
  title: string
  message: string
  source: string
  department: string
  workflowId: string | null
  workflowName: string | null
  timestamp: string
  read: boolean
  archived: boolean
  actions: {
    label: string
    action: string
  }[]
}

// ─── Activity Types ───────────────────────────────────────────────────────────

export interface ActivityEvent {
  id: string
  type: ActivityEventType
  title: string
  description: string
  user: string | null
  userId: string | null
  department: string
  workflowId: string | null
  workflowName: string | null
  agent: string | null
  agentId: string | null
  status: "success" | "failed" | "pending" | "warning"
  timestamp: string
  metadata?: Record<string, string>
}

// ─── Dashboard Summary Types ──────────────────────────────────────────────────

export interface DashboardSummary {
  totalWorkflows: number
  activeWorkflows: number
  completedToday: number
  pendingApprovals: number
  slaBreaches: number
  agentsHealthy: number
  agentsTotal: number
  notificationsUnread: number
  notificationsCritical: number
}

// ─── Automation Agents Data ───────────────────────────────────────────────────

export const automationAgentsData: AutomationAgent[] = [
  {
    id: "validation-agent",
    name: "Validation Agent",
    description: "Validates incoming workflow requests for completeness, policy compliance, and data integrity before routing.",
    status: "running",
    health: "healthy",
    currentWorkflow: "Server Infrastructure Upgrade",
    currentWorkflowId: "WF-001",
    metrics: {
      queueLength: 12,
      tasksCompletedToday: 847,
      averageProcessingTime: "1.2s",
      successRate: 99.4,
      failedTasks: 5,
      lastExecutionTime: "Jul 4, 2026 14:32:18",
      performanceTrend: "up",
      cpuUsage: 34,
      memoryUsage: 2.1,
      uptime: "14d 7h 32m",
    },
    capabilities: ["Policy validation", "Field verification", "Compliance checking", "SLA tier assignment"],
    lastError: null,
    enabled: true,
    icon: "ShieldCheck",
    color: "text-emerald-500",
  },
  {
    id: "classification-agent",
    name: "Classification Agent",
    description: "Automatically categorizes and classifies workflows based on content, urgency, and organizational rules.",
    status: "running",
    health: "healthy",
    currentWorkflow: "Employee Laptop Provisioning",
    currentWorkflowId: "WF-003",
    metrics: {
      queueLength: 8,
      tasksCompletedToday: 723,
      averageProcessingTime: "2.3s",
      successRate: 97.8,
      failedTasks: 16,
      lastExecutionTime: "Jul 4, 2026 14:31:45",
      performanceTrend: "stable",
      cpuUsage: 28,
      memoryUsage: 1.8,
      uptime: "14d 7h 32m",
    },
    capabilities: ["Auto-categorization", "Priority scoring", "Department routing", "Tag assignment"],
    lastError: null,
    enabled: true,
    icon: "Layers",
    color: "text-blue-500",
  },
  {
    id: "priority-agent",
    name: "Priority Agent",
    description: "Calculates composite priority scores based on impact, urgency, and business rules for SLA enforcement.",
    status: "running",
    health: "healthy",
    currentWorkflow: null,
    currentWorkflowId: null,
    metrics: {
      queueLength: 3,
      tasksCompletedToday: 612,
      averageProcessingTime: "0.8s",
      successRate: 99.8,
      failedTasks: 1,
      lastExecutionTime: "Jul 4, 2026 14:28:33",
      performanceTrend: "up",
      cpuUsage: 12,
      memoryUsage: 0.9,
      uptime: "14d 7h 32m",
    },
    capabilities: ["Impact scoring", "Urgency calculation", "SLA tier assignment", "Priority override detection"],
    lastError: null,
    enabled: true,
    icon: "Gauge",
    color: "text-amber-500",
  },
  {
    id: "assignment-agent",
    name: "Assignment Agent",
    description: "Routes workflows to appropriate teams and individuals based on skills, workload, and availability.",
    status: "running",
    health: "degraded",
    currentWorkflow: "Security Incident Response",
    currentWorkflowId: "WF-006",
    metrics: {
      queueLength: 24,
      tasksCompletedToday: 534,
      averageProcessingTime: "3.1s",
      successRate: 94.2,
      failedTasks: 33,
      lastExecutionTime: "Jul 4, 2026 14:30:11",
      performanceTrend: "down",
      cpuUsage: 67,
      memoryUsage: 4.2,
      uptime: "14d 7h 32m",
    },
    capabilities: ["Workload balancing", "Skill matching", "Team routing", "Availability checking"],
    lastError: "Jul 4, 2026 12:15 - Timeout while querying HR database for team availability",
    enabled: true,
    icon: "Users",
    color: "text-purple-500",
  },
  {
    id: "reminder-agent",
    name: "Reminder Agent",
    description: "Monitors deadlines and sends automated reminders before SLA breaches occur.",
    status: "running",
    health: "healthy",
    currentWorkflow: null,
    currentWorkflowId: null,
    metrics: {
      queueLength: 156,
      tasksCompletedToday: 2847,
      averageProcessingTime: "0.5s",
      successRate: 99.9,
      failedTasks: 2,
      lastExecutionTime: "Jul 4, 2026 14:32:00",
      performanceTrend: "stable",
      cpuUsage: 8,
      memoryUsage: 0.5,
      uptime: "14d 7h 32m",
    },
    capabilities: ["Deadline monitoring", "Email notifications", "In-app alerts", "Escalation triggers"],
    lastError: null,
    enabled: true,
    icon: "Bell",
    color: "text-cyan-500",
  },
  {
    id: "escalation-agent",
    name: "Escalation Agent",
    description: "Monitors SLA thresholds and triggers escalation procedures when deadlines are at risk.",
    status: "idle",
    health: "healthy",
    currentWorkflow: null,
    currentWorkflowId: null,
    metrics: {
      queueLength: 0,
      tasksCompletedToday: 89,
      averageProcessingTime: "0.9s",
      successRate: 100,
      failedTasks: 0,
      lastExecutionTime: "Jul 3, 2026 17:00:00",
      performanceTrend: "stable",
      cpuUsage: 2,
      memoryUsage: 0.3,
      uptime: "14d 7h 32m",
    },
    capabilities: ["SLA monitoring", "Threshold alerts", "Manager notifications", "Auto-escalation"],
    lastError: null,
    enabled: true,
    icon: "AlertTriangle",
    color: "text-orange-500",
  },
  {
    id: "analytics-agent",
    name: "Analytics Agent",
    description: "Generates insights, reports, and performance metrics across all workflow categories.",
    status: "running",
    health: "healthy",
    currentWorkflow: "Weekly Performance Report",
    currentWorkflowId: "RPT-007",
    metrics: {
      queueLength: 5,
      tasksCompletedToday: 234,
      averageProcessingTime: "4.7s",
      successRate: 98.7,
      failedTasks: 3,
      lastExecutionTime: "Jul 4, 2026 14:25:00",
      performanceTrend: "up",
      cpuUsage: 45,
      memoryUsage: 3.8,
      uptime: "14d 7h 32m",
    },
    capabilities: ["Trend analysis", "Report generation", "Anomaly detection", "Forecasting"],
    lastError: null,
    enabled: true,
    icon: "BarChart3",
    color: "text-indigo-500",
  },
]

// ─── Agent Execution History ─────────────────────────────────────────────────

export const agentExecutionHistory: AgentExecution[] = [
  {
    id: "exec-001",
    agentId: "validation-agent",
    workflowId: "WF-001",
    workflowName: "Server Infrastructure Upgrade",
    startTime: "Jul 4, 2026 14:32:18",
    endTime: "Jul 4, 2026 14:32:19",
    duration: "1.1s",
    status: "completed",
    result: "All validation checks passed",
    details: "Policy compliance: PASS. Required fields: PASS. SLA tier: Critical. Assigned to IT Infrastructure.",
  },
  {
    id: "exec-002",
    agentId: "classification-agent",
    workflowId: "WF-003",
    workflowName: "Employee Laptop Provisioning",
    startTime: "Jul 4, 2026 14:31:45",
    endTime: "Jul 4, 2026 14:31:47",
    duration: "2.3s",
    status: "completed",
    result: "Classified as IT/Hardware/Provisioning",
    details: "Category: IT/Hardware. Confidence: 97%. Department: IT. Tags: provisioning, hardware, laptop.",
  },
  {
    id: "exec-003",
    agentId: "assignment-agent",
    workflowId: "WF-006",
    workflowName: "Security Incident Response",
    startTime: "Jul 4, 2026 14:30:11",
    endTime: null,
    duration: "—",
    status: "running",
    result: "Routing in progress",
    details: "Analyzing team availability and skill matching for security incident response.",
  },
  {
    id: "exec-004",
    agentId: "validation-agent",
    workflowId: "WF-002",
    workflowName: "Network Configuration Update",
    startTime: "Jul 4, 2026 14:28:00",
    endTime: "Jul 4, 2026 14:28:01",
    duration: "1.3s",
    status: "failed",
    result: "Validation failed - missing required fields",
    details: "Missing: change_request_id, rollback_plan, approval_chain. Requires manual intervention.",
  },
  {
    id: "exec-005",
    agentId: "reminder-agent",
    workflowId: "WF-005",
    workflowName: "Quarterly Compliance Review",
    startTime: "Jul 4, 2026 08:00:00",
    endTime: "Jul 4, 2026 08:00:00",
    duration: "0.5s",
    status: "completed",
    result: "Reminder sent to 3 recipients",
    details: "Reminder: 48h before SLA deadline. Recipients: Sarah Kim, Jordan Lee, IT Management.",
  },
]

// ─── Agent Performance Time Series ────────────────────────────────────────────

export const agentPerformanceData: Record<string, AgentPerformanceData[]> = {
  "validation-agent": generatePerformanceData(847, 1.2, 99.4),
  "classification-agent": generatePerformanceData(723, 2.3, 97.8),
  "priority-agent": generatePerformanceData(612, 0.8, 99.8),
  "assignment-agent": generatePerformanceData(534, 3.1, 94.2),
  "reminder-agent": generatePerformanceData(2847, 0.5, 99.9),
  "escalation-agent": generatePerformanceData(89, 0.9, 100),
  "analytics-agent": generatePerformanceData(234, 4.7, 98.7),
}

function generatePerformanceData(baseTasks: number, baseTime: number, baseSuccess: number): AgentPerformanceData[] {
  return Array.from({ length: 7 }, (_, i) => ({
    date: new Date(Date.now() - (6 - i) * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    tasksCompleted: Math.floor(baseTasks * (0.7 + Math.random() * 0.6) / 7),
    avgProcessingTime: Math.round((baseTime * (0.8 + Math.random() * 0.4)) * 10) / 10,
    successRate: Math.min(100, Math.max(90, baseSuccess + (Math.random() * 4 - 2))),
  }))
}

// ─── Notifications Data ─────────────────────────────────────────────────────--

export const enterpriseNotifications: EnterpriseNotification[] = [
  {
    id: "notif-001",
    type: "alert",
    priority: "critical",
    title: "SLA Breach Detected",
    message: "Workflow WF-006 has exceeded its SLA deadline by 9 hours. Immediate escalation required.",
    source: "Escalation Agent",
    department: "Security",
    workflowId: "WF-006",
    workflowName: "Security Incident Response",
    timestamp: "Jul 4, 2026 14:00:00",
    read: false,
    archived: false,
    actions: [
      { label: "View Workflow", action: "view-workflow" },
      { label: "Escalate", action: "escalate" },
    ],
  },
  {
    id: "notif-002",
    type: "approval",
    priority: "high",
    title: "Approval Required",
    message: "Budget approval pending for Server Infrastructure Upgrade. Requires management sign-off.",
    source: "Workflow System",
    department: "IT",
    workflowId: "WF-001",
    workflowName: "Server Infrastructure Upgrade",
    timestamp: "Jul 4, 2026 13:45:00",
    read: false,
    archived: false,
    actions: [
      { label: "Approve", action: "approve" },
      { label: "Reject", action: "reject" },
      { label: "View Details", action: "view" },
    ],
  },
  {
    id: "notif-003",
    type: "automation",
    priority: "medium",
    title: "Classification Complete",
    message: "Workflow automatically classified as IT/Hardware/Provisioning with 97% confidence.",
    source: "Classification Agent",
    department: "IT",
    workflowId: "WF-003",
    workflowName: "Employee Laptop Provisioning",
    timestamp: "Jul 4, 2026 13:30:00",
    read: false,
    archived: false,
    actions: [
      { label: "View Workflow", action: "view-workflow" },
    ],
  },
  {
    id: "notif-004",
    type: "workflow",
    priority: "medium",
    title: "Workflow Assigned",
    message: "You have been assigned as the primary owner for Quarterly Compliance Review.",
    source: "Assignment Agent",
    department: "Administration",
    workflowId: "WF-005",
    workflowName: "Quarterly Compliance Review",
    timestamp: "Jul 4, 2026 12:15:00",
    read: true,
    archived: false,
    actions: [
      { label: "View Workflow", action: "view-workflow" },
      { label: "Accept", action: "accept" },
    ],
  },
  {
    id: "notif-005",
    type: "reminder",
    priority: "high",
    title: "Deadline Reminder",
    message: "Workflow due in 24 hours. Quarterly Compliance Review requires action before Jul 5, 2026.",
    source: "Reminder Agent",
    department: "Administration",
    workflowId: "WF-005",
    workflowName: "Quarterly Compliance Review",
    timestamp: "Jul 4, 2026 08:00:00",
    read: true,
    archived: false,
    actions: [
      { label: "View Workflow", action: "view-workflow" },
      { label: "Snooze", action: "snooze" },
    ],
  },
  {
    id: "notif-006",
    type: "system",
    priority: "low",
    title: "Analytics Report Generated",
    message: "Weekly Performance Report is ready for review. Performance improved 12% week-over-week.",
    source: "Analytics Agent",
    department: "IT",
    workflowId: null,
    workflowName: null,
    timestamp: "Jul 4, 2026 06:00:00",
    read: true,
    archived: false,
    actions: [
      { label: "View Report", action: "view-report" },
    ],
  },
  {
    id: "notif-007",
    type: "alert",
    priority: "high",
    title: "Agent Performance Degraded",
    message: "Assignment Agent is experiencing degraded performance. Success rate dropped to 94.2%.",
    source: "System Monitor",
    department: "IT",
    workflowId: null,
    workflowName: null,
    timestamp: "Jul 4, 2026 12:15:00",
    read: false,
    archived: false,
    actions: [
      { label: "View Agent", action: "view-agent" },
      { label: "Restart", action: "restart" },
    ],
  },
  {
    id: "notif-008",
    type: "workflow",
    priority: "medium",
    title: "Workflow Completed",
    message: "VPN Access Request has been successfully completed and closed.",
    source: "Workflow System",
    department: "IT",
    workflowId: "WF-008",
    workflowName: "VPN Access Request",
    timestamp: "Jul 3, 2026 17:30:00",
    read: true,
    archived: false,
    actions: [
      { label: "View Details", action: "view" },
    ],
  },
  {
    id: "notif-009",
    type: "approval",
    priority: "high",
    title: "Approval Request",
    message: "Security review required for Network Configuration Update before deployment.",
    source: "Workflow System",
    department: "Security",
    workflowId: "WF-002",
    workflowName: "Network Configuration Update",
    timestamp: "Jul 4, 2026 11:00:00",
    read: false,
    archived: false,
    actions: [
      { label: "Approve", action: "approve" },
      { label: "Request Changes", action: "request-changes" },
    ],
  },
  {
    id: "notif-010",
    type: "automation",
    priority: "low",
    title: "Validation Failed",
    message: "Network Configuration Update failed automated validation. Manual review required.",
    source: "Validation Agent",
    department: "IT",
    workflowId: "WF-002",
    workflowName: "Network Configuration Update",
    timestamp: "Jul 4, 2026 14:28:00",
    read: false,
    archived: false,
    actions: [
      { label: "Review", action: "review" },
      { label: "Override", action: "override" },
    ],
  },
]

// ─── Activity Events Data ────────────────────────────────────────────────────

export const activityEvents: ActivityEvent[] = [
  {
    id: "evt-001",
    type: "sla_breach",
    title: "SLA Breach Detected",
    description: "Security Incident Response exceeded SLA deadline by 9 hours",
    user: null,
    userId: null,
    department: "Security",
    workflowId: "WF-006",
    workflowName: "Security Incident Response",
    agent: "Escalation Agent",
    agentId: "escalation-agent",
    status: "warning",
    timestamp: "Jul 4, 2026 14:00:00",
    metadata: { overHours: "9", slaTarget: "24h" },
  },
  {
    id: "evt-002",
    type: "workflow_approved",
    title: "Workflow Approved",
    description: "Budget approval granted for Server Infrastructure Upgrade",
    user: "Sarah Kim",
    userId: "user-001",
    department: "IT",
    workflowId: "WF-001",
    workflowName: "Server Infrastructure Upgrade",
    agent: null,
    agentId: null,
    status: "success",
    timestamp: "Jul 4, 2026 13:50:00",
  },
  {
    id: "evt-003",
    type: "automation_finished",
    title: "Classification Complete",
    description: "Employee Laptop Provisioning classified as IT/Hardware/Provisioning",
    user: null,
    userId: null,
    department: "IT",
    workflowId: "WF-003",
    workflowName: "Employee Laptop Provisioning",
    agent: "Classification Agent",
    agentId: "classification-agent",
    status: "success",
    timestamp: "Jul 4, 2026 13:30:00",
  },
  {
    id: "evt-004",
    type: "workflow_assigned",
    title: "Workflow Assigned",
    description: "Quarterly Compliance Review assigned to Alex Chen",
    user: "Alex Chen",
    userId: "user-002",
    department: "Administration",
    workflowId: "WF-005",
    workflowName: "Quarterly Compliance Review",
    agent: "Assignment Agent",
    agentId: "assignment-agent",
    status: "success",
    timestamp: "Jul 4, 2026 12:15:00",
  },
  {
    id: "evt-005",
    type: "reminder_sent",
    title: "Reminder Sent",
    description: "48-hour reminder sent for Quarterly Compliance Review",
    user: null,
    userId: null,
    department: "Administration",
    workflowId: "WF-005",
    workflowName: "Quarterly Compliance Review",
    agent: "Reminder Agent",
    agentId: "reminder-agent",
    status: "success",
    timestamp: "Jul 4, 2026 08:00:00",
  },
  {
    id: "evt-006",
    type: "automation_started",
    title: "Analytics Generation Started",
    description: "Weekly performance report generation initiated",
    user: null,
    userId: null,
    department: "IT",
    workflowId: null,
    workflowName: null,
    agent: "Analytics Agent",
    agentId: "analytics-agent",
    status: "pending",
    timestamp: "Jul 4, 2026 06:00:00",
  },
  {
    id: "evt-007",
    type: "workflow_completed",
    title: "Workflow Completed",
    description: "VPN Access Request successfully completed and closed",
    user: "Jordan Kim",
    userId: "user-003",
    department: "IT",
    workflowId: "WF-008",
    workflowName: "VPN Access Request",
    agent: null,
    agentId: null,
    status: "success",
    timestamp: "Jul 3, 2026 17:30:00",
  },
  {
    id: "evt-008",
    type: "escalation_triggered",
    title: "Escalation Triggered",
    description: "Security Incident Response escalated to management",
    user: null,
    userId: null,
    department: "Security",
    workflowId: "WF-006",
    workflowName: "Security Incident Response",
    agent: "Escalation Agent",
    agentId: "escalation-agent",
    status: "warning",
    timestamp: "Jul 3, 2026 17:00:00",
    metadata: { reason: "SLA breach imminent", escalatedTo: "IT Management" },
  },
  {
    id: "evt-009",
    type: "workflow_created",
    title: "Workflow Created",
    description: "Network Configuration Update submitted for approval",
    user: "Maria Santos",
    userId: "user-004",
    department: "IT",
    workflowId: "WF-002",
    workflowName: "Network Configuration Update",
    agent: null,
    agentId: null,
    status: "success",
    timestamp: "Jul 3, 2026 14:00:00",
  },
  {
    id: "evt-010",
    type: "automation_finished",
    title: "Validation Complete",
    description: "Server Infrastructure Upgrade passed all validation checks",
    user: null,
    userId: null,
    department: "IT",
    workflowId: "WF-001",
    workflowName: "Server Infrastructure Upgrade",
    agent: "Validation Agent",
    agentId: "validation-agent",
    status: "success",
    timestamp: "Jul 2, 2026 09:15:00",
    metadata: { validationType: "policy compliance", slaTier: "Critical" },
  },
  {
    id: "evt-011",
    type: "analytics_generated",
    title: "Analytics Report Ready",
    description: "Monthly department performance report generated",
    user: null,
    userId: null,
    department: "Administration",
    workflowId: null,
    workflowName: null,
    agent: "Analytics Agent",
    agentId: "analytics-agent",
    status: "success",
    timestamp: "Jul 1, 2026 06:00:00",
  },
  {
    id: "evt-012",
    type: "department_updated",
    title: "Department Configuration Updated",
    description: "IT Department SLA policies have been modified",
    user: "System Admin",
    userId: "admin-001",
    department: "IT",
    workflowId: null,
    workflowName: null,
    agent: null,
    agentId: null,
    status: "success",
    timestamp: "Jun 30, 2026 11:00:00",
  },
]

// ─── Dashboard Summary ──────────────────────────────────────────────────────

export const dashboardSummary: DashboardSummary = {
  totalWorkflows: 847,
  activeWorkflows: 234,
  completedToday: 45,
  pendingApprovals: 12,
  slaBreaches: 1,
  agentsHealthy: 6,
  agentsTotal: 7,
  notificationsUnread: 5,
  notificationsCritical: 1,
}

// ─── Helper Functions ────────────────────────────────────────────────────────

export function getAgentById(id: string): AutomationAgent | undefined {
  return automationAgentsData.find(a => a.id === id)
}

export function getNotificationsByType(type: NotificationType): EnterpriseNotification[] {
  return enterpriseNotifications.filter(n => n.type === type)
}

export function getNotificationsByPriority(priority: NotificationPriority): EnterpriseNotification[] {
  return enterpriseNotifications.filter(n => n.priority === priority)
}

export function getUnreadNotifications(): EnterpriseNotification[] {
  return enterpriseNotifications.filter(n => !n.read && !n.archived)
}

export function getActivitiesByDate(date: Date): ActivityEvent[] {
  const dateStr = date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
  return activityEvents.filter(e => e.timestamp.includes(dateStr))
}

export function getAgentIcon(iconName: string): string {
  const iconMap: Record<string, string> = {
    ShieldCheck: "Shield",
    Layers: "Layers",
    Gauge: "Gauge",
    Users: "Users",
    Bell: "Bell",
    AlertTriangle: "AlertTriangle",
    BarChart3: "BarChart3",
  }
  return iconMap[iconName] || "Bot"
}
