import React, { useState } from 'react';
import { ActiveView } from '../../types';
import { dataService } from '../../services/dataService';
import { TamilVerseDisplay } from '../common/TamilVerseDisplay';
import { 
  ArrowLeft, 
  BookOpen, 
  ChevronRight,
  Compass, 
  Eye, 
  Globe, 
  Landmark, 
  MapPin, 
  Sparkles, 
  Users 
} from 'lucide-react';

import perumalUtsavarImg from '../../assets/images/perumal_utsavar_1789826238414.jpg';

interface DivyaDesamProfileViewProps {
  templeId: string;
  onNavigate: (view: ActiveView) => void;
}

export const DivyaDesamProfileView: React.FC<DivyaDesamProfileViewProps> = ({ templeId, onNavigate }) => {
  const templeData = dataService.getDivyaDesamWithRelations(templeId);
  const [expandedPasuramId, setExpandedPasuramId] = useState<string | null>(null);

  if (!templeData) {
    return (
      <div className="text-center py-16 space-y-4">
        <h2 className="text-xl font-bold text-stone-800">Divya Desam Temple Not Found</h2>
        <button
          onClick={() => onNavigate({ type: 'divyadesams' })}
          className="px-4 py-2 rounded-md bg-amber-600 text-white text-sm hover:bg-amber-700 transition-colors"
        >
          Return to Divya Desams List
        </button>
      </div>
    );
  }

  const isSrirangam = templeData.temple_id === 'dd-01-srirangam';

  return (
    <div className="space-y-8 pb-14">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-stone-500">
        <button 
          onClick={() => onNavigate({ type: 'home' })} 
          className="hover:text-stone-800"
        >
          Home
        </button>
        <span>/</span>
        <button 
          onClick={() => onNavigate({ type: 'divyadesams' })} 
          className="hover:text-stone-800"
        >
          108 Divya Desams
        </button>
        <span>/</span>
        <span className="text-stone-800 font-medium">{templeData.temple_name.split('(')[0]}</span>
      </div>

      {/* Hero Header Card */}
      <div className="bg-white rounded-lg border border-amber-200 p-6 sm:p-8 shadow-xs relative overflow-hidden space-y-6">
        <div className="relative z-10 flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="space-y-4 max-w-2xl">
            <button
              onClick={() => onNavigate({ type: 'divyadesams' })}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-500 hover:text-stone-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Divya Desams Catalog</span>
            </button>

            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="px-2.5 py-1 rounded-md bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wide border border-amber-200">
                  {templeData.region}
                </span>
                <span className="px-2.5 py-1 rounded-md bg-stone-100 text-stone-700 text-xs font-medium border border-stone-200">
                  {templeData.district}, {templeData.state}
                </span>
              </div>
              <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-stone-900">
                {templeData.temple_name}
              </h1>
              <p className="font-tamil text-xl sm:text-2xl text-red-900 font-semibold mt-1 leading-relaxed">
                {templeData.tamil_name}
              </p>
            </div>
          </div>

          {/* Quick Metrics and Optional Temple Image */}
          <div className="flex flex-col items-center sm:items-end gap-3 self-start">
            {isSrirangam && (
              <div className="w-48 h-36 rounded-md overflow-hidden border border-amber-300 shadow-sm bg-stone-900">
                <img
                  src={perumalUtsavarImg}
                  alt="Sri Ranganatha Perumal"
                  className="w-full h-full object-cover object-center"
                  referrerPolicy="no-referrer"
                />
              </div>
            )}

            <div className="flex flex-row gap-3 w-48">
              <div className="flex-1 bg-[#FAF7F2] p-3 rounded-md border border-amber-200/80 text-center">
                <div className="text-[10px] font-semibold text-stone-500 uppercase tracking-wider">
                  Mangalasasanam
                </div>
                <div className="font-display font-bold text-xl text-amber-800 mt-0.5">
                  {templeData.alwars.length} Āḻvārs
                </div>
              </div>

              <div className="flex-1 bg-[#FAF7F2] p-3 rounded-md border border-amber-200/80 text-center">
                <div className="text-[10px] font-semibold text-stone-500 uppercase tracking-wider">
                  Hymns in KB
                </div>
                <div className="font-display font-bold text-xl text-amber-800 mt-0.5">
                  {templeData.pasurams.length} Verses
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Temple Architecture & Sanctum Specifications */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-4 border-t border-stone-100">
          <div className="bg-stone-50 rounded-md p-4 border border-stone-200/70 space-y-1">
            <span className="text-[11px] uppercase tracking-wider font-semibold text-stone-500 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              Presiding Deity (Perumal)
            </span>
            <p className="text-xs sm:text-sm font-semibold text-stone-900 leading-snug">
              {templeData.presiding_deity}
            </p>
          </div>

          <div className="bg-stone-50 rounded-md p-4 border border-stone-200/70 space-y-1">
            <span className="text-[11px] uppercase tracking-wider font-semibold text-stone-500 flex items-center gap-1.5">
              <Landmark className="w-3.5 h-3.5 text-red-600" />
              Goddess / Thāyār
            </span>
            <p className="text-xs sm:text-sm font-semibold text-stone-900 leading-snug">
              {templeData.goddess}
            </p>
          </div>

          <div className="bg-stone-50 rounded-md p-4 border border-stone-200/70 space-y-1">
            <span className="text-[11px] uppercase tracking-wider font-semibold text-stone-500 flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-blue-600" />
              Vimānam
            </span>
            <p className="text-xs sm:text-sm font-semibold text-stone-900 leading-snug">
              {templeData.vimanam || 'Canonical Vimanam'}
            </p>
          </div>

          <div className="bg-stone-50 rounded-md p-4 border border-stone-200/70 space-y-1">
            <span className="text-[11px] uppercase tracking-wider font-semibold text-stone-500 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-600" />
              Holy Theertham / Tank
            </span>
            <p className="text-xs sm:text-sm font-semibold text-stone-900 leading-snug">
              {templeData.theertham || 'Sacred Pushkarini'}
            </p>
          </div>
        </div>

        {/* Location coordinates note */}
        {templeData.latitude !== 0 && (
          <div className="flex items-center gap-2 text-xs text-stone-500 pt-1">
            <Globe className="w-3.5 h-3.5 text-stone-400" />
            <span>Geographical Coordinates: {templeData.latitude}° N, {templeData.longitude}° E</span>
            <span>•</span>
            <span>Location: {templeData.location}</span>
          </div>
        )}

        {/* Sthala Puranam / History */}
        <div className="pt-4 border-t border-stone-100 space-y-3">
          <h2 className="font-display font-bold text-lg text-stone-900 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-amber-600" />
            <span>Sthala Purāṇam &amp; Sacred History</span>
          </h2>
          <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-sans">
            {templeData.history}
          </p>
        </div>
      </div>

      {/* Associated Āḻvārs Section */}
      <div className="space-y-4">
        <div>
          <h2 className="font-display font-bold text-xl sm:text-2xl text-stone-900 flex items-center gap-2">
            <Users className="w-5 h-5 text-amber-600" />
            <span>Āḻvārs Who Performed Maṅgaḷāśāsanam</span>
          </h2>
          <p className="text-xs text-stone-500">
            Saint-poets who visited and sung immortal hymns upon this holy kshetra
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {templeData.alwars.map((alwar) => (
            <div
              key={alwar.alwar_id}
              onClick={() => onNavigate({ type: 'alwar-detail', alwarId: alwar.alwar_id })}
              className="bg-white rounded-lg border border-stone-200 p-4 hover:border-amber-300 hover:shadow-xs transition-all cursor-pointer flex items-center justify-between gap-3 group"
            >
              <div>
                <h3 className="font-display font-bold text-sm text-stone-900 group-hover:text-red-900 transition-colors">
                  {alwar.name}
                </h3>
                <div className="font-tamil text-xs text-red-900 mt-0.5 leading-relaxed">
                  {alwar.tamil_name}
                </div>
                <div className="text-[11px] text-stone-500 mt-1">
                  Star: {alwar.birth_star}
                </div>
              </div>

              <div className="text-xs font-semibold text-amber-800 flex items-center gap-0.5">
                <span>Profile</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Associated Pasurams Section */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="font-display font-bold text-xl sm:text-2xl text-stone-900 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-amber-600" />
              <span>Sanctified Pasurams on {templeData.temple_name.split('(')[0]}</span>
            </h2>
            <p className="text-xs text-stone-500">
              Hymns praising this presiding deity indexed in this knowledge base
            </p>
          </div>

          <button
            onClick={() => onNavigate({ type: 'pasurams', filterTempleId: templeData.temple_id })}
            className="text-xs font-semibold text-amber-800 hover:underline flex items-center gap-1"
          >
            <span>Filter this temple in Pasuram Explorer</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {templeData.pasurams.length === 0 ? (
          <div className="bg-white rounded-lg border border-stone-200 p-8 text-center text-sm text-stone-500">
            Additional verses specifically celebrating {templeData.temple_name} are scheduled for canonical ingestion in Phase 2.
          </div>
        ) : (
          <div className="space-y-4">
            {templeData.pasurams.map((pasuram) => {
              const alwar = dataService.getAlwarById(pasuram.alwar_id);
              const isExpanded = expandedPasuramId === pasuram.pasuram_id;

              return (
                <div
                  key={pasuram.pasuram_id}
                  className="bg-white rounded-lg border border-amber-200/90 p-5 sm:p-6 shadow-xs space-y-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-stone-100">
                    <div className="flex items-center gap-2.5">
                      <span className="font-display font-bold text-stone-900 text-base">
                        {pasuram.prabandham_name}
                      </span>
                      <span className="text-xs px-2.5 py-0.5 rounded-md bg-amber-100 text-amber-800 font-semibold border border-amber-200">
                        Verse #{pasuram.verse_number}
                      </span>
                      {alwar && (
                        <span className="text-xs text-stone-600">
                          by <strong>{alwar.name}</strong>
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setExpandedPasuramId(isExpanded ? null : pasuram.pasuram_id)}
                        className="text-xs text-stone-600 hover:text-stone-900 px-2.5 py-1 rounded-md border border-stone-200 bg-stone-50 hover:bg-stone-100 font-medium transition-colors"
                      >
                        {isExpanded ? 'Hide Verse' : 'Show Verse'}
                      </button>

                      <button
                        onClick={() => onNavigate({ type: 'pasuram-detail', pasuramId: pasuram.pasuram_id })}
                        className="text-xs text-amber-800 hover:text-amber-950 font-semibold flex items-center gap-1 transition-colors"
                      >
                        <span>Full Commentary</span>
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {isExpanded && (
                    <TamilVerseDisplay
                      tamilText={pasuram.tamil_text}
                      transliteration={pasuram.transliteration}
                      showControls={false}
                    />
                  )}

                  <div>
                    <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider block mb-1">
                      English Meaning:
                    </span>
                    <p className="text-sm text-stone-700 leading-relaxed font-sans">
                      {pasuram.english_meaning}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
