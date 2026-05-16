import { createClient } from '@vercel/kv';

// Vercel's classic "KV" and the current Upstash-via-Marketplace integration
// inject the REST credentials under different env var names. Resolve whatever
// is present so Share works regardless of which path was used to provision
// the database.
function resolveCreds() {
  const url =
    process.env.KV_REST_API_URL ||
    process.env.UPSTASH_REDIS_REST_URL ||
    process.env.REDIS_REST_API_URL ||
    null;
  const token =
    process.env.KV_REST_API_TOKEN ||
    process.env.UPSTASH_REDIS_REST_TOKEN ||
    process.env.REDIS_REST_API_TOKEN ||
    null;
  return { url, token };
}

export function isKvConfigured() {
  const { url, token } = resolveCreds();
  return Boolean(url && token);
}

let _client = null;

export function getKv() {
  if (_client) return _client;
  const { url, token } = resolveCreds();
  if (!url || !token) return null;
  _client = createClient({ url, token });
  return _client;
}

export const KV_SETUP_MESSAGE =
  'Sharing is not configured. Connect an Upstash Redis (KV) database to this Vercel project, then redeploy. See README → "Enable sharing".';
