import { getAllPostSlugs, getPostData } from '../../lib/posts';
import { remark } from 'remark';
import html from 'remark-html';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';

export async function getStaticPaths() {
  try {
    const paths = getAllPostSlugs();
    return { paths, fallback: false };
  } catch (error) {
    return { paths: [], fallback: false };
  }
}

export async function getStaticProps({ params }) {
  try {
    const post = getPostData(params.slug);
    const processed = await remark().use(html).process(post.content || '');
    const contentHtml = processed.toString();
    return { props: { postData: { ...post, contentHtml } }, revalidate: 60 };
  } catch (error) {
    return { notFound: true };
  }
}

export default function Post({ postData }) {
  return (
    <>
      <Head>
        <title>{postData.title} — KYTHERA</title>
        <meta name="description" content={postData.abstract || postData.title} />
      </Head>

      <motion.div
        className="post-page"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <Link href="/" className="post-page__back">
          <i className="fa-solid fa-arrow-left" />
          Ana Sayfa
        </Link>

        <div className="post-page__meta">
          {postData.category && (
            <span className="post-page__cat">{postData.category}</span>
          )}
          {postData.date && <span>{postData.date}</span>}
        </div>

        <h1 className="post-page__title">{postData.title}</h1>

        {postData.image && (
          <img
            className="post-page__cover"
            src={encodeURI(postData.image)}
            alt={postData.title}
          />
        )}

        <div
          className="post-page__content"
          dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
        />
      </motion.div>
    </>
  );
}
