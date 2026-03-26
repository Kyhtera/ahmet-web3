import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { useTranslation } from '@/src/context/LanguageContext';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 35 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export default function BlogSection({ posts = [] }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const { t } = useTranslation();

  return (
    <section id="blog" className="section">
      <div className="section__divider" />
      <div style={{ paddingTop: 'clamp(5rem, 10vw, 9rem)' }}>
        <motion.p
          className="section__label"
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {t.blog.label}
        </motion.p>
        <motion.h2
          className="section__title"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          {t.blog.title}
        </motion.h2>

        <motion.div
          className="blog__grid"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {posts.map((post) => (
            <motion.div key={post.slug} variants={cardVariants}>
              <Link href={`/posts/${post.slug}`} className="blog-card">
                {post.image && (
                  <div className="blog-card__img-wrap">
                    <img
                      className="blog-card__img"
                      src={encodeURI(post.image)}
                      alt={post.title}
                      loading="lazy"
                    />
                  </div>
                )}
                <div className="blog-card__body">
                  <div className="blog-card__meta">
                    {post.category && <span className="blog-card__cat">{post.category}</span>}
                    {post.date && <span className="blog-card__date">{post.date}</span>}
                  </div>
                  <h3 className="blog-card__title">{post.title}</h3>
                  {post.abstract && (
                    <p className="blog-card__excerpt">{post.abstract}</p>
                  )}
                  <span className="blog-card__link">
                    {t.blog.readMore} <i className="fa-solid fa-arrow-right" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
