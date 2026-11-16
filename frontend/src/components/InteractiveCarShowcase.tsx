'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Sparkles, RotateCw, Volume2, ShieldCheck, Gauge, Compass, Zap } from 'lucide-react';

const showcaseModels = [
  {
    id: 'subaru',
    name: 'Subaru Forester XT AWD',
    tag: 'Mountain & Offroad Edition',
    img: '/images/car1.png',
    engine: '2.0L Boxer Turbocharged',
    hp: '250 HP',
    torque: '350 Nm',
    drivetrain: 'Symmetrical AWD',
    desc: 'Engineered with horizontally opposed pistons for a lower center of gravity and unmatched grip on slippery terrains.'
  },
  {
    id: 'bmw',
    name: 'BMW X3 M-Performance',
    tag: 'Executive Sports Utility',
    img: '/images/car2.png',
    engine: '3.0L TwinPower Turbo Inline-6',
    hp: '382 HP',
    torque: '500 Nm',
    drivetrain: 'xDrive Intelligent AWD',
    desc: 'Combines dynamic agility with high riding comfort, featuring adaptive suspension and aggressive aerodynamic styling.'
  },
  {
    id: 'toyota',
    name: 'Toyota 86 / BRZ Track Spec',
    tag: 'Rear-Wheel Pure Performance',
    img: '/images/car3.png',
    engine: '2.4L Naturally Aspirated Boxer',
    hp: '228 HP',
    torque: '250 Nm',
    drivetrain: 'Torsen Limited-Slip RWD',
    desc: 'Ultra-light chassis paired with responsive steering, engineered specifically for canyon carving and track day enthusiasts.'
  }
];

export default function InteractiveCarShowcase() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [headlightsOn, setHeadlightsOn] = useState(true);

  const active = showcaseModels[selectedIdx];

  const handleTestSpin = () => {
    setIsSpinning(true);
    setTimeout(() => setIsSpinning(false), 1200);
  };

  return (
    <section id="showcase" className="py-20 relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-blue-600/10 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-semibold mb-3 border border-blue-500/20">
            <Sparkles className="w-3.5 h-3.5" /> Interactive Vehicle Studio
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white">
            Experience Every Angle & Power Curve
          </h2>
          <p className="text-slate-400 mt-3 text-sm sm:text-base">
            Switch between legendary chassis platforms, trigger aerodynamic spins, and explore engine telemetry.
          </p>
        </div>

        {/* Model Switcher Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {showcaseModels.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => setSelectedIdx(idx)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                selectedIdx === idx
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 scale-105'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700/80 border border-slate-700/60'
              }`}
            >
              {item.name.split(' ')[0]} {item.name.split(' ')[1]}
            </button>
          ))}
        </div>

        {/* Spotlight Stage */}
        <div className="rounded-3xl glass-panel p-6 sm:p-12 border border-slate-800 shadow-2xl relative">
          
          {/* Controls Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-800/80">
            <div>
              <span className="text-xs uppercase tracking-wider text-blue-400 font-bold">{active.tag}</span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">{active.name}</h3>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setHeadlightsOn(!headlightsOn)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border flex items-center gap-1.5 transition-colors ${
                  headlightsOn 
                    ? 'border-amber-400/40 bg-amber-400/10 text-amber-300' 
                    : 'border-slate-700 bg-slate-800 text-slate-400'
                }`}
              >
                <Zap className="w-3.5 h-3.5" />
                {headlightsOn ? 'Beams ON' : 'Beams OFF'}
              </button>

              <button
                onClick={handleTestSpin}
                className="px-3.5 py-1.5 rounded-lg text-xs font-medium border border-blue-500/30 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 flex items-center gap-1.5 transition-all"
              >
                <RotateCw className={`w-3.5 h-3.5 ${isSpinning ? 'animate-spin' : ''}`} />
                <span>360° Aero Spin</span>
              </button>
            </div>
          </div>

          {/* Car Visual Stage */}
          <div className="relative min-h-[300px] sm:min-h-[380px] flex items-center justify-center my-6">
            
            {/* Dynamic Headlight beam effect */}
            {headlightsOn && (
              <div className="absolute right-10 top-1/2 -translate-y-1/2 w-64 h-32 bg-amber-300/10 blur-2xl rounded-full transform rotate-12 pointer-events-none" />
            )}

            {/* Glowing ring under car */}
            <div className="absolute bottom-6 w-4/5 h-16 bg-blue-500/20 blur-2xl rounded-full pointer-events-none" />

            {/* Main Interactive Car */}
            <motion.div
              key={active.id}
              animate={isSpinning ? { rotateY: 360 } : { y: [0, -6, 0] }}
              transition={
                isSpinning 
                  ? { duration: 1.2, ease: "easeInOut" } 
                  : { repeat: Infinity, duration: 5, ease: "easeInOut" }
              }
              className="relative w-full max-w-2xl h-64 sm:h-80 flex items-center justify-center cursor-grab active:cursor-grabbing"
            >
              <Image
                src={active.img}
                alt={active.name}
                width={700}
                height={380}
                className="object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.8)] select-none pointer-events-none"
              />
            </motion.div>
          </div>

          {/* Telemetry Specs Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-6 border-t border-slate-800">
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
              <span className="text-[11px] text-slate-400 block font-medium">Powerplant</span>
              <span className="text-sm font-bold text-white truncate block">{active.engine}</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
              <span className="text-[11px] text-slate-400 block font-medium">Horsepower</span>
              <span className="text-sm font-bold text-blue-400">{active.hp}</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
              <span className="text-[11px] text-slate-400 block font-medium">Torque</span>
              <span className="text-sm font-bold text-amber-400">{active.torque}</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
              <span className="text-[11px] text-slate-400 block font-medium">Driveline</span>
              <span className="text-sm font-bold text-emerald-400">{active.drivetrain}</span>
            </div>
          </div>

          <p className="text-xs text-slate-400 text-center mt-6 italic">
            &ldquo;{active.desc}&rdquo;
          </p>

        </div>

      </div>
    </section>
  );
}
