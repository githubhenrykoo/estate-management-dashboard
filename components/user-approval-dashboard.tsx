"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/components/ui/use-toast"

interface User {
  name: string
  email: string
  phone: string
  type: string
  status: 'pending' | 'approved' | 'rejected'
}

export function UserApprovalDashboard() {
  const { addToast } = useToast()
  const [newUser, setNewUser] = useState<User>({ name: '', email: '', phone: '', type: 'owner', status: 'pending' })
  const [users, setUsers] = useState<User[]>([])  // Explicitly define the users state type

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setUsers([...users, { ...newUser, status: 'pending' }])
    setNewUser({ name: '', email: '', phone: '', type: 'owner', status: 'pending' })
    addToast({
      title: "User request submitted",
      description: "The user request has been submitted for approval.",
    })
  }

  const handleApprove = (index: number) => {  // Explicitly type 'index' as number
    const updatedUsers = [...users]
    updatedUsers[index].status = 'approved'
    setUsers(updatedUsers)
    addToast({
      title: "User approved",
      description: "The user has been approved.",
    })
  }

  const handleReject = (index: number) => {  // Explicitly type 'index' as number
    const updatedUsers = [...users]
    updatedUsers[index].status = 'rejected'
    setUsers(updatedUsers)
    addToast({
      title: "User rejected",
      description: "The user has been rejected.",
    })
  }

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              type="tel"
              value={newUser.phone}
              onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="type">Type</Label>
            <select
              id="type"
              value={newUser.type}
              onChange={(e) => setNewUser({ ...newUser, type: e.target.value })}
              className="w-full p-2 border rounded"
            >
              <option value="owner">Owner</option>
              <option value="renter">Renter</option>
            </select>
          </div>
        </div>
        <Button type="submit">Submit Request</Button>
      </form>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user, index) => (
            <TableRow key={index}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.phone}</TableCell>
              <TableCell>{user.type}</TableCell>
              <TableCell>{user.status}</TableCell>
              <TableCell>
                {user.status === 'pending' && (
                  <>
                    <Button onClick={() => handleApprove(index)} className="mr-2">Approve</Button>
                    <Button onClick={() => handleReject(index)} variant="destructive">Reject</Button>
                  </>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
