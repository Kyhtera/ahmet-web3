import { useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const today = () => new Date().toISOString().slice(0, 10);
const empty = () => ({ slug: '', title: '', date: today(), category: '', abstract: '', content: '', image: '' });

const toDataUrl = (file) =>
  new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(r.result);
    r.onerror = reject;
    r.readAsDataURL(file);
  });

async function api(url, options) {
  const res = await fetch(url, options);
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json.error || 'Bir hata oldu');
  return json;
}

export default function Yonetim() {
  const [posts, setPosts] = useState([]);
  const [form, setForm] = useState(empty());
  const [newImage, setNewImage] = useState(null); // { dataUrl }
  const [msg, setMsg] = useState(null); // { type, text }
  const [busy, setBusy] = useState(false);
  const textRef = useRef(null);

  const loadList = () => api('/api/admin/posts').then(setPosts).catch((e) => setMsg({ type: 'err', text: e.message }));
  useEffect(() => { loadList(); }, []);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const openPost = async (slug) => {
    try {
      const p = await api(`/api/admin/posts?slug=${encodeURIComponent(slug)}`);
      setForm({ ...empty(), ...p, date: String(p.date || today()) });
      setNewImage(null);
      setMsg(null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (e) {
      setMsg({ type: 'err', text: e.message });
    }
  };

  const newPost = () => { setForm(empty()); setNewImage(null); setMsg(null); };

  const pickCover = async (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    setNewImage({ dataUrl: await toDataUrl(file) });
  };

  const insertPhoto = async (e) => {
    const file = e.target.files && e.target.files[0];
    e.target.value = '';
    if (!file) return;
    try {
      setBusy(true);
      const { path } = await api('/api/admin/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dataUrl: await toDataUrl(file) }),
      });
      const snippet = `\n\n![${file.name.replace(/\.[^.]+$/, '')}](${path})\n\n`;
      const ta = textRef.current;
      const pos = ta ? ta.selectionStart : form.content.length;
      setForm((f) => ({ ...f, content: f.content.slice(0, pos) + snippet + f.content.slice(pos) }));
    } catch (err) {
      setMsg({ type: 'err', text: err.message });
    } finally {
      setBusy(false);
    }
  };

  const save = async (e) => {
    e.preventDefault();
    setBusy(true);
    setMsg(null);
    try {
      const r = await api('/api/admin/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, newImage }),
      });
      setForm((f) => ({ ...f, slug: r.slug, image: r.image }));
      setNewImage(null);
      setMsg({ type: 'ok', text: `Kaydedildi: posts/${r.slug}.md` });
      loadList();
    } catch (err) {
      setMsg({ type: 'err', text: err.message });
    } finally {
      setBusy(false);
    }
  };

  const preview = newImage ? newImage.dataUrl : form.image ? encodeURI(form.image) : '';

  return (
    <>
      <Head>
        <title>Yazı Editörü — KYTHERA</title>
        <meta name="robots" content="noindex,nofollow" />
      </Head>

      <div className="admin">
        <div className="admin__top">
          <Link href="/" className="post-page__back">← Ana Sayfa</Link>
          <span className="admin__badge">Sadece bilgisayarında çalışır (localhost)</span>
        </div>

        <h1 className="admin__title">Yazı Editörü<b>.</b></h1>

        <div className="admin__grid">
          <form className="admin__form" onSubmit={save}>
            <div className="admin__row">
              <label>
                Başlık
                <input value={form.title} onChange={set('title')} placeholder="Yazının başlığı" required />
              </label>
            </div>

            <div className="admin__row admin__row--3">
              <label>
                Kategori
                <input value={form.category} onChange={set('category')} placeholder="Web3, Müzik, Bisiklet…" />
              </label>
              <label>
                Tarih
                <input type="date" value={form.date} onChange={set('date')} />
              </label>
              <label>
                Kapak fotoğrafı
                <input type="file" accept="image/jpeg,image/png,image/webp,image/gif" onChange={pickCover} />
              </label>
            </div>

            {preview && (
              <div className="admin__cover">
                <img src={preview} alt="Kapak önizleme" />
                {newImage && <span>Yeni fotoğraf, kaydedince yüklenecek</span>}
              </div>
            )}

            <div className="admin__row">
              <label>
                Kısa özet (blog kartında görünür)
                <input value={form.abstract} onChange={set('abstract')} placeholder="Bir iki cümlelik özet" />
              </label>
            </div>

            <div className="admin__row">
              <label>
                Metin
                <textarea
                  ref={textRef}
                  value={form.content}
                  onChange={set('content')}
                  rows={16}
                  placeholder={'Yazını buraya yaz.\n\n## Alt başlık\n**kalın**, *italik*, [link](https://…)'}
                  required
                />
              </label>
              <div className="admin__tools">
                <label className="pill admin__file">
                  📷 İmlecin olduğu yere fotoğraf ekle
                  <input type="file" accept="image/jpeg,image/png,image/webp,image/gif" onChange={insertPhoto} hidden />
                </label>
                <span>Biçim: <code>## Başlık</code> · <code>**kalın**</code> · <code>*italik*</code> · <code>[yazı](link)</code></span>
              </div>
            </div>

            {msg && <p className={`admin__msg admin__msg--${msg.type}`}>{msg.text}</p>}

            <div className="admin__actions">
              <button className="pill pill--solid" type="submit" disabled={busy}>
                {busy ? 'Kaydediliyor…' : form.slug ? 'Değişiklikleri kaydet' : 'Yazıyı kaydet'}
              </button>
              <button className="pill" type="button" onClick={newPost}>Yeni yazı</button>
              {form.slug && (
                <Link className="pill" href={`/posts/${form.slug}`} target="_blank">Yazıyı aç ↗</Link>
              )}
            </div>

            <p className="admin__hint">
              Kaydedince dosyalar proje klasörüne yazılır (<code>posts/</code> ve <code>public/assets/blog/</code>).
              Canlıya almak için: <code>git add . && git commit -m "yeni yazı" && git push</code>
            </p>
          </form>

          <aside className="admin__list">
            <h2>Mevcut yazılar</h2>
            {posts.length === 0 && <p className="admin__hint">Henüz yazı yok.</p>}
            {posts.map((p) => (
              <button key={p.slug} type="button" onClick={() => openPost(p.slug)} className={form.slug === p.slug ? 'on' : ''}>
                <small>{p.category} {p.date && `· ${p.date}`}</small>
                <span>{p.title}</span>
              </button>
            ))}
          </aside>
        </div>
      </div>
    </>
  );
}

// Canlı sitede (production) bu sayfa 404 verir
export async function getServerSideProps() {
  if (process.env.NODE_ENV === 'production') return { notFound: true };
  return { props: {} };
}
