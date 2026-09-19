import React, { useState, useEffect } from 'react';
import { ActiveView } from './types';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { HomePage } from './components/home/HomePage';
import { AlwarsPage } from './components/alwars/AlwarsPage';
import { AlwarProfileView } from './components/alwars/AlwarProfileView';
import { PasuramExplorerPage } from './components/pasurams/PasuramExplorerPage';
import { PasuramDetailsView } from './components/pasurams/PasuramDetailsView';
import { DivyaDesamsPage } from './components/divyadesams/DivyaDesamsPage';
import { DivyaDesamProfileView } from './components/divyadesams/DivyaDesamProfileView';

export default function App() {
  const [activeView, setActiveView] = useState<ActiveView>({ type: 'home' });
  const [quickSearchQuery, setQuickSearchQuery] = useState('');

  // Scroll to top upon view change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeView]);

  const handleNavigate = (view: ActiveView) => {
    setActiveView(view);
  };

  const handleQuickSearch = (query: string) => {
    setQuickSearchQuery(query);
    setActiveView({
      type: 'pasurams',
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7] text-stone-900 font-sans selection:bg-amber-200 selection:text-amber-950">
      {/* Top sticky navigation */}
      <Header
        activeView={activeView}
        onNavigate={handleNavigate}
        onQuickSearch={handleQuickSearch}
      />

      {/* Main page content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        {activeView.type === 'home' && (
          <HomePage onNavigate={handleNavigate} />
        )}

        {activeView.type === 'alwars' && (
          <AlwarsPage onNavigate={handleNavigate} />
        )}

        {activeView.type === 'alwar-detail' && (
          <AlwarProfileView 
            alwarId={activeView.alwarId} 
            onNavigate={handleNavigate} 
          />
        )}

        {activeView.type === 'pasurams' && (
          <PasuramExplorerPage
            onNavigate={handleNavigate}
            initialFilterAlwarId={activeView.filterAlwarId}
            initialFilterTempleId={activeView.filterTempleId}
            initialFilterThemeId={activeView.filterThemeId}
            initialSearchQuery={quickSearchQuery}
          />
        )}

        {activeView.type === 'pasuram-detail' && (
          <PasuramDetailsView
            pasuramId={activeView.pasuramId}
            onNavigate={handleNavigate}
          />
        )}

        {activeView.type === 'divyadesams' && (
          <DivyaDesamsPage onNavigate={handleNavigate} />
        )}

        {activeView.type === 'temple-detail' && (
          <DivyaDesamProfileView
            templeId={activeView.templeId}
            onNavigate={handleNavigate}
          />
        )}
      </main>

      {/* Traditional Heritage Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
