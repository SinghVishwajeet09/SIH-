import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Users } from "lucide-react"

const delegations = [
  {
    id: 1,
    delegate: "Dr. Sarah Johnson",
    categories: ["Technical", "Academic"],
    activeUntil: "Dec 31, 2024",
    status: "active",
  },
  {
    id: 2,
    delegate: "Prof. Michael Williams",
    categories: ["Leadership"],
    activeUntil: "Nov 15, 2024",
    status: "active",
  },
]

export function DelegationPanel() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Delegations</CardTitle>
            <CardDescription>Manage approval delegations</CardDescription>
          </div>
          <Button size="sm" variant="outline" className="gap-2 bg-transparent">
            <Plus className="h-4 w-4" />
            Add
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {delegations.map((delegation) => (
            <div key={delegation.id} className="p-3 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium text-sm">{delegation.delegate}</span>
                </div>
                <Badge variant={delegation.status === "active" ? "default" : "secondary"}>{delegation.status}</Badge>
              </div>
              <div className="space-y-1">
                <div className="flex flex-wrap gap-1">
                  {delegation.categories.map((category) => (
                    <Badge key={category} variant="outline" className="text-xs">
                      {category}
                    </Badge>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">Until {delegation.activeUntil}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
