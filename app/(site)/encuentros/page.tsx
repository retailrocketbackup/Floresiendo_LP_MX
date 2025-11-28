import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, MapPin, Clock, Users, Check, Heart, Star, Sparkles } from "lucide-react";
import { FAQAccordion } from "@/components/faq-accordion";

export const metadata = {
  title: "Encuentros y Retiros | FloreSiendo México",
  description: "Descubre nuestros retiros de 3 noches con prácticas ancestrales y ceremonias tradicionales en Morelos, México.",
};

export default function EncuentrosPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative py-32 md:py-40 overflow-hidden -mb-px">
        <div className="absolute inset-0">
          <Image
            src="/images/venue-alberca.jpg"
            alt="Retiro FloreSiendo en Morelos"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-burgundy/80 via-burgundy/70 to-burgundy" />
        </div>

        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-coral/20 rounded-full blur-3xl animate-pulse-soft" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gold/20 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: "1s" }} />

        <div className="relative z-10 section-container text-center text-white">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6 animate-fade-in">
            <Calendar size={16} className="text-gold" />
            <span className="text-sm font-medium">3 noches transformadoras</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 max-w-4xl mx-auto animate-slide-up">
            Encuentros{" "}
            <span className="text-coral">transformadores</span>
          </h1>
          <p className="text-xl text-coral-light/90 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: "0.1s" }}>
            Los retiros que ofrecemos son una oportunidad para conectarnos con nuestra
            esencia más profunda, con la naturaleza y con el Amor.
          </p>
        </div>
      </section>

      {/* Upcoming Dates - Moved to top */}
      <section className="section-padding bg-burgundy text-white relative overflow-hidden -mt-1">
        {/* Decorative elements */}
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-coral/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-burgundy-light/20 rounded-full blur-3xl" />

        <div className="section-container relative z-10">
          <div className="text-center mb-12">
            <span className="text-coral-light font-semibold uppercase tracking-wide text-sm">Fechas confirmadas</span>
            <h2 className="text-white mt-3 mb-4">Próximos encuentros</h2>
            <p className="text-coral-light/80 max-w-2xl mx-auto">
              Reserva tu lugar en nuestro próximo encuentro transformador en Morelos, México.
            </p>
          </div>

          {/* Event Card */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="flex flex-col md:flex-row gap-6 items-center">
                {/* Date Box */}
                <div className="bg-coral rounded-2xl p-6 text-center min-w-[140px] shadow-lg">
                  <span className="text-white/80 text-sm font-medium uppercase tracking-wide">Febrero</span>
                  <div className="text-4xl font-bold text-white my-1">19-22</div>
                  <span className="text-white/80 text-sm font-medium">2026</span>
                </div>

                {/* Event Details */}
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl font-bold text-white mb-2">Encuentro de Febrero</h3>
                  <div className="flex flex-wrap justify-center md:justify-start gap-4 text-coral-light/90 text-sm mb-4">
                    <span className="flex items-center gap-1">
                      <MapPin size={16} />
                      Morelos, México
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={16} />
                      3 noches
                    </span>
                    <span className="flex items-center gap-1">
                      <Users size={16} />
                      Cupos limitados
                    </span>
                  </div>
                  <Link
                    href="/encuentros/febrero-2026"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 text-base font-bold bg-coral hover:bg-coral-dark text-white rounded-full shadow-lg hover:scale-105 transition-all duration-300"
                  >
                    Ver detalles
                    <ArrowRight size={18} />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <p className="text-center text-coral-light/60 text-sm mt-8">
            ¿Tienes preguntas? Contáctanos para más información sobre el encuentro.
          </p>
        </div>
      </section>

      {/* What is an Encuentro */}
      <section className="section-padding bg-warm-white">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-coral font-semibold uppercase tracking-wide text-sm">La experiencia</span>
              <h2 className="text-burgundy mt-3 mb-6">¿Qué es un encuentro?</h2>
              <p className="text-warm-gray-600 mb-6 leading-relaxed">
                Nuestros encuentros son retiros de 3 noches donde trabajamos con prácticas
                y ceremonias tradicionales en un entorno seguro, sagrado y amoroso.
              </p>
              <p className="text-warm-gray-600 mb-8 leading-relaxed">
                Cada encuentro está diseñado para facilitar experiencias de expansión de
                consciencia, apertura del corazón y bienestar integral, guiados por
                facilitadores con más de una década de experiencia.
              </p>
              <ul className="space-y-4">
                {[
                  "Grupos reducidos y personalizados",
                  "Acompañamiento antes, durante y después",
                  "Integración terapéutica incluida",
                  "Alimentación consciente",
                  "Entorno natural y seguro",
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3 text-warm-gray-700">
                    <div className="w-6 h-6 bg-coral/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-coral" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <div className="absolute -top-4 -right-4 w-72 h-72 bg-coral/10 rounded-full blur-3xl" />
              <Image
                src="/images/circulo-integracion.jpg"
                alt="Círculo de integración grupal"
                width={600}
                height={400}
                className="relative rounded-3xl shadow-2xl hover-lift object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="section-padding bg-gradient-warm">
        <div className="section-container">
          <div className="text-center mb-16">
            <span className="text-coral font-semibold uppercase tracking-wide text-sm">Ubicación</span>
            <h2 className="text-burgundy mt-3 mb-4">Morelos, México</h2>
            <p className="text-warm-gray-600 max-w-2xl mx-auto">
              Nuestros encuentros se realizan en un espacio sagrado rodeado de naturaleza
              en el estado de Morelos, a poca distancia de la Ciudad de México.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: MapPin,
                title: "Fácil acceso",
                description: "A 1.5 horas de CDMX, con opciones de transporte desde el aeropuerto.",
                bgColor: "bg-coral/10",
                textColor: "text-coral",
              },
              {
                icon: Users,
                title: "Grupos íntimos",
                description: "Máximo 15 participantes para garantizar atención personalizada.",
                bgColor: "bg-burgundy/10",
                textColor: "text-burgundy",
              },
              {
                icon: Clock,
                title: "3 noches",
                description: "Experiencia completa con preparación, ceremonias e integración.",
                bgColor: "bg-gold/10",
                textColor: "text-gold",
              },
            ].map((item, index) => (
              <div key={index} className="card-interactive p-8 text-center group">
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

      {/* Venue Gallery */}
      <section className="section-padding bg-warm-white">
        <div className="section-container">
          <div className="text-center mb-12">
            <span className="text-coral font-semibold uppercase tracking-wide text-sm">El espacio</span>
            <h2 className="text-burgundy mt-3 mb-4">Conoce nuestro refugio</h2>
            <p className="text-warm-gray-600 max-w-2xl mx-auto">
              Un espacio diseñado para tu transformación, rodeado de naturaleza y con todas las comodidades.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { src: "/images/venue-alberca.jpg", alt: "Alberca y jardín", span: "md:col-span-2 md:row-span-2" },
              { src: "/images/venue-salon-ceremonias.jpg", alt: "Salón de ceremonias", span: "" },
              { src: "/images/venue-jardin.jpg", alt: "Jardín", span: "" },
              { src: "/images/venue-sala.jpg", alt: "Sala común", span: "" },
              { src: "/images/venue-terraza.jpg", alt: "Terraza", span: "" },
              { src: "/images/venue-habitacion-1.jpg", alt: "Habitación", span: "" },
            ].map((image, index) => (
              <div
                key={index}
                className={`relative overflow-hidden rounded-2xl group ${image.span} ${index === 0 ? "aspect-square md:aspect-auto" : "aspect-square"}`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes={index === 0 ? "(max-width: 768px) 50vw, 66vw" : "(max-width: 768px) 50vw, 33vw"}
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-burgundy/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="absolute bottom-4 left-4 text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {image.alt}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="section-padding bg-warm-white">
        <div className="section-container">
          <div className="text-center mb-16">
            <span className="text-coral font-semibold uppercase tracking-wide text-sm">Todo incluido</span>
            <h2 className="text-burgundy mt-3 mb-4">¿Qué incluye el encuentro?</h2>
            <p className="text-warm-gray-600 max-w-2xl mx-auto">
              Una experiencia completa con todo lo necesario para tu transformación.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              {[
                "Hospedaje durante las 3 noches",
                "Alimentación consciente (vegetariana)",
                "2-3 ceremonias nocturnas",
                "Sesiones de integración grupal",
                "Acompañamiento de facilitadores",
                "Asesoría médica/psicológica",
                "Prácticas de respiración y meditación",
                "Materiales de trabajo personal",
                "Seguimiento post-retiro",
                "Acceso a comunidad de participantes",
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm border border-warm-gray-100 hover:border-coral/30 hover:shadow-md transition-all">
                  <div className="w-8 h-8 bg-coral rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-warm-gray-700 font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="section-padding bg-gradient-warm">
        <div className="section-container">
          <div className="text-center mb-16">
            <span className="text-coral font-semibold uppercase tracking-wide text-sm">El camino</span>
            <h2 className="text-burgundy mt-3 mb-4">¿Cómo funciona el proceso?</h2>
            <p className="text-warm-gray-600 max-w-2xl mx-auto">
              Desde el primer contacto hasta la integración, te acompañamos en cada paso.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="space-y-8">
              {[
                {
                  step: "1",
                  title: "Contacto inicial",
                  description: "Agenda una llamada para conocernos y resolver tus dudas. Evaluamos si el encuentro es adecuado para ti.",
                },
                {
                  step: "2",
                  title: "Preparación",
                  description: "Recibirás indicaciones de alimentación, meditaciones y material de lectura para preparar tu experiencia.",
                },
                {
                  step: "3",
                  title: "El encuentro",
                  description: "3 noches de inmersión con ceremonias, integración y acompañamiento continuo de nuestro equipo.",
                },
                {
                  step: "4",
                  title: "Integración",
                  description: "Seguimiento post-retiro con sesiones de integración y acceso a nuestra comunidad de apoyo.",
                },
              ].map((item, index) => (
                <div key={index} className="flex gap-6 items-start">
                  <div className="w-14 h-14 bg-coral rounded-2xl flex items-center justify-center flex-shrink-0 text-white font-bold text-xl shadow-lg">
                    {item.step}
                  </div>
                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-warm-gray-100 flex-1 hover:shadow-md transition-shadow">
                    <h3 className="font-bold text-burgundy mb-2 text-xl">{item.title}</h3>
                    <p className="text-warm-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-warm-white">
        <div className="section-container">
          <FAQAccordion
            title="Preguntas sobre los encuentros"
            subtitle="Las dudas más comunes de nuestros participantes"
            items={[
              {
                question: "¿Cómo sé si estoy listo para un encuentro?",
                answer: "Sentir curiosidad o llamado es una buena señal. Durante la llamada inicial evaluamos juntos si es el momento adecuado para ti, considerando tu situación emocional, física y cualquier contraindicación.",
              },
              {
                question: "¿Qué debo llevar al encuentro?",
                answer: "Ropa cómoda, artículos de higiene personal, un diario para tus reflexiones y mente abierta. Te enviaremos una lista detallada después de confirmar tu asistencia.",
              },
              {
                question: "¿Puedo asistir solo/a o necesito venir acompañado/a?",
                answer: "Puedes asistir solo/a, la mayoría de participantes llegan así. El grupo se convierte en un espacio de apoyo mutuo durante todo el proceso.",
              },
              {
                question: "¿Qué pasa si tengo miedo o ansiedad antes del encuentro?",
                answer: "Es completamente normal sentir nerviosismo. Te acompañamos en la preparación previa y durante todo el proceso con profesionalismo y amor.",
              },
            ]}
          />
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-gradient-to-b from-coral via-coral-dark to-burgundy text-white -mb-px">
        <div className="section-container text-center">
          <h2 className="text-white mb-6">¿Listo para dar el primer paso?</h2>
          <p className="text-white/90 mb-10 max-w-2xl mx-auto text-lg">
            El viaje más importante empieza con una conversación. Agenda una llamada
            sin compromiso para conocer más sobre nuestros encuentros.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contacto"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-bold bg-white text-coral hover:bg-warm-gray-50 rounded-full shadow-xl hover:scale-105 transition-all duration-300"
            >
              Agenda tu llamada
              <ArrowRight size={20} />
            </Link>
            <Link
              href="/medicinas"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold bg-white/20 hover:bg-white/30 text-white border border-white/40 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-105"
            >
              Conoce nuestras prácticas
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
