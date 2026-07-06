import { useState } from "react"
import { Link } from "react-router-dom"
import {
  HelpCircle,
  BookOpen,
  Bot,
  Rocket,
  Wrench,
  MessageCircle,
  FileText,
  Clock,
  ThumbsUp,
  Search,
  ChevronRight,
  ExternalLink,
  ArrowRight,
  FileQuestion,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { PageHeader } from "@/components/shared/page-header"
import { helpArticles, faqItems, type HelpArticle } from "@/lib/management-data"

const iconMap: Record<string, React.ElementType> = {
  Rocket,
  GitBranch: () => <span className="h-5 w-5">🔀</span>,
  Bot,
  Clock,
  Users: () => <span className="h-5 w-5">👥</span>,
  BarChart3: () => <span className="h-5 w-5">📈</span>,
  Wrench,
  Plug: () => <span className="h-5 w-5">🔌</span>,
  FileQuestion,
}

const categoryConfig: Record<string, { color: string; label: string }> = {
  "Getting Started": { color: "text-blue-500", label: "Getting Started" },
  "Workflow Guide": { color: "text-purple-500", label: "Workflow Guide" },
  "Automation Guide": { color: "text-cyan-500", label: "Automation Guide" },
  "Administration": { color: "text-amber-500", label: "Administration" },
  "Analytics": { color: "text-emerald-500", label: "Analytics" },
  "Integration": { color: "text-pink-500", label: "Integration" },
  "Support": { color: "text-orange-500", label: "Support" },
}

function HelpArticleCard({ article }: { article: HelpArticle }) {
  const category = categoryConfig[article.category] || { color: "text-muted-foreground", label: article.category }
  const Icon = iconMap[article.icon] || HelpCircle

  return (
    <Card className="hover:border-border/80 hover:shadow-sm transition-all cursor-pointer group">
      <CardContent className="p-5">
        <div className="flex items-start gap-4">
          <div className={`h-10 w-10 rounded-xl bg-muted/30 flex items-center justify-center shrink-0`}>
            <Icon className={`h-5 w-5 ${category.color}`} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="outline" className={`text-xs ${category.color} border-current`}>
                {category.label}
              </Badge>
              <span className="text-xs text-muted-foreground flex items-center gap-1 ml-auto">
                <Clock className="h-3 w-3" />
                {article.readTime}
              </span>
            </div>
            <h3 className="text-sm font-semibold group-hover:text-foreground">{article.title}</h3>
            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{article.description}</p>
            <div className="flex items-center gap-3 mt-3">
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <ThumbsUp className="h-3 w-3" />
                {article.helpful} found helpful
              </span>
              <Button variant="ghost" size="sm" className="ml-auto h-7 text-xs gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                Read
                <ArrowRight className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function HelpCenterPage() {
  const [search, setSearch] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  const categories = [...new Set(helpArticles.map(a => a.category))]

  const filtered = helpArticles.filter(article => {
    const matchSearch = article.title.toLowerCase().includes(search.toLowerCase()) ||
      article.description.toLowerCase().includes(search.toLowerCase())
    const matchCategory = selectedCategory === "all" || article.category === selectedCategory
    return matchSearch && matchCategory
  })

  const filteredFaqs = faqItems.filter(faq =>
    faq.question.toLowerCase().includes(search.toLowerCase()) ||
    faq.answer.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="p-6 space-y-6 max-w-[1400px]">
      <PageHeader
        title="Help Center"
        description="Find documentation, guides, and support resources"
      >
        <Button variant="outline" size="sm" className="gap-1.5">
          <MessageCircle className="h-3.5 w-3.5" />
          Contact Support
        </Button>
      </PageHeader>

      {/* Quick Links */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Link to="/workflows">
          <Card className="hover:border-border/80 hover:shadow-sm transition-all cursor-pointer">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0">
                <Rocket className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <p className="text-sm font-medium">Getting Started</p>
                <p className="text-xs text-muted-foreground">Quick setup guide</p>
              </div>
            </CardContent>
          </Card>
        </Link>
        <Link to="/automation">
          <Card className="hover:border-border/80 hover:shadow-sm transition-all cursor-pointer">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-cyan-500/10 flex items-center justify-center shrink-0">
                <Bot className="h-5 w-5 text-cyan-500" />
              </div>
              <div>
                <p className="text-sm font-medium">Automation Guide</p>
                <p className="text-xs text-muted-foreground">AI agents documentation</p>
              </div>
            </CardContent>
          </Card>
        </Link>
        <Link to="/reports">
          <Card className="hover:border-border/80 hover:shadow-sm transition-all cursor-pointer">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0">
                <BookOpen className="h-5 w-5 text-emerald-500" />
              </div>
              <div>
                <p className="text-sm font-medium">Documentation</p>
                <p className="text-xs text-muted-foreground">Full API reference</p>
              </div>
            </CardContent>
          </Card>
        </Link>
        <Card className="hover:border-border/80 hover:shadow-sm transition-all cursor-pointer">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-amber-500/10 flex items-center justify-center shrink-0">
              <MessageCircle className="h-5 w-5 text-amber-500" />
            </div>
            <div>
              <p className="text-sm font-medium">Support</p>
              <p className="text-xs text-muted-foreground">Get help from team</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="relative flex-1 min-w-48 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <Input
                placeholder="Search articles, guides, and FAQs..."
                className="pl-9 h-9 text-sm"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <Button
                variant={selectedCategory === "all" ? "secondary" : "ghost"}
                size="sm"
                className="h-8 text-xs"
                onClick={() => setSelectedCategory("all")}
              >
                All
              </Button>
              {categories.map(cat => (
                <Button
                  key={cat}
                  variant={selectedCategory === cat ? "secondary" : "ghost"}
                  size="sm"
                  className="h-8 text-xs"
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Articles */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Articles & Guides</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {filtered.map(article => (
                <HelpArticleCard key={article.id} article={article} />
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div>
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Frequently Asked Questions</h2>
            <Card>
              <CardContent className="p-0">
                <Accordion type="single" collapsible className="w-full">
                  {filteredFaqs.map((faq, index) => (
                    <AccordionItem key={faq.id} value={faq.id} className={index === 0 ? "border-t-0" : ""}>
                      <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-muted/40 text-sm text-left">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="px-6 pb-4 text-sm text-muted-foreground">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Support Card */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <MessageCircle className="h-4 w-4" />
                Need More Help?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start gap-2" size="sm">
                <MessageCircle className="h-4 w-4" />
                Chat with Support
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2" size="sm">
                <FileText className="h-4 w-4" />
                Submit a Ticket
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2" size="sm">
                <ExternalLink className="h-4 w-4" />
                Community Forum
              </Button>
            </CardContent>
          </Card>

          {/* Release Notes */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold">Latest Release Notes</CardTitle>
              <CardDescription className="text-xs">v2.4.0 - July 1, 2026</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-start gap-2">
                <span className="text-emerald-500">•</span>
                <span>New: Enterprise Activity Center</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-emerald-500">•</span>
                <span>Improved: Agent health monitoring</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-emerald-500">•</span>
                <span>Fixed: SLA countdown display</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-emerald-500">•</span>
                <span>Added: 7 new workflow templates</span>
              </div>
              <Button variant="ghost" size="sm" className="mt-2 text-xs gap-1">
                View all releases
                <ChevronRight className="h-3 w-3" />
              </Button>
            </CardContent>
          </Card>

          {/* Popular Resources */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold">Popular Resources</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {[
                { title: "Workflow Best Practices", views: "2.4k" },
                { title: "API Documentation", views: "1.8k" },
                { title: "Integration Guide", views: "1.2k" },
                { title: "Security Whitepaper", views: "987" },
              ].map((resource, i) => (
                <div key={i} className="flex items-center justify-between p-2 rounded hover:bg-muted/40 cursor-pointer group">
                  <span className="text-sm">{resource.title}</span>
                  <span className="text-xs text-muted-foreground">{resource.views}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
