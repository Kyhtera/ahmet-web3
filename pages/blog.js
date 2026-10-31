import Head from 'next/head';
import Link from 'next/link';
import { useTranslation } from '@/src/context/LanguageContext';
import SectionHead from '@/src/components/SectionHead';

export default function BlogIndex({ posts }) {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>Blog — KYTHERA</title>
        <meta name="description" content="Ahmet USLU — yazılar." />
      </Head>

      <div className="blog-index">
        <Link href="/" className="post-page__back">
          <i className="fa-solid fa-arrow-left" />
          {t.blog.back}
        </Link>

        <SectionHead idx={5} label={t.blog.label} title={t.blog.title} />

        <div className="blog-index__grid">
          {posts.map((post) => (
            <Link key={post.slug} href={`/posts/${post.slug}`} className="bcard">
              {post.image && (
                <div className="bcard__img">
                  <img src={encodeURI(post.image)} alt={post.title} loading="lazy" />
                </div>
              )}
              <div className="bcard__body">
                <div className="bcard__meta">
                  {post.category && <span>{post.category}</span>}
                  {post.date && <span>{post.date}</span>}
                </div>
                <h3 className="bcard__title">{post.title}</h3>
                {post.abstract && <p className="bcard__excerpt">{post.abstract}</p>}
                <span className="bcard__link">
                  {t.blog.readMore} <i className="fa-solid fa-arrow-right" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="blog-index__links">
          <a href="https://medium.com/@Kyhtera" target="_blank" rel="noopener noreferrer" className="pill">
            <i className="fa-brands fa-medium" /> Medium
          </a>
          <a href="https://substack.com/@ahmetuslu" target="_blank" rel="noopener noreferrer" className="pill">
            <i className="fa-solid fa-newspaper" /> Substack
          </a>
        </div>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const { getSortedPostsData } = await import('../lib/posts');
  return { props: { posts: getSortedPostsData() } };
}
