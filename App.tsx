import React, { useState } from 'react';
import { SearchState, BusinessContact } from './types';
import { findBusinesses } from './services/geminiService';
import Hero from './components/Hero';
import ResultsTable from './components/ResultsTable';

const App: React.FC = () => {
  const [niche, setNiche] = useState('');
  const [location, setLocation] = useState('');
  const [resultsCount, setResultsCount] = useState<number>(10);
  
  const [state, setState] = useState<SearchState>({
    isLoading: false,
    error: null,
    data: [],
    searchPerformed: false
  });

  const handleSearch = async () => {
    if (!niche || !location) return;

    // Validate limit
    let limit = resultsCount;
    if (limit < 1) limit = 1;
    if (limit > 50) limit = 50;

    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const results = await findBusinesses(niche, location, limit);
      setState({
        isLoading: false,
        error: null,
        data: results,
        searchPerformed: true
      });
    } catch (error: any) {
      setState({
        isLoading: false,
        error: error.message || "An unexpected error occurred.",
        data: [],
        searchPerformed: true
      });
    }
  };

  const handleExport = () => {
    if (state.data.length === 0) return;

    const headers = ['Business Name', 'Website', 'Phone', 'Email', 'Address', 'Description'];
    const csvContent = [
      headers.join(','),
      ...state.data.map(item => [
        `"${item.name}"`,
        `"${item.website}"`,
        `"${item.phone || ''}"`,
        `"${item.email || ''}"`,
        `"${item.address || ''}"`,
        `"${item.description}"`
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `leads_${niche.replace(/\s+/g, '_')}_${location.replace(/\s+/g, '_')}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Navigation */}
      <nav className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center gap-2">
                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <span className="font-bold text-xl text-slate-900 tracking-tight">LeadScout</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-grow">
        <Hero 
          niche={niche}
          location={location}
          resultsCount={resultsCount}
          onNicheChange={setNiche}
          onLocationChange={setLocation}
          onResultsCountChange={setResultsCount}
          onSearch={handleSearch}
          isLoading={state.isLoading}
        />

        {/* Error Display */}
        {state.error && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700 font-medium">
                    Error searching for leads: {state.error}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {state.searchPerformed && !state.isLoading && !state.error && state.data.length === 0 && (
           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
             <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4">
                <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
             </div>
             <h3 className="text-lg font-medium text-slate-900">No results found</h3>
             <p className="text-slate-500 mt-1">Try broadening your location or changing your niche keywords.</p>
           </div>
        )}

        {/* Results */}
        <ResultsTable data={state.data} onExport={handleExport} />
      </main>

      <footer className="bg-white border-t border-slate-200 mt-auto">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-slate-400">
            Powered by Google Gemini 3 Search Grounding. Data is scraped from public search results.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;