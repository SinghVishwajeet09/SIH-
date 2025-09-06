import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, GraduationCap, Building } from "lucide-react"

const benefits = [
  {
    icon: GraduationCap,
    title: "For Students",
    description: "Take control of your academic journey",
    features: [
      "Track all activities in one place",
      "Monitor progress toward goals",
      "Generate professional portfolios",
      "Receive real-time feedback",
      "Access comprehensive analytics",
    ],
  },
  {
    icon: Users,
    title: "For Faculty",
    description: "Streamline approval processes",
    features: [
      "Efficient review workflows",
      "Bulk approval capabilities",
      "Delegation management",
      "Comprehensive feedback tools",
      "Performance insights",
    ],
  },
  {
    icon: Building,
    title: "For Institutions",
    description: "Gain institutional insights",
    features: [
      "Institution-wide reporting",
      "Trend analysis and metrics",
      "Compliance tracking",
      "Custom dashboard creation",
      "Data-driven decision making",
    ],
  },
]

export function Benefits() {
  return (
    <section id="benefits" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
            Benefits for Every Stakeholder
          </h2>
          <p className="mt-4 text-lg text-muted-foreground text-pretty">
            Our platform is designed to serve the unique needs of students, faculty, and institutions.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {benefits.map((benefit, index) => (
            <Card key={index} className="text-center border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <benefit.icon className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl">{benefit.title}</CardTitle>
                <p className="text-muted-foreground">{benefit.description}</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-left">
                  {benefit.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-2 text-sm">
                      <div className="mt-1 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                      {feature}
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
