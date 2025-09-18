import { Button } from "@/components/ui/button"

export function Footer() {
  return (
    <footer className="bg-gradient-to-b from-purple-900 to-blue-900 text-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Main footer content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand section */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold mb-4">FloreSiendo</h3>
            <p className="text-purple-200 mb-6 leading-relaxed">
              Facilitamos experiencias transformadoras a través de la sabiduría ancestral de las plantas amazónicas en
              un entorno seguro y sagrado en Morelos, México.
            </p>
            <div className="flex gap-4">
                <a href="https://wa.me/526182301481" target="_blank" rel="noopener noreferrer">
                    <Button size="lg" className="bg-white text-purple-900 hover:bg-purple-100 px-6 py-3 rounded-full">
                        Contactar por WhatsApp
                    </Button>
                </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Enlaces rápidos</h4>
            <ul className="space-y-2 text-purple-200">
              <li>
                <a href="#inicio" className="hover:text-white transition-colors">
                  Inicio
                </a>
              </li>
              <li>
                <a href="#sobre-nosotros" className="hover:text-white transition-colors">
                  Sobre nosotros
                </a>
              </li>
              <li>
                <a href="#retiros" className="hover:text-white transition-colors">
                  Retiros
                </a>
              </li>
              <li>
                <a href="#testimonios" className="hover:text-white transition-colors">
                  Testimonios
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Contact info & Socials */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Contacto y Redes</h4>
            <div className="space-y-2 text-purple-200">
              <p>Morelos, México</p>
              <p>WhatsApp: +52 6182301481</p>
            </div>
            <div className="flex gap-4 mt-4">
                <a href="https://www.facebook.com/share/1Qx2hVjLnG/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="text-purple-200 hover:text-white">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89H8.313v-2.781h2.125v-2.078c0-2.103 1.25-3.25 3.16-3.25.902 0 1.804.162 1.804.162v2.368h-1.218c-1.037 0-1.383.616-1.383 1.336v1.562h2.656l-.422 2.781h-2.234v7.008C18.343 21.128 22 16.991 22 12z"/></svg>
                </a>
                <a href="https://www.instagram.com/floresiendomexico?igsh=MXdlcXp1M2thMzBqbg==" target="_blank" rel="noopener noreferrer" className="text-purple-200 hover:text-white">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.689-.073-4.948-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
                <a href="http://www.youtube.com/@floresiendo2473" target="_blank" rel="noopener noreferrer" className="text-purple-200 hover:text-white">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                </a>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-purple-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-purple-200 text-sm">© 2024 FloreSiendo. Todos los derechos reservados.</p>
            <div className="flex gap-6 text-sm text-purple-200">
              <a href="#privacidad" className="hover:text-white transition-colors">
                Política de Privacidad
              </a>
              <a href="#terminos" className="hover:text-white transition-colors">
                Términos y Condiciones
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
