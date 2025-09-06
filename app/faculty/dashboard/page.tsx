"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { FacultyHeader } from "@/components/faculty/faculty-header"
import { FacultyStats } from "@/components/faculty/faculty-stats"
import { ApprovalQueue } from "@/components/faculty/approval-queue"
import { RecentApprovals } from "@/components/faculty/recent-approvals"

interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  faculty_id?: string;
  department: string;
}

export default function FacultyDashboard() {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Get current user from localStorage
    const userData = localStorage.getItem('currentUser')
    if (userData) {
      try {
        const user = JSON.parse(userData)
        if (user.role !== 'faculty') {
          router.push('/dashboard') // Redirect non-faculty users
          return
        }
        setCurrentUser(user)
      } catch (err) {
        console.error('Failed to parse user data:', err)
        router.push('/login')
      }
    } else {
      router.push('/login')
    }
    setLoading(false)
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading faculty dashboard...</p>
        </div>
      </div>
    )
  }

  if (!currentUser) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <FacultyHeader user={currentUser} />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Welcome Section */}
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Welcome, Prof. {currentUser.last_name}!
            </h1>
            <p className="text-muted-foreground mt-2">
              Manage student approvals and activities
              <span className="ml-2 text-sm">
                Department: {currentUser.department}
              </span>
            </p>
          </div>

          {/* Faculty Stats Overview */}
          <FacultyStats facultyId={currentUser.id} />

          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-8">
              <ApprovalQueue facultyId={currentUser.id} department={currentUser.department} />
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-8">
              <RecentApprovals facultyId={currentUser.id} />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
