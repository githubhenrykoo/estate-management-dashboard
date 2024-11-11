import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface AccessLevel {
  role: string;
  view: string;
  edit: string;
  approve: string;
  other: string;
}

const accessLevels: AccessLevel[] = [
  { role: 'Group Director', view: 'All', edit: 'All', approve: 'All', other: '-' },
  { role: 'Company Director', view: 'Company', edit: 'Company', approve: 'Company', other: '-' },
  { role: 'Estate Manager', view: 'Estate', edit: 'Estate', approve: 'Complaints', other: '-' },
  { role: 'Administrator', view: 'All', edit: 'All', approve: 'All', other: '-' },
  { role: 'Owner', view: 'Own', edit: 'Own', approve: '-', other: 'Submit Complaints' },
  { role: 'Renter', view: 'Own', edit: 'Own', approve: '-', other: 'Submit Complaints' },
]

export function AccessLevelTable() {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Role</TableHead>
            <TableHead>View</TableHead>
            <TableHead>Edit</TableHead>
            <TableHead>Approve</TableHead>
            <TableHead>Other</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {accessLevels.map((level) => (
            <TableRow key={level.role}>
              <TableCell>{level.role}</TableCell>
              <TableCell>{level.view}</TableCell>
              <TableCell>{level.edit}</TableCell>
              <TableCell>{level.approve}</TableCell>
              <TableCell>{level.other}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}