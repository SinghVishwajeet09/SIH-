import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Award, Target, Clock, Users } from "lucide-react"

export function AnalyticsOverview() {
  const metrics = [
    {
      title: "Total Credits",
      value: "47.5",
      change: "+15.2%",
      trend: "up",
      icon: Award,
      description: "vs last semester",
    },
    {
      title: "Activities Completed",
      value: "23",
      change: "+8.3%",
      trend: "up",
      icon: Target,
      description: "vs last semester",
    },
    {
      title: "Avg. Processing Time",
      value: "3.2 days",
      change: "-12.5%",
      trend: "up",
      icon: Clock,
      description: "approval time",
    },
    {
      title: "Department Ranking",
      value: "#3",
      change: "+2 positions",
      trend: "up",
      icon: Users,
      description: "out of 45 students",
    },
    {
      title: "Goal Achievement",
      value: "79%",
      change: "+5.2%",
      trend: "up",
      icon: TrendingUp,
      description: "semester progress",
    },
    {
      title: "Participation Rate",
      value: "92%",
      change: "-2.1%",
      trend: "down",
      icon: TrendingDown,
      description: "vs department avg",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {metrics.map((metric, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
            <metric.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metric.value}</div>
            <div className="flex items-center gap-1 text-xs">
              <span className={`font-medium ${metric.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                {metric.change}
              </span>
              <span className="text-muted-foreground">{metric.description}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
