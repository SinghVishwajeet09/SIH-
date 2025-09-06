"use client"

import { GoalTracker } from "@/components/dashboard/goal-tracker"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
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

export default function GoalsPage() {
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
          <p className="mt-4 text-muted-foreground">Loading goals...</p>
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
        <h1 className="text-3xl font-bold text-foreground mb-8">My Goals</h1>
        <GoalTracker userId={currentUser.id} />
      </main>
    </div>
  )
}
