import React, { useState } from 'react';
import { ActiveView } from '../../types';
import { dataService } from '../../services/dataService';
import { TamilVerseDisplay } from '../common/TamilVerseDisplay';
import { 
  ArrowLeft, 
  BookOpen, 
  Calendar, 
  ChevronRight, 
  MapPin, 
  Sparkles, 
  Star 
} from 'lucide-react';

import alwarsTwelveImg from '../../assets/images/alwars_twelve_vigrahams_1789826261263.jpg';
import andalDivineImg from '../../assets/images/andal_nachiyar_divine_1789826295914.jpg';
import thirumangaiImg from '../../assets/images/thirumangai_utsavar_1789826278155.jpg';

interface AlwarProfileViewProps {
  alwarId: string;
  onNavigate: (view: ActiveView) => void;
}

export const AlwarProfileView: React.FC<AlwarProfileViewProps> = ({ alwarId, onNavigate }) => {
  const alwarData = dataService.getAlwarWithRelations(alwarId);
  const [expandedPasuramId, setExpandedPasuramId] = useState<string | null>(null);

  const getProfileImage = () => {
    if (alwarId === 'andal') return andalDivineImg;
    if (alwarId === 'thirumangai-alwar') return thirumangaiImg;
    return alwarsTwelveImg;
  };

  if (!alwarData) {
    return (
      <div className="text-center py-16 space-y-4">
        <h2 className="text-xl font-bold text-stone-800">Āḻvār Profile Not Found</h2>
        <button
          onClick={() => onNavigate({ type: 'alwars' })}
          className="px-4 py-2 rounded-md bg-amber-600 text-white text-sm hover:bg-amber-700 transition-colors"
        >
          Return to Āḻvārs List
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs text-stone-500">
        <button 
          onClick={() => onNavigate({ type: 'home' })} 
          className="hover:text-stone-800"
        >
          Home
        </button>
        <span>/</span>
        <button 
          onClick={() => onNavigate({ type: 'alwars' })} 
          className="hover:text-stone-800"
        >
          Āḻvārs
        </button>
        <span>/</span>
        <span className="text-stone-800 font-medium">{alwarData.name}</span>
      </div>

      {/* Hero Header Card */}
      <div className="bg-white rounded-lg border border-amber-200 p-6 sm:p-8 shadow-xs relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="space-y-4 max-w-2xl">
            <button
              onClick={() => onNavigate({ type: 'alwars' })}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-500 hover:text-stone-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to all 12 Āḻvārs</span>
            </button>

            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-stone-900">
                  {alwarData.name}
                </h1>
                <span className="font-tamil text-xl sm:text-2xl text-red-900 font-semibold leading-relaxed">
                  {alwarData.tamil_name}
                </span>
              </div>
              <p className="text-xs text-stone-500 mt-1">
                One of the 12 supreme Vaishnavite saint-poets of South India
              </p>
            </div>

            {/* Quick Metadata Badges */}
            <div className="flex flex-wrap gap-2.5 pt-1">
              <div className="px-3 py-1.5 rounded-md bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-center gap-1.5">
                <Star className="w-3.5 h-3.5 text-amber-600" />
                <span>Birth Star: <strong>{alwarData.birth_star}</strong></span>
              </div>

              <div className="px-3 py-1.5 rounded-md bg-stone-100 border border-stone-200 text-xs text-stone-800 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-stone-600" />
                <span>Period: <strong>{alwarData.period}</strong></span>
              </div>

              <div className="px-3 py-1.5 rounded-md bg-stone-100 border border-stone-200 text-xs text-stone-800 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-stone-600" />
                <span>Avathara Sthalam: <strong>{alwarData.birth_place}</strong></span>
              </div>

              {alwarData.avatar_symbol && (
                <div className="px-3 py-1.5 rounded-md bg-red-50 border border-red-200 text-xs text-red-900 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-red-600" />
                  <span>Avatar of: <strong>{alwarData.avatar_symbol}</strong></span>
                </div>
              )}
            </div>
          </div>

          {/* Sacred Profile Image & Count */}
          <div className="flex flex-col items-center sm:items-end gap-3 self-start">
            <div className="w-48 h-36 rounded-md overflow-hidden border border-amber-300 shadow-sm bg-stone-900">
              <img
                src={getProfileImage()}
                alt={alwarData.name}
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="bg-[#FAF7F2] p-3.5 rounded-md border border-amber-200/80 text-center w-48">
              <div className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">
                Total Composition
              </div>
              <div className="font-display font-extrabold text-2xl text-amber-800 mt-0.5">
                {alwarData.total_pasurams_count}
              </div>
              <div className="text-[11px] text-stone-500">
                Divya Prabandham Verses
              </div>
            </div>
          </div>
        </div>

        {/* Biography Section */}
        <div className="mt-7 pt-6 border-t border-stone-100 space-y-3">
          <h2 className="font-display font-bold text-lg text-stone-900 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-amber-600" />
            <span>Sacred Biography &amp; Legacy</span>
          </h2>
          <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-sans">
            {alwarData.biography}
          </p>
        </div>
      </div>

      {/* Associated Pasurams Section */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="font-display font-bold text-xl sm:text-2xl text-stone-900 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-amber-600" />
              <span>Associated Pasurams</span>
            </h2>
            <p className="text-xs text-stone-500">
              Hymns composed by {alwarData.name} available in this knowledge base
            </p>
          </div>

          <button
            onClick={() => onNavigate({ type: 'pasurams', filterAlwarId: alwarData.alwar_id })}
            className="text-xs font-semibold text-amber-800 hover:underline flex items-center gap-1"
          >
            <span>Explore all in Pasuram Explorer</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {alwarData.pasurams.length === 0 ? (
          <div className="bg-white rounded-lg border border-stone-200 p-8 text-center text-sm text-stone-500">
            More verses for {alwarData.name} are being indexed in the digital canon.
          </div>
        ) : (
          <div className="space-y-4">
            {alwarData.pasurams.map((pasuram) => {
              const isExpanded = expandedPasuramId === pasuram.pasuram_id;
              return (
                <div 
                  key={pasuram.pasuram_id}
                  className="bg-white rounded-lg border border-amber-200/90 p-5 sm:p-6 shadow-xs space-y-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-stone-100">
                    <div className="flex items-center gap-2">
                      <span className="font-display font-bold text-stone-900 text-base">
                        {pasuram.prabandham_name}
                      </span>
                      <span className="text-xs px-2.5 py-0.5 rounded-md bg-amber-100 text-amber-800 font-semibold border border-amber-200">
                        Verse #{pasuram.verse_number}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setExpandedPasuramId(isExpanded ? null : pasuram.pasuram_id)}
                        className="text-xs text-stone-600 hover:text-stone-900 px-2.5 py-1 rounded-md border border-stone-200 bg-stone-50 hover:bg-stone-100 font-medium transition-colors"
                      >
                        {isExpanded ? 'Hide Verse Text' : 'Show Verse Text'}
                      </button>

                      <button
                        onClick={() => onNavigate({ type: 'pasuram-detail', pasuramId: pasuram.pasuram_id })}
                        className="text-xs text-amber-800 hover:text-amber-950 font-semibold flex items-center gap-1 transition-colors"
                      >
                        <span>Full Details &amp; Commentary</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Expanded Tamil Verse Viewer */}
                  {isExpanded && (
                    <TamilVerseDisplay
                      tamilText={pasuram.tamil_text}
                      transliteration={pasuram.transliteration}
                      showControls={false}
                    />
                  )}

                  {/* English Meaning */}
                  <div>
                    <div className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1">
                      English Meaning:
                    </div>
                    <p className="text-sm text-stone-700 leading-relaxed font-sans">
                      {pasuram.english_meaning}
                    </p>
                  </div>

                  {/* Associated Temples for this Pasuram */}
                  <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-stone-100 text-xs">
                    <span className="text-stone-400">Associated Temples:</span>
                    {pasuram.divya_desam_ids.map((tid) => {
                      const temple = dataService.getDivyaDesamById(tid);
                      if (!temple) return null;
                      return (
                        <button
                          key={tid}
                          onClick={() => onNavigate({ type: 'temple-detail', templeId: tid })}
                          className="px-2.5 py-0.5 rounded-md bg-stone-100 hover:bg-amber-100 text-stone-700 text-xs transition-colors"
                        >
                          {temple.temple_name.split('(')[0]}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Associated Divya Desams Section */}
      <div className="space-y-4">
        <div>
          <h2 className="font-display font-bold text-xl sm:text-2xl text-stone-900 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-amber-600" />
            <span>Sanctified Divya Desams</span>
          </h2>
          <p className="text-xs text-stone-500">
            Temples blessed with Maṅgaḷāśāsanam hymns by {alwarData.name}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {alwarData.divyaDesams.map((temple) => (
            <div
              key={temple.temple_id}
              onClick={() => onNavigate({ type: 'temple-detail', templeId: temple.temple_id })}
              className="bg-white rounded-lg border border-stone-200 p-5 hover:border-amber-300 hover:shadow-sm transition-all cursor-pointer space-y-2.5 flex flex-col justify-between"
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
                <p className="text-xs text-stone-600 mt-2 line-clamp-2">
                  <strong>Deity:</strong> {temple.presiding_deity}
                </p>
              </div>

              <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs font-medium text-amber-800">
                <span>View Temple Heritage</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
