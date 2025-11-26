import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Leaf, Shield, Heart, AlertTriangle, Sparkles } from "lucide-react";

export const metadata = {
  title: "Medicinas Ancestrales | FloreSiendo México",
  description: "Conoce las medicinas ancestrales con las que trabajamos: ayahuasca, bufo alvarius, kambó. Enfoque integrativo y seguro.",
};

const medicinas = [
  {
    name: "Ayahuasca",
    description: "Decocción de dos plantas amazónicas que produce un líquido marrón de sabor amargo-dulce, facilitando vivencias de expansión de la consciencia y apertura del corazón.",
    details: "La ayahuasca es una medicina milenaria utilizada por pueblos indígenas de la Amazonía. En nuestros encuentros, la utilizamos como catalizador para procesos de sanación emocional, conexión espiritual y autoconocimiento profundo.",
    bgColor: "bg-gold/10",
    borderColor: "border-gold/30",
    textColor: "text-gold-dark",
    accentColor: "bg-gold",
  },
  {
    name: "Bufo Alvarius",
    description: "Secreción de un sapo del desierto de Sonora que permite la fusión con la totalidad a través de un sentir oceánico e infinito.",
    details: "El bufo es una de las medicinas más potentes conocidas, ofreciendo una experiencia breve pero profunda de disolución del ego y conexión con la unidad. Utilizada con respeto y preparación adecuada.",
    bgColor: "bg-coral/10",
    borderColor: "border-coral/30",
    textColor: "text-coral-dark",
    accentColor: "bg-coral",
  },
  {
    name: "Kambó",
    description: "Secreción de una rana amazónica aplicada sobre la piel, conocida como 'la vacuna de la selva', que fortalece el sistema inmunológico con péptidos bioactivos.",
    details: "El kambó es una medicina purificadora que trabaja a nivel físico, limpiando el cuerpo de toxinas y fortaleciendo el sistema inmune. Es una experiencia intensa pero breve.",
    bgColor: "bg-burgundy/10",
    borderColor: "border-burgundy/30",
    textColor: "text-burgundy",
    accentColor: "bg-burgundy",
  },
  {
    name: "Yopo",
    description: "Medicina natural enteógena de orígenes amazónicos, preparada a partir de la semilla molida de Anadenanthera Peregrina, inhalada como polvo.",
    details: "El yopo es una medicina ancestral que facilita visiones y estados de consciencia expandida. Se utiliza en contextos ceremoniales específicos con la guía de facilitadores experimentados.",
    bgColor: "bg-warm-gray-100",
    borderColor: "border-warm-gray-200",
    textColor: "text-warm-gray-800",
    accentColor: "bg-warm-gray-600",
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
            alt="Medicinas ancestrales"
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
            <span className="text-sm font-medium">Sabiduría ancestral</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 max-w-4xl mx-auto animate-slide-up">
            Medicinas{" "}
            <span className="text-coral">ancestrales</span>
          </h1>
          <p className="text-xl text-coral-light/90 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: "0.1s" }}>
            Sustancias de origen vegetal o animal que facilitan la conexión con
            el &ldquo;entheos&rdquo; - lo divino que habita en nosotros.
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
                &ldquo;Nuestro enfoque con la ayahuasca es integrativo y a la vez descontextualizado.
                Respetamos la ayahuasca como una maravillosa medicina pero no la adoramos
                ni la consideramos una panacea o un oráculo.&rdquo;
              </blockquote>
              <p className="text-warm-gray-600 mb-6 leading-relaxed">
                Las medicinas enteógenas son catalizadores de consciencia, no fines en sí mismas.
                El verdadero trabajo ocurre en la integración: el diálogo compasivo que facilita
                comprensiones liberadoras.
              </p>
              <p className="text-warm-gray-600 leading-relaxed">
                La integración es una medicina en sí misma, donde procesamos y damos sentido
                a las experiencias vividas para generar cambios duraderos en nuestra vida.
              </p>
            </div>
            <div className="relative">
              <div className="absolute -top-4 -right-4 w-72 h-72 bg-gold/10 rounded-full blur-3xl" />
              <Image
                src="/images/medicinas.png"
                alt="Medicinas ancestrales"
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
                description: "Evaluación médica previa, contraindicaciones claras, ambiente controlado y equipo preparado para emergencias.",
                color: "coral",
              },
              {
                icon: Heart,
                title: "Respeto sin dogma",
                description: "Honramos la sabiduría de las medicinas sin convertirlas en religión. El protagonista eres tú, no la sustancia.",
                color: "burgundy",
              },
              {
                icon: Leaf,
                title: "Integración continua",
                description: "El trabajo no termina en la ceremonia. La integración es donde se consolidan los aprendizajes y cambios.",
                color: "gold",
              },
            ].map((item, index) => (
              <div key={index} className="card-interactive p-8 group">
                <div className={`w-16 h-16 bg-${item.color}/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <item.icon className={`w-8 h-8 text-${item.color}`} />
                </div>
                <h3 className="font-bold text-warm-gray-800 mb-3 text-xl">{item.title}</h3>
                <p className="text-warm-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Medicinas List */}
      <section className="section-padding bg-warm-white">
        <div className="section-container">
          <div className="text-center mb-16">
            <span className="text-coral font-semibold uppercase tracking-wide text-sm">Conoce</span>
            <h2 className="text-burgundy mt-3 mb-4">Las medicinas</h2>
            <p className="text-warm-gray-600 max-w-2xl mx-auto">
              Trabajamos con diversas medicinas ancestrales, cada una con sus propiedades y aplicaciones específicas.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            {medicinas.map((medicina, index) => (
              <div
                key={index}
                className={`${medicina.bgColor} rounded-3xl p-8 border ${medicina.borderColor} hover:shadow-lg transition-shadow`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 ${medicina.accentColor} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className={`text-2xl font-bold ${medicina.textColor} mb-3`}>
                      {medicina.name}
                    </h3>
                    <p className="text-warm-gray-700 mb-4 italic text-lg">
                      {medicina.description}
                    </p>
                    <p className="text-warm-gray-600">
                      {medicina.details}
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
                  El trabajo con medicinas enteógenas requiere preparación, evaluación médica
                  y acompañamiento profesional. No recomendamos su uso fuera de contextos
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
          <h2 className="text-white mb-6">¿Tienes dudas sobre las medicinas?</h2>
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
