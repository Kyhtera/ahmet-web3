import fs from 'fs';
import path from 'path';
import { remark } from 'remark';
import html from 'remark-html';

// Tumblr'dan alınan eski yazılar bu klasörde duruyor. Yeni yazı eklemek için aynı biçimde bir .md dosyası koymak yeterli:
//   YYYY-AA-GG-yazi-adi.md   →   ilk satır "# Başlık", sonra "*tarih*" satırı, sonra metin
const DIR = path.join(process.cwd(), 'Personal_Blog');

// Ana sayfadaki "kağıt notlar" bölümünde görünecek yazılar (slug). Değiştirmek için bu listeyi düzenle.
export const FEATURED = [
  'tezat',
  'hic',
  'karanliklarin-icinden',
  'zamansiz',
  'bir-erkegin-gunlugu-1',
  'sinir-olunan-insanlar-birligi',
];

// Sitede hiç görünmesini istemediğin yazıların slug'ı buraya
export const HIDDEN = [];

const norm = (s) => s.toLocaleLowerCase('tr').replace(/[^\p{L}\p{N}]+/gu, ' ').trim();

function plain(md) {
  return md
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[*_#>`]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function excerptOf(body, max = 170) {
  const t = plain(body);
  if (t.length <= max) return t;
  const cut = t.slice(0, max);
  return cut.slice(0, cut.lastIndexOf(' ') > 80 ? cut.lastIndexOf(' ') : max).replace(/[\s,.;:–-]+$/, '') + '…';
}

function readAll() {
  if (!fs.existsSync(DIR)) return [];
  const rows = [];
  for (const file of fs.readdirSync(DIR)) {
    const m = /^(\d{4}-\d{2}-\d{2})-(.+)\.md$/.exec(file); // "2014-undefined-04-..." gibi bozuk adlar elenir
    if (!m) continue;
    const raw = fs.readFileSync(path.join(DIR, file), 'utf8').replace(/\r\n/g, '\n');
    const titleMatch = /^#\s+(.+)$/m.exec(raw);
    if (!titleMatch) continue;
    const slug = m[2];
    if (HIDDEN.includes(slug)) continue;
    const body = raw
      .replace(/^#\s+.+\n/m, '')
      .replace(/^\*[^*\n]+\*[ \t]*\n/m, '')
      .trim();
    if (!body) continue;
    const imgs = [...body.matchAll(/!\[[^\]]*\]\(([^)]+)\)/g)].map((x) => x[1]);
    const words = plain(body).split(' ').filter(Boolean).length;
    rows.push({
      slug,
      title: titleMatch[1].trim(),
      date: m[1],
      body,
      excerpt: excerptOf(body),
      image: imgs[0] || null,
      minutes: Math.max(1, Math.round(words / 200)),
    });
  }
  // Aynı başlıklı kopyalarda en eski tarihliyi tut
  rows.sort((a, b) => a.date.localeCompare(b.date));
  const seen = new Set();
  const unique = rows.filter((r) => {
    const k = norm(r.title);
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
  return unique.sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title, 'tr'));
}

const card = ({ body, ...rest }) => rest;

export function getJournalPosts() {
  return readAll().map(card);
}

export function getJournalPreview(n = 6) {
  const all = readAll();
  const picked = FEATURED.map((s) => all.find((p) => p.slug === s)).filter(Boolean);
  for (const p of all) {
    if (picked.length >= n) break;
    if (!picked.includes(p)) picked.push(p);
  }
  return {
    total: all.length,
    preview: picked.slice(0, n).map((p) => ({ slug: p.slug, title: p.title, date: p.date, excerpt: p.excerpt })),
  };
}

export function getJournalSlugs() {
  return readAll().map((p) => ({ params: { slug: p.slug } }));
}

export async function getJournalPost(slug) {
  const all = readAll();
  const i = all.findIndex((p) => p.slug === slug);
  if (i < 0) return null;
  const p = all[i];
  // Tumblr yazılarında tek satır sonu = satır başı; markdown bunu yutmasın diye sert satır sonu yapıyoruz
  const withBreaks = p.body.replace(/([^\n])\n(?=[^\n])/g, '$1  \n');
  const contentHtml = (await remark().use(html).process(withBreaks)).toString();
  const { body, ...rest } = p;
  const link = (x) => (x ? { slug: x.slug, title: x.title } : null);
  return { ...rest, contentHtml, newer: link(all[i - 1]), older: link(all[i + 1]) };
}
