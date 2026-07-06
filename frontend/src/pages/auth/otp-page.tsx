import { Link } from "react-router-dom"
import { Zap, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"

export default function OtpPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-8">
      <div className="w-full max-w-sm text-center">
        <Link to="/" className="inline-flex items-center gap-2 mb-10 mx-auto">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-foreground">
            <Zap className="h-4 w-4 text-background" />
          </div>
          <span className="text-base font-bold">FlowSphere</span>
        </Link>
        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight">Check your email</h1>
          <p className="text-sm text-muted-foreground mt-2">
            We sent a 6-digit verification code to{" "}
            <span className="font-medium text-foreground">alex@company.com</span>
          </p>
        </div>

        <div className="flex justify-center mb-6">
          <InputOTP maxLength={6}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>

        <Link to="/dashboard">
          <Button className="w-full font-semibold">Verify email</Button>
        </Link>

        <p className="text-sm text-muted-foreground mt-4">
          Didn't receive the code?{" "}
          <button type="button" className="font-medium text-foreground hover:underline">
            Resend
          </button>
        </p>

        <Link to="/login" className="flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground mt-6 transition-colors">
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to sign in
        </Link>
      </div>
    </div>
  )
}
