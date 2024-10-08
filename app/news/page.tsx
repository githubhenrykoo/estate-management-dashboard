"use client"

import { useState } from 'react'
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, Edit, Globe, Building, Home } from 'lucide-react'

interface NewsItem {
  id: string;
  title: string;
  category: string;
  details: string;
  date: string;
  broadcastLevel: string;
}

const initialNews: NewsItem[] = [
  {
    id: '1',
    title: 'Annual General Meeting',
    category: 'Event',
    details: 'The Annual General Meeting will be held on July 15th at 2 PM in the main conference room.',
    date: '2023-06-01',
    broadcastLevel: 'Group Level',
  },
  {
    id: '2',
    title: 'New Property Management System',
    category: 'Update',
    details: 'We are upgrading our property management system. Training sessions will be held next week.',
    date: '2023-06-05',
    broadcastLevel: 'Company Level',
  },
  {
    id: '3',
    title: 'Community Cleanup Day',
    category: 'Event',
    details: 'Join us for our monthly community cleanup day this Saturday at 9 AM.',
    date: '2023-06-10',
    broadcastLevel: 'Cluster Level',
  },
  {
    id: '4',
    title: 'Holiday Schedule',
    category: 'Announcement',
    details: 'Please note the upcoming holiday schedule for the month of July.',
    date: '2023-06-15',
    broadcastLevel: 'Group Level',
  },
  {
    id: '5',
    title: 'Maintenance Notice',
    category: 'Update',
    details: 'Routine maintenance will be carried out in Building A next Tuesday.',
    date: '2023-06-20',
    broadcastLevel: 'Cluster Level',
  },
  {
    id: '6',
    title: 'New Staff Introduction',
    category: 'Announcement',
    details: 'We are pleased to welcome John Doe as our new Property Manager.',
    date: '2023-06-25',
    broadcastLevel: 'Company Level',
  },
]

export default function NewsPage() {
  const [news, setNews] = useState<NewsItem[]>(initialNews)
  const [searchTerm, setSearchTerm] = useState('')
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null)
  const [activeTab, setActiveTab] = useState<'create' | 'search'>('create')
  const [activeBroadcastLevel, setActiveBroadcastLevel] = useState<string>('all')

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const filteredNews = news.filter(item =>
    (item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.broadcastLevel.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (activeBroadcastLevel === 'all' || item.broadcastLevel === activeBroadcastLevel)
  )

  const handlePostNews = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const newNews: NewsItem = {
      id: Date.now().toString(),
      title: formData.get('title') as string,
      category: formData.get('category') as string,
      details: formData.get('details') as string,
      date: new Date().toISOString().split('T')[0],
      broadcastLevel: formData.get('broadcastLevel') as string,
    }
    setNews([newNews, ...news])
    setActiveTab('search')
  }

  const handleEditNews = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!editingNews) return
    const formData = new FormData(event.currentTarget)
    const updatedNews: NewsItem = {
      ...editingNews,
      title: formData.get('title') as string,
      category: formData.get('category') as string,
      details: formData.get('details') as string,
      broadcastLevel: formData.get('broadcastLevel') as string,
    }
    setNews(news.map(item => item.id === updatedNews.id ? updatedNews : item))
    setEditingNews(null)
  }

  const NewsForm = ({ isEditing = false }: { isEditing?: boolean }) => (
    <form onSubmit={isEditing ? handleEditNews : handlePostNews} className="space-y-4">
      <div>
        <Label htmlFor="title">Title</Label>
        <Input id="title" name="title" required defaultValue={editingNews?.title} />
      </div>
      <div>
        <Label htmlFor="category">Category</Label>
        <Select name="category" defaultValue={editingNews?.category || "Event"}>
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Event">Event</SelectItem>
            <SelectItem value="Announcement">Announcement</SelectItem>
            <SelectItem value="Update">Update</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="details">Details</Label>
        <Textarea id="details" name="details" required defaultValue={editingNews?.details} />
      </div>
      <div>
        <Label htmlFor="broadcastLevel">Broadcast Level</Label>
        <Select name="broadcastLevel" defaultValue={editingNews?.broadcastLevel || "Group Level"}>
          <SelectTrigger>
            <SelectValue placeholder="Select broadcast level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Group Level">Group Level</SelectItem>
            <SelectItem value="Company Level">Company Level</SelectItem>
            <SelectItem value="Cluster Level">Cluster Level</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center text-sm text-yellow-600">
        <AlertCircle className="mr-2 h-4 w-4" />
        <p>If this message is only for a particular owner, it is classified as a private message and will not be posted as news.</p>
      </div>
      <Button type="submit">{isEditing ? 'Update News' : 'Post News'}</Button>
    </form>
  )

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto p-4">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-4">Company News</h1>
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'create' | 'search')} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="create">Create/Post News</TabsTrigger>
              <TabsTrigger value="search">Search Old News</TabsTrigger>
            </TabsList>
            <TabsContent value="create">
              <Card>
                <CardHeader>
                  <CardTitle>Post New News</CardTitle>
                </CardHeader>
                <CardContent>
                  <NewsForm />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="search">
              <div className="space-y-4">
                <Input
                  type="text"
                  placeholder="Search news..."
                  value={searchTerm}
                  onChange={handleSearch}
                />
                <Tabs value={activeBroadcastLevel} onValueChange={setActiveBroadcastLevel}>
                  <TabsList>
                    <TabsTrigger value="all">All News</TabsTrigger>
                    <TabsTrigger value="Group Level">Group Level</TabsTrigger>
                    <TabsTrigger value="Company Level">Company Level</TabsTrigger>
                    <TabsTrigger value="Cluster Level">Cluster Level</TabsTrigger>
                  </TabsList>
                </Tabs>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {filteredNews.map((item) => (
                    <Card key={item.id} className="flex flex-col">
                      <CardHeader>
                        <CardTitle>{item.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="flex-grow">
                        <p className="text-sm text-muted-foreground mb-2">
                          {item.category} | {item.broadcastLevel} | {item.date}
                        </p>
                        <p className="line-clamp-3">{item.details}</p>
                      </CardContent>
                      <CardFooter className="flex justify-between items-center">
                        {item.broadcastLevel === 'Group Level' && <Globe className="h-5 w-5 text-blue-500" />}
                        {item.broadcastLevel === 'Company Level' && <Building className="h-5 w-5 text-green-500" />}
                        {item.broadcastLevel === 'Cluster Level' && <Home className="h-5 w-5 text-orange-500" />}
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" onClick={() => setEditingNews(item)}>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Edit News</DialogTitle>
                            </DialogHeader>
                            <NewsForm isEditing />
                          </DialogContent>
                        </Dialog>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <footer className="bg-muted py-4 mt-8">
        <div className="container mx-auto text-center">
          <p>For support or to report issues with news content, please contact us at support@example.com</p>
        </div>
      </footer>
    </div>
  )
}