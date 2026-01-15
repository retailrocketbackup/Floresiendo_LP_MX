import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Youtube, MapPin, Heart } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="bg-burgundy text-white">
      {/* Main Footer Content */}
      <div className="section-container py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <Image
                src="/images/floresiendo-logo-boton.webp"
                alt="FloreSiendo Logo"
                width={56}
                height={56}
                className="h-14 w-14"
              />
              <span className="text-2xl font-bold text-white">FloreSiendo</span>
            </div>
            <p className="text-coral-light/90 leading-relaxed max-w-md text-base mb-6">
              Una escuela internacional enfocada en expandir el amor.
              Facilitamos experiencias transformadoras a través de la sabiduría
              ancestral en un entorno seguro y sagrado en México.
            </p>

            {/* Social Links */}
            <div className="flex space-x-3">
              <a
                href="https://www.facebook.com/FloreSiendo"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-coral hover:scale-110 transition-all duration-300"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://www.instagram.com/floresiendo"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-coral hover:scale-110 transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://www.youtube.com/@floresiendo"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-coral hover:scale-110 transition-all duration-300"
                aria-label="YouTube"
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-5 text-white">Explora</h4>
            <nav className="flex flex-col space-y-3">
              {[
                { href: "/escuela", label: "La Escuela" },
                { href: "/encuentros", label: "Encuentros" },
                { href: "/practicas-ancestrales", label: "Prácticas Ancestrales" },
                { href: "https://www.escuelafloresiendo.com/blog", label: "Blog", external: true },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className="text-coral-light/80 hover:text-white hover:translate-x-1 transition-all duration-200 text-base"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-lg mb-5 text-white">Contacto México</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3 text-coral-light/80">
                <MapPin size={20} className="flex-shrink-0 mt-0.5" />
                <span>Morelos, México</span>
              </div>
              <a
                href="https://wa.me/526182301481?text=Hola,%20me%20gustaría%20saber%20más%20sobre%20FloreSiendo%20México"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-coral-light/80 hover:text-white transition-colors group"
              >
                <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Image
                    src="/images/whatsapp-icon.webp"
                    alt="WhatsApp"
                    width={40}
                    height={40}
                  />
                </div>
                <span>+52 618 230 1481</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="section-container py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-coral-light/60 text-sm flex items-center gap-1">
              © {new Date().getFullYear()} FloreSiendo México. Hecho con
              <Heart size={14} className="text-coral fill-coral" />
              en México.
            </p>
            <div className="flex gap-6 text-sm text-coral-light/60">
              <Link
                href="/politica-privacidad"
                className="hover:text-white transition-colors"
              >
                Política de Privacidad
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
