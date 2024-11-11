"use client"

import { useState } from 'react'
import { Header } from "@/components/header"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { ChevronDown, ChevronRight } from "lucide-react"
import Image from "next/image"

interface Complaint {
  id: string;
  category: string;
  description: string;
  date: string;
  status: 'pending' | 'resolved';
  attachments?: string[];
}

const categories = [
  "Maintenance Issues",
  "Noise Complaints",
  "Security and Safety",
  "Parking Problems",
  "Community Rules Violations",
  "Property Value Concerns",
  "Environmental Issues"
]

const initialComplaints: Complaint[] = [
  { id: '1', category: "Maintenance Issues", description: "Leaking faucet in kitchen", date: "2023-06-01", status: "pending" },
  { id: '2', category: "Noise Complaints", description: "Loud music from apartment 3B", date: "2023-06-02", status: "resolved" },
  { id: '3', category: "Security and Safety", description: "Broken lock on main entrance", date: "2023-06-03", status: "pending" },
  { id: '4', category: "Parking Problems", description: "Car parked in no-parking zone", date: "2023-06-04", status: "pending" },
  { id: '5', category: "Community Rules Violations", description: "Unauthorized pet in building", date: "2023-06-05", status: "resolved" },
  { id: '6', category: "Property Value Concerns", description: "Unkempt landscaping", date: "2023-06-06", status: "pending" },
  { id: '7', category: "Environmental Issues", description: "Improper waste disposal", date: "2023-06-07", status: "pending" },
]

function ComplaintDetailsDialog({ complaint }: { complaint: Complaint }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">View Details</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Complaint Details</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4">
          <div>
            <Label className="font-bold">Category</Label>
            <p>{complaint.category}</p>
          </div>
          <div>
            <Label className="font-bold">Description</Label>
            <p>{complaint.description}</p>
          </div>
          <div>
            <Label className="font-bold">Date</Label>
            <p>{complaint.date}</p>
          </div>
          <div>
            <Label className="font-bold">Status</Label>
            <p>{complaint.status}</p>
          </div>
          <div>
            <Label className="font-bold">Image</Label>
            <Image src="/app/images/30183858_l-scaled.jpg" alt="Complaint Image" width={300} height={200} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default function ComplaintsPage() {
  const [complaints, setComplaints] = useState<Complaint[]>(initialComplaints)
  const [expandedCategories, setExpandedCategories] = useState<string[]>([])
  const [showResolved, setShowResolved] = useState(false)

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    )
  }

  const getCategoryStats = (category: string) => {
    const categoryComplaints = complaints.filter(c => c.category === category)
    const total = categoryComplaints.length
    const resolved = categoryComplaints.filter(c => c.status === 'resolved').length
    const outstanding = total - resolved
    return { total, resolved, outstanding }
  }

  const handleSubmitComplaint = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const newComplaint: Complaint = {
      id: Date.now().toString(),
      category: formData.get('category') as string,
      description: formData.get('description') as string,
      date: new Date().toISOString().split('T')[0],
      status: 'pending',
      attachments: formData.get('attachments') ? [formData.get('attachments') as string] : undefined
    }
    setComplaints([newComplaint, ...complaints])
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Complaints Management</h1>
        
        <div className="mb-6 flex justify-between items-center">
          <Dialog>
            <DialogTrigger asChild>
              <Button>Submit New Complaint</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Submit New Complaint</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmitComplaint} className="space-y-4">
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select name="category" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" name="description" required />
                </div>
                <div>
                  <Label htmlFor="attachments">Attachments</Label>
                  <Input id="attachments" name="attachments" type="file" accept="image/*" multiple />
                </div>
                <Button type="submit">Submit Complaint</Button>
              </form>
            </DialogContent>
          </Dialog>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="showResolved"
              checked={showResolved}
              onCheckedChange={(checked) => setShowResolved(checked as boolean)}
            />
            <Label htmlFor="showResolved">Show Resolved Complaints</Label>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Category</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Resolved</TableHead>
              <TableHead>Outstanding</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((category) => {
              const { total, resolved, outstanding } = getCategoryStats(category)
              const isExpanded = expandedCategories.includes(category)
              return (
                <>
                  <TableRow key={category} className="cursor-pointer" onClick={() => toggleCategory(category)}>
                    <TableCell className="font-medium">
                      {isExpanded ? <ChevronDown className="inline mr-2" /> : <ChevronRight className="inline mr-2" />}
                      {category}
                    </TableCell>
                    <TableCell>{total}</TableCell>
                    <TableCell>{resolved}</TableCell>
                    <TableCell>{outstanding}</TableCell>
                  </TableRow>
                  {isExpanded && (
                    <TableRow>
                      <TableCell colSpan={4}>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Date</TableHead>
                              <TableHead>Description</TableHead>
                              <TableHead>Status</TableHead>
                              <TableHead>Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {complaints
                              .filter(c => c.category === category)
                              .filter(c => showResolved || c.status === 'pending')
                              .map((complaint) => (
                                <TableRow key={complaint.id}>
                                  <TableCell>{complaint.date}</TableCell>
                                  <TableCell>{complaint.description}</TableCell>
                                  <TableCell>{complaint.status}</TableCell>
                                  <TableCell>
                                    <ComplaintDetailsDialog complaint={complaint} />
                                  </TableCell>
                                </TableRow>
                              ))}
                          </TableBody>
                        </Table>
                      </TableCell>
                    </TableRow>
                  )}
                </>
              )
            })}
          </TableBody>
        </Table>
      </main>
    </div>
  )
}