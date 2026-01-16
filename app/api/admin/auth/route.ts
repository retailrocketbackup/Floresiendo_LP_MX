// app/api/admin/auth/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { password } = await request.json();
    const adminPassword = process.env.ADMIN_PASSWORD;

    // Debug: log password comparison (remove in production)
    console.log('[Admin Auth] Received password length:', password?.length);
    console.log('[Admin Auth] Expected password length:', adminPassword?.length);
    console.log('[Admin Auth] Match:', password === adminPassword);

    if (!adminPassword) {
      console.error('[Admin Auth] ADMIN_PASSWORD not configured');
      return NextResponse.json({ error: 'Not configured' }, { status: 500 });
    }

    if (password === adminPassword) {
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
  } catch (error) {
    console.error('[Admin Auth] Error:', error);
    return NextResponse.json({ error: 'Auth failed' }, { status: 500 });
  }
}
