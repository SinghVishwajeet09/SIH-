import { NextResponse } from "next/server";

// Mock data for approvals
const mockApprovals = [
  {
    _id: "1",
    student: {
      _id: "student1",
      first_name: "John",
      last_name: "Doe",
      email: "john.doe@example.com",
      department: "Computer Science"
    },
    status: "pending",
    type: "cgpa",
    newCgpa: 8.8,
    createdAt: new Date().toISOString()
  }
];

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { status, comments, facultyId } = await request.json();
    const requestId = params.id;

    if (!status || !facultyId) {
      return NextResponse.json(
        { error: "Status and faculty ID are required" },
        { status: 400 }
      );
    }

    // Find the request in mock data
    const updateRequest = mockApprovals.find(req => req._id === requestId);
      
    if (!updateRequest) {
      return NextResponse.json(
        { error: "Request not found" },
        { status: 404 }
      );
    }

    // Update request status
    updateRequest.status = status;
    updateRequest.comments = comments;
    updateRequest.approvedBy = facultyId;

    console.log(`Request ${requestId} ${status} by faculty ${facultyId}`);

    return NextResponse.json({
      message: `Request ${status} successfully`,
      request: updateRequest
    });

  } catch (error: any) {
    console.error("Error processing approval:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
