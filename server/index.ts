import express, { Request, Response, NextFunction } from 'express'
import cors from 'cors'

const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true,
}))
app.use(express.json({ limit: '10mb' }))

// CORS headers for all responses
app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Client-Info, Apikey')
  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }
  next()
})

// Health check
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// Import route handlers
import { handleCodeGen } from './routes/code-gen'
import { handleCodeReview } from './routes/code-review'
import { handleDebug } from './routes/debug'
import { handleUnitTest } from './routes/unit-test'
import { handleApiDocs } from './routes/api-docs'
import { handleSql } from './routes/sql'
import { handleGitHubPR } from './routes/github-pr'
import { handleDevOpsTrigger, handleDevOpsStatus } from './routes/devops'
import { handleAssistantChat } from './routes/assistant'

// Agent routes
app.post('/api/agents/code-gen', handleCodeGen)
app.post('/api/agents/code-review', handleCodeReview)
app.post('/api/agents/debug', handleDebug)
app.post('/api/agents/unit-test', handleUnitTest)
app.post('/api/agents/api-docs', handleApiDocs)
app.post('/api/agents/sql', handleSql)
app.post('/api/agents/github-pr', handleGitHubPR)
app.post('/api/agents/devops/trigger', handleDevOpsTrigger)
app.get('/api/agents/devops/status/:owner/:repo/:runId', handleDevOpsStatus)

// Assistant route
app.post('/api/assistant/chat', handleAssistantChat)

// Error handling
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Server error:', err)
  res.status(500).json({ error: 'Internal server error', message: err.message })
})

app.listen(PORT, () => {
  console.log(`AgentHub API server running on port ${PORT}`)
  console.log(`Health check: http://localhost:${PORT}/health`)
})

export default app
