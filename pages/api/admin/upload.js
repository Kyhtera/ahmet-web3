import { isDev, saveDataUrl } from '@/lib/adminFs';

export const config = { api: { bodyParser: { sizeLimit: '15mb' } } };

// Yazı metninin içine konacak fotoğraf için
export default function handler(req, res) {
  if (!isDev()) return res.status(404).json({ error: 'Not found' });
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  try {
    const path = saveDataUrl(req.body && req.body.dataUrl, `ic-${Date.now().toString(36)}`);
    return res.json({ ok: true, path });
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
}
