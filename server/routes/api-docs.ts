import { Request, Response } from 'express'
import { generateText } from '../lib/gemini'

const SYSTEM_PROMPT = `You are a technical documentation expert. Generate clear, comprehensive API documentation from code.
Include:
- Endpoint descriptions
- Request/response schemas
- Authentication requirements
- Example requests and responses
- Error codes and handling

Format output in clean Markdown.`

export async function handleApiDocs(req: Request, res: Response) {
  try {
    const { code } = req.body

    if (!code) {
      return res.status(400).json({ error: 'Missing required field: code' })
    }

    const prompt = `Generate API documentation for:\n\n\`\`\`\n${code}\n\`\`\``

    const result = await generateText(prompt, SYSTEM_PROMPT)

    res.json({
      documentation: result.text,
      model: result.model,
    })
  } catch (error) {
    console.error('API docs error:', error)
    res.status(500).json({ error: 'Failed to generate documentation', message: error instanceof Error ? error.message : 'Unknown error' })
  }
}
