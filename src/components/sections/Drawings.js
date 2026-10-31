import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useMotionValueEvent } from 'framer-motion';
import { useTranslation } from '@/src/context/LanguageContext';
import SectionHead from '@/src/components/SectionHead';

// Küçük kopyalar (thumbs) galeride, orta boy kopyalar (large) büyütünce açılır. Orijinaller yerinde duruyor.
const names = ['Anime', 'Blonde', 'Capprio', 'Carribean', 'Girl', 'Korean', 'Leon', 'Nero', 'Pirate', 'Shocked', 'Umbrella'];
const drawings = names.map((alt) => {
  const f = alt.toLowerCase();
  return { alt, thumb: `/assets/drawings/thumbs/${f}.jpg`, large: `/assets/drawings/large/${f}.jpg` };
});

// Her çizim için sabit (rastgele gibi görünen) dağınık pozisyon / açı değerleri
const SEEDS = drawings.map((_, i) => {
  const r = (k) => {
    const x = Math.sin((i + 1) * 12.9898 + k * 78.233) * 43758.5453;
    return x - Math.floor(x);
  };
  return { sx: r(1), sy: r(2), sr: (r(3) - 0.5) * 60, ss: 1.12 + r(4) * 0.5, pr: (r(5) - 0.5) * 14, pj: r(6) - 0.5, pk: r(7) - 0.5 };
});

const clamp01 = (v) => Math.min(1, Math.max(0, v));
const lerp = (a, b, t) => a + (b - a) * t;
const easeOut = (t) => 1 - Math.pow(1 - t, 3);
const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

// Sahne boyutuna göre kart boyutu ve son (toplanmış) ızgara düzeni
function layout(w, h) {
  const n = drawings.length;
  const cols = w < 700 ? 3 : 6;
  const rows = Math.ceil(n / cols);
  const gap = w < 700 ? 8 : 14;
  const cw = Math.max(40, Math.min((w - gap * (cols - 1)) / cols, ((h - gap * (rows - 1)) / rows) * 0.75));
  const ch = cw * (4 / 3);
  const gw = cols * cw + (cols - 1) * gap;
  const gh = rows * ch + (rows - 1) * gap;
  const ox = (w - gw) / 2;
  const oy = (h - gh) / 2;

  const items = drawings.map((_, i) => {
    const row = Math.floor(i / cols);
    const col = i % cols;
    const inRow = Math.min(cols, n - row * cols);
    const rowShift = ((cols - inRow) * (cw + gap)) / 2;
    const s = SEEDS[i];
    return {
      gx: ox + col * (cw + gap) + rowShift,
      gy: oy + row * (ch + gap),
      px: w / 2 - cw / 2 + s.pj * cw * 0.25,
      py: h / 2 - ch / 2 + s.pk * ch * 0.2,
      sx: -cw * 0.1 + s.sx * (w - cw * 0.8),
      sy: -ch * 0.05 + s.sy * (h - ch * 0.9),
    };
  });
  return { cw, ch, items };
}

// progress: bu panel tam göründükten sonraki scroll ilerlemesi (0 → 1)
//   0   → 0.45 : yığın halinden etrafa dağılır
//   0.5 → 0.95 : tekrar toplanıp düzenli galeri olur
export default function Drawings({ idx, progress }) {
  const { t } = useTranslation();
  const stageRef = useRef(null);
  const cardRefs = useRef([]);
  const geo = useRef(null);
  const [open, setOpen] = useState(null);

  const apply = useCallback((p) => {
    const g = geo.current;
    if (!g) return;
    g.items.forEach((it, i) => {
      const el = cardRefs.current[i];
      if (!el) return;
      const s = SEEDS[i];
      const t1 = easeOut(clamp01((p - i * 0.012) / 0.4));
      const t2 = easeInOut(clamp01((p - 0.52 - i * 0.01) / 0.38));
      const x = lerp(lerp(it.px, it.sx, t1), it.gx, t2);
      const y = lerp(lerp(it.py, it.sy, t1), it.gy, t2);
      const rot = lerp(lerp(s.pr, s.sr, t1), 0, t2);
      const sc = lerp(lerp(1.04, s.ss, t1), 1, t2);
      el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) rotate(${rot.toFixed(2)}deg) scale(${sc.toFixed(3)})`;
    });
  }, []);

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const measure = () => {
      const w = el.offsetWidth;
      const h = el.offsetHeight;
      if (!w || !h) return;
      geo.current = layout(w, h);
      cardRefs.current.forEach((c) => {
        if (!c) return;
        c.style.width = `${geo.current.cw}px`;
        c.style.height = `${geo.current.ch}px`;
        c.style.opacity = 1;
      });
      apply(progress.get());
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [apply, progress]);

  useMotionValueEvent(progress, 'change', apply);

  // Büyütülmüş görünüm: klavye + sayfa scroll'unu durdur
  useEffect(() => {
    if (open === null) return undefined;
    if (window.__lenis) window.__lenis.stop();
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(null);
      if (e.key === 'ArrowRight') setOpen((o) => (o + 1) % drawings.length);
      if (e.key === 'ArrowLeft') setOpen((o) => (o - 1 + drawings.length) % drawings.length);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      if (window.__lenis) window.__lenis.start();
    };
  }, [open]);

  const step = (d) => (e) => {
    e.stopPropagation();
    setOpen((o) => (o + d + drawings.length) % drawings.length);
  };

  return (
    <div className="drawings">
      <div className="drawings__head">
        <SectionHead idx={idx} label={t.drawings.label} title={t.drawings.title} />
        <p className="drawings__hint">{t.drawings.hint}</p>
      </div>

      <div className="drawings__stage" ref={stageRef}>
        {drawings.map((d, i) => (
          <button
            key={d.alt}
            ref={(el) => (cardRefs.current[i] = el)}
            type="button"
            className="dcard"
            style={{ zIndex: i + 1 }}
            onClick={() => setOpen(i)}
            aria-label={d.alt}
          >
            <img src={d.thumb} alt={d.alt} draggable={false} />
          </button>
        ))}
      </div>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            className="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setOpen(null)}
          >
            <motion.img
              key={open}
              src={drawings[open].large}
              alt={drawings[open].alt}
              initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            />
            <span className="lightbox__cap">
              {drawings[open].alt} · {open + 1} / {drawings.length}
            </span>
            <button type="button" className="lightbox__nav lightbox__nav--prev" onClick={step(-1)} aria-label="Önceki">←</button>
            <button type="button" className="lightbox__nav lightbox__nav--next" onClick={step(1)} aria-label="Sonraki">→</button>
            <button type="button" className="lightbox__close" onClick={() => setOpen(null)} aria-label="Kapat">✕</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
