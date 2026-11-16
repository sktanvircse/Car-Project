'use client';

import { useState } from 'react';
import { X, PlusCircle, CheckCircle, Car as CarIcon } from 'lucide-react';

interface AddCarModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCarAdded: () => void;
}

export default function AddCarModal({ isOpen, onClose, onCarAdded }: AddCarModalProps) {
  const [title, setTitle] = useState('');
  const [brand, setBrand] = useState('Subaru');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('2024');
  const [type, setType] = useState('Used Car');
  const [price, setPrice] = useState('');
  const [mileage, setMileage] = useState('12,000 Miles');
  const [drivetrain, setDrivetrain] = useState('AWD');
  const [image, setImage] = useState('/images/car1.png');
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg('');

    try {
      const res = await fetch('http://localhost:5000/api/cars', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          brand,
          model: model || brand,
          year: Number(year),
          type,
          price: Number(price),
          mileage,
          drivetrain,
          image,
          description
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        onCarAdded();
        onClose();
      } else {
        setErrorMsg(data.message || 'Failed to submit car');
      }
    } catch (err: any) {
      setErrorMsg('Could not reach backend API at http://localhost:5000');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-xl glass-panel border border-slate-700 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[90vh]">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <CarIcon className="w-5 h-5 text-blue-400" />
            <h3 className="text-xl font-bold text-white">Add New Car Listing</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {errorMsg && (
          <div className="mt-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Listing Title *</label>
            <input
              type="text"
              required
              placeholder="e.g. 2024 Toyota Supra GR"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-slate-800/90 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Make / Brand *</label>
              <select
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="w-full bg-slate-800/90 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
              >
                <option value="Subaru">Subaru</option>
                <option value="BMW">BMW</option>
                <option value="Toyota">Toyota</option>
                <option value="Audi">Audi</option>
                <option value="Porsche">Porsche</option>
                <option value="Mercedes-Benz">Mercedes-Benz</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Model Name</label>
              <input
                type="text"
                placeholder="e.g. Outback, M4, Supra"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="w-full bg-slate-800/90 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Year</label>
              <input
                type="number"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full bg-slate-800/90 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Category</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full bg-slate-800/90 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
              >
                <option value="Used Car">Used Car</option>
                <option value="New Car">New Car</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Price ($) *</label>
              <input
                type="number"
                required
                placeholder="32000"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full bg-slate-800/90 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Image Asset</label>
              <select
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="w-full bg-slate-800/90 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
              >
                <option value="/images/car1.png">Subaru Forester Silhouette (car1.png)</option>
                <option value="/images/car2.png">BMW X3 Silhouette (car2.png)</option>
                <option value="/images/car3.png">Toyota BRZ Coupe Silhouette (car3.png)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Drivetrain</label>
              <select
                value={drivetrain}
                onChange={(e) => setDrivetrain(e.target.value)}
                className="w-full bg-slate-800/90 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
              >
                <option value="AWD">AWD</option>
                <option value="RWD">RWD</option>
                <option value="FWD">FWD</option>
                <option value="4WD">4WD</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Description</label>
            <textarea
              rows={3}
              placeholder="Features, condition, servicing history..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-slate-800/90 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-lg shadow-blue-500/25 flex items-center gap-2"
            >
              <PlusCircle className="w-4 h-4" />
              <span>{submitting ? 'Saving to Database...' : 'Save Vehicle'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
