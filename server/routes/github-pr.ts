import { Request, Response } from 'express'
import { generateText } from '../lib/gemini'

const GITHUB_TOKEN = process.env.GITHUB_TOKEN

const SYSTEM_PROMPT = `You are an expert code reviewer. Review the provided pull request diff and provide:
1. Overall assessment
2. File-by-file review
3. Specific inline comments for issues
4. Approval recommendation

Format as markdown with clear sections.`

interface PRInfo {
  owner: string
  repo: string
  number: number
}

function parsePRUrl(url: string): PRInfo | null {
  const match = url.match(/github\.com\/([^/]+)\/([^/]+)\/pull\/(\d+)/)
  if (!match) return null
  return {
    owner: match[1],
    repo: match[2],
    number: parseInt(match[3], 10),
  }
}

async function fetchPRDiff(owner: string, repo: string, number: number): Promise<string> {
  if (!GITHUB_TOKEN) {
    return 'Mock PR diff - GitHub token not configured'
  }

  const response = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/pulls/${number}`,
    {
      headers: {
        'Authorization': `Bearer ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3.diff',
      },
    }
  )

  if (!response.ok) {
    throw new Error(`Failed to fetch PR: ${response.status}`)
  }

  return response.text()
}

export async function handleGitHubPR(req: Request, res: Response) {
  try {
    const { prUrl } = req.body

    if (!prUrl) {
      return res.status(400).json({ error: 'Missing required field: prUrl' })
    }

    const prInfo = parsePRUrl(prUrl)
    if (!prInfo) {
      return res.status(400).json({ error: 'Invalid GitHub PR URL format' })
    }

    // Fetch PR diff
    const diff = await fetchPRDiff(prInfo.owner, prInfo.repo, prInfo.number)

    const prompt = `Review this pull request diff:\n\n${diff.substring(0, 15000)}`

    const result = await generateText(prompt, SYSTEM_PROMPT)

    res.json({
      review: result.text,
      owner: prInfo.owner,
      repo: prInfo.repo,
      number: prInfo.number,
      model: result.model,
    })
  } catch (error) {
    console.error('GitHub PR error:', error)
    res.status(500).json({ error: 'Failed to review PR', message: error instanceof Error ? error.message : 'Unknown error' })
  }
}
