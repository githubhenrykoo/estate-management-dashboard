"use client"

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChevronRight, Send } from 'lucide-react'

type Message = {
  id: number
  content: string
  sender: 'user' | 'system'
}

type User = {
  id: number
  name: string
}

type SidebarChatProps = {
  isOpen: boolean
  onClose: () => void
  user: User | null
}

export function SidebarChat({ isOpen, onClose, user }: SidebarChatProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')

  useEffect(() => {
    if (user) {
      setMessages([{ id: Date.now(), content: `Welcome to your chat with ${user.name}!`, sender: 'system' }])
    }
  }, [user])

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { id: Date.now(), content: input, sender: 'user' }])
      setInput('')
      // Here you would typically send the message to your backend
    }
  }

  return (
    <div className={`fixed right-0 top-0 h-screen bg-background border-l transition-all duration-300 ease-in-out ${isOpen ? 'w-80' : 'w-0'}`}>
      <Button 
        variant="ghost" 
        size="icon" 
        className="absolute -left-3 top-1/2 transform -translate-y-1/2"
        onClick={onClose}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
      
      {isOpen && (
        <div className="flex flex-col h-full p-4">
          <h2 className="text-lg font-semibold mb-4">Chat with {user?.name}</h2>
          <ScrollArea className="flex-grow mb-4">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`mb-2 p-2 rounded-lg ${
                  message.sender === 'user' ? 'bg-primary text-primary-foreground ml-auto' : 'bg-muted'
                } max-w-[80%]`}
              >
                {message.content}
              </div>
            ))}
          </ScrollArea>
          <div className="flex">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              className="flex-grow"
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            />
            <Button onClick={handleSend} size="icon" className="ml-2">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}