import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock, AlertCircle } from "lucide-react"
import { useState, useEffect } from "react"

interface ActivityTimelineProps {
  userId: number
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case "approved":
      return <CheckCircle className="h-4 w-4 text-green-600" />
    case "submitted":
      return <Clock className="h-4 w-4 text-yellow-600" />
    case "draft":
      return <AlertCircle className="h-4 w-4 text-gray-400" />
    default:
      return null
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "approved":
      return "bg-green-100 text-green-800"
    case "submitted":
      return "bg-yellow-100 text-yellow-800"
    case "draft":
      return "bg-gray-100 text-gray-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export function ActivityTimeline({ userId }: ActivityTimelineProps) {
  const [activities, setActivities] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetch(`/api/dashboard/activities?userId=${userId}&limit=5`)
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
          <CardTitle>Recent Activities</CardTitle>
          <CardDescription>Your latest activity submissions and their status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between p-4 border rounded-lg animate-pulse">
                <div className="flex items-center gap-3">
                  <div className="h-4 w-4 bg-gray-200 rounded"></div>
                  <div>
                    <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-24"></div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-4 bg-gray-200 rounded w-16"></div>
                  <div className="h-6 bg-gray-200 rounded w-16"></div>
                </div>
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
        <CardTitle>Recent Activities</CardTitle>
        <CardDescription>Your latest activity submissions and their status</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.length > 0 ? (
            activities.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  {getStatusIcon(activity.status)}
                  <div>
                    <h4 className="font-medium">{activity.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {activity.category} • {new Date(activity.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium">{activity.credits || 0} credits</span>
                  <Badge className={getStatusColor(activity.status)}>{activity.status}</Badge>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-muted-foreground text-sm py-8">
              No activities yet. Start adding some activities to see them here!
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
