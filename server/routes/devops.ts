import { Request, Response } from 'express'

const GITHUB_TOKEN = process.env.GITHUB_TOKEN

interface WorkflowRun {
  id: number
  status: string
  conclusion: string | null
  html_url: string
  created_at: string
  updated_at: string
}

export async function handleDevOpsTrigger(req: Request, res: Response) {
  try {
    const { owner, repo, workflowFile, ref, inputs } = req.body

    if (!owner || !repo || !workflowFile || !ref) {
      return res.status(400).json({ error: 'Missing required fields: owner, repo, workflowFile, ref' })
    }

    if (!GITHUB_TOKEN) {
      return res.json({
        message: 'Mock workflow trigger - GitHub token not configured',
        workflow: workflowFile,
        owner,
        repo,
        ref,
        runId: Math.floor(Math.random() * 100000),
        url: `https://github.com/${owner}/${repo}/actions`,
      })
    }

    // Trigger workflow dispatch
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/actions/workflows/${workflowFile}/dispatches`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
          'X-GitHub-Api-Version': '2022-11-28',
        },
        body: JSON.stringify({
          ref,
          inputs: inputs || {},
        }),
      }
    )

    if (response.status === 204) {
      // Success - workflow queued
      // Note: GitHub doesn't return run ID directly, need to poll for it
      res.json({
        message: 'Workflow triggered successfully',
        workflow: workflowFile,
        owner,
        repo,
        ref,
      })
    } else if (!response.ok) {
      const error = await response.json()
      res.status(response.status).json({ error: error.message || 'Failed to trigger workflow' })
    } else {
      res.json({ message: 'Workflow trigger request sent' })
    }
  } catch (error) {
    console.error('DevOps trigger error:', error)
    res.status(500).json({ error: 'Failed to trigger workflow', message: error instanceof Error ? error.message : 'Unknown error' })
  }
}

export async function handleDevOpsStatus(req: Request, res: Response) {
  try {
    const { owner, repo, runId } = req.params

    if (!GITHUB_TOKEN) {
      return res.json({
        id: parseInt(runId, 10),
        status: 'completed',
        conclusion: 'success',
        message: 'Mock status - GitHub token not configured',
      })
    }

    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/actions/runs/${runId}`,
      {
        headers: {
          'Authorization': `Bearer ${GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json',
          'X-GitHub-Api-Version': '2022-11-28',
        },
      }
    )

    if (!response.ok) {
      return res.status(response.status).json({ error: 'Run not found' })
    }

    const run: WorkflowRun = await response.json()

    res.json({
      id: run.id,
      status: run.status,
      conclusion: run.conclusion,
      url: run.html_url,
      createdAt: run.created_at,
      updatedAt: run.updated_at,
    })
  } catch (error) {
    console.error('DevOps status error:', error)
    res.status(500).json({ error: 'Failed to get run status', message: error instanceof Error ? error.message : 'Unknown error' })
  }
}
