import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslation } from '@/src/context/LanguageContext';

const skills = [
  'Next.js', 'React', 'Node.js', 'Solidity', 'JavaScript',
  'HTML5 / CSS3', 'WordPress', 'ASP.Net', 'Photoshop', 'Logic Pro X',
];

const links = [
  { label: 'instagram.com/kyhtera', icon: 'fa-brands fa-instagram', href: 'https://www.instagram.com/kyhtera/' },
  { label: '@maykilcifoks', icon: 'fa-brands fa-x-twitter', href: 'https://x.com/maykilcifoks' },
  { label: 'github.com/Kyhtera', icon: 'fa-brands fa-github', href: 'https://github.com/Kyhtera' },
  { label: 'youtube.com/@kyhtera', icon: 'fa-brands fa-youtube', href: 'https://www.youtube.com/@kyhtera' },
  { label: 'ahmetuslum@gmail.com', icon: 'fa-regular fa-envelope', href: 'mailto:ahmetuslum@gmail.com' },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const { t } = useTranslation();

  return (
    <section id="about" className="section">
      <div className="section__divider" />
      <div style={{ paddingTop: 'clamp(5rem, 10vw, 9rem)' }}>
        <motion.p
          className="section__label"
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {t.about.label}
        </motion.p>
        <motion.h2
          className="section__title"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          {t.about.title}
        </motion.h2>

        <div className="about__inner">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="about__bio">{t.about.bio}</p>

            <div className="about__skills">
              {skills.map((skill) => (
                <span key={skill} className="skill-tag">{skill}</span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <h3 className="about__contact-title">{t.about.contactTitle}</h3>
            <motion.div
              className="about__links"
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
            >
              {links.map((link) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  target={link.href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  className="about__link"
                  variants={itemVariants}
                >
                  <span className="about__link-icon">
                    <i className={link.icon} />
                  </span>
                  {link.label}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
