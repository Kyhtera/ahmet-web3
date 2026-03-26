import { useEffect } from 'react';
import '@/styles/globals.css';
import { LanguageProvider } from '@/src/context/LanguageContext';

export default function App({ Component, pageProps }) {
  useEffect(() => {
    let lenis;

    import('lenis').then(({ default: Lenis }) => {
      lenis = new Lenis({
        duration: 1.3,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothTouch: false,
      });

      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }

      requestAnimationFrame(raf);
    });

    return () => {
      if (lenis) lenis.destroy();
    };
  }, []);

  return (
    <LanguageProvider>
      <Component {...pageProps} />
    </LanguageProvider>
  );
}
