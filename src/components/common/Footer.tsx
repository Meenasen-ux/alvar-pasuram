import React from 'react';
import { ActiveView } from '../../types';
import { BookOpen, MapPin, Tag, Users } from 'lucide-react';
import { VaishnavaMark } from './VaishnavaMark';

interface FooterProps {
  onNavigate: (view: ActiveView) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#2A0608] text-[#E5D5C0] border-t border-[#5B1717] mt-16 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-10 items-start">
          {/* Brand & Mission */}
          <div className="md:col-span-6 space-y-3">
            <div className="flex items-center gap-3">
              <VaishnavaMark className="w-6 h-6 text-[#D9AD4A]" />
              <div>
                <span className="font-normal text-lg text-[#FAF6EE] tracking-wide">
                  Āḻvār Pasuram &amp; 108 Divya Desams
                </span>
                <p className="text-xs text-[#C99A32] font-tamil font-normal">
                  ஆழ்வார்கள் அருளிச்செய்த நாலாயிர திவ்வியப் பிரபந்தம்
                </p>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-[#D8C7B0] leading-relaxed max-w-lg font-normal">
              A digital heritage repository dedicated to preserving and exploring the sacred 4,000 Tamil hymns of the twelve Āḻvārs and their profound geographic and theological associations with the 108 Divya Desams.
            </p>
          </div>

          {/* Quick Navigation */}
          <div className="md:col-span-6 flex justify-start md:justify-end">
            <div className="space-y-3">
              <h4 className="font-normal text-[#D9AD4A] text-xs tracking-[0.2em] uppercase mb-3">
                Canonical Exploration
              </h4>
              <ul className="flex flex-wrap md:flex-col gap-4 md:gap-2.5 text-xs sm:text-sm">
                <li>
                  <button
                    onClick={() => onNavigate({ type: 'alwars' })}
                    className="hover:text-[#FAF6EE] text-[#E5D5C0] font-normal transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <Users className="w-3.5 h-3.5 text-[#D9AD4A]" />
                    <span>The 12 Āḻvārs</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate({ type: 'pasurams' })}
                    className="hover:text-[#FAF6EE] text-[#E5D5C0] font-normal transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-[#D9AD4A]" />
                    <span>Pasuram Explorer</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate({ type: 'divyadesams' })}
                    className="hover:text-[#FAF6EE] text-[#E5D5C0] font-normal transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <MapPin className="w-3.5 h-3.5 text-[#D9AD4A]" />
                    <span>108 Divya Desams</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate({ type: 'themes' })}
                    className="hover:text-[#FAF6EE] text-[#E5D5C0] font-normal transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <Tag className="w-3.5 h-3.5 text-[#D9AD4A]" />
                    <span>Theological Themes</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom copyright & homage */}
        <div className="border-t border-[#5B1717]/80 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#C99A32]/80 font-normal">
          <p className="italic">
            Dedicated to the immortal legacy of the Āḻvārs and Achāryas.
          </p>
          <p className="flex items-center gap-1.5 italic">
            <span>Crafted with devotion for Tamil spiritual heritage</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
