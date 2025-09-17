import { Button } from "@/components/ui/button"

export function LiberationSection() {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-purple-50 to-blue-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Un espacio de liberación</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Rodeado de la naturaleza exuberante de Morelos, nuestro espacio sagrado te invita a soltar y renacer
          </p>
        </div>

        {/* Nature images grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="aspect-square rounded-lg overflow-hidden">
            <img
              src="/placeholder-4dfp6.png"
              alt="Espacio de meditación en la naturaleza"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="aspect-square rounded-lg overflow-hidden">
            <img
              src="/placeholder-cg9lw.png"
              alt="Círculo sagrado de ceremonia"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="aspect-square rounded-lg overflow-hidden">
            <img
              src="/placeholder-y8a5z.png"
              alt="Jardín de plantas medicinales"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>

        <div className="text-center">
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg rounded-full"
          >
            Conoce nuestro espacio
          </Button>
        </div>
      </div>
    </section>
  )
}
