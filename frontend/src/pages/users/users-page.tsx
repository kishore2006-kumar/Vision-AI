import { useState } from "react"
import {
  Users,
  Search,
  Grid,
  List,
  MoreHorizontal,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Calendar,
  Activity,
  Shield,
  UserCheck,
  UserX,
  TrendingUp,
  Edit,
  Plus,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { PageHeader } from "@/components/shared/page-header"
import { EmptyState } from "@/components/shared/empty-state"
import { usersData, type EnterpriseUser, type UserRole, type UserStatus } from "@/lib/management-data"

const roleConfig: Record<UserRole, { color: string; label: string }> = {
  admin: { color: "text-purple-500", label: "Admin" },
  manager: { color: "text-blue-500", label: "Manager" },
  analyst: { color: "text-cyan-500", label: "Analyst" },
  operator: { color: "text-emerald-500", label: "Operator" },
  viewer: { color: "text-muted-foreground", label: "Viewer" },
}

const statusConfig: Record<UserStatus, { color: string; bg: string; label: string }> = {
  active: { color: "text-emerald-500", bg: "bg-emerald-500/10", label: "Active" },
  inactive: { color: "text-muted-foreground", bg: "bg-muted", label: "Inactive" },
  pending: { color: "text-amber-500", bg: "bg-amber-500/10", label: "Pending" },
  suspended: { color: "text-destructive", bg: "bg-destructive/10", label: "Suspended" },
}

function UserGridCard({ user, onSelect }: { user: EnterpriseUser; onSelect: () => void }) {
  const role = roleConfig[user.role]
  const status = statusConfig[user.status]

  return (
    <Card className="hover:border-border/80 hover:shadow-sm transition-all cursor-pointer group" onClick={onSelect}>
      <CardContent className="p-5">
        <div className="flex items-start gap-4">
          <Avatar className="h-12 w-12 shrink-0">
            <AvatarFallback className="text-sm font-semibold bg-primary/10 text-primary">
              {user.name.split(" ").map(n => n[0]).join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <h3 className="text-sm font-semibold group-hover:text-foreground truncate">{user.name}</h3>
              <span className={`h-2 w-2 rounded-full ${status.bg.replace("/10", "")} shrink-0`} title={status.label} />
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="outline" className={`text-xs ${role.color} border-current`}>
                {role.label}
              </Badge>
              <Badge variant="secondary" className="text-xs">{user.department}</Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-2 truncate">{user.email}</p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-7 w-7 shrink-0" onClick={(e) => e.stopPropagation()}>
                <MoreHorizontal className="h-3.5 w-3.5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={onSelect}>View Profile</DropdownMenuItem>
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuItem>Assign Workflow</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">Deactivate</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-border">
          <div className="text-center">
            <p className="text-lg font-semibold">{user.currentWorkflows}</p>
            <p className="text-[10px] text-muted-foreground uppercase">Active</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold">{user.completedWorkflows}</p>
            <p className="text-[10px] text-muted-foreground uppercase">Completed</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1">
              <p className={`text-lg font-semibold ${user.performanceScore >= 90 ? "text-emerald-500" : user.performanceScore >= 80 ? "text-amber-500" : "text-muted-foreground"}`}>
                {user.performanceScore}
              </p>
              {user.performanceScore >= 90 && <TrendingUp className="h-3 w-3 text-emerald-500" />}
            </div>
            <p className="text-[10px] text-muted-foreground uppercase">Score</p>
          </div>
        </div>

        <div className="flex items-center gap-2 mt-4 text-xs text-muted-foreground">
          <Activity className="h-3 w-3" />
          <span>{user.lastActive}</span>
        </div>
      </CardContent>
    </Card>
  )
}

function UserTableRow({ user, onSelect }: { user: EnterpriseUser; onSelect: () => void }) {
  const role = roleConfig[user.role]
  const status = statusConfig[user.status]

  return (
    <tr className="hover:bg-muted/30 transition-colors group cursor-pointer" onClick={onSelect}>
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8 shrink-0">
            <AvatarFallback className="text-xs font-semibold bg-primary/10 text-primary">
              {user.name.split(" ").map(n => n[0]).join("")}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <p className="text-sm font-medium truncate">{user.name}</p>
            <p className="text-xs text-muted-foreground truncate">{user.email}</p>
          </div>
        </div>
      </td>
      <td className="px-4 py-3">
        <Badge variant="outline" className={`text-xs ${role.color} border-current`}>
          {role.label}
        </Badge>
      </td>
      <td className="px-4 py-3">
        <Badge variant="secondary" className="text-xs">{user.department}</Badge>
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-2">
          <span className={`h-2 w-2 rounded-full ${status.bg.replace("/10", "")}`} />
          <span className="text-xs">{status.label}</span>
        </div>
      </td>
      <td className="px-4 py-3">
        <span className="text-xs font-medium">{user.currentWorkflows}</span>
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-2">
          <Progress value={user.performanceScore} className="h-1.5 w-16" />
          <span className="text-xs">{user.performanceScore}</span>
        </div>
      </td>
      <td className="px-4 py-3">
        <span className="text-xs text-muted-foreground">{user.lastActive}</span>
      </td>
      <td className="px-4 py-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-7 w-7 opacity-0 group-hover:opacity-100" onClick={(e) => e.stopPropagation()}>
              <MoreHorizontal className="h-3.5 w-3.5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={onSelect}>View Profile</DropdownMenuItem>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Assign Workflow</DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">Deactivate</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </td>
    </tr>
  )
}

function UserDrawer({ user, open, onOpenChange }: { user: EnterpriseUser | null; open: boolean; onOpenChange: (open: boolean) => void }) {
  if (!user) return null

  const role = roleConfig[user.role]
  const status = statusConfig[user.status]

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>User Profile</SheetTitle>
          <SheetDescription>View and manage user details</SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Profile Header */}
          <div className="flex items-start gap-4">
            <Avatar className="h-16 w-16 shrink-0">
              <AvatarFallback className="text-xl font-semibold bg-primary/10 text-primary">
                {user.name.split(" ").map(n => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <h2 className="text-lg font-semibold">{user.name}</h2>
              <div className="flex items-center gap-2 flex-wrap mt-1">
                <Badge variant="outline" className={`text-xs ${role.color} border-current`}>
                  {role.label}
                </Badge>
                <Badge variant="secondary" className="text-xs">{user.department}</Badge>
                <Badge variant={status.bg.includes("emerald") ? "default" : "outline"} className="text-xs">
                  {status.label}
                </Badge>
              </div>
              <div className="flex items-center gap-3 mt-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  Joined {user.joinDate}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {user.location}
                </span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Contact Info */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold">Contact Information</h3>
            <div className="grid gap-3">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Email</p>
                  <p className="text-sm">{user.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Phone</p>
                  <p className="text-sm">{user.phone}</p>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Performance Stats */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold">Performance</h3>
            <div className="grid grid-cols-3 gap-3">
              <div className="p-4 rounded-lg bg-muted/30 text-center">
                <p className="text-2xl font-semibold">{user.currentWorkflows}</p>
                <p className="text-xs text-muted-foreground mt-1">Active Workflows</p>
              </div>
              <div className="p-4 rounded-lg bg-muted/30 text-center">
                <p className="text-2xl font-semibold">{user.completedWorkflows}</p>
                <p className="text-xs text-muted-foreground mt-1">Completed</p>
              </div>
              <div className="p-4 rounded-lg bg-muted/30 text-center">
                <p className={`text-2xl font-semibold ${user.performanceScore >= 90 ? "text-emerald-500" : user.performanceScore >= 80 ? "text-amber-500" : ""}`}>
                  {user.performanceScore}
                </p>
                <p className="text-xs text-muted-foreground mt-1">Score</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Skills */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {user.skills.map(skill => (
                <Badge key={skill} variant="secondary" className="text-xs">{skill}</Badge>
              ))}
            </div>
          </div>

          <Separator />

          {/* Bio */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold">About</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{user.bio}</p>
          </div>

          <Separator />

          {/* Quick Actions */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" size="sm" className="gap-1.5">
                <Edit className="h-3.5 w-3.5" />
                Edit Profile
              </Button>
              <Button variant="outline" size="sm" className="gap-1.5">
                <Briefcase className="h-3.5 w-3.5" />
                Assign Workflow
              </Button>
              <Button variant="outline" size="sm" className="gap-1.5">
                <Mail className="h-3.5 w-3.5" />
                Send Email
              </Button>
              <Button variant="outline" size="sm" className="gap-1.5 text-destructive hover:text-destructive">
                <UserX className="h-3.5 w-3.5" />
                Deactivate
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default function UsersPage() {
  const [search, setSearch] = useState("")
  const [roleFilter, setRoleFilter] = useState<string>("all")
  const [departmentFilter, setDepartmentFilter] = useState<string>("all")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [view, setView] = useState<"grid" | "table">("grid")
  const [selectedUser, setSelectedUser] = useState<EnterpriseUser | null>(null)
  const [drawerOpen, setDrawerOpen] = useState(false)

  const filtered = usersData.filter(user => {
    const matchSearch = user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
    const matchRole = roleFilter === "all" || user.role === roleFilter
    const matchDepartment = departmentFilter === "all" || user.department === departmentFilter
    const matchStatus = statusFilter === "all" || user.status === statusFilter
    return matchSearch && matchRole && matchDepartment && matchStatus
  })

  const activeCount = usersData.filter(u => u.status === "active").length
  const avgPerformance = Math.round(usersData.reduce((sum, u) => sum + u.performanceScore, 0) / usersData.length)

  const departments = [...new Set(usersData.map(u => u.department))]

  const handleSelectUser = (user: EnterpriseUser) => {
    setSelectedUser(user)
    setDrawerOpen(true)
  }

  return (
    <div className="p-6 space-y-6 max-w-[1600px]">
      <PageHeader
        title="User Management"
        description={`${usersData.length} users across ${departments.length} departments`}
      >
        <Button variant="outline" size="sm" className="gap-1.5">
          <UserCheck className="h-3.5 w-3.5" />
          Export
        </Button>
        <Button size="sm" className="gap-1.5">
          <Plus className="h-3.5 w-3.5" />
          Add User
        </Button>
      </PageHeader>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                <UserCheck className="h-5 w-5 text-emerald-500" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Active Users</p>
                <p className="text-2xl font-semibold">{activeCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
                <Shield className="h-5 w-5 text-purple-500" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Admins</p>
                <p className="text-2xl font-semibold">{usersData.filter(u => u.role === "admin").length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                <Users className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Total Workflows</p>
                <p className="text-2xl font-semibold">{usersData.reduce((sum, u) => sum + u.currentWorkflows, 0)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-amber-500" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Avg Performance</p>
                <p className="text-2xl font-semibold">{avgPerformance}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="relative flex-1 min-w-48 max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                className="pl-9 h-8 text-sm"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-28 h-8 text-sm">
                <SelectValue placeholder="Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All roles</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="manager">Manager</SelectItem>
                <SelectItem value="analyst">Analyst</SelectItem>
                <SelectItem value="operator">Operator</SelectItem>
                <SelectItem value="viewer">Viewer</SelectItem>
              </SelectContent>
            </Select>
            <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
              <SelectTrigger className="w-32 h-8 text-sm">
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All departments</SelectItem>
                {departments.map(dep => (
                  <SelectItem key={dep} value={dep}>{dep}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-28 h-8 text-sm">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex items-center gap-1 border border-border rounded-lg p-0.5 ml-auto">
              <Button
                variant={view === "grid" ? "secondary" : "ghost"}
                size="icon"
                className="h-7 w-7"
                onClick={() => setView("grid")}
              >
                <Grid className="h-3.5 w-3.5" />
              </Button>
              <Button
                variant={view === "table" ? "secondary" : "ghost"}
                size="icon"
                className="h-7 w-7"
                onClick={() => setView("table")}
              >
                <List className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Content */}
      {filtered.length === 0 ? (
        <EmptyState
          icon={Users}
          title="No users found"
          description="Try adjusting your search or filters"
        />
      ) : view === "grid" ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map(user => (
            <UserGridCard key={user.id} user={user} onSelect={() => handleSelectUser(user)} />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/50 border-b border-border">
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">User</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Role</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Department</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Status</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Workflows</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Performance</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Last Active</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map(user => (
                <UserTableRow key={user.id} user={user} onSelect={() => handleSelectUser(user)} />
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* User Details Drawer */}
      <UserDrawer user={selectedUser} open={drawerOpen} onOpenChange={setDrawerOpen} />
    </div>
  )
}
