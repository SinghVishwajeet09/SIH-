import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Award, Clock, Target } from "lucide-react"
import { useState, useEffect } from "react"

interface StatsOverviewProps {
  userId: number
}

export function StatsOverview({ userId }: StatsOverviewProps) {
  const [stats, setStats] = useState([
    {
      title: "Current CGPA",
      value: "0.00",
      change: "Loading...",
      icon: Award,
      trend: "neutral",
    },
    {
      title: "Activities Completed",
      value: "0",
      change: "Loading...",
      icon: Target,
      trend: "neutral",
    },
    {
      title: "Pending Approvals",
      value: "0",
      change: "Loading...",
      icon: Clock,
      trend: "neutral",
    },
    {
      title: "Performance Score",
      value: "0%",
      change: "Loading...",
      icon: TrendingUp,
      trend: "neutral",
    },
  ])

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(`/api/dashboard/stats?userId=${userId}`)
        if (response.ok) {
          const data = await response.json()
          setStats([
            {
              title: "Current CGPA",
              value: data.cgpa.toFixed(2),
              change: data.cgpa >= 8 ? "Excellent" : data.cgpa >= 7 ? "Good" : data.cgpa >= 6 ? "Average" : "Needs Improvement",
              icon: Award,
              trend: data.totalCredits > 0 ? "up" : "neutral",
            },
            {
              title: "Activities Completed",
              value: data.approvedActivities.toString(),
              change: `${data.totalActivities} total activities`,
              icon: Target,
              trend: data.approvedActivities > 0 ? "up" : "neutral",
            },
            {
              title: "Pending Approvals",
              value: data.pendingActivities.toString(),
              change: data.pendingActivities > 0 ? "Awaiting review" : "All up to date",
              icon: Clock,
              trend: data.pendingActivities > 0 ? "neutral" : "up",
            },
            {
              title: "Performance Score",
              value: `${data.performanceScore}%`,
              change: `${data.approvedActivities}/${data.totalActivities} approved`,
              icon: TrendingUp,
              trend: data.performanceScore >= 80 ? "up" : data.performanceScore >= 60 ? "neutral" : "down",
            },
          ])
        }
      } catch (error) {
        console.error("Failed to fetch stats:", error)
      }
    }

    if (userId) {
      fetchStats()
    }
  }, [userId])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p
              className={`text-xs ${
                stat.trend === "up"
                  ? "text-green-600"
                  : stat.trend === "down"
                    ? "text-red-600"
                    : "text-muted-foreground"
              }`}
            >
              {stat.change}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
