import Head from 'next/head';
import Stage from '@/src/components/Stage';

export default function Index({ posts, journal }) {
  return (
    <>
      <Head>
        <title>KYTHERA — Ahmet USLU</title>
        <meta name="description" content="Ahmet USLU — Müzik, Kod, Video, Çizim." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Stage posts={posts} journal={journal} />
    </>
  );
}

export async function getStaticProps() {
  const { getSortedPostsData } = await import('../lib/posts');
  const { getJournalPreview } = await import('../lib/journal');
  const posts = getSortedPostsData();
  return { props: { posts, journal: getJournalPreview(6) } };
}
