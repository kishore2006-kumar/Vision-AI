import { Request, Response } from 'express'
import { generateText } from '../lib/gemini'

const SYSTEM_PROMPT = `You are an expert debugger. Analyze the provided code and error message to:
1. Explain what the error means in simple terms
2. Identify the root cause
3. Provide a corrected version of the code
4. Suggest prevention tips

Format your response in markdown with clear sections.`

export async function handleDebug(req: Request, res: Response) {
  try {
    const { code, errorMessage } = req.body

    if (!code || !errorMessage) {
      return res.status(400).json({ error: 'Missing required fields: code, errorMessage' })
    }

    const prompt = `Debug this code:\n\n\`\`\`\n${code}\n\`\`\`\n\nError message:\n${errorMessage}`

    const result = await generateText(prompt, SYSTEM_PROMPT)

    res.json({
      explanation: result.text,
      model: result.model,
    })
  } catch (error) {
    console.error('Debug error:', error)
    res.status(500).json({ error: 'Failed to analyze error', message: error instanceof Error ? error.message : 'Unknown error' })
  }
}
