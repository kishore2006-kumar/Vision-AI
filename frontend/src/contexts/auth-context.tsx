import { createContext, useContext, useState, useCallback, type ReactNode } from "react"

interface User {
  id: string
  email: string
  name: string
  role: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  register: (name: string, email: string, password: string) => Promise<boolean>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const login = useCallback(async (email: string, _password: string): Promise<boolean> => {
    setIsLoading(true)
    try {
      // Mock in-memory authentication - accepts any email/password
      await new Promise(resolve => setTimeout(resolve, 500))
      const mockUser: User = {
        id: "user-001",
        email,
        name: email.split("@")[0].charAt(0).toUpperCase() + email.split("@")[0].slice(1),
        role: "Developer",
      }
      setUser(mockUser)
      return true
    } finally {
      setIsLoading(false)
    }
  }, [])

  const logout = useCallback(() => {
    setUser(null)
  }, [])

  const register = useCallback(async (name: string, email: string, _password: string): Promise<boolean> => {
    setIsLoading(true)
    try {
      // Mock in-memory registration - accepts any data
      await new Promise(resolve => setTimeout(resolve, 500))
      const mockUser: User = {
        id: "user-001",
        email,
        name,
        role: "Developer",
      }
      setUser(mockUser)
      return true
    } finally {
      setIsLoading(false)
    }
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
