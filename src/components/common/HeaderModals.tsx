import React, { useState } from 'react';
import { BookOpen, Calendar, Check, Globe, Heart, Sparkles, X, Search, ChevronRight } from 'lucide-react';
import { ActiveView } from '../../types';
import { dataService } from '../../services/dataService';

export type HeaderModalType = 'about' | 'festivals' | 'contribute' | 'search' | null;

interface HeaderModalsProps {
  modalType: HeaderModalType;
  onClose: () => void;
  onNavigate: (view: ActiveView) => void;
}

export const HeaderModals: React.FC<HeaderModalsProps> = ({ modalType, onClose, onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');

  if (!modalType) return null;

  const pasurams = dataService.getAllPasurams();
  const alwars = dataService.getAllAlwars();
  const temples = dataService.getAllDivyaDesams();

  const filteredPasurams = searchQuery.trim()
    ? pasurams.filter(p =>
        p.prabandham_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.english_meaning.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.verse_number.toString() === searchQuery.trim()
      ).slice(0, 4)
    : [];

  const filteredAlwars = searchQuery.trim()
    ? alwars.filter(a =>
        a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.tamil_name.includes(searchQuery.trim())
      ).slice(0, 3)
    : [];

  const filteredTemples = searchQuery.trim()
    ? temples.filter(t =>
        t.temple_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.region.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 4)
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-[#FAF7F0] border border-[#C99A32]/40 rounded-xl shadow-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto relative text-[#241B18]"
        role="dialog"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-stone-500 hover:text-stone-900 hover:bg-stone-200/60 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* ABOUT MODAL */}
        {modalType === 'about' && (
          <div className="p-6 sm:p-8 space-y-5">
            <div className="flex items-center gap-2.5 text-[#5B1717]">
              <BookOpen className="w-5 h-5 text-[#C99A32]" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#C99A32]">
                Heritage Archive
              </span>
            </div>
            
            <h2 className="font-serif-classical font-bold text-2xl sm:text-3xl text-[#4A0F0F] leading-tight">
              About Āḻvār Pasuram &amp; 108 Divya Desams
            </h2>

            <p className="font-tamil text-sm text-[#5B1717] font-semibold">
              நாலாயிர திவ்வியப் பிரபந்தம் &amp; நூற்றெட்டுத் திருப்பதிகள் மின்னூல் களஞ்சியம்
            </p>

            <div className="space-y-3.5 text-sm text-stone-700 leading-relaxed font-sans">
              <p>
                The <strong>Āḻvār Pasuram &amp; 108 Divya Desams</strong> platform is a premier digital humanities and spiritual heritage archive dedicated to the timeless devotional works of the twelve <strong>Āḻvārs</strong>—the revered mystic poet-saints of ancient Tamil Nadu.
              </p>
              <p>
                Spanning the 5th through 10th centuries CE, these saint-poets poured their profound love, theological insight, and spiritual longing for <em>Śrīman Nārāyaṇa</em> into 4,000 verses known collectively as the <strong>Nālāyira Divya Prabandham</strong> (the Tamil Veda).
              </p>
              <p>
                Each verse is mapped directly to the holy <strong>108 Divya Desam</strong> shrines celebrated by the Āḻvārs in their <em>maṅgalāśāsanam</em> (sanctifying hymns), offering seekers, scholars, and devotees structured access to original Tamil verses, romanized transliteration, word meanings, and traditional Achārya commentaries.
              </p>
            </div>

            <div className="pt-3 border-t border-[#C99A32]/30 flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs text-stone-500 italic">
                Śrīmate Rāmānujāya Namaḥ
              </span>
              <button
                onClick={onClose}
                className="px-5 py-2 rounded-md bg-[#5B1717] text-[#FAF7F0] text-xs font-semibold hover:bg-[#4A0F0F] transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* FESTIVALS MODAL */}
        {modalType === 'festivals' && (
          <div className="p-6 sm:p-8 space-y-5">
            <div className="flex items-center gap-2.5 text-[#5B1717]">
              <Calendar className="w-5 h-5 text-[#C99A32]" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#C99A32]">
                Sacred Traditions
              </span>
            </div>

            <h2 className="font-serif-classical font-bold text-2xl sm:text-3xl text-[#4A0F0F] leading-tight">
              Festivals of the Divya Prabandham
            </h2>

            <p className="font-tamil text-sm text-[#5B1717] font-semibold">
              திவ்வியப் பிரபந்த திருவிழாக்கள் &amp; உத்ஸவங்கள்
            </p>

            <div className="space-y-4 pt-1">
              <div className="p-4 rounded-lg bg-white border border-stone-200/80 space-y-1.5">
                <div className="flex items-center justify-between text-xs font-bold text-[#5B1717]">
                  <span className="font-serif-classical text-base">Thiruadhyayana Utsavam</span>
                  <span className="px-2 py-0.5 rounded bg-amber-100 text-[#5B1717]">Margazhi (Dec-Jan)</span>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  The grand 21-day festival across Divya Desams where all 4,000 verses are recited in front of the Lord, divided into <em>Pagal Pathu</em> (daytime recitation) and <em>Raa Pathu</em> (night recitation).
                </p>
              </div>

              <div className="p-4 rounded-lg bg-white border border-stone-200/80 space-y-1.5">
                <div className="flex items-center justify-between text-xs font-bold text-[#5B1717]">
                  <span className="font-serif-classical text-base">Vaikuntha Ekadashi</span>
                  <span className="px-2 py-0.5 rounded bg-amber-100 text-[#5B1717]">Dhanur Masa</span>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  The supreme festival when the <em>Paramapada Vaasal</em> (Gate of Vaikuntha) opens at dawn, celebrated with Nammāḻvār's Tiruvāymoḻi.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-white border border-stone-200/80 space-y-1.5">
                <div className="flex items-center justify-between text-xs font-bold text-[#5B1717]">
                  <span className="font-serif-classical text-base">Āṇḍāḷ Thiruvadipooram</span>
                  <span className="px-2 py-0.5 rounded bg-amber-100 text-[#5B1717]">Aadi Pooram (Jul-Aug)</span>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  The divine appearance day of Sri Goda Devi (Āṇḍāḷ) in Srivilliputhur, the incarnation of Sri Bhūmi Devī and author of Tiruppāvai.
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-[#C99A32]/30 flex justify-end">
              <button
                onClick={onClose}
                className="px-5 py-2 rounded-md bg-[#5B1717] text-[#FAF7F0] text-xs font-semibold hover:bg-[#4A0F0F] transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* CONTRIBUTE MODAL */}
        {modalType === 'contribute' && (
          <div className="p-6 sm:p-8 space-y-5">
            <div className="flex items-center gap-2.5 text-[#5B1717]">
              <Heart className="w-5 h-5 text-[#C99A32]" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#C99A32]">
                Devotional Seva
              </span>
            </div>

            <h2 className="font-serif-classical font-bold text-2xl sm:text-3xl text-[#4A0F0F] leading-tight">
              Contribute to the Digital Canon
            </h2>

            <p className="font-tamil text-sm text-[#5B1717] font-semibold">
              தமிழ் வேதக் களஞ்சியப் பங்களிப்பு
            </p>

            <p className="text-sm text-stone-700 leading-relaxed">
              This repository is maintained as a selfless non-commercial digital offering to world spiritual literature. Scholars, devotees, and enthusiasts are warmly invited to contribute in the following areas:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="p-3.5 rounded-lg bg-white border border-stone-200/80">
                <div className="font-bold text-xs text-[#5B1717] mb-1">Traditional Commentaries</div>
                <p className="text-xs text-stone-600">
                  Submitting extracts and scholarly references from Pillan, Periyavachan Pillai, and Vadakku Thiruveedhi Pillai vyakhyanams.
                </p>
              </div>

              <div className="p-3.5 rounded-lg bg-white border border-stone-200/80">
                <div className="font-bold text-xs text-[#5B1717] mb-1">Authentic Audio Recitations</div>
                <p className="text-xs text-stone-600">
                  Sharing pristine Vedic-style chant recordings following the Sri Vaishnava goshti sampradayam.
                </p>
              </div>

              <div className="p-3.5 rounded-lg bg-white border border-stone-200/80">
                <div className="font-bold text-xs text-[#5B1717] mb-1">Sthala Purana Insights</div>
                <p className="text-xs text-stone-600">
                  Supplying verified architectural, historical, and epigraphical details for the 108 Divya Desams.
                </p>
              </div>

              <div className="p-3.5 rounded-lg bg-white border border-stone-200/80">
                <div className="font-bold text-xs text-[#5B1717] mb-1">Textual Proofreading</div>
                <p className="text-xs text-stone-600">
                  Verifying Tamil sandhi splits, diacritical transliterations, and word-by-word glosses.
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-[#C99A32]/30 flex justify-end">
              <button
                onClick={onClose}
                className="px-5 py-2 rounded-md bg-[#5B1717] text-[#FAF7F0] text-xs font-semibold hover:bg-[#4A0F0F] transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* QUICK SEARCH MODAL */}
        {modalType === 'search' && (
          <div className="p-6 sm:p-8 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-stone-200">
              <div className="flex items-center gap-2">
                <Search className="w-5 h-5 text-[#C99A32]" />
                <span className="font-serif-classical text-xl font-bold text-[#4A0F0F]">
                  Canonical Search
                </span>
              </div>
            </div>

            <div className="relative">
              <input
                type="text"
                autoFocus
                placeholder="Type hymn title (e.g. Tiruppavai), verse #, Āḻvār, or Divya Desam..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white border border-[#C99A32]/60 rounded-md text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#C99A32]/40"
              />
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5 pointer-events-none" />
            </div>

            {searchQuery.trim() === '' ? (
              <div className="py-8 text-center text-xs text-stone-500 space-y-1">
                <p className="font-medium text-stone-700">Quick suggestions:</p>
                <div className="flex flex-wrap justify-center gap-2 pt-2">
                  <button
                    onClick={() => setSearchQuery('Tiruppavai')}
                    className="px-2.5 py-1 rounded bg-stone-200/70 hover:bg-stone-200 text-stone-800 text-xs"
                  >
                    Tiruppāvai
                  </button>
                  <button
                    onClick={() => setSearchQuery('Srirangam')}
                    className="px-2.5 py-1 rounded bg-stone-200/70 hover:bg-stone-200 text-stone-800 text-xs"
                  >
                    Srirangam
                  </button>
                  <button
                    onClick={() => setSearchQuery('Nammalvar')}
                    className="px-2.5 py-1 rounded bg-stone-200/70 hover:bg-stone-200 text-stone-800 text-xs"
                  >
                    Nammāḻvār
                  </button>
                  <button
                    onClick={() => setSearchQuery('Tiruvaimozhi')}
                    className="px-2.5 py-1 rounded bg-stone-200/70 hover:bg-stone-200 text-stone-800 text-xs"
                  >
                    Tiruvāymoḻi
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4 max-h-96 overflow-y-auto pt-2">
                {/* Pasurams */}
                {filteredPasurams.length > 0 && (
                  <div className="space-y-1.5">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-stone-500">
                      Matching Verses
                    </div>
                    {filteredPasurams.map(p => (
                      <div
                        key={p.pasuram_id}
                        onClick={() => {
                          onNavigate({ type: 'pasuram-detail', pasuramId: p.pasuram_id });
                          onClose();
                        }}
                        className="p-2.5 rounded bg-white hover:bg-amber-50/80 border border-stone-200 cursor-pointer flex items-center justify-between text-xs transition-colors"
                      >
                        <div>
                          <span className="font-bold text-[#5B1717]">{p.prabandham_name}</span>
                          <span className="text-stone-500 ml-1.5">Verse #{p.verse_number}</span>
                          <p className="text-stone-600 line-clamp-1 mt-0.5">{p.english_meaning}</p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-stone-400 shrink-0" />
                      </div>
                    ))}
                  </div>
                )}

                {/* Alwars */}
                {filteredAlwars.length > 0 && (
                  <div className="space-y-1.5">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-stone-500">
                      Matching Āḻvārs
                    </div>
                    {filteredAlwars.map(a => (
                      <div
                        key={a.alwar_id}
                        onClick={() => {
                          onNavigate({ type: 'alwar-detail', alwarId: a.alwar_id });
                          onClose();
                        }}
                        className="p-2.5 rounded bg-white hover:bg-amber-50/80 border border-stone-200 cursor-pointer flex items-center justify-between text-xs transition-colors"
                      >
                        <div>
                          <span className="font-bold text-[#5B1717]">{a.name}</span>
                          <span className="font-tamil text-stone-600 ml-2">({a.tamil_name})</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-stone-400 shrink-0" />
                      </div>
                    ))}
                  </div>
                )}

                {/* Temples */}
                {filteredTemples.length > 0 && (
                  <div className="space-y-1.5">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-stone-500">
                      Matching Divya Desams
                    </div>
                    {filteredTemples.map(t => (
                      <div
                        key={t.temple_id}
                        onClick={() => {
                          onNavigate({ type: 'temple-detail', templeId: t.temple_id });
                          onClose();
                        }}
                        className="p-2.5 rounded bg-white hover:bg-amber-50/80 border border-stone-200 cursor-pointer flex items-center justify-between text-xs transition-colors"
                      >
                        <div>
                          <span className="font-bold text-[#5B1717]">{t.temple_name}</span>
                          <span className="text-stone-500 ml-2">({t.region})</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-stone-400 shrink-0" />
                      </div>
                    ))}
                  </div>
                )}

                {filteredPasurams.length === 0 && filteredAlwars.length === 0 && filteredTemples.length === 0 && (
                  <div className="py-6 text-center text-xs text-stone-500">
                    No results found for "{searchQuery}". Try exploring Pasuram Explorer directly.
                  </div>
                )}

                <div className="pt-2 text-center">
                  <button
                    onClick={() => {
                      onNavigate({ type: 'pasurams' });
                      onClose();
                    }}
                    className="text-xs text-[#5B1717] hover:underline font-semibold"
                  >
                    Open Pasuram Explorer with full advanced filters &rarr;
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
