import { motion } from 'framer-motion';
import { useTranslation } from '@/src/context/LanguageContext';

const letters = 'KYTHERA'.split('');
const ease = [0.22, 1, 0.36, 1];

export default function Hero() {
  const { t } = useTranslation();

  return (
    <div className="hero">
      <div className="hero__top">
        <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 1 }}>
          {t.hero.sub}
        </motion.span>
        <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1, duration: 1 }}>
          {t.hero.tagline}
        </motion.span>
      </div>

      <div className="hero__sun-wrap">
        <motion.div
          className="hero__sun"
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.6, delay: 0.2, ease }}
        />
      </div>

      <div className="hero__photo">
        <motion.img
          src="/assets/superman_neon.webp"
          alt="Kythera"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.7, ease }}
        />
      </div>

      <h1 className="hero__word" aria-label="Kythera">
        {letters.map((l, i) => (
          <span key={i} className="hero__mask">
            <motion.span
              className="hero__letter"
              initial={{ y: '110%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 1.1, delay: 0.3 + i * 0.07, ease }}
            >
              {l}
            </motion.span>
          </span>
        ))}
      </h1>

      <motion.div
        className="hero__scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
      >
        <span>{t.hero.scroll}</span>
        <i />
      </motion.div>
    </div>
  );
}
