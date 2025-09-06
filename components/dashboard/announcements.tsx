"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, Trophy, BookOpen } from "lucide-react";

const announcements = [
  {
    id: 1,
    title: "Fall 2025 Portfolio Submission Deadline",
    description: "Students must submit their activity portfolios by November 15th for fall semester evaluation.",
    type: "deadline",
    date: "2025-11-15",
    priority: "high",
    icon: Calendar
  },
  {
    id: 2,
    title: "Annual Innovation Challenge 2025",
    description: "Registration now open for the university's biggest innovation competition. $10,000 in prizes!",
    type: "competition",
    date: "2025-10-01",
    priority: "medium",
    icon: Trophy
  },
  {
    id: 3,
    title: "New Mentorship Program Launch",
    description: "Connect with industry professionals through our new AI-powered mentorship matching system.",
    type: "program",
    date: "2025-09-20",
    priority: "medium",
    icon: Users
  },
  {
    id: 4,
    title: "Digital Skills Workshop Series",
    description: "Free workshops on machine learning, blockchain, and cybersecurity. Register now!",
    type: "workshop",
    date: "2025-09-25",
    priority: "low",
    icon: BookOpen
  }
];

export function Announcements() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          📢 Latest Announcements
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {announcements.map((announcement) => {
          const Icon = announcement.icon;
          return (
            <div
              key={announcement.id}
              className="flex items-start gap-3 p-3 rounded-lg border hover:bg-gray-50 transition-colors"
            >
              <div className="p-2 rounded-full bg-blue-100">
                <Icon className="h-4 w-4 text-blue-600" />
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-sm">{announcement.title}</h4>
                  <Badge 
                    variant={announcement.priority === 'high' ? 'destructive' : 
                            announcement.priority === 'medium' ? 'default' : 'secondary'}
                    className="text-xs"
                  >
                    {announcement.priority}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600">{announcement.description}</p>
                <p className="text-xs text-gray-500">Due: {new Date(announcement.date).toLocaleDateString()}</p>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
