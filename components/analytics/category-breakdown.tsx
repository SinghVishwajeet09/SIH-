"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts"

const categoryData = [
  { name: "Academic", value: 18.5, activities: 8, color: "hsl(var(--chart-1))" },
  { name: "Technical", value: 12.0, activities: 7, color: "hsl(var(--chart-2))" },
  { name: "Leadership", value: 8.5, activities: 5, color: "hsl(var(--chart-3))" },
  { name: "Volunteer", value: 5.5, activities: 3, color: "hsl(var(--chart-4))" },
  { name: "Professional", value: 3.0, activities: 2, color: "hsl(var(--chart-5))" },
]

export function CategoryBreakdown() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Credits by Category - Pie Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Credits by Category</CardTitle>
          <CardDescription>Distribution of earned credits across activity types</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value} credits`, "Credits"]} />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {categoryData.map((category, index) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: category.color }}></div>
                <span className="text-muted-foreground">{category.name}</span>
                <span className="font-medium ml-auto">{category.value}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Activities by Category - Bar Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Activities by Category</CardTitle>
          <CardDescription>Number of completed activities per category</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={categoryData} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" width={80} />
              <Tooltip formatter={(value) => [`${value} activities`, "Count"]} />
              <Bar dataKey="activities" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
