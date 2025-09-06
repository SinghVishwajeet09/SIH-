"use client"

import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Download, Award, Calendar, FileText, TrendingUp } from "lucide-react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

interface User {
  id: number
  email: string
  first_name: string
  last_name: string
  role: string
  student_id?: string
  department?: string
}

interface Portfolio {
  user: {
    name: string
    email: string
    studentId: string
    department: string
  }
  stats: {
    totalCredits: number
    totalActivities: number
    approvedActivities: number
    completionRate: number
  }
  activities: { [key: string]: any[] }
  generatedAt: string
}

export default function PortfolioPage() {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Get current user from localStorage
    const userData = localStorage.getItem('currentUser')
    if (userData) {
      try {
        const user = JSON.parse(userData)
        setCurrentUser(user)
        fetchPortfolio(user.id)
      } catch (err) {
        console.error('Failed to parse user data:', err)
        router.push('/login')
      }
    } else {
      router.push('/login')
    }
  }, [router])

  const fetchPortfolio = async (userId: number) => {
    try {
      const response = await fetch(`/api/portfolio?userId=${userId}`)
      if (response.ok) {
        const data = await response.json()
        setPortfolio(data)
      }
    } catch (error) {
      console.error('Failed to fetch portfolio:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = async () => {
    if (!currentUser) return
    
    try {
      const response = await fetch('/api/portfolio/download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: currentUser.id }),
      })

      if (response.ok) {
        const data = await response.json()
        const newWindow = window.open('', '_blank')
        if (newWindow) {
          newWindow.document.write(data.previewHtml)
          newWindow.document.close()
          setTimeout(() => newWindow.print(), 1000)
        }
      }
    } catch (error) {
      console.error('Download error:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading portfolio...</p>
        </div>
      </div>
    )
  }

  if (!currentUser || !portfolio) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">My Portfolio</h1>
            <p className="text-muted-foreground mt-2">
              Comprehensive overview of your academic and extracurricular achievements
            </p>
          </div>
          <Button onClick={handleDownload} className="gap-2">
            <Download className="h-4 w-4" />
            Download PDF
          </Button>
        </div>

        {/* User Info Card */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              Student Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p><strong>Name:</strong> {portfolio.user.name}</p>
                <p><strong>Student ID:</strong> {portfolio.user.studentId || 'N/A'}</p>
              </div>
              <div>
                <p><strong>Department:</strong> {portfolio.user.department || 'N/A'}</p>
                <p><strong>Email:</strong> {portfolio.user.email}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <TrendingUp className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Total Credits</p>
                  <p className="text-2xl font-bold">{portfolio.stats.totalCredits}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <FileText className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Total Activities</p>
                  <p className="text-2xl font-bold">{portfolio.stats.totalActivities}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Award className="h-8 w-8 text-yellow-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Approved</p>
                  <p className="text-2xl font-bold">{portfolio.stats.approvedActivities}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <TrendingUp className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Success Rate</p>
                  <p className="text-2xl font-bold">{portfolio.stats.completionRate}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Activities by Category */}
        <div className="space-y-6">
          {Object.entries(portfolio.activities).map(([category, activities]) => (
            <Card key={category}>
              <CardHeader>
                <CardTitle className="capitalize">{category} Activities</CardTitle>
                <CardDescription>{activities.length} activities in this category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activities.map((activity: any) => (
                    <div key={activity.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium">{activity.title}</h4>
                        <p className="text-sm text-muted-foreground mt-1">{activity.description}</p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {new Date(activity.created_at).toLocaleDateString()}
                          </span>
                          <span>{activity.credits} credits</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={activity.status === 'approved' ? 'default' : 'secondary'}>
                          {activity.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {Object.keys(portfolio.activities).length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No Activities Yet</h3>
              <p className="text-muted-foreground mb-4">
                Start adding activities to build your portfolio!
              </p>
              <Button onClick={() => router.push('/activities')}>
                Add Your First Activity
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-muted-foreground">
          Portfolio generated on {new Date(portfolio.generatedAt).toLocaleDateString()}
        </div>
      </main>
    </div>
  )
}
