import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: [
    // Match root
    '/',
    // Match locale prefixed paths
    '/(es|en)/:path*',
    // Match all paths EXCEPT excluded ones
    '/((?!api|_next|_vercel|admin|aplicar|pago-exitoso|test-payment|meditacion-gratuita|agendar-llamada|formulario|retiros-testimonios|retiros-video|encuentros/(?:marzo|abril|precios)|f/|design-system|.*\\..*).*)',
  ],
};
