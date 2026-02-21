import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/practicas-ancestrales",
          "/encuentros/",
          "/admin/",
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
          "/api/",
        ],
      },
    ],
    sitemap: "https://escuelafloresiendomexico.com/sitemap.xml",
  };
}
