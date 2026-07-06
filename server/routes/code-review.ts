import { Request, Response } from 'express'
import { generateText } from '../lib/gemini'

const SYSTEM_PROMPT = `You are an expert code reviewer. Analyze code for:
- Security vulnerabilities
- Performance issues
- Logic errors
- Style violations
- Best practice violations

Return a structured analysis in markdown format with:
## Summary
## Issues Found
For each issue include:
- Severity (Critical/High/Medium/Low)
- Line number or location
- Description
- Suggested fix`

export async function handleCodeReview(req: Request, res: Response) {
  try {
    const { code, language } = req.body

    if (!code) {
      return res.status(400).json({ error: 'Missing required field: code' })
    }

    const prompt = `Review this ${language || 'code'}:\n\n\`\`\`${language || ''}\n${code}\n\`\`\``

    const result = await generateText(prompt, SYSTEM_PROMPT)

    // Parse issues from the response
    const issues = []
    const issueRegex = /(Critical|High|Medium|Low).*?:\s*(.+)/gi
    let match
    while ((match = issueRegex.exec(result.text)) !== null) {
      issues.push({
        severity: match[1].toLowerCase(),
        message: match[2].trim(),
        line: null,
      })
    }

    res.json({
      review: result.text,
      issues: issues.length > 0 ? issues : undefined,
      model: result.model,
    })
  } catch (error) {
    console.error('Code review error:', error)
    res.status(500).json({ error: 'Failed to review code', message: error instanceof Error ? error.message : 'Unknown error' })
  }
}
