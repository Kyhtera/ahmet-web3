import { useTranslation } from '@/src/context/LanguageContext';
import SectionHead from '@/src/components/SectionHead';

const skills = [
  'Next.js', 'React', 'AI', 'Node.js', 'Solidity', 'JavaScript',
  'HTML5 / CSS3', 'WordPress', 'ASP.Net', 'Photoshop', 'Logic Pro X',
];

const links = [
  { label: 'instagram.com/kyhtera', icon: 'fa-brands fa-instagram', href: 'https://www.instagram.com/kyhtera/' },
  { label: '@maykilcifoks', icon: 'fa-brands fa-x-twitter', href: 'https://x.com/maykilcifoks' },
  { label: 'github.com/Kyhtera', icon: 'fa-brands fa-github', href: 'https://github.com/Kyhtera' },
  { label: 'youtube.com/@kyhtera', icon: 'fa-brands fa-youtube', href: 'https://www.youtube.com/@kyhtera' },
  { label: 'medium.com/@Kyhtera', icon: 'fa-brands fa-medium', href: 'https://medium.com/@Kyhtera' },
  { label: 'substack.com/@ahmetuslu', icon: 'fa-solid fa-newspaper', href: 'https://substack.com/@ahmetuslu' },
  { label: 'ahmetuslum@gmail.com', icon: 'fa-regular fa-envelope', href: 'mailto:ahmetuslum@gmail.com' },
];

export default function About({ idx }) {
  const { t } = useTranslation();

  return (
    <div className="about">
      <SectionHead idx={idx} label={t.about.label} title={t.about.title} />

      <div className="about__body">
        <div>
          <p className="about__bio">{t.about.bio}</p>
          <div className="about__skills">
            {skills.map((s) => (
              <span key={s}>{s}</span>
            ))}
          </div>
        </div>

        <div className="about__contact">
          <h3>{t.about.contactTitle}</h3>
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              target={l.href.startsWith('mailto') ? undefined : '_blank'}
              rel="noopener noreferrer"
            >
              <i className={l.icon} />
              <span>{l.label}</span>
              <em>↗</em>
            </a>
          ))}
        </div>
      </div>

      <div className="about__foot">
        <span>© {new Date().getFullYear()} Ahmet USLU</span>
        <span>KYTHERA</span>
      </div>
    </div>
  );
}
