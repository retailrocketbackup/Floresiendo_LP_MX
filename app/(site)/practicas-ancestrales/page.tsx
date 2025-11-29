import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Leaf, Shield, Heart, AlertTriangle, Sparkles } from "lucide-react";

export const metadata = {
  title: "Prácticas Ancestrales | FloreSiendo México",
  description: "Conoce las prácticas tradicionales y ceremonias ancestrales con las que trabajamos. Enfoque integrativo y seguro.",
};

const practicas = [
  {
    name: "Planta Amazónica",
    description: "Práctica tradicional que facilita vivencias de expansión de la consciencia y apertura del corazón en un espacio sagrado y contenido.",
    details: "Nuestras ceremonias principales son experiencias guiadas de varias horas, diseñadas para facilitar procesos de bienestar emocional, conexión espiritual y autoconocimiento profundo.",
    bgColor: "bg-gold/10",
    borderColor: "border-gold/30",
    textColor: "text-gold-dark",
    accentColor: "bg-gold",
  },
  {
    name: "El Sapo de Sonora",
    description: "Práctica breve pero profunda que permite la conexión con estados de consciencia expandida y bienestar integral.",
    details: "Esta experiencia ofrece momentos de profunda introspección y conexión con la unidad. Se realiza con respeto y preparación adecuada.",
    bgColor: "bg-coral/10",
    borderColor: "border-coral/30",
    textColor: "text-coral-dark",
    accentColor: "bg-coral",
  },
  {
    name: "Rana Mono Gigante",
    subtitle: "Práctica de Purificación",
    description: "Ceremonia tradicional que trabaja a nivel físico y energético, facilitando la limpieza y renovación integral.",
    details: "Esta práctica apoya el bienestar físico del cuerpo. Es una experiencia intensa pero breve, siempre guiada por facilitadores experimentados.",
    bgColor: "bg-burgundy/10",
    borderColor: "border-burgundy/30",
    textColor: "text-burgundy",
    accentColor: "bg-burgundy",
  },
];

export default function MedicinasPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative py-32 md:py-40 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/medicinas.png"
            alt="Prácticas ancestrales"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-hero" />
        </div>

        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-gold/20 rounded-full blur-3xl animate-pulse-soft" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-coral/20 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: "1s" }} />

        <div className="relative z-10 section-container text-center text-white">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6 animate-fade-in">
            <Leaf size={16} className="text-gold" />
            <span className="text-sm font-medium">+1,000 participantes</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 max-w-4xl mx-auto animate-slide-up">
            Prácticas{" "}
            <span className="text-coral">Ancestrales</span>
          </h1>
          <p className="text-xl text-coral-light/90 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: "0.1s" }}>
            Ceremonias tradicionales que facilitan la conexión con nuestro
            ser auténtico y el bienestar integral.
          </p>
        </div>
      </section>

      {/* Our Approach */}
      <section className="section-padding bg-warm-white">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-coral font-semibold uppercase tracking-wide text-sm">Filosofía</span>
              <h2 className="text-burgundy mt-3 mb-6">Nuestro enfoque</h2>
              <blockquote className="text-xl text-warm-gray-700 mb-6 leading-relaxed border-l-4 border-coral pl-6 italic">
                &ldquo;Nuestro enfoque es integrativo y respetuoso.
                Honramos las prácticas tradicionales como catalizadores de consciencia,
                pero no las adoramos ni las consideramos una panacea.&rdquo;
              </blockquote>
              <p className="text-warm-gray-600 mb-6 leading-relaxed">
                Las prácticas ancestrales son catalizadores de consciencia, no fines en sí mismas.
                El verdadero trabajo ocurre en la integración: el diálogo compasivo que facilita
                comprensiones liberadoras.
              </p>
              <p className="text-warm-gray-600 leading-relaxed">
                La integración es fundamental, donde procesamos y damos sentido
                a las experiencias vividas para generar cambios duraderos en nuestra vida.
              </p>
            </div>
            <div className="relative">
              <div className="absolute -top-4 -right-4 w-72 h-72 bg-gold/10 rounded-full blur-3xl" />
              <Image
                src="/images/medicinas.png"
                alt="Prácticas ancestrales"
                width={500}
                height={400}
                className="relative rounded-3xl shadow-2xl hover-lift"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="section-padding bg-gradient-warm">
        <div className="section-container">
          <div className="text-center mb-16">
            <span className="text-coral font-semibold uppercase tracking-wide text-sm">Cómo trabajamos</span>
            <h2 className="text-burgundy mt-3 mb-4">Principios de trabajo</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Seguridad primero",
                description: "Evaluación previa, contraindicaciones claras, ambiente controlado y equipo preparado para cualquier situación.",
                bgColor: "bg-coral/10",
                textColor: "text-coral",
              },
              {
                icon: Heart,
                title: "Respeto sin dogma",
                description: "Honramos la sabiduría tradicional sin convertirla en religión. El protagonista eres tú, no la práctica.",
                bgColor: "bg-burgundy/10",
                textColor: "text-burgundy",
              },
              {
                icon: Leaf,
                title: "Integración continua",
                description: "El trabajo no termina en la ceremonia. La integración es donde se consolidan los aprendizajes y cambios.",
                bgColor: "bg-gold/10",
                textColor: "text-gold",
              },
            ].map((item, index) => (
              <div key={index} className="card-interactive p-8 group">
                <div className={`w-16 h-16 ${item.bgColor} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <item.icon className={`w-8 h-8 ${item.textColor}`} />
                </div>
                <h3 className="font-bold text-warm-gray-800 mb-3 text-xl">{item.title}</h3>
                <p className="text-warm-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Practicas List */}
      <section className="section-padding bg-warm-white">
        <div className="section-container">
          <div className="text-center mb-16">
            <span className="text-coral font-semibold uppercase tracking-wide text-sm">Conoce</span>
            <h2 className="text-burgundy mt-3 mb-4">Nuestras prácticas</h2>
            <p className="text-warm-gray-600 max-w-2xl mx-auto">
              Trabajamos con diversas ceremonias y prácticas tradicionales, cada una con su propósito y aplicación específica.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            {practicas.map((practica, index) => (
              <div
                key={index}
                className={`${practica.bgColor} rounded-3xl p-8 border ${practica.borderColor} hover:shadow-lg transition-shadow`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 ${practica.accentColor} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className={`text-2xl font-bold ${practica.textColor} mb-1`}>
                      {practica.name}
                    </h3>
                    {practica.subtitle && (
                      <p className={`text-sm font-medium ${practica.textColor} opacity-70 mb-3`}>
                        {practica.subtitle}
                      </p>
                    )}
                    <p className="text-warm-gray-700 mb-4 italic text-lg">
                      {practica.description}
                    </p>
                    <p className="text-warm-gray-600">
                      {practica.details}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Important Notice */}
      <section className="py-16 bg-gold/10">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <div className="flex gap-6 items-start bg-white rounded-2xl p-8 shadow-sm border border-gold/20">
              <div className="w-14 h-14 bg-gold/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-7 h-7 text-gold-dark" />
              </div>
              <div>
                <h3 className="font-bold text-warm-gray-800 mb-3 text-xl">Nota importante</h3>
                <p className="text-warm-gray-600 leading-relaxed">
                  El trabajo con prácticas ancestrales requiere preparación, evaluación previa
                  y acompañamiento profesional. No recomendamos su práctica fuera de contextos
                  ceremoniales guiados. Existen contraindicaciones importantes que evaluamos
                  caso por caso antes de cada encuentro.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-gradient-burgundy text-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-coral/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-burgundy-light/20 rounded-full blur-3xl" />

        <div className="section-container relative z-10 text-center">
          <h2 className="text-white mb-6">¿Tienes dudas sobre nuestras prácticas?</h2>
          <p className="text-coral-light/80 mb-10 max-w-2xl mx-auto text-lg">
            Es normal tener preguntas. Agenda una llamada para hablar sobre tu situación
            específica y resolver todas tus inquietudes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contacto"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-bold bg-coral hover:bg-coral-dark text-white rounded-full shadow-xl hover:scale-105 transition-all duration-300"
            >
              Agenda tu llamada
              <ArrowRight size={20} />
            </Link>
            <Link
              href="/encuentros"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold bg-white/20 hover:bg-white/30 text-white border border-white/40 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-105"
            >
              Ver encuentros
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
