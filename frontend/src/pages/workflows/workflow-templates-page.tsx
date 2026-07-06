import { Link } from "react-router-dom"
import {
  Monitor,
  Building2,
  ClipboardList,
  Users,
  Shield,
  Wrench,
  ArrowRight,
  Clock,
  CheckCircle2,
  Search,
  Star,
  Eye,
  AlertOctagon,
  UserPlus,
  CalendarOff,
  ShoppingCart,
  Package,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { PageHeader } from "@/components/shared/page-header"
import { workflowTemplates } from "@/lib/workflow-data"

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Monitor,
  Building2,
  ClipboardList,
  Users,
  Shield,
  Wrench,
  AlertOctagon,
  UserPlus,
  CalendarOff,
  ShoppingCart,
  Package,
}

const automationLevelConfig = {
  full: { label: "Fully Automated", color: "text-emerald-500" },
  partial: { label: "Partial Automation", color: "text-amber-500" },
  manual: { label: "Manual", color: "text-muted-foreground" },
}

const complexityConfig = {
  simple: { label: "Simple", color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" },
  moderate: { label: "Moderate", color: "bg-amber-500/10 text-amber-600 dark:text-amber-400" },
  complex: { label: "Complex", color: "bg-red-500/10 text-red-600 dark:text-red-400" },
}

export default function WorkflowTemplatesPage() {
  const [search, setSearch] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [previewTemplate, setPreviewTemplate] = useState<string | null>(null)

  const categories = ["all", "IT", "HR", "Facilities", "Security", "Administration"]

  const filtered = workflowTemplates.filter(t => {
    const matchSearch = t.name.toLowerCase().includes(search.toLowerCase()) || t.description.toLowerCase().includes(search.toLowerCase())
    const matchCategory = selectedCategory === "all" || t.category === selectedCategory
    return matchSearch && matchCategory
  })

  const featuredTemplates = workflowTemplates.filter(t => t.featured)

  return (
    <div className="p-6 space-y-6 max-w-[1400px]">
      <PageHeader
        title="Workflow Templates"
        description="Choose a template to jumpstart your workflow configuration"
      />

      {/* Search + filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-48 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <Input
            placeholder="Search templates..."
            className="pl-9 h-8 text-sm"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {categories.map(cat => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? "secondary" : "ghost"}
              size="sm"
              className="h-8 capitalize"
              onClick={() => setSelectedCategory(cat)}
            >
              {cat === "all" ? "All templates" : cat}
            </Button>
          ))}
        </div>
      </div>

      {/* Featured */}
      {selectedCategory === "all" && !search && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Star className="h-4 w-4 text-amber-500" />
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Featured templates</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            {featuredTemplates.map(template => {
              const Icon = iconMap[template.icon] || Monitor
              const autoConfig = automationLevelConfig[template.automationLevel]
              const complexConfig = complexityConfig[template.complexity]
              return (
                <Card key={template.id} className="border-border hover:border-border/80 hover:shadow-md transition-all group">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className={`h-12 w-12 rounded-xl ${template.bg} flex items-center justify-center shrink-0`}>
                        <Icon className={`h-6 w-6 ${template.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <h3 className="text-base font-semibold">{template.name}</h3>
                          <Badge variant="secondary" className="text-xs">Popular</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-3">{template.description}</p>

                        {/* Metadata row */}
                        <div className="flex items-center gap-3 flex-wrap mb-4">
                          <Badge variant="outline" className={`text-xs ${complexConfig.color}`}>
                            {complexConfig.label}
                          </Badge>
                          <span className={`text-xs ${autoConfig.color}`}>{autoConfig.label}</span>
                          <Separator className="h-3 w-px bg-border" />
                          <span className="text-xs text-muted-foreground">{template.estimatedTime}</span>
                        </div>

                        {/* Departments */}
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {template.departments.slice(0, 3).map(dep => (
                            <Badge key={dep} variant="outline" className="text-xs">{dep}</Badge>
                          ))}
                          {template.departments.length > 3 && (
                            <Badge variant="outline" className="text-xs">+{template.departments.length - 3}</Badge>
                          )}
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                              <Clock className="h-3.5 w-3.5" />
                              {template.estimatedTime}
                            </div>
                            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                              {template.usageCount.toLocaleString()} uses
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="gap-1.5"
                              onClick={() => setPreviewTemplate(template.id)}
                            >
                              <Eye className="h-3.5 w-3.5" />
                              Preview
                            </Button>
                            <Link to="/workflows/new">
                              <Button size="sm" className="gap-1.5">
                                Use template
                                <ArrowRight className="h-3.5 w-3.5" />
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {previewTemplate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-black/50" onClick={() => setPreviewTemplate(null)} />
          <Card className="relative z-10 w-full max-w-2xl max-h-[80vh] overflow-auto m-4">
            <CardContent className="p-6">
              {(() => {
                const template = workflowTemplates.find(t => t.id === previewTemplate)
                if (!template) return null
                const Icon = iconMap[template.icon] || Monitor
                const autoConfig = automationLevelConfig[template.automationLevel]
                const complexConfig = complexityConfig[template.complexity]
                return (
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className={`h-14 w-14 rounded-xl ${template.bg} flex items-center justify-center shrink-0`}>
                        <Icon className={`h-7 w-7 ${template.color}`} />
                      </div>
                      <div className="flex-1">
                        <h2 className="text-xl font-semibold">{template.name}</h2>
                        <p className="text-sm text-muted-foreground mt-1">{template.description}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 rounded-lg border border-border">
                        <p className="text-xs text-muted-foreground mb-1">Category</p>
                        <Badge variant="secondary">{template.category}</Badge>
                      </div>
                      <div className="p-3 rounded-lg border border-border">
                        <p className="text-xs text-muted-foreground mb-1">Estimated Time</p>
                        <p className="text-sm font-medium">{template.estimatedTime}</p>
                      </div>
                      <div className="p-3 rounded-lg border border-border">
                        <p className="text-xs text-muted-foreground mb-1">Automation Level</p>
                        <p className={`text-sm font-medium ${autoConfig.color}`}>{autoConfig.label}</p>
                      </div>
                      <div className="p-3 rounded-lg border border-border">
                        <p className="text-xs text-muted-foreground mb-1">Complexity</p>
                        <Badge variant="outline" className={complexConfig.color}>{complexConfig.label}</Badge>
                      </div>
                    </div>

                    <div>
                      <p className="text-xs text-muted-foreground mb-2">Departments</p>
                      <div className="flex flex-wrap gap-2">
                        {template.departments.map(dep => (
                          <Badge key={dep} variant="outline">{dep}</Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-xs text-muted-foreground mb-2">Workflow Stages ({template.stages.length})</p>
                      <ol className="space-y-2">
                        {template.stages.map((stage, i) => (
                          <li key={i} className="flex items-center gap-3 p-2 rounded bg-muted/30">
                            <span className="flex items-center justify-center h-6 w-6 rounded-full bg-muted text-xs font-semibold">{i + 1}</span>
                            <span className="text-sm">{stage}</span>
                          </li>
                        ))}
                      </ol>
                    </div>

                    <div>
                      <p className="text-xs text-muted-foreground mb-2">Tags</p>
                      <div className="flex flex-wrap gap-2">
                        {template.tags.map(tag => (
                          <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-4 border-t border-border">
                      <Button variant="outline" onClick={() => setPreviewTemplate(null)}>Close</Button>
                      <Link to="/workflows/new">
                        <Button className="gap-1.5">
                          Use this template
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                )
              })()}
            </CardContent>
          </Card>
        </div>
      )}

      {/* All templates */}
      <div>
        {selectedCategory === "all" && !search && (
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">All templates ({filtered.length})</h2>
        )}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(template => {
            const Icon = iconMap[template.icon] || Monitor
            const autoConfig = automationLevelConfig[template.automationLevel]
            const complexConfig = complexityConfig[template.complexity]
            return (
              <Card key={template.id} className="border-border hover:border-border/80 hover:shadow-md transition-all group flex flex-col">
                <CardContent className="p-6 flex flex-col flex-1">
                  <div className="flex items-start gap-3 mb-4">
                    <div className={`h-10 w-10 rounded-xl ${template.bg} flex items-center justify-center shrink-0`}>
                      <Icon className={`h-5 w-5 ${template.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-sm font-semibold">{template.name}</h3>
                        {template.featured && <Star className="h-3 w-3 text-amber-500" />}
                      </div>
                      <Badge variant="secondary" className="text-xs mt-1">{template.category}</Badge>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1 line-clamp-3">{template.description}</p>

                  {/* Metadata */}
                  <div className="flex items-center gap-2 flex-wrap mb-3">
                    <Badge variant="outline" className={`text-xs ${complexConfig.color}`}>
                      {complexConfig.label}
                    </Badge>
                    <span className={`text-xs ${autoConfig.color}`}>{autoConfig.label}</span>
                  </div>

                  {/* Stages count */}
                  <div className="mb-4 p-2 rounded bg-muted/30">
                    <p className="text-xs text-muted-foreground">{template.stages.length} stages: {template.stages.slice(0, 3).join(" → ")}{template.stages.length > 3 ? " ..." : ""}</p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" /> {template.estimatedTime}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <CheckCircle2 className="h-3 w-3 text-emerald-500" /> {template.usageCount.toLocaleString()} uses
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => setPreviewTemplate(template.id)}
                      >
                        <Eye className="h-3.5 w-3.5" />
                      </Button>
                      <Link to="/workflows/new">
                        <Button size="sm" variant="outline" className="gap-1.5 group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                          Use
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function Separator({ className }: { className?: string }) {
  return <div className={className} />
}
