import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import {
  ArrowLeft,
  Save,
  Eye,
  Rocket,
  Plus,
  GripVertical,
  Trash2,
  Clock,
  Bot,
  Users,
  Settings2,
  ChevronDown,
  ChevronUp,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { PageHeader } from "@/components/shared/page-header"
import { defaultStages, teamMembers, automationAgents, workflowTemplates } from "@/lib/workflow-data"
import type { WorkflowStage } from "@/lib/workflow-data"

const categories = ["IT", "HR", "Facilities", "Security", "Administration", "Operations"]
const priorities = ["critical", "high", "medium", "low"]
const departments = ["IT", "HR", "Facilities", "Security", "Administration", "Finance", "Operations", "Legal", "All Departments"]

export default function WorkflowBuilderPage() {
  const navigate = useNavigate()
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [priority, setPriority] = useState<string>("medium")
  const [department, setDepartment] = useState("")
  const [assignedTeam, setAssignedTeam] = useState<string[]>([])
  const [selectedAgents, setSelectedAgents] = useState<string[]>([])
  const [stages, setStages] = useState<WorkflowStage[]>(defaultStages)
  const [slaEnabled, setSlaEnabled] = useState(true)
  const [slaTargetHours, setSlaTargetHours] = useState(48)
  const [slaEscalationThreshold, setSlaEscalationThreshold] = useState(80)

  const toggleTeamMember = (member: string) => {
    setAssignedTeam(prev => prev.includes(member) ? prev.filter(m => m !== member) : [...prev, member])
  }

  const toggleAgent = (agent: string) => {
    setSelectedAgents(prev => prev.includes(agent) ? prev.filter(a => a !== agent) : [...prev, agent])
  }

  const updateStage = (id: string, updates: Partial<WorkflowStage>) => {
    setStages(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s))
  }

  const removeStage = (id: string) => {
    setStages(prev => prev.filter(s => s.id !== id))
  }

  const addStage = () => {
    const newId = `s${Date.now()}`
    setStages(prev => [...prev, { id: newId, name: "New Stage", type: "form", required: true }])
  }

  const moveStage = (index: number, direction: "up" | "down") => {
    const newStages = [...stages]
    const targetIndex = direction === "up" ? index - 1 : index + 1
    if (targetIndex < 0 || targetIndex >= newStages.length) return
    ;[newStages[index], newStages[targetIndex]] = [newStages[targetIndex], newStages[index]]
    setStages(newStages)
  }

  const handleSaveDraft = () => {
    // In real app, save to backend
    console.log({ name, description, category, priority, department, assignedTeam, selectedAgents, stages, slaEnabled, slaTargetHours, slaEscalationThreshold })
  }

  const handlePreview = () => {
    // In real app, show preview modal
    alert("Preview functionality - would open a modal showing the workflow preview")
  }

  const handlePublish = () => {
    // In real app, save and navigate
    handleSaveDraft()
    navigate("/workflows")
  }

  const isValid = name.trim() && description.trim() && category && department

  return (
    <div className="p-6 space-y-6 max-w-[1400px]">
      <Link to="/workflows" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to workflows
      </Link>

      <PageHeader title="Workflow Builder" description="Create a new workflow with stages, automation, and SLA configuration">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleSaveDraft} className="gap-1.5">
            <Save className="h-3.5 w-3.5" />
            Save Draft
          </Button>
          <Button variant="outline" size="sm" onClick={handlePreview} className="gap-1.5">
            <Eye className="h-3.5 w-3.5" />
            Preview
          </Button>
          <Button size="sm" onClick={handlePublish} disabled={!isValid} className="gap-1.5">
            <Rocket className="h-3.5 w-3.5" />
            Publish
          </Button>
        </div>
      </PageHeader>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold">Basic Information</CardTitle>
              <CardDescription className="text-xs">Define the core details of your workflow</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Workflow Name *</Label>
                <Input
                  id="name"
                  placeholder="e.g., Server Infrastructure Upgrade"
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the purpose and scope of this workflow..."
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Category *</Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(cat => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Priority</Label>
                  <Select value={priority} onValueChange={setPriority}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {priorities.map(p => (
                        <SelectItem key={p} value={p} className="capitalize">{p}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Department *</Label>
                <Select value={department} onValueChange={setDepartment}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map(dep => (
                      <SelectItem key={dep} value={dep}>{dep}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Workflow Stages */}
          <Card>
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-sm font-semibold">Workflow Stages</CardTitle>
                <CardDescription className="text-xs">Define the steps in your workflow process</CardDescription>
              </div>
              <Button variant="outline" size="sm" onClick={addStage} className="gap-1.5">
                <Plus className="h-3.5 w-3.5" />
                Add Stage
              </Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {stages.map((stage, index) => (
                <div key={stage.id} className="border border-border rounded-lg overflow-hidden">
                  <div className="flex items-center gap-3 p-3 bg-muted/30">
                    <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
                    <div className="flex-1">
                      <Input
                        value={stage.name}
                        onChange={e => updateStage(stage.id, { name: e.target.value })}
                        className="h-8 text-sm bg-transparent border-transparent hover:border-border focus:border-primary"
                      />
                    </div>
                    <Badge variant="outline" className="text-xs capitalize">{stage.type}</Badge>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => moveStage(index, "up")}
                        disabled={index === 0}
                      >
                        <ChevronUp className="h-3.5 w-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => moveStage(index, "down")}
                        disabled={index === stages.length - 1}
                      >
                        <ChevronDown className="h-3.5 w-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-destructive hover:text-destructive"
                        onClick={() => removeStage(stage.id)}
                        disabled={stages.length <= 1}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                  <div className="px-3 py-2 flex items-center gap-4 border-t border-border bg-muted/10">
                    <div className="flex items-center gap-2">
                      <Label className="text-xs text-muted-foreground">Type:</Label>
                      <Select value={stage.type} onValueChange={(v) => updateStage(stage.id, { type: v as WorkflowStage["type"] })}>
                        <SelectTrigger className="h-7 text-xs w-28">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="form">Form</SelectItem>
                          <SelectItem value="approval">Approval</SelectItem>
                          <SelectItem value="automation">Automation</SelectItem>
                          <SelectItem value="notification">Notification</SelectItem>
                          <SelectItem value="condition">Condition</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    {(stage.type === "approval" || stage.type === "automation") && (
                      <div className="flex items-center gap-2">
                        <Label className="text-xs text-muted-foreground">Assignee:</Label>
                        <Input
                          value={stage.assignee || ""}
                          onChange={e => updateStage(stage.id, { assignee: e.target.value })}
                          placeholder="e.g., Manager"
                          className="h-7 text-xs w-36"
                        />
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <Label className="text-xs text-muted-foreground">SLA (h):</Label>
                      <Input
                        type="number"
                        value={stage.slaHours || ""}
                        onChange={e => updateStage(stage.id, { slaHours: e.target.value ? parseInt(e.target.value) : undefined })}
                        placeholder="Optional"
                        className="h-7 text-xs w-20"
                      />
                    </div>
                    <div className="flex items-center gap-2 ml-auto">
                      <Label className="text-xs text-muted-foreground">Required:</Label>
                      <Switch
                        checked={stage.required}
                        onCheckedChange={(checked) => updateStage(stage.id, { required: checked })}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* SLA Configuration */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <Clock className="h-4 w-4" />
                SLA Configuration
              </CardTitle>
              <CardDescription className="text-xs">Set service level agreement targets</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="font-medium">Enable SLA Tracking</Label>
                  <p className="text-xs text-muted-foreground mt-0.5">Track and enforce service level targets</p>
                </div>
                <Switch checked={slaEnabled} onCheckedChange={setSlaEnabled} />
              </div>
              {slaEnabled && (
                <>
                  <Separator />
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Target Completion (hours)</Label>
                      <Input
                        type="number"
                        value={slaTargetHours}
                        onChange={e => setSlaTargetHours(parseInt(e.target.value) || 0)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Escalation Threshold (%)</Label>
                      <Input
                        type="number"
                        value={slaEscalationThreshold}
                        onChange={e => setSlaEscalationThreshold(parseInt(e.target.value) || 0)}
                        max={100}
                        min={0}
                      />
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Workflow will escalate when {slaEscalationThreshold}% of SLA time ({Math.floor(slaTargetHours * slaEscalationThreshold / 100)}h) has elapsed.
                  </p>
                </>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Team Assignment */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <Users className="h-4 w-4" />
                Assigned Team
              </CardTitle>
              <CardDescription className="text-xs">Select team members responsible for this workflow</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {teamMembers.map(member => (
                  <Badge
                    key={member}
                    variant={assignedTeam.includes(member) ? "default" : "outline"}
                    className="cursor-pointer transition-all hover:bg-primary/10"
                    onClick={() => toggleTeamMember(member)}
                  >
                    {member}
                  </Badge>
                ))}
              </div>
              {assignedTeam.length > 0 && (
                <p className="text-xs text-muted-foreground mt-3">{assignedTeam.length} member{assignedTeam.length > 1 ? "s" : ""} selected</p>
              )}
            </CardContent>
          </Card>

          {/* Automation Agents */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <Bot className="h-4 w-4" />
                Automation Agents
              </CardTitle>
              <CardDescription className="text-xs">Enable AI agents to automate workflow tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {automationAgents.map(agent => (
                  <div key={agent} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/40 transition-colors">
                    <span className="text-sm">{agent}</span>
                    <Switch
                      checked={selectedAgents.includes(agent)}
                      onCheckedChange={() => toggleAgent(agent)}
                    />
                  </div>
                ))}
              </div>
              {selectedAgents.length > 0 && (
                <p className="text-xs text-muted-foreground mt-3">{selectedAgents.length} agent{selectedAgents.length > 1 ? "s" : ""} enabled</p>
              )}
            </CardContent>
          </Card>

          {/* Quick Templates */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <Settings2 className="h-4 w-4" />
                Quick Start from Template
              </CardTitle>
              <CardDescription className="text-xs">Pre-populate fields from a template</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {workflowTemplates.slice(0, 5).map(template => (
                <button
                  key={template.id}
                  onClick={() => {
                    setName(template.name)
                    setDescription(template.description)
                    setCategory(template.category)
                    setDepartment(template.departments[0])
                    setStages(template.stages.map((s, i) => ({
                      id: `s${i}`,
                      name: s,
                      type: i === 0 ? "form" : i === template.stages.length - 1 ? "notification" : i % 2 === 0 ? "approval" : "automation",
                      required: true
                    } as WorkflowStage)))
                  }}
                  className="w-full text-left p-2 rounded-lg hover:bg-muted/40 transition-colors group"
                >
                  <p className="text-sm font-medium group-hover:text-foreground">{template.name}</p>
                  <p className="text-xs text-muted-foreground">{template.estimatedTime}</p>
                </button>
              ))}
              <Link to="/templates" className="block">
                <Button variant="outline" size="sm" className="w-full mt-2">View all templates</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
