import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, XCircle } from "lucide-react"

const recentApprovals = [
  {
    student: "Alice Cooper",
    activity: "Research Paper",
    action: "approved",
    credits: 8.5,
    date: "Today",
  },
  {
    student: "Bob Wilson",
    activity: "Leadership Role",
    action: "approved",
    credits: 6.0,
    date: "Yesterday",
  },
  {
    student: "Carol Davis",
    activity: "Volunteer Work",
    action: "rejected",
    credits: 0,
    date: "2 days ago",
  },
]

export function RecentApprovals() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Actions</CardTitle>
        <CardDescription>Your latest approval decisions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {recentApprovals.map((approval, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {approval.action === "approved" ? (
                  <CheckCircle className="h-4 w-4 text-green-600" />
                ) : (
                  <XCircle className="h-4 w-4 text-red-600" />
                )}
                <div>
                  <div className="font-medium text-sm">{approval.student}</div>
                  <div className="text-xs text-muted-foreground">{approval.activity}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium">
                  {approval.action === "approved" ? approval.credits : "0"} credits
                </div>
                <div className="text-xs text-muted-foreground">{approval.date}</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
