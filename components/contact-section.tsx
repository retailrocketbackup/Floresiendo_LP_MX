import { Button } from "@/components/ui/button"
import Link from "next/link"

interface ContactSectionProps {
  funnel: string
}

export function ContactSection({ funnel }: ContactSectionProps) {
  return (
    <section className="py-20 bg-gradient-to-b from-purple-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">¿Listo para tu Transformación?</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Mira el video primero y conecta con nosotros para comenzar tu viaje de sanación y crecimiento personal.
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6 max-w-2xl mx-auto">
          {/* Botón para la página de formulario */}
          <Link href={`/formulario-${funnel}`} passHref>
            <Button
              size="lg"
              className="w-64 py-4 text-lg rounded-full text-white hover:opacity-90 shadow-lg hover:shadow-xl transition-all duration-300"
              style={{ backgroundColor: "#5A2D5A" }} // Changed to vibrant dark purple
            >
              Más Información
            </Button>
          </Link>

          {/* Botón para agendar llamada en Calendly */}
          <Link href={`/agendar-llamada-${funnel}`} passHref>
            <Button
              size="lg"
              className="w-64 py-4 text-lg rounded-full text-white hover:opacity-90 shadow-lg hover:shadow-xl transition-all duration-300"
              style={{ backgroundColor: "#5A2D5A" }}
            >
              Agendar Llamada
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
