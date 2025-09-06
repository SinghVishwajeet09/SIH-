import { NextResponse } from "next/server"
import { getStudentStats } from "@/lib/mock-data"

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

    // Get user stats to calculate current progress from mock data
    const stats = getStudentStats(userIdNum)
    
    // Default goals based on user progress
    const goals = [
      {
        id: 1,
        title: "Semester Credit Goal",
        target: 60,
        current: stats?.total_credits || 0,
        deadline: "Dec 2024",
      },
      {
        id: 2,
        title: "Complete Activities",
        target: 15,
        current: stats?.total_activities || 0,
        deadline: "Nov 2024",
      },
      {
        id: 3,
        title: "Approved Activities",
        target: 10,
        current: stats?.approved_activities || 0,
        deadline: "Dec 2024",
      },
    ]

    return NextResponse.json(goals)
  } catch (error) {
    console.error("Dashboard goals error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
