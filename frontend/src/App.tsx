import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { AppShell } from "@/components/layout/app-shell"
import LandingPage from "@/pages/landing/landing-page"
import LoginPage from "@/pages/auth/login-page"
import RegisterPage from "@/pages/auth/register-page"
import ForgotPasswordPage from "@/pages/auth/forgot-password-page"
import ResetPasswordPage from "@/pages/auth/reset-password-page"
import OtpPage from "@/pages/auth/otp-page"
import DashboardPage from "@/pages/dashboard/dashboard-page"
import WorkflowsPage from "@/pages/workflows/workflows-page"
import WorkflowDetailsPage from "@/pages/workflows/workflow-details-page"
import WorkflowTemplatesPage from "@/pages/workflows/workflow-templates-page"
import WorkflowBuilderPage from "@/pages/workflows/workflow-builder-page"
import AutomationPage from "@/pages/automation/automation-page"
import AgentDetailsPage from "@/pages/automation/agent-details-page"
import AnalyticsPage from "@/pages/analytics/analytics-page"
import NotificationsCenterPage from "@/pages/notifications/notifications-center-page"
import ActivityCenterPage from "@/pages/activity/activity-center-page"
import ReportsCenterPage from "@/pages/reports/reports-center-page"
import UsersPage from "@/pages/users/users-page"
import DepartmentsPage from "@/pages/departments/departments-page"
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
          <Route path="/workflows" element={<WorkflowsPage />} />
          <Route path="/workflows/:id" element={<WorkflowDetailsPage />} />
          <Route path="/workflows/new" element={<WorkflowBuilderPage />} />
          <Route path="/templates" element={<WorkflowTemplatesPage />} />
          <Route path="/automation" element={<AutomationPage />} />
          <Route path="/automation/:id" element={<AgentDetailsPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/notifications" element={<NotificationsCenterPage />} />
          <Route path="/activity" element={<ActivityCenterPage />} />
          <Route path="/reports" element={<ReportsCenterPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/departments" element={<DepartmentsPage />} />
          <Route path="/help" element={<HelpCenterPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
