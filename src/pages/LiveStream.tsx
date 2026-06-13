import React from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { SEO } from '../components/SEO';
import { AdsterraNativeBanner } from '../components/layout/AdBlock';
import { Radio } from 'lucide-react';

// ─── Stream sources (shared across all sports) ────────────────────────────────
const STREAMS = [
  { id: 'stream1', labelEn: 'Stream 1 — Main', labelAr: 'البث الرئيسي', labelFr: 'Flux 1 — Principal', src: 'https://z1.depoooo.com/albaplayer/bein-2/' },
  { id: 'stream2', labelEn: 'Stream 2', labelAr: 'البث 2', labelFr: 'Flux 2', src: 'https://z1.depoooo.com/albaplayer/bein-2/' },
  { id: 'stream3', labelEn: 'Stream 3', labelAr: 'البث 3', labelFr: 'Flux 3', src: 'https://z1.depoooo.com/albaplayer/bein-2/' },
  { id: 'stream4', labelEn: 'Stream 4', labelAr: 'البث 4', labelFr: 'Flux 4', src: 'https://z1.depoooo.com/albaplayer/bein-2/' },
  { id: 'stream5', labelEn: 'Stream 5', labelAr: 'البث 5', labelFr: 'Flux 5', src: 'https://z1.depoooo.com/albaplayer/bein-2/' },
  { id: 'stream6', labelEn: 'Stream 6', labelAr: 'البث 6', labelFr: 'Flux 6', src: 'https://z1.depoooo.com/albaplayer/bein-2/' },
  { id: 'stream7', labelEn: 'Stream HD', labelAr: 'بث HD', labelFr: 'Flux HD', src: 'https://z1.depoooo.com/albaplayer/bein-2/' },
  { id: 'stream8', labelEn: 'Stream 4K', labelAr: 'بث 4K', labelFr: 'Flux 4K', src: 'https://z1.depoooo.com/albaplayer/bein-2/' },
];

// ─── FIFA World Cup 2026 Matches ──────────────────────────────────────────────
const SPORTS = [
  {
    id: 'world-cup-finals',
    icon: '🏆',
    labelEn: 'Finals',
    labelAr: 'النهائي',
    labelFr: 'Finale',
    matchEn: 'FIFA World Cup 2026 Finals',
    matchAr: 'نهائي كأس العالم 2026',
    matchFr: 'Finale de la Coupe du Monde 2026',
  },
  {
    id: 'world-cup-semifinals',
    icon: '🥈',
    labelEn: 'Semifinals',
    labelAr: 'نصف النهائي',
    labelFr: 'Demi-finales',
    matchEn: 'FIFA World Cup 2026 Semifinals',
    matchAr: 'نصف نهائي كأس العالم 2026',
    matchFr: 'Demi-finales de la Coupe du Monde 2026',
  },
  {
    id: 'world-cup-quarterfinals',
    icon: '⚽',
    labelEn: 'Quarterfinals',
    labelAr: 'ربع النهائي',
    labelFr: 'Quarts de finale',
    matchEn: 'FIFA World Cup 2026 Quarterfinals',
    matchAr: 'ربع نهائي كأس العالم 2026',
    matchFr: 'Quarts de finale de la Coupe du Monde 2026',
  },
  {
    id: 'world-cup-round16',
    icon: '🎯',
    labelEn: 'Round of 16',
    labelAr: 'دور الـ 16',
    labelFr: 'Huitièmes de finale',
    matchEn: 'FIFA World Cup 2026 Round of 16',
    matchAr: 'دور الـ 16 من كأس العالم 2026',
    matchFr: 'Huitièmes de finale de la Coupe du Monde 2026',
  },
  {
    id: 'world-cup-group-stage',
    icon: '🌍',
    labelEn: 'Group Stage',
    labelAr: 'مرحلة المجموعات',
    labelFr: 'Phase de groupes',
    matchEn: 'FIFA World Cup 2026 Group Stage',
    matchAr: 'مرحلة المجموعات من كأس العالم 2026',
    matchFr: 'Phase de groupes de la Coupe du Monde 2026',
  },
  {
    id: 'world-cup-qualifiers',
    icon: '🔥',
    labelEn: 'Qualifiers',
    labelAr: 'التصفيات',
    labelFr: 'Qualifications',
    matchEn: 'FIFA World Cup 2026 Qualifiers',
    matchAr: 'تصفيات كأس العالم 2026',
    matchFr: 'Qualifications pour la Coupe du Monde 2026',
  },
];

export function LiveStream() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language?.slice(0, 2) ?? 'en';

  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const paramSport = params.sportId;

  const [activeSport, setActiveSport] = React.useState(() => {
    if (paramSport && SPORTS.some(s => s.id === paramSport)) return paramSport;
    return SPORTS[0].id;
  });
  const [activeStream, setActiveStream] = React.useState(STREAMS[0].id);

  const sport = SPORTS.find(s => s.id === activeSport) ?? SPORTS[0];
  const stream = STREAMS.find(s => s.id === activeStream) ?? STREAMS[0];

  const sportLabel = lang === 'ar' ? sport.labelAr : lang === 'fr' ? sport.labelFr : sport.labelEn;
  const matchLabel = lang === 'ar' ? sport.matchAr : lang === 'fr' ? sport.matchFr : sport.matchEn;
  const streamLabel = lang === 'ar' ? stream.labelAr : lang === 'fr' ? stream.labelFr : stream.labelEn;

  // Reset stream tab when sport changes
  const handleSportChange = (id: string) => {
    setActiveSport(id);
    setActiveStream(STREAMS[0].id);
    // Update URL to include selected sport (preserve language prefix if present)
    const pathParts = location.pathname.split('/').filter(Boolean);
    const supportedLangs = ['en', 'fr', 'ar'];
    const langPrefix = pathParts[0] && supportedLangs.includes(pathParts[0]) ? `/${pathParts[0]}` : '';
    navigate(`${langPrefix}/live-stream/${id}`);
  };

  // Keep state in sync if URL param changes (back/forward navigation)
  React.useEffect(() => {
    if (paramSport && SPORTS.some(s => s.id === paramSport) && paramSport !== activeSport) {
      setActiveSport(paramSport);
      setActiveStream(STREAMS[0].id);
    }
  }, [paramSport]);

  const currentUrl = (() => {
    const path = location.pathname;
    return `https://mediagrabber.com${path}`;
  })();

  const eventSchema = {
    '@context': 'https://schema.org',
    '@type': 'SportsEvent',
    name: sport.matchEn,
    alternateName: [sport.matchAr, sport.matchFr],
    sport: sport.labelEn,
    description: `Watch ${sport.matchEn} live stream free — ${sport.matchAr} بث مباشر مجاني — ${sport.matchFr} streaming gratuit`,
    url: currentUrl,
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://mediagrabber.com' },
      { '@type': 'ListItem', position: 2, name: 'Live Stream', item: currentUrl.split('?')[0] },
      { '@type': 'ListItem', position: 3, name: sport.labelEn },
    ],
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <SEO
        title={`${sport.labelEn} Live Stream — ${sport.matchEn} | MediaGrabber`}
        description={`Watch ${sport.matchEn} live stream free in HD. ${sport.matchAr} بث مباشر مجاني. ${sport.matchFr} streaming gratuit.`}
      />

      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          {t('stream.liveNow')}
        </div>
        <h1 className="text-3xl md:text-4xl font-bold font-heading text-gray-900 dark:text-white mb-2">
          {sport.icon} {matchLabel} — {t('stream.liveNow')}
        </h1>
        <p className="text-sm text-gray-400 dark:text-gray-500">
          {sport.matchEn} • {sport.matchAr} • {sport.matchFr}
        </p>
      </div>

      <AdsterraNativeBanner />

      {/* ── Sports category nav ─────────────────────────────────────────────── */}
      <nav
        className="mt-8 flex gap-2 overflow-x-auto pb-2 scrollbar-hide"
        aria-label="Sports categories"
      >
        {SPORTS.map((s) => {
          const label = lang === 'ar' ? s.labelAr : lang === 'fr' ? s.labelFr : s.labelEn;
          return (
            <button
              key={s.id}
              onClick={() => handleSportChange(s.id)}
              aria-pressed={activeSport === s.id}
              className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${activeSport === s.id
                ? 'bg-red-500 text-white shadow-md shadow-red-500/30'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-red-50 dark:hover:bg-gray-700 hover:text-red-600 dark:hover:text-red-400'
                }`}
            >
              <span>{s.icon}</span>
              <span>{label}</span>
            </button>
          );
        })}
      </nav>

      {/* ── Stream player card ──────────────────────────────────────────────── */}
      <div className="mt-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl overflow-hidden shadow-xl">

        {/* Toolbar */}
        <div className="flex items-center gap-2 px-5 py-3 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
          <Radio className="w-4 h-4 text-red-500 flex-shrink-0" />
          <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 truncate">
            {sport.icon} {matchLabel}
          </span>
          <span className="ml-auto text-xs text-gray-400 flex-shrink-0">{streamLabel}</span>
        </div>

        {/* Stream source tabs */}
        <div
          className="flex gap-2 overflow-x-auto px-4 py-3 border-b border-gray-100 dark:border-gray-800 scrollbar-hide"
          role="tablist"
          aria-label="Stream sources"
        >
          {STREAMS.map((s) => {
            const label = lang === 'ar' ? s.labelAr : lang === 'fr' ? s.labelFr : s.labelEn;
            return (
              <button
                key={s.id}
                role="tab"
                aria-selected={activeStream === s.id}
                aria-controls={`panel-${s.id}`}
                onClick={() => setActiveStream(s.id)}
                className={`flex-shrink-0 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${activeStream === s.id
                  ? 'bg-red-500 text-white shadow-md shadow-red-500/30'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-red-50 dark:hover:bg-gray-700 hover:text-red-600 dark:hover:text-red-400'
                  }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Player */}
        <div
          id={`panel-${stream.id}`}
          role="tabpanel"
          aria-label={`${sport.matchEn} ${stream.labelEn} live stream`}
        >
          <iframe
            key={`${activeSport}-${stream.src}`}
            src={stream.src}
            width="100%"
            height="520px"
            frameBorder="0"
            scrolling="yes"
            allowFullScreen
            title={`${sport.matchEn} — ${stream.labelEn} • ${sport.matchAr} • ${sport.matchFr}`}
            loading="lazy"
          />
        </div>

        {/* Under-player trilingual label */}
        <div className="px-5 py-3 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 text-center space-y-0.5">
          <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">{sport.matchEn} — Live Stream Free</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">{sport.matchAr} • بث مباشر مجاني</p>
          <p className="text-xs text-gray-400 dark:text-gray-500">{sport.matchFr} — Streaming en direct gratuit</p>
        </div>
      </div>

      <div className="mt-8">
        <AdsterraNativeBanner />
      </div>

      {/* ── SEO custom text block — replace content as needed ──────────────── */}
      <div className="mt-10 p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 prose dark:prose-invert prose-sm max-w-none">
        <h2>{t('stream.seoBlockTitle')}</h2>
        <p>{t('stream.seoBlockText')}</p>

        {/* ↓↓↓ ADD YOUR CUSTOM SEO TEXT HERE — replace "Hello World" below ↓↓↓ */}
        <h3>FIFA World Cup 2026 Live Streaming — Watch All Matches Free in HD</h3>
        <p>Watch FIFA World Cup for free in high quality, including football, basketball, and more from leagues around the world. Follow your favorite teams and never miss a match with our fast and reliable live streaming platform. From major competitions like the UEFA Champions League, Premier League, La Liga, and NBA, we bring you real-time access to the biggest sporting events. Stay updated with live scores, match schedules, and instant streaming links for today’s games. Whether you are a football fan or a basketball enthusiast, enjoy seamless streaming on desktop and mobile devices anytime, anywhere. Our platform aggregates live sports content and keeps you connected to global sports coverage, including channels like beIN Sports, known for broadcasting top-tier football leagues, international tournaments, and exclusive sports content. Experience the excitement of live matches with smooth playback and minimal buffering. Join thousands of sports fans who rely on our platform daily to watch live matches online for free. From kick-off to final whistle, enjoy uninterrupted sports streaming with a user-friendly interface and up-to-date match listings.</p>
        <br />  <br />  <br />
        <p>شاهد بث كأس العالم FIFA 2026 المباشر بجودة HD عالية من أي مكان في العالم. احصل على بث جميع المباريات بما في ذلك مرحلة المجموعات ودور الـ 16 والربع والنصف والنهائي. شاهد كل الأهداف واللحظات المثيرة من أكبر بطولة كرة قدم في العالم التي تقام في أمريكا الشمالية. سواء كنت تشاهد من الولايات المتحدة أو كندا أو المكسيك أو أي مكان آخر، توفر لك منصتنا الموثوقة بثاً مباشراً من كأس العالم 2026. تابع منتخبك المفضل وترتيب البطولة لحظة بلحظة، ولا تفوّت أي مباراة مع خدمة البث المباشر عالي الجودة. استمتع ببث سلس على أجهزة الكمبيوتر والهاتف المحمول مع خيارات جودة متعددة وتقليل التقطع. انضم إلى ملايين عشاق كرة القدم حول العالم الذين يثقون بمنصتنا للحصول على تغطية شاملة لكأس العالم.</p>
        <br />  <br />  <br />
        <p>Regardez des diffusions sportives en direct gratuitement en haute qualité, incluant le football, le basketball et bien plus encore, depuis des ligues du monde entier. Suivez vos équipes préférées et ne manquez jamais un match grâce à notre plateforme de streaming rapide et fiable. Des grandes compétitions comme la Ligue des Champions de l’UEFA, la Premier League, La Liga et la NBA, nous vous offrons un accès en temps réel aux plus grands événements sportifs.

          Restez informé avec les scores en direct, les calendriers des matchs et des liens de streaming instantanés pour les rencontres du jour. Que vous soyez fan de football ou passionné de basketball, profitez d’un streaming fluide sur ordinateur et mobile, à tout moment et où que vous soyez.

          Notre plateforme agrège du contenu sportif en direct et vous connecte à une couverture sportive mondiale, incluant des chaînes comme beIN Sports, reconnue pour diffuser les meilleurs championnats de football, les tournois internationaux et du contenu sportif exclusif. Vivez l’excitation des matchs en direct avec une lecture fluide et un minimum de mise en mémoire tampon.

          Rejoignez des milliers de fans de sport qui utilisent notre plateforme chaque jour pour regarder des matchs en direct gratuitement en ligne. Du coup d’envoi jusqu’au coup de sifflet final, profitez d’un streaming sportif sans interruption avec une interface conviviale et des listes de matchs constamment mises à jour.</p>
        {/* ↑↑↑ END CUSTOM SEO TEXT ↑↑↑ */}
      </div>

      {/* ── Crawlable all-sports + all-streams SEO list ─────────────────────── */}
      <div className="mt-6 p-6 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
        <h2 className="text-base font-bold font-heading text-gray-900 dark:text-white mb-4">
          {t('stream.seoBlockTitle')} — FIFA World Cup 2026 Tournament Stages • مراحل بطولة كأس العالم 2026 • Étapes de la Coupe du Monde FIFA 2026
        </h2>
        <ul className="space-y-3 text-xs text-gray-500 dark:text-gray-400 leading-6">
          {SPORTS.map((sp) => (
            <li key={sp.id}>
              <span className="font-semibold text-gray-700 dark:text-gray-300">
                {sp.icon} {sp.matchEn}
              </span>
              {' • '}
              <span>{sp.matchAr}</span>
              {' • '}
              <span>{sp.matchFr}</span>
              {' — '}
              <span className="text-red-500">
                live stream free • بث مباشر مجاني • streaming gratuit
              </span>
              <div className="mt-1 flex flex-wrap gap-x-3 gap-y-0.5 pl-4 text-gray-400 dark:text-gray-500">
                {STREAMS.map((s) => (
                  <span key={s.id}>{s.labelEn} • {s.labelAr} • {s.labelFr}</span>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
