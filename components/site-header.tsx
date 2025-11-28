"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X, ChevronRight } from "lucide-react";

const navItems = [
  { href: "/", label: "Inicio" },
  { href: "/escuela", label: "Escuela" },
  { href: "/encuentros", label: "Encuentros" },
  { href: "/practicas-ancestrales", label: "Prácticas Ancestrales" },
  { href: "https://www.escuelafloresiendo.com/blog", label: "Blog", external: true },
  { href: "/contacto", label: "Contacto" },
];

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || mobileMenuOpen
            ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-warm-gray-100"
            : "bg-transparent"
        }`}
      >
        <div className="section-container">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 group focus-ring rounded-lg">
              <Image
                src="/images/floresiendo-logo-boton.webp"
                alt="FloreSiendo Logo"
                width={48}
                height={48}
                className="h-12 w-12 transition-all duration-300 group-hover:scale-105"
              />
              <span className={`text-xl font-bold transition-colors duration-300 ${
                scrolled || mobileMenuOpen ? "text-burgundy" : "text-white"
              }`}>
                FloreSiendo
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 focus-ring relative group ${
                    scrolled
                      ? "text-warm-gray-700 hover:text-coral hover:bg-warm-gray-50"
                      : "text-white/90 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {item.label}
                  <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-coral transition-all duration-300 group-hover:w-4/5 group-hover:left-[10%]" />
                </Link>
              ))}
            </nav>

            {/* CTA Button - Desktop */}
            <div className="hidden lg:flex items-center">
              <Link
                href="/contacto"
                className={`inline-flex items-center justify-center gap-2 px-6 py-3 text-base font-bold rounded-full shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl focus-ring ${
                  scrolled
                    ? "bg-coral hover:bg-coral-dark text-white"
                    : "bg-white text-burgundy hover:bg-warm-gray-50"
                }`}
              >
                Contáctanos
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              className={`lg:hidden p-2 rounded-lg transition-all duration-200 focus-ring ${
                scrolled || mobileMenuOpen
                  ? "text-warm-gray-700 hover:bg-warm-gray-100"
                  : "text-white hover:bg-white/10"
              }`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={mobileMenuOpen}
            >
              <div className="relative w-6 h-6">
                <Menu
                  size={24}
                  className={`absolute inset-0 transition-all duration-300 ${
                    mobileMenuOpen ? "opacity-0 rotate-90" : "opacity-100 rotate-0"
                  }`}
                />
                <X
                  size={24}
                  className={`absolute inset-0 transition-all duration-300 ${
                    mobileMenuOpen ? "opacity-100 rotate-0" : "opacity-0 -rotate-90"
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300 ${
          mobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile Navigation Panel */}
      <nav
        className={`fixed top-20 left-0 right-0 bottom-0 z-40 lg:hidden bg-white overflow-y-auto transition-all duration-300 ease-out ${
          mobileMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0 pointer-events-none"
        }`}
        aria-label="Navegación móvil"
      >
        <div className="section-container py-6">
          <div className="space-y-2">
            {navItems.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
                className="flex items-center justify-between px-4 py-4 rounded-xl text-warm-gray-700 hover:text-coral hover:bg-warm-gray-50 font-medium transition-all duration-200 group focus-ring"
                onClick={() => setMobileMenuOpen(false)}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <span className="text-lg">{item.label}</span>
                <ChevronRight
                  size={20}
                  className="text-warm-gray-400 group-hover:text-coral group-hover:translate-x-1 transition-all duration-200"
                />
              </Link>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-warm-gray-100">
            <Link
              href="/contacto"
              className="btn-primary w-full justify-center text-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contáctanos
            </Link>
          </div>

          {/* Additional info */}
          <div className="mt-8 text-center text-warm-gray-500 text-sm">
            <p>Una escuela donde la maestra es el Amor</p>
          </div>
        </div>
      </nav>
    </>
  );
}
