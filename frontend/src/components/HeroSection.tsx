'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Gauge, Shield, ArrowRight, Zap, Eye, ChevronRight } from 'lucide-react';

const featuredCars = [
  {
    name: 'Subaru Forester AWD',
    tagline: 'All-Weather Expedition Ready',
    speed: '210 km/h',
    power: '182 HP',
    transmission: 'AWD Lineartronic',
    img: '/images/car1.png',
    color: 'from-blue-600/30 to-indigo-900/40',
    accent: '#3b82f6',
    price: '$21,000'
  },
  {
    name: 'BMW X3 xDrive M-Sport',
    tagline: 'Precision Dynamic Driving',
    speed: '240 km/h',
    power: '248 HP',
    transmission: '8-Speed Steptronic',
    img: '/images/car2.png',
    color: 'from-amber-600/20 to-orange-950/40',
    accent: '#f59e0b',
    price: '$29,000'
  },
  {
    name: 'Toyota 86 / BRZ Sports Coupe',
    tagline: 'Pure Balance & Lightweight Drift',
    speed: '226 km/h',
    power: '205 HP',
    transmission: '6-Speed Close-Ratio',
    img: '/images/car3.png',
    color: 'from-rose-600/20 to-red-950/40',
    accent: '#ef4444',
    price: '$36,000'
  }
];

export default function HeroSection({ onExplore }: { onExplore: () => void }) {
  const [selectedCarIndex, setSelectedCarIndex] = useState(0);
  const activeCar = featuredCars[selectedCarIndex];

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24">
      {/* Background radial gradient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[450px] bg-gradient-to-tr from-blue-600/20 via-indigo-500/15 to-purple-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Heading and Tagline */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-6 text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold tracking-wide uppercase">
              <Sparkles className="w-3.5 h-3.5 animate-spin" />
              <span>Next-Generation Car Experience</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight">
              Say hello to your <br />
              <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
                awesome vehicle
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-400 max-w-lg mx-auto lg:mx-0 font-normal">
              Featuring Verified Used, Wholesale, Luxury and Salvage Cars, Trucks & SUVs ready for immediate acquisition.
            </p>

            {/* Quick Specs Badges */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-center">
                <Gauge className="w-5 h-5 text-blue-400 mx-auto mb-1" />
                <div className="text-xs text-slate-400">Top Speed</div>
                <div className="text-sm font-bold text-white">{activeCar.speed}</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-center">
                <Zap className="w-5 h-5 text-amber-400 mx-auto mb-1" />
                <div className="text-xs text-slate-400">Power Output</div>
                <div className="text-sm font-bold text-white">{activeCar.power}</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-center">
                <Shield className="w-5 h-5 text-emerald-400 mx-auto mb-1" />
                <div className="text-xs text-slate-400">Transmission</div>
                <div className="text-sm font-bold text-white truncate px-1">{activeCar.transmission.split(' ')[0]}</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onExplore}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-xl shadow-blue-600/30 flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95"
              >
                <span>Browse Inventory</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href="#showcase"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 font-semibold text-sm border border-slate-700 flex items-center justify-center gap-2 transition-all hover:scale-105"
              >
                <Eye className="w-4 h-4 text-blue-400" />
                <span>Spotlight Preview</span>
              </a>
            </div>
          </motion.div>

          {/* Right Column: Dynamic Car Stage with Animated Floating Effect */}
          <div className="lg:col-span-7 relative">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              className="relative rounded-3xl p-6 sm:p-8 border border-slate-800/80 bg-gradient-to-b from-slate-900/90 to-slate-950/90 shadow-2xl overflow-hidden"
            >
              {/* Backlight halo */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent pointer-events-none" />

              {/* Top Tag & Price */}
              <div className="flex items-center justify-between mb-4 z-10 relative">
                <div>
                  <span className="text-xs font-semibold text-blue-400 tracking-wider uppercase">Active Spotlight</span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">{activeCar.name}</h3>
                  <p className="text-xs text-slate-400">{activeCar.tagline}</p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-400 block">Starting at</span>
                  <span className="text-2xl sm:text-3xl font-extrabold text-blue-400">{activeCar.price}</span>
                </div>
              </div>

              {/* Floating Animated Car */}
              <div className="relative h-64 sm:h-80 flex items-center justify-center py-4">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeCar.img}
                    initial={{ opacity: 0, x: 80, scale: 0.9 }}
                    animate={{ 
                      opacity: 1, 
                      x: 0, 
                      scale: 1,
                      y: [0, -8, 0] 
                    }}
                    exit={{ opacity: 0, x: -80, scale: 0.9 }}
                    transition={{
                      opacity: { duration: 0.4 },
                      x: { duration: 0.4 },
                      y: { repeat: Infinity, duration: 4, ease: 'easeInOut' }
                    }}
                    className="relative w-full h-full flex items-center justify-center"
                  >
                    <Image
                      src={activeCar.img}
                      alt={activeCar.name}
                      width={620}
                      height={340}
                      priority
                      className="object-contain drop-shadow-[0_25px_25px_rgba(0,0,0,0.6)]"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Ground glow shadow */}
                <div className="absolute bottom-4 w-3/4 h-8 bg-blue-500/20 blur-xl rounded-full -z-0" />
              </div>

              {/* Carousel Car Selectors */}
              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-800/80 relative z-10">
                {featuredCars.map((car, idx) => (
                  <button
                    key={car.name}
                    onClick={() => setSelectedCarIndex(idx)}
                    className={`p-2.5 rounded-xl text-left transition-all flex flex-col justify-between border ${
                      selectedCarIndex === idx 
                        ? 'border-blue-500 bg-blue-500/10 shadow-lg shadow-blue-500/10' 
                        : 'border-slate-800 bg-slate-900/50 hover:border-slate-700'
                    }`}
                  >
                    <span className="text-[11px] text-slate-400 font-medium">Model 0{idx + 1}</span>
                    <span className="text-xs font-bold text-white truncate">{car.name.split(' ')[0]} {car.name.split(' ')[1]}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
