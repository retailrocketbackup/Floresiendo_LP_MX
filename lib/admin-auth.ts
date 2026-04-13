import { NextResponse } from 'next/server';

export type AdminAuthResult =
  | { ok: true }
  | { ok: false; response: NextResponse };

export function requireAdminPassword(request: Request): AdminAuthResult {
  if (process.env.NODE_ENV === 'development') return { ok: true };

  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    return {
      ok: false,
      response: NextResponse.json({ error: 'Admin not configured' }, { status: 500 }),
    };
  }

  const { searchParams } = new URL(request.url);
  const header = request.headers.get('x-admin-password');
  const query = searchParams.get('password');

  if (header !== adminPassword && query !== adminPassword) {
    return {
      ok: false,
      response: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }),
    };
  }

  return { ok: true };
}

// Normalizes Meta-API errors surfaced by lib/meta-ads metaFetch. Rate-limit
// errors (codes 4/17/32/613) are thrown with "request limit" in the message;
// this helper maps those to HTTP 429 so clients can back off, and everything
// else to HTTP 500.
export function handleMetaError(err: unknown): NextResponse {
  const msg = err instanceof Error ? err.message : 'Unknown error';
  if (msg.includes('request limit') || msg.includes('limit reached')) {
    return NextResponse.json(
      { error: 'Límite de API alcanzado. Espera 2-3 minutos y recarga la página.' },
      { status: 429 }
    );
  }
  console.error('[Meta API handler error]', err);
  return NextResponse.json({ error: msg }, { status: 500 });
}
