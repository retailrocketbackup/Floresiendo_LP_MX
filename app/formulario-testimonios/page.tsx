import { CustomContactForm } from "@/components/custom-contact-form"
import { SimpleHeader } from "@/components/simple-header"
import { Footer } from "@/components/footer"

export default function FormularioPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <SimpleHeader />
      <div className="container mx-auto px-4 pt-12 pb-16">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contáctanos</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Por favor rellena el formulario y a la brevedad uno de nuestros asesores te contactará
          </p>
        </div>

        <CustomContactForm funnel="testimonios" />
      </div>
      <Footer />
    </div>
  )
}
