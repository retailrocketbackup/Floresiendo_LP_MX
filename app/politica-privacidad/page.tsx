import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Política de Privacidad | FloreSiendo",
  description:
    "Política de privacidad y protección de datos personales de FloreSiendo - Retiros de Ayahuasca en Morelos, México.",
}

export default function PoliticaPrivacidad() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Política de Privacidad</h1>

          <div className="prose prose-lg max-w-none text-gray-700 space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                1. Introducción: Nuestro Compromiso con la Privacidad
              </h2>
              <p className="leading-relaxed">
                Desde <strong>FLORESIENDO</strong> siempre hemos considerado de especial importancia la privacidad e
                intimidad de nuestros clientes. La protección de sus datos personales ha sido una constante en el
                compromiso que hemos asumido desde el primer instante en el que depositaron su confianza en nosotros.
              </p>
              <p className="leading-relaxed">
                Queremos que el respeto por su derecho fundamental a la protección de sus datos sea una constante.
                Trataremos de cederle el control sobre su propia información.
              </p>
              <p className="leading-relaxed">
                La Política de Privacidad que le detallamos a continuación podrá ayudarle a comprender mejor cómo
                utilizamos sus datos personales. En ella explicamos con más detalle los tipos de datos personales que
                recabamos, cómo los recabamos, con qué fines podemos utilizarlos y con quién podemos compartirlos.
              </p>
              <p className="leading-relaxed">
                Esta Política de Privacidad se aplica a la web de <strong>FLORESIENDO</strong>{" "}
                (https://www.floresiendo.com), así como al resto de productos y servicios que puede o pueda contratar
                con nosotros.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                2. ¿Quién es el Responsable de sus datos personales?
              </h2>
              <p className="leading-relaxed">
                <strong>FLORESIENDO</strong> es la responsable de cualquier dato personal del que usted sea titular y
                que sea tratado por nosotros.
              </p>
              <p className="leading-relaxed">
                Nosotros somos los responsables de custodiar sus datos, de darles el uso adecuado y de protegerlos con
                las medidas necesarias para evitar un mal uso de los mismos.
              </p>
              <p className="leading-relaxed">
                Es importante reconocer que por dato personal se entiende cualquier información que permite la
                identificación de una persona o cualquier información que sirva para hacerla identificable. Por tanto,
                el nombre es un dato personal, pero también lo es la dirección IP de un ordenador o el número de
                teléfono.
              </p>
              <p className="leading-relaxed">
                En consecuencia, <strong>FLORESIENDO</strong> cumple con el principio de minimización de datos, esto es,
                usar solo los datos personales estrictamente necesarios, por el mínimo de personas necesarias y el menor
                número de veces.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. ¿Qué datos personales recabamos?</h2>
              <p className="leading-relaxed">Los datos personales que recabamos incluyen:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Datos de identificación:</strong> Nombre, apellidos, documento de identidad
                </li>
                <li>
                  <strong>Datos de contacto:</strong> Dirección de correo electrónico, número de teléfono
                </li>
                <li>
                  <strong>Datos de navegación:</strong> Dirección IP, cookies, datos de uso del sitio web
                </li>
                <li>
                  <strong>Datos de salud:</strong> Información médica relevante para la participación segura en nuestros
                  retiros
                </li>
                <li>
                  <strong>Datos de pago:</strong> Información necesaria para procesar pagos (procesada por terceros
                  seguros)
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                4. ¿Para qué utilizamos sus datos personales?
              </h2>
              <p className="leading-relaxed">Utilizamos sus datos personales para:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Gestionar su participación en nuestros retiros y ceremonias</li>
                <li>Garantizar su seguridad y bienestar durante las experiencias</li>
                <li>Comunicarnos con usted sobre nuestros servicios</li>
                <li>Procesar pagos y gestionar facturación</li>
                <li>Cumplir con obligaciones legales y regulatorias</li>
                <li>Mejorar nuestros servicios y experiencia del usuario</li>
                <li>Enviar comunicaciones promocionales (con su consentimiento)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Base legal para el tratamiento</h2>
              <p className="leading-relaxed">El tratamiento de sus datos personales se basa en:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Ejecución de contrato:</strong> Para proporcionar nuestros servicios
                </li>
                <li>
                  <strong>Interés legítimo:</strong> Para mejorar nuestros servicios y comunicación
                </li>
                <li>
                  <strong>Consentimiento:</strong> Para comunicaciones promocionales y cookies no esenciales
                </li>
                <li>
                  <strong>Cumplimiento legal:</strong> Para cumplir con obligaciones regulatorias
                </li>
                <li>
                  <strong>Interés vital:</strong> Para proteger su salud y seguridad
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. ¿Con quién compartimos sus datos?</h2>
              <p className="leading-relaxed">Sus datos personales pueden ser compartidos con:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Profesionales de la salud:</strong> Médicos y terapeutas que supervisan nuestros retiros
                </li>
                <li>
                  <strong>Proveedores de servicios:</strong> Empresas que nos ayudan a operar nuestros servicios
                </li>
                <li>
                  <strong>Procesadores de pago:</strong> Para gestionar transacciones de forma segura
                </li>
                <li>
                  <strong>Autoridades competentes:</strong> Cuando sea requerido por ley
                </li>
              </ul>
              <p className="leading-relaxed">Nunca vendemos sus datos personales a terceros.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Sus derechos</h2>
              <p className="leading-relaxed">Usted tiene derecho a:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Acceso:</strong> Solicitar información sobre sus datos personales
                </li>
                <li>
                  <strong>Rectificación:</strong> Corregir datos inexactos o incompletos
                </li>
                <li>
                  <strong>Supresión:</strong> Solicitar la eliminación de sus datos
                </li>
                <li>
                  <strong>Limitación:</strong> Restringir el procesamiento de sus datos
                </li>
                <li>
                  <strong>Portabilidad:</strong> Recibir sus datos en formato estructurado
                </li>
                <li>
                  <strong>Oposición:</strong> Oponerse al procesamiento de sus datos
                </li>
                <li>
                  <strong>Retirar consentimiento:</strong> En cualquier momento
                </li>
              </ul>
              <p className="leading-relaxed">
                Para ejercer estos derechos, contáctenos a través de los medios indicados en esta política.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Seguridad de los datos</h2>
              <p className="leading-relaxed">
                Implementamos medidas técnicas y organizativas apropiadas para proteger sus datos personales contra el
                acceso no autorizado, alteración, divulgación o destrucción. Esto incluye:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Cifrado de datos sensibles</li>
                <li>Acceso restringido a datos personales</li>
                <li>Capacitación regular del personal</li>
                <li>Auditorías de seguridad periódicas</li>
                <li>Protocolos de respuesta a incidentes</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Retención de datos</h2>
              <p className="leading-relaxed">
                Conservamos sus datos personales solo durante el tiempo necesario para cumplir con los fines para los
                que fueron recabados, incluyendo cualquier período de retención requerido por ley.
              </p>
              <p className="leading-relaxed">
                Los datos médicos y de seguridad se conservan durante períodos más largos para garantizar la continuidad
                del cuidado y cumplir con regulaciones de salud.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Cookies y tecnologías similares</h2>
              <p className="leading-relaxed">
                Utilizamos cookies y tecnologías similares para mejorar su experiencia en nuestro sitio web, analizar el
                tráfico y personalizar el contenido. Puede gestionar sus preferencias de cookies a través de la
                configuración de su navegador.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Cambios en esta política</h2>
              <p className="leading-relaxed">
                Podemos actualizar esta Política de Privacidad periódicamente. Le notificaremos sobre cambios
                significativos publicando la nueva política en nuestro sitio web y, cuando sea apropiado, por otros
                medios de comunicación.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Contacto</h2>
              <p className="leading-relaxed">
                Si tiene preguntas sobre esta Política de Privacidad o desea ejercer sus derechos, puede contactarnos:
              </p>
              <div className="bg-purple-50 p-6 rounded-lg mt-4">
                <p className="font-semibold text-purple-900">FloreSiendo</p>
                <p className="text-purple-800">Morelos, México</p>
                <p className="text-purple-800">WhatsApp: +52 618 230 1481</p>
                <p className="text-purple-800">Email: info@floresiendo.com</p>
              </div>
            </section>

            <section className="border-t pt-8 mt-12">
              <p className="text-sm text-gray-600 text-center">
                <strong>Última actualización:</strong> Enero 2025
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
