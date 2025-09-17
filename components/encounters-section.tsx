import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function EncountersSection() {
  const encounters = [
    {
      title: "Encuentro de Integración",
      date: "15 de Octubre, 2024",
      description: "Sesión grupal para compartir experiencias y profundizar en el proceso de integración",
      image: "/placeholder.svg?key=enc1",
    },
    {
      title: "Círculo de Medicina",
      date: "22 de Octubre, 2024",
      description: "Ceremonia especial con plantas maestras para participantes avanzados",
      image: "/placeholder.svg?key=enc2",
    },
    {
      title: "Taller de Respiración",
      date: "29 de Octubre, 2024",
      description: "Técnicas de respiración consciente para el trabajo interior",
      image: "/placeholder.svg?key=enc3",
    },
    {
      title: "Retiro de Silencio",
      date: "5 de Noviembre, 2024",
      description: "Experiencia de introspección profunda en contacto con la naturaleza",
      image: "/placeholder.svg?key=enc4",
    },
  ]

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-blue-50 to-purple-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Encuentros 2024</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Próximos eventos y actividades para continuar tu proceso de crecimiento
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {encounters.map((encounter, index) => (
            <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
              <div className="aspect-square overflow-hidden">
                <img
                  src={encounter.image || "/placeholder.svg"}
                  alt={encounter.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-2 text-card-foreground">{encounter.title}</h3>
                <p className="text-primary font-semibold text-sm mb-3">{encounter.date}</p>
                <p className="text-muted-foreground text-sm leading-relaxed">{encounter.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg rounded-full"
          >
            Ver todos los encuentros
          </Button>
        </div>
      </div>
    </section>
  )
}
