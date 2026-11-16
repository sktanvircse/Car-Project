'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, User, Phone, ShieldCheck, Car as CarIcon, PlusCircle } from 'lucide-react';

interface NavbarProps {
  onAddCarClick: () => void;
  databaseStatus: boolean;
}

export default function Navbar({ onAddCarClick, databaseStatus }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-11 h-11 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 p-2 shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform flex items-center justify-center">
              <Image 
                src="/images/Logo.png" 
                alt="SK Car Shop Logo" 
                width={36} 
                height={36}
                className="object-contain"
              />
            </div>
            <div>
              <span className="text-xl md:text-2xl font-black tracking-tight text-white flex items-center gap-1.5">
                SK <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">Car Shop</span>
              </span>
              <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-medium">
                <span className={`inline-block w-2 h-2 rounded-full ${databaseStatus ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`}></span>
                {databaseStatus ? 'MySQL Live (XAMPP)' : 'Standby / Demo Mode'}
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <a href="#inventory" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Used Cars</a>
            <a href="#inventory" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">New Cars</a>
            <a href="#showcase" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">3D Spotlight</a>
            <a href="#brands" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Brands</a>
            <a href="#support" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Support</a>
          </nav>

          {/* Actions & CTA */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={onAddCarClick}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-blue-400 text-sm font-semibold border border-blue-500/30 transition-all hover:scale-105"
            >
              <PlusCircle className="w-4 h-4" />
              <span>List Vehicle</span>
            </button>

            <button
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-sm font-semibold shadow-lg shadow-blue-500/25 transition-all hover:scale-105 active:scale-95"
            >
              <User className="w-4 h-4" />
              <span>Sign In</span>
            </button>
          </div>

          {/* Mobile menu trigger */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-slate-900 border-b border-slate-800 px-6 py-4 space-y-3"
          >
            <a 
              href="#inventory" 
              onClick={() => setMobileMenuOpen(false)}
              className="block text-slate-300 hover:text-white py-2"
            >
              Used & New Cars
            </a>
            <a 
              href="#showcase" 
              onClick={() => setMobileMenuOpen(false)}
              className="block text-slate-300 hover:text-white py-2"
            >
              Interactive Spotlight
            </a>
            <a 
              href="#brands" 
              onClick={() => setMobileMenuOpen(false)}
              className="block text-slate-300 hover:text-white py-2"
            >
              Featured Makes
            </a>
            <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onAddCarClick();
                }}
                className="w-full py-2.5 rounded-lg bg-slate-800 text-blue-400 text-sm font-medium flex items-center justify-center gap-2"
              >
                <PlusCircle className="w-4 h-4" /> Add Vehicle
              </button>
              <button
                className="w-full py-2.5 rounded-lg bg-blue-600 text-white text-sm font-medium flex items-center justify-center gap-2"
              >
                <User className="w-4 h-4" /> Sign In
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
