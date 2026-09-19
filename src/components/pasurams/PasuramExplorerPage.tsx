import React, { useState, useEffect } from 'react';
import { ActiveView } from '../../types';
import { dataService, PasuramFilterOptions } from '../../services/dataService';
import { TamilVerseDisplay } from '../common/TamilVerseDisplay';
import { 
  BookOpen, 
  ChevronDown, 
  ChevronRight, 
  Eye, 
  Filter, 
  MapPin, 
  RotateCcw, 
  Search, 
  Sparkles, 
  Tag, 
  User, 
  X 
} from 'lucide-react';

interface PasuramExplorerPageProps {
  onNavigate: (view: ActiveView) => void;
  initialFilterAlwarId?: string;
  initialFilterTempleId?: string;
  initialFilterThemeId?: string;
  initialSearchQuery?: string;
}

export const PasuramExplorerPage: React.FC<PasuramExplorerPageProps> = ({
  onNavigate,
  initialFilterAlwarId = 'all',
  initialFilterTempleId = 'all',
  initialFilterThemeId = 'all',
  initialSearchQuery = '',
}) => {
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [selectedAlwarId, setSelectedAlwarId] = useState(initialFilterAlwarId);
  const [selectedTempleId, setSelectedTempleId] = useState(initialFilterTempleId);
  const [selectedThemeId, setSelectedThemeId] = useState(initialFilterThemeId);
  const [expandedVerseMap, setExpandedVerseMap] = useState<Record<string, boolean>>({});

  const alwars = dataService.getAllAlwars();
  const divyaDesams = dataService.getAllDivyaDesams();
  const themes = dataService.getAllThemes();

  // Sync props if changed
  useEffect(() => {
    if (initialFilterAlwarId) setSelectedAlwarId(initialFilterAlwarId);
  }, [initialFilterAlwarId]);

  useEffect(() => {
    if (initialFilterTempleId) setSelectedTempleId(initialFilterTempleId);
  }, [initialFilterTempleId]);

  useEffect(() => {
    if (initialFilterThemeId) setSelectedThemeId(initialFilterThemeId);
  }, [initialFilterThemeId]);

  useEffect(() => {
    if (initialSearchQuery) setSearchQuery(initialSearchQuery);
  }, [initialSearchQuery]);

  const filterOptions: PasuramFilterOptions = {
    alwarId: selectedAlwarId,
    templeId: selectedTempleId,
    themeId: selectedThemeId,
    searchQuery: searchQuery,
  };

  const filteredPasurams = dataService.filterPasurams(filterOptions);

  const hasActiveFilters = 
    searchQuery.trim() !== '' ||
    selectedAlwarId !== 'all' ||
    selectedTempleId !== 'all' ||
    selectedThemeId !== 'all';

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedAlwarId('all');
    setSelectedTempleId('all');
    setSelectedThemeId('all');
  };

  const toggleVerseExpand = (pasuramId: string) => {
    setExpandedVerseMap(prev => ({ ...prev, [pasuramId]: !prev[pasuramId] }));
  };

  return (
    <div className="space-y-8 pb-14">
      {/* Header Banner */}
      <div className="bg-linear-to-r from-[#2F090B] via-[#481114] to-[#210405] rounded-lg text-amber-50 p-6 sm:p-8 shadow-lg border border-amber-500/30">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-500/20 text-amber-200 text-xs font-semibold border border-amber-400/30">
            <BookOpen className="w-3.5 h-3.5 text-amber-300" />
            <span>Nālāyira Divya Prabandham Canon • நாலாயிர திவ்வியப் பிரபந்தம்</span>
          </div>
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-amber-100">
            Pasuram Explorer
          </h1>
          <p className="text-sm sm:text-base text-amber-100/85 leading-relaxed font-sans">
            Search, filter, and study the divine Tamil verses of the Āḻvārs with authenticated Tamil script, phonetic transliteration, English translations, and traditional commentaries.
          </p>
        </div>
      </div>

      {/* SEARCH AND MULTI-FILTER CONTROL PANEL */}
      <div className="bg-white rounded-lg border border-stone-200 p-5 sm:p-6 shadow-xs space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Main Keyword Search */}
          <div className="md:col-span-12 lg:col-span-4 relative">
            <label className="block text-xs font-semibold text-stone-600 mb-1.5">
              Search Text &amp; Keywords
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Search Tamil, Transliteration, or English..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-8 py-2.5 text-sm bg-stone-50 border border-stone-200 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500"
              />
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3 pointer-events-none" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-2.5 text-xs text-stone-400 hover:text-stone-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Filter by Āḻvār */}
          <div className="md:col-span-4 lg:col-span-3">
            <label className="block text-xs font-semibold text-stone-600 mb-1.5">
              Filter by Āḻvār
            </label>
            <select
              value={selectedAlwarId}
              onChange={(e) => setSelectedAlwarId(e.target.value)}
              className="w-full py-2.5 px-3 text-sm bg-stone-50 border border-stone-200 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 text-stone-800"
            >
              <option value="all">All 12 Āḻvārs</option>
              {alwars.map((a) => (
                <option key={a.alwar_id} value={a.alwar_id}>
                  {a.name} ({a.tamil_name})
                </option>
              ))}
            </select>
          </div>

          {/* Filter by Divya Desam */}
          <div className="md:col-span-4 lg:col-span-3">
            <label className="block text-xs font-semibold text-stone-600 mb-1.5">
              Filter by Divya Desam
            </label>
            <select
              value={selectedTempleId}
              onChange={(e) => setSelectedTempleId(e.target.value)}
              className="w-full py-2.5 px-3 text-sm bg-stone-50 border border-stone-200 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 text-stone-800"
            >
              <option value="all">All Cataloged Temples</option>
              {divyaDesams.map((d) => (
                <option key={d.temple_id} value={d.temple_id}>
                  {d.temple_name.split('(')[0]} ({d.region})
                </option>
              ))}
            </select>
          </div>

          {/* Filter by Theme */}
          <div className="md:col-span-4 lg:col-span-2">
            <label className="block text-xs font-semibold text-stone-600 mb-1.5">
              Theological Theme
            </label>
            <select
              value={selectedThemeId}
              onChange={(e) => setSelectedThemeId(e.target.value)}
              className="w-full py-2.5 px-3 text-sm bg-stone-50 border border-stone-200 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 text-stone-800"
            >
              <option value="all">All Themes</option>
              {themes.map((t) => (
                <option key={t.theme_id} value={t.theme_id}>
                  {t.theme_name.split('(')[0]}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Status bar & Active Filter Badges */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-stone-100">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="font-semibold text-stone-700">
              Found <strong>{filteredPasurams.length}</strong> matching Pasurams:
            </span>

            {selectedAlwarId !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-red-50 text-red-900 border border-red-200 font-medium">
                <span>Āḻvār: {dataService.getAlwarById(selectedAlwarId)?.name}</span>
                <button onClick={() => setSelectedAlwarId('all')}><X className="w-3 h-3" /></button>
              </span>
            )}

            {selectedTempleId !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-amber-50 text-amber-900 border border-amber-200 font-medium">
                <span>Temple: {dataService.getDivyaDesamById(selectedTempleId)?.temple_name.split('(')[0]}</span>
                <button onClick={() => setSelectedTempleId('all')}><X className="w-3 h-3" /></button>
              </span>
            )}

            {selectedThemeId !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-stone-100 text-stone-800 border border-stone-200 font-medium">
                <span>Theme: {dataService.getThemeById(selectedThemeId)?.theme_name.split('(')[0]}</span>
                <button onClick={() => setSelectedThemeId('all')}><X className="w-3 h-3" /></button>
              </span>
            )}

            {searchQuery && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-stone-100 text-stone-800 border border-stone-200 font-medium">
                <span>Search: "{searchQuery}"</span>
                <button onClick={() => setSearchQuery('')}><X className="w-3 h-3" /></button>
              </span>
            )}
          </div>

          {hasActiveFilters && (
            <button
              onClick={handleResetFilters}
              className="text-xs font-semibold text-amber-800 hover:text-amber-950 flex items-center gap-1 transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset All Filters</span>
            </button>
          )}
        </div>
      </div>

      {/* PASURAM RESULTS LIST */}
      {filteredPasurams.length === 0 ? (
        <div className="bg-white rounded-lg border border-stone-200 p-12 text-center space-y-4">
          <BookOpen className="w-10 h-10 text-stone-400 mx-auto" />
          <h3 className="font-display font-bold text-lg text-stone-800">
            No Pasurams match the selected filter criteria
          </h3>
          <p className="text-xs sm:text-sm text-stone-500 max-w-md mx-auto">
            Try resetting your filters or clearing search terms to explore other verses in the 4,000 Prabandham canon.
          </p>
          <button
            onClick={handleResetFilters}
            className="px-4 py-2 rounded-md bg-amber-600 text-white text-xs font-medium hover:bg-amber-700 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredPasurams.map((pasuram) => {
            const isVerseExpanded = expandedVerseMap[pasuram.pasuram_id] ?? false;

            return (
              <div
                key={pasuram.pasuram_id}
                className="bg-white rounded-lg border border-amber-200/90 p-6 sm:p-7 shadow-xs hover:border-amber-400 transition-all space-y-5"
              >
                {/* Header: Prabandham, Verse number, Alwar tag */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-100">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="font-display font-bold text-stone-900 text-lg">
                      {pasuram.prabandham_name}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-md bg-amber-100 text-amber-900 text-xs font-bold border border-amber-200">
                      Verse #{pasuram.verse_number}
                    </span>

                    {/* Alwar tag button */}
                    {pasuram.alwar && (
                      <button
                        onClick={() => onNavigate({ type: 'alwar-detail', alwarId: pasuram.alwar!.alwar_id })}
                        className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-red-50 hover:bg-red-100 text-red-900 text-xs font-medium border border-red-200/70 transition-colors"
                      >
                        <User className="w-3 h-3 text-red-700" />
                        <span>{pasuram.alwar.name}</span>
                        <span className="font-tamil">({pasuram.alwar.tamil_name})</span>
                      </button>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleVerseExpand(pasuram.pasuram_id)}
                      className="px-3 py-1.5 rounded-md border border-stone-200 bg-stone-50 hover:bg-stone-100 text-xs font-medium text-stone-700 transition-colors"
                    >
                      {isVerseExpanded ? 'Hide Verse Text' : 'Show Full Verse'}
                    </button>

                    <button
                      onClick={() => onNavigate({ type: 'pasuram-detail', pasuramId: pasuram.pasuram_id })}
                      className="px-3.5 py-1.5 rounded-md bg-amber-600 hover:bg-amber-700 text-white text-xs font-medium flex items-center gap-1 transition-colors shadow-xs"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Details &amp; Commentary</span>
                    </button>
                  </div>
                </div>

                {/* Verse Display (Compact or Full) */}
                {isVerseExpanded ? (
                  <TamilVerseDisplay
                    tamilText={pasuram.tamil_text}
                    transliteration={pasuram.transliteration}
                    showControls={true}
                  />
                ) : (
                  /* Compact Preview of Verse */
                  <div className="bg-[#FAF8F5] rounded-lg p-5 border border-amber-100/80 space-y-3">
                    <div>
                      <span className="text-[11px] font-semibold text-amber-900 uppercase tracking-wider block font-sans mb-1.5">
                        தமிழ் மூலம்:
                      </span>
                      <div className="font-tamil text-stone-900 text-base sm:text-lg leading-relaxed sm:leading-loose font-medium">
                        <p className="py-0.5">{pasuram.tamil_text[0]}</p>
                        {pasuram.tamil_text[1] && <p className="py-0.5">{pasuram.tamil_text[1]}</p>}
                        {pasuram.tamil_text.length > 2 && (
                          <p className="text-stone-500 text-xs mt-2 italic">
                            ... ({pasuram.tamil_text.length - 2} more lines, click "Show Full Verse" above)
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-amber-200/50">
                      <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider block font-sans mb-1">
                        Transliteration Preview:
                      </span>
                      <p className="font-serif italic text-stone-700 text-sm leading-relaxed">
                        {pasuram.transliteration[0]}
                      </p>
                    </div>
                  </div>
                )}

                {/* English Meaning */}
                <div className="space-y-1.5">
                  <div className="text-xs font-semibold text-stone-500 uppercase tracking-wider flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-stone-400" />
                    <span>English Meaning:</span>
                  </div>
                  <p className="text-sm text-stone-800 leading-relaxed font-sans">
                    {pasuram.english_meaning}
                  </p>
                </div>

                {/* Commentary snippet */}
                <div className="bg-amber-50/40 rounded-md p-4 border border-amber-200/60 text-xs text-stone-700 space-y-1">
                  <span className="font-semibold text-amber-900 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    Traditional Commentary:
                  </span>
                  <p className="leading-relaxed line-clamp-2">
                    {pasuram.commentary}
                  </p>
                </div>

                {/* Card Footer: Associated Temples and Themes */}
                <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-stone-100 text-xs">
                  {/* Divya Desams */}
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-stone-400">Divya Desams:</span>
                    {pasuram.divyaDesams.map((temple) => (
                      <button
                        key={temple.temple_id}
                        onClick={() => onNavigate({ type: 'temple-detail', templeId: temple.temple_id })}
                        className="px-2 py-0.5 rounded-md bg-stone-100 hover:bg-amber-100 text-stone-700 text-xs transition-colors flex items-center gap-1"
                      >
                        <MapPin className="w-3 h-3 text-amber-600" />
                        <span>{temple.temple_name.split('(')[0]}</span>
                      </button>
                    ))}
                  </div>

                  {/* Themes */}
                  <div className="flex flex-wrap items-center gap-1.5">
                    {pasuram.themes.map((theme) => (
                      <button
                        key={theme.theme_id}
                        onClick={() => setSelectedThemeId(theme.theme_id)}
                        className="px-2.5 py-0.5 rounded-md bg-amber-100/70 hover:bg-amber-200 text-amber-900 text-[11px] font-medium transition-colors"
                      >
                        {theme.theme_name.split('(')[0]}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
