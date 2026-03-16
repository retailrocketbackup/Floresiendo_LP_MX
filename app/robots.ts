import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin/",
          "/api/",
          "/aplicar",
          "/f/duelo",
          "/f/duelo-acompanamiento",
          "/f/estres",
          "/f/proposito",
          "/f/testimonios",
          "/f/video",
          "/f/llamada",
          "/f/meditacion-gratis",
          "/f/conferencia-vida-perfecta",
          "/test-payment",
          "/pago-exitoso",
        ],
      },
      // AI Search Engine Crawlers — explicitly allowed
      {
        userAgent: "OAI-SearchBot",
        allow: "/",
        disallow: ["/admin/", "/api/", "/aplicar"],
      },
      {
        userAgent: "ChatGPT-User",
        allow: "/",
        disallow: ["/admin/", "/api/", "/aplicar"],
      },
      {
        userAgent: "PerplexityBot",
        allow: "/",
        disallow: ["/admin/", "/api/", "/aplicar"],
      },
      {
        userAgent: "ClaudeBot",
        allow: "/",
        disallow: ["/admin/", "/api/", "/aplicar"],
      },
      {
        userAgent: "Claude-Web",
        allow: "/",
        disallow: ["/admin/", "/api/", "/aplicar"],
      },
      {
        userAgent: "Google-Extended",
        allow: "/",
        disallow: ["/admin/", "/api/", "/aplicar"],
      },
      {
        userAgent: "Applebot-Extended",
        allow: "/",
        disallow: ["/admin/", "/api/", "/aplicar"],
      },
    ],
    sitemap: "https://escuelafloresiendomexico.com/sitemap.xml",
  };
}
