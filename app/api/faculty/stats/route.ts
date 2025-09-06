import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import CgpaUpdate from "@/models/CgpaUpdate";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const facultyId = searchParams.get("facultyId");

    if (!facultyId) {
      return NextResponse.json(
        { error: "Faculty ID is required" },
        { status: 400 }
      );
    }

    await connectDB();

    // Get faculty details
    const faculty = await User.findById(facultyId);
    if (!faculty || faculty.role !== "faculty") {
      return NextResponse.json(
        { error: "Invalid faculty ID" },
        { status: 404 }
      );
    }

    // Get department students
    const students = await User.find({
      department: faculty.department,
      role: "student"
    });

    // Get pending approvals count
    const pendingApprovals = await CgpaUpdate.countDocuments({
      status: "pending",
      "student.department": faculty.department
    });

    // Get approved requests count
    const approvedRequests = await CgpaUpdate.countDocuments({
      status: "approved",
      approvedBy: facultyId
    });

    // Calculate department average CGPA
    const totalCgpa = students.reduce((sum, student) => sum + (student.cgpa || 0), 0);
    const avgCgpa = students.length > 0 ? totalCgpa / students.length : 0;

    return NextResponse.json({
      totalStudents: students.length,
      pendingApprovals,
      approvedRequests,
      departmentAvgCgpa: avgCgpa
    });

  } catch (error: any) {
    console.error("Error fetching faculty stats:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
