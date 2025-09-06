"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarDays, MapPin, Clock, Users2 } from "lucide-react";

const upcomingEvents = [
  {
    id: 1,
    title: "Tech Talk: Future of AI in Education",
    date: "2025-09-12",
    time: "2:00 PM - 3:30 PM",
    location: "Auditorium A, Main Campus",
    speaker: "Dr. Sarah Chen, MIT",
    category: "Academic",
    attendees: 156,
    maxAttendees: 200,
    description: "Explore how artificial intelligence is revolutionizing educational methodologies and student engagement."
  },
  {
    id: 2,
    title: "Career Fair 2025",
    date: "2025-09-18",
    time: "10:00 AM - 4:00 PM",
    location: "Student Center, Hall B",
    speaker: "Multiple Companies",
    category: "Career",
    attendees: 340,
    maxAttendees: 500,
    description: "Meet with representatives from 50+ top companies including Google, Microsoft, and local startups."
  },
  {
    id: 3,
    title: "Startup Pitch Competition",
    date: "2025-09-25",
    time: "6:00 PM - 9:00 PM",
    location: "Innovation Hub",
    speaker: "Venture Capitalists Panel",
    category: "Competition",
    attendees: 89,
    maxAttendees: 150,
    description: "Present your startup ideas to real VCs. $25,000 in seed funding available for winners."
  },
  {
    id: 4,
    title: "Alumni Networking Night",
    date: "2025-10-02",
    time: "7:00 PM - 10:00 PM",
    location: "University Club",
    speaker: "Class of 2015-2020",
    category: "Networking",
    attendees: 67,
    maxAttendees: 120,
    description: "Connect with successful alumni working in top tech companies and startups worldwide."
  }
];

export function UpcomingEvents() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CalendarDays className="h-5 w-5" />
          Upcoming Events
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {upcomingEvents.map((event) => (
          <div
            key={event.id}
            className="border rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="font-semibold text-sm">{event.title}</h4>
                <p className="text-xs text-gray-600 mt-1">{event.description}</p>
              </div>
              <Badge variant="outline" className="text-xs">
                {event.category}
              </Badge>
            </div>
            
            <div className="space-y-2 mb-3">
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <CalendarDays className="h-3 w-3" />
                {new Date(event.date).toLocaleDateString()} at {event.time}
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <MapPin className="h-3 w-3" />
                {event.location}
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <Users2 className="h-3 w-3" />
                {event.attendees}/{event.maxAttendees} registered
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">
                Speaker: {event.speaker}
              </span>
              <Button size="sm" variant="outline" className="text-xs">
                Register
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
