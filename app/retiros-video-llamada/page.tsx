// app/retiros-video-llamada/page.tsx

import { HeroSection } from "@/components/hero-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { CustomContactForm } from "@/components/custom-contact-form";
import { Footer } from "@/components/footer";

export default function RetirosVideoLlamada() {
  return (
    <main>
      {/* Llamada simplificada y el ctaLink apunta al ID correcto */}
      <HeroSection ctaLink="#testimonios" />

      {/* La sección de testimonios ahora tiene el ID correcto */}
      <section id="testimonios" className="py-20 bg-gray-50">
        <TestimonialsSection funnel="video" />
      </section>

      <section id="contacto" className="py-20 bg-gray-50">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">¿Interesado/a? Da el primer paso</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Déjanos tus datos y uno de nuestros guías se pondrá en contacto contigo a la brevedad.</p>
        </div>
        <CustomContactForm funnel="video" />
      </section>

      <Footer />
    </main>
  );
}