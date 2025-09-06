import { AnalyticsHeader } from "@/components/analytics/analytics-header"
import { AnalyticsOverview } from "@/components/analytics/analytics-overview"
import { PerformanceTrends } from "@/components/analytics/performance-trends"
import { CategoryBreakdown } from "@/components/analytics/category-breakdown"
import { ComparisonMetrics } from "@/components/analytics/comparison-metrics"
import { ReportGenerator } from "@/components/analytics/report-generator"
import { CustomDashboard } from "@/components/analytics/custom-dashboard"

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-background">
      <AnalyticsHeader />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Page Header */}
          <div>
            <h1 className="text-3xl font-bold text-foreground">Analytics & Reports</h1>
            <p className="text-muted-foreground mt-2">
              Comprehensive insights into student performance and institutional metrics.
            </p>
          </div>

          {/* Analytics Overview */}
          <AnalyticsOverview />

          {/* Main Analytics Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Charts and Trends */}
            <div className="lg:col-span-2 space-y-8">
              <PerformanceTrends />
              <CategoryBreakdown />
              <ComparisonMetrics />
            </div>

            {/* Right Column - Tools and Reports */}
            <div className="space-y-8">
              <ReportGenerator />
              <CustomDashboard />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
