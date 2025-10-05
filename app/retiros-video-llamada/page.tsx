// app/retiros-video-llamada/page.tsx

import { HeroSection } from "@/components/hero-section";
import { VideoSection } from "@/components/video-section";
import { ContactSectionCall } from "@/components/contact-section-call";
import { Footer } from "@/components/footer";
import { CalendlyWidget } from "@/components/calendly-widget";

export default function RetirosVideoLlamada() {
  return (
    <main>
      <HeroSection 
        showCTA={true} 
        ctaLink="#agendar"
      />

      <VideoSection
        title="IMPORTANTE VER VIDEO"
        subtitle="(48 segundos)"
        description=""
        videoId="pxB7OjWx3KE"
        thumbnail="https://img.youtube.com/vi/pxB7OjWx3KE/maxresdefault.jpg"
        className="bg-background"
        funnel="video-llamada"
      />
      
      <section id="agendar" className="py-20 bg-gray-50">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">Da el Siguiente Paso</h2>
        <CalendlyWidget funnel="video" />
      </section>

      <ContactSectionCall
        funnel="video"
        buttonText="Agendar Mi Llamada Gratuita"
      />

      <Footer />
    </main>
  );
}