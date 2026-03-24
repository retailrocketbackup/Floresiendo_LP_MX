import { NextResponse } from 'next/server';

// Caption templates by funnel
const captionTemplates = {
  duelo: {
    hooks: [
      'El duelo no tiene un tiempo definido',
      'Hay pérdidas que cambian nuestra vida para siempre',
      'A veces, el silencio es la única respuesta que tenemos',
      'Honrar lo que amamos es honrar lo que hemos perdido',
    ],
    bodies: [
      'El camino del duelo es único para cada persona. En FloreSiendo, creamos un espacio seguro donde puedes procesar tu historia a tu propio ritmo.',
      'No tienes que atravesar este momento en soledad. Te acompañamos con respeto y cuidado mientras reconectas con tu fuerza interior.',
      'Cada persona lleva sus propios tiempos. Aquí encontrarás un refugio para soltar, para respirar, para volver a ti.',
    ],
    ctas: [
      'Conoce más sobre nuestros retiros en el link de bio',
      'Reserva tu lugar en nuestra próxima experiencia',
      'Si esto resuena contigo, guarda esta publicación',
    ],
  },
  proposito: {
    hooks: [
      '¿Cuándo fue la última vez que te preguntaste qué quieres realmente?',
      'A veces, necesitamos alejarnos para ver con claridad',
      'Tu propósito no está perdido, solo está esperando ser escuchado',
      'La claridad llega cuando creamos espacio para ella',
    ],
    bodies: [
      'Reconectar con tu propósito requiere tiempo, silencio y acompañamiento. Nuestros retiros están diseñados para ayudarte a escuchar tu voz interior.',
      'En el ruido del día a día, es fácil perder de vista lo que realmente importa. Un retiro puede ser el espacio que necesitas para reconectarte.',
      'Cuando nos alejamos de la rutina, encontramos perspectiva. Esa claridad que buscas está más cerca de lo que imaginas.',
    ],
    ctas: [
      'Descubre cómo un retiro puede ayudarte',
      'Visita nuestro sitio para conocer las próximas fechas',
      'Comenta "info" y te enviamos más información',
    ],
  },
  estres: {
    hooks: [
      'Tu cuerpo te ha estado hablando. ¿Lo has escuchado?',
      'El agotamiento no es debilidad, es una señal',
      'Descansar no es un lujo, es una necesidad',
      'A veces, parar es la mejor forma de avanzar',
    ],
    bodies: [
      'El estrés crónico afecta cada aspecto de nuestra vida. Tomarte un tiempo para desconectar y reconectarte contigo mismo no es un capricho, es una inversión en tu bienestar.',
      'Cuando el cuerpo pide una pausa, escucharlo es un acto de amor propio. Nuestros retiros ofrecen ese espacio de reconexión que necesitas.',
      'En un mundo que premia la productividad constante, detenerte requiere valentía. Permítete ese regalo.',
    ],
    ctas: [
      'Tu bienestar importa. Conoce nuestros retiros',
      'Link en bio para más información',
      'Guarda esta publicación como recordatorio',
    ],
  },
  general: {
    hooks: [
      'Hay momentos en la vida que piden una pausa',
      'A veces necesitamos alejarnos para encontrarnos',
      'El verdadero bienestar comienza cuando te escuchas',
      'La transformación empieza con un primer paso',
    ],
    bodies: [
      'En FloreSiendo creamos espacios seguros para la introspección y el crecimiento personal. Cada retiro está diseñado con cuidado para acompañarte en tu proceso.',
      'Nuestros retiros combinan prácticas ancestrales con acompañamiento profesional, creando una experiencia única de reconexión contigo mismo.',
      'Más que un retiro, es una invitación a pausar, respirar y reconectarte con lo que realmente importa.',
    ],
    ctas: [
      'Descubre más en el link de bio',
      'Conoce las próximas fechas en nuestro sitio',
      'Si esto resuena contigo, guarda y comparte',
    ],
  },
};

// Hashtag suggestions by funnel
const hashtagSuggestions = {
  duelo: ['duelo', 'sanacionemocional', 'procesodevida', 'perdida', 'bienestaremocional', 'retiroespiritual', 'mexico', 'acompanamiento'],
  proposito: ['propositodevida', 'claridad', 'crecimientopersonal', 'reflexion', 'transformacion', 'retiroespiritual', 'mexico', 'bienestar'],
  estres: ['antiestrés', 'burnout', 'descanso', 'bienestar', 'saludmental', 'pausanecesaria', 'retiroespiritual', 'mexico'],
  general: ['retiroespiritual', 'bienestar', 'crecimientopersonal', 'saludmental', 'mexico', 'transformacion', 'autoconocimiento', 'mindfulness'],
};

// Reel-specific caption templates (short-form, hook-heavy)
const reelCaptionTemplates = {
  duelo: {
    hooks: [
      'Esto es lo que nadie te dice sobre el duelo...',
      'Perder a alguien no se supera. Se aprende a vivir con ello.',
      'El dolor no tiene fecha de caducidad.',
      'Si estás pasando por un duelo, necesitas escuchar esto.',
    ],
    bodies: [
      'Un espacio seguro para procesar lo que cargas. Sin prisa, sin juicio.',
      'A veces, solo necesitas un lugar donde puedas sentir sin explicar.',
      'Tu proceso es válido. Tu tiempo es tuyo.',
    ],
    ctas: [
      'Link en bio para conocer nuestros retiros',
      'Comparte con alguien que necesite escuchar esto',
      'Guarda este reel para cuando lo necesites',
    ],
  },
  proposito: {
    hooks: [
      '¿Sientes que algo falta en tu vida pero no sabes qué es?',
      'Deja de buscar tu propósito. Empieza a escucharte.',
      '3 señales de que necesitas una pausa para reconectarte.',
      'Tu siguiente capítulo empieza con una decisión.',
    ],
    bodies: [
      'La claridad no llega en el ruido. Llega cuando te das permiso de pausar.',
      'Reconectar con tu propósito no es un lujo. Es una necesidad.',
      'A veces necesitas alejarte de todo para ver con claridad.',
    ],
    ctas: [
      'Conoce nuestros retiros de reconexión — link en bio',
      'Etiqueta a alguien que necesita este mensaje',
      'Síguenos para más contenido de bienestar',
    ],
  },
  estres: {
    hooks: [
      'Tu cuerpo lleva la cuenta aunque tú no lo hagas.',
      '¿Burnout? Estas 3 señales no mienten.',
      'Parar NO es rendirse. Es la decisión más valiente.',
      'Lo que el estrés crónico le hace a tu cuerpo...',
    ],
    bodies: [
      'Descansar es un acto revolucionario en un mundo que premia el agotamiento.',
      'Tu cuerpo no necesita más productividad. Necesita presencia.',
      'Un retiro puede ser el reset que tu sistema nervioso necesita.',
    ],
    ctas: [
      'Tu bienestar importa — link en bio',
      'Guarda este reel como recordatorio',
      'Comparte con alguien que necesite parar',
    ],
  },
  general: {
    hooks: [
      'Esto es lo que pasa cuando te das permiso de parar...',
      'Un fin de semana puede cambiarlo todo.',
      '¿Y si el cambio que buscas empieza con una pausa?',
      'No es un retiro. Es una invitación a volver a ti.',
    ],
    bodies: [
      'FloreSiendo es un espacio donde puedes soltar, respirar y reconectarte.',
      'Prácticas guiadas, naturaleza y acompañamiento profesional en un solo lugar.',
      'Más que un retiro, es una experiencia de reconexión contigo mismo.',
    ],
    ctas: [
      'Descubre más en el link de bio',
      'Guarda y comparte si esto resuena contigo',
      'Síguenos para más contenido de bienestar',
    ],
  },
};

// Reel-specific hashtags (optimized for Reels discovery)
const reelHashtagSuggestions = {
  duelo: ['duelo', 'saludmental', 'bienestaremocional', 'retiromexico', 'procesodevida', 'reelsviral', 'retiroespiritual', 'floresiendo'],
  proposito: ['propositodevida', 'crecimientopersonal', 'reconexion', 'retiromexico', 'claridad', 'reelsviral', 'bienestar', 'floresiendo'],
  estres: ['burnout', 'antiestrés', 'saludmental', 'bienestar', 'retiromexico', 'pausanecesaria', 'reelsviral', 'floresiendo'],
  general: ['retiroespiritual', 'bienestar', 'crecimientopersonal', 'retiromexico', 'autoconocimiento', 'reelsviral', 'mindfulness', 'floresiendo'],
};

// Image prompt suggestions by funnel
const imagePromptSuggestions = {
  duelo: [
    'serene mountain landscape with morning mist, contemplative atmosphere',
    'hands gently holding a flower, soft natural lighting',
    'peaceful lake reflection at sunset',
    'candle flame in soft darkness',
  ],
  proposito: [
    'path through forest with sunlight breaking through trees',
    'compass on natural stone surface',
    'sunrise over mountain range',
    'open road leading to horizon',
  ],
  estres: [
    'hands in meditation pose with nature background',
    'peaceful zen garden with raked sand',
    'person relaxing in hammock among trees',
    'calm ocean waves at sunset',
  ],
  general: [
    'serene wellness retreat setting with natural elements',
    'meditation space with warm natural lighting',
    'peaceful Mexican landscape at golden hour',
    'ceremonial cacao cup with flowers',
  ],
};

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Skip auth in development
    const isDev = process.env.NODE_ENV === 'development';
    if (!isDev) {
      const adminPassword = process.env.ADMIN_PASSWORD;
      if (body.password !== adminPassword) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
    }

    const { theme, funnel = 'general', platforms = ['facebook', 'instagram'], format = 'image' } = body;

    if (!theme || theme.trim().length === 0) {
      return NextResponse.json({ error: 'Theme is required' }, { status: 400 });
    }

    // Choose template set based on format (reel vs image)
    if (format === 'reel') {
      const templates = reelCaptionTemplates[funnel as keyof typeof reelCaptionTemplates] || reelCaptionTemplates.general;

      const hook = templates.hooks[Math.floor(Math.random() * templates.hooks.length)];
      const bodyText = templates.bodies[Math.floor(Math.random() * templates.bodies.length)];
      const cta = templates.ctas[Math.floor(Math.random() * templates.ctas.length)];

      // Reel captions are shorter and punchier
      const caption = `${hook}\n\n${bodyText}\n\n${cta}`;

      const hashtags = reelHashtagSuggestions[funnel as keyof typeof reelHashtagSuggestions] || reelHashtagSuggestions.general;

      return NextResponse.json({
        success: true,
        caption,
        hashtags,
        format: 'reel',
        funnel,
        theme,
      });
    }

    // Default: image post format
    const templates = captionTemplates[funnel as keyof typeof captionTemplates] || captionTemplates.general;

    // Select random elements
    const hook = templates.hooks[Math.floor(Math.random() * templates.hooks.length)];
    const bodyText = templates.bodies[Math.floor(Math.random() * templates.bodies.length)];
    const cta = templates.ctas[Math.floor(Math.random() * templates.ctas.length)];

    // Build caption - incorporate theme
    const caption = `${hook}

${bodyText}

${cta}`;

    // Get hashtags if Instagram is a platform
    const hashtags = platforms.includes('instagram')
      ? hashtagSuggestions[funnel as keyof typeof hashtagSuggestions] || hashtagSuggestions.general
      : [];

    // Get image prompt suggestion
    const prompts = imagePromptSuggestions[funnel as keyof typeof imagePromptSuggestions] || imagePromptSuggestions.general;
    const imagePrompt = prompts[Math.floor(Math.random() * prompts.length)];

    return NextResponse.json({
      success: true,
      caption,
      hashtags,
      imagePrompt,
      format: 'image',
      funnel,
      theme,
    });
  } catch (error) {
    console.error('[Generate Caption API Error]', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to generate caption' },
      { status: 500 }
    );
  }
}
