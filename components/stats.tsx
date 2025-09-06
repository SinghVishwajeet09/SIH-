export function Stats() {
  const stats = [
    { label: "Student Satisfaction", value: "98%" },
    { label: "Time Saved", value: "75%" },
    { label: "Approval Efficiency", value: "90%" },
    { label: "Data Accuracy", value: "99.5%" },
  ]

  return (
    <section className="py-20 bg-primary/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">Proven Results</h2>
          <p className="mt-4 text-lg text-muted-foreground text-pretty">
            Join hundreds of institutions already transforming their student activity management.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl font-bold text-primary">{stat.value}</div>
              <div className="mt-2 text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
