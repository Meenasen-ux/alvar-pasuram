import React, { useState } from 'react';
import { ActiveView } from '../../types';
import { dataService } from '../../services/dataService';
import { TamilVerseDisplay } from '../common/TamilVerseDisplay';
import { 
  ArrowRight, 
  BookOpen, 
  Calendar, 
  ChevronRight, 
  MapPin, 
  RefreshCw, 
  Sparkles, 
  Tag, 
  Users 
} from 'lucide-react';

import perumalUtsavarImg from '../../assets/images/perumal_utsavar_1789826238414.jpg';
import alwarsTwelveImg from '../../assets/images/alwars_twelve_vigrahams_1789826261263.jpg';
import thirumangaiImg from '../../assets/images/thirumangai_utsavar_1789826278155.jpg';
import andalDivineImg from '../../assets/images/andal_nachiyar_divine_1789826295914.jpg';
import templeHeroImg from '../../assets/images/divya_desam_gopuram_theertham_1789827007490.jpg';

interface HomePageProps {
  onNavigate: (view: ActiveView) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const [dailyVerseOffset, setDailyVerseOffset] = useState(0);
  const allPasurams = dataService.getAllPasurams();
  const themes = dataService.getAllThemes();

  // Get daily pasuram or rotated one
  const defaultDaily = dataService.getDailyPasuram();
  const currentPasuramIndex = (allPasurams.findIndex(p => p.pasuram_id === defaultDaily.pasuram_id) + dailyVerseOffset + allPasurams.length) % allPasurams.length;
  const currentDailyPasuram = dataService.getPasuramWithRelations(allPasurams[currentPasuramIndex].pasuram_id)!;

  const handleNextVerse = () => {
    setDailyVerseOffset(prev => prev + 1);
  };

  return (
    <div className="space-y-12 sm:space-y-16 pb-12">
      {/* 5. HERO SECTION (Redesigned closely matching the attached reference design) */}
      <section className="relative overflow-hidden rounded-2xl bg-[#3D0A0C] border border-[#5B1717] shadow-xl text-[#F8F3E8] min-h-[380px] sm:min-h-[420px] lg:min-h-[460px] flex items-center">
        {/* Temple Visual Layer on Right with Deep Maroon Gradient Blending */}
        <div className="absolute inset-y-0 right-0 w-full lg:w-7/12 overflow-hidden">
          <img
            src={templeHeroImg}
            alt="Divya Desam Sacred Gopuram and Pushkarini Theertham"
            className="w-full h-full object-cover object-center lg:object-right"
            referrerPolicy="no-referrer"
          />
          {/* Smooth Deep Maroon Gradient Blend Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#3D0A0C] via-[#4A0F0F]/95 via-35% sm:via-45% to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#3D0A0C] via-transparent to-transparent lg:hidden"></div>
        </div>

        {/* Subtle Lotus Line-Art Background Watermark on Far Left */}
        <div className="absolute -bottom-10 -left-10 w-72 h-72 opacity-[0.06] pointer-events-none text-[#C99A32]">
          <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full">
            <path d="M50 15 C44 32 28 44 8 50 C28 56 44 68 50 85 C56 68 72 56 92 50 C72 44 56 32 50 15 Z" />
            <circle cx="50" cy="50" r="12" />
          </svg>
        </div>

        {/* Hero Content Container */}
        <div className="relative z-10 w-full px-6 sm:px-10 lg:px-14 py-10 sm:py-12">
          <div className="max-w-xl space-y-5">
            <div className="text-[#D9AD4A] text-xs sm:text-[13px] tracking-[0.22em] uppercase font-normal">
              NĀLĀYIRA DIVYA PRABANDHAM
            </div>

            <h1 className="font-normal text-3xl sm:text-5xl lg:text-[48px] tracking-normal text-[#FAF6EE] leading-[1.12]">
              Āḻvār Pasuram &amp;<br />
              <span className="text-[#D9AD4A]">108 Divya Desams</span>
            </h1>

            <p className="italic text-base sm:text-lg text-[#E5D5C0] font-normal leading-relaxed">
              Explore the divine hymns of the Āḻvārs, the 108 sacred Divya Desams, and the timeless wisdom of the Tamil Veda.
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => onNavigate({ type: 'pasurams' })}
                className="px-6 py-2.5 rounded-md bg-[#D9AD4A] hover:bg-[#E5BE64] text-[#241B18] font-normal text-sm sm:text-[15px] shadow-sm inline-flex items-center gap-2 transition-all cursor-pointer"
              >
                <span>Explore Pasurams</span>
                <span className="text-base leading-none">&rarr;</span>
              </button>

              <button
                onClick={() => onNavigate({ type: 'divyadesams' })}
                className="px-6 py-2.5 rounded-md border border-[#FAF6EE]/40 hover:border-[#D9AD4A] bg-[#2A0709]/60 hover:bg-[#2A0709]/80 text-[#FAF6EE] font-normal text-sm sm:text-[15px] transition-all cursor-pointer"
              >
                View 108 Divya Desams
              </button>
            </div>
          </div>

          {/* Bottom Center Decorative Lotus Rule inside Card */}
          <div className="mt-8 pt-4 flex items-center justify-center gap-4 text-[#C99A32]/70">
            <div className="h-[1px] w-24 sm:w-36 bg-gradient-to-r from-transparent to-[#C99A32]/70"></div>
            <div className="text-[#D9AD4A] text-lg select-none">🪷</div>
            <div className="h-[1px] w-24 sm:w-36 bg-gradient-to-l from-transparent to-[#C99A32]/70"></div>
          </div>
        </div>
      </section>

      {/* Prominent Classical Literary Quote directly below Hero Card (matching image.png) */}
      <div className="pt-2 pb-1 flex items-center justify-center gap-4 sm:gap-6">
        <div className="h-[1px] w-16 sm:w-28 bg-[#C99A32]/45"></div>
        <blockquote className="italic text-lg sm:text-2xl text-[#4A0F0F] tracking-wide text-center font-normal">
          &ldquo;In every pasuram, a path to the Divine.&rdquo;
        </blockquote>
        <div className="h-[1px] w-16 sm:w-28 bg-[#C99A32]/45"></div>
      </div>

      {/* SACRED DARŚANA & HERITAGE GALLERY (Utilizing the 4 user images) */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-3 border-b border-[#C99A32]/30">
          <div>
            <h2 className="font-normal text-2xl sm:text-3xl text-[#4A0F0F]">
              Sacred Heritage Gallery
            </h2>
            <p className="italic text-sm text-stone-600 mt-1 font-normal">
              Divine Darśana of the Presiding Deities, Holy Āḻvārs, and Sacred Sanctuaries
            </p>
          </div>
          <span className="text-xs text-[#5B1717] font-tamil font-normal">
            திவ்ய தரிசனம் &amp; பன்னிரு ஆழ்வார்கள்
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Item 1: Perumal Utsavar */}
          <div 
            onClick={() => onNavigate({ type: 'temple-detail', templeId: 'dd-01-srirangam' })}
            className="group cursor-pointer bg-white rounded-lg border border-stone-200 hover:border-[#C99A32] overflow-hidden shadow-2xs hover:shadow-md transition-all flex flex-col"
          >
            <div className="h-48 overflow-hidden bg-stone-900 relative">
              <img
                src={perumalUtsavarImg}
                alt="Perumal Utsavar"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
              <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-sm bg-stone-950/80 backdrop-blur-xs text-[#E5C583] text-[11px] font-normal border border-[#C99A32]/40">
                Srirangam Koil
              </span>
            </div>
            <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
              <div>
                <h3 className="font-normal text-lg text-[#241B18] group-hover:text-[#4A0F0F] transition-colors">
                  Sri Namperumal
                </h3>
                <p className="font-tamil text-xs text-[#5B1717] font-normal mt-0.5">
                  ரங்கநாதர் உத்சவர்
                </p>
                <p className="text-xs text-stone-600 leading-relaxed mt-1.5 font-normal">
                  Adorned with the golden Ratna Kireetam, jewels, and fragrant jasmine garlands at Srirangam.
                </p>
              </div>
              <div className="pt-2 text-xs font-normal text-[#5B1717] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                <span>View Srirangam</span>
                <ChevronRight className="w-3.5 h-3.5 text-[#C99A32]" />
              </div>
            </div>
          </div>

          {/* Item 2: Twelve Alwars */}
          <div 
            onClick={() => onNavigate({ type: 'alwars' })}
            className="group cursor-pointer bg-white rounded-lg border border-stone-200 hover:border-[#C99A32] overflow-hidden shadow-2xs hover:shadow-md transition-all flex flex-col"
          >
            <div className="h-48 overflow-hidden bg-stone-900 relative">
              <img
                src={alwarsTwelveImg}
                alt="Twelve Alwars Vigrahams"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
              <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-sm bg-stone-950/80 backdrop-blur-xs text-[#E5C583] text-[11px] font-normal border border-[#C99A32]/40">
                12 Saint-Poets
              </span>
            </div>
            <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
              <div>
                <h3 className="font-normal text-lg text-[#241B18] group-hover:text-[#4A0F0F] transition-colors">
                  The 12 Holy Āḻvārs
                </h3>
                <p className="font-tamil text-xs text-[#5B1717] font-normal mt-0.5">
                  பன்னிரு ஆழ்வார்கள் விக்ரஹங்கள்
                </p>
                <p className="text-xs text-stone-600 leading-relaxed mt-1.5 font-normal">
                  Sacred bronze vigrahams in devotional posture, who sang the 4,000 Divya Prabandham verses.
                </p>
              </div>
              <div className="pt-2 text-xs font-normal text-[#5B1717] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                <span>View All 12 Āḻvārs</span>
                <ChevronRight className="w-3.5 h-3.5 text-[#C99A32]" />
              </div>
            </div>
          </div>

          {/* Item 3: Thirumangai Alwar */}
          <div 
            onClick={() => onNavigate({ type: 'alwar-detail', alwarId: 'thirumangai-alwar' })}
            className="group cursor-pointer bg-white rounded-lg border border-stone-200 hover:border-[#C99A32] overflow-hidden shadow-2xs hover:shadow-md transition-all flex flex-col"
          >
            <div className="h-48 overflow-hidden bg-stone-900 relative">
              <img
                src={thirumangaiImg}
                alt="Thirumangai Alwar Utsavar"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
              <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-sm bg-stone-950/80 backdrop-blur-xs text-[#E5C583] text-[11px] font-normal border border-[#C99A32]/40">
                Parakala Nayaki
              </span>
            </div>
            <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
              <div>
                <h3 className="font-normal text-lg text-[#241B18] group-hover:text-[#4A0F0F] transition-colors">
                  Thirumaṅgai Āḻvār
                </h3>
                <p className="font-tamil text-xs text-[#5B1717] font-normal mt-0.5">
                  திருமங்கையாழ்வார் மங்களாசாசனம்
                </p>
                <p className="text-xs text-stone-600 leading-relaxed mt-1.5 font-normal">
                  The heroic poet-pilgrim holding the sacred spear (Vel), who sang hymns at 86 Divya Desams.
                </p>
              </div>
              <div className="pt-2 text-xs font-normal text-[#5B1717] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                <span>View Thirumangai</span>
                <ChevronRight className="w-3.5 h-3.5 text-[#C99A32]" />
              </div>
            </div>
          </div>

          {/* Item 4: Andal Nachiyar */}
          <div 
            onClick={() => onNavigate({ type: 'alwar-detail', alwarId: 'andal' })}
            className="group cursor-pointer bg-white rounded-lg border border-stone-200 hover:border-[#C99A32] overflow-hidden shadow-2xs hover:shadow-md transition-all flex flex-col"
          >
            <div className="h-48 overflow-hidden bg-stone-900 relative">
              <img
                src={andalDivineImg}
                alt="Sri Andal Nachiyar and Rangamannar"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
              <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-sm bg-stone-950/80 backdrop-blur-xs text-[#E5C583] text-[11px] font-normal border border-[#C99A32]/40">
                Soodikkodutha Sudarkodi
              </span>
            </div>
            <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
              <div>
                <h3 className="font-normal text-lg text-[#241B18] group-hover:text-[#4A0F0F] transition-colors">
                  Sri Āṇḍāḷ Nāchiyār
                </h3>
                <p className="font-tamil text-xs text-[#5B1717] font-normal mt-0.5">
                  சூடிக்கொடுத்த சுடர்க்கொடி ஆண்டாள்
                </p>
                <p className="text-xs text-stone-600 leading-relaxed mt-1.5 font-normal">
                  The incarnation of Sri Bhūmi Devī who composed the revered Tiruppāvai and Nāchiyār Tirumoḻi.
                </p>
              </div>
              <div className="pt-2 text-xs font-normal text-[#5B1717] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                <span>View Āṇḍāḷ</span>
                <ChevronRight className="w-3.5 h-3.5 text-[#C99A32]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DAILY PASURAM SECTION */}
      <section className="bg-white rounded-xl border border-stone-200/90 shadow-2xs p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-stone-200">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-md bg-[#FAF7F0] border border-[#C99A32]/40 text-[#4A0F0F] flex items-center justify-center">
              <Calendar className="w-4 h-4 text-[#C99A32]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-normal text-xl sm:text-2xl text-[#4A0F0F]">
                  Daily Pasuram for Reflection
                </h2>
                <span className="text-xs px-2 py-0.5 rounded-md bg-amber-50 text-[#5B1717] border border-amber-200 font-tamil font-normal">
                  தினம் ஒரு பாசுரம்
                </span>
              </div>
              <p className="italic text-xs text-stone-600 mt-0.5 font-normal">
                Immerse your day with a contemplative hymn from the Nalayira Divya Prabandham
              </p>
            </div>
          </div>

          <button
            onClick={handleNextVerse}
            className="self-start sm:self-auto flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-stone-300 text-stone-700 hover:bg-[#FAF7F0] text-xs font-normal transition-colors cursor-pointer"
            title="Read another verse"
          >
            <RefreshCw className="w-3.5 h-3.5 text-stone-500" />
            <span>Cycle Another Verse</span>
          </button>
        </div>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Verse Display */}
          <div className="lg:col-span-7">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-normal text-[#5B1717]">
                <span>{currentDailyPasuram.prabandham_name}</span>
                <span>•</span>
                <span>Verse #{currentDailyPasuram.verse_number}</span>
              </div>
            </div>

            <TamilVerseDisplay
              tamilText={currentDailyPasuram.tamil_text}
              transliteration={currentDailyPasuram.transliteration}
              showControls={true}
            />
          </div>

          {/* Meaning, Composer & Actions */}
          <div className="lg:col-span-5 space-y-4">
            {/* Meaning card */}
            <div className="bg-[#FAF7F0] rounded-lg p-5 border border-[#C99A32]/25 space-y-2.5">
              <h3 className="font-normal text-xs text-[#4A0F0F] uppercase tracking-wider flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#C99A32]" />
                <span>English Meaning</span>
              </h3>
              <p className="italic text-sm sm:text-[15px] text-stone-800 leading-relaxed pt-1 font-normal">
                &ldquo;{currentDailyPasuram.english_meaning}&rdquo;
              </p>
            </div>

            {/* Composer & Temples attribution */}
            <div className="bg-stone-50 rounded-lg p-5 border border-stone-200/80 space-y-3">
              {/* Composer */}
              <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                <div className="text-xs text-stone-500 font-normal">Composer</div>
                <button
                  onClick={() => onNavigate({ type: 'alwar-detail', alwarId: currentDailyPasuram.alwar_id })}
                  className="text-xs font-normal text-[#5B1717] hover:underline flex items-center gap-1.5 cursor-pointer"
                >
                  <span>{currentDailyPasuram.alwar?.name}</span>
                  <span className="font-tamil">({currentDailyPasuram.alwar?.tamil_name})</span>
                </button>
              </div>

              {/* Associated Temples */}
              <div className="space-y-1.5">
                <div className="text-xs text-stone-500 font-normal">Associated Divya Desams:</div>
                <div className="flex flex-wrap gap-1.5">
                  {currentDailyPasuram.divyaDesams.map((temple) => (
                    <button
                      key={temple.temple_id}
                      onClick={() => onNavigate({ type: 'temple-detail', templeId: temple.temple_id })}
                      className="px-2.5 py-1 rounded-md bg-white border border-stone-200 text-stone-800 hover:border-[#C99A32] text-xs font-normal transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <MapPin className="w-3 h-3 text-[#C99A32]" />
                      <span>{temple.temple_name.split('(')[0]}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Themes */}
              <div className="space-y-1.5 pt-1">
                <div className="text-xs text-stone-500 font-normal">Theological Themes:</div>
                <div className="flex flex-wrap gap-1.5">
                  {currentDailyPasuram.themes.map((theme) => (
                    <button
                      key={theme.theme_id}
                      onClick={() => onNavigate({ type: 'pasurams', filterThemeId: theme.theme_id })}
                      className="px-2.5 py-0.5 rounded-md bg-amber-100/70 text-[#5B1717] text-[11px] font-normal hover:bg-amber-200 transition-colors cursor-pointer"
                    >
                      {theme.theme_name.split('(')[0]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Full details action */}
              <div className="pt-2">
                <button
                  onClick={() => onNavigate({ type: 'pasuram-detail', pasuramId: currentDailyPasuram.pasuram_id })}
                  className="w-full py-2.5 px-4 rounded-md bg-[#5B1717] hover:bg-[#4A0F0F] text-[#FAF7F0] font-normal text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
                >
                  <span>View Full Pasuram &amp; Commentary</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CORE PILLARS / EXPLORATION PORTALS */}
      <section className="space-y-6">
        <div>
          <h2 className="font-normal text-2xl sm:text-3xl text-[#4A0F0F]">
            Exploration Portals
          </h2>
          <p className="italic text-sm text-stone-600 mt-0.5 font-normal">
            Navigate through the three canonical pillars of the Sri Vaishnava poetic universe
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: 12 Alwars */}
          <div 
            onClick={() => onNavigate({ type: 'alwars' })}
            className="group cursor-pointer bg-white rounded-xl border border-stone-200/90 p-6 hover:shadow-md hover:border-[#C99A32] transition-all space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-11 h-11 rounded-md bg-[#FAF7F0] border border-[#C99A32]/30 text-[#5B1717] flex items-center justify-center group-hover:scale-105 transition-transform">
                <Users className="w-5 h-5 text-[#C99A32]" />
              </div>
              <h3 className="font-normal text-xl text-[#241B18] group-hover:text-[#4A0F0F] transition-colors">
                The 12 Holy Āḻvārs
              </h3>
              <p className="text-xs text-stone-500 font-tamil font-normal leading-relaxed">
                பன்னிரு ஆழ்வார்கள்
              </p>
              <p className="text-sm text-stone-600 leading-relaxed font-normal">
                Discover the lives, divine avatar symbols, birth stars, periods, and complete biographies of all twelve saint-poets.
              </p>
            </div>
            <div className="pt-2 flex items-center text-xs font-normal text-[#5B1717] gap-1 group-hover:gap-2 transition-all">
              <span>View All 12 Āḻvārs</span>
              <ChevronRight className="w-4 h-4 text-[#C99A32]" />
            </div>
          </div>

          {/* Card 2: Pasuram Explorer */}
          <div 
            onClick={() => onNavigate({ type: 'pasurams' })}
            className="group cursor-pointer bg-white rounded-xl border border-stone-200/90 p-6 hover:shadow-md hover:border-[#C99A32] transition-all space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-11 h-11 rounded-md bg-[#FAF7F0] border border-[#C99A32]/30 text-[#5B1717] flex items-center justify-center group-hover:scale-105 transition-transform">
                <BookOpen className="w-5 h-5 text-[#C99A32]" />
              </div>
              <h3 className="font-normal text-xl text-[#241B18] group-hover:text-[#4A0F0F] transition-colors">
                Pasuram Explorer
              </h3>
              <p className="text-xs text-stone-500 font-tamil font-normal leading-relaxed">
                நாலாயிர திவ்வியப் பிரபந்தம்
              </p>
              <p className="text-sm text-stone-600 leading-relaxed font-normal">
                Search and multi-filter across verses, transliterations, line-by-line meanings, traditional commentaries, and theological themes.
              </p>
            </div>
            <div className="pt-2 flex items-center text-xs font-normal text-[#5B1717] gap-1 group-hover:gap-2 transition-all">
              <span>Launch Pasuram Explorer</span>
              <ChevronRight className="w-4 h-4 text-[#C99A32]" />
            </div>
          </div>

          {/* Card 3: 108 Divya Desams */}
          <div 
            onClick={() => onNavigate({ type: 'divyadesams' })}
            className="group cursor-pointer bg-white rounded-xl border border-stone-200/90 p-6 hover:shadow-md hover:border-[#C99A32] transition-all space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-11 h-11 rounded-md bg-[#FAF7F0] border border-[#C99A32]/30 text-[#5B1717] flex items-center justify-center group-hover:scale-105 transition-transform">
                <MapPin className="w-5 h-5 text-[#C99A32]" />
              </div>
              <h3 className="font-normal text-xl text-[#241B18] group-hover:text-[#4A0F0F] transition-colors">
                108 Divya Desams
              </h3>
              <p className="text-xs text-stone-500 font-tamil font-normal leading-relaxed">
                நூற்றெட்டுத் திருப்பதிகள்
              </p>
              <p className="text-sm text-stone-600 leading-relaxed font-normal">
                Explore sacred geography spanning Chola Nadu, Pandiya Nadu, Thondai Nadu, Malai Nadu, Vada Nadu, and celestial realms.
              </p>
            </div>
            <div className="pt-2 flex items-center text-xs font-normal text-[#5B1717] gap-1 group-hover:gap-2 transition-all">
              <span>Explore Temples &amp; Geography</span>
              <ChevronRight className="w-4 h-4 text-[#C99A32]" />
            </div>
          </div>
        </div>
      </section>

      {/* THEMES EXPLORATION */}
      <section className="bg-[#FAF7F0] rounded-xl border border-[#C99A32]/30 p-6 sm:p-8 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#C99A32]/30">
          <div>
            <h3 className="font-normal text-xl sm:text-2xl text-[#4A0F0F] flex items-center gap-2">
              <Tag className="w-4 h-4 text-[#C99A32]" />
              <span>Explore by Spiritual Theme</span>
            </h3>
            <p className="italic text-xs text-stone-600 mt-0.5 font-normal">
              Select any core theological philosophy to explore matching Pasurams
            </p>
          </div>
          <button
            onClick={() => onNavigate({ type: 'themes' })}
            className="text-xs font-normal text-[#5B1717] hover:text-[#4A0F0F] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>View All Themes</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
          {themes.map((theme) => (
            <button
              key={theme.theme_id}
              onClick={() => onNavigate({ type: 'pasurams', filterThemeId: theme.theme_id })}
              className="text-left bg-white p-3.5 rounded-lg border border-stone-200/80 hover:border-[#C99A32] hover:shadow-xs transition-all group cursor-pointer"
            >
              <div className="font-normal text-sm sm:text-base text-[#241B18] group-hover:text-[#4A0F0F]">
                {theme.theme_name}
              </div>
              <p className="text-[12px] text-stone-600 line-clamp-2 mt-1 leading-relaxed font-normal">
                {theme.description}
              </p>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};
