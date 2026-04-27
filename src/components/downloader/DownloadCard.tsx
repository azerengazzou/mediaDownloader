import { useState } from 'react';
import { Download, Video, Music, Image as ImageIcon, PlayCircle } from 'lucide-react';
import { DownloadResult, DownloadOption } from '../../hooks/useDownloader';
import { cn } from '../../lib/utils';
import { PLATFORM_ICONS } from './HistoryList';
import { useAnalytics } from '../../hooks/useAnalytics';
import { DownloadModal } from './DownloadModal';

interface DownloadCardProps {
  result: DownloadResult;
  onDownload: (option: DownloadOption) => void;
}

export function DownloadCard({ result, onDownload }: DownloadCardProps) {
  const { trackDownloadClick } = useAnalytics();
  const [activeOption, setActiveOption] = useState<DownloadOption | null>(null);

  const getIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="w-4 h-4" />;
      case 'audio': return <Music className="w-4 h-4" />;
      case 'thumbnail': return <ImageIcon className="w-4 h-4" />;
      default: return <Download className="w-4 h-4" />;
    }
  };

  const getButtonColor = (type: string) => {
    switch (type) {
      case 'video':
        return 'bg-brand-50 hover:bg-brand-100 text-brand-700 dark:bg-brand-500/10 dark:hover:bg-brand-500/20 dark:text-brand-400 border-brand-200 dark:border-brand-800';
      case 'audio':
        return 'bg-purple-50 hover:bg-purple-100 text-purple-700 dark:bg-purple-500/10 dark:hover:bg-purple-500/20 dark:text-purple-400 border-purple-200 dark:border-purple-800';
      case 'thumbnail':
        return 'bg-orange-50 hover:bg-orange-100 text-orange-700 dark:bg-orange-500/10 dark:hover:bg-orange-500/20 dark:text-orange-400 border-orange-200 dark:border-orange-800';
      default:
        return 'bg-gray-50 hover:bg-gray-100 text-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700';
    }
  };

  const PlatformIcon = PLATFORM_ICONS[result.platform.id] ?? Video;

  const handleOptionClick = (option: DownloadOption) => {
    trackDownloadClick(result.platform.id, option.type, option.quality);
    onDownload(option);
    setActiveOption(option);
  };

  return (
    <>
      <div className="w-full max-w-4xl mx-auto glass-card overflow-hidden animate-slide-up mt-8">
        <div className="flex flex-col md:flex-row">

          {/* Thumbnail */}
          <div className="w-full md:w-2/5 relative group bg-black">
            <img
              src={result.thumbnail}
              alt={result.title}
              className="w-full h-full object-cover aspect-video md:aspect-auto opacity-90 group-hover:opacity-100 transition-opacity"
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
              <PlayCircle className="w-16 h-16 text-white drop-shadow-lg" />
            </div>
            {result.duration && (
              <div className="absolute bottom-3 right-3 bg-black/80 text-white text-xs font-medium px-2 py-1 rounded">
                {result.duration}
              </div>
            )}
            <div className="absolute top-3 left-3 bg-white/90 dark:bg-gray-900/90 backdrop-blur rounded-lg p-1.5 shadow-sm">
              <PlatformIcon className={cn('w-5 h-5', result.platform.color)} />
            </div>
          </div>

          {/* Details & Options */}
          <div className="w-full md:w-3/5 p-6 lg:p-8 flex flex-col justify-center">
            <h3 className="text-xl font-heading font-semibold text-gray-900 dark:text-white line-clamp-2 mb-2">
              {result.title}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 flex items-center gap-2">
              <PlatformIcon className={cn('w-4 h-4', result.platform.color)} />
              <span>{result.platform.name}</span>
              {result.duration && <><span>·</span><span>{result.duration}</span></>}
            </p>

            <div className="space-y-3">
              {result.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleOptionClick(option)}
                  className={cn(
                    'w-full flex items-center justify-between p-3 rounded-xl border transition-all hover:scale-[1.01] active:scale-[0.99]',
                    getButtonColor(option.type)
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/50 dark:bg-black/20 rounded-lg">
                      {getIcon(option.type)}
                    </div>
                    <div className="text-left">
                      <div className="font-medium text-sm md:text-base capitalize">
                        Download {option.type}
                      </div>
                      <div className="text-xs opacity-80 mt-0.5">{option.quality}</div>
                    </div>
                  </div>
                  {option.size && (
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-semibold">{option.size}</span>
                      <Download className="w-5 h-5" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal — mounts on top of everything, no page navigation */}
      {activeOption && (
        <DownloadModal
          result={result}
          option={activeOption}
          onClose={() => setActiveOption(null)}
        />
      )}
    </>
  );
}
