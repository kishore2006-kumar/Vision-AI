import { Link } from "react-router-dom"
import {
  ArrowRight,
  Zap,
  BarChart3,
  Shield,
  Cpu,
  GitBranch,
  CheckCircle2,
  ChevronRight,
  Star,
  Play,
  TrendingUp,
  Clock,
  Users,
  Building2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useTheme } from "@/components/theme-provider"
import { Moon, Sun } from "lucide-react"

const trustedCompanies = [
  "Nexus Corp", "Meridian Group", "Apex Industries", "Vantage Systems", "Pinnacle Co", "Stratos Inc",
]

const features = [
  {
    icon: GitBranch,
    title: "Visual Workflow Builder",
    description: "Design complex multi-step workflows with an intuitive drag-and-drop interface. No coding required.",
  },
  {
    icon: Cpu,
    title: "AI-Powered Automation",
    description: "Seven intelligent agents handle classification, routing, escalation, and analytics automatically.",
  },
  {
    icon: BarChart3,
    title: "Executive Analytics",
    description: "Real-time dashboards and reports give leadership complete visibility into operational performance.",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "SOC 2 Type II compliant. Role-based access control, audit logs, and data encryption at rest.",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Comments, mentions, activity feeds, and real-time notifications keep everyone aligned.",
  },
  {
    icon: Building2,
    title: "Multi-Department",
    description: "Manage IT, Facilities, HR, Security, Administration, and Maintenance from one unified platform.",
  },
]

const steps = [
  {
    step: "01",
    title: "Choose a Template",
    description: "Select from pre-built workflow templates for your department or start from scratch.",
  },
  {
    step: "02",
    title: "Configure Automation",
    description: "Set up routing rules, approval chains, SLAs, and notification preferences.",
  },
  {
    step: "03",
    title: "Deploy & Monitor",
    description: "Activate your workflow and monitor performance through the operations dashboard.",
  },
]

const testimonials = [
  {
    quote: "FlowSphere reduced our IT request resolution time by 67%. The automation agents handle everything.",
    author: "Sarah Mitchell",
    role: "CTO, Nexus Corp",
    avatar: "SM",
  },
  {
    quote: "We replaced five separate tools with FlowSphere. The ROI was visible within the first quarter.",
    author: "James Okafor",
    role: "VP Operations, Meridian Group",
    avatar: "JO",
  },
  {
    quote: "The analytics dashboard gives our leadership team insights we never had before. It's transformed how we operate.",
    author: "Linda Zhang",
    role: "COO, Apex Industries",
    avatar: "LZ",
  },
]

const faqs = [
  {
    q: "How long does implementation take?",
    a: "Most enterprises are fully operational within 2-4 weeks. Our onboarding team provides dedicated support throughout.",
  },
  {
    q: "Does FlowSphere integrate with existing systems?",
    a: "Yes. FlowSphere offers native integrations with Slack, Microsoft Teams, Jira, ServiceNow, and 200+ other tools via our REST API.",
  },
  {
    q: "What security certifications does FlowSphere hold?",
    a: "SOC 2 Type II, ISO 27001, GDPR compliant, and HIPAA-ready configurations are available for healthcare organizations.",
  },
  {
    q: "Is there a limit on the number of workflows?",
    a: "Enterprise plans have unlimited workflows, users, and automation runs. We scale with your organization.",
  },
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
              <Zap className="h-4 w-4 text-background" />
            </div>
            <span className="text-lg font-bold tracking-tight">FlowSphere</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Features</a>
            <a href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">How it works</a>
            <a href="#testimonials" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Customers</a>
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
          Now with AI-powered workflow automation
        </Badge>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-balance leading-[1.1] mb-6">
          Automate Work.
          <br />
          <span className="text-muted-foreground">Empower Teams.</span>
        </h1>
        <p className="mx-auto max-w-2xl text-lg md:text-xl text-muted-foreground leading-relaxed mb-10">
          FlowSphere is the enterprise workflow automation platform that helps organizations eliminate manual work, accelerate approvals, and gain complete operational visibility.
        </p>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Link to="/register">
            <Button size="lg" className="gap-2 px-8 h-12 text-base font-semibold">
              Start free trial
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Button variant="outline" size="lg" className="gap-2 h-12 text-base">
            <Play className="h-4 w-4" />
            Watch demo
          </Button>
        </div>
        <p className="mt-4 text-xs text-muted-foreground">No credit card required. 14-day free trial.</p>

        {/* Hero stats */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-border pt-12">
          {[
            { value: "10M+", label: "Workflows automated" },
            { value: "67%", label: "Faster resolution" },
            { value: "500+", label: "Enterprise customers" },
            { value: "99.9%", label: "Uptime SLA" },
          ].map((stat) => (
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
              <span className="text-xs text-muted-foreground">app.flowsphere.io/dashboard</span>
            </div>
          </div>
          <div className="p-6 bg-muted/20 min-h-[400px] flex items-center justify-center">
            <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Active Workflows", value: "47", color: "text-blue-500", bg: "bg-blue-500/10", icon: GitBranch },
                { label: "Pending Approvals", value: "12", color: "text-amber-500", bg: "bg-amber-500/10", icon: Clock },
                { label: "Completed Today", value: "89", color: "text-emerald-500", bg: "bg-emerald-500/10", icon: CheckCircle2 },
                { label: "Automation Rate", value: "94%", color: "text-purple-500", bg: "bg-purple-500/10", icon: TrendingUp },
              ].map((item) => (
                <Card key={item.label} className="border-border/60">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-xs text-muted-foreground">{item.label}</p>
                        <p className={`text-2xl font-bold mt-1 ${item.color}`}>{item.value}</p>
                      </div>
                      <div className={`h-8 w-8 rounded-lg ${item.bg} flex items-center justify-center`}>
                        <item.icon className={`h-4 w-4 ${item.color}`} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trusted companies */}
      <section className="border-y border-border py-12">
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-8">
            Trusted by leading enterprises
          </p>
          <div className="flex items-center justify-center gap-8 md:gap-16 flex-wrap">
            {trustedCompanies.map((company) => (
              <span key={company} className="text-sm font-semibold text-muted-foreground/60 hover:text-muted-foreground transition-colors">
                {company}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-7xl px-6 py-24">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 text-xs">Platform features</Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Everything your operations team needs
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            From intake to resolution, FlowSphere handles the entire workflow lifecycle with intelligent automation.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <Card key={feature.title} className="border-border/60 hover:border-border transition-colors group">
              <CardContent className="p-6">
                <div className="h-10 w-10 rounded-xl bg-muted flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                  <feature.icon className="h-5 w-5" />
                </div>
                <h3 className="text-base font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Automation Agents */}
      <section className="bg-muted/30 border-y border-border py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4 text-xs">Automation agents</Badge>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Seven agents. Zero manual work.
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              FlowSphere's autonomous agents work around the clock to process, route, and resolve operational requests.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: "Validation Agent", desc: "Policy compliance checks", rate: "98.7%" },
              { name: "Classification Agent", desc: "Auto-categorization via ML", rate: "96.4%" },
              { name: "Priority Agent", desc: "SLA-based prioritization", rate: "99.1%" },
              { name: "Assignment Agent", desc: "Smart team routing", rate: "91.2%" },
              { name: "Reminder Agent", desc: "Deadline notifications", rate: "99.8%" },
              { name: "Escalation Agent", desc: "SLA breach detection", rate: "97.3%" },
              { name: "Analytics Agent", desc: "Performance intelligence", rate: "94.5%" },
              { name: "Audit Agent", desc: "Compliance logging", rate: "100%" },
            ].map((agent) => (
              <Card key={agent.name} className="border-border/60">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    <span className="text-xs text-muted-foreground">Online</span>
                  </div>
                  <h4 className="text-sm font-semibold">{agent.name}</h4>
                  <p className="text-xs text-muted-foreground mt-1">{agent.desc}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Success rate</span>
                    <span className="text-sm font-bold text-emerald-500">{agent.rate}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="mx-auto max-w-7xl px-6 py-24">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 text-xs">How it works</Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Operational in under 30 minutes
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

      {/* Testimonials */}
      <section id="testimonials" className="bg-muted/30 border-y border-border py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4 text-xs">Customer stories</Badge>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Trusted by operations leaders
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <Card key={t.author} className="border-border/60">
                <CardContent className="p-6">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">"{t.quote}"</p>
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-primary flex items-center justify-center">
                      <span className="text-xs font-bold text-primary-foreground">{t.avatar}</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{t.author}</p>
                      <p className="text-xs text-muted-foreground">{t.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
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
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <Card key={i} className="border-border/60">
              <CardContent className="p-6">
                <h3 className="text-sm font-semibold mb-2">{faq.q}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="rounded-2xl bg-foreground text-background p-12 md:p-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Ready to transform your operations?
          </h2>
          <p className="text-background/70 text-lg mb-8 max-w-xl mx-auto">
            Join 500+ enterprises using FlowSphere to automate workflows and gain operational clarity.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link to="/register">
              <Button size="lg" variant="secondary" className="gap-2 px-8 h-12 text-base font-semibold">
                Start your free trial
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Button variant="ghost" size="lg" className="h-12 text-base text-background/80 hover:text-background hover:bg-background/10">
              Talk to sales
            </Button>
          </div>
          <p className="mt-4 text-xs text-background/50">14-day free trial. No setup fees. Cancel anytime.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="grid md:grid-cols-5 gap-8 mb-12">
            <div className="md:col-span-2">
              <Link to="/" className="flex items-center gap-2 mb-4">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-foreground">
                  <Zap className="h-4 w-4 text-background" />
                </div>
                <span className="text-base font-bold">FlowSphere</span>
              </Link>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                Enterprise workflow automation platform for modern operations teams.
              </p>
            </div>
            {[
              { title: "Product", links: ["Features", "Pricing", "Changelog", "Roadmap"] },
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
            <p className="text-xs text-muted-foreground">© 2026 FlowSphere, Inc. All rights reserved.</p>
            <p className="text-xs text-muted-foreground">SOC 2 Type II · ISO 27001 · GDPR Compliant</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
