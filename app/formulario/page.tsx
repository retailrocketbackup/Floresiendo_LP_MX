import { HubSpotForm } from "@/components/hubspot-form"
import { SimpleHeader } from "@/components/simple-header"
import { Footer } from "@/components/footer"

export default function FormularioPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <SimpleHeader />
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Más Información sobre FloreSiendo</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Completa el formulario para ser contactado por nuestro equipo de asesores para nuestros retiros de sanación y
              transformación personal.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <HubSpotForm />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
