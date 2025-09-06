"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts"

const performanceData = [
  { month: "Sep", credits: 5.2, activities: 3, cumulative: 5.2 },
  { month: "Oct", credits: 8.1, activities: 5, cumulative: 13.3 },
  { month: "Nov", credits: 12.4, activities: 7, cumulative: 25.7 },
  { month: "Dec", credits: 6.8, activities: 4, cumulative: 32.5 },
  { month: "Jan", credits: 15.0, activities: 9, cumulative: 47.5 },
]

export function PerformanceTrends() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Performance Trends</CardTitle>
            <CardDescription>Your activity and credit accumulation over time</CardDescription>
          </div>
          <Select defaultValue="semester">
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="semester">This Semester</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
              <SelectItem value="all">All Time</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={performanceData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="cumulative"
              stroke="hsl(var(--primary))"
              fill="hsl(var(--primary))"
              fillOpacity={0.1}
              name="Cumulative Credits"
            />
            <Line
              type="monotone"
              dataKey="credits"
              stroke="hsl(var(--chart-2))"
              strokeWidth={2}
              name="Monthly Credits"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
