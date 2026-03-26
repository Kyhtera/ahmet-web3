import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslation } from '@/src/context/LanguageContext';

const projects = [
  {
    name: 'Medical Website',
    tag: 'ASP.Net',
    img: '/assets/portfolio/uslum-saglik-project1.png',
    url: 'http://uslumsaglik.com/',
  },
  {
    name: 'Diyafoncu.com',
    tag: 'ASP.Net',
    img: '/assets/portfolio/diyafoncu-com-1.png',
    url: 'https://www.diafoncu.com.tr/',
  },
  {
    name: 'Gym Website',
    tag: 'WordPress',
    img: '/assets/portfolio/fithome-com-1.png',
    url: 'https://fithome.com.tr/',
  },
  {
    name: 'YouTube Channel',
    tag: 'music',
    img: '/assets/portfolio/youtube-thumb.jpg',
    url: 'https://www.youtube.com/@kyhtera',
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 35 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const { t } = useTranslation();

  return (
    <section id="projects" className="section">
      <div className="section__divider" />
      <div style={{ paddingTop: 'clamp(5rem, 10vw, 9rem)' }}>
        <motion.p
          className="section__label"
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {t.projects.label}
        </motion.p>
        <motion.h2
          className="section__title"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          {t.projects.title}
        </motion.h2>

        <motion.div
          className="projects__grid"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {projects.map((project) => (
            <motion.a
              key={project.name}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="project-card"
              variants={cardVariants}
            >
              <div className="project-card__img-wrap">
                <img
                  className="project-card__img"
                  src={project.img}
                  alt={project.name}
                />
              </div>
              <div className="project-card__body">
                <span className="project-card__name">{project.name}</span>
                <span className="project-card__tag">
                  {project.tag === 'music' ? t.projects.musicTag : project.tag}
                </span>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
