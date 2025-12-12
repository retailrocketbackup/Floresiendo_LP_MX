import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  Users,
  BookOpen,
  Globe,
  CheckCircle2,
  GraduationCap,
  Sparkles,
  Shield,
  ChevronDown,
  Video,
  UserCheck,
  Brain,
  MessageCircle,
} from "lucide-react";
import { PageTracking } from "@/components/page-tracking";
import { TrackedWhatsAppLink } from "@/components/tracked-whatsapp-link";

// WhatsApp Icon Component
const WhatsAppIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

export const metadata = {
  title: "Formación de Facilitadores | Escuela FloreSiendo",
  description: "Inicia tu formación como Facilitador de Remedios Ancestrales. Programa híbrido: formación online + intensivo presencial. Únete a +50 facilitadores en nuestra red.",
};

export default function EscuelaPage() {
  const whatsappNumber = "526182301481";
  const whatsappMessage = "Hola, me interesa la Formación de Facilitadores de Escuela FloreSiendo. Me gustaría recibir más información.";

  return (
    <main>
      {/* Meta Tracking */}
      <PageTracking page="escuela" contentName="formacion-facilitadores" value={180000} />

      {/* Hero Section - Transformation Promise */}
      <section className="relative py-24 md:py-32 lg:py-40 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/herosectionescuelapage.jpg"
            alt="Formación de Facilitadores FloreSiendo"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-burgundy/80 via-burgundy/70 to-burgundy/90" />
        </div>

        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-coral/20 rounded-full blur-3xl animate-pulse-soft" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gold/20 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: "1s" }} />

        <div className="relative z-10 section-container text-center text-white">
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6 animate-fade-in">
            <GraduationCap size={16} className="text-gold" />
            <span className="text-sm font-medium">+50 facilitadores en nuestra red</span>
          </div>

          {/* Headline - Transformation Promise */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 max-w-5xl mx-auto animate-slide-up leading-tight">
            Inicia tu Formación como Facilitador de{" "}
            <span className="text-coral">Remedios Ancestrales</span>
          </h1>

          {/* Subheadline - Who This Is For */}
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto mb-8 animate-slide-up" style={{ animationDelay: "0.1s" }}>
            Domina el arte de acompañar procesos de transformación con prácticas ancestrales
            y construye una práctica profesional alineada con tu propósito.
          </p>

          {/* Key Benefits Pills */}
          <div className="flex flex-wrap justify-center gap-3 mb-10 animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <span className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm">
              Formación Online + Presencial
            </span>
            <span className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm">
              Facilitación Internacional
            </span>
            <span className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm">
              Comunidad de Egresados
            </span>
          </div>

          {/* Primary CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: "0.3s" }}>
            <TrackedWhatsAppLink
              phone={whatsappNumber}
              message={whatsappMessage}
              page="escuela"
              buttonLocation="hero"
              value={180000}
              className="inline-flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-4 px-8 rounded-full text-lg transition-all hover:scale-105 shadow-xl"
            >
              <WhatsAppIcon className="w-6 h-6" />
              Solicitar Información
            </TrackedWhatsAppLink>
            <a
              href="#programa"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold py-4 px-8 rounded-full text-lg transition-all border border-white/30"
            >
              Ver Programa
              <ChevronDown size={20} />
            </a>
          </div>

          {/* Urgency Micro-copy */}
          <p className="mt-6 text-white/60 text-sm animate-fade-in" style={{ animationDelay: "0.4s" }}>
            Próxima generación: Marzo 2026 · Cupos limitados a 12 participantes
          </p>
          <p className="mt-2 text-white/50 text-xs animate-fade-in" style={{ animationDelay: "0.5s" }}>
            Requisito: Haber participado en al menos 2 encuentros con FloreSiendo
          </p>
        </div>
      </section>

      {/* Problem Section - PAS Framework */}
      <section className="section-padding bg-warm-white">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-coral font-semibold uppercase tracking-wide text-sm">El desafío</span>
              <h2 className="text-burgundy mt-3 mb-6">¿Te identificas con esto?</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {[
                "Sientes el llamado a acompañar procesos de transformación pero no sabes cómo empezar",
                "Has tenido experiencias profundas con prácticas ancestrales y quieres compartirlas de forma segura",
                "Eres terapeuta o coach y quieres integrar herramientas ancestrales en tu práctica",
                "Te falta estructura, metodología y respaldo para facilitar con confianza",
                "Quieres construir una práctica profesional alineada con tu propósito de vida",
                "Buscas una comunidad de facilitadores con quienes crecer y aprender",
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-5 bg-white rounded-2xl shadow-sm border border-warm-gray-100"
                >
                  <div className="w-8 h-8 bg-coral/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-5 h-5 text-coral" />
                  </div>
                  <p className="text-warm-gray-700">{item}</p>
                </div>
              ))}
            </div>

            {/* Agitation */}
            <div className="bg-gradient-to-r from-burgundy/5 to-coral/5 rounded-3xl p-8 md:p-10 border border-burgundy/10">
              <p className="text-lg text-warm-gray-700 leading-relaxed text-center">
                Sin la formación adecuada, facilitar prácticas ancestrales puede ser{" "}
                <strong className="text-burgundy">riesgoso para ti y para quienes acompañas</strong>.
                La diferencia entre una experiencia transformadora y una traumática está en{" "}
                <strong className="text-burgundy">la preparación del facilitador</strong>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section - Benefits */}
      <section className="section-padding bg-gradient-warm">
        <div className="section-container">
          <div className="text-center mb-16">
            <span className="text-coral font-semibold uppercase tracking-wide text-sm">La solución</span>
            <h2 className="text-burgundy mt-3 mb-4">Lo que lograrás con esta formación</h2>
            <p className="text-warm-gray-600 max-w-2xl mx-auto">
              Una formación integral que te prepara para facilitar con seguridad, ética y profesionalismo.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Facilitar con Seguridad",
                description: "Domina protocolos de seguridad, evaluación previa y manejo de situaciones de crisis.",
                bgColor: "bg-coral/10",
                textColor: "text-coral",
              },
              {
                icon: Heart,
                title: "Crear Espacios Sagrados",
                description: "Aprende a diseñar y sostener contenedores seguros para procesos profundos de transformación.",
                bgColor: "bg-burgundy/10",
                textColor: "text-burgundy",
              },
              {
                icon: Users,
                title: "Liderar Grupos",
                description: "Desarrolla habilidades de facilitación grupal, manejo de dinámicas y acompañamiento colectivo.",
                bgColor: "bg-gold/10",
                textColor: "text-gold-dark",
              },
              {
                icon: BookOpen,
                title: "Integrar Conocimientos",
                description: "Combina sabiduría ancestral con psicoterapia moderna para un enfoque integrativo único.",
                bgColor: "bg-coral/10",
                textColor: "text-coral",
              },
              {
                icon: Globe,
                title: "Facilita Globalmente",
                description: "Como egresado, si quieres organizar retiros en otro país, te brindamos respaldo y acompañamiento. Facilita en México, Portugal, España, Rumania y Uruguay.",
                bgColor: "bg-burgundy/10",
                textColor: "text-burgundy",
              },
              {
                icon: Sparkles,
                title: "Construir tu Práctica",
                description: "Recibe mentoría para desarrollar tu práctica profesional ética y sustentable.",
                bgColor: "bg-gold/10",
                textColor: "text-gold-dark",
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

      {/* Program Overview - 7 Cycles with Practical Progression */}
      <section id="programa" className="section-padding bg-warm-white scroll-mt-20">
        <div className="section-container">
          <div className="text-center mb-16">
            <span className="text-coral font-semibold uppercase tracking-wide text-sm">El programa</span>
            <h2 className="text-burgundy mt-3 mb-4">Formación Progresiva: De Aprendiz a Facilitador</h2>
            <p className="text-warm-gray-600 max-w-2xl mx-auto">
              7 ciclos de inmersión (Ciclo 0 al Ciclo 6) con un sistema progresivo de prácticas supervisadas.
              Cada ciclo te acerca más a facilitar con autonomía y seguridad.
            </p>
          </div>

          {/* Summary Stats */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-10 mb-12">
            <div className="text-center">
              <div className="text-4xl font-bold text-burgundy">0-6</div>
              <div className="text-warm-gray-600 text-sm">Ciclos</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-coral">4</div>
              <div className="text-warm-gray-600 text-sm">Días por ciclo</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-gold-dark">28</div>
              <div className="text-warm-gray-600 text-sm">Días presenciales</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-burgundy">140+</div>
              <div className="text-warm-gray-600 text-sm">Horas contacto</div>
            </div>
          </div>

          {/* Progression Legend */}
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            <div className="flex items-center gap-2 text-sm">
              <span className="w-3 h-3 bg-warm-gray-300 rounded-full"></span>
              <span className="text-warm-gray-600">Teoría</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="w-3 h-3 bg-gold rounded-full"></span>
              <span className="text-warm-gray-600">Apoyo</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="w-3 h-3 bg-coral rounded-full"></span>
              <span className="text-warm-gray-600">Autoaplicación</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="w-3 h-3 bg-burgundy rounded-full"></span>
              <span className="text-warm-gray-600">Responsable</span>
            </div>
          </div>

          {/* 7 Cycles Grid with Practical Progression */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {[
              {
                cycle: 0,
                title: "Fundamentos",
                subtitle: "Solo teoría",
                classes: "4 clases teóricas",
                classTopics: ["Aplicación Sapo de Sonora", "Aplicación Rana Mono", "Facilitación Planta Amazónica", "Fundamentos de Integración"],
                practices: [],
                gradient: "from-warm-gray-600 to-warm-gray-700",
                border: "border-warm-gray-300",
              },
              {
                cycle: 1,
                title: "Facilitación Básica",
                subtitle: "Primera práctica",
                classes: "3 clases",
                classTopics: ["Rana Mono (profundización)", "Técnicas de Facilitación", "Métodos de Integración"],
                practices: [{ name: "Apoyo Sapo", level: "apoyo" }],
                gradient: "from-coral to-coral-dark",
                border: "border-coral",
              },
              {
                cycle: 2,
                title: "Primeras Prácticas",
                subtitle: "Transición a la acción",
                classes: "2 clases integración",
                classTopics: ["Manejo de crisis", "Contención emocional"],
                practices: [
                  { name: "Autoaplicación Rana", level: "auto" },
                  { name: "Responsable Sapo", level: "responsable" },
                  { name: "Apoyo Planta", level: "apoyo" },
                ],
                gradient: "from-burgundy to-burgundy-dark",
                border: "border-burgundy",
              },
              {
                cycle: 3,
                title: "Responsable Individual",
                subtitle: "Liderazgo supervisado",
                classes: "1 clase integración",
                classTopics: ["Supervisión y casos complejos"],
                practices: [
                  { name: "Responsable Rana", level: "responsable" },
                  { name: "Responsable Sapo", level: "responsable" },
                  { name: "Responsable Planta", level: "responsable" },
                  { name: "Conferencia 15 min", level: "responsable" },
                ],
                gradient: "from-gold to-gold-dark",
                border: "border-gold",
              },
              {
                cycle: 4,
                title: "Responsable Grupal",
                subtitle: "Facilitación colectiva",
                classes: "2 clases integración",
                classTopics: ["Dinámicas grupales", "Conflicto y transformación"],
                practices: [
                  { name: "Responsable Rana", level: "responsable" },
                  { name: "Responsable Sapo", level: "responsable" },
                  { name: "Responsable Planta", level: "responsable" },
                  { name: "Apoyo Integración", level: "apoyo" },
                ],
                gradient: "from-coral-dark to-burgundy",
                border: "border-coral-dark",
              },
              {
                cycle: 5,
                title: "Integración Avanzada",
                subtitle: "Autonomía completa",
                classes: "2 clases integración",
                classTopics: ["Mentoría y enseñanza", "Ética profesional"],
                practices: [
                  { name: "Responsable Rana", level: "responsable" },
                  { name: "Responsable Sapo", level: "responsable" },
                  { name: "Responsable Planta", level: "responsable" },
                  { name: "Responsable Integración", level: "responsable" },
                ],
                gradient: "from-burgundy to-burgundy-dark",
                border: "border-burgundy",
              },
              {
                cycle: 6,
                title: "Integración a la Red",
                subtitle: "Tu camino profesional",
                classes: "2 clases",
                classTopics: ["Desarrollo profesional", "Integración a comunidad"],
                practices: [
                  { name: "Evaluación de casos", level: "responsable" },
                  { name: "Proyecto personal", level: "responsable" },
                ],
                extras: ["Reconocimiento como Facilitador", "Acceso a Red FloreSiendo", "Oportunidades de co-facilitación"],
                gradient: "from-gold-dark to-burgundy",
                border: "border-gold-dark",
              },
            ].map((item) => (
              <div
                key={item.cycle}
                className={`bg-white rounded-3xl shadow-xl overflow-hidden border ${item.border} hover:shadow-2xl transition-shadow`}
              >
                <div className={`bg-gradient-to-r ${item.gradient} p-5 text-white`}>
                  <span className="text-sm font-medium uppercase tracking-wide opacity-80">Ciclo {item.cycle}</span>
                  <h3 className="text-xl font-bold mt-1">{item.title}</h3>
                  <p className="text-white/70 text-sm mt-1">{item.subtitle}</p>
                </div>
                <div className="p-5">
                  {/* Classes */}
                  <div className="mb-4">
                    <p className="text-warm-gray-500 text-xs uppercase tracking-wide mb-2">{item.classes}</p>
                    <ul className="space-y-1">
                      {item.classTopics.map((topic, i) => (
                        <li key={i} className="flex items-start gap-2 text-warm-gray-600 text-sm">
                          <span className="w-1.5 h-1.5 bg-warm-gray-300 rounded-full mt-1.5 flex-shrink-0"></span>
                          {topic}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Practices */}
                  {item.practices.length > 0 && (
                    <div className="mb-4">
                      <p className="text-warm-gray-500 text-xs uppercase tracking-wide mb-2">Prácticas</p>
                      <ul className="space-y-1">
                        {item.practices.map((practice, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm">
                            <span className={`w-2 h-2 rounded-full flex-shrink-0 ${
                              practice.level === "apoyo" ? "bg-gold" :
                              practice.level === "auto" ? "bg-coral" :
                              "bg-burgundy"
                            }`}></span>
                            <span className="text-warm-gray-700">{practice.name}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Extras for Cycle 7 */}
                  {item.extras && (
                    <div className="pt-3 border-t border-warm-gray-100">
                      <ul className="space-y-1">
                        {item.extras.map((extra, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm">
                            <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                            <span className="text-warm-gray-700 font-medium">{extra}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Days indicator */}
                  <div className="flex items-center gap-2 text-warm-gray-400 text-xs mt-4 pt-3 border-t border-warm-gray-100">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>4 días de inmersión</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Progression Summary Table */}
          <div className="mt-12 max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-burgundy/5 to-coral/5 rounded-3xl p-8 border border-burgundy/10">
              <h4 className="font-bold text-burgundy text-lg mb-6 text-center">Tu Progresión en Cada Práctica</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-burgundy/10">
                      <th className="text-left py-3 text-warm-gray-600 font-medium">Práctica</th>
                      <th className="text-center py-3 text-warm-gray-600 font-medium">C0</th>
                      <th className="text-center py-3 text-warm-gray-600 font-medium">C1</th>
                      <th className="text-center py-3 text-warm-gray-600 font-medium">C2</th>
                      <th className="text-center py-3 text-warm-gray-600 font-medium">C3</th>
                      <th className="text-center py-3 text-warm-gray-600 font-medium">C4</th>
                      <th className="text-center py-3 text-warm-gray-600 font-medium">C5</th>
                      <th className="text-center py-3 text-warm-gray-600 font-medium">C6</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-warm-gray-100">
                      <td className="py-3 font-medium text-warm-gray-700">Sapo de Sonora</td>
                      <td className="text-center py-3"><span className="w-3 h-3 bg-warm-gray-300 rounded-full inline-block" title="Teoría"></span></td>
                      <td className="text-center py-3"><span className="w-3 h-3 bg-gold rounded-full inline-block" title="Apoyo"></span></td>
                      <td className="text-center py-3"><span className="w-3 h-3 bg-burgundy rounded-full inline-block" title="Responsable"></span></td>
                      <td className="text-center py-3"><span className="w-3 h-3 bg-burgundy rounded-full inline-block" title="Responsable"></span></td>
                      <td className="text-center py-3"><span className="w-3 h-3 bg-burgundy rounded-full inline-block" title="Responsable"></span></td>
                      <td className="text-center py-3"><span className="w-3 h-3 bg-burgundy rounded-full inline-block" title="Responsable"></span></td>
                      <td className="text-center py-3"><span className="text-green-500 text-lg">✓</span></td>
                    </tr>
                    <tr className="border-b border-warm-gray-100">
                      <td className="py-3 font-medium text-warm-gray-700">Rana Mono Gigante</td>
                      <td className="text-center py-3"><span className="w-3 h-3 bg-warm-gray-300 rounded-full inline-block" title="Teoría"></span></td>
                      <td className="text-center py-3"><span className="w-3 h-3 bg-warm-gray-300 rounded-full inline-block" title="Teoría"></span></td>
                      <td className="text-center py-3"><span className="w-3 h-3 bg-coral rounded-full inline-block" title="Autoaplicación"></span></td>
                      <td className="text-center py-3"><span className="w-3 h-3 bg-burgundy rounded-full inline-block" title="Responsable"></span></td>
                      <td className="text-center py-3"><span className="w-3 h-3 bg-burgundy rounded-full inline-block" title="Responsable"></span></td>
                      <td className="text-center py-3"><span className="w-3 h-3 bg-burgundy rounded-full inline-block" title="Responsable"></span></td>
                      <td className="text-center py-3"><span className="text-green-500 text-lg">✓</span></td>
                    </tr>
                    <tr className="border-b border-warm-gray-100">
                      <td className="py-3 font-medium text-warm-gray-700">Planta Amazónica</td>
                      <td className="text-center py-3"><span className="w-3 h-3 bg-warm-gray-300 rounded-full inline-block" title="Teoría"></span></td>
                      <td className="text-center py-3"><span className="w-3 h-3 bg-warm-gray-300 rounded-full inline-block" title="Teoría"></span></td>
                      <td className="text-center py-3"><span className="w-3 h-3 bg-gold rounded-full inline-block" title="Apoyo"></span></td>
                      <td className="text-center py-3"><span className="w-3 h-3 bg-burgundy rounded-full inline-block" title="Responsable"></span></td>
                      <td className="text-center py-3"><span className="w-3 h-3 bg-burgundy rounded-full inline-block" title="Responsable"></span></td>
                      <td className="text-center py-3"><span className="w-3 h-3 bg-burgundy rounded-full inline-block" title="Responsable"></span></td>
                      <td className="text-center py-3"><span className="text-green-500 text-lg">✓</span></td>
                    </tr>
                    <tr>
                      <td className="py-3 font-medium text-warm-gray-700">Integración</td>
                      <td className="text-center py-3"><span className="w-3 h-3 bg-warm-gray-300 rounded-full inline-block" title="Teoría"></span></td>
                      <td className="text-center py-3"><span className="w-3 h-3 bg-warm-gray-300 rounded-full inline-block" title="Teoría"></span></td>
                      <td className="text-center py-3"><span className="w-3 h-3 bg-warm-gray-300 rounded-full inline-block" title="Teoría"></span></td>
                      <td className="text-center py-3"><span className="w-3 h-3 bg-warm-gray-300 rounded-full inline-block" title="Teoría"></span></td>
                      <td className="text-center py-3"><span className="w-3 h-3 bg-gold rounded-full inline-block" title="Apoyo"></span></td>
                      <td className="text-center py-3"><span className="w-3 h-3 bg-burgundy rounded-full inline-block" title="Responsable"></span></td>
                      <td className="text-center py-3"><span className="text-green-500 text-lg">✓</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-center text-warm-gray-500 text-xs mt-4">
                Cada práctica tiene su propia progresión: Teoría → Apoyo → Autoaplicación → Responsable
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Between Cycles - Online Continuity & Supervision */}
      <section className="section-padding bg-gradient-warm">
        <div className="section-container">
          <div className="text-center mb-12">
            <span className="text-coral font-semibold uppercase tracking-wide text-sm">Acompañamiento online</span>
            <h2 className="text-burgundy mt-3 mb-4">Entre Ciclos</h2>
            <p className="text-warm-gray-600 max-w-2xl mx-auto">
              El aprendizaje no se detiene entre intensivos presenciales. Mantén tu progreso con sesiones online estructuradas.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-warm-gray-100 text-center">
              <div className="w-16 h-16 bg-coral/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Video className="w-8 h-8 text-coral" />
              </div>
              <h3 className="font-bold text-burgundy text-xl mb-3">Seguimiento Online</h3>
              <p className="text-warm-gray-600 text-sm mb-4">
                Sesiones quincenales de 90 minutos con 7-9 compañeros y un mentor para práctica, retroalimentación y apoyo mutuo.
              </p>
              <div className="text-coral font-semibold text-sm">12+ horas totales</div>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-lg border border-warm-gray-100 text-center">
              <div className="w-16 h-16 bg-burgundy/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <UserCheck className="w-8 h-8 text-burgundy" />
              </div>
              <h3 className="font-bold text-burgundy text-xl mb-3">Role-Play Online</h3>
              <p className="text-warm-gray-600 text-sm mb-4">
                Simulaciones de facilitación entre compañeros con retroalimentación de mentores para desarrollar competencias.
              </p>
              <div className="text-burgundy font-semibold text-sm">Práctica entre pares</div>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-lg border border-warm-gray-100 text-center">
              <div className="w-16 h-16 bg-gold/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-gold-dark" />
              </div>
              <h3 className="font-bold text-burgundy text-xl mb-3">Supervisión de Casos</h3>
              <p className="text-warm-gray-600 text-sm mb-4">
                Sesiones online con formadores para revisar casos difíciles, resolver dudas y profundizar en situaciones específicas.
              </p>
              <div className="text-gold-dark font-semibold text-sm">10+ horas de supervisión</div>
            </div>
          </div>
        </div>
      </section>

      {/* 6 Core Competencies - FloreSiendo Framework (IAF + Phelps) */}
      <section className="section-padding bg-warm-white">
        <div className="section-container">
          <div className="text-center mb-16">
            <span className="text-coral font-semibold uppercase tracking-wide text-sm">Metodología</span>
            <h2 className="text-burgundy mt-3 mb-4">Las 6 Competencias del Facilitador</h2>
            <p className="text-warm-gray-600 max-w-2xl mx-auto">
              Nuestro marco integra estándares internacionales de facilitación (IAF) con
              competencias específicas para el acompañamiento de prácticas ancestrales.
            </p>
          </div>

          {/* SER */}
          <div className="max-w-6xl mx-auto mb-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-coral/10 rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-coral" />
              </div>
              <div>
                <h3 className="font-bold text-burgundy text-lg">SER</h3>
                <p className="text-warm-gray-500 text-sm">Quién eres es más importante que lo que haces</p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  number: "01",
                  title: "Presencia y Autoconciencia",
                  description: "Cultivar calma, ecuanimidad y escucha sin juicio. Trabajo personal profundo, claridad emocional en el acompañamiento y límites éticos claros.",
                  color: "coral",
                },
                {
                  number: "02",
                  title: "Inteligencia Espiritual",
                  description: "Comodidad con dimensiones transpersonales y existenciales. Integrar diversos marcos espirituales y de sentido sin dogma.",
                  color: "burgundy",
                },
              ].map((competency, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-warm-gray-100 hover:shadow-lg transition-shadow"
                >
                  <div className={`text-${competency.color} text-4xl font-bold opacity-20 mb-2`}>
                    {competency.number}
                  </div>
                  <h3 className="font-bold text-warm-gray-800 text-lg mb-2">{competency.title}</h3>
                  <p className="text-warm-gray-600 text-sm leading-relaxed">{competency.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* SABER */}
          <div className="max-w-6xl mx-auto mb-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-gold-dark" />
              </div>
              <div>
                <h3 className="font-bold text-burgundy text-lg">SABER</h3>
                <p className="text-warm-gray-500 text-sm">La seguridad requiere conocimiento</p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  number: "03",
                  title: "Conocimiento Técnico",
                  description: "Farmacología, efectos físicos y psicológicos, contraindicaciones, interacciones y protocolos de seguridad y emergencia.",
                  color: "gold",
                },
                {
                  number: "04",
                  title: "Creación de Espacio Seguro",
                  description: "Generar confianza y seguridad. Preparar el entorno físico y emocional. Clima de inclusión y respeto a la diversidad.",
                  color: "coral",
                },
              ].map((competency, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-warm-gray-100 hover:shadow-lg transition-shadow"
                >
                  <div className={`text-${competency.color} text-4xl font-bold opacity-20 mb-2`}>
                    {competency.number}
                  </div>
                  <h3 className="font-bold text-warm-gray-800 text-lg mb-2">{competency.title}</h3>
                  <p className="text-warm-gray-600 text-sm leading-relaxed">{competency.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* HACER */}
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-burgundy/10 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-burgundy" />
              </div>
              <div>
                <h3 className="font-bold text-burgundy text-lg">HACER</h3>
                <p className="text-warm-gray-500 text-sm">El arte de guiar procesos de transformación</p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  number: "05",
                  title: "Facilitación de Procesos",
                  description: "Guiar dinámicas grupales, manejar conflictos y situaciones de crisis, técnicas de integración y co-facilitación efectiva.",
                  color: "burgundy",
                },
                {
                  number: "06",
                  title: "Desarrollo Profesional",
                  description: "Supervisión activa, educación continua y red de pares. El facilitador nunca deja de crecer y aprender.",
                  color: "gold",
                },
              ].map((competency, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-warm-gray-100 hover:shadow-lg transition-shadow"
                >
                  <div className={`text-${competency.color} text-4xl font-bold opacity-20 mb-2`}>
                    {competency.number}
                  </div>
                  <h3 className="font-bold text-warm-gray-800 text-lg mb-2">{competency.title}</h3>
                  <p className="text-warm-gray-600 text-sm leading-relaxed">{competency.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Assessment Note */}
          <div className="mt-12 max-w-3xl mx-auto">
            <div className="bg-burgundy/5 rounded-2xl p-6 border border-burgundy/10 flex items-start gap-4">
              <Brain className="w-8 h-8 text-burgundy flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-burgundy mb-2">Evaluación basada en competencias</h4>
                <p className="text-warm-gray-600 text-sm">
                  A diferencia de programas basados solo en asistencia, evaluamos tu desarrollo real en cada competencia
                  con retroalimentación estructurada, role-play y práctica supervisada. El reconocimiento como facilitador
                  formado requiere demostrar dominio en al menos 5 de las 6 competencias.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof - Testimonials */}
      <section className="section-padding bg-gradient-burgundy text-white">
        <div className="section-container">
          <div className="text-center mb-16">
            <span className="text-coral-light font-semibold uppercase tracking-wide text-sm">Testimonios</span>
            <h2 className="text-white mt-3 mb-4">Lo que dicen nuestros egresados</h2>
            <p className="text-coral-light/80 max-w-2xl mx-auto">
              Más de 50 facilitadores formados en diferentes países.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "María González",
                role: "Psicóloga, Guadalajara",
                quote: "Esta formación transformó mi práctica terapéutica. Ahora integro herramientas ancestrales con total seguridad y mis pacientes experimentan cambios más profundos.",
                before: "Psicóloga clínica buscando herramientas complementarias",
                after: "Facilitadora con práctica híbrida y lista de espera de 3 meses",
              },
              {
                name: "Carlos Ramírez",
                role: "Coach, CDMX",
                quote: "Lo que más valoro es la comunidad. No estás solo después de graduarte. Tienes supervisión, apoyo y colegas con quienes consultar casos difíciles.",
                before: "Coach de vida sin herramientas para trabajo profundo",
                after: "Facilitador de retiros grupales con 8 encuentros anuales",
              },
              {
                name: "Ana Martínez",
                role: "Facilitadora, Monterrey",
                quote: "La ética y seguridad que enseñan es impecable. Me siento preparada para cualquier situación y mis participantes confían completamente en mi guía.",
                before: "Interesada en prácticas ancestrales sin formación formal",
                after: "Facilitadora formada con práctica propia en Monterrey",
              },
            ].map((testimonial, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-coral/20 rounded-full flex items-center justify-center">
                    <span className="text-xl font-bold text-coral">{testimonial.name.charAt(0)}</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-white">{testimonial.name}</h4>
                    <p className="text-coral-light text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <blockquote className="text-white/90 mb-6 italic leading-relaxed">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
                <div className="border-t border-white/10 pt-4 space-y-2 text-sm">
                  <p className="text-white/60"><strong className="text-white/80">Antes:</strong> {testimonial.before}</p>
                  <p className="text-coral-light"><strong className="text-coral">Después:</strong> {testimonial.after}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Network Integration - What Happens After */}
      <section className="section-padding bg-warm-white">
        <div className="section-container">
          <div className="text-center mb-16">
            <span className="text-coral font-semibold uppercase tracking-wide text-sm">Después de la formación</span>
            <h2 className="text-burgundy mt-3 mb-4">Tu Camino Profesional con FloreSiendo</h2>
            <p className="text-warm-gray-600 max-w-2xl mx-auto">
              Completar la formación es solo el inicio. Te integramos a una red activa de facilitadores
              con oportunidades reales de práctica y crecimiento continuo.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              {
                icon: Users,
                title: "Red de Facilitadores",
                description: "Acceso a comunidad privada de +50 facilitadores activos en México, España, Portugal, Rumania y Uruguay.",
                bgColor: "bg-coral/10",
                textColor: "text-coral",
              },
              {
                icon: UserCheck,
                title: "Co-facilitación",
                description: "Oportunidades de acompañar encuentros como co-facilitador con mentores experimentados. Primeras experiencias pagadas.",
                bgColor: "bg-burgundy/10",
                textColor: "text-burgundy",
              },
              {
                icon: Video,
                title: "Supervisión Continua",
                description: "Círculos mensuales de supervisión grupal para revisar casos, resolver dudas y seguir creciendo como facilitador.",
                bgColor: "bg-gold/10",
                textColor: "text-gold-dark",
              },
              {
                icon: Globe,
                title: "Respaldo Internacional",
                description: "Si quieres organizar encuentros en otro país, te brindamos acompañamiento, protocolos y conexión con la red local.",
                bgColor: "bg-coral/10",
                textColor: "text-coral",
              },
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-warm-gray-100 hover:shadow-lg transition-shadow">
                <div className={`w-12 h-12 ${item.bgColor} rounded-xl flex items-center justify-center mb-4`}>
                  <item.icon className={`w-6 h-6 ${item.textColor}`} />
                </div>
                <h3 className="font-bold text-warm-gray-800 mb-2">{item.title}</h3>
                <p className="text-warm-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>

          {/* Try One Cycle First Option */}
          <div className="mt-12 max-w-3xl mx-auto">
            <div className="bg-gradient-to-r from-gold/10 to-coral/10 rounded-3xl p-8 border border-gold/20">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-sm flex-shrink-0">
                  <Sparkles className="w-10 h-10 text-gold-dark" />
                </div>
                <div className="text-center md:text-left">
                  <h4 className="font-bold text-burgundy text-xl mb-2">¿No estás seguro de comprometerte con el programa completo?</h4>
                  <p className="text-warm-gray-600 mb-4">
                    Puedes comenzar con el Ciclo 0 para conocer nuestra metodología y decidir si es para ti.
                    Si continúas, tu inversión inicial se aplica al programa completo.
                  </p>
                  <TrackedWhatsAppLink
                    phone={whatsappNumber}
                    message="Hola, me interesa probar el Ciclo 0 de la Formación de Facilitadores antes de comprometerme con el programa completo. ¿Podrían darme más información?"
                    page="escuela"
                    buttonLocation="try-one-cycle"
                    value={180000}
                    className="inline-flex items-center justify-center gap-2 bg-burgundy hover:bg-burgundy-dark text-white font-semibold py-3 px-6 rounded-full transition-all hover:scale-105"
                  >
                    Consultar sobre el Ciclo 0
                  </TrackedWhatsAppLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Instructors/Facilitators */}
      <section className="section-padding bg-gradient-warm">
        <div className="section-container">
          <div className="text-center mb-16">
            <span className="text-coral font-semibold uppercase tracking-wide text-sm">Quiénes te forman</span>
            <h2 className="text-burgundy mt-3 mb-4">Nuestros Formadores</h2>
            <p className="text-warm-gray-600 max-w-2xl mx-auto">
              Un equipo con más de una década de experiencia en facilitación y formación de facilitadores.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Sergio */}
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
              <div className="relative h-64 bg-gradient-burgundy">
                <Image
                  src="/images/sergio.png"
                  alt="Sergio Sanz"
                  fill
                  className="object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-burgundy/80 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="text-xl font-bold">Sergio Sanz</h3>
                  <p className="text-coral-light text-sm">Fundador & Psicólogo Clínico</p>
                </div>
              </div>
              <div className="p-6">
                <p className="text-warm-gray-600 text-sm leading-relaxed">
                  Psicólogo clínico con más de 10 años formando facilitadores en Latinoamérica y Europa.
                  Creador del modelo integrativo FloreSiendo que combina psicoterapia con prácticas ancestrales.
                </p>
              </div>
            </div>

            {/* Flor */}
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
              <div className="relative h-64 bg-gradient-burgundy">
                <Image
                  src="/images/Flor.webp"
                  alt="Flor Soeiro"
                  fill
                  className="object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-burgundy/80 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="text-xl font-bold">Flor Soeiro</h3>
                  <p className="text-coral-light text-sm">Fundadora & Facilitadora</p>
                </div>
              </div>
              <div className="p-6">
                <p className="text-warm-gray-600 text-sm leading-relaxed">
                  Facilitadora con amplia experiencia en acompañamiento de procesos de transformación personal.
                  Su enfoque combina la calidez del corazón con la estructura necesaria para espacios seguros.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Admission Requirements */}
      <section className="section-padding bg-gradient-warm">
        <div className="section-container">
          <div className="text-center mb-12">
            <span className="text-coral font-semibold uppercase tracking-wide text-sm">Antes de aplicar</span>
            <h2 className="text-burgundy mt-3 mb-4">Requisitos de Admisión</h2>
            <p className="text-warm-gray-600 max-w-2xl mx-auto">
              Para garantizar la seguridad y calidad de la formación, requerimos experiencia previa con nuestro enfoque.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-warm-gray-100">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-burgundy/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <UserCheck className="w-8 h-8 text-burgundy" />
                </div>
                <div>
                  <h3 className="font-bold text-burgundy text-xl mb-3">
                    Participación en al menos 2 encuentros con FloreSiendo
                  </h3>
                  <p className="text-warm-gray-600 mb-4">
                    Antes de iniciar la formación, necesitas haber participado en un mínimo de dos encuentros con nosotros.
                    Esto nos permite conocerte, evaluar tu preparación y asegurar que comprendes nuestro enfoque integrativo.
                  </p>
                  <div className="bg-gold/10 rounded-xl p-4 border border-gold/20">
                    <p className="text-warm-gray-700 text-sm">
                      <strong className="text-gold-dark">¿Tienes experiencia previa con otras organizaciones?</strong>{" "}
                      Podemos considerar tu trayectoria caso por caso. Contáctanos para una evaluación personalizada.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-warm-gray-100">
                <h4 className="font-semibold text-warm-gray-800 mb-4">También valoramos:</h4>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    "Experiencia en trabajo terapéutico o coaching",
                    "Práctica contemplativa o meditativa regular",
                    "Estabilidad emocional y disposición al trabajo personal",
                    "Compromiso con la ética y el servicio a otros",
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-coral flex-shrink-0" />
                      <span className="text-warm-gray-600 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 text-center">
                <Link
                  href="/encuentros"
                  className="inline-flex items-center justify-center gap-2 bg-burgundy hover:bg-burgundy-dark text-white font-semibold py-3 px-6 rounded-full transition-all hover:scale-105"
                >
                  Ver próximos encuentros
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="section-padding bg-warm-white">
        <div className="section-container">
          <div className="text-center mb-16">
            <span className="text-coral font-semibold uppercase tracking-wide text-sm">Inversión</span>
            <h2 className="text-burgundy mt-3 mb-4">Tu Inversión en esta Formación</h2>
            <p className="text-warm-gray-600 max-w-2xl mx-auto">
              Una inversión en ti mismo que te acompañará toda la vida profesional.
            </p>
          </div>

          <div className="max-w-lg mx-auto">
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-warm-gray-100">
              <div className="bg-gradient-to-r from-burgundy to-burgundy-dark p-8 text-white text-center">
                <h3 className="text-2xl font-bold mb-2">Formación Completa</h3>
                <p className="text-coral-light">Online + Presencial + Integración</p>
              </div>

              <div className="p-8">
                {/* What's Included */}
                <div className="mb-8">
                  <h4 className="font-bold text-warm-gray-800 mb-4">Incluye:</h4>
                  <ul className="space-y-3">
                    {[
                      "28 días de formación presencial (Ciclos 0-6)",
                      "140+ horas de contacto directo",
                      "Alojamiento y alimentación en cada ciclo",
                      "Sesiones de seguimiento online entre ciclos",
                      "Role-play y práctica entre pares online",
                      "Supervisión de casos con formadores",
                      "Materiales y recursos de por vida",
                      "Reconocimiento como facilitador formado",
                      "Acceso a red internacional de egresados",
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                        <span className="text-warm-gray-600">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Investment Info */}
                <div className="bg-warm-gray-50 rounded-2xl p-6 mb-8">
                  <p className="text-warm-gray-600 text-center mb-4">
                    La inversión se determina de forma personalizada según tu situación.
                    Ofrecemos planes de pago flexibles de 3 a 6 meses.
                  </p>
                  <p className="text-center text-sm text-warm-gray-500">
                    Solicita información para conocer opciones de inversión y facilidades de pago.
                  </p>
                </div>

                {/* CTA */}
                <TrackedWhatsAppLink
                  phone={whatsappNumber}
                  message={whatsappMessage}
                  page="escuela"
                  buttonLocation="pricing"
                  value={180000}
                  className="w-full inline-flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-4 px-8 rounded-full text-lg transition-all hover:scale-105 shadow-lg"
                >
                  <WhatsAppIcon className="w-6 h-6" />
                  Solicitar Información
                </TrackedWhatsAppLink>
              </div>
            </div>

            {/* Guarantee */}
            <div className="mt-8 text-center">
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-white rounded-full shadow-sm border border-warm-gray-100">
                <Shield className="w-5 h-5 text-green-500" />
                <span className="text-warm-gray-600 text-sm">
                  Garantía de satisfacción en la fase online
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-warm-white">
        <div className="section-container">
          <div className="text-center mb-16">
            <span className="text-coral font-semibold uppercase tracking-wide text-sm">Preguntas frecuentes</span>
            <h2 className="text-burgundy mt-3 mb-4">Resuelve tus dudas</h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                question: "¿Cuáles son los requisitos para entrar al programa?",
                answer: "El requisito principal es haber participado en al menos 2 encuentros con FloreSiendo antes de iniciar la formación. Esto nos permite conocerte, evaluar tu preparación y asegurar que comprendes nuestro enfoque. Si tienes experiencia previa con otras organizaciones, podemos considerarla caso por caso.",
              },
              {
                question: "¿Cómo se evalúa el progreso en la formación?",
                answer: "A diferencia de programas basados solo en asistencia, utilizamos evaluación por competencias. Medimos tu desarrollo en las 6 competencias del facilitador mediante role-play, práctica supervisada progresiva (de apoyo a responsable) y retroalimentación estructurada. El reconocimiento como facilitador formado requiere demostrar dominio en al menos 5 de las 6 competencias.",
              },
              {
                question: "¿Qué pasa si no estoy listo para facilitar al final?",
                answer: "La seguridad es nuestra prioridad. Si identificamos áreas que requieren más desarrollo, ofrecemos ciclos adicionales de práctica supervisada y mentoría personalizada. No reconocemos como facilitador formado a nadie que no demuestre las competencias necesarias para facilitar con seguridad.",
              },
              {
                question: "¿Cuánto dura la formación completa?",
                answer: "Los 7 ciclos (del 0 al 6) se distribuyen a lo largo de 12-18 meses, con 2-4 semanas de integración entre cada ciclo. Este espaciado permite la práctica personal, sesiones de seguimiento online quincenales y asimilación profunda del aprendizaje.",
              },
              {
                question: "¿Cuál es el tamaño del grupo?",
                answer: "Mantenemos cohortes de máximo 10-12 participantes para garantizar atención personalizada y seguridad. Las sesiones de seguimiento online entre ciclos son de 7-9 personas con un mentor asignado.",
              },
              {
                question: "¿Hay requisitos de educación continua?",
                answer: "Sí, como parte de nuestra red de egresados, recomendamos 16 horas anuales de educación continua. Ofrecemos talleres avanzados, supervisión de pares y especializaciones opcionales para mantener y profundizar tus competencias.",
              },
              {
                question: "¿Hay opciones de pago?",
                answer: "Sí, ofrecemos planes de pago flexibles de 3 a 12 meses. También tenemos un número limitado de becas parciales para personas comprometidas que lo necesiten. Consulta las opciones disponibles.",
              },
            ].map((faq, index) => (
              <details
                key={index}
                className="group bg-white rounded-2xl shadow-sm border border-warm-gray-100 overflow-hidden"
              >
                <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                  <h3 className="font-semibold text-warm-gray-800 pr-4">{faq.question}</h3>
                  <ChevronDown className="w-5 h-5 text-warm-gray-400 group-open:rotate-180 transition-transform flex-shrink-0" />
                </summary>
                <div className="px-6 pb-6">
                  <p className="text-warm-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="section-padding bg-gradient-burgundy text-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-coral/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-burgundy-light/20 rounded-full blur-3xl" />

        <div className="section-container relative z-10 text-center">
          <h2 className="text-white mb-6 text-3xl md:text-4xl">
            ¿Listo para dar el siguiente paso?
          </h2>
          <p className="text-coral-light/80 mb-10 max-w-2xl mx-auto text-lg">
            Únete a más de 50 facilitadores que han transformado su vida y la de otros
            a través de esta formación. Tu camino como facilitador comienza aquí.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <TrackedWhatsAppLink
              phone={whatsappNumber}
              message={whatsappMessage}
              page="escuela"
              buttonLocation="footer"
              value={180000}
              className="inline-flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-4 px-8 rounded-full text-lg transition-all hover:scale-105 shadow-xl"
            >
              <WhatsAppIcon className="w-6 h-6" />
              Solicitar Información
            </TrackedWhatsAppLink>
            <Link
              href="/encuentros"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold py-4 px-8 rounded-full text-lg transition-all border border-white/30"
            >
              Conocer Encuentros Primero
            </Link>
          </div>

          <p className="mt-8 text-white/60 text-sm">
            Próxima generación: Marzo 2026 · Solo 12 lugares disponibles
          </p>
        </div>
      </section>
    </main>
  );
}