import { NextResponse } from "next/server"
import { activities } from "@/lib/mock-data"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    
    if (userId) {
      const userIdNum = parseInt(userId)
      const userActivities = activities.filter(activity => activity.student_id === userIdNum)
      return NextResponse.json(userActivities)
    }
    
    return NextResponse.json(activities)
  } catch (error) {
    console.error("Get activities error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { title, description, category, credits, student_id } = await request.json()

    if (!title || !description || !category || !student_id) {
      return NextResponse.json({ 
        message: "Title, description, category, and student_id are required." 
      }, { status: 400 })
    }

    // Create new activity
    const newActivity = {
      id: activities.length + 1,
      student_id: parseInt(student_id),
      title,
      description,
      category,
      status: "submitted",
      credits: credits || 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }

    // Add to mock data (in real app, this would be saved to database)
    activities.push(newActivity)

    return NextResponse.json({ 
      message: "Activity created successfully!", 
      activity: newActivity 
    }, { status: 201 })
  } catch (error) {
    console.error("Create activity error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
