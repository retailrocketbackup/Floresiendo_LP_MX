import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { PaymentSuccessTracking } from "@/components/PaymentSuccessTracking"

export const metadata: Metadata = {
  title: "Pago Exitoso | FloreSiendo",
  description: "Tu pago ha sido procesado exitosamente",
  robots: "noindex, nofollow",
}

export default function PagoExitoso({
  searchParams
}: {
  searchParams: { charge_id?: string; product?: string }
}) {
  const chargeId = searchParams.charge_id || 'N/A';
  const productId = searchParams.product || '';

  // Get product name based on ID
  const productNames: Record<string, string> = {
    'DEPOSIT': 'Anticipo - Encuentro Marzo 2026',
    'TWO_NIGHTS_EARLY': 'Retiro 2 Noches - Precio Especial',
    'TWO_NIGHTS_REGULAR': 'Retiro 2 Noches',
    'THREE_NIGHTS_EARLY': 'Retiro 3 Noches - Precio Especial',
    'THREE_NIGHTS_REGULAR': 'Retiro 3 Noches'
  };

  const productName = productNames[productId] || 'Encuentro Marzo 2026';

  return (
    <main className="min-h-screen bg-gradient-warm">
      {/* Tracking Component */}
      <PaymentSuccessTracking
        chargeId={chargeId}
        productId={productId}
        productName={productName}
      />

      {/* Success Content */}
      <section className="min-h-screen flex items-center justify-center px-4 py-16">
        <div className="max-w-lg mx-auto text-center">
          {/* Logo */}
          <div className="mb-8 flex justify-center">
            <Image
              src="/floresiendo-logo-boton.webp"
              alt="FloreSiendo Logo"
              width={100}
              height={100}
              className="rounded-full shadow-xl"
            />
          </div>

          {/* Success Icon */}
          <div className="mb-8">
            <div className="w-24 h-24 mx-auto bg-coral rounded-full flex items-center justify-center shadow-lg">
              <svg
                className="w-12 h-12 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Pago Exitoso
          </h1>

          <p className="text-xl text-muted-foreground mb-8">
            Tu lugar en el Encuentro de Marzo 2026 ha sido reservado.
          </p>

          {/* Order Details */}
          <div className="card-elevated p-6 mb-8 text-left">
            <h2 className="text-lg font-semibold text-foreground mb-4">Detalles de tu Compra</h2>

            <div className="space-y-3 text-muted-foreground">
              <div className="flex justify-between">
                <span>Producto:</span>
                <span className="text-foreground font-medium">{productName}</span>
              </div>
              <div className="flex justify-between">
                <span>ID de Transacción:</span>
                <span className="text-foreground font-mono text-sm">{chargeId.slice(0, 20)}...</span>
              </div>
              <div className="flex justify-between">
                <span>Estado:</span>
                <span className="text-coral font-medium">Confirmado</span>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="card-elevated p-6 mb-8 text-left border-l-4 border-l-gold">
            <h2 className="text-lg font-semibold text-burgundy mb-4">Próximos Pasos</h2>

            <ul className="space-y-3 text-foreground">
              <li className="flex items-start gap-3">
                <span className="text-gold font-bold mt-0.5">1.</span>
                <span>Recibirás un correo de confirmación con los detalles de tu reserva.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-gold font-bold mt-0.5">2.</span>
                <span>Nos pondremos en contacto contigo vía WhatsApp para coordinar los detalles.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-gold font-bold mt-0.5">3.</span>
                <span>Prepara tu dieta de 7 días antes del encuentro.</span>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <p className="text-muted-foreground">
              ¿Tienes preguntas? Contáctanos:
            </p>

            <a
              href="https://wa.me/5214427845308?text=Hola%20Ramón,%20acabo%20de%20realizar%20mi%20pago%20para%20el%20Encuentro%20de%20Marzo%202026"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-coral hover:bg-coral-dark text-white font-bold rounded-full transition-all hover:scale-105 shadow-lg"
            >
              <Image
                src="/whatsapp-icon.webp"
                alt="WhatsApp"
                width={24}
                height={24}
              />
              Contactar por WhatsApp
            </a>

            <div className="pt-4">
              <Link
                href="/"
                className="text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4"
              >
                Volver al inicio
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
