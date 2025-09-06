"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle, XCircle, Eye, FileText, Search, Filter } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface CgpaUpdate {
  _id: string
  student: {
    _id: string
    first_name: string
    last_name: string
    email: string
    department: string
  }
  currentCgpa: number
  newCgpa: number
  semester: string
  status: string
  documents: string[]
  createdAt: string
  studentDepartment: string
}

export default function ApprovalQueue() {
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("pending")
  const [updates, setUpdates] = useState<CgpaUpdate[]>([])
  const [feedback, setFeedback] = useState("")
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    fetchUpdates()
  }, [statusFilter])

  const fetchUpdates = async () => {
    try {
      setIsLoading(true)
      // Get current faculty's department from localStorage
      const userStr = localStorage.getItem('currentUser')
      const user = userStr ? JSON.parse(userStr) : null
      const department = user?.department

      const response = await fetch(`/api/faculty/cgpa-updates?department=${department || ''}`)
      const data = await response.json()
      
      if (Array.isArray(data)) {
        setUpdates(data)
      }
    } catch (error) {
      console.error("Error fetching CGPA updates:", error)
      toast({
        title: "Error",
        description: "Failed to fetch CGPA update requests",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleAction = async (updateId: string, action: 'approved' | 'rejected') => {
    try {
      // Get current faculty's ID from localStorage
      const userStr = localStorage.getItem('currentUser')
      const faculty = userStr ? JSON.parse(userStr) : null

      if (!faculty?._id) {
        toast({
          title: "Error",
          description: "Faculty information not found. Please log in again.",
          variant: "destructive",
        })
        return
      }

      console.log('Sending update request:', {
        updateId,
        action,
        feedback,
        faculty: faculty._id,
      })

      const response = await fetch('/api/faculty/cgpa-updates', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          updateId,
          action,
          feedback,
          faculty: faculty._id,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to process request')
      }

      toast({
        title: "Success",
        description: `CGPA update request ${action} successfully`,
      })

      // Clear feedback
      setFeedback("")
      
      // Remove from selected items if it was part of a bulk action
      setSelectedItems(prev => prev.filter(id => id !== updateId))

      // Refresh the list
      fetchUpdates()
      
    } catch (error: any) {
      console.error('Error in handleAction:', error)
      toast({
        title: "Error",
        description: error.message || "Failed to process request. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleSelectAll = () => {
    if (selectedItems.length === updates.length) {
      setSelectedItems([])
    } else {
      setSelectedItems(updates.map((update) => update._id))
    }
  }

  const handleSelectItem = (id: string) => {
    setSelectedItems((prev) => 
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  const filteredUpdates = updates.filter((update) => {
    const searchContent = `${update.student.first_name} ${update.student.last_name} ${update.semester}`.toLowerCase()
    return (
      searchContent.includes(searchTerm.toLowerCase()) &&
      (statusFilter === 'all' || update.status === statusFilter)
    )
  })

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>CGPA Update Requests</CardTitle>
            <CardDescription>Review and approve student CGPA updates</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            {selectedItems.length > 0 && (
              <>
                <Button 
                  size="sm" 
                  className="gap-2"
                  onClick={() => {
                    selectedItems.forEach(id => handleAction(id, 'approved'))
                  }}
                >
                  <CheckCircle className="h-4 w-4" />
                  Approve ({selectedItems.length})
                </Button>
                <Button 
                  size="sm" 
                  variant="destructive" 
                  className="gap-2"
                  onClick={() => {
                    selectedItems.forEach(id => handleAction(id, 'rejected'))
                  }}
                >
                  <XCircle className="h-4 w-4" />
                  Reject ({selectedItems.length})
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Filters and Search */}
        <div className="flex items-center gap-4 mt-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by student name or semester..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-48">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Requests</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {/* Select All Header */}
          <div className="flex items-center gap-3 pb-2 border-b">
            <Checkbox 
              checked={selectedItems.length === updates.length && updates.length > 0} 
              onCheckedChange={handleSelectAll} 
            />
            <span className="text-sm font-medium">Select All</span>
          </div>

          {/* Updates List */}
          {isLoading ? (
            <div className="text-center py-8">Loading updates...</div>
          ) : filteredUpdates.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No CGPA update requests found
            </div>
          ) : (
            filteredUpdates.map((update) => (
              <div key={update._id} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/50">
                <Checkbox
                  checked={selectedItems.includes(update._id)}
                  onCheckedChange={() => handleSelectItem(update._id)}
                />

                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">{update.student.first_name} {update.student.last_name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {update.student.email} • {update.studentDepartment}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant={
                          update.status === 'approved' ? 'default' :
                          update.status === 'rejected' ? 'destructive' : 
                          'secondary'
                        }
                      >
                        {update.status}
                      </Badge>
                      <span className="text-sm font-medium">
                        Current: {update.currentCgpa} → New: {update.newCgpa}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>Semester: {update.semester}</span>
                      <span>Submitted: {new Date(update.createdAt).toLocaleDateString()}</span>
                      {update.documents && (
                        <span className="flex items-center gap-1">
                          <FileText className="h-3 w-3" />
                          {update.documents.length} documents
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            size="sm"
                            variant="outline"
                            className="gap-2 bg-transparent"
                          >
                            <Eye className="h-4 w-4" />
                            Review
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Review CGPA Update Request</DialogTitle>
                            <DialogDescription>
                              Submitted by {update.student.first_name} {update.student.last_name}
                            </DialogDescription>
                          </DialogHeader>

                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <span className="text-sm font-medium">Current CGPA:</span>
                                <p className="text-sm text-muted-foreground">{update.currentCgpa}</p>
                              </div>
                              <div>
                                <span className="text-sm font-medium">New CGPA:</span>
                                <p className="text-sm text-muted-foreground">{update.newCgpa}</p>
                              </div>
                              <div>
                                <span className="text-sm font-medium">Semester:</span>
                                <p className="text-sm text-muted-foreground">{update.semester}</p>
                              </div>
                              <div>
                                <span className="text-sm font-medium">Department:</span>
                                <p className="text-sm text-muted-foreground">{update.studentDepartment}</p>
                              </div>
                            </div>

                            <div>
                              <h4 className="font-medium mb-2">Feedback (Optional)</h4>
                              <Textarea 
                                placeholder="Provide feedback to the student..."
                                value={feedback}
                                onChange={(e) => setFeedback(e.target.value)}
                              />
                            </div>
                          </div>

                          <DialogFooter>
                            <Button 
                              variant="destructive"
                              onClick={() => handleAction(update._id, 'rejected')}
                            >
                              Reject
                            </Button>
                            <Button
                              onClick={() => handleAction(update._id, 'approved')}
                            >
                              Approve
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>

                      {update.status === 'pending' && (
                        <Button 
                          size="sm" 
                          className="gap-2"
                          onClick={() => handleAction(update._id, 'approved')}
                        >
                          <CheckCircle className="h-4 w-4" />
                          Approve
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}
