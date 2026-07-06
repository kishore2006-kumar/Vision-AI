# Bolt.new Prompt — AgentHub (AI Developer Agent Platform)

Paste this into Bolt once your repo now contains the FlowSphere-based frontend (see merge steps) and the original `main.py` for backend reference.

---

## Context

This repository currently contains:
1. `main.py` — a working Python/FastAPI backend that calls Google's Gemini API for AI responses, with a model fallback chain and retry logic. **Bolt cannot run this file (Bolt only runs Node.js)** — read its logic and port it faithfully into a new Node/Express backend described below.
2. `frontend/` — a complete shadcn/ui + Tailwind CSS v4 + React 19 + TypeScript dashboard template (currently branded "FlowSphere"), including a landing page, full auth flow, sidebar app shell, command palette, and an "Automation Center" for AI agents.

We are repurposing this into a new product: **"AgentHub"** — a placeholder name (branding will change later, so keep the logo/wordmark simple and easy to swap). AgentHub is a platform offering a suite of AI agents for software development tasks, plus a help assistant.

**Hard exclusion: do NOT build any image-upload, visual question-answering, or "chat about an image" feature.** That capability from the old project is being fully removed, not carried forward in any form.

## 1. Keep as-is from the current frontend
Keep the existing design system exactly as configured: `index.css` OKLCH color tokens (light + dark), Tailwind v4 setup, Inter font, `0.75rem` radius, all `src/components/ui/*` shadcn components, the `AppShell` / `AppSidebar` / `AppHeader` layout, `CommandPalette`, and `theme-provider` (dark/light toggle). Don't rebuild these — extend them.

## 2. Rebrand
- Replace all "FlowSphere" text/branding with "AgentHub" (logo mark, nav, page titles, metadata).
- Remove the "trusted by" company logo strip and the testimonials section entirely (fabricated customer quotes don't belong in this product). Replace that section of the landing page with a short "Why AgentHub" row of 3-4 honest value props instead (e.g., "Built on Gemini," "No context switching," "Real GitHub integration," "Free to try").

## 3. Landing Page — rewrite content for AgentHub
Keep the existing structure (sticky blurred nav, hero, feature grid, how-it-works, FAQ, footer) but rewrite the copy:

- **Hero headline**: "One platform. Every AI agent your codebase needs."
- **Subheadline**: "Generate code, catch bugs, write tests, review pull requests, and more — each powered by its own specialized AI agent."
- **Primary CTA**: "Explore Agents" → `/agents`. **Secondary CTA**: "Sign In" → `/login`.
- **Feature grid** (replace the 6 existing cards with these 8, one per agent — icon + title + one-line description):
  1. Code Generation Agent — "Turns plain-English requirements into working code."
  2. Code Review Agent — "Flags bugs and suggests best practices before you merge."
  3. Debugging Agent — "Explains errors and proposes a fix, not just a stack trace."
  4. Unit Test Generator — "Generates test cases for the code you already have."
  5. API Documentation Agent — "Writes clean docs straight from your source code."
  6. SQL Query Agent — "Converts natural language into ready-to-run SQL."
  7. GitHub PR Review Agent — "Reviews a real pull request and comments file-by-file."
  8. DevOps Agent — "Triggers and tracks a real GitHub Actions deployment."
- **How it works** (3 steps): "01 Pick an agent" → "02 Describe your task" → "03 Get an instant, working result."
- **FAQ** (replace existing questions with):
  - "What powers AgentHub's agents?" — Google's Gemini models, with automatic fallback if one is busy.
  - "Do I need to connect GitHub?" — Only for the PR Review and DevOps agents.
  - "Is my code stored anywhere?" — Be honest per the actual implementation (see backend section — no persistence by default).
  - "Which agent should I start with?" — Suggest Code Generation or SQL Query as easy first tries.

## 4. Remove these pages/routes entirely
Delete routes, pages, and sidebar entries for: Workflows, Workflow Details, Workflow Templates, Workflow Builder, Departments, Users, Reports Center. These are enterprise IT-ops features that don't apply here.

## 5. Repurpose "Automation Center" → "Agents Hub"
- Rename route `/automation` → `/agents`, `/automation/:id` → `/agents/:agentId`. Rename in sidebar nav accordingly ("Agents Hub", icon: `Bot` or `Sparkles` from lucide-react).
- Replace the automation dataset with the 8 agents listed above.
- **Redefine the card metrics** — these agents are on-demand, request/response tools, not long-running background processes, so replace "status: running/idle/paused" + CPU/memory/queue-length with:
  - A simple availability badge: green dot + "Available."
  - A metrics grid showing: **Total Requests**, **Success Rate**, **Avg Response Time**, **Last Used** (mock/sample data is fine — structure it so real usage data could populate it later).
  - Keep the same card visual language otherwise: icon avatar, hover elevation, click-through to the agent's workspace page.

## 6. The 8 Agent Workspace Pages
Replace the generic "agent details" monitoring page with a focused workspace per agent. Two-panel layout (input left, output right on desktop; stacked on mobile), built from existing shadcn components (`Card`, `Tabs`, `Textarea`, `Select`, `Button`, `Badge`, `Skeleton`, `Alert`, `Separator`):

- **Code Generation Agent** (`/agents/code-gen`): textarea for requirements + language `Select` → syntax-highlighted read-only code output with a copy button.
- **Code Review Agent** (`/agents/code-review`): paste-code textarea + language `Select` → structured issues list (severity badge: bug/style/security, line reference, message).
- **Debugging Agent** (`/agents/debug`): two inputs — code snippet + error message/stack trace → explanation + suggested fix, rendered as markdown with code blocks.
- **Unit Test Generator** (`/agents/unit-test`): paste-code textarea + framework `Select` (Jest/PyTest/JUnit) → generated test file, syntax highlighted, downloadable.
- **API Documentation Agent** (`/agents/api-docs`): paste-code textarea → generated Markdown docs, rendered, with "Copy as Markdown."
- **SQL Query Agent** (`/agents/sql`): natural-language question input + optional schema/table description textarea → generated SQL (syntax highlighted) + plain-English explanation underneath.
- **GitHub PR Review Agent** (`/agents/github-pr`): input for a GitHub PR URL → fetches the real diff and returns file-by-file review comments.
- **DevOps Agent** (`/agents/devops`): inputs for repo owner/name, workflow filename, branch → triggers a real GitHub Actions run, then polls and displays live status (queued/in progress/success/failure) with a link to the run.

Every workspace needs: a loading/"thinking" state, error handling via toast (`sonner`, already installed — no `alert()` anywhere), and an empty state before first use.

## 7. Assistant (clarification/help agent — not a task router)
This agent answers questions about the platform itself, not the coding tasks — e.g., "what does the SQL agent do," "how do I connect GitHub," "why did my request fail." It never executes agent tasks on the user's behalf.

- **Global floating launcher**: a chat-bubble icon fixed bottom-right, visible on every authenticated page. Clicking opens a slide-over panel (`Sheet` component) with a simple chat thread.
- **Dedicated `/help` page**: adapt the existing Help Center page — keep its searchable FAQ accordion and article-card grid (rewrite content for AgentHub's 8 agents), and add a larger embedded version of the same assistant chat for more detailed questions.
- Both surfaces call the same backend endpoint (`POST /api/assistant/chat`).

## 8. Dashboard
Repurpose the existing Dashboard: greeting header, a quick-launch row of all 8 agent cards (compact version), a "Recent Activity" list (last 5 runs, mock data), and a summary stat row: Total Agents (8), Requests This Week, Avg Response Time, Most-Used Agent.

## 9. Activity Center & Analytics
- **Activity Center**: chronological log of past agent runs (agent name, input summary, timestamp, status badge), filterable by agent. Mock/sample data, structured realistically for easy real wiring later.
- **Analytics**: keep using `recharts` (already installed) — a requests-per-agent bar chart, a success-rate trend line, and a response-time distribution chart. Mock data is fine.

## 10. Notifications, Settings, Profile
Keep these pages structurally as-is; update copy/icons for AgentHub context (e.g., "Your Code Review Agent run completed"). In Settings, add an "API Keys" section showing masked/read-only status indicators for Gemini and GitHub connection status (no real key entry UI needed for this build).

## 11. Command Palette
Update its command list to include quick-jump entries for all 8 agents, plus Dashboard, Agents Hub, Activity, Analytics, Help, Settings.

## 12. Backend — new Node/Express server (new `server/` folder; the existing `main.py` cannot run in Bolt)
Port `main.py`'s working logic faithfully into JavaScript/TypeScript using the official `@google/genai` Node SDK:
- Model fallback chain: try `gemini-2.5-flash` first, then fall back to `gemini-2.0-flash`.
- Retry each model up to 3 attempts with exponential backoff (2s, 4s, 8s) on transient/server errors (5xx). Do not retry on client errors (4xx) — surface those immediately.

Endpoints:
- `POST /api/assistant/chat` — `{ message, conversationHistory }` → assistant reply. System prompt: a helpful AgentHub product guide that explains features and troubleshoots — it must not attempt to write code or execute agent tasks itself.
- `POST /api/agents/code-gen` — `{ requirements, language }` → generated code.
- `POST /api/agents/code-review` — `{ code, language }` → `{ issues: [{ severity, line, message }] }`.
- `POST /api/agents/debug` — `{ code, errorMessage }` → explanation + fix.
- `POST /api/agents/unit-test` — `{ code, framework }` → generated test file.
- `POST /api/agents/api-docs` — `{ code }` → generated Markdown docs.
- `POST /api/agents/sql` — `{ question, schemaDescription }` → `{ sql, explanation }`.
- `POST /api/agents/github-pr` — `{ prUrl }` → parse owner/repo/PR number from the URL, fetch the diff via `GET /repos/:owner/:repo/pulls/:number/files` using `GITHUB_TOKEN`, send the diff to Gemini for review, return per-file comments.
- `POST /api/agents/devops/trigger` — `{ owner, repo, workflowFile, ref }` → call GitHub's `workflow_dispatch` endpoint.
- `GET /api/agents/devops/status/:owner/:repo/:runId` → poll `GET /repos/:owner/:repo/actions/runs/:runId`, return status.

Use environment variables only: `GEMINI_API_KEY`, `GITHUB_TOKEN`. Include a `.env.example` listing both with no real values. Never hardcode either key in source.

## 13. Auth
Keep the existing polished auth pages (login, register, forgot-password, OTP, reset-password) visually as-is, but wire them to simple client-side mock logic for this build — no real database. An in-memory `AuthContext` that accepts any email/password combination (or one hardcoded demo account) is sufficient. Structure it so a real backend can be swapped in later without changing the UI.

## 14. Tech constraints
- React 19 + TypeScript + Vite 7 + Tailwind CSS v4 + shadcn/ui (existing `radix-ui`, `class-variance-authority`, `tailwind-merge`, `clsx`) + `lucide-react` + `react-router-dom` v7 + `recharts` + `sonner` for all toasts/errors (no `alert()` anywhere) + `cmdk` for the command palette + `framer-motion` for subtle landing-page scroll/hover animation — all already in `package.json`; keep using them, don't introduce competing libraries.
- No `localStorage`/`sessionStorage` anywhere — in-memory React state/context only.
- Fully responsive and accessible: keyboard navigation, visible focus states, proper labels — match the quality bar already set by the existing component library.

Build this as a complete, cohesive, production-quality platform. The goal is for AgentHub to feel like a real, polished SaaS product, not a prototype bolted onto a demo.
