import React from 'react';
import { ArrowRight, Loader2, Link as LinkIcon, Search } from 'lucide-react';
import { cn } from '../../lib/utils';
import { PlatformConfig } from '../../lib/platforms';

interface URLInputProps {
  url: string;
  isLoading: boolean;
  error: string | null;
  platform: PlatformConfig | null;
  onChange: (url: string) => void;
  onSubmit: () => void;
}

export function URLInput({ url, isLoading, error, platform, onChange, onSubmit }: URLInputProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        onChange(text);
      }
    } catch (err) {
      console.error('Failed to read clipboard', err);
    }
  };

  const Icon = platform?.icon || LinkIcon;

  return (
    <div className="w-full max-w-3xl mx-auto">
      <form onSubmit={handleSubmit} className="relative group">
        <div className={cn(
          "absolute -inset-1 bg-gradient-to-r from-brand-500 to-indigo-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200",
          error ? "from-red-500 to-rose-500" : ""
        )} />
        
        <div className="relative flex items-center bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-800 p-2">
          <div className="flex items-center justify-center pl-4 pr-2">
            {platform ? (
              <Icon className={cn("w-6 h-6", platform.color)} />
            ) : (
              <Search className="w-6 h-6 text-gray-400" />
            )}
          </div>
          
          <input
            type="url"
            value={url}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Paste video URL here..."
            className="flex-1 w-full bg-transparent border-none focus:ring-0 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 text-lg sm:text-xl py-3 px-2 focus:outline-none"
            required
            autoComplete="off"
          />
          
          {url.length === 0 && (
            <button
              type="button"
              onClick={handlePaste}
              className="hidden sm:block mr-2 px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors"
            >
              Paste
            </button>
          )}

          <button
            type="submit"
            disabled={isLoading || !url}
            className="bg-brand-500 hover:bg-brand-600 text-white p-3 sm:px-6 rounded-xl font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isLoading ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : (
              <>
                <span className="hidden sm:inline">Download</span>
                <ArrowRight className="w-6 h-6 sm:w-5 sm:h-5" />
              </>
            )}
          </button>
        </div>
      </form>
      
      {error && (
        <div className="mt-3 text-red-500 dark:text-red-400 text-sm font-medium flex items-center gap-2 justify-center animate-fade-in">
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
