import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Send, MessageCircle, Users } from 'lucide-react';
import { SEO } from '../components/SEO';
import { AdsterraNativeBanner } from '../components/layout/AdBlock';

interface Message {
  id: string;
  user: string;
  text: string;
  time: string;
  self: boolean;
}

// ─── All users ────────────────────────────────────────────────────────────────
const USERS = [
  'Daliida', 'Sara_22', 'Karim', 'Nour', 'Yasmine',
  'Mehdi', 'Lina', 'Amine', 'Rania', 'Sofiane',
  'Fatima', 'Omar_DZ', 'Leila', 'Youssef', 'Mariam',
  'Hamza', 'Inès', 'Tarek', 'Sana', 'Bilal',
];

// ─── Giant multilingual message pool (mixed randomly) ─────────────────────────
const ALL_MESSAGES: { user: string; text: string }[] = [
  // English
  { user: 'Daliida', text: 'Hey everyone! 👋 Welcome to the chat!' },
  { user: 'Sara_22', text: 'Hi! Anyone watching the match tonight? ⚽' },
  { user: 'Karim', text: 'beIN Sports 1 has a great game on right now 🔴' },
  { user: 'Daliida', text: 'I just downloaded the highlights using MediaGrabber 😍' },
  { user: 'Nour', text: 'How do you download TikTok videos without watermark?' },
  { user: 'Yasmine', text: 'Just paste the link on MediaGrabber, super easy!' },
  { user: 'Mehdi', text: 'Works for Instagram Reels too 🙌' },
  { user: 'Daliida', text: 'YouTube, Twitter, Facebook... all platforms supported!' },
  { user: 'Lina', text: 'This site is amazing 💯' },
  { user: 'Amine', text: 'Who else is here for the live stream? 🏆' },
  { user: 'Rania', text: 'PSG game starts in 10 minutes! 🔥' },
  { user: 'Sofiane', text: 'Can you download YouTube Shorts too?' },
  { user: 'Daliida', text: 'Yes! YouTube Shorts, Reels, TikToks — all of them 🎬' },
  { user: 'Fatima', text: 'I love this chat, so friendly here 💕' },
  { user: 'Omar_DZ', text: 'Algeria vs Morocco tonight, who wins? 🇩🇿🇲🇦' },
  { user: 'Leila', text: 'Just tried MediaGrabber for the first time, works perfectly!' },
  { user: 'Youssef', text: 'Does it work on mobile too?' },
  { user: 'Daliida', text: 'Yes, works on iPhone and Android 📱' },
  { user: 'Mariam', text: 'The stream quality is so good today 🎉' },
  { user: 'Hamza', text: 'Anyone know the score? I missed the first half 😅' },
  { user: 'Inès', text: 'GOAL!!! 🥅⚽🎊' },
  { user: 'Tarek', text: 'What a save by the goalkeeper! 🧤' },
  { user: 'Sana', text: 'I downloaded 10 videos today with MediaGrabber lol 😂' },
  { user: 'Bilal', text: 'Best free downloader I have ever used 👌' },
  { user: 'Daliida', text: 'Share the link with your friends! 🔗' },

  // French
  { user: 'Daliida', text: 'Salut tout le monde! 👋 Bienvenue dans le chat!' },
  { user: 'Sara_22', text: 'Quelqu\'un regarde le match ce soir? ⚽' },
  { user: 'Karim', text: 'beIN Sports 1 diffuse un super match 🔴' },
  { user: 'Nour', text: 'Comment télécharger des vidéos TikTok sans filigrane?' },
  { user: 'Yasmine', text: 'Colle le lien sur MediaGrabber, c\'est super simple!' },
  { user: 'Mehdi', text: 'Ça marche aussi pour les Reels Instagram 🙌' },
  { user: 'Daliida', text: 'Et YouTube, Twitter, Facebook... toutes les plateformes!' },
  { user: 'Lina', text: 'Ce site est incroyable 💯' },
  { user: 'Amine', text: 'Qui est là pour le live stream? 🏆' },
  { user: 'Rania', text: 'Le match du PSG commence dans 10 minutes! 🔥' },
  { user: 'Sofiane', text: 'On peut télécharger les YouTube Shorts aussi?' },
  { user: 'Daliida', text: 'Oui! Shorts, Reels, TikToks — tout est supporté 🎬' },
  { user: 'Fatima', text: 'J\'adore ce chat, tout le monde est sympa 💕' },
  { user: 'Leila', text: 'J\'ai essayé MediaGrabber pour la première fois, parfait!' },
  { user: 'Youssef', text: 'Ça marche sur mobile aussi?' },
  { user: 'Daliida', text: 'Oui, iPhone et Android 📱' },
  { user: 'Mariam', text: 'La qualité du stream est excellente aujourd\'hui 🎉' },
  { user: 'Hamza', text: 'Quelqu\'un connaît le score? J\'ai raté la première mi-temps 😅' },
  { user: 'Inès', text: 'BUUUT!!! 🥅⚽🎊' },
  { user: 'Tarek', text: 'Quel arrêt du gardien! 🧤' },
  { user: 'Sana', text: 'J\'ai téléchargé 10 vidéos aujourd\'hui avec MediaGrabber lol 😂' },
  { user: 'Bilal', text: 'Meilleur téléchargeur gratuit que j\'ai jamais utilisé 👌' },
  { user: 'Daliida', text: 'Partagez le lien avec vos amis! 🔗' },
  { user: 'Omar_DZ', text: 'Allez l\'Algérie! 🇩🇿🔥' },

  // Arabic
  { user: 'Daliida', text: 'مرحباً بالجميع! 👋 أهلاً بكم في الدردشة!' },
  { user: 'Sara_22', text: 'مرحباً! هل أحد يشاهد المباراة الليلة؟ ⚽' },
  { user: 'Karim', text: 'beIN Sports 1 تبث مباراة رائعة الآن 🔴' },
  { user: 'Daliida', text: 'لقد حملت أبرز اللحظات باستخدام MediaGrabber 😍' },
  { user: 'Nour', text: 'كيف أحمل فيديوهات تيك توك بدون علامة مائية؟' },
  { user: 'Yasmine', text: 'فقط الصق الرابط في MediaGrabber، سهل جداً!' },
  { user: 'Mehdi', text: 'يعمل أيضاً مع Instagram Reels 🙌' },
  { user: 'Daliida', text: 'يوتيوب وتويتر وفيسبوك... كل المنصات مدعومة!' },
  { user: 'Lina', text: 'هذا الموقع رائع جداً 💯' },
  { user: 'Amine', text: 'من هنا للبث المباشر؟ 🏆' },
  { user: 'Rania', text: 'مباراة PSG تبدأ بعد 10 دقائق! 🔥' },
  { user: 'Sofiane', text: 'هل يمكن تحميل YouTube Shorts أيضاً؟' },
  { user: 'Daliida', text: 'نعم! Shorts وReels وTikToks — كلها مدعومة 🎬' },
  { user: 'Fatima', text: 'أحب هذه الدردشة، الجميع ودود هنا 💕' },
  { user: 'Omar_DZ', text: 'الجزائر والمغرب الليلة، من سيفوز؟ 🇩🇿🇲🇦' },
  { user: 'Leila', text: 'جربت MediaGrabber لأول مرة، يعمل بشكل مثالي!' },
  { user: 'Youssef', text: 'هل يعمل على الهاتف أيضاً؟' },
  { user: 'Daliida', text: 'نعم، يعمل على iPhone وAndroid 📱' },
  { user: 'Mariam', text: 'جودة البث رائعة اليوم 🎉' },
  { user: 'Hamza', text: 'هل أحد يعرف النتيجة؟ فاتني الشوط الأول 😅' },
  { user: 'Inès', text: 'هدددف!!! 🥅⚽🎊' },
  { user: 'Tarek', text: 'يا له من تصدٍّ رائع من الحارس! 🧤' },
  { user: 'Sana', text: 'حملت 10 فيديوهات اليوم مع MediaGrabber 😂' },
  { user: 'Bilal', text: 'أفضل أداة تحميل مجانية استخدمتها 👌' },
  { user: 'Daliida', text: 'شاركوا الرابط مع أصدقائكم! 🔗' },
  { user: 'Omar_DZ', text: 'يلا الجزائر! 🇩🇿🔥' },

  // Mixed / multilingual bursts
  { user: 'Daliida', text: 'Hola! Bienvenidos 🌍 مرحبا! Bienvenue!' },
  { user: 'Sara_22', text: 'Forza! ⚽ Allez! يلا!' },
  { user: 'Karim', text: '🔥🔥🔥 GOAT match tonight!' },
  { user: 'Rania', text: 'واو 😱 Incroyable! What a game!' },
  { user: 'Sofiane', text: 'MediaGrabber = 🐐 best tool ever / meilleur outil / أفضل أداة' },
  { user: 'Daliida', text: '💬 Keep chatting, I\'m here all night! / Je suis là toute la nuit! / أنا هنا طوال الليل!' },
  { user: 'Leila', text: 'Merci Daliida 💕 شكراً دليدة 💕 Thanks Daliida 💕' },
  { user: 'Youssef', text: 'Anyone from Algeria? 🇩🇿 من الجزائر؟ Quelqu\'un d\'Algérie?' },
  { user: 'Mariam', text: 'Morocco 🇲🇦 represent! المغرب 🇲🇦' },
  { user: 'Hamza', text: 'Tunisia 🇹🇳 in the house! تونس 🇹🇳' },
  { user: 'Inès', text: 'France 🇫🇷 ici! فرنسا 🇫🇷' },
  { user: 'Daliida', text: 'We are all one community here 🌍❤️ كلنا مجتمع واحد هنا' },
];

function getTime() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function generateUsername() {
  const adjectives = ['Cool', 'Fast', 'Happy', 'Smart', 'Bold', 'Chill', 'Epic', 'Wild'];
  const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const num = Math.floor(Math.random() * 900) + 100;
  return `${adj}User${num}`;
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Shuffle and take first N items for initial seed
function seededMessages(count = 12): Message[] {
  const shuffled = [...ALL_MESSAGES].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count).map((m, i) => ({
    id: `seed-${i}`,
    user: m.user,
    text: m.text,
    time: getTime(),
    self: false,
  }));
}

export function LiveChat() {
  const { t } = useTranslation();
  const [username] = useState(generateUsername);
  const [messages, setMessages] = useState<Message[]>(seededMessages);
  const [input, setInput] = useState('');
  const [onlineCount] = useState(() => Math.floor(Math.random() * 120) + 60);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Random message drops every 4–9 seconds
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    function scheduleNext() {
      const delay = Math.floor(Math.random() * 5000) + 4000;
      timeout = setTimeout(() => {
        const msg = pick(ALL_MESSAGES);
        setMessages(prev => [...prev.slice(-60), {
          id: crypto.randomUUID(),
          user: msg.user,
          text: msg.text,
          time: getTime(),
          self: false,
        }]);
        scheduleNext();
      }, delay);
    }

    scheduleNext();
    return () => clearTimeout(timeout);
  }, []);

  const send = () => {
    const text = input.trim();
    if (!text) return;

    setMessages(prev => [...prev, {
      id: crypto.randomUUID(),
      user: username,
      text,
      time: getTime(),
      self: true,
    }]);
    setInput('');

    // Daliida replies after 1.2–2.5s
    const delay = Math.floor(Math.random() * 1300) + 1200;
    setTimeout(() => {
      const replies = [
        'Nice! 😊', 'Exactly! 👍', 'Good point!', 'Try MediaGrabber 🎬',
        'Totally agree! 🙌', 'Super! 😊', 'Exactement! 👍', 'Bonne question!',
        'رائع! 😊', 'بالضبط! 👍', 'سؤال جيد!', 'جرب MediaGrabber 🎬',
        'Love it! ❤️', 'Haha 😂', 'Oui oui! 🇫🇷', 'يلا! 🔥',
        'Welcome to the chat! 👋', 'Bienvenue! 👋', 'أهلاً وسهلاً! 👋',
      ];
      setMessages(prev => [...prev, {
        id: crypto.randomUUID(),
        user: 'Daliida',
        text: pick(replies),
        time: getTime(),
        self: false,
      }]);
    }, delay);
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <SEO title={t('chat.seoTitle')} description={t('chat.seoDescription')} />

      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-brand-50 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 px-4 py-1.5 rounded-full text-sm font-medium mb-4">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          {t('chat.liveNow')}
        </div>
        <h1 className="text-3xl md:text-4xl font-bold font-heading text-gray-900 dark:text-white mb-3">
          {t('chat.title')}
        </h1>
        <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
          {t('chat.subtitle')}
        </p>
      </div>

      <AdsterraNativeBanner />
      {/* Live stream banner */}
      <div className="mb-6 rounded-2xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-800 bg-black">
        <div className="px-4 py-2 text-xs font-medium text-white bg-red-600 flex items-center justify-between">
          <span>🔴 STREAM </span>
          <span className="animate-pulse">LIVE</span>
        </div>

        <video
          src="https://i.makeagif.com/media/12-10-2017/TgxW1Z.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-auto max-h-[320px] object-cover"
        />
      </div>
      {/* Chat box */}
      <div className="mt-8 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl overflow-hidden shadow-xl">

        {/* Toolbar */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
          <div className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            <MessageCircle className="w-4 h-4 text-brand-500" />
            {t('chat.communityChat')}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-green-600 dark:text-green-400 font-medium">
            <Users className="w-3.5 h-3.5" />
            {onlineCount} {t('chat.online')}
          </div>
        </div>

        {/* Username badge */}
        <div className="px-5 py-2 bg-brand-50 dark:bg-brand-900/20 border-b border-brand-100 dark:border-brand-900/30 text-xs text-brand-700 dark:text-brand-400">
          {t('chat.youAre')} <strong>{username}</strong>
        </div>

        {/* Messages */}
        <div className="h-[460px] overflow-y-auto px-5 py-4 space-y-3 scroll-smooth">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex gap-3 ${msg.self ? 'flex-row-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold text-white
                ${msg.user === 'Daliida' ? 'bg-pink-500' : msg.self ? 'bg-brand-500' : 'bg-gray-400 dark:bg-gray-600'}`}>
                {msg.user[0].toUpperCase()}
              </div>
              <div className={`max-w-[75%] flex flex-col gap-0.5 ${msg.self ? 'items-end' : 'items-start'}`}>
                <span className={`text-xs font-semibold
                  ${msg.user === 'Daliida' ? 'text-pink-500' : msg.self ? 'text-brand-600 dark:text-brand-400' : 'text-gray-500 dark:text-gray-400'}`}>
                  {msg.self ? t('chat.you') : msg.user}
                </span>
                <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${msg.self
                    ? 'bg-brand-500 text-white rounded-tr-sm'
                    : msg.user === 'Daliida'
                      ? 'bg-pink-50 dark:bg-pink-900/20 text-gray-800 dark:text-gray-200 border border-pink-100 dark:border-pink-900/30 rounded-tl-sm'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-tl-sm'
                  }`}>
                  {msg.text}
                </div>
                <span className="text-[10px] text-gray-400">{msg.time}</span>
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="px-4 py-3 border-t border-gray-100 dark:border-gray-800 flex gap-3 items-center">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder={t('chat.inputPlaceholder')}
            maxLength={300}
            className="flex-1 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500 transition"
          />
          <button
            onClick={send}
            disabled={!input.trim()}
            className="p-2.5 bg-brand-500 hover:bg-brand-600 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-xl transition-all active:scale-95"
            aria-label={t('chat.send')}
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="mt-8">
        <AdsterraNativeBanner />
      </div>

      <div className="mt-10 p-6 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-400 leading-7">
        <h2 className="text-lg font-bold font-heading text-gray-900 dark:text-white mb-3">
          {t('chat.seoBlockTitle')}
        </h2>
        <p>{t('chat.seoBlockText')}</p>
      </div>
    </div>
  );
}
