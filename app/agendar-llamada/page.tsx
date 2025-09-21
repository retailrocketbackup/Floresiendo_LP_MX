import { CalendlyWidget } from "@/components/calendly-widget"
import { SimpleHeader } from "@/components/simple-header"
import { Footer } from "@/components/footer"

export default function AgendarLlamadaPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <SimpleHeader />
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Agenda tu Llamada</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Reserva una llamada de 15 minutos para conocer más sobre nuestros retiros de transformación personal.
          </p>
        </div>

        <CalendlyWidget />
      </div>
      <Footer />
    </div>
  )
}
