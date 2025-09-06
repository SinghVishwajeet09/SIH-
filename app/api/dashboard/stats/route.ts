import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ message: "User ID is required" }, { status: 400 });
    }

    await connectDB();

    // Get user from MongoDB
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Mock statistics for initial setup
    const stats = {
      cgpa: user.cgpa || 0,
      totalActivities: 15,
      approvedActivities: 12,
      pendingActivities: 3,
      performanceScore: 85,
      user: {
        name: `${user.first_name} ${user.last_name}`,
        studentId: user.student_id || 'N/A',
        department: user.department || 'N/A'
      },
      recentActivities: [
        { title: "Completed Python Course", date: "2025-09-01", status: "approved" },
        { title: "Web Development Project", date: "2025-08-28", status: "pending" },
        { title: "AI Certificate", date: "2025-08-15", status: "approved" }
      ],
      performanceGraph: {
        labels: ["May", "Jun", "Jul", "Aug", "Sep"],
        data: [65, 70, 75, 80, 85]
      }
    };

    return NextResponse.json(stats);
  } catch (error: any) {
    console.error("Dashboard stats error:", error);
    return NextResponse.json(
      { message: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
