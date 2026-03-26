import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Hero() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  // Arka plan yazısı scroll'la yukarı daha hızlı çıkar → parallax derinlik hissi
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '-40%']);
  // Fotoğraf daha yavaş hareket eder
  const photoY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  // Scroll göstergesi kaybolur
  const scrollOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);

  return (
    <section id="hero" className="hero" ref={ref}>
      <motion.div
        className="hero__bg-text"
        style={{ y: bgY }}
      >
        <motion.span
          className="ghost"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 0.3 }}
        >
          KYT
        </motion.span>
        <motion.span
          className="red"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
        >
          HERA
        </motion.span>
      </motion.div>

      <motion.div
        className="hero__photo"
        style={{ y: photoY }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <img src="/assets/superman.png" alt="Kythera" />
      </motion.div>

      <motion.div
        className="hero__scroll"
        style={{ opacity: scrollOpacity }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
      >
        scroll
      </motion.div>
    </section>
  );
}
