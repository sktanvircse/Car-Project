'use client';

import Image from 'next/image';
import { X, ShieldCheck, Gauge, Fuel, Zap, Calendar, DollarSign, CheckCircle2 } from 'lucide-react';
import { Car } from '@/types/car';

interface CarDetailModalProps {
  car: Car | null;
  onClose: () => void;
}

export default function CarDetailModal({ car, onClose }: CarDetailModalProps) {
  if (!car) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-2xl glass-panel border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-2">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
            {car.type || 'Verified Listing'}
          </span>
          <span className="text-xs text-emerald-400 flex items-center gap-1">
            <ShieldCheck className="w-4 h-4" /> 160-Point Inspection Passed
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">{car.title}</h2>
        <p className="text-slate-400 text-sm mt-1">{car.brand} • {car.model} • {car.year}</p>

        {/* Big Preview */}
        <div className="relative h-60 w-full my-6 bg-gradient-to-b from-slate-900 to-slate-950 rounded-2xl flex items-center justify-center p-4 overflow-hidden border border-slate-800">
          <div className="absolute inset-0 bg-blue-500/10 blur-xl rounded-full pointer-events-none" />
          <Image
            src={car.image || '/images/car1.png'}
            alt={car.title}
            width={520}
            height={280}
            className="object-contain max-h-52 drop-shadow-[0_20px_20px_rgba(0,0,0,0.6)]"
          />
        </div>

        {/* Specs Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs mb-6">
          <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/50">
            <span className="text-slate-400 block">Mileage</span>
            <span className="text-sm font-bold text-white mt-0.5 block">{car.mileage}</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/50">
            <span className="text-slate-400 block">Drivetrain</span>
            <span className="text-sm font-bold text-blue-400 mt-0.5 block">{car.drivetrain}</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/50">
            <span className="text-slate-400 block">Fuel Engine</span>
            <span className="text-sm font-bold text-amber-400 mt-0.5 block">{car.fuel_type || 'Petrol'}</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/50">
            <span className="text-slate-400 block">Transmission</span>
            <span className="text-sm font-bold text-emerald-400 mt-0.5 block">{car.transmission || 'Automatic'}</span>
          </div>
        </div>

        {car.description && (
          <p className="text-sm text-slate-300 leading-relaxed mb-6 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
            {car.description}
          </p>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-800">
          <div>
            <span className="text-xs text-slate-400 block">Market Price</span>
            <span className="text-2xl font-black text-white">
              ${Number(car.price).toLocaleString()}
            </span>
          </div>

          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-lg shadow-blue-500/20"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
}
