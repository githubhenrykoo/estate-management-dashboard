"use client"

import { useState } from 'react'
import { Header } from "@/components/header"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

interface Complaint {
  id: string;
  category: string;
  description: string;
  date: string;
  status: 'pending' | 'solved';
  response?: string;
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
  { id: '2', category: "Noise Complaints", description: "Loud music from apartment 3B", date: "2023-06-02", status: "solved", response: "We've spoken with the tenant in 3B and they've agreed to keep the noise down." },
  { id: '3', category: "Security and Safety", description: "Broken lock on main entrance", date: "2023-06-03", status: "pending" },
  { id: '4', category: "Parking Problems", description: "Car parked in no-parking zone", date: "2023-06-04", status: "pending" },
  { id: '5', category: "Community Rules Violations", description: "Unauthorized pet in building", date: "2023-06-05", status: "solved", response: "We've reminded the tenant of the no-pets policy and they've agreed to find a new home for the pet." },
  { id: '6', category: "Property Value Concerns", description: "Unkempt landscaping", date: "2023-06-06", status: "pending" },
  { id: '7', category: "Environmental Issues", description: "Improper waste disposal", date: "2023-06-07", status: "pending" },
]

export default function AdminComplaintsPage() {
  const [complaints, setComplaints] = useState<Complaint[]>(initialComplaints)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null)
  const [response, setResponse] = useState('')

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

  const handleSubmitResponse = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (selectedComplaint) {
      const updatedComplaints = complaints.map(complaint =>
        complaint.id === selectedComplaint.id
          ? { ...complaint, status: 'solved' as const, response }
          : complaint
      )
      setComplaints(updatedComplaints)
      setSelectedComplaint({ ...selectedComplaint, status: 'solved', response })
      setResponse('')
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Admin Complaints Management</h1>
        
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
        </div>

        {selectedComplaint && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>{selectedComplaint.category}</CardTitle>
            </CardHeader>
            <CardContent>
              <p><strong>Date:</strong> {selectedComplaint.date}</p>
              <p><strong>Status:</strong> {selectedComplaint.status}</p>
              <p><strong>Description:</strong> {selectedComplaint.description}</p>
              {selectedComplaint.response && (
                <p><strong>Response:</strong> {selectedComplaint.response}</p>
              )}
            </CardContent>
            {selectedComplaint.status === 'pending' && (
              <CardFooter>
                <form onSubmit={handleSubmitResponse} className="w-full">
                  <Label htmlFor="response">Response</Label>
                  <Textarea
                    id="response"
                    value={response}
                    onChange={(e) => setResponse(e.target.value)}
                    className="mb-2"
                  />
                  <Button type="submit">Submit Response</Button>
                </form>
              </CardFooter>
            )}
          </Card>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredComplaints.map((complaint) => (
            <Card key={complaint.id} className="cursor-pointer" onClick={() => setSelectedComplaint(complaint)}>
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
                <Button variant="outline">View More</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}