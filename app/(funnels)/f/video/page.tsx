import { HeroSection } from "@/components/hero-section"
import { VideoSection } from "@/components/video-section"
import { ContactSection } from "@/components/contact-section"

export const metadata = {
  title: "Retiros Transformadores | FloreSiendo México",
  description: "Descubre cómo nuestros retiros pueden transformar tu vida. Conoce la historia de Edgar.",
};

export default function FunnelVideoPage() {
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
        funnel="video"
      />
      <ContactSection funnel="video" />
    </main>
  )
}
