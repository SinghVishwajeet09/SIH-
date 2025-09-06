import { NextResponse } from "next/server"
import { getActivitiesByStudent } from "@/lib/mock-data"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    
    if (!userId) {
      return NextResponse.json({ message: "User ID is required" }, { status: 400 })
    }

    const userIdNum = parseInt(userId)
    
    if (isNaN(userIdNum)) {
      return NextResponse.json({ message: "Invalid user ID" }, { status: 400 })
    }

    // Get user activities to calculate monthly performance from mock data
    const activities = getActivitiesByStudent(userIdNum)
    
    // If no activities, return sample progression data
    if (activities.length === 0) {
      const sampleData = [
        { month: 'Jan', credits: 0, activities: 0 },
        { month: 'Feb', credits: 2, activities: 1 },
        { month: 'Mar', credits: 5, activities: 2 },
        { month: 'Apr', credits: 8, activities: 3 },
        { month: 'May', credits: 12, activities: 4 },
        { month: 'Jun', credits: 15, activities: 5 },
        { month: 'Jul', credits: 18, activities: 6 },
        { month: 'Aug', credits: 21, activities: 7 },
        { month: 'Sep', credits: 24, activities: 8 }
      ]
      return NextResponse.json(sampleData)
    }
    
    // Group activities by month and calculate cumulative data
    const monthlyData: { [key: string]: { credits: number, activities: number } } = {}
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    
    // Initialize all months
    months.forEach(month => {
      monthlyData[month] = { credits: 0, activities: 0 }
    })
    
    // Process activities and accumulate by month
    let cumulativeCredits = 0
    let cumulativeActivities = 0
    
    activities
      .filter((activity: any) => activity.status === 'approved')
      .sort((a: any, b: any) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
      .forEach((activity: any) => {
        const date = new Date(activity.created_at)
        const monthIndex = date.getMonth()
        const monthName = months[monthIndex]
        
        cumulativeCredits += activity.credits || 0
        cumulativeActivities += 1
        
        // Set cumulative values for this month and all subsequent months
        for (let i = monthIndex; i < months.length; i++) {
          monthlyData[months[i]] = {
            credits: cumulativeCredits,
            activities: cumulativeActivities
          }
        }
      })

    // Convert to array format for chart
    const chartData = months.map(month => ({
      month,
      credits: monthlyData[month].credits,
      activities: monthlyData[month].activities
    }))

    return NextResponse.json(chartData)
  } catch (error) {
    console.error("Dashboard performance error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
