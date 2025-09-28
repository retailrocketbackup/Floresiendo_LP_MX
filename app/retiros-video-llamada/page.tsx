import { HeroSection } from "@/components/hero-section"
import { VideoSection } from "@/components/video-section"
import { ContactSectionCall } from "@/components/contact-section-call"
import { Footer } from "@/components/footer"

export default function RetirosVideoLlamada() {
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
        funnel="video-llamada"
      />
      <ContactSectionCall
        funnel="video"
        title="¿Listo para una Conversación Personal?"
        subtitle="Agenda una llamada gratuita de 15 minutos para conocer más sobre nuestros retiros y resolver todas tus dudas."
        buttonText="Agendar Llamada Gratuita"
      />
      <Footer />
    </main>
  )
}
