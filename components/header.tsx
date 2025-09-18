import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-purple-600">FloreSiendo</span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-purple-600 transition-colors">
              Inicio
            </Link>
            <Link href="/#retiros" className="text-gray-700 hover:text-purple-600 transition-colors">
              Retiros
            </Link>
            <Link href="/#testimonios" className="text-gray-700 hover:text-purple-600 transition-colors">
              Testimonios
            </Link>
            <Link href="/#contacto" className="text-gray-700 hover:text-purple-600 transition-colors">
              Contacto
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Button asChild className="bg-purple-600 hover:bg-purple-700 text-white">
              <Link href="/formulario-enviado">Agendar Consulta</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
