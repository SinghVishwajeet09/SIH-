"use client"

import { AnalyticsHeader } from "@/components/analytics/analytics-header"
import { AnalyticsOverview } from "@/components/analytics/analytics-overview"
import { PerformanceTrends } from "@/components/analytics/performance-trends"
import { CategoryBreakdown } from "@/components/analytics/category-breakdown"
import { ComparisonMetrics } from "@/components/analytics/comparison-metrics"
import { ReportGenerator } from "@/components/analytics/report-generator"
import { CustomDashboard } from "@/components/analytics/custom-dashboard"
import { FacultyHeader } from "@/components/faculty/faculty-header"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

interface User {
  id: number
  email: string
  first_name: string
  last_name: string
  role: string
  faculty_id?: string
  department?: string
}

export default function FacultyAnalyticsPage() {
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
          <p className="mt-4 text-muted-foreground">Loading analytics...</p>
        </div>
      </div>
    )
  }

  if (!currentUser || currentUser.role !== 'faculty') {
    router.push('/login')
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <FacultyHeader />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Page Header */}
          <div>
            <h1 className="text-3xl font-bold text-foreground">Faculty Analytics & Reports</h1>
            <p className="text-muted-foreground mt-2">
              Comprehensive insights into student performance and institutional metrics.
            </p>
          </div>

          {/* Analytics Overview */}
          <AnalyticsOverview />

          {/* Main Analytics Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Charts and Trends */}
            <div className="lg:col-span-2 space-y-8">
              <PerformanceTrends />
              <CategoryBreakdown />
              <ComparisonMetrics />
            </div>

            {/* Right Column - Tools and Reports */}
            <div className="space-y-8">
              <ReportGenerator />
              <CustomDashboard />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
