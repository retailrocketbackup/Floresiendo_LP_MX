import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Política de Privacidad | FloreSiendo",
  description:
    "Aviso de privacidad y protección de datos personales de Ramon Alan Henriquez Gurrola - Retiros de bienestar en Morelos, México.",
}

export default function PoliticaPrivacidad() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-blue-50">
      <div className="max-w-5xl mx-auto px-4 py-16">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 text-center">Aviso de Privacidad</h1>
          <p className="text-center text-gray-600 mb-8">
            <strong>Última actualización:</strong> Enero 2026
          </p>

          <div className="prose prose-lg max-w-none text-gray-700 space-y-8">
            {/* Section 1 */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                1. Identidad del Responsable
              </h2>
              <p className="leading-relaxed">
                De conformidad con la Ley Federal de Protección de Datos Personales en Posesión de los
                Particulares (LFPDPPP), le informamos que <strong>Ramon Alan Henriquez Gurrola</strong> es
                responsable del tratamiento de sus datos personales.
              </p>
              <div className="bg-gray-50 rounded-lg p-6 mt-4 space-y-2">
                <p><strong>Responsable:</strong> Ramon Alan Henriquez Gurrola</p>
                <p><strong>RFC:</strong> HEGR861016L97</p>
                <p><strong>Domicilio:</strong> Jaral de Peña 241, Residencial El Refugio, Querétaro, Qro., C.P. 76146</p>
                <p><strong>Contacto WhatsApp:</strong> +52 618 230 1481</p>
                <p><strong>Email:</strong> henriquez.alan@gmail.com</p>
                <p><strong>Sitio Web:</strong> www.escuelafloresiendomexicom.com</p>
              </div>
            </section>

            {/* Section 2 */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                2. Datos Personales que Recabamos
              </h2>
              <p className="leading-relaxed">
                Para las finalidades señaladas en el presente aviso de privacidad, podemos recabar las
                siguientes categorías de datos personales:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>
                  <strong>Datos de identificación:</strong> Nombre completo, fecha de nacimiento, género,
                  fotografía (opcional).
                </li>
                <li>
                  <strong>Datos de contacto:</strong> Teléfono, correo electrónico, contacto de emergencia.
                </li>
                <li>
                  <strong>Datos financieros:</strong> Información de pago procesada a través de Conekta
                  (no almacenamos números de tarjeta).
                </li>
              </ul>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mt-6">
                <h3 className="font-semibold text-amber-900 mb-2">Datos Personales Sensibles</h3>
                <p className="text-amber-800 text-sm">
                  Para garantizar su seguridad durante los retiros, recabamos datos sensibles relacionados
                  con su salud:
                </p>
                <ul className="list-disc pl-6 space-y-1 mt-2 text-amber-800 text-sm">
                  <li>Historial médico y condiciones de salud actuales</li>
                  <li>Medicamentos que consume actualmente</li>
                  <li>Antecedentes de salud mental</li>
                  <li>Alergias y restricciones alimenticias</li>
                </ul>
                <p className="text-amber-800 text-sm mt-2">
                  <strong>Estos datos requieren su consentimiento expreso</strong>, el cual se solicita
                  al completar el cuestionario de evaluación.
                </p>
              </div>
            </section>

            {/* Section 3 */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                3. Finalidades del Tratamiento
              </h2>
              <p className="leading-relaxed">
                Sus datos personales serán utilizados para las siguientes finalidades:
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Finalidades Primarias (necesarias)</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Evaluar su elegibilidad para participar en los retiros mediante el cuestionario médico</li>
                <li>Garantizar su seguridad durante el retiro</li>
                <li>Gestionar su reservación y procesar pagos</li>
                <li>Proporcionar el servicio de retiro contratado</li>
                <li>Contactarlo en caso de emergencia</li>
                <li>Dar cumplimiento a obligaciones legales</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Finalidades Secundarias (opcionales)</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Enviarle información sobre futuros retiros y eventos</li>
                <li>Realizar seguimiento post-retiro para integración</li>
                <li>Utilizar testimonios o fotografías con fines promocionales (con consentimiento adicional)</li>
              </ul>
              <p className="text-sm text-gray-600 mt-2">
                Si no desea que sus datos sean tratados para finalidades secundarias, puede indicarlo
                enviando un correo a henriquez.alan@gmail.com
              </p>
            </section>

            {/* Section 4 */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                4. Transferencias de Datos
              </h2>
              <p className="leading-relaxed">
                Sus datos personales podrán ser transferidos a:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>
                  <strong>Conekta:</strong> Procesador de pagos para gestionar transacciones
                  (solo datos financieros necesarios)
                </li>
                <li>
                  <strong>Facilitadores del retiro:</strong> Información médica relevante para garantizar
                  su seguridad (con su consentimiento)
                </li>
                <li>
                  <strong>Servicios de emergencia:</strong> En caso de emergencia médica
                </li>
                <li>
                  <strong>Autoridades competentes:</strong> Cuando exista una obligación legal
                </li>
              </ul>
              <p className="leading-relaxed mt-4">
                <strong>No vendemos ni comercializamos</strong> sus datos personales a terceros con fines
                publicitarios o de marketing.
              </p>
            </section>

            {/* Section 5 */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                5. Derechos ARCO
              </h2>
              <p className="leading-relaxed">
                Usted tiene derecho a conocer qué datos personales tenemos de usted, para qué los
                utilizamos y las condiciones del uso que les damos (Acceso). Asimismo, es su derecho
                solicitar la corrección de su información personal en caso de que esté desactualizada,
                sea inexacta o incompleta (Rectificación); que la eliminemos de nuestros registros o
                bases de datos cuando considere que la misma no está siendo utilizada adecuadamente
                (Cancelación); así como oponerse al uso de sus datos personales para fines específicos
                (Oposición).
              </p>

              <div className="bg-purple-50 p-6 rounded-lg mt-4">
                <h3 className="font-semibold text-purple-900 mb-2">Para ejercer sus derechos ARCO:</h3>
                <p className="text-purple-800">
                  Envíe una solicitud por escrito a: <strong>henriquez.alan@gmail.com</strong>
                </p>
                <p className="text-purple-800 mt-2">Su solicitud debe contener:</p>
                <ul className="list-disc pl-6 mt-2 text-purple-800">
                  <li>Nombre completo y correo electrónico</li>
                  <li>Copia de identificación oficial</li>
                  <li>Descripción clara del derecho que desea ejercer</li>
                  <li>Cualquier documento que facilite la localización de sus datos</li>
                </ul>
                <p className="text-purple-800 mt-4">
                  <strong>Plazo de respuesta:</strong> 20 días hábiles a partir de la recepción de su solicitud.
                </p>
              </div>
            </section>

            {/* Section 6 */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                6. Revocación del Consentimiento
              </h2>
              <p className="leading-relaxed">
                Usted puede revocar el consentimiento que nos ha otorgado para el tratamiento de sus
                datos personales, a fin de que dejemos de hacer uso de los mismos. Sin embargo, es
                importante que tenga en cuenta que no en todos los casos podremos atender su solicitud
                o concluir el uso de forma inmediata, ya que es posible que por alguna obligación legal
                requiramos seguir tratando sus datos personales.
              </p>
              <p className="leading-relaxed mt-4">
                Para revocar su consentimiento, envíe su solicitud a <strong>henriquez.alan@gmail.com</strong>
              </p>
            </section>

            {/* Section 7 */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                7. Limitación del Uso o Divulgación
              </h2>
              <p className="leading-relaxed">
                Si usted desea limitar el uso o divulgación de sus datos personales, puede enviarnos
                su solicitud a henriquez.alan@gmail.com. Le confirmaremos la recepción de su solicitud
                y el plazo en que será atendida.
              </p>
            </section>

            {/* Section 8 */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                8. Cookies y Tecnologías de Rastreo
              </h2>
              <p className="leading-relaxed">
                Nuestro sitio web utiliza cookies y otras tecnologías de rastreo para mejorar su
                experiencia de navegación. Las cookies que utilizamos son:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>
                  <strong>Cookies esenciales:</strong> Necesarias para el funcionamiento básico del sitio
                </li>
                <li>
                  <strong>Cookies analíticas:</strong> Para entender cómo los visitantes usan el sitio
                  (Google Analytics, Meta Pixel)
                </li>
                <li>
                  <strong>Cookies de marketing:</strong> Para mostrar contenido relevante (Meta CAPI)
                </li>
              </ul>
              <p className="leading-relaxed mt-4">
                Puede configurar su navegador para rechazar cookies, aunque esto podría afectar algunas
                funcionalidades del sitio.
              </p>
            </section>

            {/* Section 9 */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                9. Tiempo de Conservación
              </h2>
              <p className="leading-relaxed">
                Conservaremos sus datos personales durante el tiempo necesario para cumplir con las
                finalidades descritas en este aviso, y posteriormente durante los plazos que establezca
                la normativa aplicable. Los datos sensibles de salud serán eliminados transcurridos
                5 años desde su último retiro, salvo obligación legal de conservarlos por más tiempo.
              </p>
            </section>

            {/* Section 10 */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                10. Cambios al Aviso de Privacidad
              </h2>
              <p className="leading-relaxed">
                El presente aviso de privacidad puede sufrir modificaciones, cambios o actualizaciones
                derivadas de nuevos requerimientos legales, de nuestras propias necesidades por los
                servicios que ofrecemos, de nuestras prácticas de privacidad, o por otras causas.
              </p>
              <p className="leading-relaxed mt-4">
                Nos comprometemos a mantenerlo informado sobre los cambios que pueda sufrir el presente
                aviso de privacidad a través de nuestra página web:{" "}
                <strong>www.escuelafloresiendomexicom.com/politica-privacidad</strong>
              </p>
            </section>

            {/* Section 11 - INAI */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                11. Autoridad de Protección de Datos
              </h2>
              <p className="leading-relaxed">
                Si considera que su derecho a la protección de datos personales ha sido lesionado por
                alguna conducta u omisión de nuestra parte, o presume alguna violación a las
                disposiciones previstas en la LFPDPPP, puede interponer una queja o denuncia ante el
                Instituto Nacional de Transparencia, Acceso a la Información y Protección de Datos
                Personales (INAI).
              </p>
              <div className="bg-blue-50 p-6 rounded-lg mt-4">
                <p className="font-semibold text-blue-900">Instituto Nacional de Transparencia (INAI)</p>
                <p className="text-blue-800">Insurgentes Sur 3211, Col. Insurgentes Cuicuilco</p>
                <p className="text-blue-800">Alcaldía Coyoacán, C.P. 04530, Ciudad de México</p>
                <p className="text-blue-800">www.inai.org.mx</p>
              </div>
            </section>

            {/* Contact Section */}
            <section className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contacto</h2>
              <p className="leading-relaxed mb-4">
                Si tiene preguntas sobre este Aviso de Privacidad o desea ejercer sus derechos,
                puede contactarnos:
              </p>
              <div className="bg-purple-50 p-6 rounded-lg">
                <p className="font-semibold text-purple-900">Ramon Alan Henriquez Gurrola</p>
                <p className="text-purple-800">Domicilio: Querétaro, Qro., México</p>
                <p className="text-purple-800">WhatsApp: +52 618 230 1481</p>
                <p className="text-purple-800">Email: henriquez.alan@gmail.com</p>
              </div>
            </section>

            {/* Footer */}
            <section className="border-t pt-8 mt-12">
              <p className="text-sm text-gray-600 text-center">
                <strong>Fecha de última actualización:</strong> Enero 2026
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
