import { NextResponse } from "next/server"
import { getUserById, getActivitiesByStudent } from "@/lib/mock-data"

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

    // Get user info
    const user = getUserById(userIdNum)
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 })
    }

    // Get user activities
    const activities = getActivitiesByStudent(userIdNum)
    
    // Group activities by category
    const categorizedActivities = activities.reduce((acc: any, activity: any) => {
      if (!acc[activity.category]) {
        acc[activity.category] = []
      }
      acc[activity.category].push(activity)
      return acc
    }, {})

    // Calculate stats
    const totalCredits = activities.filter(a => a.status === 'approved').reduce((sum, a) => sum + a.credits, 0)
    const totalActivities = activities.length
    const approvedActivities = activities.filter(a => a.status === 'approved').length

    const portfolio = {
      user: {
        name: `${user.first_name} ${user.last_name}`,
        email: user.email,
        studentId: user.student_id,
        department: user.department
      },
      stats: {
        totalCredits,
        totalActivities,
        approvedActivities,
        completionRate: totalActivities > 0 ? Math.round((approvedActivities / totalActivities) * 100) : 0
      },
      activities: categorizedActivities,
      generatedAt: new Date().toISOString()
    }

    return NextResponse.json(portfolio)
  } catch (error) {
    console.error("Portfolio API error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
