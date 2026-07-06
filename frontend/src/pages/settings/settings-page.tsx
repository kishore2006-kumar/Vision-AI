import { useState } from "react"
import { Moon, Sun, Monitor, Bell, Shield, Palette, Globe, Zap, Accessibility, Trash2, LogOut, Key, Check, CircleAlert as AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { PageHeader } from "@/components/shared/page-header"
import { useTheme } from "@/components/theme-provider"

export default function SettingsPage() {
  const { theme, setTheme } = useTheme()
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    agentRuns: true,
    errors: true,
    weeklyReport: true,
  })
  const [agentPreferences, setAgentPreferences] = useState({
    autoSaveResults: true,
    defaultLanguage: "typescript",
    showSuggestions: true,
    saveHistory: true,
  })
  const [accessibility, setAccessibility] = useState({
    reducedMotion: false,
    highContrast: false,
    largeText: false,
  })

  return (
    <div className="p-6 space-y-6 max-w-[900px]">
      <PageHeader title="Settings" description="Manage your account and platform preferences" />

      <Tabs defaultValue="general">
        <TabsList className="mb-6 flex flex-wrap h-auto gap-1">
          <TabsTrigger value="general" className="gap-1.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <Globe className="h-3.5 w-3.5" />
            General
          </TabsTrigger>
          <TabsTrigger value="appearance" className="gap-1.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <Palette className="h-3.5 w-3.5" />
            Appearance
          </TabsTrigger>
          <TabsTrigger value="api-keys" className="gap-1.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <Key className="h-3.5 w-3.5" />
            API Keys
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-1.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <Bell className="h-3.5 w-3.5" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="agents" className="gap-1.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <Zap className="h-3.5 w-3.5" />
            Agents
          </TabsTrigger>
          <TabsTrigger value="security" className="gap-1.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <Shield className="h-3.5 w-3.5" />
            Security
          </TabsTrigger>
          <TabsTrigger value="accessibility" className="gap-1.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <Accessibility className="h-3.5 w-3.5" />
            Accessibility
          </TabsTrigger>
          <TabsTrigger value="danger" className="gap-1.5 data-[state=active]:bg-destructive data-[state=active]:text-destructive-foreground">
            <Trash2 className="h-3.5 w-3.5" />
            Danger Zone
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-semibold">Personal Information</CardTitle>
                <CardDescription className="text-xs">Update your name, email, and contact details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4 mb-4">
                  <Avatar className="h-16 w-16">
                    <AvatarFallback className="text-lg font-semibold">AC</AvatarFallback>
                  </Avatar>
                  <Button variant="outline" size="sm">Change Avatar</Button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>First name</Label>
                    <Input defaultValue="Alex" />
                  </div>
                  <div className="space-y-2">
                    <Label>Last name</Label>
                    <Input defaultValue="Chen" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Email address</Label>
                  <Input type="email" defaultValue="alex@example.com" />
                </div>
                <div className="space-y-2">
                  <Label>Job title</Label>
                  <Input defaultValue="Senior Developer" />
                </div>
                <div className="flex justify-end">
                  <Button size="sm">Save changes</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-semibold">Workspace</CardTitle>
                <CardDescription className="text-xs">Timezone and language settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Timezone</Label>
                  <Select defaultValue="pst">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pst">Pacific Time (PT)</SelectItem>
                      <SelectItem value="est">Eastern Time (ET)</SelectItem>
                      <SelectItem value="utc">UTC</SelectItem>
                      <SelectItem value="cet">Central European (CET)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-end">
                  <Button size="sm">Save changes</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-semibold">Theme</CardTitle>
              <CardDescription className="text-xs">Choose your preferred color scheme</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: "light", icon: Sun, label: "Light" },
                  { id: "dark", icon: Moon, label: "Dark" },
                  { id: "system", icon: Monitor, label: "System" },
                ].map(({ id, icon: Icon, label }) => (
                  <button
                    key={id}
                    onClick={() => setTheme(id as "light" | "dark" | "system")}
                    className={`flex flex-col items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                      theme === id
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-border/80"
                    }`}
                  >
                    <Icon className={`h-5 w-5 ${theme === id ? "text-primary" : "text-muted-foreground"}`} />
                    <span className={`text-sm font-medium ${theme === id ? "text-foreground" : "text-muted-foreground"}`}>
                      {label}
                    </span>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api-keys">
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-semibold">API Connection Status</CardTitle>
                <CardDescription className="text-xs">Your external service connections</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                      <svg className="h-5 w-5 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 15.02 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Google Gemini API</p>
                      <p className="text-xs text-muted-foreground">AI model provider for all agents</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-emerald-600 border-emerald-500/30 bg-emerald-500/10 gap-1.5">
                    <Check className="h-3 w-3" />
                    Connected
                  </Badge>
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-slate-500/10 flex items-center justify-center">
                      <svg className="h-5 w-5 text-slate-600 dark:text-slate-400" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium">GitHub API</p>
                      <p className="text-xs text-muted-foreground">For PR Review and DevOps agents</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-emerald-600 border-emerald-500/30 bg-emerald-500/10 gap-1.5">
                    <Check className="h-3 w-3" />
                    Connected
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="border-amber-500/30 bg-amber-500/5">
              <CardHeader>
                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-amber-600" />
                  API Key Configuration
                </CardTitle>
                <CardDescription className="text-xs">Keys are managed securely via environment variables</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  API keys are configured securely on the server side and are never exposed to the client. Your Gemini and GitHub tokens remain encrypted and are only accessed by the backend for agent operations.
                </p>
                <div className="mt-4 p-3 rounded bg-muted/50 border border-border text-xs font-mono">
                  <span className="text-muted-foreground">GEMINI_API_KEY</span>
                  <span className="ml-2 text-emerald-600">••••••••••••••••</span>
                  <span className="ml-2 text-emerald-600">Configured</span>
                </div>
                <div className="mt-2 p-3 rounded bg-muted/50 border border-border text-xs font-mono">
                  <span className="text-muted-foreground">GITHUB_TOKEN</span>
                  <span className="ml-2 text-emerald-600">••••••••••••••••</span>
                  <span className="ml-2 text-emerald-600">Configured</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-semibold">Notification Preferences</CardTitle>
              <CardDescription className="text-xs">Control which events trigger notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { key: "email" as const, label: "Email notifications", description: "Receive notifications via email" },
                { key: "push" as const, label: "Push notifications", description: "In-app browser notifications" },
                { key: "agentRuns" as const, label: "Agent completion alerts", description: "When agents finish processing" },
                { key: "errors" as const, label: "Error alerts", description: "When agents encounter errors" },
                { key: "weeklyReport" as const, label: "Weekly report", description: "Summary of your agent usage" },
              ].map((item, index) => (
                <div key={item.key}>
                  {index > 0 && <Separator className="mb-4" />}
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="font-medium">{item.label}</Label>
                      <p className="text-xs text-muted-foreground mt-0.5">{item.description}</p>
                    </div>
                    <Switch
                      checked={notifications[item.key]}
                      onCheckedChange={(checked) => setNotifications(n => ({ ...n, [item.key]: checked }))}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="agents">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-semibold">Agent Preferences</CardTitle>
              <CardDescription className="text-xs">Configure default behavior for AI agents</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="font-medium">Auto-save Results</Label>
                  <p className="text-xs text-muted-foreground mt-0.5">Automatically save agent outputs to history</p>
                </div>
                <Switch
                  checked={agentPreferences.autoSaveResults}
                  onCheckedChange={(checked) => setAgentPreferences(a => ({ ...a, autoSaveResults: checked }))}
                />
              </div>
              <Separator />
              <div className="space-y-2">
                <Label>Default Programming Language</Label>
                <Select value={agentPreferences.defaultLanguage} onValueChange={(v) => setAgentPreferences(a => ({ ...a, defaultLanguage: v }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="typescript">TypeScript</SelectItem>
                    <SelectItem value="javascript">JavaScript</SelectItem>
                    <SelectItem value="python">Python</SelectItem>
                    <SelectItem value="go">Go</SelectItem>
                    <SelectItem value="rust">Rust</SelectItem>
                    <SelectItem value="java">Java</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label className="font-medium">Show Suggestions</Label>
                  <p className="text-xs text-muted-foreground mt-0.5">Display AI-powered suggestions while typing</p>
                </div>
                <Switch
                  checked={agentPreferences.showSuggestions}
                  onCheckedChange={(checked) => setAgentPreferences(a => ({ ...a, showSuggestions: checked }))}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label className="font-medium">Save History</Label>
                  <p className="text-xs text-muted-foreground mt-0.5">Keep records of all agent interactions</p>
                </div>
                <Switch
                  checked={agentPreferences.saveHistory}
                  onCheckedChange={(checked) => setAgentPreferences(a => ({ ...a, saveHistory: checked }))}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-semibold">Change Password</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Current password</Label>
                  <Input type="password" placeholder="••••••••" />
                </div>
                <div className="space-y-2">
                  <Label>New password</Label>
                  <Input type="password" placeholder="Min. 8 characters" />
                </div>
                <div className="space-y-2">
                  <Label>Confirm new password</Label>
                  <Input type="password" placeholder="••••••••" />
                </div>
                <div className="flex justify-end">
                  <Button size="sm">Update password</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-semibold">Active Sessions</CardTitle>
                <CardDescription className="text-xs">Manage your active login sessions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { device: "MacBook Pro - Chrome", location: "San Francisco, CA", current: true },
                  { device: "iPhone 15 - Safari", location: "San Francisco, CA", current: false },
                ].map((session, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                    <div>
                      <p className="text-sm font-medium">{session.device}</p>
                      <p className="text-xs text-muted-foreground">{session.location}</p>
                    </div>
                    {session.current ? (
                      <Badge variant="outline" className="text-xs text-emerald-600 border-emerald-500/20">Current</Badge>
                    ) : (
                      <Button variant="ghost" size="sm" className="text-xs text-destructive">Revoke</Button>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="accessibility">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-semibold">Accessibility Settings</CardTitle>
              <CardDescription className="text-xs">Customize the interface for better accessibility</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { key: "reducedMotion" as const, label: "Reduced Motion", description: "Minimize animations and transitions" },
                { key: "highContrast" as const, label: "High Contrast", description: "Increase color contrast for better visibility" },
                { key: "largeText" as const, label: "Large Text", description: "Increase default text size" },
              ].map((item, index) => (
                <div key={item.key}>
                  {index > 0 && <Separator className="mb-4" />}
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="font-medium">{item.label}</Label>
                      <p className="text-xs text-muted-foreground mt-0.5">{item.description}</p>
                    </div>
                    <Switch
                      checked={accessibility[item.key]}
                      onCheckedChange={(checked) => setAccessibility(a => ({ ...a, [item.key]: checked }))}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="danger">
          <div className="space-y-4">
            <Card className="border-amber-500/30 bg-amber-500/5">
              <CardHeader>
                <CardTitle className="text-sm font-semibold text-amber-600">Export Your Data</CardTitle>
                <CardDescription className="text-xs">Download a copy of all your data</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  You can export all your agent history and settings in JSON format.
                </p>
                <Button variant="outline" size="sm">Export Data</Button>
              </CardContent>
            </Card>

            <Card className="border-destructive/30">
              <CardHeader>
                <CardTitle className="text-sm font-semibold text-destructive">Delete Account</CardTitle>
                <CardDescription className="text-xs">Permanently delete your account and all associated data</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  This action is irreversible. All your agent history and settings will be permanently deleted.
                </p>
                <div className="flex gap-3">
                  <Button variant="destructive" size="sm" className="gap-1.5">
                    <Trash2 className="h-3.5 w-3.5" />
                    Delete Account
                  </Button>
                  <Button variant="outline" size="sm" className="gap-1.5">
                    <LogOut className="h-3.5 w-3.5" />
                    Sign Out Everywhere
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
