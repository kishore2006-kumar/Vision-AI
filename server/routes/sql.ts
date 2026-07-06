import { Request, Response } from 'express'
import { generateText } from '../lib/gemini'

const SYSTEM_PROMPT = `You are an expert SQL developer. Convert natural language questions into optimized SQL queries.
- Consider the provided schema
- Use proper JOINs when needed
- Include indexes and optimization hints
- Explain the query logic

Return both the SQL query and a brief explanation.`

export async function handleSql(req: Request, res: Response) {
  try {
    const { question, schemaDescription } = req.body

    if (!question) {
      return res.status(400).json({ error: 'Missing required field: question' })
    }

    const prompt = `Generate an SQL query for the following question.

Database Schema:
${schemaDescription || 'No schema provided'}

Question:
${question}`

    const result = await generateText(prompt, SYSTEM_PROMPT)

    // Try to extract SQL from response
    const sqlMatch = result.text.match(/```sql\n?([\s\S]*?)\n?```/)
    const sql = sqlMatch ? sqlMatch[1].trim() : result.text

    res.json({
      sql,
      explanation: result.text,
      model: result.model,
    })
  } catch (error) {
    console.error('SQL error:', error)
    res.status(500).json({ error: 'Failed to generate SQL', message: error instanceof Error ? error.message : 'Unknown error' })
  }
}
