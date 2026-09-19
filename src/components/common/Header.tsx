import React, { useState } from 'react';
import { BookOpen, Calendar, Globe, Heart, Menu, Search, X } from 'lucide-react';
import { ActiveView } from '../../types';
import { VaishnavaMark } from './VaishnavaMark';
import { HeaderModals, HeaderModalType } from './HeaderModals';

interface HeaderProps {
  activeView: ActiveView;
  onNavigate: (view: ActiveView) => void;
  onQuickSearch: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeView, onNavigate, onQuickSearch }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<HeaderModalType>(null);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState<'EN' | 'TA' | 'IAST'>('EN');

  const navItems = [
    { label: 'Home', view: { type: 'home' } as ActiveView, active: activeView.type === 'home' },
    { label: 'Āḻvārs', view: { type: 'alwars' } as ActiveView, active: activeView.type === 'alwars' || activeView.type === 'alwar-detail' },
    { label: 'Pasuram Explorer', view: { type: 'pasurams' } as ActiveView, active: activeView.type === 'pasurams' || activeView.type === 'pasuram-detail' },
    { label: 'Divya Desams', view: { type: 'divyadesams' } as ActiveView, active: activeView.type === 'divyadesams' || activeView.type === 'temple-detail' },
    { label: 'Themes', view: { type: 'themes' } as ActiveView, active: activeView.type === 'themes' },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full shadow-xs">
        {/* 1. TOP UTILITY BAR (Very clean, thin maroon top bar) */}
        <div className="bg-[#4A0F0F] text-[#F8F3E8] border-b border-[#3D0A0C]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-8 flex items-center justify-between text-[11px] sm:text-[12px]">
            {/* Left: Sacred Mangalasasanam invocations */}
            <div className="tracking-[0.12em] uppercase text-[#E5C583] text-[11px] sm:text-[12px] truncate pr-2 font-normal">
              ŚRĪMATE RĀMĀNUJĀYA NAMAḤ &nbsp;|&nbsp; ŚRĪMANNĀRĀYAṆA CHARANAM PRAPADYE
            </div>

            {/* Right: Utility Links with subtle icons */}
            <div className="flex items-center gap-4 sm:gap-6 text-[#F8F3E8]/85 tracking-normal shrink-0">
              <button
                onClick={() => setActiveModal('about')}
                className="hover:text-[#E5C583] transition-colors inline-flex items-center gap-1.5 cursor-pointer font-normal"
                title="About this sacred digital archive"
              >
                <BookOpen className="w-3.5 h-3.5 text-[#E5C583]" />
                <span className="hidden sm:inline">About</span>
              </button>

              <button
                onClick={() => setActiveModal('festivals')}
                className="hover:text-[#E5C583] transition-colors inline-flex items-center gap-1.5 cursor-pointer font-normal"
                title="Sacred temple festivals"
              >
                <Calendar className="w-3.5 h-3.5 text-[#E5C583]" />
                <span className="hidden sm:inline">Festivals</span>
              </button>

              <button
                onClick={() => setActiveModal('contribute')}
                className="hover:text-[#E5C583] transition-colors inline-flex items-center gap-1.5 cursor-pointer font-normal"
                title="Contribute to the canon"
              >
                <Heart className="w-3.5 h-3.5 text-[#E5C583]" />
                <span className="hidden sm:inline">Contribute</span>
              </button>

              {/* Language Selector */}
              <div className="relative">
                <button
                  onClick={() => setLangMenuOpen(!langMenuOpen)}
                  className="hover:text-[#E5C583] transition-colors inline-flex items-center gap-1 cursor-pointer py-0.5 font-normal"
                  title="Select Language"
                >
                  <Globe className="w-3.5 h-3.5 text-[#E5C583]" />
                  <span>{selectedLang}</span>
                  <span className="text-[9px] opacity-75">▾</span>
                </button>

                {langMenuOpen && (
                  <div className="absolute right-0 top-full mt-1 w-32 bg-[#FAF7F0] text-[#241B18] rounded-md shadow-xl border border-[#C99A32]/40 py-1 z-50 text-xs">
                    <button
                      onClick={() => { setSelectedLang('EN'); setLangMenuOpen(false); }}
                      className={`w-full text-left px-3 py-1.5 hover:bg-amber-100/70 transition-colors ${selectedLang === 'EN' ? 'font-semibold text-[#4A0F0F]' : ''}`}
                    >
                      English
                    </button>
                    <button
                      onClick={() => { setSelectedLang('TA'); setLangMenuOpen(false); }}
                      className={`w-full text-left px-3 py-1.5 hover:bg-amber-100/70 transition-colors font-tamil ${selectedLang === 'TA' ? 'font-semibold text-[#4A0F0F]' : ''}`}
                    >
                      தமிழ் (Tamil)
                    </button>
                    <button
                      onClick={() => { setSelectedLang('IAST'); setLangMenuOpen(false); }}
                      className={`w-full text-left px-3 py-1.5 hover:bg-amber-100/70 transition-colors ${selectedLang === 'IAST' ? 'font-semibold text-[#4A0F0F]' : ''}`}
                    >
                      Roman (IAST)
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 2. MAIN HEADER (Spacious cream/off-white navigation header) */}
        <div className="bg-[#F8F3E8] border-b border-[#E6D8C3]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20 sm:h-22">
              
              {/* Left Side: Traditional Vaishnava-inspired logo & title */}
              <div className="flex items-center gap-3 sm:gap-4">
                <div
                  onClick={() => onNavigate({ type: 'home' })}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  {/* Traditional Vaishnava Mark */}
                  <VaishnavaMark size={40} className="transition-transform group-hover:scale-105 duration-200" />

                  {/* Brand Typography */}
                  <div className="flex flex-col">
                    <span className="font-normal text-2xl sm:text-[27px] tracking-normal text-[#241B18] group-hover:text-[#4A0F0F] transition-colors leading-none">
                      Āḻvār Pasuram
                    </span>
                    <span className="font-normal text-[10px] sm:text-[11px] tracking-[0.2em] text-[#C99A32] uppercase mt-1">
                      108 DIVYA DESAMS
                    </span>
                  </div>
                </div>

                {/* Subtle vertical divider & Tagline */}
                <div className="hidden lg:flex items-center">
                  <div className="h-9 w-[1px] bg-stone-300/80 mx-4.5"></div>
                  <div className="italic text-[13px] leading-tight text-stone-600 font-normal">
                    Tamil Hymns. Timeless Wisdom.<br />
                    Eternal Grace.
                  </div>
                </div>
              </div>

              {/* Right Side: Navigation Links & Circular Search Button */}
              <div className="hidden md:flex items-center gap-6 lg:gap-8">
                <nav className="flex items-center gap-6 lg:gap-7">
                  {navItems.map((item) => (
                    <button
                      key={item.label}
                      onClick={() => onNavigate(item.view)}
                      className="group relative py-2 text-[15px] sm:text-[16px] transition-colors cursor-pointer"
                    >
                      <span className={`${
                        item.active 
                          ? 'text-[#4A0F0F]' 
                          : 'text-[#241B18]/85 hover:text-[#4A0F0F]'
                      } font-normal`}>
                        {item.label}
                      </span>

                      {/* Subtle gold underline on active page */}
                      {item.active && (
                        <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C99A32] animate-in fade-in duration-200"></span>
                      )}
                    </button>
                  ))}
                </nav>

                {/* Circular Search Icon Button */}
                <button
                  onClick={() => setActiveModal('search')}
                  className="w-10 h-10 rounded-full bg-[#EFE9DD]/80 hover:bg-[#E5DEC7] text-stone-700 hover:text-[#4A0F0F] border border-stone-300/70 flex items-center justify-center transition-all cursor-pointer shadow-2xs"
                  aria-label="Open Canonical Search"
                  title="Search Hymns, Āḻvārs, and Temples"
                >
                  <Search className="w-4 h-4" />
                </button>
              </div>

              {/* Mobile hamburger button */}
              <div className="flex items-center gap-2 md:hidden">
                <button
                  onClick={() => setActiveModal('search')}
                  className="p-2 rounded-full text-stone-700 hover:bg-stone-200/50"
                  aria-label="Search"
                >
                  <Search className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="p-2 rounded-md text-stone-800 hover:bg-stone-200/50"
                  aria-label="Toggle navigation"
                >
                  {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#FAF7F0] border-b border-[#C99A32]/40 px-5 py-4 space-y-3 shadow-lg">
            <div className="font-serif-classical italic text-xs text-stone-600 pb-2 border-b border-stone-200">
              Tamil Hymns. Timeless Wisdom. Eternal Grace.
            </div>

            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => {
                    onNavigate(item.view);
                    setMobileMenuOpen(false);
                  }}
                  className={`text-left py-2 px-3 rounded-md text-sm font-sans flex items-center justify-between ${
                    item.active
                      ? 'bg-amber-100/80 text-[#4A0F0F] font-semibold'
                      : 'text-stone-800 hover:bg-stone-100'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.active && <span className="w-1.5 h-1.5 rounded-full bg-[#C99A32]"></span>}
                </button>
              ))}
            </div>

            <div className="pt-2 border-t border-stone-200 flex items-center justify-between text-xs text-stone-600">
              <button onClick={() => { setActiveModal('about'); setMobileMenuOpen(false); }} className="hover:text-[#4A0F0F]">
                About
              </button>
              <button onClick={() => { setActiveModal('festivals'); setMobileMenuOpen(false); }} className="hover:text-[#4A0F0F]">
                Festivals
              </button>
              <button onClick={() => { setActiveModal('contribute'); setMobileMenuOpen(false); }} className="hover:text-[#4A0F0F]">
                Contribute
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Heritage Modals: About, Festivals, Contribute, Search */}
      <HeaderModals
        modalType={activeModal}
        onClose={() => setActiveModal(null)}
        onNavigate={onNavigate}
      />
    </>
  );
};
