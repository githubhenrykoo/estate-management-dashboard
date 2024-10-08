"use client"

import { useState } from 'react'
import { Header } from "@/components/header"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { SidebarChat } from "@/components/sidebar-chat"

interface User {
  id: number
  name: string
  role: string
  propertyId: string
  status: string
  dob: string
  contactNumber: string
  email: string
}

const initialUsers: User[] = [
  { id: 1, name: "John Doe", role: "Owner", propertyId: "PROP001", status: "Active", dob: "1980-01-01", contactNumber: "1234567890", email: "john@example.com" },
  { id: 2, name: "Jane Smith", role: "Renter", propertyId: "PROP002", status: "Pending", dob: "1985-05-15", contactNumber: "9876543210", email: "jane@example.com" },
  { id: 3, name: "Alice Johnson", role: "Estate Manager", propertyId: "PROP003", status: "Active", dob: "1990-12-31", contactNumber: "5555555555", email: "alice@example.com" },
]

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>(initialUsers)
  const [searchTerm, setSearchTerm] = useState('')
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [chatUser, setChatUser] = useState<User | null>(null)
  const { addToast } = useToast()

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const filteredUsers = users.filter(user =>
    Object.values(user).some(value =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  )

  const handleEdit = (user: User) => {
    setEditingUser(user)
  }

  const handleSave = () => {
    if (editingUser) {
      setUsers(users.map(u => u.id === editingUser.id ? editingUser : u))
      setEditingUser(null)
      addToast({
        title: "User Updated",
        description: `${editingUser.name}'s information has been updated.`,
      })
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editingUser) {
      setEditingUser({ ...editingUser, [e.target.name]: e.target.value })
    }
  }

  const handleChatOpen = (user: User) => {
    setChatUser(user)
    setIsChatOpen(true)
  }

  const handleChatClose = () => {
    setIsChatOpen(false)
    setChatUser(null)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Users</h1>
        <Input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={handleSearch}
          className="mb-4"
        />
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Property ID</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date of Birth</TableHead>
              <TableHead>Contact Number</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{editingUser?.id === user.id ? <Input name="name" value={editingUser.name} onChange={handleInputChange} /> : user.name}</TableCell>
                <TableCell>{editingUser?.id === user.id ? <Input name="role" value={editingUser.role} onChange={handleInputChange} /> : user.role}</TableCell>
                <TableCell>{editingUser?.id === user.id ? <Input name="propertyId" value={editingUser.propertyId} onChange={handleInputChange} /> : user.propertyId}</TableCell>
                <TableCell>{editingUser?.id === user.id ? <Input name="status" value={editingUser.status} onChange={handleInputChange} /> : user.status}</TableCell>
                <TableCell>{editingUser?.id === user.id ? <Input name="dob" value={editingUser.dob} onChange={handleInputChange} /> : user.dob}</TableCell>
                <TableCell>{editingUser?.id === user.id ? <Input name="contactNumber" value={editingUser.contactNumber} onChange={handleInputChange} /> : user.contactNumber}</TableCell>
                <TableCell>{editingUser?.id === user.id ? <Input name="email" value={editingUser.email} onChange={handleInputChange} /> : user.email}</TableCell>
                <TableCell>
                  {editingUser?.id === user.id ? (
                    <Button onClick={handleSave}>Save</Button>
                  ) : (
                    <>
                      <Button onClick={() => handleEdit(user)} className="mr-2">Edit</Button>
                      <Button onClick={() => handleChatOpen(user)}>Chat</Button>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </main>
      <SidebarChat 
        isOpen={isChatOpen} 
        onClose={handleChatClose} 
        user={chatUser}
      />
    </div>
  )
}
