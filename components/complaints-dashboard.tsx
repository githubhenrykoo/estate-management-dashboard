"use client"

import { useState, ChangeEvent, FormEvent } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/components/ui/use-toast"

interface Complaint {
  id: number;
  category: string;
  description: string;
  photo: File | null;
  status: string;
}

export function ComplaintsDashboard() {
  const { addToast } = useToast()
  const [complaints, setComplaints] = useState<Complaint[]>([])
  const [newComplaint, setNewComplaint] = useState<Omit<Complaint, 'id' | 'status'>>({ 
    category: '', 
    description: '', 
    photo: null 
  })

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const complaintToAdd: Complaint = {
      ...newComplaint,
      id: Date.now(),
      status: 'new'
    }
    setComplaints([...complaints, complaintToAdd])
    setNewComplaint({ category: '', description: '', photo: null })
    addToast({
      title: "Complaint submitted",
      description: "Your complaint has been submitted successfully.",
    })
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewComplaint(prev => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null
    setNewComplaint(prev => ({ ...prev, photo: file }))
  }

  const handleStatusChange = (id: number, newStatus: string) => {
    const updatedComplaints = complaints.map(complaint => 
      complaint.id === id ? { ...complaint, status: newStatus } : complaint
    )
    setComplaints(updatedComplaints)
    addToast({
      title: "Status updated",
      description: `Complaint status updated to ${newStatus}.`,
    })
  }

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              name="category"
              value={newComplaint.category}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="photo">Photo</Label>
            <Input
              id="photo"
              name="photo"
              type="file"
              onChange={handleFileChange}
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            value={newComplaint.description}
            onChange={handleInputChange}
            required
          />
        </div>
        <Button type="submit">Submit Complaint</Button>
      </form>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {complaints.map((complaint) => (
            <TableRow key={complaint.id}>
              <TableCell>{complaint.id}</TableCell>
              <TableCell>{complaint.category}</TableCell>
              <TableCell>{complaint.description}</TableCell>
              <TableCell>{complaint.status}</TableCell>
              <TableCell>
                <select
                  value={complaint.status}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) => handleStatusChange(complaint.id, e.target.value)}
                  className="p-2 border rounded"
                >
                  <option value="new">New</option>
                  <option value="in-progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                </select>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}