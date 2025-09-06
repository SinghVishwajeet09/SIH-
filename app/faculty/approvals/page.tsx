"use client"

import ApprovalQueue from "@/components/faculty/approval-queue"
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

export default function FacultyApprovalsPage() {
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
          <p className="mt-4 text-muted-foreground">Loading approvals...</p>
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
        <h1 className="text-3xl font-bold text-foreground mb-8">Approval Queue</h1>
        <ApprovalQueue />
      </main>
    </div>
  )
}
