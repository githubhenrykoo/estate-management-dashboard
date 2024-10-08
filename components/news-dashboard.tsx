"use client"

import { useState, ChangeEvent, FormEvent } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/components/ui/use-toast"

// Define types
interface Announcement {
  id: number;
  title: string;
  content: string;
  type: string;
  readBy: string[];
}

interface NewAnnouncement {
  title: string;
  content: string;
  type: string;
}

export function NewsDashboard() {
  const { addToast } = useToast()  // Correct function for adding a toast

  // State management with correct types
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [newAnnouncement, setNewAnnouncement] = useState<NewAnnouncement>({ title: '', content: '', type: 'public' })

  // Handle form submission
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setAnnouncements([...announcements, { ...newAnnouncement, id: Date.now(), readBy: [] }])
    setNewAnnouncement({ title: '', content: '', type: 'public' })
    addToast({
      title: "Announcement posted",
      description: "Your announcement has been posted successfully.",
    })
  }

  // Handle marking an announcement as read
  const handleRead = (id: number) => {
    const updatedAnnouncements = announcements.map(announcement => 
      announcement.id === id ? { ...announcement, readBy: [...announcement.readBy, 'Current User'] } : announcement
    )
    setAnnouncements(updatedAnnouncements)
    addToast({
      title: "Marked as read",
      description: "The announcement has been marked as read.",
    })
  }

  // Handle input changes
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target
    setNewAnnouncement(prev => ({ ...prev, [id]: value }))
  }

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={newAnnouncement.title}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="type">Type</Label>
            <select
              id="type"
              value={newAnnouncement.type}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            >
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="content">Content</Label>
          <Textarea
            id="content"
            value={newAnnouncement.content}
            onChange={handleInputChange}
            required
          />
        </div>
        <Button type="submit">Post Announcement</Button>
      </form>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Content</TableHead>
            <TableHead>Read By</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {announcements.map((announcement) => (
            <TableRow key={announcement.id}>
              <TableCell>{announcement.title}</TableCell>
              <TableCell>{announcement.type}</TableCell>
              <TableCell>{announcement.content}</TableCell>
              <TableCell>{announcement.readBy.join(', ') || 'None'}</TableCell>
              <TableCell>
                <Button onClick={() => handleRead(announcement.id)}>Mark as Read</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
