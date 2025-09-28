import { HeroSection } from "@/components/hero-section"
import { VideoSection } from "@/components/video-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { ContactSectionCall } from "@/components/contact-section-call"
import { Footer } from "@/components/footer"

export default function RetirosTestimoniosLlamada() {
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
        funnel="testimonios-llamada"
      />
      <TestimonialsSection funnel="testimonios-llamada" />
      <ContactSectionCall
        funnel="testimonios"
        title="¿Listo para una Conversación Personal?"
        subtitle="Después de ver estos testimonios reales, agenda una llamada gratuita para conocer más sobre tu transformación."
        buttonText="Agendar Llamada Gratuita"
      />
      <Footer />
    </main>
  )
}
