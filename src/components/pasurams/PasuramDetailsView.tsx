import React from 'react';
import { ActiveView } from '../../types';
import { dataService } from '../../services/dataService';
import { TamilVerseDisplay } from '../common/TamilVerseDisplay';
import { 
  ArrowLeft, 
  ArrowRight, 
  BookOpen, 
  ChevronRight,
  MapPin, 
  Sparkles, 
  Tag, 
  User 
} from 'lucide-react';

import alwarsTwelveImg from '../../assets/images/alwars_twelve_vigrahams_1789826261263.jpg';
import andalDivineImg from '../../assets/images/andal_nachiyar_divine_1789826295914.jpg';
import thirumangaiImg from '../../assets/images/thirumangai_utsavar_1789826278155.jpg';

interface PasuramDetailsViewProps {
  pasuramId: string;
  onNavigate: (view: ActiveView) => void;
}

export const PasuramDetailsView: React.FC<PasuramDetailsViewProps> = ({ pasuramId, onNavigate }) => {
  const pasuram = dataService.getPasuramWithRelations(pasuramId);
  const allPasurams = dataService.getAllPasurams();

  if (!pasuram) {
    return (
      <div className="text-center py-16 space-y-4">
        <h2 className="text-xl font-bold text-stone-800">Pasuram Not Found</h2>
        <button
          onClick={() => onNavigate({ type: 'pasurams' })}
          className="px-4 py-2 rounded-md bg-amber-600 text-white text-sm hover:bg-amber-700 transition-colors"
        >
          Return to Pasuram Explorer
        </button>
      </div>
    );
  }

  const getAlwarThumb = (alwarId: string) => {
    if (alwarId === 'andal') return andalDivineImg;
    if (alwarId === 'thirumangai-alwar') return thirumangaiImg;
    return alwarsTwelveImg;
  };

  // Find previous and next pasuram in dataset
  const currentIndex = allPasurams.findIndex(p => p.pasuram_id === pasuramId);
  const prevPasuram = currentIndex > 0 ? allPasurams[currentIndex - 1] : null;
  const nextPasuram = currentIndex < allPasurams.length - 1 ? allPasurams[currentIndex + 1] : null;

  return (
    <div className="space-y-8 pb-14">
      {/* Breadcrumbs & Navigation */}
      <div className="flex items-center justify-between gap-4 text-xs text-stone-500">
        <div className="flex items-center gap-2">
          <button 
            onClick={() => onNavigate({ type: 'home' })} 
            className="hover:text-stone-800"
          >
            Home
          </button>
          <span>/</span>
          <button 
            onClick={() => onNavigate({ type: 'pasurams' })} 
            className="hover:text-stone-800"
          >
            Pasurams
          </button>
          <span>/</span>
          <span className="text-stone-800 font-medium">
            {pasuram.prabandham_name} #{pasuram.verse_number}
          </span>
        </div>

        <button
          onClick={() => onNavigate({ type: 'pasurams' })}
          className="inline-flex items-center gap-1.5 text-stone-600 hover:text-stone-900 font-medium px-2.5 py-1 rounded-md border border-stone-200 bg-white hover:bg-stone-50 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Explorer</span>
        </button>
      </div>

      {/* Main Title & Metadata Card */}
      <div className="bg-white rounded-lg border border-amber-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-stone-100">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-md bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider border border-amber-200">
                {pasuram.prabandham_name}
              </span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-stone-100 text-stone-700 border border-stone-200">
                Verse #{pasuram.verse_number}
              </span>
            </div>
            <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-stone-900">
              {pasuram.prabandham_name} - Verse {pasuram.verse_number}
            </h1>
          </div>

          {/* Composer link card */}
          {pasuram.alwar && (
            <div
              onClick={() => onNavigate({ type: 'alwar-detail', alwarId: pasuram.alwar!.alwar_id })}
              className="bg-[#FAF7F2] hover:bg-amber-50 border border-amber-200/80 rounded-lg p-2.5 px-4 cursor-pointer transition-colors flex items-center gap-3 self-start md:self-auto"
            >
              <div className="w-11 h-11 rounded-md overflow-hidden border border-amber-300 bg-stone-900 flex-shrink-0">
                <img
                  src={getAlwarThumb(pasuram.alwar.alwar_id)}
                  alt={pasuram.alwar.name}
                  className="w-full h-full object-cover object-center"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <div className="text-[10px] text-stone-500 uppercase font-semibold">Composed by</div>
                <div className="font-display font-bold text-sm text-stone-900 hover:text-amber-800 transition-colors">
                  {pasuram.alwar.name}
                </div>
                <div className="font-tamil text-xs text-red-900 font-medium leading-relaxed">
                  {pasuram.alwar.tamil_name}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Full Tamil & Transliteration Display with controls */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-stone-500 font-medium px-1">
            <span>Sacred Versification</span>
            <span>Switch view mode or scale size below</span>
          </div>
          <TamilVerseDisplay
            tamilText={pasuram.tamil_text}
            transliteration={pasuram.transliteration}
            showControls={true}
          />
        </div>

        {/* English Meaning */}
        <div className="bg-[#FAF8F5] rounded-lg p-5 sm:p-6 border border-amber-100/90 space-y-2.5">
          <h2 className="font-display font-bold text-base sm:text-lg text-stone-900 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-amber-700" />
            <span>English Translation &amp; Meaning</span>
          </h2>
          <p className="text-stone-800 text-sm sm:text-base leading-relaxed font-sans">
            {pasuram.english_meaning}
          </p>
        </div>

        {/* Traditional Commentary (Vyakhyaanam) */}
        <div className="bg-amber-50/50 rounded-lg p-5 sm:p-6 border border-amber-200/70 space-y-2.5">
          <h2 className="font-display font-bold text-base sm:text-lg text-amber-950 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>Traditional Commentary &amp; Esoteric Insights</span>
          </h2>
          <p className="text-stone-800 text-sm sm:text-base leading-relaxed font-sans">
            {pasuram.commentary}
          </p>
        </div>

        {/* Theological Themes */}
        <div className="pt-2 space-y-2">
          <div className="text-xs font-semibold text-stone-500 uppercase tracking-wider flex items-center gap-1.5">
            <Tag className="w-3.5 h-3.5 text-stone-400" />
            <span>Theological Themes Explored:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {pasuram.themes.map((theme) => (
              <button
                key={theme.theme_id}
                onClick={() => onNavigate({ type: 'pasurams', filterThemeId: theme.theme_id })}
                className="px-3 py-1.5 rounded-md bg-stone-100 hover:bg-amber-100 text-stone-800 text-xs font-medium border border-stone-200 transition-colors flex items-center gap-1.5"
              >
                <span>{theme.theme_name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Associated Divya Desams Section */}
      <div className="space-y-4">
        <div>
          <h2 className="font-display font-bold text-xl sm:text-2xl text-stone-900 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-amber-600" />
            <span>Sanctified Divya Desams Associated With This Verse</span>
          </h2>
          <p className="text-xs text-stone-500">
            Temples directly invoked, venerated, or celebrated in this Pasuram
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {pasuram.divyaDesams.map((temple) => (
            <div
              key={temple.temple_id}
              onClick={() => onNavigate({ type: 'temple-detail', templeId: temple.temple_id })}
              className="bg-white rounded-lg border border-stone-200 p-5 hover:border-amber-300 hover:shadow-xs transition-all cursor-pointer space-y-2 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
                  <span className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 font-medium border border-amber-200">
                    {temple.region}
                  </span>
                  <span>{temple.state}</span>
                </div>
                <h3 className="font-display font-bold text-base text-stone-900 hover:text-amber-800 transition-colors">
                  {temple.temple_name}
                </h3>
                <p className="font-tamil text-xs text-red-900 mt-1 leading-relaxed">
                  {temple.tamil_name}
                </p>
                <div className="text-xs text-stone-600 mt-2">
                  <span className="text-stone-400">Deity:</span> {temple.presiding_deity}
                </div>
              </div>

              <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs font-medium text-amber-800">
                <span>View Temple Heritage</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Prev / Next Verse Navigation Bar */}
      <div className="flex items-center justify-between gap-4 pt-4 border-t border-stone-200">
        {prevPasuram ? (
          <button
            onClick={() => onNavigate({ type: 'pasuram-detail', pasuramId: prevPasuram.pasuram_id })}
            className="flex items-center gap-2 px-3.5 py-2 rounded-md bg-white border border-stone-200 hover:bg-stone-50 text-stone-800 text-xs sm:text-sm font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <div className="text-left">
              <div className="text-[10px] text-stone-400 uppercase">Previous Verse</div>
              <div className="font-semibold">{prevPasuram.prabandham_name} #{prevPasuram.verse_number}</div>
            </div>
          </button>
        ) : <div />}

        {nextPasuram && (
          <button
            onClick={() => onNavigate({ type: 'pasuram-detail', pasuramId: nextPasuram.pasuram_id })}
            className="flex items-center gap-2 px-3.5 py-2 rounded-md bg-white border border-stone-200 hover:bg-stone-50 text-stone-800 text-xs sm:text-sm font-medium transition-colors"
          >
            <div className="text-right">
              <div className="text-[10px] text-stone-400 uppercase">Next Verse</div>
              <div className="font-semibold">{nextPasuram.prabandham_name} #{nextPasuram.verse_number}</div>
            </div>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
