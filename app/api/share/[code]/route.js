import { kv } from '@vercel/kv';

export async function GET(req, { params }) {
  try {
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
      { error: e.message || 'Lookup failed. Has Vercel KV been set up?' },
      { status: 500 }
    );
  }
}
