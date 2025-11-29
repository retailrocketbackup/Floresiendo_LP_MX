import Link from "next/link";
import Image from "next/image";
import { MapPin, Clock, ArrowRight, MessageSquare } from "lucide-react";

export const metadata = {
  title: "Contacto | FloreSiendo México",
  description: "Contáctanos por WhatsApp para conocer más sobre nuestros encuentros y retiros en México.",
};

export default function ContactoPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative py-32 md:py-40 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/cosmic-spiritual-background.webp"
            alt="Contacto FloreSiendo"
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
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6 animate-fade-in">
            <MessageSquare size={16} className="text-coral" />
            <span className="text-sm font-medium">Respuesta en menos de 24 hrs</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 max-w-4xl mx-auto animate-slide-up">
            Hablemos
          </h1>
          <p className="text-xl text-coral-light/90 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: "0.1s" }}>
            Cada proceso es único. Platiquemos sobre el tuyo.
          </p>
        </div>
      </section>

      {/* Contact Options */}
      <section className="section-padding bg-warm-white">
        <div className="section-container">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* WhatsApp - Primary */}
            <div className="card-interactive p-8 border-2 border-green-200 bg-green-50/50">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 overflow-hidden">
                <Image
                  src="/images/whatsapp-icon.webp"
                  alt="WhatsApp"
                  width={64}
                  height={64}
                />
              </div>
              <h2 className="text-2xl font-bold text-warm-gray-800 mb-4">
                Escríbenos por WhatsApp
              </h2>
              <p className="text-warm-gray-600 mb-6">
                La manera más directa de conectar. Cuéntanos qué estás buscando
                y te orientamos sin compromiso.
              </p>
              <p className="text-2xl font-bold text-green-600 mb-6">
                +52 618 230 1481
              </p>
              <a
                href="https://wa.me/526182301481?text=Hola,%20me%20gustaría%20saber%20más%20sobre%20los%20encuentros%20de%20FloreSiendo%20México"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 w-full px-6 py-4 text-lg font-bold bg-green-500 hover:bg-green-600 text-white rounded-full transition-all duration-300 hover:scale-105 shadow-lg"
              >
                <Image
                  src="/images/whatsapp-icon.webp"
                  alt=""
                  width={24}
                  height={24}
                />
                Iniciar conversación
              </a>
            </div>

            {/* Location Info */}
            <div className="card-interactive p-8 bg-coral/5 border-2 border-coral/20">
              <div className="w-16 h-16 bg-burgundy rounded-2xl flex items-center justify-center mb-6">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-warm-gray-800 mb-4">
                Nuestro Espacio
              </h2>
              <p className="text-warm-gray-600 mb-6">
                Un refugio rodeado de naturaleza donde facilitamos
                encuentros de 3 noches.
              </p>
              <div className="space-y-4 text-warm-gray-700">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-coral flex-shrink-0 mt-1" />
                  <span>Morelos, México<br /><span className="text-warm-gray-500 text-sm">(Ubicación exacta al confirmar asistencia)</span></span>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-coral flex-shrink-0 mt-1" />
                  <span>Retiros de 3 noches<br /><span className="text-warm-gray-500 text-sm">Jueves a Domingo</span></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Preview */}
      <section className="section-padding bg-gradient-warm">
        <div className="section-container">
          <div className="text-center mb-12">
            <span className="text-coral font-semibold uppercase tracking-wide text-sm">Resolvemos tus dudas</span>
            <h2 className="text-burgundy mt-3 mb-4">Preguntas frecuentes</h2>
            <p className="text-warm-gray-600 max-w-2xl mx-auto">
              Las preguntas más comunes sobre nuestros encuentros y proceso.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                question: "¿Cómo sé si estoy listo para un encuentro?",
                answer: "Agenda una llamada sin compromiso. Conversaremos sobre tu situación, expectativas y resolveremos todas tus dudas para determinar juntos si es el momento adecuado.",
              },
              {
                question: "¿Es seguro?",
                answer: "La seguridad es nuestra prioridad. Realizamos evaluación previa, tenemos protocolos establecidos y facilitadores con más de 10 años de experiencia.",
              },
              {
                question: "¿Qué incluye el costo del encuentro?",
                answer: "Hospedaje, alimentación, ceremonias, sesiones de integración, acompañamiento de facilitadores y seguimiento post-retiro.",
              },
              {
                question: "¿Cuánto tiempo dura el encuentro?",
                answer: "Los encuentros son de 3 noches (jueves a domingo), aunque también ofrecemos opciones más largas para procesos de formación.",
              },
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-bold text-burgundy mb-2 text-lg">{item.question}</h3>
                <p className="text-warm-gray-600 leading-relaxed">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-gradient-to-b from-coral via-coral-dark to-burgundy text-white -mb-px">
        <div className="section-container text-center">
          <h2 className="text-white mb-6">¿Prefieres una llamada?</h2>
          <p className="text-white/90 mb-10 max-w-2xl mx-auto text-lg">
            Podemos agendar una conversación telefónica si te resulta más cómodo.
            Escríbenos por WhatsApp y coordinamos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/526182301481?text=Hola,%20me%20gustaría%20agendar%20una%20llamada%20para%20conocer%20más%20sobre%20los%20encuentros"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 text-lg font-bold bg-white text-coral hover:bg-warm-gray-50 rounded-full shadow-xl hover:scale-105 transition-all duration-300"
            >
              <Image
                src="/images/whatsapp-icon.webp"
                alt=""
                width={24}
                height={24}
              />
              Agendar llamada
            </a>
            <Link
              href="/encuentros"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold bg-white/20 hover:bg-white/30 text-white border border-white/40 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-105"
            >
              Ver encuentros
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
