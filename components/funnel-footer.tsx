// components/funnel-footer.tsx
// Minimal footer for funnel pages - keeps focus on conversion

export function FunnelFooter() {
  return (
    <footer className="bg-[#8b2a4a] text-white py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Minimal content */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Brand */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold text-white">FloreSiendo</h3>
            <p className="text-white/60 text-sm mt-1">
              Transformación a través de la sabiduría ancestral
            </p>
          </div>

          {/* Contact */}
          <div className="text-center md:text-right">
            <p className="text-white/80 text-sm">
              WhatsApp: <a href="https://wa.me/526182301481" className="text-[#f78080] hover:text-white transition-colors">+52 618 230 1481</a>
            </p>
            <p className="text-white/60 text-sm">Morelos, México</p>
          </div>
        </div>

        {/* Bottom line */}
        <div className="border-t border-white/20 mt-6 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/50">
            <p>© 2025 FloreSiendo. Todos los derechos reservados.</p>
            <div className="flex gap-4">
              <a href="/politica-privacidad" className="hover:text-white transition-colors">
                Privacidad
              </a>
              <a href="/terminos-condiciones" className="hover:text-white transition-colors">
                Términos
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
