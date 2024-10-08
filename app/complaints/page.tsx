"use client"

import { useState } from 'react'
import { Header } from "@/components/header"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface Complaint {
  id: string;
  category: string;
  description: string;
  date: string;
  status: 'pending' | 'solved';
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
  { id: '2', category: "Noise Complaints", description: "Loud music from apartment 3B", date: "2023-06-02", status: "solved" },
  { id: '3', category: "Security and Safety", description: "Broken lock on main entrance", date: "2023-06-03", status: "pending" },
  { id: '4', category: "Parking Problems", description: "Car parked in no-parking zone", date: "2023-06-04", status: "pending" },
  { id: '5', category: "Community Rules Violations", description: "Unauthorized pet in building", date: "2023-06-05", status: "solved" },
  { id: '6', category: "Property Value Concerns", description: "Unkempt landscaping", date: "2023-06-06", status: "pending" },
  { id: '7', category: "Environmental Issues", description: "Improper waste disposal", date: "2023-06-07", status: "pending" },
]

export default function ComplaintsPage() {
  const [complaints, setComplaints] = useState<Complaint[]>(initialComplaints)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null)

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const filteredComplaints = complaints.filter(complaint =>
    (complaint.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
     complaint.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
     complaint.date.includes(searchTerm) ||
     complaint.status.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (!selectedCategory || complaint.category === selectedCategory)
  )

  const handleSubmitComplaint = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const newComplaint: Complaint = {
      id: Date.now().toString(),
      category: formData.get('category') as string,
      description: formData.get('description') as string,
      date: new Date().toISOString().split('T')[0],
      status: 'pending'
    }
    setComplaints([newComplaint, ...complaints])
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Complaints Management</h1>
        
        <div className="mb-6 flex flex-col md:flex-row gap-4">
          <Input
            type="text"
            placeholder="Search complaints..."
            value={searchTerm}
            onChange={handleSearch}
            className="flex-grow"
          />
          <Select value={selectedCategory || 'all'} onValueChange={(value) => setSelectedCategory(value === 'all' ? null : value)}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
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
                <Button type="submit">Submit Complaint</Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredComplaints.map((complaint) => (
            <Card key={complaint.id}>
              <CardHeader>
                <CardTitle>{complaint.category}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2">
                  {complaint.date} | {complaint.status}
                </p>
                <p className="line-clamp-3">{complaint.description}</p>
              </CardContent>
              <CardFooter>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" onClick={() => setSelectedComplaint(complaint)}>View More</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{selectedComplaint?.category}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-2">
                      <p><strong>Date:</strong> {selectedComplaint?.date}</p>
                      <p><strong>Status:</strong> {selectedComplaint?.status}</p>
                      <p><strong>Description:</strong> {selectedComplaint?.description}</p>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}