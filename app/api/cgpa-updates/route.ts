import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import CgpaUpdate from "@/models/CgpaUpdate";
import User from "@/models/User";

export async function POST(request: Request) {
  try {
    console.log('CGPA Update - Received request');
    const body = await request.json();
    console.log('CGPA Update - Request body:', { ...body, documents: '[omitted]' });
    const { studentId, newCgpa, semester, documents } = body;

    if (!studentId || !newCgpa || !semester) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    await connectDB();

    // Get current user's CGPA
    const student = await User.findById(studentId);
    console.log('CGPA Update - Found student:', student ? {
      id: student._id,
      name: `${student.first_name} ${student.last_name}`,
      department: student.department,
      currentCgpa: student.cgpa
    } : 'No student found');
    
    if (!student) {
      return NextResponse.json(
        { error: "Student not found" },
        { status: 404 }
      );
    }

    // Create CGPA update request
    const cgpaUpdate = await CgpaUpdate.create({
      student: studentId,
      currentCgpa: student.cgpa || 0,
      newCgpa,
      semester,
      documents,
      status: 'pending',
      studentDepartment: student.department || 'General' // Add department information with fallback
    });

    return NextResponse.json({
      message: "CGPA update request submitted successfully",
      update: cgpaUpdate
    }, { status: 201 });

  } catch (error: any) {
    console.error("CGPA update error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const studentId = searchParams.get("studentId");

    if (!studentId) {
      return NextResponse.json(
        { error: "Student ID is required" },
        { status: 400 }
      );
    }

    await connectDB();

    const updates = await CgpaUpdate.find({ student: studentId })
      .sort({ createdAt: -1 })
      .populate('approvedBy', 'first_name last_name');

    return NextResponse.json(updates);

  } catch (error: any) {
    console.error("Error fetching CGPA updates:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
