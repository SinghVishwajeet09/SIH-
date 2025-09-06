"use client";

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function RegisterPage() {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("student")
  const [department, setDepartment] = useState("")
  const [facultyId, setFacultyId] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const registrationData = {
        firstName,
        lastName,
        email,
        password,
        role,
        department,
        ...(role === 'faculty' && { facultyId })
      };
      
      console.log('Sending registration data:', { 
        ...registrationData, 
        password: '[HIDDEN]' 
      });

      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registrationData),
      })

      const data = await response.json()
      console.log('Registration response:', data);

      if (response.ok) {
        console.log("Registration successful:", data)
        // Auto-login after registration to get user data
        try {
          const loginResponse = await fetch("/api/auth/login", {
            method: "POST", 
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
          })
          const loginData = await loginResponse.json()
          if (loginResponse.ok) {
            localStorage.setItem('currentUser', JSON.stringify(loginData.user))
            router.push("/dashboard") // Go directly to dashboard after registration
          } else {
            router.push("/login") // Fallback to login page
          }
        } catch {
          router.push("/login") // Fallback if auto-login fails
        }
      } else {
        const errorMessage = data.details 
          ? `Registration failed: ${data.details.join(', ')}` 
          : data.error || data.message || "Registration failed."
        setError(errorMessage)
      }
    } catch (err) {
      console.error("Registration error:", err)
      setError("An unexpected error occurred.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Sign Up</CardTitle>
          <CardDescription>Enter your information to create an account.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="first-name">First Name</Label>
                <Input
                  id="first-name"
                  type="text"
                  placeholder="John"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="last-name">Last Name</Label>
                <Input
                  id="last-name"
                  type="text"
                  placeholder="Doe"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="role">Role</Label>
              <select
                id="role"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              >
                <option value="student">Student</option>
                <option value="faculty">Faculty</option>
              </select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="department">Department</Label>
              <Input
                id="department"
                type="text"
                placeholder="e.g., Computer Science"
                required
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
              />
            </div>
            {role === "faculty" && (
              <div className="grid gap-2">
                <Label htmlFor="facultyId">Faculty ID</Label>
                <Input
                  id="facultyId"
                  type="text"
                  placeholder="Enter your faculty ID"
                  required
                  value={facultyId}
                  onChange={(e) => setFacultyId(e.target.value)}
                />
              </div>
            )}
            {error && <p className="text-sm text-destructive text-center">{error}</p>}
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button className="w-full" type="submit" disabled={loading}>
              {loading ? "Signing Up..." : "Sign Up"}
            </Button>
            <p className="mt-4 text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login" className="text-primary hover:underline">
                Sign In
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
