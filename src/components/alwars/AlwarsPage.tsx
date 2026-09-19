import React, { useState } from 'react';
import { ActiveView } from '../../types';
import { dataService } from '../../services/dataService';
import { 
  BookOpen, 
  Calendar, 
  ChevronRight, 
  MapPin, 
  Search, 
  Sparkles, 
  Star, 
  Users 
} from 'lucide-react';

import alwarsTwelveImg from '../../assets/images/alwars_twelve_vigrahams_1789826261263.jpg';
import andalDivineImg from '../../assets/images/andal_nachiyar_divine_1789826295914.jpg';
import thirumangaiImg from '../../assets/images/thirumangai_utsavar_1789826278155.jpg';

interface AlwarsPageProps {
  onNavigate: (view: ActiveView) => void;
}

export const AlwarsPage: React.FC<AlwarsPageProps> = ({ onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const alwars = dataService.searchAlwars(searchQuery);

  const getAlwarThumbnail = (alwarId: string) => {
    if (alwarId === 'andal') return andalDivineImg;
    if (alwarId === 'thirumangai-alwar') return thirumangaiImg;
    return null;
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Page Header with Sacred Image */}
      <div className="bg-linear-to-r from-[#3D0A0C] via-[#521214] to-[#2B0607] rounded-lg text-amber-50 p-6 sm:p-8 shadow-lg border border-amber-500/30 flex flex-col md:flex-row items-center gap-6 justify-between">
        <div className="max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-500/20 text-amber-200 text-xs font-semibold border border-amber-400/30">
            <Users className="w-3.5 h-3.5 text-amber-300" />
            <span>The 12 Holy Saint-Poets • பன்னிரு ஆழ்வார்கள்</span>
          </div>
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-amber-100">
            The Holy Āḻvārs
          </h1>
          <p className="text-sm sm:text-base text-amber-100/85 leading-relaxed font-sans">
            The Āḻvārs ("those who are deeply immersed in divine love of God") are the 12 supreme poet-saints of ancient Tamil Nadu who revealed the 4,000 Divya Prabandham hymns between the 5th and 10th centuries CE.
          </p>
        </div>

        <div className="shrink-0 w-full sm:w-64 h-36 rounded-md overflow-hidden border border-amber-400/40 shadow-md">
          <img
            src={alwarsTwelveImg}
            alt="The 12 Holy Alwars"
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white rounded-lg border border-stone-200 p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-96">
          <input
            type="text"
            placeholder="Search by Āḻvār name, birth star, or birthplace..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-sm bg-stone-50 border border-stone-200 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500"
          />
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5 pointer-events-none" />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-3 text-xs text-stone-400 hover:text-stone-600"
            >
              Clear
            </button>
          )}
        </div>

        <div className="text-xs text-stone-500 font-medium">
          Showing <strong>{alwars.length}</strong> of 12 Āḻvārs
        </div>
      </div>

      {/* Āḻvārs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {alwars.map((alwar) => {
          const relationData = dataService.getAlwarWithRelations(alwar.alwar_id);
          const templesCount = relationData?.divyaDesams.length || 0;
          const pasuramsCount = relationData?.pasurams.length || 0;
          const thumb = getAlwarThumbnail(alwar.alwar_id);

          return (
            <div
              key={alwar.alwar_id}
              onClick={() => onNavigate({ type: 'alwar-detail', alwarId: alwar.alwar_id })}
              className="bg-white rounded-lg border border-stone-200 hover:border-amber-400 hover:shadow-md transition-all cursor-pointer p-5 flex flex-col justify-between space-y-4 group overflow-hidden"
            >
              <div className="space-y-3">
                {/* Optional sacred image header if available */}
                {thumb && (
                  <div className="h-32 -mx-5 -mt-5 mb-3 overflow-hidden bg-stone-900 border-b border-amber-200/60">
                    <img
                      src={thumb}
                      alt={alwar.name}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                )}

                {/* Header with Title and Tamil Name */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-display font-bold text-lg text-stone-900 group-hover:text-red-900 transition-colors">
                      {alwar.name}
                    </h3>
                    <div className="font-tamil text-sm text-red-900 font-medium mt-1 leading-relaxed">
                      {alwar.tamil_name}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 border border-amber-200">
                      {alwar.total_pasurams_count} hymns
                    </span>
                  </div>
                </div>

                {/* Avatar symbol if present */}
                {alwar.avatar_symbol && (
                  <div className="text-xs text-red-800 font-medium bg-red-50/80 px-2.5 py-1 rounded-md border border-red-100 flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-red-600" />
                    <span>Avatar: {alwar.avatar_symbol}</span>
                  </div>
                )}

                {/* Star, Period, Birthplace */}
                <div className="space-y-1.5 text-xs text-stone-600 pt-1">
                  <div className="flex items-center gap-1.5">
                    <Star className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span>Star: <strong className="text-stone-800">{alwar.birth_star}</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                    <span>Birthplace: <strong className="text-stone-800">{alwar.birth_place}</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                    <span>Period: <strong className="text-stone-800">{alwar.period}</strong></span>
                  </div>
                </div>

                {/* Biography snippet */}
                <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed pt-1">
                  {alwar.biography}
                </p>
              </div>

              {/* Card Footer with Relation Counts & CTA */}
              <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3 text-stone-500">
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-3 h-3 text-amber-600" />
                    <span>{pasuramsCount} cataloged</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-amber-600" />
                    <span>{templesCount} temples</span>
                  </span>
                </div>

                <div className="font-semibold text-amber-800 group-hover:text-amber-950 flex items-center gap-1 transition-colors">
                  <span>Profile</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
