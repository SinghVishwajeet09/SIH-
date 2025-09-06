"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { StatsOverview } from "@/components/dashboard/stats-overview"
import { ActivityTimeline } from "@/components/dashboard/activity-timeline"
import { GoalTracker } from "@/components/dashboard/goal-tracker"
import { PortfolioPreview } from "@/components/dashboard/portfolio-preview"
import { RecentActivities } from "@/components/dashboard/recent-activities"
import { PerformanceChart } from "@/components/dashboard/performance-chart"
import { Announcements } from "@/components/dashboard/announcements"
import { UpcomingEvents } from "@/components/dashboard/upcoming-events"
import { QuickActions } from "@/components/dashboard/quick-actions"
import { AchievementBadges } from "@/components/dashboard/achievement-badges"
import { CgpaUpdatesSection } from "@/components/dashboard/cgpa-updates-section"

interface User {
  _id: string // Changed from id: number to _id: string to match MongoDB's ObjectId
  email: string
  first_name: string
  last_name: string
  role: string
  student_id?: string
  department?: string
  cgpa?: number
}

export default function StudentDashboard() {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Get current user from localStorage
    const userData = localStorage.getItem('currentUser')
    if (userData) {
      try {
        const user = JSON.parse(userData)
        setCurrentUser(user)
      } catch (err) {
        console.error('Failed to parse user data:', err)
        router.push('/login')
      }
    } else {
      // No user data, redirect to login
      router.push('/login')
    }
    setLoading(false)
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (!currentUser) {
    return null // Will redirect to login
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Welcome Section */}
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Welcome back, {currentUser.first_name}!
            </h1>
            <p className="text-muted-foreground mt-2">
              Here's your activity overview for this semester.
              {currentUser.student_id && (
                <span className="ml-2 text-sm">
                  Student ID: {currentUser.student_id}
                </span>
              )}
              {currentUser.department && (
                <span className="ml-2 text-sm">
                  Department: {currentUser.department}
                </span>
              )}
            </p>
          </div>

          {/* Stats Overview */}
          <StatsOverview userId={currentUser._id} />

          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-8">
              <PerformanceChart userId={currentUser._id} />
              <ActivityTimeline userId={currentUser._id} />
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-8">
              <QuickActions />
              <CgpaUpdatesSection userId={currentUser._id} currentCgpa={currentUser.cgpa || 0} />
              <GoalTracker userId={currentUser._id} />
              <PortfolioPreview userId={currentUser._id} />
              <AchievementBadges userId={currentUser._id} />
              <Announcements />
              <UpcomingEvents />
              <RecentActivities userId={currentUser._id} />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
