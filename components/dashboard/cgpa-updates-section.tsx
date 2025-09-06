import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CgpaUpdateForm } from "./cgpa-update-form";

interface CgpaUpdate {
  _id: string;
  currentCgpa: number;
  newCgpa: number;
  semester: string;
  status: "pending" | "approved" | "rejected";
  comments?: string;
  createdAt: string;
  approvedBy?: {
    first_name: string;
    last_name: string;
  };
}

interface CgpaUpdatesSectionProps {
  userId: string;
  currentCgpa: number;
}

export function CgpaUpdatesSection({ userId, currentCgpa }: CgpaUpdatesSectionProps) {
  const [updates, setUpdates] = useState<CgpaUpdate[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUpdates = async () => {
    try {
      const response = await fetch(`/api/cgpa-updates?studentId=${userId}`);
      if (response.ok) {
        const data = await response.json();
        setUpdates(data);
      }
    } catch (error) {
      console.error("Failed to fetch CGPA updates:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUpdates();
  }, [userId]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          CGPA Updates
          <CgpaUpdateForm
            studentId={userId}
            currentCgpa={currentCgpa}
            onUpdateSubmitted={fetchUpdates}
          />
        </CardTitle>
        <CardDescription>
          Submit and track your CGPA update requests
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <p>Loading updates...</p>
        ) : updates.length === 0 ? (
          <p>No CGPA updates submitted yet</p>
        ) : (
          <div className="space-y-4">
            {updates.map((update) => (
              <div
                key={update._id}
                className="border p-4 rounded-lg space-y-2"
              >
                <div className="flex justify-between">
                  <span className="font-medium">Semester: {update.semester}</span>
                  <span
                    className={`px-2 py-1 rounded text-sm ${
                      update.status === "approved"
                        ? "bg-green-100 text-green-800"
                        : update.status === "rejected"
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {update.status.charAt(0).toUpperCase() + update.status.slice(1)}
                  </span>
                </div>
                <div className="text-sm text-gray-600">
                  <p>Current CGPA: {update.currentCgpa.toFixed(2)}</p>
                  <p>New CGPA: {update.newCgpa.toFixed(2)}</p>
                  {update.approvedBy && (
                    <p>
                      Reviewed by: {update.approvedBy.first_name}{" "}
                      {update.approvedBy.last_name}
                    </p>
                  )}
                  {update.comments && (
                    <p className="mt-2">Comments: {update.comments}</p>
                  )}
                </div>
                <div className="text-xs text-gray-400">
                  Submitted on {new Date(update.createdAt).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
