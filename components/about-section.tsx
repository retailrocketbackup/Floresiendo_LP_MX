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

          <div className="space-y-6 text-lg text-gray-50 max-w-3xl mx-auto text-pretty leading-relaxed">
            <p>
              Desde 2022, Escuela FloreSiendo es una escuela internacional con presencia en México, Europa y Sudamérica, dedicada a la expansión de la consciencia y al florecimiento de tu ser.
            </p>
            <p>
              En espacios seguros y profesionales, facilitamos profundos procesos de sanación. Nuestra metodología única integra lo terapéutico y lo espiritual, pero se mantiene completamente libre de dogmas.
            </p>
            <p>
              Nuestros retiros están diseñados para acompañarte a reconectar con tu maestría interior y liberar tu máximo potencial, uniéndote a una comunidad global de crecimiento.
            </p>
          </div>
      </div>
    </section>
  );
}