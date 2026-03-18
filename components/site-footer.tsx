"use client";

import Image from "next/image";
import { Facebook, Instagram, Youtube, MapPin, Heart } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/routing";

export function SiteFooter() {
  const t = useTranslations("footer");
  const locale = useLocale();
  const isEn = locale === "en";

  const whatsappMessage = isEn
    ? "Hi, I'd like to learn more about FloreSiendo Mexico"
    : "Hola, me gustaría saber más sobre FloreSiendo México";

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
              {t("tagline")}
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
            <h4 className="font-bold text-lg mb-5 text-white">{t("explore")}</h4>
            <nav className="flex flex-col space-y-3">
              {[
                { href: "/escuela" as const, label: t("the_school") },
                { href: "/encuentros" as const, label: t("encounters") },
                { href: "/practicas-ancestrales" as const, label: t("practices") },
                { href: "/blog" as const, label: t("blog") },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-coral-light/80 hover:text-white hover:translate-x-1 transition-all duration-200 text-base"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-lg mb-5 text-white">{t("contact_mexico")}</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3 text-coral-light/80">
                <MapPin size={20} className="flex-shrink-0 mt-0.5" />
                <span>{t("location")}</span>
              </div>
              <a
                href={`https://wa.me/526182301481?text=${encodeURIComponent(whatsappMessage)}`}
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
              &copy; {new Date().getFullYear()} {t("copyright")}
              <Heart size={14} className="text-coral fill-coral" />
              {t("in_mexico")}
            </p>
            <div className="flex gap-6 text-sm text-coral-light/60">
              <Link
                href="/politica-privacidad"
                className="hover:text-white transition-colors"
              >
                {t("privacy_policy")}
              </Link>
              <Link
                href="/terminos-condiciones"
                className="hover:text-white transition-colors"
              >
                {t("terms")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
