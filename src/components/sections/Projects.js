import { useTranslation } from '@/src/context/LanguageContext';
import SectionHead from '@/src/components/SectionHead';

const projects = [
  { name: 'Medical Website', tag: 'ASP.Net', img: '/assets/portfolio/uslum-saglik-project1.png', url: 'http://uslumsaglik.com/' },
  { name: 'Diyafoncu.com', tag: 'ASP.Net', img: '/assets/portfolio/diyafoncu-com-1.png', url: 'https://www.diafoncu.com.tr/' },
  { name: 'Gym Website', tag: 'WordPress', img: '/assets/portfolio/fithome-com-1.png', url: 'https://fithome.com.tr/' },
  { name: 'YouTube Channel', tag: 'music', img: 'https://img.youtube.com/vi/YT1m-7RMOKg/hqdefault.jpg', yt: true, url: 'https://www.youtube.com/@kyhtera' },
];

const host = (u) => {
  try {
    return new URL(u).hostname.replace(/^www\./, '');
  } catch (e) {
    return u;
  }
};

export default function Projects({ idx }) {
  const { t } = useTranslation();

  return (
    <div className="projects">
      <SectionHead idx={idx} label={t.projects.label} title={t.projects.title} />

      <div className="projects__grid">
        {projects.map((p, i) => (
          <a key={p.name} href={p.url} target="_blank" rel="noopener noreferrer" className="pcard">
            <div className="pcard__frame">
              <div className="pcard__bar">
                <i />
                <i />
                <i />
                <span>{host(p.url)}</span>
              </div>
              <div className={`pcard__img${p.yt ? ' pcard__img--yt' : ''}`}>
                {p.img ? (
                  <img src={p.img} alt={p.name} loading="lazy" />
                ) : (
                  <div className="pcard__ph"><i className="fa-brands fa-youtube" /></div>
                )}
                {p.yt && (
                  <span className="pcard__play">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
                  </span>
                )}
              </div>
            </div>
            <div className="pcard__body">
              <span className="pcard__num">{String(i + 1).padStart(2, '0')}</span>
              <span className="pcard__name">{p.name}</span>
              <span className="pcard__tag">{p.tag === 'music' ? t.projects.musicTag : p.tag}</span>
              <i className="fa-solid fa-arrow-up-right-from-square pcard__arrow" />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
