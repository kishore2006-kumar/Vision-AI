// Sprint 3 centralized mock data - Reports, Users, Departments, Help

// ─── Report Types ────────────────────────────────────────────────────────────

export type ReportStatus = "ready" | "generating" | "scheduled" | "failed"
export type ReportType = "executive" | "workflow" | "department" | "automation" | "productivity" | "performance"

export interface EnterpriseReport {
  id: string
  title: string
  description: string
  type: ReportType
  status: ReportStatus
  generatedDate: string
  owner: string
  department: string
  size: string
  format: "PDF" | "Excel" | "Both"
  pinned: boolean
  scheduled: boolean
  scheduleFrequency?: string
  data: {
    workflowsCount?: number
    completionRate?: number
    avgResolutionTime?: string
    automationRate?: number
    topDepartments?: string[]
  }
}

// ─── User Types ───────────────────────────────────────────────────────────────

export type UserRole = "admin" | "manager" | "analyst" | "operator" | "viewer"
export type UserStatus = "active" | "inactive" | "pending" | "suspended"

export interface EnterpriseUser {
  id: string
  name: string
  email: string
  role: UserRole
  department: string
  avatar: string | null
  status: UserStatus
  lastActive: string
  currentWorkflows: number
  completedWorkflows: number
  performanceScore: number
  joinDate: string
  phone: string
  location: string
  bio: string
  skills: string[]
}

// ─── Department Types ─────────────────────────────────────────────────────────

export interface DepartmentData {
  id: string
  name: string
  icon: string
  color: string
  bg: string
  manager: string
  managerId: string
  employeeCount: number
  activeWorkflows: number
  completedWorkflows: number
  avgCompletionTime: string
  performanceScore: number
  performanceTrend: "up" | "down" | "stable"
  budget: string
  location: string
  description: string
}

// ─── Help Center Types ────────────────────────────────────────────────────────

export interface HelpArticle {
  id: string
  title: string
  description: string
  category: string
  readTime: string
  helpful: number
  icon: string
}

export interface FAQItem {
  id: string
  question: string
  answer: string
  category: string
}

// ─── Reports Data ─────────────────────────────────────────────────────────────

export const reportsData: EnterpriseReport[] = [
  {
    id: "RPT-001",
    title: "Executive Summary - Q2 2026",
    description: "High-level overview of organizational performance, key metrics, and strategic recommendations for leadership.",
    type: "executive",
    status: "ready",
    generatedDate: "Jul 1, 2026",
    owner: "Sarah Kim",
    department: "Administration",
    size: "2.4 MB",
    format: "PDF",
    pinned: true,
    scheduled: true,
    scheduleFrequency: "Quarterly",
    data: {
      workflowsCount: 2847,
      completionRate: 94.2,
      avgResolutionTime: "2.4h",
      automationRate: 89.7,
      topDepartments: ["IT", "HR", "Operations"],
    },
  },
  {
    id: "RPT-002",
    title: "Workflow Performance Analysis",
    description: "Detailed breakdown of workflow types, processing times, bottlenecks, and optimization opportunities.",
    type: "workflow",
    status: "ready",
    generatedDate: "Jul 4, 2026",
    owner: "Alex Chen",
    department: "IT",
    size: "1.8 MB",
    format: "Both",
    pinned: true,
    scheduled: false,
    data: {
      workflowsCount: 847,
      completionRate: 91.5,
      avgResolutionTime: "3.2h",
      automationRate: 94.1,
    },
  },
  {
    id: "RPT-003",
    title: "HR Department Monthly Report",
    description: "Human Resources metrics including onboarding times, satisfaction scores, and policy compliance.",
    type: "department",
    status: "ready",
    generatedDate: "Jul 3, 2026",
    owner: "Maria Santos",
    department: "HR",
    size: "956 KB",
    format: "PDF",
    pinned: false,
    scheduled: true,
    scheduleFrequency: "Monthly",
    data: {
      workflowsCount: 234,
      completionRate: 97.8,
      avgResolutionTime: "1.8h",
    },
  },
  {
    id: "RPT-004",
    title: "Automation Agent Health Report",
    description: "Comprehensive analysis of agent performance, uptime, error rates, and recommendations.",
    type: "automation",
    status: "generating",
    generatedDate: "—",
    owner: "System",
    department: "IT",
    size: "—",
    format: "PDF",
    pinned: false,
    scheduled: true,
    scheduleFrequency: "Weekly",
    data: {},
  },
  {
    id: "RPT-005",
    title: "Team Productivity Dashboard",
    description: "Individual and team productivity metrics, workload distribution, and capacity planning.",
    type: "productivity",
    status: "ready",
    generatedDate: "Jul 4, 2026",
    owner: "Jordan Kim",
    department: "Operations",
    size: "1.2 MB",
    format: "Excel",
    pinned: false,
    scheduled: false,
    data: {
      workflowsCount: 456,
      completionRate: 88.9,
      avgResolutionTime: "4.1h",
      automationRate: 76.3,
    },
  },
  {
    id: "RPT-006",
    title: "SLA Compliance Report",
    description: "Service level agreement adherence across all departments with breach analysis and trends.",
    type: "performance",
    status: "ready",
    generatedDate: "Jul 2, 2026",
    owner: "Taylor Wu",
    department: "Administration",
    size: "1.5 MB",
    format: "Both",
    pinned: true,
    scheduled: true,
    scheduleFrequency: "Bi-weekly",
    data: {
      workflowsCount: 1247,
      completionRate: 96.1,
      avgResolutionTime: "1.2h",
    },
  },
]

// ─── Users Data ──────────────────────────────────────────────────────────────

export const usersData: EnterpriseUser[] = [
  {
    id: "user-001",
    name: "Alex Chen",
    email: "alex.chen@company.com",
    role: "admin",
    department: "IT",
    avatar: null,
    status: "active",
    lastActive: "2 minutes ago",
    currentWorkflows: 8,
    completedWorkflows: 234,
    performanceScore: 97,
    joinDate: "Jan 15, 2024",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    bio: "IT Operations Administrator with 5+ years experience in enterprise workflow automation.",
    skills: ["Automation", "DevOps", "Security", "Leadership"],
  },
  {
    id: "user-002",
    name: "Sarah Kim",
    email: "sarah.kim@company.com",
    role: "manager",
    department: "Administration",
    avatar: null,
    status: "active",
    lastActive: "5 minutes ago",
    currentWorkflows: 12,
    completedWorkflows: 187,
    performanceScore: 94,
    joinDate: "Mar 22, 2024",
    phone: "+1 (555) 234-5678",
    location: "New York, NY",
    bio: "Operations Manager overseeing cross-departmental workflow optimization.",
    skills: ["Management", "Analytics", "Process Design"],
  },
  {
    id: "user-003",
    name: "Jordan Kim",
    email: "jordan.kim@company.com",
    role: "analyst",
    department: "Operations",
    avatar: null,
    status: "active",
    lastActive: "1 hour ago",
    currentWorkflows: 5,
    completedWorkflows: 156,
    performanceScore: 91,
    joinDate: "Jun 1, 2024",
    phone: "+1 (555) 345-6789",
    location: "Chicago, IL",
    bio: "Business Analyst specializing in workflow efficiency metrics.",
    skills: ["Analytics", "Reporting", "Data Viz"],
  },
  {
    id: "user-004",
    name: "Maria Santos",
    email: "maria.santos@company.com",
    role: "manager",
    department: "HR",
    avatar: null,
    status: "active",
    lastActive: "15 minutes ago",
    currentWorkflows: 6,
    completedWorkflows: 203,
    performanceScore: 96,
    joinDate: "Feb 10, 2024",
    phone: "+1 (555) 456-7890",
    location: "Austin, TX",
    bio: "HR Manager focused on employee onboarding automation.",
    skills: ["HR", "Onboarding", "Compliance"],
  },
  {
    id: "user-005",
    name: "Taylor Wu",
    email: "taylor.wu@company.com",
    role: "operator",
    department: "Security",
    avatar: null,
    status: "active",
    lastActive: "30 minutes ago",
    currentWorkflows: 4,
    completedWorkflows: 89,
    performanceScore: 88,
    joinDate: "Aug 5, 2024",
    phone: "+1 (555) 567-8901",
    location: "Seattle, WA",
    bio: "Security Operations Specialist handling incident response workflows.",
    skills: ["Security", "Incident Response", "Compliance"],
  },
  {
    id: "user-006",
    name: "Sam Rivera",
    email: "sam.rivera@company.com",
    role: "analyst",
    department: "Finance",
    avatar: null,
    status: "pending",
    lastActive: "2 days ago",
    currentWorkflows: 3,
    completedWorkflows: 45,
    performanceScore: 82,
    joinDate: "Nov 1, 2024",
    phone: "+1 (555) 678-9012",
    location: "Denver, CO",
    bio: "Financial Analyst specializing in procurement workflows.",
    skills: ["Finance", "Procurement", "Analysis"],
  },
  {
    id: "user-007",
    name: "Casey Moore",
    email: "casey.moore@company.com",
    role: "viewer",
    department: "Legal",
    avatar: null,
    status: "active",
    lastActive: "3 hours ago",
    currentWorkflows: 2,
    completedWorkflows: 67,
    performanceScore: 85,
    joinDate: "Sep 15, 2024",
    phone: "+1 (555) 789-0123",
    location: "Boston, MA",
    bio: "Legal Compliance Officer reviewing policy workflows.",
    skills: ["Legal", "Compliance", "Documentation"],
  },
  {
    id: "user-008",
    name: "Jamie Lee",
    email: "jamie.lee@company.com",
    role: "operator",
    department: "IT",
    avatar: null,
    status: "inactive",
    lastActive: "1 week ago",
    currentWorkflows: 0,
    completedWorkflows: 145,
    performanceScore: 90,
    joinDate: "Apr 20, 2024",
    phone: "+1 (555) 890-1234",
    location: "Los Angeles, CA",
    bio: "IT Support Specialist on extended leave.",
    skills: ["Support", "Hardware", "Networking"],
  },
]

// ─── Departments Data ────────────────────────────────────────────────────────

export const departmentsData: DepartmentData[] = [
  {
    id: "dept-001",
    name: "Human Resources",
    icon: "Users",
    color: "text-amber-500",
    bg: "bg-amber-500/10",
    manager: "Maria Santos",
    managerId: "user-004",
    employeeCount: 24,
    activeWorkflows: 18,
    completedWorkflows: 203,
    avgCompletionTime: "1.8h",
    performanceScore: 96,
    performanceTrend: "up",
    budget: "$2.4M",
    location: "Floor 3, East Wing",
    description: "Employee relations, recruitment, benefits, and organizational development.",
  },
  {
    id: "dept-002",
    name: "Information Technology",
    icon: "Monitor",
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    manager: "Alex Chen",
    managerId: "user-001",
    employeeCount: 32,
    activeWorkflows: 45,
    completedWorkflows: 456,
    avgCompletionTime: "2.4h",
    performanceScore: 94,
    performanceTrend: "stable",
    budget: "$4.2M",
    location: "Floor 2, Server Room",
    description: "Infrastructure, software development, security, and technical support.",
  },
  {
    id: "dept-003",
    name: "Finance",
    icon: "DollarSign",
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
    manager: "Sam Rivera",
    managerId: "user-006",
    employeeCount: 18,
    activeWorkflows: 12,
    completedWorkflows: 145,
    avgCompletionTime: "3.2h",
    performanceScore: 88,
    performanceTrend: "up",
    budget: "$1.8M",
    location: "Floor 4, North Wing",
    description: "Accounting, procurement, budget planning, and financial reporting.",
  },
  {
    id: "dept-004",
    name: "Operations",
    icon: "Settings",
    color: "text-purple-500",
    bg: "bg-purple-500/10",
    manager: "Jordan Kim",
    managerId: "user-003",
    employeeCount: 28,
    activeWorkflows: 23,
    completedWorkflows: 234,
    avgCompletionTime: "2.8h",
    performanceScore: 91,
    performanceTrend: "up",
    budget: "$3.1M",
    location: "Floor 1, Main Office",
    description: "Process optimization, facilities management, and day-to-day operations.",
  },
  {
    id: "dept-005",
    name: "Security",
    icon: "Shield",
    color: "text-red-500",
    bg: "bg-red-500/10",
    manager: "Taylor Wu",
    managerId: "user-005",
    employeeCount: 12,
    activeWorkflows: 8,
    completedWorkflows: 89,
    avgCompletionTime: "1.2h",
    performanceScore: 98,
    performanceTrend: "stable",
    budget: "$1.5M",
    location: "Floor 2, Secure Zone",
    description: "Physical and digital security, incident response, and compliance.",
  },
  {
    id: "dept-006",
    name: "Legal",
    icon: "Scale",
    color: "text-indigo-500",
    bg: "bg-indigo-500/10",
    manager: "Casey Moore",
    managerId: "user-007",
    employeeCount: 8,
    activeWorkflows: 6,
    completedWorkflows: 67,
    avgCompletionTime: "4.5h",
    performanceScore: 85,
    performanceTrend: "stable",
    budget: "$1.2M",
    location: "Floor 5, West Wing",
    description: "Legal counsel, contract management, and regulatory compliance.",
  },
  {
    id: "dept-007",
    name: "Administration",
    icon: "ClipboardList",
    color: "text-cyan-500",
    bg: "bg-cyan-500/10",
    manager: "Sarah Kim",
    managerId: "user-002",
    employeeCount: 15,
    activeWorkflows: 14,
    completedWorkflows: 187,
    avgCompletionTime: "2.1h",
    performanceScore: 93,
    performanceTrend: "up",
    budget: "$1.9M",
    location: "Floor 3, Main Office",
    description: "Executive support, policy management, and cross-departmental coordination.",
  },
  {
    id: "dept-008",
    name: "Marketing",
    icon: "Megaphone",
    color: "text-pink-500",
    bg: "bg-pink-500/10",
    manager: "Riley Johnson",
    managerId: "user-009",
    employeeCount: 20,
    activeWorkflows: 16,
    completedWorkflows: 156,
    avgCompletionTime: "3.8h",
    performanceScore: 89,
    performanceTrend: "up",
    budget: "$2.8M",
    location: "Floor 4, Creative Suite",
    description: "Brand management, campaigns, content creation, and market research.",
  },
]

// ─── Help Center Data ────────────────────────────────────────────────────────

export const helpArticles: HelpArticle[] = [
  {
    id: "help-001",
    title: "Getting Started with FlowSphere",
    description: "Learn the basics of FlowSphere and set up your workspace in minutes.",
    category: "Getting Started",
    readTime: "5 min",
    helpful: 234,
    icon: "Rocket",
  },
  {
    id: "help-002",
    title: "Creating Your First Workflow",
    description: "Step-by-step guide to building and deploying automated workflows.",
    category: "Workflow Guide",
    readTime: "8 min",
    helpful: 189,
    icon: "GitBranch",
  },
  {
    id: "help-003",
    title: "Understanding Automation Agents",
    description: "Deep dive into how AI agents process and route your workflows.",
    category: "Automation Guide",
    readTime: "12 min",
    helpful: 156,
    icon: "Bot",
  },
  {
    id: "help-004",
    title: "Setting Up SLA Policies",
    description: "Configure service level agreements and escalation rules.",
    category: "Workflow Guide",
    readTime: "6 min",
    helpful: 134,
    icon: "Clock",
  },
  {
    id: "help-005",
    title: "Managing User Permissions",
    description: "Control access and roles across your organization.",
    category: "Administration",
    readTime: "7 min",
    helpful: 112,
    icon: "Users",
  },
  {
    id: "help-006",
    title: "Generating Reports",
    description: "Create executive summaries and detailed analytics reports.",
    category: "Analytics",
    readTime: "9 min",
    helpful: 98,
    icon: "BarChart3",
  },
  {
    id: "help-007",
    title: "Integration Best Practices",
    description: "Connect FlowSphere with your existing tools and systems.",
    category: "Integration",
    readTime: "10 min",
    helpful: 87,
    icon: "Plug",
  },
  {
    id: "help-008",
    title: "Troubleshooting Common Issues",
    description: "Solutions to frequently encountered problems.",
    category: "Support",
    readTime: "4 min",
    helpful: 203,
    icon: "Wrench",
  },
]

export const faqItems: FAQItem[] = [
  {
    id: "faq-001",
    question: "How do I reset my password?",
    answer: "Navigate to Settings > Security > Change Password. You can also use the forgot password link on the login page.",
    category: "Account",
  },
  {
    id: "faq-002",
    question: "Can I customize the dashboard layout?",
    answer: "Yes, dashboard widgets can be rearranged. Click and drag widgets to reorder them. Custom layouts are saved to your profile.",
    category: "Dashboard",
  },
  {
    id: "faq-003",
    question: "What happens when an SLA is breached?",
    answer: "When an SLA breach occurs, the Escalation Agent automatically notifies relevant managers and marks the workflow as escalated. Critical workflows trigger immediate alerts.",
    category: "Workflows",
  },
  {
    id: "faq-004",
    question: "How do I export reports?",
    answer: "Open any report and click the Export button. Reports can be downloaded as PDF or Excel formats. Scheduled reports are automatically delivered to your email.",
    category: "Reports",
  },
  {
    id: "faq-005",
    question: "Can I pause automation agents?",
    answer: "Yes, navigate to Automation Center, select an agent, and use the Pause button. Agents can also be configured to pause during maintenance windows.",
    category: "Automation",
  },
  {
    id: "faq-006",
    question: "How do I assign a workflow to another user?",
    answer: "Open the workflow details, click on the current assignee, and select a new team member from the dropdown. You can also use the Assignment Agent for automatic routing.",
    category: "Workflows",
  },
]

// ─── Command Palette Data ────────────────────────────────────────────────────

export const commandPaletteActions = [
  { id: "cmd-001", label: "Go to Dashboard", shortcut: "G D", path: "/dashboard", category: "Navigation" },
  { id: "cmd-002", label: "Go to Workflows", shortcut: "G W", path: "/workflows", category: "Navigation" },
  { id: "cmd-003", label: "Go to Reports", shortcut: "G R", path: "/reports", category: "Navigation" },
  { id: "cmd-004", label: "Go to Analytics", shortcut: "G A", path: "/analytics", category: "Navigation" },
  { id: "cmd-005", label: "Go to Notifications", shortcut: "G N", path: "/notifications", category: "Navigation" },
  { id: "cmd-006", label: "Go to Settings", shortcut: "G S", path: "/settings", category: "Navigation" },
  { id: "cmd-007", label: "Go to Profile", shortcut: "G P", path: "/profile", category: "Navigation" },
  { id: "cmd-008", label: "Go to Activity Center", shortcut: "G C", path: "/activity", category: "Navigation" },
  { id: "cmd-009", label: "Go to Automation Center", shortcut: "G M", path: "/automation", category: "Navigation" },
  { id: "cmd-010", label: "Go to Users", shortcut: "G U", path: "/users", category: "Navigation" },
  { id: "cmd-011", label: "Go to Departments", shortcut: "G E", path: "/departments", category: "Navigation" },
  { id: "cmd-012", label: "Go to Help", shortcut: "G H", path: "/help", category: "Navigation" },
  { id: "cmd-013", label: "Create New Workflow", shortcut: "N W", path: "/workflows/new", category: "Actions" },
  { id: "cmd-014", label: "Search Users...", shortcut: "S U", path: null, category: "Search" },
  { id: "cmd-015", label: "Search Workflows...", shortcut: "S W", path: null, category: "Search" },
  { id: "cmd-016", label: "Search Reports...", shortcut: "S R", path: null, category: "Search" },
  { id: "cmd-017", label: "Toggle Dark Mode", shortcut: "T D", path: null, category: "Actions" },
]
