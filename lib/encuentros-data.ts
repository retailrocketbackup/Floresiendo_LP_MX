// lib/encuentros-data.ts
// Data and types for Encuentros (Retreats)

export interface ScheduleItem {
  time: string;
  activity: string;
  description?: string;
}

export interface DaySchedule {
  day: string; // "Día 1 - Jueves"
  date: string; // "19 de Febrero"
  items: ScheduleItem[];
}

export interface Facilitator {
  name: string;
  role: string;
  bio: string;
  image?: string;
  imagePosition?: string; // CSS object-position for face centering
  imageScale?: number; // Scale factor for zooming into face
}

export interface Encuentro {
  slug: string;
  title: string;
  subtitle: string;
  startDate: string; // ISO date
  endDate: string; // ISO date
  displayDates: string; // "19-22 de Febrero, 2026"
  location: string;
  venue: string;
  spotsTotal: number;
  spotsRemaining: number;
  status: "upcoming" | "full" | "past";

  // Content
  description: string;
  medicines: string[];
  included: string[];
  notIncluded: string[];
  schedule: DaySchedule[];
  facilitators: Facilitator[];

  // Requirements
  preparation: string[];
  contraindications: string[];

  // CTA
  whatsappNumber: string;
  whatsappMessage: string;
}

// February 2026 Encuentro Data
export const encuentroFebrero2026: Encuentro = {
  slug: "febrero-2026",
  title: "Encuentro de Febrero",
  subtitle: "4 días de crecimiento personal",
  startDate: "2026-02-19",
  endDate: "2026-02-22",
  displayDates: "19-22 de Febrero, 2026",
  location: "Morelos, México",
  venue: "Santuario FloreSiendo",
  spotsTotal: 15,
  spotsRemaining: 12,
  status: "upcoming",

  description: `Un retiro íntimo de 4 días diseñado para facilitar un proceso de bienestar integral
  y reconexión con tu esencia. En un entorno natural privilegiado, te acompañamos en un viaje
  de autodescubrimiento con prácticas ancestrales bajo la guía de facilitadores experimentados.`,

  medicines: [
    "Ceremonias nocturnas (2 sesiones)",
    "Práctica de purificación (opcional)",
    "Experiencia contemplativa (opcional)",
  ],

  included: [
    "Alojamiento 4 días / 3 noches",
    "Alimentación completa (dieta de preparación)",
    "2 ceremonias nocturnas",
    "Círculos de integración diarios",
    "Temazcal de cierre",
    "Sesiones de breathwork",
    "Acompañamiento personalizado",
    "Integración post-retiro (1 sesión)",
    "Transporte desde punto de encuentro",
  ],

  notIncluded: [
    "Transporte aéreo o terrestre a Morelos",
    "Seguro de viaje",
    "Prácticas opcionales",
  ],

  schedule: [
    {
      day: "Día 1 - Jueves",
      date: "19 de Febrero",
      items: [
        { time: "14:00", activity: "Llegada y registro", description: "Bienvenida y asignación de espacios" },
        { time: "16:00", activity: "Círculo de apertura", description: "Presentaciones e intenciones" },
        { time: "18:00", activity: "Cena ligera", description: "Última comida antes de la ceremonia" },
        { time: "20:00", activity: "Primera ceremonia nocturna", description: "Guiada por facilitadores experimentados" },
      ],
    },
    {
      day: "Día 2 - Viernes",
      date: "20 de Febrero",
      items: [
        { time: "08:00", activity: "Descanso y recuperación" },
        { time: "11:00", activity: "Círculo de integración", description: "Compartir experiencias en grupo" },
        { time: "13:00", activity: "Comida nutritiva" },
        { time: "16:00", activity: "Breathwork y meditación" },
        { time: "18:00", activity: "Cena ligera" },
        { time: "20:00", activity: "Segunda ceremonia nocturna" },
      ],
    },
    {
      day: "Día 3 - Sábado",
      date: "21 de Febrero",
      items: [
        { time: "09:00", activity: "Descanso" },
        { time: "11:00", activity: "Círculo de integración profunda" },
        { time: "13:00", activity: "Comida" },
        { time: "15:00", activity: "Tiempo libre / Naturaleza" },
        { time: "17:00", activity: "Temazcal de cierre", description: "Ceremonia de purificación" },
        { time: "20:00", activity: "Cena de celebración" },
      ],
    },
    {
      day: "Día 4 - Domingo",
      date: "22 de Febrero",
      items: [
        { time: "08:00", activity: "Desayuno" },
        { time: "10:00", activity: "Círculo de cierre", description: "Compromisos e integración a la vida" },
        { time: "12:00", activity: "Despedida y salida" },
      ],
    },
  ],

  facilitators: [
    {
      name: "Roble",
      role: "Facilitador Principal",
      bio: `Facilitador con amplia experiencia en acompañamiento de procesos de transformación.
      Su enfoque integra la conexión con la naturaleza y las prácticas ancestrales para guiar
      experiencias profundas de bienestar y autodescubrimiento.`,
      image: "/images/Roble.jpg",
    },
  ],

  preparation: [
    "Dieta de preparación 7 días antes (sin carnes rojas, alcohol, drogas recreativas)",
    "Suspender medicamentos indicados (consultar con facilitador)",
    "Evitar relaciones sexuales 3 días antes",
    "Llegar con intención clara para el trabajo",
    "Llenado de formulario de salud obligatorio",
  ],

  contraindications: [
    "Trastornos psicóticos o esquizofrenia",
    "Uso de antidepresivos ISRS/IMAO (requiere suspensión supervisada)",
    "Problemas cardíacos graves",
    "Embarazo o lactancia",
    "Hipertensión no controlada",
  ],

  whatsappNumber: "526182301481",
  whatsappMessage: "Hola, me interesa el Encuentro de Febrero 2026. Me gustaría recibir más información sobre el proceso de inversión personalizada.",
};

// All encuentros
export const encuentros: Encuentro[] = [encuentroFebrero2026];

// Helper function to get encuentro by slug
export function getEncuentroBySlug(slug: string): Encuentro | undefined {
  return encuentros.find((e) => e.slug === slug);
}

// Helper function to get all upcoming encuentros
export function getUpcomingEncuentros(): Encuentro[] {
  return encuentros.filter((e) => e.status === "upcoming");
}
