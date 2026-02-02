import React from 'react';
import { BusinessContact } from '../types';
import { Globe, Phone, Mail, MapPin, ExternalLink, Download } from 'lucide-react';

interface ResultsTableProps {
  data: BusinessContact[];
  onExport: () => void;
}

const ResultsTable: React.FC<ResultsTableProps> = ({ data, onExport }) => {
  if (data.length === 0) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-800">
          Search Results <span className="text-slate-400 text-lg font-normal ml-2">({data.length} found)</span>
        </h2>
        <button
          onClick={onExport}
          className="inline-flex items-center px-4 py-2 bg-white border border-slate-300 rounded-md font-medium text-slate-700 hover:bg-slate-50 shadow-sm transition-colors"
        >
          <Download className="h-4 w-4 mr-2" />
          Export CSV
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Business</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Contact Info</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Website</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Description</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {data.map((business, index) => (
                <tr key={index} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-lg">
                        {business.name.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-slate-900">{business.name}</div>
                        {business.address && (
                          <div className="text-xs text-slate-500 flex items-center mt-1">
                            <MapPin className="h-3 w-3 mr-1" />
                            {business.address.substring(0, 25)}{business.address.length > 25 ? '...' : ''}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col space-y-1">
                      {business.email ? (
                        <a href={`mailto:${business.email}`} className="text-sm text-slate-600 hover:text-indigo-600 flex items-center">
                          <Mail className="h-3.5 w-3.5 mr-2 text-slate-400" />
                          {business.email}
                        </a>
                      ) : (
                        <span className="text-sm text-slate-400 flex items-center">
                           <Mail className="h-3.5 w-3.5 mr-2 text-slate-300" />
                           N/A
                        </span>
                      )}
                      
                      {business.phone ? (
                        <a href={`tel:${business.phone}`} className="text-sm text-slate-600 hover:text-indigo-600 flex items-center">
                          <Phone className="h-3.5 w-3.5 mr-2 text-slate-400" />
                          {business.phone}
                        </a>
                      ) : (
                         <span className="text-sm text-slate-400 flex items-center">
                           <Phone className="h-3.5 w-3.5 mr-2 text-slate-300" />
                           N/A
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <a 
                      href={business.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition-colors"
                    >
                      <Globe className="h-3 w-3 mr-1" />
                      Visit Site
                      <ExternalLink className="h-3 w-3 ml-1" />
                    </a>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-slate-600 max-w-xs truncate" title={business.description}>
                      {business.description}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ResultsTable;