import { HeroSection } from "@/components/hero-section"
import { VideoSection } from "@/components/video-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { ContactSectionForm } from "@/components/contact-section-form"
import { Footer } from "@/components/footer"

export default function RetirosTestimoniosFormulario() {
  return (
    <main>
      <HeroSection />
      <VideoSection
        title="IMPORTANTE VER VIDEO"
        subtitle="(48 seg.)"
        description=""
        videoId="pxB7OjWx3KE"
        thumbnail="/placeholder.svg?key=gw58i"
        className="bg-background"
        funnel="testimonios-formulario"
      />
      <TestimonialsSection funnel="testimonios-formulario" />
      <ContactSectionForm
        funnel="testimonios"
        title="¿Listo para Recibir Más Información?"
        subtitle="Después de ver estos testimonios reales, completa el formulario y te contactaremos para brindarte todos los detalles."
        buttonText="Solicitar Información"
      />
      <Footer />
    </main>
  )
}
