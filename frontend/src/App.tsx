import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { AppShell } from "@/components/layout/app-shell"
import LandingPage from "@/pages/landing/landing-page"
import LoginPage from "@/pages/auth/login-page"
import RegisterPage from "@/pages/auth/register-page"
import ForgotPasswordPage from "@/pages/auth/forgot-password-page"
import ResetPasswordPage from "@/pages/auth/reset-password-page"
import OtpPage from "@/pages/auth/otp-page"
import DashboardPage from "@/pages/dashboard/dashboard-page"
import AgentsHubPage from "@/pages/agents/agents-hub-page"
import AgentWorkspacePage from "@/pages/agents/agent-workspace-page"
import AnalyticsPage from "@/pages/analytics/analytics-page"
import NotificationsCenterPage from "@/pages/notifications/notifications-center-page"
import ActivityCenterPage from "@/pages/activity/activity-center-page"
import HelpCenterPage from "@/pages/help/help-center-page"
import ProfilePage from "@/pages/profile/profile-page"
import SettingsPage from "@/pages/settings/settings-page"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/otp-verification" element={<OtpPage />} />

        {/* App */}
        <Route element={<AppShell />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/agents" element={<AgentsHubPage />} />
          <Route path="/agents/:agentId" element={<AgentWorkspacePage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/notifications" element={<NotificationsCenterPage />} />
          <Route path="/activity" element={<ActivityCenterPage />} />
          <Route path="/help" element={<HelpCenterPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
