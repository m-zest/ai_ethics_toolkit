import { getKv, isKvConfigured, KV_SETUP_MESSAGE } from '../../lib/kv';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function generateCode() {
  // 6-char base36, uppercase. 36^6 = 2.1 billion combos.
  return Math.random().toString(36).slice(2, 8).toUpperCase();
}

export async function POST(req) {
  try {
    if (!isKvConfigured()) {
      return Response.json({ error: KV_SETUP_MESSAGE }, { status: 503 });
    }
    const kv = getKv();

    const data = await req.json();

    if (!data || typeof data !== 'object') {
      return Response.json({ error: 'Invalid payload' }, { status: 400 });
    }

    const serialized = JSON.stringify(data);
    if (serialized.length > 200_000) {
      return Response.json({ error: 'Draft too large (max 200KB)' }, { status: 413 });
    }

    // Try up to 5 times to avoid collisions
    let code = generateCode();
    for (let i = 0; i < 5; i++) {
      const existing = await kv.get(`share:${code}`);
      if (!existing) break;
      code = generateCode();
    }

    // Store with 90-day TTL
    await kv.set(
      `share:${code}`,
      JSON.stringify({ ...data, shared: Date.now() }),
      { ex: 60 * 60 * 24 * 90 }
    );

    return Response.json({ code });
  } catch (e) {
    console.error('share POST failed', e);
    return Response.json(
      { error: 'Could not save the shared draft. Please try again.' },
      { status: 500 }
    );
  }
}
