"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Star, Award, Zap, Target, Users } from "lucide-react";

const achievements = [
  {
    id: 1,
    title: "Research Pioneer",
    description: "Published first research paper",
    icon: Trophy,
    color: "text-yellow-600",
    bgColor: "bg-yellow-100",
    earned: true,
    earnedDate: "2025-08-15"
  },
  {
    id: 2,
    title: "Leadership Legend",
    description: "Led 3+ successful projects",
    icon: Star,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
    earned: true,
    earnedDate: "2025-07-20"
  },
  {
    id: 3,
    title: "Community Champion",
    description: "100+ volunteer hours",
    icon: Users,
    color: "text-green-600",
    bgColor: "bg-green-100",
    earned: true,
    earnedDate: "2025-06-10"
  },
  {
    id: 4,
    title: "Skill Collector",
    description: "Master 10+ skills",
    icon: Zap,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
    earned: true,
    earnedDate: "2025-05-25"
  },
  {
    id: 5,
    title: "Innovation Award",
    description: "Win innovation competition",
    icon: Award,
    color: "text-red-600",
    bgColor: "bg-red-100",
    earned: false,
    progress: 75
  },
  {
    id: 6,
    title: "Goal Achiever",
    description: "Complete 5 major goals",
    icon: Target,
    color: "text-indigo-600",
    bgColor: "bg-indigo-100",
    earned: false,
    progress: 60
  }
];

interface AchievementBadgesProps {
  userId: number;
}

export function AchievementBadges({ userId }: AchievementBadgesProps) {
  const earnedAchievements = achievements.filter(a => a.earned);
  const inProgressAchievements = achievements.filter(a => !a.earned);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-5 w-5" />
          Achievement Badges
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Earned Badges */}
        <div>
          <h4 className="font-medium text-sm mb-3">Earned ({earnedAchievements.length})</h4>
          <div className="grid grid-cols-2 gap-3">
            {earnedAchievements.map((achievement) => {
              const Icon = achievement.icon;
              return (
                <div
                  key={achievement.id}
                  className="flex flex-col items-center p-3 rounded-lg border bg-gray-50"
                >
                  <div className={`p-2 rounded-full ${achievement.bgColor} mb-2`}>
                    <Icon className={`h-5 w-5 ${achievement.color}`} />
                  </div>
                  <h5 className="font-medium text-xs text-center">{achievement.title}</h5>
                  <p className="text-xs text-gray-600 text-center mt-1">
                    {achievement.description}
                  </p>
                  {achievement.earnedDate && (
                    <Badge variant="secondary" className="text-xs mt-2">
                      {new Date(achievement.earnedDate).toLocaleDateString()}
                    </Badge>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* In Progress */}
        <div>
          <h4 className="font-medium text-sm mb-3">In Progress</h4>
          <div className="space-y-3">
            {inProgressAchievements.map((achievement) => {
              const Icon = achievement.icon;
              return (
                <div
                  key={achievement.id}
                  className="flex items-center gap-3 p-3 rounded-lg border opacity-60"
                >
                  <div className={`p-2 rounded-full ${achievement.bgColor}`}>
                    <Icon className={`h-4 w-4 ${achievement.color}`} />
                  </div>
                  <div className="flex-1">
                    <h5 className="font-medium text-xs">{achievement.title}</h5>
                    <p className="text-xs text-gray-600">{achievement.description}</p>
                    {achievement.progress && (
                      <div className="mt-2">
                        <div className="flex justify-between text-xs">
                          <span>Progress</span>
                          <span>{achievement.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                          <div 
                            className="bg-blue-600 h-1.5 rounded-full" 
                            style={{ width: `${achievement.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
