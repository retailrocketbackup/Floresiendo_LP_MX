import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Términos y Condiciones | FloreSiendo",
  description:
    "Términos y condiciones de servicio para retiros de bienestar con Ramon Alan Henriquez Gurrola - Morelos, México.",
}

export default function TerminosCondiciones() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-blue-50">
      <div className="max-w-5xl mx-auto px-4 py-16">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 text-center">
            Términos y Condiciones de Servicio
          </h1>
          <p className="text-center text-gray-600 mb-8">
            <strong>Última actualización:</strong> Enero 2026
          </p>

          <div className="prose prose-lg max-w-none text-gray-700 space-y-8">
            {/* Introduction */}
            <p className="leading-relaxed text-lg">
              Este documento constituye un contrato legal vinculante entre el participante
              (&quot;El Cliente&quot;) y el prestador de servicios <strong>Ramon Alan Henriquez Gurrola</strong> (&quot;El Proveedor&quot;).
              Al reservar y participar en los retiros, usted acepta adherirse a estos términos.
            </p>

            {/* Section I */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                I. Identificación del Proveedor
              </h2>
              <div className="bg-gray-50 rounded-lg p-6 space-y-2">
                <p><strong>Prestador de Servicios:</strong> Ramon Alan Henriquez Gurrola</p>
                <p><strong>RFC:</strong> HEGR861016L97</p>
                <p><strong>Domicilio Fiscal:</strong> Jaral de Peña 241, Residencial El Refugio, Querétaro, Qro., C.P. 76146</p>
                <p><strong>Contacto WhatsApp:</strong> +52 618 230 1481</p>
                <p><strong>Email:</strong> henriquez.alan@gmail.com</p>
                <p><strong>Sitio Web:</strong> www.escuelafloresiendomexicom.com</p>
              </div>
            </section>

            {/* Section II */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                II. Descripción del Servicio
              </h2>
              <p className="leading-relaxed">
                El Proveedor ofrece retiros de bienestar y crecimiento personal que incluyen:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Alojamiento en la ubicación designada en Morelos, México</li>
                <li>Alimentación según protocolo del retiro</li>
                <li>Ceremonias de medicina ancestral facilitadas por guías experimentados</li>
                <li>Evaluación médica y psicoemocional pre-retiro (cuestionario de 44 preguntas)</li>
                <li>Acompañamiento durante la experiencia</li>
                <li>Sesiones de integración</li>
              </ul>
              <p className="mt-4"><strong>Capacidad máxima:</strong> 15 participantes por retiro</p>
            </section>

            {/* Section III */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                III. Precios, Pagos y Reservaciones
              </h2>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">A. Estructura de Precios (MXN)</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-gray-50 rounded-lg overflow-hidden">
                  <thead className="bg-purple-100">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold text-gray-900">Paquete</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-900">Precio Preventa</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-900">Precio Regular</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="px-4 py-3">Retiro 2 Noches</td>
                      <td className="px-4 py-3">$7,100 MXN</td>
                      <td className="px-4 py-3">$8,000 MXN</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3">Retiro 3 Noches</td>
                      <td className="px-4 py-3">$10,200 MXN</td>
                      <td className="px-4 py-3">$11,500 MXN</td>
                    </tr>
                    <tr className="bg-purple-50">
                      <td className="px-4 py-3 font-semibold">Depósito de Reserva</td>
                      <td className="px-4 py-3">$3,000 MXN</td>
                      <td className="px-4 py-3">$3,000 MXN</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">B. Procesamiento de Pagos</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Procesador:</strong> Conekta (gateway de pagos mexicano)</li>
                <li><strong>Métodos aceptados:</strong> Tarjeta de crédito, tarjeta de débito</li>
                <li><strong>Moneda:</strong> Pesos mexicanos (MXN)</li>
                <li><strong>Saldo restante:</strong> Debe liquidarse en su totalidad <strong>antes del comienzo del retiro</strong></li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">C. Comprobantes</h3>
              <p>El Proveedor emitirá comprobante de pago por cada transacción realizada a través de Conekta.</p>
            </section>

            {/* Section IV - Cancellation Policy */}
            <section id="cancelacion">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                IV. Política de Cancelación y Transferencia
              </h2>

              <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-bold text-red-800 mb-2">
                  POLÍTICA DE CERO REEMBOLSOS MONETARIOS
                </h3>
                <p className="text-red-700">
                  Debido a la logística, gastos de reservación y al cupo limitado (15 personas),
                  aplicamos una política estricta de pagos y cancelaciones.
                </p>
              </div>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">A. Regla General: No Hay Devoluciones Monetarias</h3>
              <p className="leading-relaxed">
                Todos los pagos realizados son <strong>definitivos y no reembolsables</strong> por
                cancelaciones solicitadas por el participante, sean voluntarias o por imprevistos personales.
              </p>
              <p className="mt-2">Aplica para:</p>
              <ul className="list-disc pl-6 space-y-1 mt-2">
                <li>Depósito ($3,000 MXN)</li>
                <li>Pago total</li>
                <li>Paquetes de 2 o 3 noches</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">B. Opción de Transferencia a Terceros</h3>
              <p className="leading-relaxed mb-4">
                Si no puede asistir, puede ceder su lugar y saldo pagado a otra persona,
                cumpliendo las siguientes condiciones:
              </p>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-gray-50 rounded-lg overflow-hidden">
                  <thead className="bg-purple-100">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold text-gray-900">Plazo de Aviso</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-900">¿Puede Transferir?</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-900">Condiciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr className="bg-green-50">
                      <td className="px-4 py-3 font-semibold">15+ días naturales antes</td>
                      <td className="px-4 py-3 text-green-700 font-semibold">✓ SÍ</td>
                      <td className="px-4 py-3">El nuevo participante debe completar y aprobar el cuestionario médico</td>
                    </tr>
                    <tr className="bg-red-50">
                      <td className="px-4 py-3 font-semibold">Menos de 15 días naturales</td>
                      <td className="px-4 py-3 text-red-700 font-semibold">✗ NO</td>
                      <td className="px-4 py-3">Pérdida total del pago. No es posible transferir</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h4 className="text-lg font-semibold text-gray-800 mt-4 mb-2">Proceso de transferencia:</h4>
              <ol className="list-decimal pl-6 space-y-1">
                <li>Notificar por WhatsApp o email con al menos 15 días de anticipación</li>
                <li>Proporcionar datos completos del nuevo participante</li>
                <li>El nuevo participante debe completar el cuestionario médico</li>
                <li>Una vez aprobado, se confirma la transferencia por escrito</li>
                <li>El depósito y todos los pagos se transfieren al nuevo participante</li>
              </ol>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">C. No Presentación (No-Show)</h3>
              <p className="leading-relaxed">
                Si el Cliente no se presenta el día y hora indicados del retiro, perderá la totalidad
                de lo abonado sin derecho a reclamo ni transferencia.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">D. Excepciones con Derecho a Reembolso del 100%</h3>
              <p className="leading-relaxed mb-4">
                Se realizará reembolso completo (incluyendo depósito) <strong>únicamente</strong> en los siguientes casos:
              </p>
              <div className="space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800">1. Rechazo médico</h4>
                  <p className="text-green-700">
                    Si el participante es rechazado por el equipo del Proveedor debido a contraindicaciones
                    de salud detectadas en el cuestionario de seguridad.
                  </p>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800">2. Cancelación por el Proveedor</h4>
                  <p className="text-green-700">
                    Si el Proveedor cancela el evento por causas operativas. El Cliente puede elegir:
                  </p>
                  <ul className="list-disc pl-6 mt-2 text-green-700">
                    <li>Reembolso del 100% de todos los pagos realizados, O</li>
                    <li>Reprogramación a otra fecha disponible sin costo adicional</li>
                  </ul>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800">3. Fuerza Mayor</h4>
                  <p className="text-green-700">
                    Si el retiro debe cancelarse por circunstancias fuera del control razonable del Proveedor:
                  </p>
                  <ul className="list-disc pl-6 mt-2 text-green-700">
                    <li>Desastres naturales (terremoto, huracán, inundación)</li>
                    <li>Emergencia sanitaria o pandemia declarada por autoridades</li>
                    <li>Órdenes gubernamentales que impidan la realización del evento</li>
                    <li>Enfermedad grave o fallecimiento del facilitador principal</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">E. Procesamiento de Reembolsos</h3>
              <p className="leading-relaxed">Cuando aplique un reembolso según las excepciones anteriores:</p>
              <ul className="list-disc pl-6 space-y-1 mt-2">
                <li><strong>Método:</strong> Se procesará a través de Conekta al mismo método de pago original</li>
                <li><strong>Plazo:</strong> 5-10 días hábiles después de confirmada la solicitud</li>
                <li><strong>Notificación:</strong> El Cliente recibirá confirmación por email cuando el reembolso sea procesado</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">F. Cambios de Fecha por el Cliente</h3>
              <p className="leading-relaxed">Si desea cambiar a otra fecha de retiro (sin ceder su lugar a otra persona):</p>
              <ul className="list-disc pl-6 space-y-1 mt-2">
                <li><strong>15+ días antes:</strong> Sujeto a disponibilidad, máximo 1 cambio permitido</li>
                <li><strong>Menos de 15 días:</strong> No se permiten cambios de fecha</li>
              </ul>
            </section>

            {/* Section V */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                V. Avisos Críticos de Salud y Riesgos
              </h2>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">A. Descargo de Responsabilidad Médica</h3>
              <p className="leading-relaxed">El Cliente reconoce y acepta que:</p>
              <ol className="list-decimal pl-6 space-y-2 mt-2">
                <li>Las medicinas ancestrales utilizadas <strong>NO son medicamentos alopáticos registrados</strong></li>
                <li>La participación <strong>NO sustituye</strong> ningún tratamiento médico, psiquiátrico o psicológico profesional</li>
                <li>El Proveedor ofrece experiencias de bienestar y crecimiento personal, <strong>NO servicios médicos</strong></li>
                <li><strong>No hay garantía</strong> de resultados terapéuticos o curativos</li>
              </ol>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">B. Criterios de Exclusión Absoluta</h3>
              <p className="leading-relaxed">Por seguridad, <strong>NO se admiten</strong> participantes con:</p>
              <ul className="list-disc pl-6 space-y-1 mt-2">
                <li>Embarazo</li>
                <li>Afecciones cardiovasculares graves no controladas</li>
                <li>Hipertensión no controlada (&gt;150/90)</li>
                <li>Antecedentes de psicosis o esquizofrenia</li>
                <li>Uso actual de litio</li>
                <li>Trastorno bipolar no estabilizado</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">C. Condiciones que Requieren Evaluación Especial</h3>
              <p className="leading-relaxed">Las siguientes condiciones requieren revisión por el equipo del Proveedor:</p>
              <ul className="list-disc pl-6 space-y-1 mt-2">
                <li>Uso de medicamentos IMAO, ISRS o antidepresivos</li>
                <li>Antecedentes de ideación suicida</li>
                <li>Adicciones activas</li>
                <li>Tratamiento psiquiátrico actual</li>
                <li>Epilepsia</li>
                <li>Diabetes</li>
                <li>Cirugía reciente (menos de 3 meses)</li>
                <li>Lactancia</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">D. Asunción de Riesgos</h3>
              <p className="leading-relaxed">El Cliente declara que:</p>
              <ol className="list-decimal pl-6 space-y-2 mt-2">
                <li>Ha proporcionado información médica <strong>veraz y completa</strong> en el cuestionario de seguridad</li>
                <li>Entiende los riesgos fisiológicos inherentes (náusea, vómito, cambios cardiovasculares)</li>
                <li>Entiende los riesgos psicológicos inherentes (ansiedad, experiencias intensas, disociación temporal)</li>
                <li>Asume voluntariamente dichos riesgos</li>
                <li>Libera al Proveedor de responsabilidad por reacciones adversas derivadas de <strong>información médica omitida o falsificada</strong></li>
              </ol>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">E. Emergencias Médicas</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>El Proveedor cuenta con equipo de primeros auxilios y facilitadores capacitados</li>
                <li>El lugar del retiro se encuentra a distancia accesible de servicios médicos de emergencia</li>
                <li>En caso de emergencia, el transporte y atención médica corren por cuenta del Cliente</li>
                <li>Se recomienda contar con seguro de gastos médicos vigente</li>
              </ul>
            </section>

            {/* Section VI */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                VI. Protocolos de Conducta
              </h2>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">A. Preparación Pre-Retiro</h3>
              <p className="leading-relaxed">El Cliente se compromete a seguir las indicaciones de preparación, incluyendo:</p>
              <ul className="list-disc pl-6 space-y-1 mt-2">
                <li>Dieta específica durante los 7 días previos</li>
                <li>Abstinencia de alcohol y sustancias recreativas</li>
                <li>Discontinuación gradual de medicamentos según indicación médica</li>
                <li>Descanso adecuado</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">B. Durante el Retiro</h3>
              <p className="leading-relaxed">El Cliente acepta:</p>
              <ul className="list-disc pl-6 space-y-1 mt-2">
                <li>Seguir las instrucciones de los facilitadores en todo momento</li>
                <li>No abandonar el recinto sin autorización</li>
                <li>No consumir sustancias adicionales no autorizadas</li>
                <li>Mantener conducta de respeto hacia otros participantes</li>
                <li>No establecer contacto romántico o sexual con otros participantes</li>
                <li>No fotografiar ni grabar a otros participantes sin su consentimiento</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">C. Derecho de Admisión y Permanencia</h3>
              <p className="leading-relaxed">El Proveedor se reserva el derecho de:</p>
              <ul className="list-disc pl-6 space-y-1 mt-2">
                <li>Rechazar la participación de cualquier persona que no cumpla los requisitos de salud</li>
                <li>Retirar del retiro a cualquier participante que ponga en riesgo la seguridad del grupo o incumpla los protocolos</li>
                <li>En caso de retiro por incumplimiento, <strong>no habrá reembolso</strong></li>
              </ul>
            </section>

            {/* Section VII */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                VII. Confidencialidad y Privacidad
              </h2>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">A. Confidencialidad Entre Participantes</h3>
              <p className="leading-relaxed">El Cliente acepta mantener <strong>estricta confidencialidad</strong> sobre:</p>
              <ul className="list-disc pl-6 space-y-1 mt-2">
                <li>La identidad de otros participantes</li>
                <li>Las experiencias, historias y situaciones compartidas durante el retiro</li>
                <li>Cualquier información personal de otros asistentes</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">B. Protección de Datos Personales</h3>
              <p className="leading-relaxed">
                De conformidad con la Ley Federal de Protección de Datos Personales en Posesión de los
                Particulares (LFPDPPP):
              </p>
              <ol className="list-decimal pl-6 space-y-2 mt-2">
                <li><strong>Datos recopilados:</strong> Nombre, contacto, fecha de nacimiento, historial médico, medicamentos, condiciones psicológicas</li>
                <li><strong>Datos sensibles:</strong> La información de salud se considera &quot;datos personales sensibles&quot; bajo la LFPDPPP</li>
                <li><strong>Finalidad:</strong> Evaluar la elegibilidad del participante y garantizar su seguridad durante el retiro</li>
                <li><strong>Consentimiento:</strong> Al completar el cuestionario de seguridad, el Cliente otorga consentimiento expreso para el tratamiento de sus datos sensibles</li>
                <li><strong>Derechos ARCO:</strong> El Cliente puede ejercer sus derechos de Acceso, Rectificación, Cancelación y Oposición enviando solicitud a henriquez.alan@gmail.com</li>
              </ol>
              <p className="mt-4">
                <strong>Aviso de Privacidad completo disponible en: </strong>
                <Link href="/politica-privacidad" className="text-purple-600 hover:underline">
                  /politica-privacidad
                </Link>
              </p>
            </section>

            {/* Section VIII */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                VIII. Fotografía, Video y Testimonios
              </h2>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">A. Uso de Imagen</h3>
              <p className="leading-relaxed">El Proveedor podrá tomar fotografías y videos durante el retiro para:</p>
              <ul className="list-disc pl-6 space-y-1 mt-2">
                <li>Archivo interno</li>
                <li>Sitio web y redes sociales</li>
                <li>Material promocional</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">B. Protecciones del Participante</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>El rostro puede ser difuminado a solicitud del participante</li>
                <li>El consentimiento es revocable enviando solicitud por email</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">C. Grabación por Participantes</h3>
              <p className="leading-relaxed">
                <strong>Queda prohibido</strong> grabar audio o video de las ceremonias sin autorización expresa del Proveedor.
              </p>
            </section>

            {/* Section IX */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                IX. Responsabilidad y Limitaciones
              </h2>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">A. Limitación de Responsabilidad</h3>
              <p className="leading-relaxed">El Proveedor <strong>NO es responsable</strong> por:</p>
              <ul className="list-disc pl-6 space-y-1 mt-2">
                <li>Pérdida, robo o daño de objetos personales del Cliente</li>
                <li>Gastos de transporte externos (vuelos, autobuses, hospedaje adicional)</li>
                <li>Acciones u omisiones de otros participantes</li>
                <li>Reacciones adversas cuando el Cliente ha omitido o falsificado información médica</li>
                <li>Condiciones climáticas o factores naturales</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">B. Responsabilidad de Terceros</h3>
              <p className="leading-relaxed">
                El Proveedor colabora con facilitadores y proveedores de servicios. El Proveedor no es
                responsable por negligencia o mala práctica de terceros independientes.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">C. Límite Máximo de Responsabilidad</h3>
              <p className="leading-relaxed">
                En caso de que el Proveedor sea encontrado responsable por cualquier causa, su responsabilidad
                está <strong>limitada al precio pagado</strong> por el Cliente por el retiro.
              </p>
            </section>

            {/* Section X */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                X. Resolución de Disputas y Jurisdicción
              </h2>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">A. Foro Exclusivo</h3>
              <p className="leading-relaxed">
                Para la interpretación y cumplimiento de este contrato, las partes se someten a la jurisdicción
                de los tribunales competentes de la ciudad de <strong>Querétaro, Querétaro, México</strong>,
                renunciando a cualquier otro fuero que pudiera corresponderles por razón de sus domicilios
                presentes o futuros.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">B. Ley Aplicable</h3>
              <p className="leading-relaxed">Este contrato se rige por las leyes federales de México, incluyendo:</p>
              <ul className="list-disc pl-6 space-y-1 mt-2">
                <li>Ley Federal de Protección al Consumidor (LFPC)</li>
                <li>Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP)</li>
                <li>Código Civil Federal</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">C. Proceso de Resolución</h3>
              <ol className="list-decimal pl-6 space-y-2 mt-2">
                <li><strong>Comunicación directa:</strong> Las partes buscarán resolver cualquier diferencia de manera amistosa</li>
                <li><strong>Mediación:</strong> Si no se logra acuerdo, se podrá recurrir a mediación antes de litigio</li>
                <li><strong>Litigio:</strong> Como último recurso, ante tribunales de Querétaro</li>
              </ol>
            </section>

            {/* Section XI */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                XI. Modificaciones a estos Términos
              </h2>
              <p className="leading-relaxed">
                El Proveedor se reserva el derecho de modificar estos términos. Los cambios:
              </p>
              <ul className="list-disc pl-6 space-y-1 mt-2">
                <li>Serán publicados en el sitio web con fecha de actualización</li>
                <li>No afectarán reservaciones ya confirmadas y pagadas</li>
                <li>Aplicarán a nuevas reservaciones realizadas después de la fecha de modificación</li>
              </ul>
            </section>

            {/* Section XII */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                XII. Aceptación
              </h2>
              <p className="leading-relaxed">
                Al realizar el pago del depósito o cualquier pago relacionado con el retiro, el Cliente declara que:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Ha leído y comprendido estos Términos y Condiciones en su totalidad</li>
                <li>Acepta la Política de Cancelación (Cero Reembolsos, solo transferencia)</li>
                <li>Ha completado el cuestionario médico con información veraz</li>
                <li>Autoriza el tratamiento de sus datos personales sensibles según el Aviso de Privacidad</li>
                <li>Asume voluntariamente los riesgos inherentes a la actividad</li>
              </ul>
            </section>

            {/* Contact Section */}
            <section className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contacto</h2>
              <p className="leading-relaxed mb-4">
                Para cualquier consulta sobre estos términos:
              </p>
              <div className="bg-purple-50 p-6 rounded-lg">
                <p className="font-semibold text-purple-900">Ramon Alan Henriquez Gurrola</p>
                <p className="text-purple-800">WhatsApp: +52 618 230 1481</p>
                <p className="text-purple-800">Email: henriquez.alan@gmail.com</p>
                <p className="text-purple-800">Sitio Web: www.escuelafloresiendomexicom.com</p>
              </div>
            </section>

            {/* Footer */}
            <section className="border-t pt-8 mt-12">
              <p className="text-sm text-gray-600 text-center">
                <strong>Documento válido a partir de:</strong> Enero 2026
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
