import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslation } from '@/src/context/LanguageContext';

const tracks = [
  'Odamda (Akustik)',
  'Terkedilmiş',
  'Yalın Taş',
  'Virane Gönlüm',
  'Vestiyer',
  'Son Bir Umut',
  'En Sevdiğim Oyundun',
  'Eskimiş Aşklar',
  'Benim Yerim Yanın Şimdilik',
];

// Kendi platform linklerini buraya ekle
const platforms = [
  { name: 'Spotify', icon: 'fa-brands fa-spotify', href: '#' },
  { name: 'Apple Music', icon: 'fa-brands fa-apple', href: '#' },
  { name: 'YouTube Music', icon: 'fa-brands fa-youtube', href: 'https://www.youtube.com/@kyhtera' },
  { name: 'Deezer', icon: 'fa-solid fa-music', href: '#' },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -15 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export default function Music() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });
  const { t } = useTranslation();

  return (
    <section id="music" className="section">
      <div className="section__divider" />
      <div style={{ paddingTop: 'clamp(5rem, 10vw, 9rem)' }}>
        <motion.p
          className="section__label"
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {t.music.label}
        </motion.p>
        <motion.h2
          className="section__title"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          {t.music.title}
        </motion.h2>

        <div className="music__inner">
          {/* Albüm Kapağı */}
          <motion.div
            className="music__cover-wrap"
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="music__cover-glow" />
            {/* Albüm kapağını public/assets/music/album-cover.jpg yoluna ekle */}
            <img
              className="music__cover"
              src="/assets/music/album-cover.png"
              alt="Ahmet USLU - İlk ve Son Albüm"
              onError={(e) => {
                e.target.style.background = '#1a1a1a';
                e.target.style.minHeight = '300px';
              }}
            />
          </motion.div>

          {/* Bilgi */}
          <motion.div
            className="music__info"
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <h3 className="music__album-name">İlk ve Son Albüm</h3>
            <p className="music__artist">Ahmet USLU</p>

            <motion.ul
              className="music__tracks"
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
            >
              {tracks.map((track, i) => (
                <motion.li key={i} className="music__track" variants={itemVariants}>
                  <span className="music__track-num">{String(i + 1).padStart(2, '0')}</span>
                  <span className="music__track-name">{track}</span>
                </motion.li>
              ))}
            </motion.ul>

            <div className="music__platforms">
              {platforms.map((p) => (
                <a
                  key={p.name}
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="music__platform-btn"
                >
                  <i className={p.icon} />
                  {p.name}
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
