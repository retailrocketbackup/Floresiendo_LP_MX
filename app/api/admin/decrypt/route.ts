// app/api/admin/decrypt/route.ts
import { NextResponse } from 'next/server';
import { getScreeningApplicationById } from '@/lib/supabase';
import { decrypt, getEncryptionSecret, type EncryptedData } from '@/lib/encryption';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const applicationId = searchParams.get('id');

    if (!applicationId) {
      return NextResponse.json({ error: 'Missing application ID' }, { status: 400 });
    }

    const { data, error } = await getScreeningApplicationById(applicationId);

    if (error || !data) {
      return NextResponse.json({ error: error || 'Not found' }, { status: 404 });
    }

    const secret = getEncryptionSecret();

    // Decrypt each category
    const encryptedContact: EncryptedData = JSON.parse(data.encrypted_contact);
    const encryptedMedical: EncryptedData = JSON.parse(data.encrypted_medical);
    const encryptedLifestyle: EncryptedData = JSON.parse(data.encrypted_lifestyle);

    const contact = await decrypt(encryptedContact, secret);
    const medical = await decrypt(encryptedMedical, secret);
    const lifestyle = await decrypt(encryptedLifestyle, secret);

    // Log audit trail
    console.log(`[Audit] Application ${applicationId} decrypted at ${new Date().toISOString()}`);

    return NextResponse.json({
      contact,
      medical,
      lifestyle,
    });
  } catch (error) {
    console.error('[Admin Decrypt] Error:', error);
    return NextResponse.json({ error: 'Decryption failed' }, { status: 500 });
  }
}
