'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Car } from '@/types/car';
import { Gauge, Fuel, ShieldCheck, Heart, ShoppingBag, Eye, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

interface CarCardProps {
  car: Car;
  onViewDetails: (car: Car) => void;
}

export default function CarCard({ car, onViewDetails }: CarCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [bought, setBought] = useState(false);

  const formattedPrice = typeof car.price === 'number' 
    ? `$${car.price.toLocaleString()}` 
    : `$${Number(car.price).toLocaleString()}`;

  const handleBuyNow = () => {
    setBought(true);
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.7 }
    });
    setTimeout(() => setBought(false), 3000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="group rounded-3xl glass-card overflow-hidden border border-slate-800/80 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/10 flex flex-col justify-between"
    >
      <div>
        {/* Car Image Preview Container */}
        <div className="relative h-52 w-full bg-gradient-to-b from-slate-900/90 to-slate-950/60 p-4 flex items-center justify-center overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute inset-0 bg-blue-600/5 group-hover:bg-blue-600/10 transition-colors pointer-events-none" />

          {/* Type Tag */}
          <span className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full text-[11px] font-semibold bg-slate-800/90 text-blue-400 border border-slate-700/60 backdrop-blur-md">
            {car.type || 'Verified'}
          </span>

          {/* Like Button */}
          <button
            onClick={() => setIsLiked(!isLiked)}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-rose-500 backdrop-blur-md transition-colors"
            aria-label="Save to favorites"
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-rose-500 text-rose-500' : ''}`} />
          </button>

          {/* Car Image with hover zoom */}
          <div className="relative w-full h-full flex items-center justify-center transform group-hover:scale-105 transition-transform duration-500">
            <Image
              src={car.image || '/images/car1.png'}
              alt={car.title}
              width={340}
              height={190}
              className="object-contain max-h-44 drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]"
            />
          </div>
        </div>

        {/* Details Content */}
        <div className="p-6">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>{car.brand} • {car.year}</span>
            <span className="flex items-center gap-1 text-emerald-400 font-medium">
              <ShieldCheck className="w-3.5 h-3.5" /> Inspected
            </span>
          </div>

          <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors line-clamp-1">
            {car.title}
          </h3>

          {/* Quick Specs */}
          <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-slate-800/80 text-xs text-slate-400">
            <div className="flex items-center gap-1.5">
              <Gauge className="w-3.5 h-3.5 text-blue-400" />
              <span>{car.mileage}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Fuel className="w-3.5 h-3.5 text-amber-400" />
              <span>{car.drivetrain}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing & CTA */}
      <div className="p-6 pt-0">
        <div className="flex items-center justify-between gap-3 pt-3 border-t border-slate-800/80">
          <div>
            <span className="text-[11px] text-slate-400 block font-medium">Total Price</span>
            <span className="text-xl font-black text-white">{formattedPrice}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onViewDetails(car)}
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
              title="View Specs"
            >
              <Eye className="w-4 h-4" />
            </button>

            <button
              onClick={handleBuyNow}
              disabled={bought}
              className={`px-4 py-2.5 rounded-xl font-semibold text-xs flex items-center gap-1.5 transition-all active:scale-95 shadow-md ${
                bought
                  ? 'bg-emerald-600 text-white'
                  : 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/25'
              }`}
            >
              {bought ? (
                <>
                  <CheckCircle2 className="w-4 h-4" /> Reserved!
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" /> Buy Now
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
