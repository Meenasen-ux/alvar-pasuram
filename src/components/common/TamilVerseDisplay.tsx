import React, { useState } from 'react';
import { Check, Copy, Eye, Type } from 'lucide-react';

interface TamilVerseDisplayProps {
  tamilText: string[];
  transliteration: string[];
  showControls?: boolean;
}

export const TamilVerseDisplay: React.FC<TamilVerseDisplayProps> = ({
  tamilText,
  transliteration,
  showControls = true,
}) => {
  const [viewMode, setViewMode] = useState<'dual' | 'tamil' | 'translit'>('dual');
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('large');
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const textToCopy = [
      '--- தமிழ் பாசுரம் ---',
      ...tamilText,
      '',
      '--- Transliteration ---',
      ...transliteration,
    ].join('\n');
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getFontSizeClass = () => {
    switch (fontSize) {
      case 'normal':
        return 'text-base sm:text-lg leading-relaxed';
      case 'large':
        return 'text-lg sm:text-xl md:text-2xl leading-loose';
      case 'xlarge':
        return 'text-xl sm:text-2xl md:text-3xl leading-loose';
    }
  };

  return (
    <div className="bg-[#FFFDF9] border border-amber-200/80 rounded-lg p-5 sm:p-7 shadow-xs relative">
      {showControls && (
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-6 border-b border-amber-100">
          {/* View mode buttons */}
          <div className="flex items-center gap-1 bg-stone-100/90 p-1 rounded-md border border-stone-200 text-xs">
            <button
              onClick={() => setViewMode('dual')}
              className={`px-3 py-1.5 rounded-md font-normal transition-all cursor-pointer ${
                viewMode === 'dual'
                  ? 'bg-white text-stone-900 shadow-xs border border-stone-200'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Dual (தமிழ் + English)
            </button>
            <button
              onClick={() => setViewMode('tamil')}
              className={`px-3 py-1.5 rounded-md font-normal transition-all cursor-pointer ${
                viewMode === 'tamil'
                  ? 'bg-white text-stone-900 shadow-xs border border-stone-200'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              தமிழ் Only
            </button>
            <button
              onClick={() => setViewMode('translit')}
              className={`px-3 py-1.5 rounded-md font-normal transition-all cursor-pointer ${
                viewMode === 'translit'
                  ? 'bg-white text-stone-900 shadow-xs border border-stone-200'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Transliteration
            </button>
          </div>

          {/* Size & Copy Actions */}
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-stone-100 p-1 rounded-md border border-stone-200 text-xs">
              <span className="px-1.5 text-stone-400">
                <Type className="w-3.5 h-3.5" />
              </span>
              {(['normal', 'large', 'xlarge'] as const).map((sz) => (
                <button
                  key={sz}
                  onClick={() => setFontSize(sz)}
                  className={`px-2 py-0.5 rounded-sm capitalize cursor-pointer ${
                    fontSize === sz ? 'bg-white font-normal text-stone-900 shadow-xs' : 'text-stone-500 hover:text-stone-800'
                  }`}
                >
                  {sz === 'normal' ? 'S' : sz === 'large' ? 'M' : 'L'}
                </button>
              ))}
            </div>

            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-amber-200 text-stone-700 bg-white hover:bg-amber-50 text-xs font-normal transition-colors cursor-pointer"
              title="Copy Pasuram text"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-stone-500" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Verse content container */}
      <div className="space-y-6">
        {/* Tamil Script */}
        {(viewMode === 'dual' || viewMode === 'tamil') && (
          <div className="space-y-3">
            {viewMode === 'dual' && (
              <span className="text-xs text-[#5B1717] font-tamil font-normal block pb-1">
                தமிழ் மூலம்
              </span>
            )}
            <div className={`font-tamil font-normal text-stone-900 tracking-normal ${getFontSizeClass()}`}>
              {tamilText.map((line, idx) => (
                <p key={idx} className="py-1 my-0.5 leading-relaxed sm:leading-loose">
                  {line}
                </p>
              ))}
            </div>
          </div>
        )}

        {/* Separator if dual */}
        {viewMode === 'dual' && (
          <div className="relative my-7 py-3">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-amber-200/80 border-dashed"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-[#FFFDF9] px-4 py-1 text-stone-600 font-normal italic border border-amber-100 rounded-md">
                Romanized Transliteration
              </span>
            </div>
          </div>
        )}

        {/* Transliteration */}
        {(viewMode === 'dual' || viewMode === 'translit') && (
          <div className="space-y-3">
            {viewMode === 'dual' && (
              <span className="text-xs text-stone-600 uppercase tracking-wider block font-normal pb-1">
                Transliteration
              </span>
            )}
            <div className={`italic text-stone-800 tracking-wide font-normal ${getFontSizeClass()}`}>
              {transliteration.map((line, idx) => (
                <p key={idx} className="py-0.5 my-0.5 leading-relaxed">
                  {line}
                </p>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
