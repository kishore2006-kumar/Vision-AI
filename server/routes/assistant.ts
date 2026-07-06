import { Request, Response } from 'express'
import { generateText } from '../lib/gemini'

const SYSTEM_PROMPT = `You are AgentHub's AI assistant. You help developers navigate the platform and use the 8 AI agents effectively.

Available agents:
1. Code Generation - Generate code from natural language
2. Code Review - Analyze code for issues
3. Debugging - Diagnose and fix errors
4. Unit Test Generator - Create test suites
5. API Documentation - Generate docs from code
6. SQL Query - Natural language to SQL
7. GitHub PR Review - Automated PR analysis
8. DevOps - Trigger GitHub Actions

Be helpful, concise, and guide users to the right agent for their task.`

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export async function handleAssistantChat(req: Request, res: Response) {
  try {
    const { message, conversationHistory } = req.body

    if (!message) {
      return res.status(400).json({ error: 'Missing required field: message' })
    }

    // Build conversation context
    const history = (conversationHistory || []) as Message[]
    const contextMessages = history
      .slice(-6)
      .map(m => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`)
      .join('\n\n')

    const prompt = contextMessages
      ? `${contextMessages}\n\nUser: ${message}`
      : message

    const result = await generateText(prompt, SYSTEM_PROMPT)

    res.json({
      reply: result.text,
      model: result.model,
    })
  } catch (error) {
    console.error('Assistant chat error:', error)
    res.status(500).json({ error: 'Failed to process message', message: error instanceof Error ? error.message : 'Unknown error' })
  }
}
