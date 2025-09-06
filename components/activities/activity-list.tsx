"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Edit, Trash2, Eye, Upload, FileText, Calendar, Award, Plus, Search, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const activities = [
  {
    id: 1,
    title: "AI Ethics Research Paper",
    category: "Academic",
    status: "approved",
    startDate: "2024-01-01",
    endDate: "2024-01-15",
    hoursSpent: 40,
    creditsEarned: 8.5,
    description: "Comprehensive research on ethical implications of AI in healthcare systems.",
    documents: 3,
    feedback: "Excellent work on analyzing the ethical frameworks.",
  },
  {
    id: 2,
    title: "Student Council Leadership",
    category: "Leadership",
    status: "approved",
    startDate: "2023-09-01",
    endDate: "2024-05-31",
    hoursSpent: 120,
    creditsEarned: 6.0,
    description: "Served as Student Council President, organizing events and representing student interests.",
    documents: 2,
    feedback: "Strong leadership demonstrated throughout the term.",
  },
  {
    id: 3,
    title: "Hackathon Participation",
    category: "Technical",
    status: "submitted",
    startDate: "2024-01-08",
    endDate: "2024-01-10",
    hoursSpent: 48,
    creditsEarned: 0,
    description: "48-hour coding competition focusing on sustainable technology solutions.",
    documents: 2,
    feedback: null,
  },
  {
    id: 4,
    title: "Community Volunteer Work",
    category: "Volunteer",
    status: "draft",
    startDate: "2024-01-05",
    endDate: "2024-01-20",
    hoursSpent: 30,
    creditsEarned: 0,
    description: "Teaching coding to underprivileged children at local community center.",
    documents: 1,
    feedback: null,
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "approved":
      return "bg-green-100 text-green-800"
    case "submitted":
      return "bg-yellow-100 text-yellow-800"
    case "rejected":
      return "bg-red-100 text-red-800"
    case "draft":
      return "bg-gray-100 text-gray-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

interface ActivityListProps {
  isCreateDialogOpen: boolean;
  setIsCreateDialogOpen: (open: boolean) => void;
}

export function ActivityList({ isCreateDialogOpen, setIsCreateDialogOpen }: ActivityListProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedActivity, setSelectedActivity] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    credits: 0
  })

  const handleSubmit = async (isDraft = false) => {
    setLoading(true)
    try {
      const currentUser = localStorage.getItem('currentUser')
      if (!currentUser) {
        alert('Please log in to submit activities')
        return
      }

      const user = JSON.parse(currentUser)
      
      const response = await fetch('/api/activities', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          student_id: user.id,
          status: isDraft ? 'draft' : 'submitted'
        }),
      })

      if (response.ok) {
        alert('Activity created successfully!')
        setIsCreateDialogOpen(false)
        setFormData({ title: '', description: '', category: '', credits: 0 })
        // Refresh the page to show new activity
        window.location.reload()
      } else {
        const error = await response.json()
        alert(error.message || 'Failed to create activity')
      }
    } catch (error) {
      console.error('Submit error:', error)
      alert('An error occurred while submitting')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Search and Actions */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Activities</CardTitle>
              <CardDescription>Manage your academic and extracurricular activities</CardDescription>
            </div>
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <Button className="gap-2" onClick={() => setIsCreateDialogOpen(true)}>
                <Plus className="h-4 w-4" />
                New Activity
              </Button>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Create New Activity</DialogTitle>
                  <DialogDescription>Add a new activity to your portfolio</DialogDescription>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Activity Title</Label>
                      <Input 
                        id="title" 
                        placeholder="Enter activity title" 
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="academic">Academic</SelectItem>
                          <SelectItem value="extracurricular">Extracurricular</SelectItem>
                          <SelectItem value="professional">Professional</SelectItem>
                          <SelectItem value="volunteer">Volunteer</SelectItem>
                          <SelectItem value="sports">Sports</SelectItem>
                          <SelectItem value="leadership">Leadership</SelectItem>
                          <SelectItem value="creative">Creative</SelectItem>
                          <SelectItem value="technical">Technical</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea 
                      id="description" 
                      placeholder="Describe your activity in detail" 
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="credits">Expected Credits</Label>
                      <Input 
                        id="credits" 
                        type="number" 
                        placeholder="0" 
                        value={formData.credits}
                        onChange={(e) => setFormData({ ...formData, credits: parseInt(e.target.value) || 0 })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="end-date">End Date</Label>
                      <Input id="end-date" type="date" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="hours">Hours Spent</Label>
                    <Input id="hours" type="number" placeholder="Enter total hours" />
                  </div>

                  <div className="space-y-2">
                    <Label>Documents</Label>
                    <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                      <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">Drag and drop files here, or click to browse</p>
                      <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                        Choose Files
                      </Button>
                    </div>
                  </div>
                </div>

                <DialogFooter>
                  <Button 
                    variant="outline" 
                    onClick={() => handleSubmit(true)} 
                    className="bg-transparent"
                    disabled={loading || !formData.title || !formData.description || !formData.category}
                  >
                    {loading ? "Saving..." : "Save as Draft"}
                  </Button>
                  <Button 
                    onClick={() => handleSubmit(false)}
                    disabled={loading || !formData.title || !formData.description || !formData.category}
                  >
                    {loading ? "Submitting..." : "Submit for Approval"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="flex items-center gap-4 mt-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search activities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Activity Cards */}
      <div className="grid gap-6">
        {activities.map((activity) => (
          <Card key={activity.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-semibold">{activity.title}</h3>
                    <Badge className={getStatusColor(activity.status)}>{activity.status}</Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Award className="h-4 w-4" />
                      {activity.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {activity.startDate} - {activity.endDate}
                    </span>
                    <span className="flex items-center gap-1">
                      <FileText className="h-4 w-4" />
                      {activity.documents} documents
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="text-right">
                    <div className="text-lg font-semibold text-primary">
                      {activity.creditsEarned > 0 ? activity.creditsEarned : "—"}
                    </div>
                    <div className="text-xs text-muted-foreground">credits</div>
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setSelectedActivity(activity)}>
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <p className="text-muted-foreground mb-4">{activity.description}</p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm">
                  <span>
                    <strong>{activity.hoursSpent}</strong> hours spent
                  </span>
                  {activity.feedback && (
                    <span className="text-green-600">
                      <strong>Feedback:</strong> {activity.feedback}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {activity.status === "draft" && (
                    <Button size="sm" variant="outline" className="bg-transparent">
                      Submit for Approval
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setSelectedActivity(activity)}
                    className="gap-2 bg-transparent"
                  >
                    <Eye className="h-4 w-4" />
                    View
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Activity Detail Dialog */}
      <Dialog open={!!selectedActivity} onOpenChange={() => setSelectedActivity(null)}>
        <DialogContent className="max-w-3xl">
          {selectedActivity && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedActivity.title}</DialogTitle>
                <DialogDescription>
                  {selectedActivity.category} • {selectedActivity.startDate} - {selectedActivity.endDate}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                <div>
                  <h4 className="font-medium mb-2">Description</h4>
                  <p className="text-muted-foreground">{selectedActivity.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-2">Activity Details</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Hours Spent:</span>
                        <span>{selectedActivity.hoursSpent}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Credits Earned:</span>
                        <span>{selectedActivity.creditsEarned || "Pending"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Status:</span>
                        <Badge className={getStatusColor(selectedActivity.status)}>{selectedActivity.status}</Badge>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Documents</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <FileText className="h-4 w-4" />
                        <span>Activity Report.pdf</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <FileText className="h-4 w-4" />
                        <span>Certificate.jpg</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <FileText className="h-4 w-4" />
                        <span>Reflection Essay.docx</span>
                      </div>
                    </div>
                  </div>
                </div>

                {selectedActivity.feedback && (
                  <div>
                    <h4 className="font-medium mb-2">Faculty Feedback</h4>
                    <p className="text-sm text-muted-foreground bg-muted p-3 rounded-lg">{selectedActivity.feedback}</p>
                  </div>
                )}
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setSelectedActivity(null)} className="bg-transparent">
                  Close
                </Button>
                {selectedActivity.status === "draft" && <Button>Submit for Approval</Button>}
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
