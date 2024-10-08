import { useState, useEffect, useCallback } from "react"

type ToastProps = {
  title?: string
  description?: string
  action?: React.ReactNode
  duration?: number
}

type Toast = ToastProps & {
  id: string
}

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([])

  const addToast = useCallback(
    ({ title, description, action, duration = 5000 }: ToastProps) => {
      const id = Math.random().toString(36).substr(2, 9)
      setToasts((prevToasts) => [
        ...prevToasts,
        { id, title, description, action, duration },
      ])

      if (duration > 0) {
        setTimeout(() => {
          setToasts((prevToasts) =>
            prevToasts.filter((toast) => toast.id !== id)
          )
        }, duration)
      }
    },
    []
  )

  const removeToast = useCallback((id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id))
  }, [])

  return {
    toasts,
    addToast,
    removeToast,
  }
}