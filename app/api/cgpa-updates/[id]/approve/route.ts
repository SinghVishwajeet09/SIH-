import { NextResponse } from "next/server";

// Mock data for CGPA updates
const mockCgpaUpdates = [
  {
    _id: "1",
    student: "student1",
    status: "pending",
    newCgpa: 8.8,
    createdAt: new Date().toISOString()
  }
];

export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    const { status, comments, facultyId } = await request.json();
    const updateId = params.id;

    if (!status || !facultyId) {
      return NextResponse.json(
        { error: "Status and faculty ID are required" },
        { status: 400 }
      );
    }

    // Find the CGPA update request
    const cgpaUpdate = mockCgpaUpdates.find(update => update._id === updateId);
    if (!cgpaUpdate) {
      return NextResponse.json(
        { error: "CGPA update request not found" },
        { status: 404 }
      );
    }

    // Update the request status
    cgpaUpdate.status = status;
    cgpaUpdate.comments = comments;
    cgpaUpdate.approvedBy = facultyId;

    console.log(`CGPA update ${updateId} ${status} by faculty ${facultyId}`);

    return NextResponse.json({
      message: `CGPA update ${status}`,
      update: cgpaUpdate
    });

  } catch (error: any) {
    console.error("CGPA approval error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
