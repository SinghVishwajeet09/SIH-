import { Button } from "@/components/ui/button"
import { ArrowRight, Mail } from "lucide-react"
import Link from "next/link"

export function CTA() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
            Ready to Transform Your Institution?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground text-pretty">
            Start your free trial today and see how Smart Student Hub can revolutionize your student activity management
            and institutional reporting.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="gap-2 w-full sm:w-auto" asChild>
              <Link href="/login">
                Start Free Trial
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="gap-2 w-full sm:w-auto bg-transparent">
              <Mail className="h-4 w-4" />
              Contact Sales
            </Button>
          </div>

          <p className="mt-6 text-sm text-muted-foreground">
            No credit card required • 30-day free trial • Setup in minutes
          </p>
        </div>
      </div>
    </section>
  )
}
