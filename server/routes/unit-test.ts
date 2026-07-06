import { Request, Response } from 'express'
import { generateText } from '../lib/gemini'

const SYSTEM_PROMPT = `You are an expert test engineer. Generate comprehensive unit tests for the given code.
- Cover happy paths, edge cases, and error conditions
- Use proper Arrange-Act-Assert (AAA) pattern
- Create necessary mocks and stubs
- Include descriptive test names
- Return only the test file code`

export async function handleUnitTest(req: Request, res: Response) {
  try {
    const { code, framework } = req.body

    if (!code) {
      return res.status(400).json({ error: 'Missing required field: code' })
    }

    const testFramework = framework || 'Jest'

    const prompt = `Generate ${testFramework} unit tests for:\n\n\`\`\`\n${code}\n\`\`\``

    const result = await generateText(prompt, SYSTEM_PROMPT)

    res.json({
      tests: result.text,
      framework: testFramework,
      model: result.model,
    })
  } catch (error) {
    console.error('Unit test error:', error)
    res.status(500).json({ error: 'Failed to generate tests', message: error instanceof Error ? error.message : 'Unknown error' })
  }
}
