"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Filter, X } from "lucide-react"

const categories = [
  { id: "academic", name: "Academic", count: 8 },
  { id: "extracurricular", name: "Extracurricular", count: 6 },
  { id: "professional", name: "Professional", count: 4 },
  { id: "volunteer", name: "Volunteer", count: 3 },
  { id: "sports", name: "Sports", count: 2 },
  { id: "leadership", name: "Leadership", count: 5 },
  { id: "creative", name: "Creative", count: 3 },
  { id: "technical", name: "Technical", count: 7 },
]

const statuses = [
  { id: "all", name: "All Status" },
  { id: "draft", name: "Draft" },
  { id: "submitted", name: "Submitted" },
  { id: "approved", name: "Approved" },
  { id: "rejected", name: "Rejected" },
]

export function ActivityFilters() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [dateRange, setDateRange] = useState("all")

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, categoryId])
    } else {
      setSelectedCategories(selectedCategories.filter((id) => id !== categoryId))
    }
  }

  const clearFilters = () => {
    setSelectedCategories([])
    setSelectedStatus("all")
    setDateRange("all")
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filters
            </CardTitle>
            {(selectedCategories.length > 0 || selectedStatus !== "all" || dateRange !== "all") && (
              <Button variant="ghost" size="sm" onClick={clearFilters} className="gap-2">
                <X className="h-4 w-4" />
                Clear
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Status Filter */}
          <div>
            <h4 className="font-medium mb-3">Status</h4>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {statuses.map((status) => (
                  <SelectItem key={status.id} value={status.id}>
                    {status.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Category Filter */}
          <div>
            <h4 className="font-medium mb-3">Categories</h4>
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={category.id}
                      checked={selectedCategories.includes(category.id)}
                      onCheckedChange={(checked) => handleCategoryChange(category.id, checked as boolean)}
                    />
                    <label
                      htmlFor={category.id}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {category.name}
                    </label>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {category.count}
                  </Badge>
                </div>
              ))}
            </div>
          </div>

          {/* Date Range Filter */}
          <div>
            <h4 className="font-medium mb-3">Date Range</h4>
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="this-month">This Month</SelectItem>
                <SelectItem value="last-month">Last Month</SelectItem>
                <SelectItem value="this-semester">This Semester</SelectItem>
                <SelectItem value="last-semester">Last Semester</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Active Filters */}
      {selectedCategories.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Active Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {selectedCategories.map((categoryId) => {
                const category = categories.find((c) => c.id === categoryId)
                return (
                  <Badge key={categoryId} variant="secondary" className="gap-1">
                    {category?.name}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => handleCategoryChange(categoryId, false)} />
                  </Badge>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
