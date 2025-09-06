"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Plus, Settings, Eye, EyeOff } from "lucide-react"

const dashboardWidgets = [
  { id: "performance", name: "Performance Chart", enabled: true, type: "chart" },
  { id: "goals", name: "Goal Progress", enabled: true, type: "progress" },
  { id: "categories", name: "Category Breakdown", enabled: false, type: "chart" },
  { id: "comparison", name: "Peer Comparison", enabled: true, type: "metrics" },
  { id: "recent", name: "Recent Activities", enabled: false, type: "list" },
  { id: "calendar", name: "Activity Calendar", enabled: true, type: "calendar" },
]

export function CustomDashboard() {
  const [widgets, setWidgets] = useState(dashboardWidgets)

  const handleWidgetToggle = (id: string, enabled: boolean) => {
    setWidgets(widgets.map((widget) => (widget.id === id ? { ...widget, enabled } : widget)))
  }

  const getWidgetTypeBadge = (type: string) => {
    const colors = {
      chart: "bg-blue-100 text-blue-800",
      progress: "bg-green-100 text-green-800",
      metrics: "bg-purple-100 text-purple-800",
      list: "bg-orange-100 text-orange-800",
      calendar: "bg-pink-100 text-pink-800",
    }
    return <Badge className={colors[type as keyof typeof colors] || "bg-gray-100 text-gray-800"}>{type}</Badge>
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Custom Dashboard
            </CardTitle>
            <CardDescription>Customize your analytics dashboard</CardDescription>
          </div>
          <Button size="sm" variant="outline" className="gap-2 bg-transparent">
            <Plus className="h-4 w-4" />
            Add Widget
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Widget List */}
        <div className="space-y-3">
          {widgets.map((widget) => (
            <div key={widget.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                {widget.enabled ? (
                  <Eye className="h-4 w-4 text-green-600" />
                ) : (
                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                )}
                <div>
                  <div className="font-medium text-sm">{widget.name}</div>
                  <div className="flex items-center gap-2 mt-1">{getWidgetTypeBadge(widget.type)}</div>
                </div>
              </div>
              <Switch checked={widget.enabled} onCheckedChange={(enabled) => handleWidgetToggle(widget.id, enabled)} />
            </div>
          ))}
        </div>

        {/* Dashboard Actions */}
        <div className="space-y-2 pt-4 border-t">
          <Button variant="outline" className="w-full bg-transparent">
            Preview Dashboard
          </Button>
          <Button className="w-full">Save Layout</Button>
        </div>

        {/* Dashboard Stats */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t text-center">
          <div>
            <div className="text-lg font-semibold">{widgets.filter((w) => w.enabled).length}</div>
            <div className="text-xs text-muted-foreground">Active Widgets</div>
          </div>
          <div>
            <div className="text-lg font-semibold">3</div>
            <div className="text-xs text-muted-foreground">Saved Layouts</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
