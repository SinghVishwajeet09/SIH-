"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { useState, useEffect } from "react"

interface PerformanceChartProps {
  userId: number
}

export function PerformanceChart({ userId }: PerformanceChartProps) {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPerformanceData = async () => {
      try {
        const response = await fetch(`/api/dashboard/performance?userId=${userId}`)
        if (response.ok) {
          const performanceData = await response.json()
          setData(performanceData)
        }
      } catch (error) {
        console.error("Failed to fetch performance data:", error)
        // Default empty data if API fails
        setData([
          { month: "Jan", credits: 0, activities: 0 },
          { month: "Feb", credits: 0, activities: 0 },
          { month: "Mar", credits: 0, activities: 0 },
          { month: "Apr", credits: 0, activities: 0 },
          { month: "May", credits: 0, activities: 0 },
          { month: "Jun", credits: 0, activities: 0 },
        ])
      } finally {
        setLoading(false)
      }
    }

    if (userId) {
      fetchPerformanceData()
    }
  }, [userId])

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Performance Overview</CardTitle>
          <CardDescription>Your credit accumulation and activity completion over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] flex items-center justify-center">
            <div className="animate-pulse text-muted-foreground">Loading chart data...</div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance Overview</CardTitle>
        <CardDescription>Your credit accumulation and activity completion over time</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="credits"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              name="Credits Earned"
            />
            <Line
              type="monotone"
              dataKey="activities"
              stroke="hsl(var(--chart-2))"
              strokeWidth={2}
              name="Activities Completed"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
