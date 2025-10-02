import { HeroSection } from "@/components/hero-section"
import { VideoSection } from "@/components/video-section"
import { ContactSectionCall } from "@/components/contact-section-call"
import { Footer } from "@/components/footer"

export default function RetirosVideoLlamada() {
  return (
    <main>
      <HeroSection showCTA={true} ctaText="Agendar Llamada Gratuita" ctaLink="/agendar-llamada-video" />
      <VideoSection
        title="IMPORTANTE VER VIDEO"
        subtitle="(48 segundos)"
        description=""
        videoId="pxB7OjWx3KE"
        thumbnail="https://img.youtube.com/vi/pxB7OjWx3KE/maxresdefault.jpg"
        className="bg-background"
        funnel="video-llamada"
      />
      <ContactSectionCall
        funnel="video"
        title="¿Listo para conversar?"
        subtitle="Agenda una llamada gratuita de 15 minutos para conocer más sobre nuestros retiros y resolver todas tus dudas."
        buttonText="Agendar Llamada Gratuita"
      />
      <Footer />
    </main>
  )
}
