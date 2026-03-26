import Head from 'next/head';
import Header from '@/src/components/Header';
import Hero from '@/src/components/sections/Hero';
import Music from '@/src/components/sections/Music';
import Projects from '@/src/components/sections/Projects';
import Videos from '@/src/components/sections/Videos';
import Drawings from '@/src/components/sections/Drawings';
import BlogSection from '@/src/components/sections/BlogSection';
import About from '@/src/components/sections/About';

export default function Index({ posts }) {
  return (
    <>
      <Head>
        <title>KYTHERA — Ahmet USLU</title>
        <meta name="description" content="Ahmet USLU — Müzik, Kod, Video, Çizim." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Header />

      <main>
        <Hero />
        <Music />
        <Projects />
        <Videos />
        <Drawings />
        <BlogSection posts={posts} />
        <About />
      </main>

      <footer className="footer">
        <span className="footer__copy">© {new Date().getFullYear()} Ahmet USLU</span>
        <span className="footer__logo">KYT<span>HERA</span></span>
      </footer>
    </>
  );
}

export async function getStaticProps() {
  const { getSortedPostsData } = await import('../lib/posts');
  const posts = getSortedPostsData();
  return { props: { posts } };
}
