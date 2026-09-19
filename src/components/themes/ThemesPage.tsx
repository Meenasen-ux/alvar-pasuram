import React from 'react';
import { ActiveView } from '../../types';
import { dataService } from '../../services/dataService';
import { ArrowRight, BookOpen, Sparkles, Tag } from 'lucide-react';

interface ThemesPageProps {
  onNavigate: (view: ActiveView) => void;
}

export const ThemesPage: React.FC<ThemesPageProps> = ({ onNavigate }) => {
  const themes = dataService.getAllThemes();
  const pasurams = dataService.getAllPasurams();

  return (
    <div className="space-y-8 pb-14">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-sans text-stone-500">
        <button 
          onClick={() => onNavigate({ type: 'home' })}
          className="hover:text-[#4A0F0F] transition-colors"
        >
          Home
        </button>
        <span>/</span>
        <span className="text-[#4A0F0F] font-semibold">Theological Themes</span>
      </div>

      {/* Header Banner */}
      <div className="bg-[#FAF7F0] border border-[#C99A32]/30 rounded-xl p-6 sm:p-8 space-y-3">
        <div className="flex items-center gap-2 text-[#C99A32] text-xs font-bold uppercase tracking-[0.2em]">
          <Sparkles className="w-4 h-4" />
          <span>Sri Vaishnava Siddhantha</span>
        </div>
        <h1 className="font-serif-classical font-bold text-3xl sm:text-4xl text-[#4A0F0F]">
          Theological &amp; Devotional Themes
        </h1>
        <p className="font-tamil text-sm text-[#5B1717] font-semibold">
          திவ்வியப் பிரபந்த இறையியல் கோட்பாடுகள்
        </p>
        <p className="text-sm text-stone-700 max-w-3xl leading-relaxed">
          The 4,000 hymns of the Nālāyira Divya Prabandham are deeply saturated with profound philosophical and spiritual concepts, from total unconditional surrender (Prapatti / Śaraṇāgati) and intense love-in-separation (Viraha Bhakti) to the sacred contemplation of the Lord's holy names and archā-mūrti forms in temples.
        </p>
      </div>

      {/* Themes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {themes.map((theme) => {
          const associatedPasurams = pasurams.filter(p => p.theme_ids.includes(theme.theme_id));

          return (
            <div
              key={theme.theme_id}
              className="bg-white rounded-xl border border-stone-200/80 p-6 hover:border-[#C99A32] hover:shadow-sm transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded text-[11px] font-bold tracking-wider uppercase bg-amber-50 text-[#5B1717] border border-amber-200/60">
                    Theology
                  </span>
                  <span className="text-xs font-medium text-stone-500">
                    {associatedPasurams.length} indexed hymns
                  </span>
                </div>

                <h3 className="font-serif-classical font-bold text-xl text-[#241B18]">
                  {theme.theme_name}
                </h3>

                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-sans">
                  {theme.description}
                </p>
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                <button
                  onClick={() => onNavigate({ type: 'pasurams', filterThemeId: theme.theme_id })}
                  className="text-xs font-semibold text-[#5B1717] hover:text-[#4A0F0F] inline-flex items-center gap-1.5 transition-colors"
                >
                  <BookOpen className="w-3.5 h-3.5 text-[#C99A32]" />
                  <span>Explore Hymns in Explorer</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
