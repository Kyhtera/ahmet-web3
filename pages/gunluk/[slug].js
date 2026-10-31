import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useTranslation } from '@/src/context/LanguageContext';
import { fmtDate } from '@/src/utils/date';

export async function getStaticPaths() {
  const { getJournalSlugs } = await import('../../lib/journal');
  return { paths: getJournalSlugs(), fallback: false };
}

export async function getStaticProps({ params }) {
  const { getJournalPost } = await import('../../lib/journal');
  const post = await getJournalPost(params.slug);
  if (!post) return { notFound: true };
  return { props: { post } };
}

export default function JournalPost({ post }) {
  const { t, lang } = useTranslation();

  return (
    <>
      <Head>
        <title>{`${post.title} — KYTHERA`}</title>
        <meta name="description" content={post.excerpt} />
      </Head>

      <motion.div
        className="post-page journal-post"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <Link href="/gunluk" className="post-page__back">
          <i className="fa-solid fa-arrow-left" />
          {t.journal.all_posts}
        </Link>

        <div className="post-page__meta">
          <span className="post-page__cat">{t.journal.title}</span>
          <span>{fmtDate(post.date, lang)}</span>
        </div>

        <h1 className="post-page__title">{post.title}</h1>

        <div className="post-page__content" dangerouslySetInnerHTML={{ __html: post.contentHtml }} />

        <nav className="jnav">
          {post.newer ? (
            <Link href={`/gunluk/${post.newer.slug}`} className="jnav__item">
              <small>← {t.journal.newer}</small>
              <span>{post.newer.title}</span>
            </Link>
          ) : <span />}
          {post.older ? (
            <Link href={`/gunluk/${post.older.slug}`} className="jnav__item jnav__item--right">
              <small>{t.journal.older} →</small>
              <span>{post.older.title}</span>
            </Link>
          ) : <span />}
        </nav>
      </motion.div>
    </>
  );
}
