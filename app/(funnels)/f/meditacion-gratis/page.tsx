"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Calendar, Clock, Users, CheckCircle, Brain, Heart, Moon } from "lucide-react";
import { trackEvent, trackPageViewContent } from "@/lib/meta-tracking";

export default function MeditacionGratisPage() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    countryCode: "+52",
    phoneNumber: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Session details - update these for each campaign
  const sessionDate = "Lunes 10 de Febrero";
  const sessionTime = "7:00 PM (Hora CDMX)";

  // Track page view on mount
  useEffect(() => {
    trackPageViewContent({
      page: "meditacion-gratis",
      contentName: "meditacion_en_vivo_landing",
    });
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (isSubmitted) {
      const userName = encodeURIComponent(formData.firstname);
      const whatsappUrl = `https://api.whatsapp.com/send?phone=+526182301481&text=Hola%20Ramon,%20quiero%20confirmar%20mi%20lugar%20para%20la%20meditaci%C3%B3n%20en%20vivo.%20Me%20llamo%20${userName}.`;

      const redirectTimeout = setTimeout(() => {
        window.location.href = whatsappUrl;
      }, 3000);

      return () => clearTimeout(redirectTimeout);
    }
  }, [isSubmitted, formData.firstname]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const fullPhoneNumber = `${formData.countryCode}${formData.phoneNumber}`;

    try {
      // 1. Meta tracking - Custom Lead event for meditation funnel
      await trackEvent(
        "Lead_Meditacion_Gratis",
        {
          funnel: "meditacion-gratis",
          content_type: "lead_magnet",
          content_name: "meditacion_en_vivo",
          first_name: formData.firstname,
          last_name: formData.lastname,
          phone: fullPhoneNumber,
        },
        { enableCAPI: true }
      );

      // 2. Save to HubSpot
      const contactData = {
        firstname: formData.firstname,
        lastname: formData.lastname,
        phone: fullPhoneNumber,
        funnel_source: "meditacion-gratis",
        landing_page: window.location.href,
      };

      await fetch("/api/hubspot-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contactData),
      });

      // 3. Meta tracking - CompleteRegistration after successful submission
      await trackEvent(
        "CompleteRegistration",
        {
          funnel: "meditacion-gratis",
          content_type: "meditation_registration",
          content_name: "meditacion_en_vivo",
          first_name: formData.firstname,
          last_name: formData.lastname,
          phone: fullPhoneNumber,
          value: 0,
          currency: "MXN",
        },
        { enableCAPI: true }
      );

      setIsSubmitting(false);
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error submitting form:", error);
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-burgundy to-burgundy-dark flex items-center justify-center px-4">
        <div className="max-w-xl mx-auto text-center text-white">
          <div className="mb-8">
            <CheckCircle className="w-20 h-20 text-green-400 mx-auto" />
          </div>
          <h2 className="text-3xl font-bold mb-4">¡Registro exitoso!</h2>
          <p className="text-xl text-coral-light mb-6">
            En un momento te redirigiremos a WhatsApp para confirmar tu lugar
            y enviarte el enlace de acceso.
          </p>
          <p className="text-coral-light/70">
            Redirigiendo...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/cosmic-spiritual-background.webp"
            alt="Fondo meditación"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-burgundy/90 via-burgundy/80 to-burgundy-dark/95" />
        </div>

        <div className="relative z-10 w-full max-w-5xl mx-auto px-4 py-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Copy */}
            <div className="text-white text-center lg:text-left">
              <div className="inline-block px-4 py-2 bg-gold/20 rounded-full text-gold text-sm font-medium mb-6">
                EVENTO EN VIVO GRATUITO
              </div>

              <h1 className="text-3xl md:text-5xl font-bold mb-6 text-balance leading-tight">
                Meditación Guiada en Vivo
              </h1>

              <p className="text-xl md:text-2xl text-coral-light mb-6">
                30 minutos para calmar tu mente y reconectar contigo
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 justify-center lg:justify-start">
                  <Calendar className="w-5 h-5 text-gold" />
                  <span className="text-lg">{sessionDate}</span>
                </div>
                <div className="flex items-center gap-3 justify-center lg:justify-start">
                  <Clock className="w-5 h-5 text-gold" />
                  <span className="text-lg">{sessionTime}</span>
                </div>
                <div className="flex items-center gap-3 justify-center lg:justify-start">
                  <Users className="w-5 h-5 text-gold" />
                  <span className="text-lg">Cupo limitado - Grupos reducidos</span>
                </div>
              </div>

              <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                <h3 className="font-bold text-gold mb-3">Lo que experimentarás:</h3>
                <ul className="space-y-2 text-coral-light text-left">
                  <li>• Técnicas de respiración para calmar la ansiedad</li>
                  <li>• Meditación guiada por facilitadores certificados</li>
                  <li>• Espacio seguro para compartir (opcional)</li>
                  <li>• Herramientas que puedes usar en tu día a día</li>
                </ul>
              </div>
            </div>

            {/* Right - Form */}
            <div className="bg-white rounded-2xl p-8 shadow-2xl">
              <h2 className="text-2xl font-bold text-burgundy mb-2 text-center">
                Reserva tu lugar
              </h2>
              <p className="text-warm-gray-600 mb-6 text-center">
                Es 100% gratis. Solo necesitamos tus datos para enviarte el acceso.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstname" className="block text-sm font-medium text-warm-gray-700 mb-1">
                      Nombre *
                    </label>
                    <input
                      type="text"
                      id="firstname"
                      name="firstname"
                      required
                      value={formData.firstname}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-warm-gray-300 rounded-lg focus:ring-2 focus:ring-coral focus:border-transparent"
                      placeholder="Tu nombre"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastname" className="block text-sm font-medium text-warm-gray-700 mb-1">
                      Apellido *
                    </label>
                    <input
                      type="text"
                      id="lastname"
                      name="lastname"
                      required
                      value={formData.lastname}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-warm-gray-300 rounded-lg focus:ring-2 focus:ring-coral focus:border-transparent"
                      placeholder="Tu apellido"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-warm-gray-700 mb-1">
                    WhatsApp *
                  </label>
                  <div className="flex gap-2">
                    <select
                      name="countryCode"
                      value={formData.countryCode}
                      onChange={handleInputChange}
                      className="px-3 py-3 border border-warm-gray-300 rounded-lg focus:ring-2 focus:ring-coral bg-warm-gray-50"
                    >
                      <option value="+52">+52</option>
                      <option value="+1">+1</option>
                      <option value="+34">+34</option>
                      <option value="+54">+54</option>
                      <option value="+598">+598</option>
                    </select>
                    <input
                      type="tel"
                      id="phoneNumber"
                      name="phoneNumber"
                      required
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      className="flex-1 px-4 py-3 border border-warm-gray-300 rounded-lg focus:ring-2 focus:ring-coral focus:border-transparent"
                      placeholder="Tu número"
                    />
                  </div>
                  <p className="text-xs text-warm-gray-500 mt-1">
                    Te enviaremos el link de acceso por WhatsApp
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-coral hover:bg-coral-dark disabled:bg-coral/50 text-white font-bold py-4 rounded-full transition-all duration-300 text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Reservando...
                    </span>
                  ) : (
                    "Quiero mi lugar gratis"
                  )}
                </button>

                <p className="text-xs text-warm-gray-500 text-center">
                  Al registrarte aceptas recibir mensajes de WhatsApp con información del evento.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Neuroscience Benefits */}
      <section className="bg-gradient-to-b from-warm-white to-coral/5 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-coral font-semibold uppercase tracking-wide text-sm">
              Lo que la ciencia dice
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-burgundy mt-2 mb-4">
              ¿Qué Pasa en tu Cerebro Durante la Sesión?
            </h2>
            <p className="text-lg text-warm-gray-600 max-w-2xl mx-auto">
              No es magia. Es neurociencia aplicada a través de técnicas milenarias.
            </p>
          </div>

          <div className="max-w-2xl mx-auto space-y-6">
            {[
              {
                icon: Brain,
                title: "Calma tu Amígdala en Minutos",
                description: "La técnica que aprenderás activa tu sistema nervioso parasimpático, reduciendo la respuesta de estrés de tu cerebro. Estudios muestran que 8 semanas de práctica pueden reducir el tamaño de la amígdala (centro del miedo).",
                science: "Neurociencia: Activación del nervio vago"
              },
              {
                icon: Heart,
                title: "Reduce tu Cortisol (Hormona del Estrés)",
                description: "La respiración consciente disminuye los niveles de cortisol en tu cuerpo, mejorando tu sueño, digestión y claridad mental. Sentirás el efecto desde la primera sesión.",
                science: "Fisiología: Regulación hormonal"
              },
              {
                icon: Moon,
                title: "Duerme Profundo Esta Noche",
                description: "Muchos participantes reportan dormir mejor la misma noche de la sesión. Tu sistema nervioso aprende a 'apagarse' correctamente cuando lo necesitas.",
                science: "Resultado: Sueño reparador"
              }
            ].map((benefit, index) => (
              <div key={index} className="flex items-start gap-4 p-6 bg-white rounded-xl shadow-sm border border-coral/10 hover:shadow-md transition-shadow">
                <div className="bg-burgundy text-white rounded-full p-3 flex-shrink-0">
                  <benefit.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-burgundy">
                    {benefit.title}
                  </h3>
                  <p className="text-warm-gray-600 mt-2">
                    {benefit.description}
                  </p>
                  <p className="text-sm text-gold font-medium mt-2">
                    {benefit.science}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Social proof */}
          <div className="mt-12 text-center">
            <p className="text-warm-gray-500 text-sm">
              Más de <span className="font-bold text-burgundy">500 personas</span> han experimentado esta técnica en sesiones anteriores
            </p>
          </div>
        </div>
      </section>

      {/* Facilitator */}
      <section className="bg-burgundy/5 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="w-full max-w-sm mx-auto">
              <div className="relative aspect-square rounded-full overflow-hidden shadow-2xl ring-4 ring-coral/30">
                <Image
                  src="/facilitador.jpg"
                  alt="Ramón Henríquez - Facilitador de meditación"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>

            <div className="text-center md:text-left">
              <span className="text-coral font-semibold uppercase tracking-wide text-sm">
                Tu facilitador
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-burgundy mt-2 mb-4">
                Ramón Henríquez
              </h2>
              <div className="space-y-4 text-warm-gray-600 leading-relaxed">
                <p>
                  Con más de <span className="font-semibold text-burgundy">10 años de experiencia</span> guiando
                  procesos de transformación personal, Ramón ha acompañado a cientos de personas
                  en su camino hacia la paz interior.
                </p>
                <p>
                  Su enfoque combina <span className="text-gold font-medium">técnicas de respiración respaldadas por neurociencia</span> con
                  la sabiduría de tradiciones contemplativas, creando experiencias
                  profundas pero accesibles.
                </p>
                <p className="text-burgundy font-medium italic">
                  "Mi trabajo es darte herramientas que funcionen. Sin misticismo innecesario.
                  Solo práctica que transforma."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-gradient-warm py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-burgundy mb-8 text-center">
            Preguntas frecuentes
          </h2>
          <div className="space-y-4">
            {[
              {
                q: "¿Necesito experiencia previa en meditación?",
                a: "No. Esta sesión está diseñada tanto para principiantes como para personas con experiencia. Te guiaremos paso a paso.",
              },
              {
                q: "¿Cómo me conecto a la sesión?",
                a: "Te enviaremos un enlace de Google Meet por WhatsApp. Solo necesitas un dispositivo con conexión a internet.",
              },
              {
                q: "¿Es realmente gratis?",
                a: "Sí, 100% gratuito. Es nuestra forma de compartir estas prácticas con más personas.",
              },
              {
                q: "¿Qué pasa si no puedo asistir?",
                a: "No hay problema. Solo avísanos por WhatsApp y te invitaremos a la próxima sesión.",
              },
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-warm-gray-100">
                <h3 className="font-bold text-burgundy mb-2">{item.q}</h3>
                <p className="text-warm-gray-600">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
