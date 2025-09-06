"use client"

import { FacultyHeader } from "@/components/faculty/faculty-header"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
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

export default function FacultySettingsPage() {
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
          <p className="mt-4 text-muted-foreground">Loading settings...</p>
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
        <h1 className="text-3xl font-bold text-foreground mb-8">Faculty Settings</h1>
        <Card className="max-w-2xl">
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>Update your personal and professional details.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" defaultValue={currentUser.first_name} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" defaultValue={currentUser.last_name} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue={currentUser.email} disabled />
            </div>
            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Input id="department" defaultValue={currentUser.department} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="facultyId">Faculty ID</Label>
              <Input id="facultyId" defaultValue={currentUser.faculty_id} disabled />
            </div>
            <Button>Save Changes</Button>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
