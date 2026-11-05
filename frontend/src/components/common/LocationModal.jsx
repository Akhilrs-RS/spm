import React, { useState } from 'react';
import { X, MapPin, Check, Plus, Navigation } from 'lucide-react';
import { useLocation } from '../../context/LocationContext';

export default function LocationModal() {
  const {
    addresses,
    selectedAddress,
    isLocationModalOpen,
    setIsLocationModalOpen,
    selectAddress,
    addNewAddress
  } = useLocation();

  const [showNewForm, setShowNewForm] = useState(false);
  const [newLabel, setNewLabel] = useState('Home');
  const [newAddress, setNewAddress] = useState('');
  const [newZip, setNewZip] = useState('');

  if (!isLocationModalOpen) return null;

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newAddress || !newZip) return;
    addNewAddress({
      label: newLabel,
      address: newAddress,
      city: 'Springfield, IL',
      zip: newZip
    });
    setNewAddress('');
    setNewZip('');
    setShowNewForm(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-100 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-brand-50 flex items-center justify-center text-brand-600">
              <MapPin size={18} />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-base">Select Delivery Location</h3>
              <p className="text-xs text-slate-500">Groceries delivered in 15–30 mins to your doorstep</p>
            </div>
          </div>
          <button
            onClick={() => setIsLocationModalOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4 max-h-[70vh] overflow-y-auto">
          {/* Quick detect button */}
          <button
            type="button"
            onClick={() => selectAddress(addresses[0])}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-emerald-50 hover:bg-emerald-100 text-brand-700 rounded-xl text-sm font-semibold transition border border-emerald-200/60"
          >
            <Navigation size={16} />
            Use Current Location (GPS)
          </button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-slate-400 font-medium">Saved Addresses</span>
            </div>
          </div>

          {/* Address List */}
          <div className="space-y-2.5">
            {addresses.map((addr) => {
              const isSelected = selectedAddress?.id === addr.id;
              return (
                <div
                  key={addr.id}
                  onClick={() => selectAddress(addr)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition flex items-start justify-between ${
                    isSelected
                      ? 'border-brand-500 bg-brand-50/50 shadow-sm'
                      : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`p-1.5 rounded-lg shrink-0 mt-0.5 ${
                        isSelected ? 'bg-brand-500 text-white' : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      <MapPin size={16} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold px-2 py-0.5 rounded bg-slate-200/70 text-slate-700">
                          {addr.label}
                        </span>
                        <span className="text-xs text-brand-600 font-medium">
                          ⚡ {addr.estimatedMinutes} mins
                        </span>
                      </div>
                      <p className="text-sm font-medium text-slate-800 mt-1">{addr.address}</p>
                      <p className="text-xs text-slate-500">{addr.city} • {addr.zip}</p>
                    </div>
                  </div>
                  {isSelected && (
                    <div className="w-5 h-5 rounded-full bg-brand-500 text-white flex items-center justify-center shrink-0 mt-1">
                      <Check size={12} strokeWidth={3} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Add New Address Accordion */}
          {!showNewForm ? (
            <button
              onClick={() => setShowNewForm(true)}
              className="w-full flex items-center justify-center gap-2 py-2.5 text-sm font-medium text-slate-600 hover:text-brand-600 hover:bg-slate-50 border border-dashed border-slate-300 rounded-xl transition"
            >
              <Plus size={16} />
              Add New Address / Pincode
            </button>
          ) : (
            <form onSubmit={handleAdd} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">New Address Details</h4>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Label (e.g. Home, Gym)"
                  value={newLabel}
                  onChange={(e) => setNewLabel(e.target.value)}
                  className="px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-brand-500"
                  required
                />
                <input
                  type="text"
                  placeholder="Postal Zip Code (e.g. 62704)"
                  value={newZip}
                  onChange={(e) => setNewZip(e.target.value)}
                  className="px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-brand-500"
                  required
                />
              </div>
              <input
                type="text"
                placeholder="Street address & Apt / Flat number"
                value={newAddress}
                onChange={(e) => setNewAddress(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-brand-500"
                required
              />
              <div className="flex gap-2 justify-end pt-1">
                <button
                  type="button"
                  onClick={() => setShowNewForm(false)}
                  className="px-3 py-1.5 text-xs text-slate-500 hover:text-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-bold bg-brand-600 hover:bg-brand-700 text-white rounded-lg transition shadow-sm"
                >
                  Save & Deliver Here
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

