"use client"

import { useState } from 'react'
import { Header } from "@/components/header"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Mock data - replace with actual data fetching in a real application
const properties = [
  { id: 'PROP001', address: '123 Main St', owner: 'John Doe', group: 'Group A', company: 'Company X' },
  { id: 'PROP002', address: '456 Elm St', owner: 'Jane Smith', group: 'Group B', company: 'Company Y' },
  { id: 'PROP003', address: '789 Oak St', owner: 'Bob Johnson', group: 'Group A', company: 'Company X' },
]

const payments = [
  { propertyId: 'PROP001', month: 'January', amountDue: 1000, amountPaid: 1000, datePaid: '2023-01-15' },
  { propertyId: 'PROP001', month: 'February', amountDue: 1000, amountPaid: 950, datePaid: '2023-02-18' },
  { propertyId: 'PROP002', month: 'January', amountDue: 1200, amountPaid: 1200, datePaid: '2023-01-10' },
  { propertyId: 'PROP002', month: 'February', amountDue: 1200, amountPaid: 1200, datePaid: '2023-02-12' },
  { propertyId: 'PROP003', month: 'January', amountDue: 900, amountPaid: 900, datePaid: '2023-01-20' },
  { propertyId: 'PROP003', month: 'February', amountDue: 900, amountPaid: 800, datePaid: '2023-02-25' },
]

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

function MonthlyReport({ month }: { month: string }) {
  const monthlyData = payments.filter(payment => payment.month === month)
  const totalDue = monthlyData.reduce((sum, payment) => sum + payment.amountDue, 0)
  const totalPaid = monthlyData.reduce((sum, payment) => sum + payment.amountPaid, 0)
  const collectionPercentage = (totalPaid / totalDue) * 100

  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Report - {month}</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Property ID</TableHead>
              <TableHead>Property Address</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead>Amount Due</TableHead>
              <TableHead>Amount Paid</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {monthlyData.map((payment, index) => {
              const property = properties.find(p => p.id === payment.propertyId)
              return (
                <TableRow key={index}>
                  <TableCell>{property?.id}</TableCell>
                  <TableCell>{property?.address}</TableCell>
                  <TableCell>{property?.owner}</TableCell>
                  <TableCell>${payment.amountDue}</TableCell>
                  <TableCell>${payment.amountPaid}</TableCell>
                </TableRow>
              )
            })}
            <TableRow>
              <TableCell colSpan={3}>Totals</TableCell>
              <TableCell>${totalDue}</TableCell>
              <TableCell>${totalPaid}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <p className="mt-4">Collection Percentage: {collectionPercentage.toFixed(2)}%</p>
      </CardContent>
    </Card>
  )
}

function IndividualReport({ propertyId }: { propertyId: string }) {
  const propertyPayments = payments.filter(payment => payment.propertyId === propertyId)
  const property = properties.find(p => p.id === propertyId)
  const totalDue = propertyPayments.reduce((sum, payment) => sum + payment.amountDue, 0)
  const totalPaid = propertyPayments.reduce((sum, payment) => sum + payment.amountPaid, 0)
  const averagePercentagePaid = (totalPaid / totalDue) * 100

  return (
    <Card>
      <CardHeader>
        <CardTitle>Individual Report - {property?.address}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Property Details</h3>
          <p>ID: {property?.id}</p>
          <p>Address: {property?.address}</p>
          <p>Owner: {property?.owner}</p>
          <p>Group: {property?.group}</p>
          <p>Company: {property?.company}</p>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Month</TableHead>
              <TableHead>Amount Due</TableHead>
              <TableHead>Amount Paid</TableHead>
              <TableHead>Date Paid</TableHead>
              <TableHead>% Paid</TableHead>
              <TableHead>Date Paid vs. Due</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {propertyPayments.map((payment, index) => {
              const percentagePaid = (payment.amountPaid / payment.amountDue) * 100
              const dueDate = new Date(payment.datePaid)
              dueDate.setDate(1) // Assuming due date is the 1st of each month
              const datePaidVsDue = (new Date(payment.datePaid).getTime() - dueDate.getTime()) / (1000 * 3600 * 24)
              return (
                <TableRow key={index}>
                  <TableCell>{payment.month}</TableCell>
                  <TableCell>${payment.amountDue}</TableCell>
                  <TableCell>${payment.amountPaid}</TableCell>
                  <TableCell>{payment.datePaid}</TableCell>
                  <TableCell>{percentagePaid.toFixed(2)}% ({percentagePaid === 100 ? 'Full' : 'Partial'})</TableCell>
                  <TableCell>{datePaidVsDue} days</TableCell>
                </TableRow>
              )
            })}
            <TableRow>
              <TableCell>Totals & Averages</TableCell>
              <TableCell>${totalDue}</TableCell>
              <TableCell>${totalPaid}</TableCell>
              <TableCell>-</TableCell>
              <TableCell>{averagePercentagePaid.toFixed(2)}%</TableCell>
              <TableCell>-</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

function ConsolidatedReport({ level }: { level: 'company' | 'group' }) {
  const consolidatedData = properties.reduce((acc, property) => {
    const key = property[level]
    if (!acc[key]) {
      acc[key] = { totalDue: 0, totalPaid: 0, properties: [] }
    }
    const propertyPayments = payments.filter(payment => payment.propertyId === property.id)
    const propertyTotalDue = propertyPayments.reduce((sum, payment) => sum + payment.amountDue, 0)
    const propertyTotalPaid = propertyPayments.reduce((sum, payment) => sum + payment.amountPaid, 0)
    acc[key].totalDue += propertyTotalDue
    acc[key].totalPaid += propertyTotalPaid
    acc[key].properties.push(property)
    return acc
  }, {} as Record<string, { totalDue: number, totalPaid: number, properties: typeof properties }>)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Consolidated {level.charAt(0).toUpperCase() + level.slice(1)} Report</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{level.charAt(0).toUpperCase() + level.slice(1)}</TableHead>
              <TableHead>Number of Properties</TableHead>
              <TableHead>Total Due</TableHead>
              <TableHead>Total Paid</TableHead>
              <TableHead>Collection Percentage</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Object.entries(consolidatedData).map(([key, data], index) => {
              const collectionPercentage = (data.totalPaid / data.totalDue) * 100
              return (
                <TableRow key={index}>
                  <TableCell>{key}</TableCell>
                  <TableCell>{data.properties.length}</TableCell>
                  <TableCell>${data.totalDue}</TableCell>
                  <TableCell>${data.totalPaid}</TableCell>
                  <TableCell>{collectionPercentage.toFixed(2)}%</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

function OverallReport() {
  const totalDue = payments.reduce((sum, payment) => sum + payment.amountDue, 0)
  const totalPaid = payments.reduce((sum, payment) => sum + payment.amountPaid, 0)
  const collectionPercentage = (totalPaid / totalDue) * 100

  return (
    <Card>
      <CardHeader>
        <CardTitle>Overall Report</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Property ID</TableHead>
              <TableHead>Property Address</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead>Amount Due</TableHead>
              <TableHead>Amount Paid</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {properties.map((property, index) => {
              const propertyPayments = payments.filter(payment => payment.propertyId === property.id)
              const propertyTotalDue = propertyPayments.reduce((sum, payment) => sum + payment.amountDue, 0)
              const propertyTotalPaid = propertyPayments.reduce((sum, payment) => sum + payment.amountPaid, 0)
              return (
                <TableRow key={index}>
                  <TableCell>{property.id}</TableCell>
                  <TableCell>{property.address}</TableCell>
                  <TableCell>{property.owner}</TableCell>
                  <TableCell>${propertyTotalDue}</TableCell>
                  <TableCell>${propertyTotalPaid}</TableCell>
                </TableRow>
              )
            })}
            <TableRow>
              <TableCell colSpan={3}>Totals</TableCell>
              <TableCell>${totalDue}</TableCell>
              <TableCell>${totalPaid}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <p className="mt-4">Overall Collection Percentage: {collectionPercentage.toFixed(2)}%</p>
      </CardContent>
    </Card>
  )
}

export default function ReportsPage() {
  const [selectedMonth, setSelectedMonth] = useState(months[0])
  const [selectedProperty, setSelectedProperty] = useState(properties[0].id)
  const [consolidationLevel, setConsolidationLevel] = useState<'company' | 'group'>('company')

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Reports</h1>

        <Tabs defaultValue="monthly" className="space-y-4">
          <TabsList>
            <TabsTrigger value="monthly">Monthly Report</TabsTrigger>
            <TabsTrigger value="individual">Individual Report</TabsTrigger>
            <TabsTrigger value="consolidated">Consolidated Report</TabsTrigger>
            <TabsTrigger value="overall">Overall Report</TabsTrigger>
          </TabsList>

          <TabsContent value="monthly">
            <div className="mb-4">
              <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select month" />
                </SelectTrigger>
                <SelectContent>
                  {months.map((month) => (
                    <SelectItem key={month} value={month}>{month}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <MonthlyReport month={selectedMonth} />
          </TabsContent>

          <TabsContent value="individual">
            <div className="mb-4">
              <Select value={selectedProperty} onValueChange={setSelectedProperty}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select property" />
                </SelectTrigger>
                <SelectContent>
                  {properties.map((property) => (
                    <SelectItem key={property.id} value={property.id}>{property.address}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <IndividualReport propertyId={selectedProperty} />
          </TabsContent>

          <TabsContent value="consolidated">
            <div className="mb-4">
              <Select value={consolidationLevel} onValueChange={(value: 'company' | 'group') => setConsolidationLevel(value)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select consolidation level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="company">Company</SelectItem>
                  <SelectItem value="group">Group</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <ConsolidatedReport level={consolidationLevel} />
          </TabsContent>

          <TabsContent value="overall">
            <OverallReport />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}