'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import SearchFilterBar from '@/components/SearchFilterBar';
import BrandScroller from '@/components/BrandScroller';
import CarCard from '@/components/CarCard';
import InteractiveCarShowcase from '@/components/InteractiveCarShowcase';
import AddCarModal from '@/components/AddCarModal';
import CarDetailModal from '@/components/CarDetailModal';
import { Car } from '@/types/car';
import { Sparkles, Loader2, Database, Shield, Zap, RefreshCw } from 'lucide-react';

const initialFallbackCars: Car[] = [
  {
    id: 1,
    title: '2013 Subaru Forester',
    brand: 'Subaru',
    model: 'Forester',
    year: 2013,
    type: 'Used Car',
    price: 21000,
    mileage: '11,475 Miles',
    drivetrain: 'AWD',
    fuel_type: 'Gasoline',
    transmission: 'Automatic',
    image: '/images/car1.png',
    featured: 1,
    description: 'Reliable all-weather SUV with symmetrical all-wheel drive, premium trim, and spacious interior.'
  },
  {
    id: 2,
    title: '2010 BMW X3',
    brand: 'BMW',
    model: 'X3',
    year: 2010,
    type: 'Used Car',
    price: 29000,
    mileage: '11,475 Miles',
    drivetrain: 'AWD',
    fuel_type: 'Petrol',
    transmission: 'Automatic',
    image: '/images/car2.png',
    featured: 1,
    description: 'Luxury compact crossover sports activity vehicle with dynamic handling and luxury leather styling.'
  },
  {
    id: 3,
    title: '2016 Toyota BRZ',
    brand: 'Toyota',
    model: 'BRZ',
    year: 2016,
    type: 'Used Car',
    price: 36000,
    mileage: '11,475 Miles',
    drivetrain: 'RWD',
    fuel_type: 'Petrol',
    transmission: 'Manual',
    image: '/images/car3.png',
    featured: 1,
    description: 'Pristine condition sports coupe engineered for agile performance and incredible responsiveness.'
  },
  {
    id: 4,
    title: '2021 Audi RS6 Avant',
    brand: 'Audi',
    model: 'RS6',
    year: 2021,
    type: 'New Car',
    price: 115000,
    mileage: '4,200 Miles',
    drivetrain: 'AWD',
    fuel_type: 'Twin-Turbo V8',
    transmission: 'Automatic',
    image: '/images/car1.png',
    featured: 0,
    description: 'High performance estate combining supercar speed with daily practical usability.'
  },
  {
    id: 5,
    title: '2022 Porsche 911 Carrera',
    brand: 'Porsche',
    model: '911',
    year: 2022,
    type: 'New Car',
    price: 128000,
    mileage: '3,100 Miles',
    drivetrain: 'RWD',
    fuel_type: 'Twin-Turbo Flat-6',
    transmission: 'PDK',
    image: '/images/car2.png',
    featured: 0,
    description: 'Iconic sports car delivering benchmark precision steering and legendary road presence.'
  },
  {
    id: 6,
    title: '2019 Mercedes-Benz C63 AMG',
    brand: 'Mercedes-Benz',
    model: 'C63',
    year: 2019,
    type: 'Used Car',
    price: 64500,
    mileage: '18,200 Miles',
    drivetrain: 'RWD',
    fuel_type: 'Bi-Turbo V8',
    transmission: 'Automatic',
    image: '/images/car3.png',
    featured: 0,
    description: 'Muscular luxury sedan boasting thrilling acceleration and aggressive AMG sport styling.'
  }
];

export default function Home() {
  const [cars, setCars] = useState<Car[]>(initialFallbackCars);
  const [loading, setLoading] = useState(false);
  const [dbConnected, setDbConnected] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);

  const fetchCars = async (params?: Record<string, string>) => {
    setLoading(true);
    try {
      let url = 'http://localhost:5000/api/cars';
      if (params) {
        const query = new URLSearchParams(params).toString();
        url += `?${query}`;
      }
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        if (data.data) {
          setCars(data.data);
          setDbConnected(data.source === 'mysql');
        }
      }
    } catch {
      // Backend not running, use client-side state
    } finally {
      setLoading(false);
    }
  };

  const checkDbHealth = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/health');
      if (res.ok) {
        const data = await res.json();
        setDbConnected(Boolean(data.mysqlConnected));
      }
    } catch {
      setDbConnected(false);
    }
  };

  useEffect(() => {
    fetchCars();
    checkDbHealth();
  }, []);

  const handleFilterSearch = (filters: {
    type: string;
    brand: string;
    model: string;
    minYear: string;
    maxPrice: string;
    search: string;
  }) => {
    const queryParams: Record<string, string> = {};
    if (filters.type && filters.type !== 'All') queryParams.type = filters.type;
    if (filters.brand && filters.brand !== 'All') queryParams.brand = filters.brand;
    if (filters.model && filters.model !== 'All') queryParams.model = filters.model;
    if (filters.minYear) queryParams.minYear = filters.minYear;
    if (filters.maxPrice) queryParams.maxPrice = filters.maxPrice;
    if (filters.search) queryParams.search = filters.search;

    fetchCars(queryParams);
  };

  const scrollToInventory = () => {
    document.getElementById('inventory')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0b0f19] text-slate-100">
      {/* Top Navigation */}
      <Navbar onAddCarClick={() => setIsAddModalOpen(true)} databaseStatus={dbConnected} />

      <main className="flex-grow">
        {/* Animated Hero Banner */}
        <HeroSection onExplore={scrollToInventory} />

        {/* Dynamic Filters Bar */}
        <SearchFilterBar onSearch={handleFilterSearch} />

        {/* Brand Showcase Carousel */}
        <BrandScroller onSelectBrand={(brand) => handleFilterSearch({ type: 'All', brand, model: 'All', minYear: '', maxPrice: '', search: '' })} />

        {/* 3D / Aero Interactive Car Spotlight */}
        <InteractiveCarShowcase />

        {/* Live Inventory Grid */}
        <section id="inventory" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-blue-400 mb-1">
                <Sparkles className="w-3.5 h-3.5" /> Curated Collection
              </div>
              <h2 className="text-3xl font-extrabold text-white">Trending Near You</h2>
              <p className="text-sm text-slate-400 mt-1">
                Found {cars.length} vehicles matching your criteria
              </p>
            </div>

            <button
              onClick={() => fetchCars()}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh Inventory</span>
            </button>
          </div>

          {loading ? (
            <div className="py-20 flex flex-col items-center justify-center text-slate-400">
              <Loader2 className="w-10 h-10 animate-spin text-blue-500 mb-3" />
              <span>Updating vehicle listings...</span>
            </div>
          ) : cars.length === 0 ? (
            <div className="py-16 text-center glass-card rounded-3xl p-8 border border-slate-800">
              <p className="text-lg font-bold text-slate-300">No vehicles match this filter</p>
              <p className="text-sm text-slate-500 mt-1">Try resetting your search query or selecting a different brand.</p>
              <button
                onClick={() => fetchCars()}
                className="mt-4 px-5 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-semibold"
              >
                Reset Search
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cars.map((car) => (
                <CarCard key={car.id} car={car} onViewDetails={(c) => setSelectedCar(c)} />
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer id="support" className="border-t border-slate-800 bg-slate-950 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <span className="text-xl font-black text-white">
              SK <span className="text-blue-500">Car Shop</span>
            </span>
            <p className="text-xs text-slate-400">
              Upgraded modern Next.js + Node/Express + MySQL architecture with interactive aero styling and dynamic inventory management.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Inventory</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="#inventory" className="hover:text-white">Used Cars</a></li>
              <li><a href="#inventory" className="hover:text-white">New Cars</a></li>
              <li><a href="#inventory" className="hover:text-white">Auctions</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Database</h4>
            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <Database className="w-3.5 h-3.5 text-blue-400" />
                <span>MySQL (XAMPP Port 3306)</span>
              </div>
              <p className="text-[11px] text-slate-500">Schema file available at backend/schema.sql</p>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Platform</h4>
            <p className="text-xs text-slate-400">
              Next.js 15 • Express.js • Tailwind CSS • Framer Motion
            </p>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <AddCarModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onCarAdded={() => fetchCars()}
      />

      <CarDetailModal
        car={selectedCar}
        onClose={() => setSelectedCar(null)}
      />
    </div>
  );
}
