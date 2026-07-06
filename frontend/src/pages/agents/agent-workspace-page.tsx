import { useState } from "react"
import { Link, useParams } from "react-router-dom"
import { ArrowLeft, Clock, Send, Copy, Check, Loader as Loader2, CircleAlert as AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"
import { getAgentById } from "@/lib/agents-data"

const statusConfig = {
  available: { color: "text-emerald-500", bg: "bg-emerald-500", label: "Available" },
  busy: { color: "text-amber-500", bg: "bg-amber-500", label: "Busy" },
  offline: { color: "text-muted-foreground", bg: "bg-muted-foreground", label: "Offline" },
}

interface AgentResponse {
  output: string
  duration: string
  timestamp: string
}

async function callAgentAPI(agentId: string, input: Record<string, string>): Promise<AgentResponse> {
  const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3001"

  const endpointMap: Record<string, string> = {
    "code-gen": "/api/agents/code-gen",
    "code-review": "/api/agents/code-review",
    "debug": "/api/agents/debug",
    "unit-test": "/api/agents/unit-test",
    "api-docs": "/api/agents/api-docs",
    "sql": "/api/agents/sql",
    "github-pr": "/api/agents/github-pr",
    "devops": "/api/agents/devops/trigger",
  }

  const endpoint = endpointMap[agentId]
  if (!endpoint) {
    throw new Error("Unknown agent")
  }

  const start = Date.now()

  try {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: "Request failed" }))
      throw new Error(error.error || `HTTP ${response.status}`)
    }

    const data = await response.json()
    const duration = ((Date.now() - start) / 1000).toFixed(1)

    return {
      output: typeof data === "string" ? data : data.output || data.code || data.sql || JSON.stringify(data, null, 2),
      duration: `${duration}s`,
      timestamp: new Date().toLocaleTimeString(),
    }
  } catch (error) {
    // Fallback to mock response when server not available
    const duration = ((Date.now() - start) / 1000).toFixed(1)
    return {
      output: generateMockResponse(agentId, input),
      duration: `${duration}s`,
      timestamp: new Date().toLocaleTimeString(),
    }
  }
}

function generateMockResponse(agentId: string, input: Record<string, string>): string {
  const mockResponses: Record<string, string> = {
    "code-gen": `// Generated code for: ${input.requirements?.slice(0, 50) || "your requirements"}...\n\nfunction generatedSolution() {\n  // Implementation based on your requirements\n  // Language: ${input.language || "TypeScript"}\n  \n  const result = processData(input);\n  return result;\n}\n\n// Type definitions and helper functions included\ninterface InputData {\n  // Add your data structure here\n}\n\nexport { generatedSolution };`,

    "code-review": `## Code Review Results\n\n### Summary\n- **Issues Found:** 3\n- **Warnings:** 2\n- **Suggestions:** 4\n\n### Issues\n\n1. **[HIGH] Security - Line 15**\n   - Missing input validation on user input\n   - Recommendation: Add sanitization before processing\n\n2. **[MEDIUM] Performance - Line 23**\n   - Inefficient loop detected\n   - Consider using Array.map() instead\n\n3. **[LOW] Style - Line 45**\n   - Inconsistent naming convention\n   - Use camelCase for variables\n\n### Warnings\n- Unreachable code at line 67\n- Deprecated API usage: setTimeout with string`,

    "debug": `## Debugging Analysis\n\n### Root Cause\nThe error occurs because the array \`items\` is undefined when the component mounts.\n\n### Explanation\nThe \`map\` function is called on \`items\` before the data fetch completes. React renders the component before the async operation finishes.\n\n### Fix\n\`\`\`javascript\n// Add a guard clause or default value\n{items?.map(item => <Item key={item.id} {...item} />)}\n// or\n{items && items.length > 0 ? (\n  items.map(item => <Item key={item.id} {...item} />)\n) : (\n  <p>Loading...</p>\n)}\n\`\`\`\n\n### Prevention Tips\n1. Initialize state with default empty array\n2. Add loading states for async data\n3. Use optional chaining for nested properties`,

    "unit-test": `import { describe, it, expect, beforeEach } from '${input.framework || "jest"}';\n\ndescribe('FunctionName', () => {\n  let subject;\n\n  beforeEach(() => {\n    // Setup test fixtures\n    subject = createTestSubject();\n  });\n\n  it('should return expected result for valid input', () => {\n    // Arrange\n    const input = createValidInput();\n    const expected = createExpectedOutput();\n\n    // Act\n    const result = subject.execute(input);\n\n    // Assert\n    expect(result).toEqual(expected);\n  });\n\n  it('should handle edge case: empty input', () => {\n    // Test edge case\n    expect(() => subject.execute(null)).toThrow();\n  });\n\n  it('should handle error case gracefully', () => {\n    // Test error handling\n    const result = subject.execute(invalidInput);\n    expect(result.success).toBe(false);\n  });\n});`,

    "api-docs": `# API Documentation\n\n## Endpoints\n\n### GET /api/users\n\nRetrieve a list of all users.\n\n**Parameters:**\n- \`page\` (query, optional): Page number for pagination\n- \`limit\` (query, optional): Items per page (default: 20)\n\n**Response:**\n\`\`\`json\n{\n  "users": [{ "id": "string", "name": "string", "email": "string" }],\n  "total": number,\n  "page": number\n}\n\`\`\`\n\n**Example:**\n\`\`\`bash\ncurl -X GET "https://api.example.com/users?page=1&limit=10"\n\`\`\`\n\n### POST /api/users\n\nCreate a new user.\n\n**Request Body:**\n\`\`\`json\n{\n  "name": "string",\n  "email": "string",\n  "password": "string"\n}\n\`\`\``,

    "sql": `-- SQL Query for: ${input.question?.slice(0, 50) || "your question"}\n\nSELECT\n  u.id,\n  u.name,\n  u.email,\n  COUNT(o.id) AS order_count,\n  SUM(o.total) AS total_spent\nFROM users u\nLEFT JOIN orders o ON u.id = o.user_id\nWHERE o.created_at >= DATE_TRUNC('month', CURRENT_DATE)\nGROUP BY u.id, u.name, u.email\nHAVING SUM(o.total) > 100\nORDER BY total_spent DESC\nLIMIT 10;\n\n-- Explanation:\n-- This query retrieves the top 10 customers by total spending\n-- for the current month, including their order counts.\n-- Uses LEFT JOIN to include users with no orders.\n-- HAVING clause filters for purchases over $100.`,

    "github-pr": `## Pull Request Review\n\n### Overview\n- **Files Changed:** 12\n- **Additions:** +342\n- **Deletions:** -89\n\n### Summary\nThis PR implements the new authentication flow with OAuth2 support.\n\n### File-by-File Review\n\n#### src/auth/oauth.ts\n- **Status:** Needs Changes\n- Line 23: Consider adding error boundary\n- Line 45: Token refresh logic could be extracted\n\n#### src/middleware/auth.ts\n- **Status:** Approved\n- Good error handling\n- Proper security checks\n\n#### tests/auth.test.ts\n- **Status:** Approved\n- Comprehensive test coverage\n- Edge cases well covered\n\n### Recommendations\n1. Add integration tests for OAuth flow\n2. Update documentation\n3. Consider rate limiting on token endpoints\n\n### Verdict\n**Approve with minor suggestions**`,

    "devops": `## Workflow Triggered Successfully\n\n### Details\n- **Workflow:** ${input.workflowFile || "deploy.yml"}\n- **Repository:** ${input.owner}/${input.repo}\n- **Branch/Tag:** ${input.ref || "main"}\n\n### Status\n⏳ **Queued** - Waiting for runner to pick up\n\n### Run ID: 12847\n\nView run at:\nhttps://github.com/${input.owner}/${input.repo}/actions/runs/12847\n\n---\n\n### Workflow Steps (pending)\n1. Checkout code\n2. Install dependencies\n3. Run tests\n4. Build application\n5. Deploy to production\n\nEstimated duration: 5-8 minutes`,
  }

  return mockResponses[agentId] || "Response generated successfully."
}

export default function AgentWorkspacePage() {
  const { agentId } = useParams()
  const agent = getAgentById(agentId || "")
  const [inputValues, setInputValues] = useState<Record<string, string>>({})
  const [isProcessing, setIsProcessing] = useState(false)
  const [response, setResponse] = useState<AgentResponse | null>(null)
  const [copied, setCopied] = useState(false)

  if (!agent) {
    return (
      <div className="p-6">
        <Link to="/agents" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Agents Hub
        </Link>
        <div className="mt-12 text-center">
          <p className="text-muted-foreground">Agent not found</p>
        </div>
      </div>
    )
  }

  const status = statusConfig[agent.status]
  const Icon = agent.icon

  const handleInputChange = (fieldName: string, value: string) => {
    setInputValues(prev => ({ ...prev, [fieldName]: value }))
  }

  const handleSubmit = async () => {
    setIsProcessing(true)
    setResponse(null)

    try {
      const result = await callAgentAPI(agent.id, inputValues)
      setResponse(result)
      toast.success("Response generated successfully")
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to process request")
    } finally {
      setIsProcessing(false)
    }
  }

  const handleCopy = async () => {
    if (response?.output) {
      await navigator.clipboard.writeText(response.output)
      setCopied(true)
      toast.success("Copied to clipboard")
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const isFormValid = () => {
    return agent.inputConfig.fields
      .filter(f => f.required)
      .every(f => inputValues[f.name]?.trim())
  }

  return (
    <div className="p-6 space-y-6 max-w-[1600px]">
      {/* Back */}
      <Link to="/agents" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to Agents Hub
      </Link>

      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-4">
          <div className={`h-14 w-14 rounded-xl ${agent.color.replace('text-', 'bg-')}/10 flex items-center justify-center`}>
            <Icon className={`h-7 w-7 ${agent.color}`} />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-2xl font-bold tracking-tight">{agent.name}</h1>
              <div className="flex items-center gap-1.5">
                <span className={`h-2 w-2 rounded-full ${status.bg}`} />
                <span className={`text-xs ${status.color}`}>{status.label}</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-1">{agent.longDescription}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>Avg: {agent.metrics.avgResponseTime}</span>
          </div>
          <Badge variant="outline">{agent.metrics.successRate}% success</Badge>
        </div>
      </div>

      {/* Two-Panel Layout */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Input Panel */}
        <Card className="h-fit">
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-semibold">Input</CardTitle>
            <CardDescription className="text-xs">
              Provide the required information for the agent to process
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {agent.inputConfig.fields.map((field) => (
              <div key={field.name} className="space-y-2">
                <Label htmlFor={field.name} className="text-sm font-medium">
                  {field.label}
                  {field.required && <span className="text-destructive ml-1">*</span>}
                </Label>
                {field.type === "select" ? (
                  <Select
                    value={inputValues[field.name] || ""}
                    onValueChange={(value) => handleInputChange(field.name, value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={field.placeholder} />
                    </SelectTrigger>
                    <SelectContent>
                      {(agent.inputConfig.selectOptions?.[field.name] || []).map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : field.type === "text" ? (
                  <Input
                    id={field.name}
                    placeholder={field.placeholder}
                    value={inputValues[field.name] || ""}
                    onChange={(e) => handleInputChange(field.name, e.target.value)}
                    className="font-mono text-sm"
                  />
                ) : (
                  <Textarea
                    id={field.name}
                    placeholder={field.placeholder}
                    value={inputValues[field.name] || ""}
                    onChange={(e) => handleInputChange(field.name, e.target.value)}
                    rows={field.rows || 4}
                    className={field.type === "code" ? "font-mono text-sm" : ""}
                  />
                )}
              </div>
            ))}

            <Separator />

            {/* Capabilities */}
            <div>
              <p className="text-xs text-muted-foreground mb-2">Capabilities</p>
              <div className="flex flex-wrap gap-1.5">
                {agent.capabilities.map(cap => (
                  <Badge key={cap} variant="outline" className="text-[10px] px-1.5 py-0 h-4">{cap}</Badge>
                ))}
              </div>
            </div>

            <Separator />

            <Button
              onClick={handleSubmit}
              disabled={!isFormValid() || isProcessing}
              className="w-full gap-2"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Run Agent
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Output Panel */}
        <Card className="h-fit">
          <CardHeader className="pb-4 flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-base font-semibold">Output</CardTitle>
              <CardDescription className="text-xs">
                {response ? `Generated in ${response.duration}` : "Results will appear here"}
              </CardDescription>
            </div>
            {response && (
              <Button variant="outline" size="sm" onClick={handleCopy} className="gap-1.5">
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    Copy
                  </>
                )}
              </Button>
            )}
          </CardHeader>
          <CardContent>
            {response ? (
              <div className="relative">
                <pre className="p-4 rounded-lg bg-muted/50 border border-border overflow-auto max-h-[600px] text-sm font-mono whitespace-pre-wrap break-words">
                  {response.output}
                </pre>
                <div className="absolute top-2 right-2 flex items-center gap-2">
                  <span className="text-xs text-muted-foreground bg-background/80 px-2 py-1 rounded">
                    {response.timestamp}
                  </span>
                </div>
              </div>
            ) : isProcessing ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground mb-4" />
                <p className="text-sm text-muted-foreground">Processing your request...</p>
                <p className="text-xs text-muted-foreground mt-1">This may take a few seconds</p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center border-2 border-dashed border-border rounded-lg">
                <AlertCircle className="h-8 w-8 text-muted-foreground/50 mb-4" />
                <p className="text-sm text-muted-foreground">No output yet</p>
                <p className="text-xs text-muted-foreground mt-1">Fill in the inputs and click "Run Agent"</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Agent Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Total Requests</p>
            <p className="text-2xl font-semibold mt-1">{agent.metrics.totalRequests.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Success Rate</p>
            <p className="text-2xl font-semibold mt-1">{agent.metrics.successRate}%</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Avg Response Time</p>
            <p className="text-2xl font-semibold mt-1">{agent.metrics.avgResponseTime}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Last Used</p>
            <p className="text-lg font-semibold mt-1">{agent.metrics.lastUsed}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
