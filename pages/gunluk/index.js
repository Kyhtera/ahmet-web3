import Head from 'next/head';
import Link from 'next/link';
import { useTranslation } from '@/src/context/LanguageContext';
import SectionHead from '@/src/components/SectionHead';
import { fmtDate } from '@/src/utils/date';

export default function JournalIndex({ posts }) {
  const { t, lang } = useTranslation();

  const years = [];
  posts.forEach((p) => {
    const y = p.date.slice(0, 4);
    let g = years.find((x) => x.year === y);
    if (!g) years.push((g = { year: y, items: [] }));
    g.items.push(p);
  });

  return (
    <>
      <Head>
        <title>Günlük — KYTHERA</title>
        <meta name="description" content="Ahmet USLU — 2013–2015 arası kişisel günlük yazıları." />
      </Head>

      <div className="jarchive">
        <Link href="/" className="post-page__back">
          <i className="fa-solid fa-arrow-left" />
          {t.journal.back}
        </Link>

        <SectionHead idx={6} label={t.journal.label} title={t.journal.title} />
        <p className="jarchive__intro">{t.journal.intro}</p>

        {years.map((g) => (
          <section key={g.year} className="jyear">
            <h2 className="jyear__label">{g.year}</h2>
            <ul>
              {g.items.map((p) => (
                <li key={p.slug}>
                  <Link href={`/gunluk/${p.slug}`} className="jrow">
                    <span className="jrow__date">{fmtDate(p.date, lang)}</span>
                    <span className="jrow__title">{p.title}</span>
                    <span className="jrow__ex">{p.excerpt}</span>
                    <i className="fa-solid fa-arrow-right jrow__arrow" />
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}

        <div className="jarchive__foot">
          <a href="https://ahmetuslum.tumblr.com/" target="_blank" rel="noopener noreferrer" className="pill">
            <i className="fa-brands fa-tumblr" /> {t.journal.original}
          </a>
        </div>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const { getJournalPosts } = await import('../../lib/journal');
  return { props: { posts: getJournalPosts() } };
}
