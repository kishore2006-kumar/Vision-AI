import { useState } from "react"
import { Moon, Sun, Monitor, Bell, Shield, Palette, Globe, Clock, Zap, Accessibility, Trash2, LogOut } from "lucide-react"
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
    escalations: true,
    completions: true,
    reminders: false,
    weeklyReport: true,
  })
  const [workflowPreferences, setWorkflowPreferences] = useState({
    autoAssign: true,
    defaultPriority: "medium",
    defaultDepartment: "IT",
    showCompleted: true,
  })
  const [automationPreferences, setAutomationPreferences] = useState({
    enableNotifications: true,
    autoClassification: true,
    autoPriorityScoring: true,
    smartSuggestions: true,
  })
  const [accessibility, setAccessibility] = useState({
    reducedMotion: false,
    highContrast: false,
    largeText: false,
    screenReader: false,
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
          <TabsTrigger value="notifications" className="gap-1.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <Bell className="h-3.5 w-3.5" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="workflows" className="gap-1.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <Clock className="h-3.5 w-3.5" />
            Workflows
          </TabsTrigger>
          <TabsTrigger value="automation" className="gap-1.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <Zap className="h-3.5 w-3.5" />
            Automation
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
                  <Input type="email" defaultValue="alex.chen@company.com" />
                </div>
                <div className="space-y-2">
                  <Label>Job title</Label>
                  <Input defaultValue="Operations Administrator" />
                </div>
                <div className="space-y-2">
                  <Label>Department</Label>
                  <Select defaultValue="it">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="it">IT Operations</SelectItem>
                      <SelectItem value="facilities">Facilities</SelectItem>
                      <SelectItem value="hr">Human Resources</SelectItem>
                      <SelectItem value="security">Security</SelectItem>
                      <SelectItem value="admin">Administration</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-end">
                  <Button size="sm">Save changes</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-semibold">Organization</CardTitle>
                <CardDescription className="text-xs">Your workspace and organization details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Organization name</Label>
                  <Input defaultValue="Acme Corporation" />
                </div>
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
                      <SelectItem value="gmt">GMT+1</SelectItem>
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
                { key: "escalations" as const, label: "Escalation alerts", description: "When workflows are escalated" },
                { key: "completions" as const, label: "Completion updates", description: "When workflows are completed" },
                { key: "reminders" as const, label: "Deadline reminders", description: "Reminders before due dates" },
                { key: "weeklyReport" as const, label: "Weekly report", description: "Summary of the week's activity" },
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

        <TabsContent value="workflows">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-semibold">Workflow Preferences</CardTitle>
              <CardDescription className="text-xs">Configure default behavior for your workflows</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="font-medium">Auto-Assign on Creation</Label>
                  <p className="text-xs text-muted-foreground mt-0.5">Automatically assign workflows based on rules</p>
                </div>
                <Switch
                  checked={workflowPreferences.autoAssign}
                  onCheckedChange={(checked) => setWorkflowPreferences(w => ({ ...w, autoAssign: checked }))}
                />
              </div>
              <Separator />
              <div className="space-y-2">
                <Label>Default Priority</Label>
                <Select value={workflowPreferences.defaultPriority} onValueChange={(v) => setWorkflowPreferences(w => ({ ...w, defaultPriority: v }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="critical">Critical</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Default Department</Label>
                <Select value={workflowPreferences.defaultDepartment} onValueChange={(v) => setWorkflowPreferences(w => ({ ...w, defaultDepartment: v }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="IT">IT</SelectItem>
                    <SelectItem value="HR">HR</SelectItem>
                    <SelectItem value="Facilities">Facilities</SelectItem>
                    <SelectItem value="Security">Security</SelectItem>
                    <SelectItem value="Administration">Administration</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label className="font-medium">Show Completed Workflows</Label>
                  <p className="text-xs text-muted-foreground mt-0.5">Display completed workflows in lists</p>
                </div>
                <Switch
                  checked={workflowPreferences.showCompleted}
                  onCheckedChange={(checked) => setWorkflowPreferences(w => ({ ...w, showCompleted: checked }))}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="automation">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-semibold">Automation Preferences</CardTitle>
              <CardDescription className="text-xs">Configure AI agent behaviors and automation settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { key: "enableNotifications" as const, label: "Automation Notifications", description: "Get notified when agents complete tasks" },
                { key: "autoClassification" as const, label: "Automatic Classification", description: "Allow Classification Agent to categorize workflows" },
                { key: "autoPriorityScoring" as const, label: "Priority Scoring", description: "Enable automatic priority assignment" },
                { key: "smartSuggestions" as const, label: "Smart Suggestions", description: "Show AI-powered workflow recommendations" },
              ].map((item, index) => (
                <div key={item.key}>
                  {index > 0 && <Separator className="mb-4" />}
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="font-medium">{item.label}</Label>
                      <p className="text-xs text-muted-foreground mt-0.5">{item.description}</p>
                    </div>
                    <Switch
                      checked={automationPreferences[item.key]}
                      onCheckedChange={(checked) => setAutomationPreferences(a => ({ ...a, [item.key]: checked }))}
                    />
                  </div>
                </div>
              ))}
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
                <CardTitle className="text-sm font-semibold">Two-Factor Authentication</CardTitle>
                <CardDescription className="text-xs">Add an extra layer of security to your account</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Authenticator app</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Use an authenticator app to generate OTP codes</p>
                  </div>
                  <Badge variant="secondary" className="text-xs">Not configured</Badge>
                </div>
                <Button variant="outline" size="sm" className="mt-4">Configure 2FA</Button>
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
                  { device: "iPad Pro - Safari", location: "San Francisco, CA", current: false },
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
                { key: "screenReader" as const, label: "Screen Reader Optimized", description: "Optimize layout for screen readers" },
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
                  You can export all your workflows, reports, and settings in JSON format.
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
                  This action is irreversible. All your workflows, reports, and settings will be permanently deleted.
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
