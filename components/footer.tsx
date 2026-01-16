export function Footer() {
  return (
    <footer className="bg-gradient-to-b from-purple-900 to-blue-900 text-white py-16 px-4 min-h-screen flex items-center">
      <div className="max-w-6xl mx-auto">
        {/* Main footer content */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
          {/* Brand section */}
          <div className="md:max-w-md text-center md:text-left">
            <h3 className="text-2xl font-bold mb-4">FloreSiendo</h3>
            <p className="text-purple-200 mb-6 leading-relaxed">
              Facilitamos experiencias transformadoras a través de la sabiduría ancestral de las plantas amazónicas en
              un entorno seguro y sagrado en Morelos, México.
            </p>
          </div>

          {/* Contact info */}
          <div className="flex flex-col items-center md:items-end text-center md:text-right">
            <h4 className="font-semibold text-lg mb-4">Contacto</h4>
            <div className="space-y-2 text-purple-200">
              <p>Morelos, México</p>
              <p>WhatsApp: +52 618 230 1481</p>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-purple-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-purple-200 text-sm">© 2025 FloreSiendo. Todos los derechos reservados.</p>
            <div className="flex gap-6 text-sm text-purple-200">
              <a href="/politica-privacidad" className="hover:text-white transition-colors">
                Política de Privacidad
              </a>
              <a href="/terminos-condiciones" className="hover:text-white transition-colors">
                Términos y Condiciones
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
