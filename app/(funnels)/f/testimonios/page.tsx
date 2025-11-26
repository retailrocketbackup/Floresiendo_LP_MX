import { HeroSection } from "@/components/hero-section"
import { VideoSection } from "@/components/video-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { ContactSection } from "@/components/contact-section"

export const metadata = {
  title: "Testimonios de Transformación | FloreSiendo México",
  description: "Conoce las historias de transformación de quienes han vivido nuestros retiros.",
};

export default function FunnelTestimoniosPage() {
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
        funnel="testimonios"
      />
      <TestimonialsSection funnel="testimonios" />
      <ContactSection funnel="testimonios" />
    </main>
  )
}
