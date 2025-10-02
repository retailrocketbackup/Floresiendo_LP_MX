import { HeroSection } from "@/components/hero-section"
import { VideoSection } from "@/components/video-section"
import { ContactSectionForm } from "@/components/contact-section-form"
import { Footer } from "@/components/footer"

export default function RetirosVideoFormulario() {
  return (
    <main>
      <HeroSection />
      <VideoSection
        title="IMPORTANTE VER VIDEO"
        subtitle="(48 seg.)"
        description=""
        videoId="pxB7OjWx3KE"
        thumbnail="https://img.youtube.com/vi/pxB7OjWx3KE/maxresdefault.jpg"
        className="bg-background"
        funnel="video-formulario"
      />
      <ContactSectionForm
        funnel="video"
        title="¿Listo para Recibir Más Información?"
        subtitle="Completa el formulario y te contactaremos para brindarte todos los detalles sobre nuestros retiros de transformación."
        buttonText="Solicitar Información"
      />
      <Footer />
    </main>
  )
}
