import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useState, useEffect } from "react"

interface RecentActivitiesProps {
  userId: number
}

export function RecentActivities({ userId }: RecentActivitiesProps) {
  const [activities, setActivities] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetch(`/api/dashboard/activities?userId=${userId}&limit=3`)
        if (response.ok) {
          const data = await response.json()
          setActivities(data)
        }
      } catch (error) {
        console.error("Failed to fetch activities:", error)
      } finally {
        setLoading(false)
      }
    }

    if (userId) {
      fetchActivities()
    }
  }, [userId])

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Quick Overview</CardTitle>
          <CardDescription>Latest activity highlights</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
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
        <CardTitle>Quick Overview</CardTitle>
        <CardDescription>Latest activity highlights</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {activities.length > 0 ? (
            activities.map((activity, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-sm">{activity.title}</div>
                  <div className="text-xs text-muted-foreground">{activity.category}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">{activity.credits || 0}</div>
                  <Badge variant={activity.status === "approved" ? "default" : "secondary"} className="text-xs">
                    {activity.status}
                  </Badge>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-muted-foreground text-sm py-4">
              No activities yet. Start adding some!
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
