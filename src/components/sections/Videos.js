import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslation } from '@/src/context/LanguageContext';

const videos = [
  { id: 'gR3ANasUp9s', title: 'Kamatero Tepelerinde Bisiklet Turu | Petra Tiyatrosu', category: 'Bisiklet' },
  { id: 'cb1J9jNaoxA', title: 'Kuzen ile Blue Hole (Vouliagmeni) Dalış 4K', category: 'Dalış' },
  { id: 'IHxhZTNo1zc', title: 'Piraeus → Vouliagmeni Bisiklet + Scuba Dive', category: 'Bisiklet' },
  { id: 'TgDone6HczE', title: 'Cycling Piraeus → Faliro, Glyfada | Beach Ride', category: 'Bisiklet' },
  { id: 'QvhNFgzWvFU', title: 'Piraeus – Acropolis – Syntagma | Bike Tour', category: 'Bisiklet' },
  { id: 'F6o0_B6AN2g', title: 'Cycling Piraeus → Perama | Coastal Views', category: 'Bisiklet' },
  { id: 'UO7tlfna-WU', title: 'Cycling Piraeus → Glyfada | Coastal Route 4K', category: 'Bisiklet' },
  { id: 'YT1m-7RMOKg', title: 'Senin Yerin Yanım - Ahmet USLU (Kyhtera)', category: 'Müzik' },
  { id: 'PqDijVhebII', title: 'Son Bir Umut - Ahmet USLU', category: 'Müzik' },
  { id: 'UhCY5AdQKYc', title: 'Aykırı Yollarına - Ahmet USLU', category: 'Müzik' },
  { id: 'fDrQPv4Bq-o', title: 'Sensiz...', category: 'Müzik' },
  { id: 'hPMQOl82Z2o', title: 'Paramparça - Ahmet USLU', category: 'Müzik' },
  { id: '_IJA1nAUWgQ', title: 'Bir Göz Kırp', category: 'Müzik' },
  { id: 'kpIlwmbO3oY', title: 'Nasip Değilmiş', category: 'Müzik' },
  { id: 'uMt7CIzHz64', title: 'Hadi Kalk Gel - Ahmet USLU', category: 'Müzik' },
  { id: 'arIijmxPTTs', title: 'Armağan - Ahmet USLU', category: 'Müzik' },
  { id: 'q5sXS-Rl87E', title: 'Vur Kadehi Ustam - Ahmet USLU', category: 'Müzik' },
  { id: 'dFnAesQr4J0', title: 'Köfn - Bi Tek Ben Anlarım (Cover)', category: 'Cover' },
  { id: 'TMC9P8cS4fg', title: 'Mert Demir - Karakış (Cover)', category: 'Cover' },
  { id: 'zrbLlobulOg', title: 'Tan Taşçı - Söyleme (Cover)', category: 'Cover' },
  { id: 'CecAj8KeZPQ', title: 'Hande Yener - Kim Bilebilir Aşkı (Cover)', category: 'Cover' },
  { id: 'qYi-iKwzNbo', title: 'Sakince Yoruldum (Cover)', category: 'Cover' },
  { id: 'DPLQYlqhWwM', title: 'Harry Styles - Watermelon Sugar (Cover)', category: 'Cover' },
  { id: '1IP-FBBXzqg', title: 'Derya Uluğ - Kanunlar Gibi (Remix Cover)', category: 'Cover' },
  { id: '2g2G3lnbc_Y', title: 'Kahraman Deniz - Böyle Sever (Cover)', category: 'Cover' },
  { id: 'mJyiP5mTitI', title: 'Deeprise & Jabbar - Unuttum Derdimi (Cover)', category: 'Cover' },
  { id: 'ZDPGBJgJWlQ', title: 'Zeynep Bastık - Bana Sorma (Cover)', category: 'Cover' },
  { id: 'Zgi6ju-MD0w', title: 'Kerim - Yanıldım (Cover)', category: 'Cover' },
  { id: 'NZTqIrUBMnM', title: 'Gülden - Kıymetimi Bilen mi Var (Cover)', category: 'Cover' },
  { id: '7ItFpFSvZuc', title: 'Mustafa Ceceli - Dayanak (Cover)', category: 'Cover' },
  { id: 'zVlFZchJcio', title: 'Birkan Nasuhoğlu - Diken (Cover)', category: 'Cover' },
  { id: 'hTHpvp7yTUI', title: 'Uzunlar - Evdeki Saat (Cover)', category: 'Cover' },
  { id: 'W_OypiO1Nr8', title: 'Tuğkan - Kusura Bakma (Cover)', category: 'Cover' },
  { id: 'kHXd8sxUZsU', title: 'Emir Can İğrek - Nalan (Cover)', category: 'Cover' },
  { id: 'BWLQKPJ_r2E', title: 'Yüzyüzeyken Konuşuruz - Ne Fark Eder (Cover)', category: 'Cover' },
  { id: 'n3D59ovRltQ', title: 'Grup Vitamin - İstanbul\'da (Cover)', category: 'Cover' },
  { id: '8AqCsgfqH-s', title: 'Kenan Doğulu - Yazmışsa Bozmak Olmaz (Cover)', category: 'Cover' },
  { id: 'AL_G-31OtiQ', title: 'Can Ozan - Sar Bu Şehri (Cover)', category: 'Cover' },
  { id: 'cp4Vei4bP8I', title: 'Ka-Re - Yarala Meni (Cover) ft. Asya', category: 'Cover' },
  { id: 'OEzxLZJMqBA', title: 'Oğuzhan Koç - Aşk Dediğin (Cover)', category: 'Cover' },
  { id: 'nPG4SD1xiDs', title: 'Nil Karaibrahimgil - Bu Mudur (Cover) ft. Asya', category: 'Cover' },
  { id: 'keJM1DxczNA', title: 'La La Land Soundtrack (Acoustic Whistle Cover)', category: 'Cover' },
  { id: 'j5XnpzcafIo', title: 'Elif Bestehan - Hal Böyle Olunca (Cover)', category: 'Cover' },
  { id: 'hEBsAixw09Q', title: 'Müslüm Gürses - Sevda Yüklü Kervanlar (Cover)', category: 'Cover' },
  { id: 'D7FMG4FaUWg', title: 'Haktan - Bekleme Artık (Cover) #balkonşarkıları', category: 'Cover' },
  { id: 'jN5GXFlWYx0', title: 'Onurcan Özcan - Çıkmaz Sokak (Cover)', category: 'Cover' },
  { id: '0EbGrFQWMQQ', title: 'Duman - Bekle Dedi Gitti (Cover)', category: 'Cover' },
  { id: 'qBYrP5ZXx00', title: 'Nalan - Farzet (Cover)', category: 'Cover' },
  { id: '02VM08EDn9M', title: 'Onurcan Özcan - Çilingir (Cover)', category: 'Cover' },
  { id: 'czNt6fMXQ_g', title: 'Harun Kolçak - Korkuyorum (Cover)', category: 'Cover' },
  { id: 'DS_r-nioSJU', title: 'Serkan Kaya - Zor Bela (Cover)', category: 'Cover' },
  { id: 'Re7VWEOySAA', title: 'Gülşen - Seyre Dursun Aşk (Cover)', category: 'Cover' },
  { id: 'j5IJghe02TU', title: 'Sezen Aksu - Kolay Olmayacak (Cover)', category: 'Cover' },
  { id: 'xgJKL0oZCjU', title: 'Ebru Gündeş - Araftayım (Cover)', category: 'Cover' },
  { id: 'A5IvKyJ7q5s', title: 'Fettah Can - Kahpe Diller (Cover)', category: 'Cover' },
  { id: 'beXuxtwbW68', title: 'Yani (Cover)', category: 'Cover' },
  { id: 'uAiw3r6-q2g', title: 'Megadeth - Hangar 18 (Cover)', category: 'Cover' },
  { id: '95OUqV5-nNk', title: 'Zeynep Bastık #shorts', category: 'Shorts' },
  { id: '9ROB5NPNAYo', title: 'Stüdyo Çalışması', category: 'Stüdyo' },
];

// Döngüsel float konfigürasyonu
const floatBase = [
  { rotate: -2.5, delay: 0    },
  { rotate:  1.5, delay: 0.4  },
  { rotate: -1,   delay: 0.8  },
  { rotate:  2,   delay: 0.2  },
  { rotate: -1.8, delay: 0.6  },
  { rotate:  1,   delay: 1.0  },
];

const colOffsets = [0, 30, 15];

// Aktif gösterilecek video sayısı — daha fazlası için artır
const VISIBLE_COUNT = 6;

export default function Videos() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.05 });
  const { t } = useTranslation();

  const displayed = videos.slice(0, VISIBLE_COUNT);

  return (
    <section id="videos" className="section">
      <div className="section__divider" />
      <div style={{ paddingTop: 'clamp(5rem, 10vw, 9rem)' }}>
        <motion.p
          className="section__label"
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {t.videos.label}
        </motion.p>
        <motion.h2
          className="section__title"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          {t.videos.title}
        </motion.h2>

        <div className="videos__float-grid">
          {displayed.map((video, i) => {
            const col = i % 3;
            const cfg = floatBase[i % floatBase.length];

            return (
              <motion.a
                key={`${video.id}-${i}`}
                href={`https://www.youtube.com/watch?v=${video.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="video-float-card"
                style={{
                  marginTop: col === 0 ? 0 : colOffsets[col],
                  rotate: cfg.rotate,
                  animationDelay: `${cfg.delay}s`,
                }}
                initial={{ opacity: 0, y: 50, rotate: cfg.rotate - 3 }}
                animate={isInView ? { opacity: 1, y: 0, rotate: cfg.rotate } : {}}
                transition={{
                  duration: 0.9,
                  delay: 0.05 + i * 0.07,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{
                  y: -12,
                  rotate: 0,
                  scale: 1.03,
                  zIndex: 10,
                  transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
                }}
              >
                <div className="video-float-card__thumb-wrap">
                  <img
                    className="video-float-card__thumb"
                    src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                    alt={video.title}
                    loading="lazy"
                  />
                  <div className="video-float-card__overlay">
                    <div className="video-float-card__play-btn">
                      <svg viewBox="0 0 24 24" fill="white" width="18" height="18">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="video-float-card__info">
                  <span className="video-float-card__cat">{video.category}</span>
                  <p className="video-float-card__title">{video.title}</p>
                </div>
              </motion.a>
            );
          })}
        </div>

        <div className="videos__cta">
          <a
            href="https://www.youtube.com/@kyhtera"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
          >
            <i className="fa-brands fa-youtube" />
            {t.videos.allVideos(videos.length)}
          </a>
        </div>
      </div>
    </section>
  );
}
