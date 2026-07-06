// Extended workflow module data — Sprint 1

export type AutomationLevel = "full" | "partial" | "manual"
export type TemplateComplexity = "simple" | "moderate" | "complex"

export interface WorkflowTemplate {
  id: string
  name: string
  description: string
  category: string
  estimatedTime: string
  departments: string[]
  automationLevel: AutomationLevel
  complexity: TemplateComplexity
  stages: string[]
  tags: string[]
  usageCount: number
  icon: string
  color: string
  bg: string
  featured?: boolean
}

export interface AutomationEvent {
  id: string
  agent: string
  action: string
  result: "success" | "failed" | "skipped"
  timestamp: string
  duration: string
  details: string
}

export interface ApprovalRecord {
  id: string
  stage: string
  approver: string
  initials: string
  status: "approved" | "rejected" | "pending" | "delegated"
  timestamp: string
  comment?: string
}

export interface SLAConfig {
  targetHours: number
  elapsedHours: number
  escalationThreshold: number
  priority: string
  breached: boolean
}

export interface RecentChange {
  id: string
  field: string
  oldValue: string
  newValue: string
  changedBy: string
  timestamp: string
}

export interface WorkflowStage {
  id: string
  name: string
  type: "form" | "approval" | "automation" | "notification" | "condition"
  assignee?: string
  slaHours?: number
  required: boolean
}

// ─── Extended Template Library ───────────────────────────────────────────────

export const workflowTemplates: WorkflowTemplate[] = [
  {
    id: "it-operations",
    name: "IT Operations",
    description: "Streamline hardware requests, software installations, VPN access, and technical support escalations with automated routing and SLA tracking.",
    category: "IT",
    estimatedTime: "2–4 hours",
    departments: ["IT", "All Departments"],
    automationLevel: "full",
    complexity: "moderate",
    stages: ["Intake", "Validation", "Classification", "Assignment", "Resolution", "Closure"],
    tags: ["hardware", "software", "VPN", "support"],
    usageCount: 1842,
    icon: "Monitor",
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    featured: true,
  },
  {
    id: "incident-management",
    name: "Incident Management",
    description: "Rapid response and resolution workflow for IT and operational incidents. Ensures proper escalation, communication, and post-incident review.",
    category: "IT",
    estimatedTime: "30 min – 4 hours",
    departments: ["IT", "Security", "Operations"],
    automationLevel: "full",
    complexity: "complex",
    stages: ["Detection", "Triage", "Assignment", "Investigation", "Resolution", "Post-Mortem"],
    tags: ["incident", "P1", "critical", "outage"],
    usageCount: 943,
    icon: "AlertOctagon",
    color: "text-red-500",
    bg: "bg-red-500/10",
    featured: true,
  },
  {
    id: "employee-onboarding",
    name: "Employee Onboarding",
    description: "End-to-end new hire experience including equipment provisioning, system access, orientation scheduling, and first-week check-ins.",
    category: "HR",
    estimatedTime: "3–5 days",
    departments: ["HR", "IT", "Facilities", "Administration"],
    automationLevel: "partial",
    complexity: "complex",
    stages: ["Pre-boarding", "Day 1 Setup", "Access Provisioning", "Orientation", "30-Day Review"],
    tags: ["new hire", "onboarding", "provisioning"],
    usageCount: 1124,
    icon: "UserPlus",
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
    featured: true,
  },
  {
    id: "leave-approval",
    name: "Leave Approval",
    description: "Automated leave request processing with manager approvals, balance validation, calendar integration, and payroll notification.",
    category: "HR",
    estimatedTime: "1–2 business days",
    departments: ["HR", "All Departments"],
    automationLevel: "partial",
    complexity: "simple",
    stages: ["Request", "Balance Check", "Manager Approval", "HR Confirmation", "Notification"],
    tags: ["leave", "vacation", "PTO", "absence"],
    usageCount: 2341,
    icon: "CalendarOff",
    color: "text-amber-500",
    bg: "bg-amber-500/10",
  },
  {
    id: "procurement-request",
    name: "Procurement Request",
    description: "Standardized purchasing workflow with budget validation, multi-level approvals, vendor selection, and finance integration.",
    category: "Administration",
    estimatedTime: "2–7 business days",
    departments: ["Administration", "Finance", "All Departments"],
    automationLevel: "partial",
    complexity: "complex",
    stages: ["Request", "Budget Validation", "Manager Approval", "Finance Review", "PO Creation", "Delivery"],
    tags: ["purchase", "vendor", "budget", "PO"],
    usageCount: 674,
    icon: "ShoppingCart",
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
  {
    id: "it-asset-request",
    name: "IT Asset Request",
    description: "Manage hardware and software asset requests from submission through procurement, delivery, and asset registry update.",
    category: "IT",
    estimatedTime: "3–10 business days",
    departments: ["IT", "All Departments"],
    automationLevel: "partial",
    complexity: "moderate",
    stages: ["Request", "Inventory Check", "Approval", "Procurement", "Delivery", "Asset Registry"],
    tags: ["asset", "hardware", "laptop", "equipment"],
    usageCount: 512,
    icon: "Package",
    color: "text-cyan-500",
    bg: "bg-cyan-500/10",
  },
  {
    id: "security-incident",
    name: "Security Incident",
    description: "Structured security incident response including threat classification, containment actions, stakeholder notification, and forensic documentation.",
    category: "Security",
    estimatedTime: "1–48 hours",
    departments: ["Security", "IT", "Legal", "Management"],
    automationLevel: "full",
    complexity: "complex",
    stages: ["Detection", "Classification", "Containment", "Eradication", "Recovery", "Documentation"],
    tags: ["security", "breach", "threat", "compliance"],
    usageCount: 287,
    icon: "ShieldAlert",
    color: "text-orange-500",
    bg: "bg-orange-500/10",
  },
  {
    id: "maintenance-request",
    name: "Maintenance Request",
    description: "Facilities and equipment maintenance workflow covering scheduled PMs, reactive repairs, vendor coordination, and compliance logging.",
    category: "Facilities",
    estimatedTime: "4–48 hours",
    departments: ["Facilities", "Maintenance", "Operations"],
    automationLevel: "partial",
    complexity: "moderate",
    stages: ["Request", "Assessment", "Scheduling", "Work Order", "Execution", "Sign-off"],
    tags: ["maintenance", "repair", "HVAC", "equipment"],
    usageCount: 398,
    icon: "Wrench",
    color: "text-stone-500",
    bg: "bg-stone-500/10",
  },
  {
    id: "facilities",
    name: "Facilities Management",
    description: "Manage workspace allocation, building access, infrastructure issues, and space planning requests across all locations.",
    category: "Facilities",
    estimatedTime: "4–8 hours",
    departments: ["Facilities", "Administration"],
    automationLevel: "partial",
    complexity: "moderate",
    stages: ["Request", "Assessment", "Approval", "Scheduling", "Completion"],
    tags: ["facilities", "workspace", "access", "building"],
    usageCount: 923,
    icon: "Building2",
    color: "text-teal-500",
    bg: "bg-teal-500/10",
  },
  {
    id: "administration",
    name: "Administration",
    description: "Handle document approvals, policy updates, procurement requests, and compliance workflows with full audit trail.",
    category: "Administration",
    estimatedTime: "1–3 days",
    departments: ["Administration", "Legal", "Finance"],
    automationLevel: "manual",
    complexity: "moderate",
    stages: ["Submission", "Review", "Approval", "Distribution", "Archival"],
    tags: ["documents", "policy", "compliance", "approval"],
    usageCount: 674,
    icon: "ClipboardList",
    color: "text-violet-500",
    bg: "bg-violet-500/10",
  },
]

// ─── Automation History ───────────────────────────────────────────────────────

export const automationHistory: AutomationEvent[] = [
  {
    id: "ae-001",
    agent: "Validation Agent",
    action: "Request validation",
    result: "success",
    timestamp: "Jun 28, 2026 09:15:02",
    duration: "1.1s",
    details: "All required fields present. Policy compliance check passed. SLA tier assigned: Priority.",
  },
  {
    id: "ae-002",
    agent: "Classification Agent",
    action: "Auto-classification",
    result: "success",
    timestamp: "Jun 28, 2026 09:15:04",
    duration: "2.3s",
    details: "Classified as IT/Infrastructure/Server. Confidence: 97.2%. Category confirmed by ruleset v4.1.",
  },
  {
    id: "ae-003",
    agent: "Priority Agent",
    action: "Priority scoring",
    result: "success",
    timestamp: "Jun 28, 2026 09:15:06",
    duration: "0.8s",
    details: "Impact score: 87/100. Urgency score: 72/100. Composite priority: Critical. SLA: 8h target.",
  },
  {
    id: "ae-004",
    agent: "Assignment Agent",
    action: "Team routing",
    result: "success",
    timestamp: "Jun 28, 2026 09:15:09",
    duration: "3.1s",
    details: "Routed to IT Infrastructure team. Assignee: Alex Chen. Workload balance score: 0.82.",
  },
  {
    id: "ae-005",
    agent: "Reminder Agent",
    action: "Deadline reminder",
    result: "success",
    timestamp: "Jul 2, 2026 08:00:00",
    duration: "0.5s",
    details: "Sent reminder to Alex Chen. 48h before SLA deadline. Email + in-app notification dispatched.",
  },
  {
    id: "ae-006",
    agent: "Escalation Agent",
    action: "SLA check",
    result: "skipped",
    timestamp: "Jul 3, 2026 17:00:00",
    duration: "0.9s",
    details: "SLA check performed. Progress at 65%. No escalation required. Next check in 4h.",
  },
]

// ─── Approval History ─────────────────────────────────────────────────────────

export const approvalHistory: ApprovalRecord[] = [
  {
    id: "apr-001",
    stage: "Budget Approval",
    approver: "Director of IT",
    initials: "DI",
    status: "approved",
    timestamp: "Jun 28, 2026 11:30",
    comment: "Approved. Ensure procurement follows vendor SLA guidelines.",
  },
  {
    id: "apr-002",
    stage: "Security Review",
    approver: "CISO Office",
    initials: "CO",
    status: "approved",
    timestamp: "Jun 29, 2026 14:15",
    comment: "Security posture verified. Proceed with deployment checklist.",
  },
  {
    id: "apr-003",
    stage: "Infrastructure Sign-off",
    approver: "VP Engineering",
    initials: "VE",
    status: "pending",
    timestamp: "—",
    comment: undefined,
  },
]

// ─── SLA Configuration ────────────────────────────────────────────────────────

export const slaConfigs: Record<string, SLAConfig> = {
  "WF-001": {
    targetHours: 48,
    elapsedHours: 139,
    escalationThreshold: 80,
    priority: "critical",
    breached: false,
  },
  "WF-002": {
    targetHours: 72,
    elapsedHours: 48,
    escalationThreshold: 75,
    priority: "high",
    breached: false,
  },
  "WF-006": {
    targetHours: 24,
    elapsedHours: 217,
    escalationThreshold: 90,
    priority: "high",
    breached: true,
  },
}

export const defaultSLA: SLAConfig = {
  targetHours: 48,
  elapsedHours: 12,
  escalationThreshold: 80,
  priority: "medium",
  breached: false,
}

// ─── Recent Changes ───────────────────────────────────────────────────────────

export const recentChanges: RecentChange[] = [
  {
    id: "rc-001",
    field: "Status",
    oldValue: "Pending",
    newValue: "Active",
    changedBy: "Assignment Agent",
    timestamp: "Jun 28, 2026 09:18",
  },
  {
    id: "rc-002",
    field: "Assignee",
    oldValue: "Unassigned",
    newValue: "Alex Chen",
    changedBy: "Assignment Agent",
    timestamp: "Jun 28, 2026 09:18",
  },
  {
    id: "rc-003",
    field: "Priority",
    oldValue: "High",
    newValue: "Critical",
    changedBy: "Priority Agent",
    timestamp: "Jun 28, 2026 09:15",
  },
  {
    id: "rc-004",
    field: "Progress",
    oldValue: "40%",
    newValue: "65%",
    changedBy: "Alex Chen",
    timestamp: "Jul 3, 2026 14:22",
  },
  {
    id: "rc-005",
    field: "Due Date",
    oldValue: "2026-07-08",
    newValue: "2026-07-10",
    changedBy: "Sarah Kim",
    timestamp: "Jun 30, 2026 10:05",
  },
]

// ─── Default Workflow Stages ──────────────────────────────────────────────────

export const defaultStages: WorkflowStage[] = [
  { id: "s1", name: "Intake & Submission", type: "form", required: true },
  { id: "s2", name: "Automated Validation", type: "automation", assignee: "Validation Agent", slaHours: 1, required: true },
  { id: "s3", name: "Manager Approval", type: "approval", assignee: "Department Manager", slaHours: 24, required: true },
  { id: "s4", name: "Work Execution", type: "form", slaHours: 48, required: true },
  { id: "s5", name: "Completion Review", type: "approval", assignee: "Requestor", slaHours: 8, required: false },
  { id: "s6", name: "Closure & Notification", type: "notification", required: true },
]

export const teamMembers = [
  "Alex Chen", "Maria Santos", "Jordan Kim", "Taylor Wu", "Sam Rivera", "Casey Moore",
  "Jamie Lee", "Morgan Davis", "Riley Johnson", "Blake Wilson",
]

export const automationAgents = [
  "Validation Agent",
  "Classification Agent",
  "Priority Agent",
  "Assignment Agent",
  "Reminder Agent",
  "Escalation Agent",
  "Analytics Agent",
]
