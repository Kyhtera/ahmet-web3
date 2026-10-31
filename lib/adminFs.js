import fs from 'fs';
import path from 'path';

export const POSTS_DIR = path.join(process.cwd(), 'posts');
export const IMG_DIR = path.join(process.cwd(), 'public', 'assets', 'blog');

// Editör sadece kendi bilgisayarında (npm run dev) çalışır; canlı sitede (Vercel) kapalıdır.
export const isDev = () => process.env.NODE_ENV !== 'production';

const TR = { ç: 'c', ğ: 'g', ı: 'i', İ: 'i', ö: 'o', ş: 's', ü: 'u', Ç: 'c', Ğ: 'g', Ö: 'o', Ş: 's', Ü: 'u' };

export function slugify(s = '') {
  const out = s
    .replace(/[çğıİöşüÇĞÖŞÜ]/g, (c) => TR[c])
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
  return out || 'yazi';
}

export const validSlug = (s) => typeof s === 'string' && /^[A-Za-z0-9_-]+$/.test(s);

const EXT = { 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp', 'image/gif': 'gif' };

export function saveDataUrl(dataUrl, baseName) {
  const m = /^data:(image\/(?:jpeg|png|webp|gif));base64,(.+)$/.exec(dataUrl || '');
  if (!m) throw new Error('Geçersiz resim: jpg, png, webp veya gif olmalı.');
  fs.mkdirSync(IMG_DIR, { recursive: true });
  const file = `${baseName}.${EXT[m[1]]}`;
  fs.writeFileSync(path.join(IMG_DIR, file), Buffer.from(m[2], 'base64'));
  return `/assets/blog/${file}`;
}
