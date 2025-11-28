import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Heart, Users, BookOpen, Globe, Star, Quote } from "lucide-react";
import { AnimatedStats } from "@/components/animated-stats";

export const metadata = {
  title: "La Escuela | FloreSiendo México",
  description: "Conoce FloreSiendo, una escuela internacional enfocada en expandir el amor a través de prácticas ancestrales y acompañamiento terapéutico.",
};

export default function EscuelaPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative py-32 md:py-40 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/herosectionescuelapage.jpg"
            alt="FloreSiendo - Escuela de transformación"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-hero" />
        </div>

        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-coral/20 rounded-full blur-3xl animate-pulse-soft" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gold/20 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: "1s" }} />

        <div className="relative z-10 section-container text-center text-white">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6 animate-fade-in">
            <Heart size={16} className="text-coral fill-coral" />
            <span className="text-sm font-medium">Alquimia de Amor</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 max-w-4xl mx-auto animate-slide-up">
            Una escuela donde la maestra es el{" "}
            <span className="text-coral">Amor</span>
          </h1>
          <p className="text-xl text-coral-light/90 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: "0.1s" }}>
            Somos una escuela integrativa que combina prácticas ancestrales
            con filosofía mística y constelaciones familiares.
          </p>
        </div>
      </section>

      {/* Philosophy */}
      <section className="section-padding bg-warm-white">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="animate-fade-in">
              <span className="text-coral font-semibold uppercase tracking-wide text-sm">Nuestra esencia</span>
              <h2 className="text-burgundy mt-3 mb-6">Nuestra filosofía</h2>
              <p className="text-warm-gray-600 mb-6 leading-relaxed">
                FloreSiendo es una escuela internacional enfocada en expandir el amor,
                constituida con sedes en varios países del mundo donde organizamos
                encuentros y formamos personas.
              </p>
              <p className="text-warm-gray-600 mb-6 leading-relaxed">
                Nuestra misión es conectar a las personas con su sentimiento de inocencia
                esencial, su dignidad y sentido de merecimiento y valía intrínseca.
              </p>
              <p className="text-warm-gray-600 leading-relaxed">
                Queremos inspirar a que surja naturalmente en ti el brillo divino y humano
                que llevas dentro, acompañándote con amor en tu proceso de transformación.
              </p>
            </div>
            <div className="relative">
              <div className="absolute -top-4 -right-4 w-72 h-72 bg-coral/10 rounded-full blur-3xl" />
              <Image
                src="/images/ceremony.jpeg"
                alt="Ceremonia FloreSiendo"
                width={600}
                height={400}
                className="relative rounded-3xl shadow-2xl hover-lift"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values/Pillars */}
      <section className="section-padding bg-gradient-warm">
        <div className="section-container">
          <div className="text-center mb-16">
            <span className="text-coral font-semibold uppercase tracking-wide text-sm">Lo que nos define</span>
            <h2 className="text-burgundy mt-3 mb-4">Nuestros pilares</h2>
            <p className="text-warm-gray-600 max-w-2xl mx-auto">
              Cuatro principios fundamentales guían todo lo que hacemos
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Heart,
                title: "Amor",
                description: "El amor como maestra principal de todo proceso de crecimiento.",
                bgColor: "bg-coral/10",
                textColor: "text-coral",
              },
              {
                icon: Users,
                title: "Comunidad",
                description: "Espacios seguros de contención y acompañamiento grupal.",
                bgColor: "bg-burgundy/10",
                textColor: "text-burgundy",
              },
              {
                icon: BookOpen,
                title: "Integración",
                description: "Combinamos sabiduría ancestral con enfoques terapéuticos modernos.",
                bgColor: "bg-gold/10",
                textColor: "text-gold",
              },
              {
                icon: Globe,
                title: "Alcance Global",
                description: "Presencia internacional con sedes en múltiples países.",
                bgColor: "bg-coral/10",
                textColor: "text-coral",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="card-interactive p-8 text-center group"
              >
                <div className={`w-16 h-16 ${item.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <item.icon className={`w-8 h-8 ${item.textColor}`} />
                </div>
                <h3 className="font-bold text-warm-gray-800 mb-3 text-xl">{item.title}</h3>
                <p className="text-warm-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="section-padding bg-warm-white">
        <div className="section-container">
          <div className="text-center mb-16">
            <span className="text-coral font-semibold uppercase tracking-wide text-sm">Quiénes somos</span>
            <h2 className="text-burgundy mt-3 mb-4">Nuestro equipo</h2>
            <p className="text-warm-gray-600 max-w-2xl mx-auto">
              Un equipo multidisciplinario de facilitadores con más de una década de experiencia
              en acompañamiento terapéutico y espiritual.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-72 h-72 bg-burgundy/10 rounded-full blur-3xl" />
              <Image
                src="/images/facilitador.jpg"
                alt="Facilitador de FloreSiendo México"
                width={500}
                height={500}
                className="relative rounded-3xl shadow-2xl hover-lift mx-auto object-cover"
              />
              {/* Floating badge */}
              <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-4 hidden md:flex items-center gap-3">
                <div className="w-12 h-12 bg-coral/10 rounded-full flex items-center justify-center">
                  <Star className="w-6 h-6 text-coral fill-coral" />
                </div>
                <div>
                  <p className="font-bold text-warm-gray-800">+10 años</p>
                  <p className="text-sm text-warm-gray-500">de experiencia</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-burgundy mb-2">Nuestro Facilitador</h3>
              <p className="text-coral font-medium mb-6">FloreSiendo México</p>

              <div className="relative mb-8">
                <Quote className="absolute -top-2 -left-2 w-8 h-8 text-coral/20" />
                <blockquote className="text-xl text-warm-gray-700 leading-relaxed border-l-4 border-coral pl-6 italic">
                  &ldquo;Mi propósito es acompañar a otros con amor en su proceso de transformación,
                  creando espacios seguros donde cada persona pueda reconectarse con su esencia.&rdquo;
                </blockquote>
              </div>

              <p className="text-warm-gray-600 leading-relaxed mb-8">
                Con años de experiencia en facilitación de ceremonias ancestrales y
                acompañamiento terapéutico, nuestro equipo en México trabaja con la visión
                de crear espacios de transformación auténtica y bienestar integral.
              </p>

              <Link href="/encuentros" className="btn-outline">
                Conoce nuestros encuentros
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* What We Help With */}
      <section className="section-padding bg-gradient-burgundy text-white">
        <div className="section-container">
          <div className="text-center mb-16">
            <span className="text-coral-light font-semibold uppercase tracking-wide text-sm">Nuestro acompañamiento</span>
            <h2 className="text-white mt-3 mb-4">Más de 10 años de experiencia</h2>
            <p className="text-coral-light/80 max-w-2xl mx-auto">
              Hemos acompañado a miles de personas en sus procesos de transformación,
              abordando diversas situaciones con profesionalismo y amor.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "Ansiedad",
              "Depresión",
              "PTSD y Trauma",
              "Duelo",
              "Adicciones",
              "Fobias",
              "Crisis existencial",
              "Relaciones",
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-xl py-4 px-6 text-center font-medium hover:bg-white/20 transition-colors"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-gradient-warm">
        <div className="section-container text-center">
          <h2 className="text-burgundy mb-6">¿Quieres conocernos mejor?</h2>
          <p className="text-warm-gray-600 mb-10 max-w-2xl mx-auto">
            Agenda una llamada sin compromiso para conocer más sobre nuestro enfoque
            y cómo podemos acompañarte.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contacto" className="btn-primary">
              Contáctanos
              <ArrowRight size={20} />
            </Link>
            <Link href="/encuentros" className="btn-outline">
              Ver encuentros
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
