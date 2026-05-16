import { getKv, isKvConfigured, KV_SETUP_MESSAGE } from '../../../lib/kv';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(req, { params }) {
  try {
    if (!isKvConfigured()) {
      return Response.json({ error: KV_SETUP_MESSAGE }, { status: 503 });
    }
    const kv = getKv();

    const code = (params.code || '').toUpperCase().trim();
    if (!code || code.length !== 6) {
      return Response.json({ error: 'Invalid code' }, { status: 400 });
    }

    const data = await kv.get(`share:${code}`);
    if (!data) {
      return Response.json({ error: 'Code not found or expired' }, { status: 404 });
    }

    const parsed = typeof data === 'string' ? JSON.parse(data) : data;
    return Response.json(parsed);
  } catch (e) {
    console.error('share GET failed', e);
    return Response.json(
      { error: 'Lookup failed. Please try again.' },
      { status: 500 }
    );
  }
}
