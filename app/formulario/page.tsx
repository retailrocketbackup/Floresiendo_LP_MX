import { HubSpotForm } from "@/components/hubspot-form"
import { SimpleHeader } from "@/components/simple-header"
import { Footer } from "@/components/footer"

export default function FormularioPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <SimpleHeader />
      <HubSpotForm />
      <Footer />
    </div>
  )
}
