import { HeroSection } from "@/components/hero-section"
import { VideoSection } from "@/components/video-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main>
      <HeroSection />
      <VideoSection
        title="Experiencia transformadora"
        description="Descubre testimonios reales de participantes que han vivido esta experiencia de sanación y crecimiento personal"
        videoId="pxB7OjWx3KE"
        thumbnail="/placeholder.svg?key=gw58i"
        className="bg-background"
      />
      <ContactSection />
      <Footer />
    </main>
  )
}
