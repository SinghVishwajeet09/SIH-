"use client"

import { ActivityHeader } from "@/components/activities/activity-header"
import { ActivityFilters } from "@/components/activities/activity-filters"
import { ActivityList } from "@/components/activities/activity-list"
import { ActivityStats } from "@/components/activities/activity-stats"
import { useState } from "react"

export default function ActivitiesPage() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <ActivityHeader onNewActivityClick={() => setIsCreateDialogOpen(true)} />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Page Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">My Activities</h1>
              <p className="text-muted-foreground mt-2">
                Manage and track all your academic and extracurricular activities.
              </p>
            </div>
          </div>

          {/* Activity Stats */}
          <ActivityStats />

          {/* Filters and Activity List */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <ActivityFilters />
            </div>
            <div className="lg:col-span-3">
              <ActivityList isCreateDialogOpen={isCreateDialogOpen} setIsCreateDialogOpen={setIsCreateDialogOpen} />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
