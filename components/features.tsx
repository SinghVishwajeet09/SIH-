import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, CheckCircle, FileText, Award, TrendingUp } from "lucide-react"

const features = [
  {
    icon: BarChart3,
    title: "Student Dashboard",
    description:
      "Real-time academic performance tracking, activity timeline, portfolio preview, and personalized goal tracking for comprehensive student development.",
    benefits: ["Real-time performance metrics", "Activity timeline view", "Goal tracking system", "Portfolio preview"],
  },
  {
    icon: FileText,
    title: "Activity Management",
    description:
      "Multi-category support for academic, extracurricular, professional, and volunteer activities with document upload and verification workflows.",
    benefits: ["Multi-category support", "Document upload system", "Verification workflows", "Credit assignment"],
  },
  {
    icon: CheckCircle,
    title: "Faculty Approval Panel",
    description:
      "Streamlined review queue with bulk actions, verification tools, comprehensive feedback system, and delegation capabilities for efficient management.",
    benefits: ["Review queue management", "Bulk approval actions", "Feedback system", "Delegation capabilities"],
  },
  {
    icon: TrendingUp,
    title: "Analytics & Reporting",
    description:
      "Individual student metrics, institutional reports, trend analysis, custom dashboards, and downloadable portfolios for comprehensive insights.",
    benefits: ["Individual metrics", "Institutional reports", "Trend analysis", "Downloadable portfolios"],
  },
]

export function Features() {
  return (
    <section id="features" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
            Comprehensive Features for Modern Education
          </h2>
          <p className="mt-4 text-lg text-muted-foreground text-pretty">
            Everything you need to manage student activities, approvals, and institutional reporting in one powerful
            platform.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <feature.icon className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </div>
                <CardDescription className="text-base leading-relaxed">{feature.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {feature.benefits.map((benefit, benefitIndex) => (
                    <li key={benefitIndex} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Award className="h-4 w-4 text-primary flex-shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
