// lib/encuentros-data-clean.ts
// Sanitized data for Google Ads landing pages — NO substance names
// Original data in encuentros-data.ts remains untouched for organic/Meta traffic

import type { Encuentro, DaySchedule } from "./encuentros-data";

const scheduleClean: DaySchedule[] = [
  {
    day: "Día 1",
    weekday: "Jueves",
    date: "5 de Marzo",
    theme: "Llegada y Apertura",
    tagline: "Cruzar el umbral hacia tu interior",
    items: [
      { time: "17:00", activity: "Bienvenida al Santuario", description: "Registro e instalación en tu espacio", category: "admin" },
      { time: "18:00", activity: "Merienda", description: "Primera conexión con el grupo", category: "meal" },
      { time: "20:30", activity: "Círculo de Apertura", description: "Intenciones y preparación", category: "preparation" },
      { time: "22:30", activity: "Ceremonia Nocturna", description: "Primera sesión de bienestar guiada", category: "ceremony" },
    ],
  },
  {
    day: "Día 2",
    weekday: "Viernes",
    date: "6 de Marzo",
    theme: "Inmersión Profunda",
    tagline: "Soltar lo que ya no sirve",
    items: [
      { time: "09:00", activity: "Sesión de Purificación", description: "Práctica ancestral de limpieza", category: "optional", isOptional: true },
      { time: "09:30", activity: "Desayuno", category: "meal" },
      { time: "11:00", activity: "Círculo de Integración", description: "Compartir desde el corazón", category: "integration" },
      { time: "13:00", activity: "Ceremonia de Integración Breve", description: "Práctica complementaria", category: "optional", isOptional: true },
      { time: "14:00", activity: "Almuerzo", category: "meal" },
      { time: "15:30", activity: "Taller: Encuentra tu Propósito", description: "Meditación guiada y reflexión", category: "workshop" },
      { time: "17:00", activity: "Registro", description: "Bienvenida a nuevos participantes", category: "admin" },
      { time: "18:00", activity: "Merienda", category: "meal" },
      { time: "20:30", activity: "Preparación", category: "preparation" },
      { time: "22:30", activity: "Ceremonia Nocturna", description: "Segunda sesión de bienestar guiada", category: "ceremony" },
    ],
  },
  {
    day: "Día 3",
    weekday: "Sábado",
    date: "7 de Marzo",
    theme: "Expansión",
    tagline: "Encontrar tu centro y tu luz",
    items: [
      { time: "09:00", activity: "Sesión de Purificación", description: "Práctica ancestral de limpieza", category: "optional", isOptional: true },
      { time: "09:30", activity: "Desayuno", category: "meal" },
      { time: "11:00", activity: "Círculo de Integración", description: "Compartir desde el corazón", category: "integration" },
      { time: "13:00", activity: "Ceremonia de Integración Breve", description: "Práctica complementaria", category: "optional", isOptional: true },
      { time: "14:00", activity: "Almuerzo", category: "meal" },
      { time: "15:30", activity: "Breathwork y Meditación", description: "Trabajo de respiración consciente", category: "workshop" },
      { time: "18:00", activity: "Merienda", category: "meal" },
      { time: "20:30", activity: "Preparación", category: "preparation" },
      { time: "22:00", activity: "Ceremonia Nocturna", description: "Tercera sesión de bienestar guiada", category: "ceremony" },
    ],
  },
  {
    day: "Día 4",
    weekday: "Domingo",
    date: "8 de Marzo",
    theme: "Integración y Cierre",
    tagline: "Renacer con claridad y propósito",
    items: [
      { time: "09:00", activity: "Sesión de Purificación", description: "Práctica ancestral de limpieza", category: "optional", isOptional: true },
      { time: "09:30", activity: "Desayuno", category: "meal" },
      { time: "10:30", activity: "Taller: Tu Nueva Vida", description: "Integración y herramientas para el regreso", category: "workshop" },
      { time: "12:00", activity: "Círculo de Cierre", description: "Compartir final y compromisos", category: "integration" },
      { time: "13:00", activity: "Ceremonia de Integración Breve", description: "Práctica complementaria", category: "optional", isOptional: true },
      { time: "14:30", activity: "Almuerzo de Despedida", description: "Celebración y nuevos comienzos", category: "meal" },
    ],
  },
];

export const encuentroMarzo2026Clean: Encuentro = {
  slug: "marzo-2026",
  title: "Retiro de Transformación Personal",
  subtitle: "4 días de trabajo interior profundo",
  startDate: "2026-03-05",
  endDate: "2026-03-08",
  displayDates: "5-8 de Marzo, 2026",
  location: "Morelos, México",
  venue: "Santuario FloreSiendo",
  spotsTotal: 15,
  spotsRemaining: 12,
  status: "upcoming",

  description: `Un retiro íntimo de 4 días diseñado para quienes sienten que algo necesita cambiar:
  ansiedad que no se va, vacío emocional, relaciones que duelen, o la sensación de haber perdido
  el rumbo. En un entorno natural privilegiado en Morelos, te acompañamos con prácticas ancestrales
  de bienestar, facilitadores con años de experiencia, y un proceso terapéutico integral que combina
  ceremonias, talleres y círculos de integración.`,

  medicines: [
    "Ceremonias de bienestar guiadas (2-3 sesiones)",
    "Prácticas complementarias opcionales",
  ],

  included: [
    "Alojamiento 3 noches (o 2 noches en opción corta)",
    "Alimentación completa (dieta de preparación)",
    "2-3 ceremonias de bienestar guiadas",
    "Círculos de integración terapéutica",
    "Taller 'Encuentra tu Propósito' (diario)",
    "Sesiones de breathwork y meditación",
    "Acompañamiento personalizado de facilitadores",
    "1 sesión de integración post-retiro",
    "Acceso a comunidad de participantes",
  ],

  notIncluded: [
    "Transporte aéreo/terrestre a Morelos",
    "Prácticas complementarias opcionales",
    "Gastos personales",
    "Materiales de escritura (traer libreta y pluma)",
  ],

  schedule: scheduleClean,

  facilitators: [
    {
      name: "Rodrigo Roble",
      role: "Facilitador Egresado de Escuela FloreSiendo",
      bio: `Facilitador con amplia experiencia en acompañamiento de procesos de transformación.
      Su enfoque integra la conexión con la naturaleza y las prácticas ancestrales para guiar
      experiencias profundas de bienestar y autodescubrimiento.`,
      image: "/images/Roble.jpg",
    },
    {
      name: "Ramon Henriquez",
      role: "Terapeuta Holístico",
      bio: `Terapeuta psicoemocional con formación en Programación Neurolingüística (PNL) y psicoterapia integrativa.

      Cuenta con más de 10 años de experiencia en acompañamiento de procesos de crecimiento personal.

      Aporta una perspectiva integrativa que combina herramientas psicoterapéuticas modernas con la sabiduría ancestral, creando un espacio seguro para la exploración interior.`,
      image: "/images/ramon-henriquez.png",
    },
    {
      name: "Karla Nava",
      role: "Facilitadora en Formación",
      bio: `Facilitadora con experiencia en crear espacios seguros y amorosos para el trabajo interior.
      Su presencia cálida y su capacidad de escucha profunda acompañan a cada participante
      en su proceso único de reconexión.`,
      image: "",
    },
  ],

  preparation: [
    "Dieta de preparación 7 días antes (sin carnes rojas, alcohol ni sustancias recreativas)",
    "Suspender medicamentos indicados (consultar con facilitador)",
    "Evitar relaciones sexuales 3 días antes",
    "Llegar con intención clara para el trabajo",
    "Llenado de formulario de salud obligatorio",
  ],

  contraindications: [
    "Condiciones psiquiátricas severas",
    "Uso de medicamentos psiquiátricos (requiere suspensión supervisada)",
    "Problemas cardíacos graves",
    "Embarazo o lactancia",
    "Hipertensión no controlada",
  ],

  whatsappNumber: "524427845308",
  whatsappMessage: "Hola, me interesa el Retiro de Transformación Personal de Marzo 2026. Me gustaría recibir más información.",
};
