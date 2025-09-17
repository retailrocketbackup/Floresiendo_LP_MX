import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { LiberationSection } from "@/components/liberation-section"
import { PlantsSection } from "@/components/plants-section"
import { VideoSection } from "@/components/video-section"
import { HelpSection } from "@/components/help-section"
import { ScheduleSection } from "@/components/schedule-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { EncountersSection } from "@/components/encounters-section"
import { FAQSection } from "@/components/faq-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main>
      <HeroSection />
      <FeaturesSection />
      <LiberationSection />
      <PlantsSection />
      <VideoSection
        title="Experiencia transformadora"
        description="Descubre testimonios reales de participantes que han vivido esta experiencia de sanación y crecimiento personal"
        videoId="dQw4w9WgXcQ"
        thumbnail="/placeholder.svg?key=gw58i"
        className="bg-background"
      />
      <HelpSection />
      <ScheduleSection />
      <TestimonialsSection />
      <EncountersSection />
      <FAQSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
