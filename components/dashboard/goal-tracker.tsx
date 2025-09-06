import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useState, useEffect } from "react"

interface GoalTrackerProps {
  userId: number
}

export function GoalTracker({ userId }: GoalTrackerProps) {
  const [goals, setGoals] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const response = await fetch(`/api/dashboard/goals?userId=${userId}`)
        if (response.ok) {
          const data = await response.json()
          setGoals(data)
        }
      } catch (error) {
        console.error("Failed to fetch goals:", error)
        // Default goals if API fails
        setGoals([
          {
            id: 1,
            title: "Semester Credit Goal",
            target: 60,
            current: 0,
            deadline: "Dec 2024",
          },
          {
            id: 2,
            title: "Complete Activities",
            target: 10,
            current: 0,
            deadline: "Nov 2024",
          },
        ])
      } finally {
        setLoading(false)
      }
    }

    if (userId) {
      fetchGoals()
    }
  }, [userId])

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Goal Tracker</CardTitle>
              <CardDescription>Track your progress toward personal goals</CardDescription>
            </div>
            <Button size="sm" variant="outline" className="gap-2 bg-transparent">
              <Plus className="h-4 w-4" />
              Add Goal
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {[1, 2].map((i) => (
              <div key={i} className="space-y-2 animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-2 bg-gray-200 rounded"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Goal Tracker</CardTitle>
            <CardDescription>Track your progress toward personal goals</CardDescription>
          </div>
          <Button size="sm" variant="outline" className="gap-2 bg-transparent">
            <Plus className="h-4 w-4" />
            Add Goal
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {goals.length > 0 ? (
            goals.map((goal) => (
              <div key={goal.id} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{goal.title}</span>
                  <span className="text-muted-foreground">{goal.deadline}</span>
                </div>
                <Progress value={(goal.current / goal.target) * 100} className="h-2" />
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>
                    {goal.current} / {goal.target}
                  </span>
                  <span>{Math.round((goal.current / goal.target) * 100)}% complete</span>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-muted-foreground text-sm py-4">
              No goals set. Click "Add Goal" to get started!
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
