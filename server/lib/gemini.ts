import { GoogleGenAI } from '@google/genai'

const GEMINI_API_KEY = process.env.GEMINI_API_KEY

if (!GEMINI_API_KEY) {
  console.warn('GEMINI_API_KEY not set. Agent responses will use mock data.')
}

// Initialize Gemini client
const getClient = () => {
  if (!GEMINI_API_KEY) return null
  return new GoogleGenAI({ apiKey: GEMINI_API_KEY })
}

// Available models in priority order
const MODELS = ['gemini-2.5-flash', 'gemini-2.0-flash']

// Retry configuration
const MAX_RETRIES = 3
const BASE_DELAY = 2000 // 2 seconds

// Exponential backoff delay
const getDelay = (attempt: number): number => {
  return BASE_DELAY * Math.pow(2, attempt)
}

// Check if error is retryable (5xx errors)
const isRetryable = (error: unknown): boolean => {
  if (error instanceof Error) {
    const message = error.message.toLowerCase()
    return message.includes('500') || message.includes('502') || message.includes('503') || message.includes('504')
  }
  return false
}

export interface GenerateResult {
  text: string
  model: string
  attempts: number
}

// Generate text with fallback and retry logic
export async function generateText(prompt: string, systemPrompt?: string): Promise<GenerateResult> {
  const client = getClient()

  if (!client) {
    return {
      text: 'Mock response: Gemini API key not configured. Set GEMINI_API_KEY environment variable.',
      model: 'mock',
      attempts: 0,
    }
  }

  let lastError: Error | null = null

  for (const model of MODELS) {
    for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
      try {
        const response = await client.models.generateContent({
          model,
          contents: prompt,
          config: {
            systemInstruction: systemPrompt || 'You are a helpful AI developer assistant.',
            temperature: 0.7,
            maxOutputTokens: 8192,
          },
        })

        const text = response.text || ''
        return {
          text,
          model,
          attempts: attempt + 1,
        }
      } catch (error) {
        lastError = error instanceof Error ? error : new Error('Unknown error')

        if (!isRetryable(error) || attempt === MAX_RETRIES - 1) {
          // Try next model
          break
        }

        // Wait before retry with exponential backoff
        await new Promise(resolve => setTimeout(resolve, getDelay(attempt)))
      }
    }
  }

  // All models failed
  throw lastError || new Error('Failed to generate text after all attempts')
}

// Generate with JSON output
export async function generateJSON<T>(prompt: string, systemPrompt?: string): Promise<T> {
  const client = getClient()

  if (!client) {
    return {} as T
  }

  let lastError: Error | null = null

  for (const model of MODELS) {
    for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
      try {
        const response = await client.models.generateContent({
          model,
          contents: prompt,
          config: {
            systemInstruction: systemPrompt || 'You are a helpful AI that responds only with valid JSON.',
            temperature: 0.5,
            maxOutputTokens: 4096,
            responseMimeType: 'application/json',
          },
        })

        const text = response.text || ''
        return JSON.parse(text) as T
      } catch (error) {
        lastError = error instanceof Error ? error : new Error('Unknown error')

        if (!isRetryable(error) || attempt === MAX_RETRIES - 1) {
          break
        }

        await new Promise(resolve => setTimeout(resolve, getDelay(attempt)))
      }
    }
  }

  throw lastError || new Error('Failed to generate JSON after all attempts')
}
