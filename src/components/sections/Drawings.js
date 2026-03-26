import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, AnimatePresence } from 'framer-motion';
import { useTranslation } from '@/src/context/LanguageContext';

const drawings = [
  { src: '/assets/drawings/anime.JPG',     alt: 'Anime' },
  { src: '/assets/drawings/blonde.JPG',    alt: 'Blonde' },
  { src: '/assets/drawings/capprio.JPG',   alt: 'Capprio' },
  { src: '/assets/drawings/carribean.JPG', alt: 'Carribean' },
  { src: '/assets/drawings/girl.JPG',      alt: 'Girl' },
  { src: '/assets/drawings/korean.JPG',    alt: 'Korean' },
  { src: '/assets/drawings/leon.JPG',      alt: 'Leon' },
  { src: '/assets/drawings/nero.JPG',      alt: 'Nero' },
  { src: '/assets/drawings/pirate.JPG',    alt: 'Pirate' },
  { src: '/assets/drawings/shocked.JPG',   alt: 'Shocked' },
  { src: '/assets/drawings/umbrella.JPG',  alt: 'Umbrella' },
];

const pageVariants = {
  enter: (d) => ({
    rotateY: d >= 0 ? 75 : -75,
    x:       d >= 0 ? 40  : -40,
    opacity: 0,
  }),
  center: { rotateY: 0, x: 0, opacity: 1 },
  exit:   (d) => ({
    rotateY: d >= 0 ? -75 : 75,
    x:       d >= 0 ? -40 : 40,
    opacity: 0,
  }),
};

const pageTransition = { duration: 0.5, ease: [0.22, 1, 0.36, 1] };

export default function Drawings() {
  const sectionRef = useRef(null);
  const [[page, dir], setPage] = useState([0, 0]);

  const { t } = useTranslation();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  useEffect(() => {
    return scrollYProgress.on('change', (v) => {
      const next = Math.min(Math.floor(v * drawings.length), drawings.length - 1);
      setPage(([cur]) => (next === cur ? [cur, 0] : [next, next > cur ? 1 : -1]));
    });
  }, []);

  const drawing = drawings[page];

  return (
    <section
      id="drawings"
      ref={sectionRef}
      className="section notebook-section"
      style={{ height: `${drawings.length * 100}vh` }}
    >
      <div className="section__divider" />

      <div className="notebook-sticky">
        <div style={{ textAlign: 'center' }}>
          <p className="section__label" style={{ marginBottom: '0.4rem' }}>{t.drawings.label}</p>
          <h2 className="section__title" style={{ marginBottom: 0 }}>{t.drawings.title}</h2>
        </div>

        <div className="notebook">
          <div className="notebook__spine">
            {Array.from({ length: 7 }).map((_, i) => (
              <div key={i} className="notebook__ring" />
            ))}
          </div>

          <div className="notebook__book" style={{ perspective: 1400 }}>
            <AnimatePresence initial={false} custom={dir} mode="sync">
              <motion.div
                key={page}
                custom={dir}
                className="notebook__page"
                variants={pageVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={pageTransition}
              >
                <img src={drawing.src} alt={drawing.alt} loading="lazy" />
                <span className="notebook__page-label">{drawing.alt}</span>
                <span className="notebook__page-number">{page + 1} / {drawings.length}</span>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="notebook__dots">
          {drawings.map((_, i) => (
            <div
              key={i}
              className={`notebook__dot${i === page ? ' notebook__dot--active' : ''}`}
            />
          ))}
        </div>

        <p className="notebook__hint">{t.drawings.hint}</p>
      </div>
    </section>
  );
}
