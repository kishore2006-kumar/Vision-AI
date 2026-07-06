import { Link } from "react-router-dom"
import { Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-8">
      <div className="w-full max-w-sm">
        <Link to="/" className="inline-flex items-center gap-2 mb-10">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-foreground">
            <Zap className="h-4 w-4 text-background" />
          </div>
          <span className="text-base font-bold">FlowSphere</span>
        </Link>
        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight">Set new password</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Your new password must be at least 8 characters.
          </p>
        </div>
        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="password">New password</Label>
            <Input id="password" type="password" placeholder="••••••••" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm new password</Label>
            <Input id="confirmPassword" type="password" placeholder="••••••••" />
          </div>
          <Link to="/login">
            <Button type="button" className="w-full font-semibold">
              Reset password
            </Button>
          </Link>
        </form>
      </div>
    </div>
  )
}
