import { Link } from "react-router-dom"
import { Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-8">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link to="/" className="inline-flex items-center gap-2 mb-8">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-foreground">
              <Zap className="h-4 w-4 text-background" />
            </div>
            <span className="text-lg font-bold">FlowSphere</span>
          </Link>
          <h1 className="text-2xl font-bold tracking-tight">Request enterprise access</h1>
          <p className="text-sm text-muted-foreground mt-1">Start your 14-day free trial. No credit card required.</p>
        </div>

        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First name</Label>
              <Input id="firstName" placeholder="Alex" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last name</Label>
              <Input id="lastName" placeholder="Chen" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="workEmail">Work email</Label>
            <Input id="workEmail" type="email" placeholder="alex@company.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="company">Company name</Label>
            <Input id="company" placeholder="Acme Corporation" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="teamSize">Team size</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select team size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1-50">1–50 employees</SelectItem>
                <SelectItem value="51-200">51–200 employees</SelectItem>
                <SelectItem value="201-1000">201–1,000 employees</SelectItem>
                <SelectItem value="1001+">1,001+ employees</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="Min. 8 characters" />
          </div>

          <Link to="/otp-verification">
            <Button type="button" className="w-full font-semibold">
              Create account
            </Button>
          </Link>
        </form>

        <p className="text-center text-xs text-muted-foreground mt-6">
          By creating an account, you agree to our{" "}
          <a href="#" className="underline hover:text-foreground">Terms of Service</a>{" "}
          and{" "}
          <a href="#" className="underline hover:text-foreground">Privacy Policy</a>.
        </p>
        <p className="text-center text-sm text-muted-foreground mt-4">
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-foreground hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  )
}
