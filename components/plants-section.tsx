import { Button } from "@/components/ui/button"

export function PlantsSection() {
  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <div className="aspect-square rounded-full overflow-hidden bg-gradient-to-br from-green-100 to-blue-100 p-8">
              <img
                src="/placeholder-romd4.png"
                alt="Plantas amazónicas y geometría sagrada"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              ¿Qué son las plantas amazónicas y la integración?
            </h2>
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                Las plantas maestras amazónicas son aliados vegetales sagrados que han sido utilizados durante milenios
                por las culturas indígenas para la sanación, el crecimiento espiritual y la conexión con la sabiduría
                ancestral.
              </p>
              <p>
                En nuestros retiros, trabajamos con estas plantas en un contexto ceremonial seguro, acompañados por
                facilitadores experimentados que honran las tradiciones ancestrales mientras proporcionan un marco
                moderno de seguridad y contención.
              </p>
              <p>
                La integración es el proceso fundamental donde las enseñanzas y revelaciones recibidas durante las
                ceremonias se incorporan conscientemente en la vida cotidiana, creando cambios duraderos y
                significativos.
              </p>
            </div>
            <div className="mt-8">
              <Button
                size="lg"
                className="bg-secondary hover:bg-secondary/90 text-secondary-foreground px-8 py-4 text-lg rounded-full"
              >
                Más información
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
