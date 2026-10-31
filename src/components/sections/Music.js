import { motion } from 'framer-motion';
import { useTranslation } from '@/src/context/LanguageContext';
import SectionHead from '@/src/components/SectionHead';

const tracks = [
  'Odamda (Akustik)',
  'Terkedilmiş',
  'Yalın Taş',
  'Virane Gönlüm',
  'Vestiyer',
  'Son Bir Umut',
  'En Sevdiğim Oyundun',
  'Eskimiş Aşklar',
  'Benim Yerim Yanın Şimdilik',
];

// Kendi platform linklerini buraya ekle
const platforms = [
  { name: 'Spotify', icon: 'fa-brands fa-spotify', href: '#' },
  { name: 'Apple Music', icon: 'fa-brands fa-apple', href: '#' },
  { name: 'YouTube Music', icon: 'fa-brands fa-youtube', href: 'https://www.youtube.com/@kyhtera' },
  { name: 'Deezer', icon: 'fa-solid fa-music', href: '#' },
];

export default function Music({ idx }) {
  const { t } = useTranslation();

  return (
    <div className="music">
      <SectionHead idx={idx} label={t.music.label} title={t.music.title} />

      <div className="music__body">
        <div className="music__cover-wrap">
          <div className="music__vinyl" />
          <img className="music__cover" src="/assets/music/album-cover.png" alt="Ahmet USLU - İlk ve Son Albüm" />
        </div>

        <div className="music__info">
          <h3 className="music__album">İlk ve Son Albüm</h3>
          <p className="music__artist">Ahmet USLU</p>

          <ol className="music__tracks">
            {tracks.map((track, i) => (
              <li key={track}>
                <span>{String(i + 1).padStart(2, '0')}</span>
                {track}
              </li>
            ))}
          </ol>

          <div className="music__platforms">
            {platforms.map((p) => (
              <motion.a
                key={p.name}
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="pill"
                whileHover={{ y: -3 }}
              >
                <i className={p.icon} />
                {p.name}
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
