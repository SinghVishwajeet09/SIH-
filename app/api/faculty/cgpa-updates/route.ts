import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import CgpaUpdate from "@/models/CgpaUpdate";
import User from "@/models/User";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const department = searchParams.get("department");
    
    await connectDB();

    // For now, show all pending updates regardless of department
    // In a real system, you might want to filter by department or show all to admin faculty
    const query = { status: 'pending' };
    
    const updates = await CgpaUpdate.find(query)
      .sort({ createdAt: -1 })
      .populate('student', 'first_name last_name email department')
      .populate('approvedBy', 'first_name last_name');

    console.log('Faculty CGPA Updates - Found updates:', updates.length);

    return NextResponse.json(updates);
  } catch (error: any) {
    console.error("Error fetching CGPA updates for faculty:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { updateId, action, feedback, faculty } = body;

    if (!updateId || !action || !faculty) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    await connectDB();

    const update = await CgpaUpdate.findById(updateId);
    if (!update) {
      return NextResponse.json(
        { error: "CGPA update request not found" },
        { status: 404 }
      );
    }

    // Update the CGPA update request
    update.status = action;
    update.feedback = feedback;
    update.approvedBy = faculty;
    update.reviewedAt = new Date();

    // Ensure studentDepartment is set (fix for existing records)
    if (!update.studentDepartment) {
      update.studentDepartment = 'General';
    }

    await update.save();

    // If approved, update the student's CGPA
    if (action === 'approved') {
      const student = await User.findById(update.student);
      if (student) {
        // Use findByIdAndUpdate to avoid validation issues
        await User.findByIdAndUpdate(update.student, { 
          cgpa: update.newCgpa 
        });
        console.log(`Updated student ${student._id} CGPA to ${update.newCgpa}`);
      }
    }

    console.log(`CGPA update ${updateId} ${action} by faculty ${faculty}`);

    return NextResponse.json({
      message: `CGPA update request ${action}`,
      update
    });

  } catch (error: any) {
    console.error("Error updating CGPA request:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
