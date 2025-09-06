import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import CgpaUpdate from "@/models/CgpaUpdate";
import User from "@/models/User";

export async function GET(request: Request) {
  try {
    console.log('Faculty Approvals - Received request');
    const { searchParams } = new URL(request.url);
    const facultyId = searchParams.get("facultyId");
    const type = searchParams.get("type") || "cgpa";
    
    console.log('Faculty Approvals - Query params:', { facultyId, type });

    if (!facultyId) {
      return NextResponse.json(
        { error: "Faculty ID is required" },
        { status: 400 }
      );
    }

    await connectDB();

    // Get faculty's department
    const faculty = await User.findById(facultyId);
    console.log('Faculty Approvals - Found faculty:', faculty ? {
      id: faculty._id,
      name: `${faculty.first_name} ${faculty.last_name}`,
      department: faculty.department,
      role: faculty.role
    } : 'No faculty found');

    if (!faculty || faculty.role !== "faculty") {
      return NextResponse.json(
        { error: "Invalid faculty ID" },
        { status: 404 }
      );
    }

    let query;
    if (type === "cgpa") {
      query = {
        status: "pending",
        studentDepartment: faculty.department
      };
    } else {
      // For activities
      query = {
        status: "pending",
        type: "activity",
        "student.department": faculty.department
      };
    }

    console.log('Faculty Approvals - Search query:', query);

    const requests = await CgpaUpdate.find(query)
      .populate("student", "first_name last_name email department student_id")
      .populate("approvedBy", "first_name last_name")
      .sort({ createdAt: -1 });
      
    console.log('Faculty Approvals - Found requests:', requests.map(r => ({
      id: r._id,
      student: r.student ? `${r.student.first_name} ${r.student.last_name}` : 'Unknown',
      department: r.studentDepartment,
      status: r.status
    })));

    return NextResponse.json(requests);

  } catch (error: any) {
    console.error("Error fetching approval requests:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
