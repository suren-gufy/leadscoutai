import React from 'react';
import { Search, MapPin, Briefcase, ListFilter } from 'lucide-react';

interface HeroProps {
  niche: string;
  location: string;
  resultsCount: number;
  onNicheChange: (val: string) => void;
  onLocationChange: (val: string) => void;
  onResultsCountChange: (val: number) => void;
  onSearch: () => void;
  isLoading: boolean;
}

const Hero: React.FC<HeroProps> = ({ 
  niche, 
  location, 
  resultsCount,
  onNicheChange, 
  onLocationChange, 
  onResultsCountChange,
  onSearch, 
  isLoading 
}) => {
  return (
    <div className="bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight sm:text-5xl mb-4">
            Find <span className="text-indigo-600">Leads</span> in Seconds
          </h1>
          <p className="text-lg text-slate-600 mb-8">
            Enter a niche and location. Our AI agent scrapes live search data to find businesses, websites, and contact details for you.
          </p>

          <div className="bg-white p-2 rounded-xl shadow-lg border border-slate-200 flex flex-col sm:flex-row gap-2">
            <div className="relative flex-grow-[2] group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Briefcase className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-4 border-none rounded-lg bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 transition-all outline-none text-slate-900 placeholder-slate-400"
                placeholder="e.g. Dentists, Roofers"
                value={niche}
                onChange={(e) => onNicheChange(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && onSearch()}
              />
            </div>

            <div className="relative flex-grow-[2] group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MapPin className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-4 border-none rounded-lg bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 transition-all outline-none text-slate-900 placeholder-slate-400"
                placeholder="e.g. Chicago"
                value={location}
                onChange={(e) => onLocationChange(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && onSearch()}
              />
            </div>

            <div className="relative w-full sm:w-28 group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <ListFilter className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
              </div>
              <input
                type="number"
                min="1"
                max="50"
                className="block w-full pl-10 pr-3 py-4 border-none rounded-lg bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 transition-all outline-none text-slate-900 placeholder-slate-400"
                placeholder="Limit"
                title="Number of results (1-50)"
                value={resultsCount}
                onChange={(e) => onResultsCountChange(parseInt(e.target.value) || 10)}
                onKeyDown={(e) => e.key === 'Enter' && onSearch()}
              />
            </div>

            <button
              onClick={onSearch}
              disabled={isLoading || !niche || !location}
              className={`
                px-8 py-4 rounded-lg font-semibold text-white shadow-md transition-all flex items-center justify-center gap-2
                ${isLoading || !niche || !location 
                  ? 'bg-slate-300 cursor-not-allowed' 
                  : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg active:transform active:scale-95'}
              `}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Scraping...
                </>
              ) : (
                <>
                  <Search className="h-5 w-5" />
                  Find
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;