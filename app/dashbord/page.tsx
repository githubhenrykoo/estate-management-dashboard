"use client"

import { useState } from 'react'
import Link from 'next/link'
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import { ModeToggle } from "@/components/mode-toggle"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserApprovalDashboard } from "@/components/user-approval-dashboard"
import { FeeAssignmentDashboard } from "@/components/fee-assignment-dashboard"
import { ComplaintsDashboard } from "@/components/complaints-dashboard"
import { NewsDashboard } from "@/components/news-dashboard"
import { Button } from "@/components/ui/button"
import { SidebarChat } from "@/components/sidebar-chat"

interface User {
  id: number;
  name: string;
}

export default function DashboardPage() {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [chatUser, setChatUser] = useState<User | null>(null)

  const handleChatClose = () => {
    setIsChatOpen(false)
    setChatUser(null)
  }

  return (
    <div className="hidden flex-col md:flex">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <MainNav className="mx-6" />
          <div className="ml-auto flex items-center space-x-4">
            <ModeToggle />
            <UserNav />
          </div>
        </div>
      </div>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <Link href="/users">
            <Button>Manage Users</Button>
          </Link>
        </div>
        <Tabs defaultValue="user-approval" className="space-y-4">
          <TabsList>
            <TabsTrigger value="user-approval">User Approval</TabsTrigger>
            <TabsTrigger value="fee-assignment">Fee Assignment</TabsTrigger>
            <TabsTrigger value="complaints">Complaints</TabsTrigger>
            <TabsTrigger value="news">News</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>
          <TabsContent value="user-approval" className="space-y-4">
            <UserApprovalDashboard />
          </TabsContent>
          <TabsContent value="fee-assignment" className="space-y-4">
            <FeeAssignmentDashboard />
          </TabsContent>
          <TabsContent value="complaints" className="space-y-4">
            <ComplaintsDashboard />
          </TabsContent>
          <TabsContent value="news" className="space-y-4">
            <NewsDashboard />
          </TabsContent>
        </Tabs>
      </div>
      <SidebarChat 
        isOpen={isChatOpen} 
        onClose={handleChatClose} 
        user={chatUser}
      />
    </div>
  )
}