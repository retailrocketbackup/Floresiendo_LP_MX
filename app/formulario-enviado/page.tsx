import { HubSpotForm } from "@/components/hubspot-form"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"

export default function HubSpotPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 bg-gradient-to-br from-purple-50 via-white to-purple-50">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Es indispensable una breve llamada para poder participar en nuestros retiros.
            </p>
          </div>

          <div className="flex justify-center">
            <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-8">
              <HubSpotForm />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
