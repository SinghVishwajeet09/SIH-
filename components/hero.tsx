import { Button } from "@/components/ui/button"
import { ArrowRight, Play } from "lucide-react"
import Link from "next/link"

export function Hero() {
  return (
    <section className="relative py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl text-balance">
            Centralized Digital Platform for <span className="text-primary">Student Excellence</span>
          </h1>

          <p className="mt-6 text-lg leading-8 text-muted-foreground text-pretty max-w-2xl mx-auto">
            Streamline student activity tracking, faculty approvals, and institutional reporting with our comprehensive
            platform designed specifically for Higher Education Institutions.
          </p>

          <div className="mt-10 flex items-center justify-center gap-4">
            <Button size="lg" className="gap-2" asChild>
              <Link href="/login">
                Start Free Trial
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="gap-2 bg-transparent">
              <Play className="h-4 w-4" />
              Watch Demo
            </Button>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3 lg:gap-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">500+</div>
              <div className="text-sm text-muted-foreground">Universities Trust Us</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">50K+</div>
              <div className="text-sm text-muted-foreground">Active Students</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">99.9%</div>
              <div className="text-sm text-muted-foreground">Uptime Guarantee</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
