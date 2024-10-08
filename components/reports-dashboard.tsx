"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/components/ui/use-toast"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

// Define types
type ReportType = 'payment' | 'complaint' | 'news';

export function ReportsDashboard() {
  const { addToast } = useToast()  // Corrected from `toast` to `addToast`
  
  const [paymentData, setPaymentData] = useState([
    { month: 'Jan', paid: 5000, unpaid: 1000 },
    { month: 'Feb', paid: 6000, unpaid: 800 },
    { month: 'Mar', paid: 5500, unpaid: 1200 },
  ])
  
  const [complaintData, setComplaintData] = useState([
    { category: 'Maintenance', count: 10 },
    { category: 'Noise', count: 5 },
    { category: 'Security', count: 3 },
  ])

  // Specify type for the `type` parameter
  const generateReport = (type: ReportType) => {
    addToast({  // Use addToast instead of toast
      title: "Report generated",
      description: `The ${type} report has been generated.`,
    })
  }

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Payment Status Report</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={paymentData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="paid" fill="#8884d8" />
            <Bar dataKey="unpaid" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
        <Button onClick={() => generateReport('payment')} className="mt-4">Generate Payment Report</Button>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-4">Complaint Report</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Category</TableHead>
              <TableHead>Count</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {complaintData.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.category}</TableCell>
                <TableCell>{item.count}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Button onClick={() => generateReport('complaint')} className="mt-4">Generate Complaint Report</Button>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-4">News Posting Report</h3>
        <Button onClick={() => generateReport('news')}>Generate News Report</Button>
      </div>
    </div>
  )
}
