import React, { useState } from 'react';
import { ActiveView } from '../../types';
import { dataService } from '../../services/dataService';
import { 
  BookOpen, 
  ChevronRight, 
  MapPin, 
  Search, 
  Users 
} from 'lucide-react';

import perumalUtsavarImg from '../../assets/images/perumal_utsavar_1789826238414.jpg';

interface DivyaDesamsPageProps {
  onNavigate: (view: ActiveView) => void;
}

const REGION_OPTIONS = [
  { id: 'all', label: 'All Regions' },
  { id: 'Chola Nadu', label: 'Chola Nadu (சோழ நாடு)' },
  { id: 'Pandiya Nadu', label: 'Pandiya Nadu (பாண்டிய நாடு)' },
  { id: 'Thondai Nadu', label: 'Thondai Nadu (தொண்டை நாடு)' },
  { id: 'Nadunaadu', label: 'Nadunaadu (நடு நாடு)' },
  { id: 'Malai Nadu', label: 'Malai Nadu / Kerala (மலை நாடு)' },
  { id: 'Vada Nadu', label: 'Vada Nadu / North India (வட நாடு)' },
  { id: 'Vinnulagam', label: 'Celestial / Vinnulagam (விண்ணுலகம்)' },
];

export const DivyaDesamsPage: React.FC<DivyaDesamsPageProps> = ({ onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('all');

  const filteredTemples = dataService.searchDivyaDesams(searchQuery, selectedRegion);

  return (
    <div className="space-y-8 pb-14">
      {/* Header Banner */}
      <div className="bg-linear-to-r from-[#173024] via-[#244837] to-[#12261C] rounded-lg text-emerald-50 p-6 sm:p-8 shadow-lg border border-emerald-500/30 flex flex-col md:flex-row items-center gap-6 justify-between">
        <div className="max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-500/20 text-emerald-200 text-xs font-semibold border border-emerald-400/30">
            <MapPin className="w-3.5 h-3.5 text-emerald-300" />
            <span>The 108 Sacred Sanctuaries • நூற்றெட்டுத் திருப்பதிகள்</span>
          </div>
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-emerald-100">
            108 Divya Desams
          </h1>
          <p className="text-sm sm:text-base text-emerald-100/85 leading-relaxed font-sans">
            The Divya Desams are the 108 supreme Vishnu temples canonized by the Mangalasasanam (sacred devotional hymns) of the 12 Āḻvārs, spanning the historic realms of Tamil Nadu, Kerala, Andhra Pradesh, Gujarat, Uttar Pradesh, Uttarakhand, and the transcendental celestial spheres.
          </p>
        </div>

        <div className="shrink-0 w-full sm:w-64 h-36 rounded-md overflow-hidden border border-emerald-400/40 shadow-md">
          <img
            src={perumalUtsavarImg}
            alt="Sri Ranganatha Perumal Srirangam"
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>

      {/* SEARCH AND REGION TABS */}
      <div className="bg-white rounded-lg border border-stone-200 p-5 sm:p-6 shadow-xs space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Search bar */}
          <div className="relative w-full md:w-96">
            <input
              type="text"
              placeholder="Search temple name, deity, goddess, or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-stone-50 border border-stone-200 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
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
            Displaying <strong>{filteredTemples.length}</strong> Divya Desams
          </div>
        </div>

        {/* Region filter pills (less rounded) */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-stone-100">
          {REGION_OPTIONS.map((region) => (
            <button
              key={region.id}
              onClick={() => setSelectedRegion(region.id)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                selectedRegion === region.id
                  ? 'bg-emerald-800 text-white shadow-xs font-semibold'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200/70'
              }`}
            >
              {region.label}
            </button>
          ))}
        </div>
      </div>

      {/* TEMPLES GRID */}
      {filteredTemples.length === 0 ? (
        <div className="bg-white rounded-lg border border-stone-200 p-12 text-center space-y-4">
          <MapPin className="w-10 h-10 text-stone-400 mx-auto" />
          <h3 className="font-display font-bold text-lg text-stone-800">
            No Divya Desams match the current filter criteria
          </h3>
          <p className="text-xs text-stone-500">
            Try resetting your search query or selecting "All Regions".
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedRegion('all');
            }}
            className="px-4 py-2 rounded-md bg-emerald-700 text-white text-xs font-medium hover:bg-emerald-800 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemples.map((temple) => {
            const relations = dataService.getDivyaDesamWithRelations(temple.temple_id);
            const alwarsCount = relations?.alwars.length || temple.associated_alwar_ids.length;
            const pasuramsCount = relations?.pasurams.length || 0;
            const isSrirangam = temple.temple_id === 'dd-01-srirangam';

            return (
              <div
                key={temple.temple_id}
                onClick={() => onNavigate({ type: 'temple-detail', templeId: temple.temple_id })}
                className="bg-white rounded-lg border border-stone-200 hover:border-emerald-500 hover:shadow-md transition-all cursor-pointer p-5 flex flex-col justify-between space-y-4 group overflow-hidden"
              >
                <div className="space-y-3">
                  {/* Srirangam special preview image */}
                  {isSrirangam && (
                    <div className="h-32 -mx-5 -mt-5 mb-3 overflow-hidden bg-stone-900 border-b border-emerald-200">
                      <img
                        src={perumalUtsavarImg}
                        alt="Lord Sri Ranganatha"
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  )}

                  {/* Region badge and Location */}
                  <div className="flex items-center justify-between text-xs">
                    <span className="px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-800 font-semibold border border-emerald-200">
                      {temple.region}
                    </span>
                    <span className="text-stone-500 text-[11px]">
                      {temple.district ? `${temple.district}, ` : ''}{temple.state}
                    </span>
                  </div>

                  {/* Temple Name & Tamil Name */}
                  <div>
                    <h3 className="font-display font-bold text-lg text-stone-900 group-hover:text-emerald-800 transition-colors leading-snug">
                      {temple.temple_name}
                    </h3>
                    <div className="font-tamil text-sm text-red-900 font-medium mt-1 leading-relaxed">
                      {temple.tamil_name}
                    </div>
                  </div>

                  {/* Deity & Goddess */}
                  <div className="space-y-1.5 text-xs text-stone-600 bg-stone-50 rounded-md p-3 border border-stone-200/70">
                    <div>
                      <span className="text-stone-400 font-medium">Deity: </span>
                      <strong className="text-stone-800">{temple.presiding_deity.split('(')[0]}</strong>
                    </div>
                    <div>
                      <span className="text-stone-400 font-medium">Thāyār: </span>
                      <strong className="text-stone-800">{temple.goddess}</strong>
                    </div>
                  </div>

                  {/* History snippet */}
                  <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed pt-1">
                    {temple.history}
                  </p>
                </div>

                {/* Card Footer */}
                <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3 text-stone-500">
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3 text-emerald-600" />
                      <span>{alwarsCount} Āḻvārs</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <BookOpen className="w-3 h-3 text-emerald-600" />
                      <span>{pasuramsCount} in KB</span>
                    </span>
                  </div>

                  <div className="font-semibold text-emerald-800 group-hover:text-emerald-950 flex items-center gap-1 transition-colors">
                    <span>Temple Page</span>
                    <ChevronRight className="w-3.5 h-3.5" />
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
