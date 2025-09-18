// app/formulario-enviado/page.tsx

import { HubSpotForm } from "@/components/hubspot-form"
import { Footer } from "@/components/footer"

export default function HubSpotPage() {

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

        <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-purple-50 to-white p-4">
          <div className="w-full max-w-md">
            {/* Aquí puedes agregar tus scripts de tracking para HubSpot */}
            <HubSpotForm />
          </div>
        </div>

      </div>

      <Footer />
    </main>
  )
}
