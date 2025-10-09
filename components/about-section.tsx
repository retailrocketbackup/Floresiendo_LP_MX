// components/AboutSection.tsx

// Este componente no necesita "use client" porque no es interactivo.
export function AboutSection() {
  return (
    // Usamos un fondo blanco para crear un contraste limpio entre las secciones grises.
    <section className="py-20 px-4 bg-purple-900">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-50 mb-4">
            Nuestros Retiros, Tu Casa
          </h2>
        </div>

        <div className="space-y-6 text-lg text-gray-50 max-w-3xl mx-auto text-pretty leading-relaxed text-justify">
          <p>
            Nuestros retiros son un espacio para dejar atrás lo que duele, sanar desde la raíz y volver a sentir paz en tu interior.
          </p>
          <p>
            Es una oportunidad para reconectar con tu alegría, tu confianza y tu fuerza interior en un entorno de respeto, calidez y acompañamiento real.
          </p>
          <p>
            Como escuela internacional, hemos acompañado a cientos de personas de México, Europa y Sudamérica a liberar su máximo potencial en un espacio de total seguridad, guiados por profesionales y sin dogmas.
          </p>
        </div>
      </div>
    </section>
  );
}