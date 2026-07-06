import { Link } from "react-router-dom"
import { ArrowRight, Brain, Code as Code2, FileSearch, Bug, TestTube, FileText, Database, GitPullRequest, Rocket, ChevronRight, Zap, Gauge, Shield, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useTheme } from "@/components/theme-provider"
import { Moon, Sun } from "lucide-react"

const agentFeatures = [
  {
    id: "code-gen",
    icon: Code2,
    title: "Code Generation",
    description: "Transform natural language requirements into production-ready code. Supports 20+ languages with best practices built-in.",
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    id: "code-review",
    icon: FileSearch,
    title: "Code Review",
    description: "Analyze code for bugs, security vulnerabilities, performance issues, and style violations with actionable suggestions.",
    color: "text-amber-500",
    bg: "bg-amber-500/10",
  },
  {
    id: "debug",
    icon: Bug,
    title: "Debugging",
    description: "Diagnose errors with detailed explanations, root cause analysis, and corrected code snippets.",
    color: "text-red-500",
    bg: "bg-red-500/10",
  },
  {
    id: "unit-test",
    icon: TestTube,
    title: "Unit Test Generator",
    description: "Generate comprehensive unit tests with high coverage. Supports Jest, PyTest, JUnit, and more.",
    color: "text-green-500",
    bg: "bg-green-500/10",
  },
  {
    id: "api-docs",
    icon: FileText,
    title: "API Documentation",
    description: "Generate beautiful API documentation from code, including Markdown and OpenAPI specs.",
    color: "text-cyan-500",
    bg: "bg-cyan-500/10",
  },
  {
    id: "sql",
    icon: Database,
    title: "SQL Query Agent",
    description: "Convert natural language to optimized SQL queries. Understands your schema for precise results.",
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
  {
    id: "github-pr",
    icon: GitPullRequest,
    title: "GitHub PR Review",
    description: "Review pull requests automatically with file-by-file analysis, inline comments, and approval recommendations.",
    color: "text-orange-500",
    bg: "bg-orange-500/10",
  },
  {
    id: "devops",
    icon: Rocket,
    title: "DevOps Agent",
    description: "Trigger GitHub Actions workflows and monitor run status from one unified interface.",
    color: "text-indigo-500",
    bg: "bg-indigo-500/10",
  },
]

const highlights = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Powered by Google Gemini 2.5 Flash with instant response times. Average latency under 2 seconds.",
  },
  {
    icon: Gauge,
    title: "High Accuracy",
    description: "98%+ success rate across all agents. Production-tested with millions of requests processed.",
  },
  {
    icon: Shield,
    title: "Secure by Design",
    description: "Your code never leaves your control. API keys stay local. SOC 2 compliant infrastructure.",
  },
  {
    icon: Sparkles,
    title: "Always Improving",
    description: "Continuous model updates mean better results over time. New capabilities added weekly.",
  },
]

const steps = [
  {
    step: "01",
    title: "Choose Your Agent",
    description: "Select from 8 specialized AI agents designed for specific development tasks.",
  },
  {
    step: "02",
    title: "Provide Your Input",
    description: "Paste code, describe requirements, or enter context. Each agent knows what it needs.",
  },
  {
    step: "03",
    title: "Get Instant Results",
    description: "Receive production-ready output in seconds. Copy, iterate, or refine as needed.",
  },
]

const faqs = [
  {
    q: "What AI model powers AgentHub?",
    a: "AgentHub is powered by Google's Gemini 2.5 Flash model, with automatic fallback to Gemini 2.0 Flash for high availability. This ensures fast responses and high-quality outputs across all agents.",
  },
  {
    q: "Is my code kept private and secure?",
    a: "Yes. Your code is processed securely and never stored or used for training. API keys remain in your local environment. We follow SOC 2 Type II and GDPR compliance standards.",
  },
  {
    q: "Which programming languages are supported?",
    a: "The Code Generation and Code Review agents support 20+ languages including TypeScript, JavaScript, Python, Go, Rust, Java, C#, Ruby, PHP, Swift, and Kotlin. Other agents work with any language or framework.",
  },
  {
    q: "Can I use AgentHub with my existing workflow tools?",
    a: "Absolutely. The GitHub PR Review agent integrates directly with GitHub pull requests. The DevOps Agent can trigger GitHub Actions workflows. More integrations are added regularly.",
  },
  {
    q: "Is there a rate limit or usage cap?",
    a: "Free tier includes generous daily limits for all agents. Pro and Team plans offer higher limits and priority processing. Enterprise plans have unlimited usage with dedicated support.",
  },
  {
    q: "How accurate are the AI-generated results?",
    a: "Our agents maintain a 98%+ success rate across millions of processed requests. For critical production code, we recommend reviewing outputs as you would with any code suggestion tool.",
  },
]

const stats = [
  { value: "8", label: "AI Agents" },
  { value: "20+", label: "Languages Supported" },
  { value: "98%+", label: "Success Rate" },
  { value: "<2s", label: "Avg Response Time" },
]

export default function LandingPage() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-6 flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-foreground">
              <Brain className="h-4 w-4 text-background" />
            </div>
            <span className="text-lg font-bold tracking-tight">AgentHub</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <a href="#agents" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Agents</a>
            <a href="#why-agenthub" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Why AgentHub</a>
            <a href="#faq" className="text-sm text-muted-foreground hover:text-foreground transition-colors">FAQ</a>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Link to="/login">
              <Button variant="ghost" size="sm">Sign in</Button>
            </Link>
            <Link to="/register">
              <Button size="sm">Get started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative mx-auto max-w-7xl px-6 pt-24 pb-20 text-center">
        <Badge variant="secondary" className="mb-6 gap-1.5 px-3 py-1 text-xs font-medium">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Powered by Google Gemini 2.5
        </Badge>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-balance leading-[1.1] mb-6">
          AI Agents for
          <br />
          <span className="text-muted-foreground">Developers Who Ship.</span>
        </h1>
        <p className="mx-auto max-w-2xl text-lg md:text-xl text-muted-foreground leading-relaxed mb-10">
          AgentHub is your AI-powered development team. Generate code, review pull requests, debug issues, write tests, and automate your workflow with 8 specialized AI agents.
        </p>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Link to="/register">
            <Button size="lg" className="gap-2 px-8 h-12 text-base font-semibold">
              Start free trial
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link to="/agents">
            <Button variant="outline" size="lg" className="gap-2 h-12 text-base">
              Explore agents
            </Button>
          </Link>
        </div>
        <p className="mt-4 text-xs text-muted-foreground">No credit card required. Start with 100 free credits.</p>

        {/* Hero stats */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-border pt-12">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-bold tabular-nums">{stat.value}</div>
              <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Dashboard preview */}
      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-2xl">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-muted/50">
            <div className="h-3 w-3 rounded-full bg-red-400" />
            <div className="h-3 w-3 rounded-full bg-amber-400" />
            <div className="h-3 w-3 rounded-full bg-emerald-400" />
            <div className="ml-4 flex-1 h-6 rounded-md bg-background/60 border border-border max-w-xs flex items-center px-3">
              <span className="text-xs text-muted-foreground">agenthub.dev/dashboard</span>
            </div>
          </div>
          <div className="p-6 bg-muted/20 min-h-[400px]">
            <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4">
              {agentFeatures.slice(0, 4).map((agent) => (
                <Card key={agent.id} className="border-border/60 hover:border-border transition-colors cursor-pointer group">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`h-9 w-9 rounded-lg ${agent.bg} flex items-center justify-center`}>
                        <agent.icon className={`h-4.5 w-4.5 ${agent.color}`} />
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-emerald-500" />
                        <span className="text-xs text-muted-foreground">Available</span>
                      </div>
                    </div>
                    <h4 className="text-sm font-semibold group-hover:text-foreground">{agent.title}</h4>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{agent.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Agents Grid */}
      <section id="agents" className="mx-auto max-w-7xl px-6 py-24">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 text-xs">AI Agents</Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            8 specialized agents. One platform.
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Each agent is purpose-built for a specific development task, optimized for accuracy and speed.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {agentFeatures.map((agent) => (
            <Card key={agent.id} className="border-border/60 hover:border-border transition-colors group cursor-pointer">
              <CardContent className="p-5">
                <div className={`h-11 w-11 rounded-xl ${agent.bg} flex items-center justify-center mb-4`}>
                  <agent.icon className={`h-5.5 w-5.5 ${agent.color}`} />
                </div>
                <h3 className="text-base font-semibold mb-2 group-hover:text-foreground">{agent.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{agent.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Why AgentHub */}
      <section id="why-agenthub" className="bg-muted/30 border-y border-border py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4 text-xs">Why AgentHub</Badge>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Built for developers who demand more
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Stop juggling multiple tools. AgentHub brings everything together in one powerful platform.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights.map((highlight) => (
              <Card key={highlight.title} className="border-border/60 bg-background">
                <CardContent className="p-6">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <highlight.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-base font-semibold mb-2">{highlight.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{highlight.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 text-xs">How it works</Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            From input to output in seconds
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <div key={step.step} className="relative text-center">
              <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-muted border border-border">
                <span className="text-lg font-bold text-muted-foreground">{step.step}</span>
              </div>
              <h3 className="text-lg font-semibold mb-3">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              {i < steps.length - 1 && (
                <ChevronRight className="absolute top-5 -right-4 h-4 w-4 text-border hidden md:block" />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-3xl px-6 py-24">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 text-xs">FAQ</Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Frequently asked questions
          </h2>
        </div>
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border border-border/60 rounded-lg px-6 data-[state=open]:bg-muted/30">
              <AccordionTrigger className="text-sm font-semibold py-4 hover:no-underline">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground pb-4 leading-relaxed">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="rounded-2xl bg-foreground text-background p-12 md:p-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Ready to supercharge your development?
          </h2>
          <p className="text-background/70 text-lg mb-8 max-w-xl mx-auto">
            Join thousands of developers using AgentHub to write better code, faster.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link to="/register">
              <Button size="lg" variant="secondary" className="gap-2 px-8 h-12 text-base font-semibold">
                Start your free trial
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/agents">
              <Button variant="ghost" size="lg" className="h-12 text-base text-background/80 hover:text-background hover:bg-background/10">
                Explore all agents
              </Button>
            </Link>
          </div>
          <p className="mt-4 text-xs text-background/50">100 free credits. No credit card required.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="grid md:grid-cols-5 gap-8 mb-12">
            <div className="md:col-span-2">
              <Link to="/" className="flex items-center gap-2 mb-4">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-foreground">
                  <Brain className="h-4 w-4 text-background" />
                </div>
                <span className="text-base font-bold">AgentHub</span>
              </Link>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                AI-powered developer agents for code generation, review, debugging, and more.
              </p>
            </div>
            {[
              { title: "Product", links: ["Agents", "Pricing", "Changelog", "Roadmap"] },
              { title: "Company", links: ["About", "Blog", "Careers", "Press"] },
              { title: "Legal", links: ["Privacy", "Terms", "Security", "Compliance"] },
            ].map((col) => (
              <div key={col.title}>
                <h4 className="text-sm font-semibold mb-4">{col.title}</h4>
                <ul className="space-y-3">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <Separator className="mb-8" />
          <div className="flex items-center justify-between flex-wrap gap-4">
            <p className="text-xs text-muted-foreground">© 2026 AgentHub, Inc. All rights reserved.</p>
            <p className="text-xs text-muted-foreground">Powered by Google Gemini</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
