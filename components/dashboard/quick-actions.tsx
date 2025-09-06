"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  PlusCircle, 
  Download, 
  MessageSquare, 
  Calendar,
  Users,
  Award,
  FileText,
  Zap
} from "lucide-react";

const quickActions = [
  {
    id: 1,
    title: "Add Activity",
    description: "Log a new extracurricular activity",
    icon: PlusCircle,
    color: "text-green-600",
    bgColor: "bg-green-100",
    href: "/activities"
  },
  {
    id: 2,
    title: "Download Portfolio",
    description: "Export your complete portfolio",
    icon: Download,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
    href: "/portfolio"
  },
  {
    id: 3,
    title: "Join Study Group",
    description: "Find or create study groups",
    icon: Users,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
    href: "#"
  },
  {
    id: 4,
    title: "Book Counseling",
    description: "Schedule academic counseling",
    icon: Calendar,
    color: "text-orange-600",
    bgColor: "bg-orange-100",
    href: "#"
  },
  {
    id: 5,
    title: "Apply for Award",
    description: "Submit scholarship applications",
    icon: Award,
    color: "text-yellow-600",
    bgColor: "bg-yellow-100",
    href: "#"
  },
  {
    id: 6,
    title: "Faculty Feedback",
    description: "Request feedback on activities",
    icon: MessageSquare,
    color: "text-indigo-600",
    bgColor: "bg-indigo-100",
    href: "#"
  }
];

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5" />
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Button
                key={action.id}
                variant="ghost"
                className="h-auto p-3 flex flex-col items-start gap-2 text-left hover:bg-gray-50"
                asChild
              >
                <a href={action.href}>
                  <div className={`p-2 rounded-full ${action.bgColor}`}>
                    <Icon className={`h-4 w-4 ${action.color}`} />
                  </div>
                  <div>
                    <p className="font-medium text-xs">{action.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{action.description}</p>
                  </div>
                </a>
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
