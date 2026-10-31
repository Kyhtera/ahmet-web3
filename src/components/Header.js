import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '@/src/context/LanguageContext';

const ids = ['music', 'projects', 'videos', 'drawings', 'blog', 'journal', 'about'];

export default function Header({ active, tone, onNav }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { lang, toggleLang, t } = useTranslation();

  const go = (id) => {
    setMenuOpen(false);
    onNav(id);
  };

  return (
    <>
      <motion.header
        className="header"
        data-tone={tone}
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <a
          href="#hero"
          className="header__logo"
          onClick={(e) => {
            e.preventDefault();
            go('hero');
          }}
        >
          KYTHERA
        </a>

        <nav className="header__nav">
          {ids.map((id, i) => (
            <a
              key={id}
              href={`#${id}`}
              className={active === i + 1 ? 'is-active' : ''}
              onClick={(e) => {
                e.preventDefault();
                go(id);
              }}
            >
              {t.nav[i]}
            </a>
          ))}
        </nav>

        <div className="header__right">
          <button className="header__lang" onClick={toggleLang} aria-label="Dil değiştir">
            <span className={lang === 'tr' ? 'on' : ''}>TR</span>
            <span>/</span>
            <span className={lang === 'en' ? 'on' : ''}>EN</span>
          </button>
          <button
            className={`header__burger${menuOpen ? ' open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menü"
          >
            <span />
            <span />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {ids.map((id, i) => (
              <motion.a
                key={id}
                href={`#${id}`}
                onClick={(e) => {
                  e.preventDefault();
                  go(id);
                }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.06, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <small>{String(i + 1).padStart(2, '0')}</small>
                {t.nav[i]}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
