'use client';

import { useState } from 'react';
import { Search, Filter, RotateCcw } from 'lucide-react';

interface FilterProps {
  onSearch: (filters: {
    type: string;
    brand: string;
    model: string;
    minYear: string;
    maxPrice: string;
    search: string;
  }) => void;
}

export default function SearchFilterBar({ onSearch }: FilterProps) {
  const [type, setType] = useState('All');
  const [brand, setBrand] = useState('All');
  const [model, setModel] = useState('All');
  const [minYear, setMinYear] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [search, setSearch] = useState('');

  const handleApply = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    onSearch({ type, brand, model, minYear, maxPrice, search });
  };

  const handleReset = () => {
    setType('All');
    setBrand('All');
    setModel('All');
    setMinYear('');
    setMaxPrice('');
    setSearch('');
    onSearch({ type: 'All', brand: 'All', model: 'All', minYear: '', maxPrice: '', search: '' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-10 relative z-30">
      <div className="p-4 sm:p-6 rounded-2xl glass-panel border border-slate-700/60 shadow-2xl">
        <form onSubmit={handleApply} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            
            {/* Type */}
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Vehicle Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full bg-slate-800/90 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
              >
                <option value="All">All Types</option>
                <option value="Used Car">Used Cars</option>
                <option value="New Car">New Cars</option>
              </select>
            </div>

            {/* Make / Brand */}
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Make</label>
              <select
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="w-full bg-slate-800/90 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
              >
                <option value="All">All Makes</option>
                <option value="Subaru">Subaru</option>
                <option value="BMW">BMW</option>
                <option value="Toyota">Toyota</option>
                <option value="Audi">Audi</option>
                <option value="Porsche">Porsche</option>
                <option value="Mercedes-Benz">Mercedes-Benz</option>
              </select>
            </div>

            {/* Year */}
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Min Year</label>
              <select
                value={minYear}
                onChange={(e) => setMinYear(e.target.value)}
                className="w-full bg-slate-800/90 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
              >
                <option value="">Any Year</option>
                <option value="2010">2010 & Newer</option>
                <option value="2013">2013 & Newer</option>
                <option value="2016">2016 & Newer</option>
                <option value="2020">2020 & Newer</option>
              </select>
            </div>

            {/* Max Price */}
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Max Budget</label>
              <select
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-full bg-slate-800/90 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
              >
                <option value="">Any Price</option>
                <option value="25000">Under $25,000</option>
                <option value="35000">Under $35,000</option>
                <option value="50000">Under $50,000</option>
                <option value="100000">Under $100,000</option>
                <option value="150000">Under $150,000</option>
              </select>
            </div>

            {/* Keyword Search */}
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Keyword</label>
              <input
                type="text"
                placeholder="e.g. Forester, AWD..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-slate-800/90 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex items-end gap-2">
              <button
                type="submit"
                className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold py-2.5 px-4 rounded-xl text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 transition-all hover:scale-105 active:scale-95"
              >
                <Search className="w-4 h-4" />
                <span>Search</span>
              </button>
              <button
                type="button"
                onClick={handleReset}
                title="Reset Filters"
                className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

          </div>
        </form>
      </div>
    </div>
  );
}
