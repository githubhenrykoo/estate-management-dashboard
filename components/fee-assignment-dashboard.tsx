"use client"

import { useState, ChangeEvent, FormEvent } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/components/ui/use-toast"

interface Property {
  id: number;
  owner: string;
  renter: string;
  fee: number;
}

interface NewAssignment {
  propertyId: string;
  renter: string;
  fee: string;
}

export function FeeAssignmentDashboard() {
  const { addToast } = useToast(); // Changed from toast to addToast
  const [properties, setProperties] = useState<Property[]>([
    { id: 1, owner: 'John Doe', renter: 'Jane Smith', fee: 1000 },
    { id: 2, owner: 'Alice Johnson', renter: '', fee: 1200 },
  ])
  const [newAssignment, setNewAssignment] = useState<NewAssignment>({ propertyId: '', renter: '', fee: '' })

  const handleAssign = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const updatedProperties = properties.map(property => 
      property.id === parseInt(newAssignment.propertyId) 
        ? { ...property, renter: newAssignment.renter, fee: parseFloat(newAssignment.fee) }
        : property
    )
    setProperties(updatedProperties)
    setNewAssignment({ propertyId: '', renter: '', fee: '' })
    addToast({ // Using addToast instead of toast
      title: "Fee assigned",
      description: "The fee has been assigned to the renter.",
    })
  }

  const handleAdjustFee = (id: number, newFee: string) => {
    const updatedProperties = properties.map(property => 
      property.id === id ? { ...property, fee: parseFloat(newFee) } : property
    )
    setProperties(updatedProperties)
    addToast({ // Using addToast instead of toast
      title: "Fee adjusted",
      description: "The maintenance fee has been adjusted.",
    })
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewAssignment(prev => ({ ...prev, [name]: value }))
  }

  return (
    <div className="space-y-4">
      <form onSubmit={handleAssign} className="space-y-4">
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="propertyId">Property ID</Label>
            <Input
              id="propertyId"
              name="propertyId"
              value={newAssignment.propertyId}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="renter">Renter Name</Label>
            <Input
              id="renter"
              name="renter"
              value={newAssignment.renter}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="fee">Fee Amount</Label>
            <Input
              id="fee"
              name="fee"
              type="number"
              value={newAssignment.fee}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <Button type="submit">Assign Fee</Button>
      </form>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Property ID</TableHead>
            <TableHead>Owner</TableHead>
            <TableHead>Renter</TableHead>
            <TableHead>Fee</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {properties.map((property) => (
            <TableRow key={property.id}>
              <TableCell>{property.id}</TableCell>
              <TableCell>{property.owner}</TableCell>
              <TableCell>{property.renter || 'N/A'}</TableCell>
              <TableCell>${property.fee}</TableCell>
              <TableCell>
                <Input
                  type="number"
                  placeholder="New fee"
                  className="w-24 mr-2"
                  onBlur={(e: ChangeEvent<HTMLInputElement>) => handleAdjustFee(property.id, e.target.value)}
                />
                <Button onClick={() => handleAdjustFee(property.id, property.fee.toString())}>Adjust Fee</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
