import Link from 'next/link';
import { motion, useTransform } from 'framer-motion';
import { useTranslation } from '@/src/context/LanguageContext';
import SectionHead from '@/src/components/SectionHead';
import { fmtDate } from '@/src/utils/date';

// Her kağıdın duruşu: eğim, dikey kayma, kağıt rengi
const LOOKS = [
  { r: -2.2, dy: 6, paper: 'a' },
  { r: 1.6, dy: -8, paper: 'b' },
  { r: -1.1, dy: 10, paper: 'c' },
  { r: 2.0, dy: -4, paper: 'b' },
  { r: -1.7, dy: 8, paper: 'c' },
  { r: 1.2, dy: -10, paper: 'a' },
];

// progress: panelin açılma ilerlemesi (0 → 1). Kağıtlar açılırken eğik ve aşağıda başlar, yerine oturur.
function Note({ post, i, progress, lang, more }) {
  const L = LOOKS[i % LOOKS.length];
  const s = i * 0.04;
  const rotate = useTransform(progress, [0.2 + s, 0.95], [L.r * 3.5, L.r]);
  const y = useTransform(progress, [0.2 + s, 0.95], [70 + L.dy, L.dy]);

  return (
    <motion.div className="note" style={{ rotate, y }}>
      <motion.div whileHover={{ rotate: -L.r, y: -10, scale: 1.04 }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }} style={{ height: '100%' }}>
        <Link href={`/gunluk/${post.slug}`} className={`note__paper note__paper--${L.paper}`}>
          <span className="note__date">{fmtDate(post.date, lang)}</span>
          <h3 className="note__title">{post.title}</h3>
          <p className="note__ex">{post.excerpt}</p>
          <span className="note__more">{more} →</span>
        </Link>
      </motion.div>
    </motion.div>
  );
}

export default function Journal({ idx, progress, posts = [], total = 0 }) {
  const { t, lang } = useTranslation();

  return (
    <div className="journal">
      <div className="journal__head">
        <SectionHead idx={idx} label={t.journal.label} title={t.journal.title} />
        <Link href="/gunluk" className="pill pill--solid">
          {t.journal.all(total)} <i className="fa-solid fa-arrow-right" />
        </Link>
      </div>

      <div className="journal__board">
        {posts.map((p, i) => (
          <Note key={p.slug} post={p} i={i} progress={progress} lang={lang} more={t.journal.read} />
        ))}
      </div>
    </div>
  );
}
