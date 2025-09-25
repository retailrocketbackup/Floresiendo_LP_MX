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
            Para participar en nuestros retiros es indispensable una breve llamada.
          </p>
        </div>

        <CalendlyWidget funnel="video" />
      </div>
      <Footer />
    </div>
  )
}
