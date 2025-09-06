"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"

const comparisonData = [
  {
    metric: "Total Credits",
    myValue: 47.5,
    deptAverage: 42.1,
    percentile: 78,
    trend: "up",
  },
  {
    metric: "Activities per Month",
    myValue: 4.6,
    deptAverage: 3.8,
    percentile: 72,
    trend: "up",
  },
  {
    metric: "Approval Rate",
    myValue: 89,
    deptAverage: 85,
    percentile: 65,
    trend: "up",
  },
  {
    metric: "Response Time",
    myValue: 2.1,
    deptAverage: 3.2,
    percentile: 85,
    trend: "up",
  },
  {
    metric: "Goal Achievement",
    myValue: 79,
    deptAverage: 82,
    percentile: 45,
    trend: "down",
  },
]

export function ComparisonMetrics() {
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-600" />
      case "down":
        return <TrendingDown className="h-4 w-4 text-red-600" />
      default:
        return <Minus className="h-4 w-4 text-muted-foreground" />
    }
  }

  const getPerformanceBadge = (percentile: number) => {
    if (percentile >= 80) return <Badge className="bg-green-100 text-green-800">Excellent</Badge>
    if (percentile >= 60) return <Badge className="bg-blue-100 text-blue-800">Good</Badge>
    if (percentile >= 40) return <Badge className="bg-yellow-100 text-yellow-800">Average</Badge>
    return <Badge className="bg-red-100 text-red-800">Below Average</Badge>
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Department Comparison</CardTitle>
        <CardDescription>How you compare to other students in Computer Science</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {comparisonData.map((item, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{item.metric}</span>
                  {getTrendIcon(item.trend)}
                </div>
                {getPerformanceBadge(item.percentile)}
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Your Value:</span>
                  <span className="font-medium ml-2">{item.myValue}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Dept. Average:</span>
                  <span className="font-medium ml-2">{item.deptAverage}</span>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Percentile Ranking</span>
                  <span>{item.percentile}th percentile</span>
                </div>
                <Progress value={item.percentile} className="h-2" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
