import { useRef, useState, useCallback } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { useTranslation } from '@/src/context/LanguageContext';
import Header from '@/src/components/Header';
import Hero from '@/src/components/sections/Hero';
import Music from '@/src/components/sections/Music';
import Projects from '@/src/components/sections/Projects';
import Videos from '@/src/components/sections/Videos';
import Drawings from '@/src/components/sections/Drawings';
import BlogSection from '@/src/components/sections/BlogSection';
import Journal from '@/src/components/sections/Journal';
import About from '@/src/components/sections/About';

/*
  Her bölüm ekranı kaplayan bir "sayfa". Scroll ilerledikçe bir sonraki sayfa
  kendi geçiş efektiyle (daire, perde, çapraz, kayma...) öncekinin üstüne açılır.
  hold = sayfa tam göründükten sonra, sonraki geçiş başlamadan önce kaç ekran boyu scroll bekler.
*/
const META = [
  { id: 'hero', tone: 'cream', reveal: 'none', hold: 0.5 },
  { id: 'music', tone: 'red', reveal: 'circle', hold: 0.9 },
  { id: 'projects', tone: 'ink', reveal: 'curtainUp', hold: 0.9 },
  { id: 'videos', tone: 'sand', reveal: 'diagonal', hold: 0.9 },
  { id: 'drawings', tone: 'paper', reveal: 'slide', hold: 2 },
  { id: 'blog', tone: 'orange', reveal: 'cornerCircle', hold: 0.9 },
  { id: 'journal', tone: 'sand', reveal: 'curtainDown', hold: 0.9 },
  { id: 'about', tone: 'ink', reveal: 'curtainLeft', hold: 0.6 },
];

const REVEALS = {
  none: () => 'none',
  slide: () => 'none',
  circle: (p) => (p >= 0.999 ? 'none' : `circle(${(p * 80).toFixed(2)}% at 50% 50%)`),
  curtainUp: (p) => (p >= 0.999 ? 'none' : `inset(${((1 - p) * 100).toFixed(2)}% 0% 0% 0%)`),
  curtainDown: (p) => (p >= 0.999 ? 'none' : `inset(0% 0% ${((1 - p) * 100).toFixed(2)}% 0%)`),
  curtainLeft: (p) => (p >= 0.999 ? 'none' : `inset(0% 0% 0% ${((1 - p) * 100).toFixed(2)}%)`),
  cornerCircle: (p) => (p >= 0.999 ? 'none' : `circle(${(p * 145).toFixed(2)}% at 100% 100%)`),
  diagonal: (p) => {
    if (p >= 0.999) return 'none';
    const x = p * 150;
    return `polygon(0% 0%, ${x.toFixed(2)}% 0%, ${(x - 50).toFixed(2)}% 100%, 0% 100%)`;
  },
};

// Her panelin "girmeye başladığı" nokta (ekran boyu cinsinden) ve toplam uzunluk
function buildTimeline() {
  const E = [];
  let cur = 0;
  META.forEach((m, i) => {
    if (i === 0) {
      E.push(-1);
      cur = m.hold;
    } else {
      E.push(cur);
      cur = cur + 1 + m.hold;
    }
  });
  return { E, total: cur };
}
const { E, total: TOTAL } = buildTimeline();

function Panel({ i, progress, children }) {
  const meta = META[i];
  const next = META[i + 1];
  const last = i === META.length - 1;

  const enter = useTransform(
    progress,
    i === 0 ? [0, 1] : [E[i] / TOTAL, (E[i] + 1) / TOTAL],
    i === 0 ? [1, 1] : [0, 1]
  );
  const exit = useTransform(
    progress,
    last ? [1.5, 2] : [E[i + 1] / TOTAL, (E[i + 1] + 1) / TOTAL],
    [0, 1]
  );
  const holdP = useTransform(
    progress,
    [(E[i] + 1) / TOTAL, (E[i] + 1 + meta.hold) / TOTAL],
    [0, 1]
  );

  const clipPath = useTransform(enter, REVEALS[meta.reveal]);
  const selfSlide = meta.reveal === 'slide';
  const nextSlide = next && next.reveal === 'slide';

  const x = useTransform([enter, exit], ([e, o]) => {
    const own = selfSlide ? (1 - e) * 100 : 0;
    const prev = nextSlide ? -o * 22 : 0;
    return `${own + prev}%`;
  });
  const scale = useTransform(exit, [0, 1], [1, nextSlide ? 1 : 0.94]);
  const dim = useTransform(exit, [0, 1], [0, 0.55]);
  const contentY = useTransform(enter, [0, 1], [i === 0 || selfSlide ? 0 : 90, 0]);
  const contentOpacity = useTransform(enter, [0, 0.45, 1], [0, 0.5, 1]);
  const pe = useTransform(enter, (p) => (p > 0.02 ? 'auto' : 'none'));

  return (
    <motion.section
      id={meta.id}
      className={`panel tone-${meta.tone}`}
      style={{ clipPath, x, scale, zIndex: i + 1, pointerEvents: pe }}
    >
      <motion.div className="panel__inner" style={{ y: contentY, opacity: i === 0 ? 1 : contentOpacity }}>
        {typeof children === 'function' ? children(holdP, enter) : children}
      </motion.div>
      <motion.div className="panel__dim" style={{ opacity: dim }} />
    </motion.section>
  );
}

export default function Stage({ posts, journal }) {
  const ref = useRef(null);
  const [active, setActive] = useState(0);
  const { t } = useTranslation();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const u = v * TOTAL;
    let a = 0;
    for (let i = 1; i < META.length; i++) {
      if (u >= E[i] + 0.5) a = i;
    }
    setActive((cur) => (cur === a ? cur : a));
  });

  const goTo = useCallback((id) => {
    const i = META.findIndex((m) => m.id === id);
    if (i < 0 || !ref.current) return;
    const vh = window.innerHeight;
    const top = ref.current.getBoundingClientRect().top + window.scrollY;
    const u = i === 0 ? 0 : E[i] + 1.001;
    const y = top + u * vh;
    if (window.__lenis) window.__lenis.scrollTo(y, { duration: 2 });
    else window.scrollTo({ top: y, behavior: 'smooth' });
  }, []);

  const renderers = {
    hero: () => <Hero />,
    music: () => <Music idx={1} />,
    projects: () => <Projects idx={2} />,
    videos: () => <Videos idx={3} />,
    drawings: (hp) => <Drawings idx={4} progress={hp} />,
    blog: () => <BlogSection idx={5} posts={posts} />,
    journal: (hp, en) => <Journal idx={6} progress={en} posts={journal ? journal.preview : []} total={journal ? journal.total : 0} />,
    about: () => <About idx={7} />,
  };

  return (
    <>
      <Header active={active} tone={META[active].tone} onNav={goTo} />

      <motion.div className="progress-line" style={{ scaleX: scrollYProgress }} />

      <nav className="dots" data-tone={META[active].tone} aria-label="Bölümler">
        {META.map((m, i) => (
          <button
            key={m.id}
            className={`dots__item${active === i ? ' is-active' : ''}`}
            onClick={() => goTo(m.id)}
            aria-label={i === 0 ? 'Ana sayfa' : t.nav[i - 1]}
          >
            <span className="dots__label">{i === 0 ? 'Kythera' : t.nav[i - 1]}</span>
            <span className="dots__bar" />
          </button>
        ))}
      </nav>

      <div className="grain" />

      <div className="stage-root" ref={ref} style={{ height: `calc(${TOTAL + 1} * 100svh)` }}>
        <div className="stage">
          {META.map((m, i) => (
            <Panel key={m.id} i={i} progress={scrollYProgress}>
              {(hp, en) => renderers[m.id](hp, en)}
            </Panel>
          ))}
        </div>
      </div>
    </>
  );
}
