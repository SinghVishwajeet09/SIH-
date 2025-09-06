"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, FileText, Calendar } from "lucide-react"

const reportSections = [
  { id: "overview", label: "Performance Overview", checked: true },
  { id: "activities", label: "Activity Details", checked: true },
  { id: "categories", label: "Category Breakdown", checked: true },
  { id: "trends", label: "Trend Analysis", checked: false },
  { id: "comparison", label: "Department Comparison", checked: false },
  { id: "goals", label: "Goal Progress", checked: true },
]

export function ReportGenerator() {
  const [sections, setSections] = useState(reportSections)
  const [timeRange, setTimeRange] = useState("semester")
  const [format, setFormat] = useState("pdf")

  const handleSectionChange = (id: string, checked: boolean) => {
    setSections(sections.map((section) => (section.id === id ? { ...section, checked } : section)))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Report Generator
        </CardTitle>
        <CardDescription>Generate custom reports and portfolios</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Time Range Selection */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Time Range</label>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="semester">This Semester</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
              <SelectItem value="all">All Time</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Report Sections */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Include Sections</label>
          <div className="space-y-2">
            {sections.map((section) => (
              <div key={section.id} className="flex items-center space-x-2">
                <Checkbox
                  id={section.id}
                  checked={section.checked}
                  onCheckedChange={(checked) => handleSectionChange(section.id, checked as boolean)}
                />
                <label htmlFor={section.id} className="text-sm">
                  {section.label}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Format Selection */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Format</label>
          <Select value={format} onValueChange={setFormat}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pdf">PDF Report</SelectItem>
              <SelectItem value="excel">Excel Spreadsheet</SelectItem>
              <SelectItem value="portfolio">Digital Portfolio</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Generate Buttons */}
        <div className="space-y-2">
          <Button className="w-full gap-2">
            <Download className="h-4 w-4" />
            Generate Report
          </Button>
          <Button variant="outline" className="w-full gap-2 bg-transparent">
            <Calendar className="h-4 w-4" />
            Schedule Report
          </Button>
        </div>

        {/* Recent Reports */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Recent Reports</label>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Semester Portfolio</span>
              <Button variant="ghost" size="sm">
                <Download className="h-3 w-3" />
              </Button>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span>Monthly Summary</span>
              <Button variant="ghost" size="sm">
                <Download className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
