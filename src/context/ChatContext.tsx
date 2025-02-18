import React, { createContext, useContext, useState, type ReactNode } from "react"

interface ChatResponse {
  json: {
    date: string
    location: string
    description: string
    injuries: boolean
    owner: boolean
    complete: boolean
    question?: string
    readable_summary?: string
    conversationalResponse?:string
  }
}

interface ChatContextType {
  chatResponse: ChatResponse | null
  setChatResponse: (response: ChatResponse | null) => void
  originalText: string
  setOriginalText: (text: string) => void
}

const ChatContext = createContext<ChatContextType | undefined>(undefined)

interface ChatProviderProps {
  children: ReactNode
}

export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  const [chatResponse, setChatResponse] = useState<ChatResponse | null>(null)
  const [originalText, setOriginalText] = useState<string>("")

  return (
    <ChatContext.Provider value={{ chatResponse, setChatResponse, originalText, setOriginalText }}>
      {children}
    </ChatContext.Provider>
  )
}

export const useChat = (): ChatContextType => {
  const context = useContext(ChatContext)
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider")
  }
  return context
}
