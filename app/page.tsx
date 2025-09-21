import { HeroSection } from "@/components/hero-section"
import { VideoSection } from "@/components/video-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main>
      <HeroSection />
      <VideoSection
        title="¡¡MIRA EL VIDEO (48 segundos)!!"
        description="Antes de solicitar información mira el video"
        videoId="pxB7OjWx3KE"
        thumbnail="/placeholder.svg?key=gw58i"
        className="bg-background"
      />
      <ContactSection />
      <Footer />
    </main>
  )
}
