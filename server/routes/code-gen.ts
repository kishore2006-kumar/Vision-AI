import { Request, Response } from 'express'
import { generateText } from '../lib/gemini'

const SYSTEM_PROMPT = `You are an expert software developer. Generate clean, production-ready code based on the given requirements.
- Use best practices and idiomatic patterns for the specified language
- Include proper error handling
- Add type annotations where appropriate
- Include brief comments for complex logic
- Return only the code, no explanations outside the code`

export async function handleCodeGen(req: Request, res: Response) {
  try {
    const { requirements, language } = req.body

    if (!requirements || !language) {
      return res.status(400).json({ error: 'Missing required fields: requirements, language' })
    }

    const prompt = `Generate ${language} code for the following requirements:\n\n${requirements}`

    const result = await generateText(prompt, SYSTEM_PROMPT)

    res.json({
      code: result.text,
      language,
      model: result.model,
    })
  } catch (error) {
    console.error('Code gen error:', error)
    res.status(500).json({ error: 'Failed to generate code', message: error instanceof Error ? error.message : 'Unknown error' })
  }
}
