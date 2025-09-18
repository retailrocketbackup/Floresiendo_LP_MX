import { CalendlyEmbed } from "@/components/calendly-embed"
import { Footer } from "@/components/footer"

export default function AgendaLlamadaPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Agenda tu Consulta Gratuita
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Habla directamente con nuestros facilitadores para resolver todas tus dudas sobre los retiros FloreSiendo
          </p>
        </div>

        <CalendlyEmbed />
      </div>

      <Footer />
    </main>
  )
}