// app/retiros-video-llamada/page.tsx

import { HeroSection } from "@/components/hero-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { CustomContactForm } from "@/components/custom-contact-form";
import { AboutSection } from "@/components/about-section";
import { Footer } from "@/components/footer";

export default function RetirosVideoLlamada() {
  return (
    <main>
      {/* Llamada simplificada y el ctaLink apunta al ID correcto */}
      <HeroSection ctaLink="#testimonios" />

      {/* La sección de testimonios ahora tiene el ID correcto */}
    <section id="testimonios" className="bg-gray-50 min-h-screen flex flex-col justify-center px-4">
      <TestimonialsSection funnel="video" />
    </section>

      <section id="about" className="bg-purple-900 min-h-screen flex flex-col justify-center py-20 px-4">
        <AboutSection />
      </section>

      <section id="contacto" className="bg-gray-50 min-h-screen flex flex-col px-4 pt-20 pb-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-purple-900 mb-4">¿Interesado/a? Da el primer paso</h2>
          <p className="text-xl text-muted-purple-900 max-w-2xl mx-auto">El viaje más importante empieza con una conversación. Déjanos tus datos y escríbenos por WhatsApp para conocerte y guiarte.</p>
        </div>
        <CustomContactForm funnel="video" />
      </section>

      <Footer />

    </main>
  );
}