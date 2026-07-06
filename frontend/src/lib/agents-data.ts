// AgentHub AI Developer Agents Data

import {
  Code2,
  FileSearch,
  Bug,
  TestTube,
  FileText,
  Database,
  GitPullRequest,
  Rocket,
  type LucideIcon
} from "lucide-react"

export type AgentStatus = "available" | "busy" | "offline"

export interface AIAgent {
  id: string
  name: string
  shortName: string
  description: string
  longDescription: string
  icon: LucideIcon
  status: AgentStatus
  capabilities: string[]
  metrics: {
    totalRequests: number
    successRate: number
    avgResponseTime: string
    lastUsed: string
  }
  inputConfig: AgentInputConfig
  color: string
}

export interface AgentInputConfig {
  type: "textarea" | "code" | "url" | "mixed"
  fields: AgentInputField[]
  selectOptions?: Record<string, string[]>
}

export interface AgentInputField {
  name: string
  label: string
  placeholder: string
  type: "textarea" | "code" | "text" | "select"
  required: boolean
  rows?: number
}

export interface AgentRun {
  id: string
  agentId: string
  agentName: string
  timestamp: string
  status: "success" | "failed" | "running"
  duration: string
  inputPreview: string
  outputPreview: string
}

// ─── AI Agents Definition ─────────────────────────────────────────────────────

export const aiAgents: AIAgent[] = [
  {
    id: "code-gen",
    name: "Code Generation Agent",
    shortName: "Code Gen",
    description: "Generate production-ready code from natural language requirements. Supports 20+ programming languages with best practices built-in.",
    longDescription: "Transform your requirements into clean, production-ready code. This agent understands context, follows language idioms, and includes proper error handling, type annotations, and documentation. Perfect for boilerplate, algorithms, APIs, and full feature implementations.",
    icon: Code2,
    status: "available",
    capabilities: [
      "Multi-language support (Python, TypeScript, Go, Rust, etc.)",
      "Framework-aware generation (React, FastAPI, Express, etc.)",
      "Best practices and idiomatic code",
      "Error handling and validation",
      "Type annotations and interfaces",
    ],
    metrics: {
      totalRequests: 12847,
      successRate: 98.2,
      avgResponseTime: "2.4s",
      lastUsed: "5 min ago",
    },
    inputConfig: {
      type: "textarea",
      fields: [
        {
          name: "requirements",
          label: "Requirements",
          placeholder: "Describe what you want to build in plain language...",
          type: "textarea",
          required: true,
          rows: 6,
        },
        {
          name: "language",
          label: "Programming Language",
          placeholder: "Select language",
          type: "select",
          required: true,
        },
      ],
      selectOptions: {
        language: ["TypeScript", "Python", "JavaScript", "Go", "Rust", "Java", "C#", "Ruby", "PHP", "Swift", "Kotlin"],
      },
    },
    color: "text-blue-500",
  },
  {
    id: "code-review",
    name: "Code Review Agent",
    shortName: "Code Review",
    description: "Analyze code for bugs, security vulnerabilities, performance issues, and style violations with actionable fix suggestions.",
    longDescription: "Get comprehensive code reviews that catch what humans miss. This agent analyzes your code for security vulnerabilities, performance bottlenecks, logic errors, and style inconsistencies. Each finding includes severity level, line numbers, and concrete fix suggestions.",
    icon: FileSearch,
    status: "available",
    capabilities: [
      "Security vulnerability detection",
      "Performance optimization hints",
      "Logic error identification",
      "Style and convention checks",
      "Complexity analysis",
    ],
    metrics: {
      totalRequests: 8234,
      successRate: 99.1,
      avgResponseTime: "3.1s",
      lastUsed: "12 min ago",
    },
    inputConfig: {
      type: "code",
      fields: [
        {
          name: "code",
          label: "Code to Review",
          placeholder: "Paste your code here...",
          type: "code",
          required: true,
          rows: 12,
        },
        {
          name: "language",
          label: "Language",
          placeholder: "Select language",
          type: "select",
          required: true,
        },
      ],
      selectOptions: {
        language: ["TypeScript", "JavaScript", "Python", "Go", "Rust", "Java", "C#", "PHP"],
      },
    },
    color: "text-amber-500",
  },
  {
    id: "debug",
    name: "Debugging Agent",
    shortName: "Debugger",
    description: "Diagnose and fix bugs with detailed error explanations, root cause analysis, and corrected code snippets.",
    longDescription: "Stuck on a bug? This agent analyzes your code alongside error messages to identify root causes and provide fixes. It explains why the error occurs and shows the corrected implementation, teaching you debugging patterns along the way.",
    icon: Bug,
    status: "available",
    capabilities: [
      "Root cause analysis",
      "Error message interpretation",
      "Context-aware fix generation",
      "Edge case identification",
      "Prevention recommendations",
    ],
    metrics: {
      totalRequests: 6129,
      successRate: 97.8,
      avgResponseTime: "2.8s",
      lastUsed: "8 min ago",
    },
    inputConfig: {
      type: "mixed",
      fields: [
        {
          name: "code",
          label: "Problematic Code",
          placeholder: "Paste the code that's causing the issue...",
          type: "code",
          required: true,
          rows: 8,
        },
        {
          name: "errorMessage",
          label: "Error Message",
          placeholder: "Paste the full error message or describe the unexpected behavior...",
          type: "textarea",
          required: true,
          rows: 3,
        },
      ],
    },
    color: "text-red-500",
  },
  {
    id: "unit-test",
    name: "Unit Test Generator",
    shortName: "Test Gen",
    description: "Generate comprehensive unit tests with high coverage. Supports Jest, PyTest, JUnit, and more.",
    longDescription: "Automatically generate unit tests that cover happy paths, edge cases, and error conditions. The agent analyzes your code to understand dependencies and generates isolated, maintainable tests following AAA pattern and best practices.",
    icon: TestTube,
    status: "available",
    capabilities: [
      "Happy path test generation",
      "Edge case coverage",
      "Mock and stub creation",
      "AAA pattern adherence",
      "Multiple framework support",
    ],
    metrics: {
      totalRequests: 4521,
      successRate: 98.5,
      avgResponseTime: "3.5s",
      lastUsed: "23 min ago",
    },
    inputConfig: {
      type: "code",
      fields: [
        {
          name: "code",
          label: "Code to Test",
          placeholder: "Paste the function or class you want to test...",
          type: "code",
          required: true,
          rows: 10,
        },
        {
          name: "framework",
          label: "Test Framework",
          placeholder: "Select framework",
          type: "select",
          required: true,
        },
      ],
      selectOptions: {
        framework: ["Jest", "PyTest", "JUnit", "Mocha", "Vitest", "Go Testing", "RSpec", "PHPUnit"],
      },
    },
    color: "text-green-500",
  },
  {
    id: "api-docs",
    name: "API Documentation Agent",
    shortName: "API Docs",
    description: "Generate beautiful API documentation from code. Produces Markdown, OpenAPI specs, and interactive examples.",
    longDescription: "Transform your API code into comprehensive documentation. This agent extracts endpoints, parameters, request/response schemas, and generates clean Markdown docs with examples. Perfect for keeping docs in sync with code.",
    icon: FileText,
    status: "available",
    capabilities: [
      "Endpoint extraction",
      "Request/response schema docs",
      "Authentication documentation",
      "Code example generation",
      "OpenAPI spec generation",
    ],
    metrics: {
      totalRequests: 2847,
      successRate: 99.2,
      avgResponseTime: "2.1s",
      lastUsed: "1 hour ago",
    },
    inputConfig: {
      type: "code",
      fields: [
        {
          name: "code",
          label: "API Code",
          placeholder: "Paste your API routes, controllers, or handler functions...",
          type: "code",
          required: true,
          rows: 12,
        },
      ],
    },
    color: "text-cyan-500",
  },
  {
    id: "sql",
    name: "SQL Query Agent",
    shortName: "SQL Agent",
    description: "Convert natural language to optimized SQL queries. Understands your schema and produces explainable results.",
    longDescription: "Ask questions in plain English and get optimized SQL queries. Describe your database schema and what you want to find, and this agent generates efficient queries with JOINs, aggregations, and proper indexing hints.",
    icon: Database,
    status: "available",
    capabilities: [
      "Natural language to SQL",
      "Query optimization",
      "JOIN handling",
      "Aggregation support",
      "Index recommendations",
    ],
    metrics: {
      totalRequests: 5632,
      successRate: 96.4,
      avgResponseTime: "1.8s",
      lastUsed: "15 min ago",
    },
    inputConfig: {
      type: "mixed",
      fields: [
        {
          name: "question",
          label: "Your Question",
          placeholder: "What data do you want to retrieve? E.g., 'Show me the top 10 customers by revenue this month'",
          type: "textarea",
          required: true,
          rows: 4,
        },
        {
          name: "schemaDescription",
          label: "Schema Description",
          placeholder: "Describe your tables and columns. E.g., 'users(id, name, email), orders(id, user_id, total, created_at)'",
          type: "textarea",
          required: true,
          rows: 4,
        },
      ],
    },
    color: "text-purple-500",
  },
  {
    id: "github-pr",
    name: "GitHub PR Review Agent",
    shortName: "PR Review",
    description: "Review pull requests automatically. Get file-by-file analysis, inline comments, and approval recommendations.",
    longDescription: "Paste a PR URL and get comprehensive automated reviews. This agent analyzes diffs, checks for potential issues, suggests improvements, and provides approval recommendations based on code quality, test coverage, and documentation updates.",
    icon: GitPullRequest,
    status: "available",
    capabilities: [
      "Diff analysis",
      "Inline review comments",
      "Test coverage checks",
      "Breaking change detection",
      "Approval recommendation",
    ],
    metrics: {
      totalRequests: 3421,
      successRate: 97.1,
      avgResponseTime: "4.2s",
      lastUsed: "45 min ago",
    },
    inputConfig: {
      type: "url",
      fields: [
        {
          name: "prUrl",
          label: "Pull Request URL",
          placeholder: "https://github.com/owner/repo/pull/123",
          type: "text",
          required: true,
        },
      ],
    },
    color: "text-orange-500",
  },
  {
    id: "devops",
    name: "DevOps Agent",
    shortName: "DevOps",
    description: "Trigger GitHub Actions workflows and monitor run status. Simplify CI/CD operations from one interface.",
    longDescription: "Manage your CI/CD pipeline from AgentHub. Trigger GitHub Actions workflows with custom inputs, monitor run status in real-time, and get notified on completion. Perfect for deployments, tests, and automation workflows.",
    icon: Rocket,
    status: "available",
    capabilities: [
      "Workflow dispatch",
      "Run status monitoring",
      "Input parameter support",
      "Multiple workflow support",
      "Real-time updates",
    ],
    metrics: {
      totalRequests: 1892,
      successRate: 99.4,
      avgResponseTime: "1.2s",
      lastUsed: "2 hours ago",
    },
    inputConfig: {
      type: "mixed",
      fields: [
        {
          name: "owner",
          label: "Repository Owner",
          placeholder: "e.g., 'facebook'",
          type: "text",
          required: true,
        },
        {
          name: "repo",
          label: "Repository Name",
          placeholder: "e.g., 'react'",
          type: "text",
          required: true,
        },
        {
          name: "workflowFile",
          label: "Workflow File",
          placeholder: "e.g., 'deploy.yml'",
          type: "text",
          required: true,
        },
        {
          name: "ref",
          label: "Branch/Tag",
          placeholder: "e.g., 'main' or 'v1.0.0'",
          type: "text",
          required: true,
        },
      ],
    },
    color: "text-indigo-500",
  },
]

// ─── Mock Agent Run History ─────────────────────────────────────────────────────

export const agentRunHistory: AgentRun[] = [
  {
    id: "run-001",
    agentId: "code-gen",
    agentName: "Code Generation",
    timestamp: "Jul 6, 2026 14:32:18",
    status: "success",
    duration: "2.4s",
    inputPreview: "Create a React hook for handling form validation...",
    outputPreview: "function useFormValidation<T>(initialValues: T...",
  },
  {
    id: "run-002",
    agentId: "code-review",
    agentName: "Code Review",
    timestamp: "Jul 6, 2026 14:15:00",
    status: "success",
    duration: "3.1s",
    inputPreview: "async function fetchUserData(id: string) {...",
    outputPreview: "3 issues found: 1 high (missing error handling)...",
  },
  {
    id: "run-003",
    agentId: "debug",
    agentName: "Debugging Agent",
    timestamp: "Jul 6, 2026 13:45:22",
    status: "success",
    duration: "2.8s",
    inputPreview: "TypeError: Cannot read property 'map' of undefined...",
    outputPreview: "Root cause: The 'items' array is undefined when...",
  },
  {
    id: "run-004",
    agentId: "unit-test",
    agentName: "Unit Test Gen",
    timestamp: "Jul 6, 2026 12:30:00",
    status: "failed",
    duration: "1.2s",
    inputPreview: "function calculateTotal(items: Item[]) {...",
    outputPreview: "Error: Could not parse function signature...",
  },
  {
    id: "run-005",
    agentId: "sql",
    agentName: "SQL Agent",
    timestamp: "Jul 6, 2026 11:20:15",
    status: "success",
    duration: "1.8s",
    inputPreview: "Find all users who made purchases over $100...",
    outputPreview: "SELECT u.*, SUM(o.total) as total_spent FROM...",
  },
]

// ─── Summary Stats ─────────────────────────────────────────────────────────────

export const agentHubSummary = {
  totalAgents: 8,
  availableAgents: 8,
  totalRequestsToday: 1247,
  successRateToday: 98.2,
  avgResponseTime: "2.4s",
  mostUsedAgent: "code-gen",
}

// ─── Helper Functions ────────────────────────────────────────────────────────

export function getAgentById(id: string): AIAgent | undefined {
  return aiAgents.find(a => a.id === id)
}

export function getAgentRunsByAgent(agentId: string): AgentRun[] {
  return agentRunHistory.filter(r => r.agentId === agentId)
}

export function getRecentAgentRuns(limit: number = 5): AgentRun[] {
  return agentRunHistory.slice(0, limit)
}
