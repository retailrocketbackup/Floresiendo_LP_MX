import Image from "next/image";
import Link from "next/link";
import { Heart, Users, Leaf, Calendar, ArrowRight, Star, Shield, Clock, Sparkles } from "lucide-react";
import { VideoTestimonial } from "@/components/video-testimonial";
import { AnimatedStats } from "@/components/animated-stats";
import { FAQAccordion } from "@/components/faq-accordion";
import { TeamCarousel } from "@/components/team-carousel";
import { ScrollAnimate } from "@/components/scroll-animate";
import { CommunityCarousel } from "@/components/community-carousel";

export default function HomePage() {
  return (
    <main>
      {/* Hero Section - Full screen with overlay */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/cosmic-spiritual-background.webp"
            alt="Transformación espiritual"
            fill
            priority
            sizes="100vw"
            className="object-cover scale-105 animate-[scale-in_20s_ease-out_forwards]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-burgundy/70 via-burgundy/50 to-burgundy/80" />
        </div>

        {/* Floating decorative elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-coral/20 rounded-full blur-3xl animate-pulse-soft" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gold/20 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/3 right-20 w-24 h-24 bg-burgundy/15 rounded-full blur-2xl animate-float" style={{ animationDelay: "2s" }} />

        <div className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto pt-20">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-8 animate-fade-in border border-white/20">
            <Sparkles size={16} className="text-gold" />
            <span className="text-sm font-medium">+10 años de experiencia</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 drop-shadow-2xl animate-slide-up">
            Retiros y Escuela donde la maestra es el{" "}
            <span className="text-coral relative">
              Amor
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-coral/50 rounded-full" />
            </span>
          </h1>

          <p className="text-lg md:text-xl mb-10 text-white/80 max-w-3xl mx-auto animate-slide-up leading-relaxed" style={{ animationDelay: "0.1s" }}>
            Facilitamos experiencias transformadoras a través de la sabiduría
            ancestral en un entorno seguro y sagrado en México.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: "0.3s" }}>
            <Link href="/encuentros" className="btn-primary hover-shine group">
              Ver próximos encuentros
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/escuela"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold bg-white/10 hover:bg-white/20 text-white border border-white/30 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-white/50"
            >
              Conoce la escuela
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="py-6 bg-warm-gray-50 border-y border-warm-gray-100">
        <div className="section-container">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 text-warm-gray-500">
            {[
              { icon: Shield, text: "Entorno seguro" },
              { icon: Users, text: "+1,000 participantes" },
              { icon: Clock, text: "Experiencia de 3 noches" },
              { icon: Star, text: "Equipo certificado" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-sm">
                <item.icon size={18} className="text-coral" />
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Help With */}
      <section className="section-padding bg-warm-white">
        <div className="section-container">
          <ScrollAnimate animation="fade-up" className="text-center mb-16">
            <p className="text-coral font-semibold mb-3 uppercase tracking-wide text-sm">Nuestro acompañamiento</p>
            <h2 className="text-burgundy mb-6">Te acompañamos en tu proceso</h2>
            <p className="text-warm-gray-600 max-w-3xl mx-auto">
              Conectamos a las personas con su sentimiento de inocencia esencial,
              su dignidad y sentido de merecimiento y valía intrínseca.
            </p>
          </ScrollAnimate>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Heart,
                title: "Bienestar Emocional",
                description: "Ansiedad, depresión, PTSD, trauma, fobias, duelo y crisis existenciales.",
                bgColor: "bg-coral/10",
                textColor: "text-coral",
              },
              {
                icon: Users,
                title: "Relaciones",
                description: "Sanar vínculos, resolver conflictos familiares y encontrar conexiones auténticas.",
                bgColor: "bg-burgundy/10",
                textColor: "text-burgundy",
              },
              {
                icon: Leaf,
                title: "Transformación Personal",
                description: "Adicciones, trastornos alimenticios, TOC y patrones limitantes de vida.",
                bgColor: "bg-gold/10",
                textColor: "text-gold",
              },
            ].map((item, index) => (
              <ScrollAnimate key={index} animation="fade-up" delay={index * 100}>
                <div className="card-interactive p-8 text-center group h-full">
                  <div className={`w-16 h-16 ${item.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                    <item.icon className={`w-8 h-8 ${item.textColor}`} />
                  </div>
                  <h3 className="text-xl font-bold text-warm-gray-800 mb-3">{item.title}</h3>
                  <p className="text-warm-gray-600">{item.description}</p>
                </div>
              </ScrollAnimate>
            ))}
          </div>
        </div>
      </section>

      {/* Team Carousel Section */}
      <TeamCarousel />

      {/* Services */}
      <section className="section-padding bg-gradient-burgundy text-white overflow-hidden">
        <div className="section-container">
          <ScrollAnimate animation="fade-up" className="text-center mb-16">
            <p className="text-coral-light font-semibold mb-3 uppercase tracking-wide text-sm">Experiencias</p>
            <h2 className="text-white mb-6">Nuestras experiencias</h2>
            <p className="text-coral-light/80 max-w-2xl mx-auto">
              Ofrecemos diferentes formas de acompañamiento según tu momento y necesidad.
            </p>
          </ScrollAnimate>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Encuentros */}
            <ScrollAnimate animation="fade-left">
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 hover:bg-white/15 transition-all duration-300 hover:-translate-y-2 border border-white/10 h-full group">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-coral rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Calendar className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold">Encuentros</h3>
                </div>
                <p className="text-coral-light/90 mb-6">
                  Retiros de 3 noches con prácticas ancestrales y ceremonias tradicionales
                  en un entorno seguro y sagrado en Morelos, México.
                </p>
                <Link
                  href="/encuentros"
                  className="inline-flex items-center gap-2 text-coral font-semibold hover:text-coral-light transition-colors group/link"
                >
                  Ver próximos encuentros
                  <ArrowRight size={18} className="group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </ScrollAnimate>

            {/* Medicinas */}
            <ScrollAnimate animation="fade-right">
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 hover:bg-white/15 transition-all duration-300 hover:-translate-y-2 border border-white/10 h-full group">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-gold rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Leaf className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold">Sabiduría Ancestral</h3>
                </div>
                <p className="text-coral-light/90 mb-6">
                  Trabajamos con prácticas tradicionales y ceremonias ancestrales
                  con un enfoque integrativo, respetando su sabiduría sin dogmatismo.
                </p>
                <Link
                  href="/medicinas"
                  className="inline-flex items-center gap-2 text-gold font-semibold hover:text-gold-light transition-colors group/link"
                >
                  Conoce nuestras prácticas
                  <ArrowRight size={18} className="group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </ScrollAnimate>
          </div>
        </div>
      </section>

      {/* Community Carousel Section */}
      <CommunityCarousel />

      {/* Video Testimonial Section */}
      <VideoTestimonial />

      {/* Animated Stats Section */}
      <AnimatedStats />

      {/* Video/Documentary Section */}
      <section className="section-padding bg-warm-gray-50">
        <div className="section-narrow text-center">
          <ScrollAnimate animation="fade-up">
            <p className="text-coral font-semibold mb-3 uppercase tracking-wide text-sm">Documental</p>
            <h2 className="text-burgundy mb-6">Conoce nuestra historia</h2>
            <p className="text-warm-gray-600 mb-10">
              Descubre cómo nuestras experiencias están impactando vidas a través de este documental.
            </p>
          </ScrollAnimate>

          <ScrollAnimate animation="scale" delay={100}>
            <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl hover-glow group">
              <iframe
                src="https://www.youtube-nocookie.com/embed/3KZMMAd1Bsk?rel=0"
                title="Documental FloreSiendo"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>
          </ScrollAnimate>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-warm-white">
        <div className="section-container">
          <FAQAccordion
            title="Preguntas Frecuentes"
            subtitle="Resolvemos tus dudas más comunes sobre nuestras experiencias y acompañamiento."
            items={[
              {
                question: "¿Es seguro participar en un encuentro?",
                answer: "Sí, nuestros encuentros son completamente seguros. Contamos con un equipo profesional certificado, realizamos una evaluación previa, y mantenemos un entorno controlado y sagrado. La seguridad física y emocional de los participantes es nuestra prioridad absoluta.",
              },
              {
                question: "¿Cuánto dura un encuentro?",
                answer: "Nuestros encuentros principales son de 3 noches y 4 días. Este tiempo permite una inmersión profunda en el proceso de crecimiento personal, integrando ceremonias, talleres terapéuticos, momentos de reflexión y acompañamiento personalizado.",
              },
              {
                question: "¿Necesito experiencia previa con prácticas ancestrales?",
                answer: "No es necesario tener experiencia previa. Recibimos tanto a personas que nunca han tenido contacto con prácticas ancestrales como a aquellas con experiencia. Cada participante recibe un acompañamiento personalizado según su situación.",
              },
              {
                question: "¿Cómo me preparo para un encuentro?",
                answer: "Una vez confirmada tu participación, te enviamos una guía completa de preparación que incluye recomendaciones alimenticias, emocionales y prácticas. También realizamos una llamada de orientación para resolver todas tus dudas.",
              },
              {
                question: "¿Dónde se realizan los encuentros?",
                answer: "Nuestros encuentros se realizan en un hermoso espacio en Morelos, México. El lugar está especialmente diseñado para crear un ambiente de conexión con la naturaleza, seguro y propicio para la introspección y el bienestar.",
              },
            ]}
          />
        </div>
      </section>

      {/* CTA Section with gradient to footer */}
      <section className="section-padding text-white relative overflow-hidden bg-gradient-to-b from-coral via-coral-dark to-burgundy -mb-px">
        {/* Decorative elements */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-burgundy/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-burgundy/20 rounded-full blur-3xl" />

        <div className="section-container text-center relative z-10">
          <ScrollAnimate animation="fade-up">
            <h2 className="text-white mb-6">¿Listo para dar el primer paso?</h2>
            <p className="text-white/90 mb-10 max-w-2xl mx-auto text-lg">
              El viaje más importante empieza con una conversación. Contáctanos para conocer
              más sobre nuestros encuentros y cómo podemos acompañarte.
            </p>

            <div className="flex justify-center">
              <Link
                href="/contacto"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-bold bg-white text-coral hover:bg-warm-gray-50 rounded-full shadow-xl hover:scale-105 transition-all duration-300 hover-shine group focus-ring"
              >
                Contáctanos por WhatsApp
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </ScrollAnimate>
        </div>
      </section>

    </main>
  );
}
