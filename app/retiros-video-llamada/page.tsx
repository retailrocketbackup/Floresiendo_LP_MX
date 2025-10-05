// app/retiros-video-llamada/page.tsx

import { HeroSection } from "@/components/hero-section";
import { VideoSection } from "@/components/video-section";
import { ContactSectionCall } from "@/components/contact-section-call";
import { Footer } from "@/components/footer";
import { CalendlyWidget } from "@/components/calendly-widget"; // Importamos el widget

export default function RetirosVideoLlamada() {
  return (
    <main>
      {/* 1. Hero Section (con el primer botón) */}
      <HeroSection 
        showCTA={true}  
        ctaLink="#agendar" // Apunta a la sección del calendario
      />

      {/* 2. Sección del Video */}
      <VideoSection
        title="IMPORTANTE VER VIDEO"
        subtitle="(48 segundos)"
        description=""
        videoId="pxB7OjWx3KE"
        thumbnail="https://img.youtube.com/vi/pxB7OjWx3KE/maxresdefault.jpg"
        className="bg-background"
        funnel="video-llamada"
      />

      {/* 3. Sección del Calendario (la herramienta de acción) */}
      <section id="agendar" className="py-20">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">Agenda tu Llamada Gratuita</h2>
        <CalendlyWidget funnel="video" />
      </section>

      {/* 4. Último llamado a la acción (con el segundo botón) */}
      <ContactSectionCall
        funnel="video"
        title="¿Listo para conversar?"
        subtitle="Agenda una llamada gratuita de 15 minutos para conocer más sobre nuestros retiros y resolver todas tus dudas."
        buttonText="Agendar Llamada Gratuita"
      />

      {/* 5. Footer */}
      <Footer />
    </main>
  );
}
