'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const brands = [
  { name: 'Subaru', img: '/images/Bitmap.png' },
  { name: 'Volkswagen', img: '/images/2.png' },
  { name: 'Toyota', img: '/images/3.png' },
  { name: 'Mercedes-Benz', img: '/images/Bitmap4.png' },
  { name: 'Hyundai', img: '/images/Bitmap5.png' },
  { name: 'BMW', img: '/images/Bitmap6.png' }
];

export default function BrandScroller({ onSelectBrand }: { onSelectBrand: (brand: string) => void }) {
  return (
    <section id="brands" className="py-12 border-y border-slate-800/60 bg-slate-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <p className="text-xs uppercase tracking-widest font-semibold text-blue-400">Trusted Automakers</p>
          <h2 className="text-2xl font-bold text-white mt-1">Explore Popular Makes</h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {brands.map((b, i) => (
            <motion.button
              key={b.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ scale: 1.05, y: -4 }}
              onClick={() => onSelectBrand(b.name)}
              className="group p-5 rounded-2xl glass-card flex flex-col items-center justify-center gap-3 hover:border-blue-500/40 hover:bg-slate-850 transition-all cursor-pointer shadow-md"
            >
              <div className="w-14 h-14 relative flex items-center justify-center grayscale group-hover:grayscale-0 transition-all">
                <Image
                  src={b.img}
                  alt={b.name}
                  width={52}
                  height={52}
                  className="object-contain max-h-12"
                />
              </div>
              <span className="text-xs font-semibold text-slate-400 group-hover:text-blue-400 transition-colors">
                {b.name}
              </span>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
