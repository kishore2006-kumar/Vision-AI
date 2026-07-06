import { useState, useRef, useEffect } from "react"
import { MessageCircle, Send, Loader as Loader2, Bot, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

interface ConversationContext {
  role: "user" | "assistant"
  content: string
}

async function sendChatMessage(message: string, history: ConversationContext[]): Promise<string> {
  const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3001"

  try {
    const response = await fetch(`${API_BASE}/api/assistant/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message,
        conversationHistory: history,
      }),
    })

    if (!response.ok) {
      throw new Error("Failed to get response")
    }

    const data = await response.json()
    return data.reply || data.response || data.message || "I understand. How can I help you further?"
  } catch {
    // Fallback mock responses
    const mockResponses: Record<string, string> = {
      code: "I can help you write code! Navigate to the Code Generation agent from the sidebar or Agents Hub. Just describe what you want to build and select your preferred language.",
      debug: "For debugging, use the Debugging Agent workspace. Paste your problematic code and the error message, and I'll analyze the root cause and provide a fix.",
      review: "The Code Review Agent can analyze your code for bugs, security issues, and performance problems. Just paste your code and select the language.",
      test: "Need tests? The Unit Test Generator can create comprehensive test suites. Paste your function or class, select a framework like Jest or PyTest, and get instant test coverage.",
      sql: "The SQL Query Agent converts natural language to optimized queries. Describe your database schema and ask a question in plain English.",
      docs: "Generate beautiful API documentation from your code using the API Documentation Agent. Paste your routes or controller code for instant Markdown docs.",
      pr: "The GitHub PR Review Agent provides automated pull request reviews. Just paste a PR URL and get file-by-file analysis with inline comments.",
      deploy: "Use the DevOps Agent to trigger GitHub Actions workflows. Provide the repository owner, name, workflow file, and branch to dispatch.",
      help: "I'm here to help! You can ask me about navigating AgentHub, using any of the 8 AI agents, or best practices for development workflows.",
      default: "I'm your AI development assistant. I can help you navigate AgentHub and use our AI agents for code generation, review, debugging, testing, and more. What would you like to know?",
    }

    const lowerMessage = message.toLowerCase()
    for (const [key, response] of Object.entries(mockResponses)) {
      if (lowerMessage.includes(key)) {
        return response
      }
    }

    return mockResponses.default
  }
}

export function AssistantChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hi! I'm your AgentHub assistant. I can help you navigate the platform, explain how each AI agent works, or answer questions about development best practices. What would you like to know?",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      // Build context from recent messages
      const history: ConversationContext[] = messages.slice(-6).map(m => ({
        role: m.role,
        content: m.content,
      }))

      const response = await sendChatMessage(userMessage.content, history)

      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: response,
        timestamp: new Date(),
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch {
      setMessages(prev => [
        ...prev,
        {
          id: `error-${Date.now()}`,
          role: "assistant",
          content: "I apologize, but I encountered an error. Please try again.",
          timestamp: new Date(),
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          size="lg"
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-50 p-0"
          aria-label="Open assistant chat"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-full sm:max-w-md p-0 flex flex-col h-full border-l border-border"
      >
        <SheetHeader className="px-4 py-3 border-b border-border shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Bot className="h-4 w-4 text-primary" />
              </div>
              <div>
                <SheetTitle className="text-base">AgentHub Assistant</SheetTitle>
                <p className="text-xs text-muted-foreground">AI-powered help</p>
              </div>
            </div>
            <Badge variant="outline" className="text-xs">
              Powered by Gemini
            </Badge>
          </div>
        </SheetHeader>

        <ScrollArea className="flex-1 p-4" ref={scrollRef}>
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex gap-3",
                  message.role === "user" && "flex-row-reverse"
                )}
              >
                <div
                  className={cn(
                    "h-8 w-8 rounded-full shrink-0 flex items-center justify-center",
                    message.role === "assistant"
                      ? "bg-primary/10"
                      : "bg-muted"
                  )}
                >
                  {message.role === "assistant" ? (
                    <Bot className="h-4 w-4 text-primary" />
                  ) : (
                    <User className="h-4 w-4 text-muted-foreground" />
                  )}
                </div>
                <div
                  className={cn(
                    "rounded-lg px-3 py-2 max-w-[85%]",
                    message.role === "assistant"
                      ? "bg-muted/50"
                      : "bg-primary text-primary-foreground"
                  )}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  <p
                    className={cn(
                      "text-[10px] mt-1",
                      message.role === "assistant"
                        ? "text-muted-foreground"
                        : "text-primary-foreground/70"
                    )}
                  >
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3">
                <div className="h-8 w-8 rounded-full bg-primary/10 shrink-0 flex items-center justify-center">
                  <Bot className="h-4 w-4 text-primary" />
                </div>
                <div className="rounded-lg px-3 py-2 bg-muted/50">
                  <Loader2 className="h-4 w-4 animate-spin" />
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="p-4 border-t border-border shrink-0">
          <div className="flex gap-2">
            <Input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me anything..."
              className="flex-1"
              disabled={isLoading}
            />
            <Button
              size="icon"
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>
          <p className="text-[10px] text-muted-foreground mt-2 text-center">
            Ask about agents, get coding help, or navigate the platform
          </p>
        </div>
      </SheetContent>
    </Sheet>
  )
}
