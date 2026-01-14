import { Card, CardContent } from "@/components/ui/card"

export function FeaturesSection() {
  const features = [
    {
      title: "Sabiduría Ancestral",
      description:
        "Conecta con prácticas ancestrales en un entorno seguro y sagrado, guiado por facilitadores experimentados.",
      icon: "🌿",
    },
    {
      title: "Integración transcendente",
      description: "Procesos de integración profunda que te permiten incorporar las enseñanzas en tu vida cotidiana.",
      icon: "✨",
    },
    {
      title: "Experiencia segura y consciente",
      description: "Acompañamiento profesional y protocolos de seguridad para una experiencia de desarrollo personal profundo.",
      icon: "🛡️",
    },
  ]

  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Una experiencia transformadora</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Descubre un camino hacia el bienestar integral y el crecimiento personal a través de prácticas ancestrales
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8 text-center">
                <div className="text-4xl mb-6">{feature.icon}</div>
                <h3 className="text-2xl font-bold text-card-foreground mb-4">{feature.title}</h3>
                <p className="text-muted-foreground text-pretty leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
