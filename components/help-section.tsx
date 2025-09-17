import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function HelpSection() {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-blue-50 to-purple-50">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <Card className="overflow-hidden shadow-xl">
              <CardContent className="p-0">
                <div className="relative aspect-video bg-gradient-to-br from-purple-900 to-blue-900">
                  <img
                    src="/spiritual-guide-meditation-session.jpg"
                    alt="Sesión de ayuda y orientación espiritual"
                    className="w-full h-full object-cover opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="text-white text-2xl font-bold mb-2">Orientación personalizada</h3>
                    <p className="text-white/80">Acompañamiento individual durante todo el proceso</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">¿En qué te puede ayudar?</h2>
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                Nuestro equipo de facilitadores experimentados te acompañará en cada paso de tu proceso de
                transformación personal y espiritual.
              </p>
              <p>
                Ofrecemos orientación personalizada para ayudarte a integrar las enseñanzas recibidas durante las
                ceremonias en tu vida cotidiana, creando cambios duraderos y significativos.
              </p>
              <ul className="space-y-3 text-base">
                <li className="flex items-start gap-3">
                  <span className="text-primary text-xl">•</span>
                  <span>Preparación pre-ceremonia y establecimiento de intenciones</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary text-xl">•</span>
                  <span>Acompañamiento durante las ceremonias</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary text-xl">•</span>
                  <span>Procesos de integración post-ceremonia</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary text-xl">•</span>
                  <span>Seguimiento y apoyo continuo</span>
                </li>
              </ul>
            </div>
            <div className="mt-8">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg rounded-full"
              >
                Solicitar orientación
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
