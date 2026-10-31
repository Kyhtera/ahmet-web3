import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { POSTS_DIR, isDev, slugify, validSlug, saveDataUrl } from '@/lib/adminFs';

export const config = { api: { bodyParser: { sizeLimit: '15mb' } } };

const readPost = (slug) => {
  const raw = fs.readFileSync(path.join(POSTS_DIR, `${slug}.md`), 'utf8');
  const { data, content } = matter(raw);
  return { ...data, slug, content };
};

export default function handler(req, res) {
  if (!isDev()) return res.status(404).json({ error: 'Not found' });

  try {
    if (req.method === 'GET') {
      const { slug } = req.query;
      if (slug) {
        if (!validSlug(slug)) throw new Error('Geçersiz slug');
        return res.json(readPost(slug));
      }
      fs.mkdirSync(POSTS_DIR, { recursive: true });
      const list = fs
        .readdirSync(POSTS_DIR)
        .filter((f) => f.endsWith('.md'))
        .map((f) => {
          const { content, ...rest } = readPost(f.replace(/\.md$/, ''));
          return rest;
        })
        .sort((a, b) => String(b.date).localeCompare(String(a.date)));
      return res.json(list);
    }

    if (req.method === 'POST') {
      const { slug: editing, title, date, category, abstract, content, image, newImage } = req.body || {};
      if (!title || !title.trim()) throw new Error('Başlık boş olamaz.');
      if (!content || !content.trim()) throw new Error('Metin boş olamaz.');

      fs.mkdirSync(POSTS_DIR, { recursive: true });

      let slug = editing;
      if (slug) {
        if (!validSlug(slug)) throw new Error('Geçersiz slug');
      } else {
        const base = slugify(title);
        slug = base;
        let n = 2;
        while (fs.existsSync(path.join(POSTS_DIR, `${slug}.md`))) slug = `${base}-${n++}`;
      }

      let imagePath = image || '';
      if (newImage && newImage.dataUrl) {
        imagePath = saveDataUrl(newImage.dataUrl, `${slug}-${Date.now().toString(36)}`);
      }

      const data = {
        title: title.trim(),
        date: date || new Date().toISOString().slice(0, 10),
        category: (category || '').trim(),
        image: imagePath,
        slug,
        abstract: (abstract || '').trim(),
      };
      Object.keys(data).forEach((k) => data[k] === '' && delete data[k]);

      fs.writeFileSync(path.join(POSTS_DIR, `${slug}.md`), matter.stringify(content.trim() + '\n', data), 'utf8');
      return res.json({ ok: true, slug, image: imagePath });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
}
