"use client"

import { useState } from 'react'
import { Header } from "@/components/header"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Property {
  id: string;
  owner: string;
  renter: string | null;
  location: string;
  blockNumber: string;
  status: string;
  cluster: string;
  company: string;
  group: string;
}

const initialProperties: Property[] = [
  { id: 'PROP001', owner: 'John Doe', renter: 'Jane Smith', location: '123 Main St', blockNumber: 'A1', status: 'Occupied', cluster: 'Permata Riverview', company: 'Ekadi Trisakti Mas', group: 'Ekamas Mandiri Group' },
  { id: 'PROP002', owner: 'Alice Johnson', renter: null, location: '456 Elm St', blockNumber: 'B2', status: 'Vacant', cluster: 'Green Valley', company: 'Ekadi Trisakti Mas', group: 'Ekamas Mandiri Group' },
  { id: 'PROP003', owner: 'Bob Williams', renter: 'Charlie Brown', location: '789 Oak St', blockNumber: 'C3', status: 'Occupied', cluster: 'Permata Riverview', company: 'Ekadi Trisakti Mas', group: 'Ekamas Mandiri Group' },
  { id: 'PROP004', owner: 'Eva Davis', renter: null, location: '101 Pine St', blockNumber: 'D4', status: 'Under Maintenance', cluster: 'Green Valley', company: 'Ekadi Trisakti Mas', group: 'Ekamas Mandiri Group' },
]

type AccessLevel = 'Group Director' | 'Company Director' | 'Estate Manager' | 'Administrator';

export default function PropertiesPage() {
  const [properties, setProperties] = useState<Property[]>(initialProperties)
  const [searchTerm, setSearchTerm] = useState('')
  const [accessLevel, setAccessLevel] = useState<AccessLevel>('Group Director')

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value.toLowerCase()
    setSearchTerm(term)

    const filteredProperties = initialProperties.filter(property =>
      property.id.toLowerCase().includes(term) ||
      property.owner.toLowerCase().includes(term) ||
      property.location.toLowerCase().includes(term) ||
      property.blockNumber.toLowerCase().includes(term) ||
      property.status.toLowerCase().includes(term) ||
      property.cluster.toLowerCase().includes(term) ||
      property.company.toLowerCase().includes(term) ||
      property.group.toLowerCase().includes(term) ||
      (property.renter && property.renter.toLowerCase().includes(term))
    )

    setProperties(filteredProperties)
  }

  const filterPropertiesByAccessLevel = (properties: Property[], accessLevel: AccessLevel): Property[] => {
    switch (accessLevel) {
      case 'Group Director':
        return properties;
      case 'Company Director':
        return properties.filter(p => p.company === 'Ekadi Trisakti Mas');
      case 'Estate Manager':
        return properties.filter(p => p.cluster === 'Permata Riverview');
      case 'Administrator':
        return [];
      default:
        return properties;
    }
  }

  const filteredProperties = filterPropertiesByAccessLevel(properties, accessLevel)

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Properties</h1>
        
        <div className="mb-4 flex items-center space-x-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
            <Input
              type="text"
              placeholder="Search properties..."
              value={searchTerm}
              onChange={handleSearch}
              className="pl-10 w-full"
            />
          </div>
          <Select value={accessLevel} onValueChange={(value: AccessLevel) => setAccessLevel(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue  placeholder="Select access level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Group Director">Group Director</SelectItem>
              <SelectItem value="Company Director">Company Director</SelectItem>
              <SelectItem value="Estate Manager">Estate Manager</SelectItem>
              <SelectItem value="Administrator">Administrator</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Property ID</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead>Renter</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Block Number</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Cluster</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Group</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProperties.map((property) => (
              <TableRow key={property.id}>
                <TableCell>{property.id}</TableCell>
                <TableCell>{property.owner}</TableCell>
                <TableCell>{property.renter || 'None'}</TableCell>
                <TableCell>{property.location}</TableCell>
                <TableCell>{property.blockNumber}</TableCell>
                <TableCell>{property.status}</TableCell>
                <TableCell>{property.cluster}</TableCell>
                <TableCell>{property.company}</TableCell>
                <TableCell>{property.group}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {filteredProperties.length === 0 && (
          <div className="text-center mt-4">
            <p>No properties found matching your search or access level.</p>
          </div>
        )}
      </main>
    </div>
  )
}