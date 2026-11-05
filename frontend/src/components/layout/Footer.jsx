import React from 'react';
import { ShoppingBag, Truck, ShieldCheck, Clock, Award, Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 mt-20 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Trust Badges Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-12 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-950/60 border border-emerald-500/30 flex items-center justify-center text-brand-400 shrink-0">
              <Clock size={24} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Under 25-Min Delivery</h4>
              <p className="text-xs text-slate-400">Guaranteed swift doorstep drops</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-950/60 border border-emerald-500/30 flex items-center justify-center text-brand-400 shrink-0">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">100% Organic & Fresh</h4>
              <p className="text-xs text-slate-400">Hand-picked farm harvest</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-950/60 border border-emerald-500/30 flex items-center justify-center text-brand-400 shrink-0">
              <Truck size={24} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Free Delivery Over ₹499</h4>
              <p className="text-xs text-slate-400">Zero delivery surcharges</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-950/60 border border-emerald-500/30 flex items-center justify-center text-brand-400 shrink-0">
              <Award size={24} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">No-Questions Return</h4>
              <p className="text-xs text-slate-400">Instant credit if not satisfied</p>
            </div>
          </div>
        </div>

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 py-12">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-brand-600 flex items-center justify-center text-white font-bold">
                <ShoppingBag size={20} />
              </div>
              <span className="text-xl font-black text-white tracking-tight">
                Fresh<span className="text-brand-500">Cart</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Your neighborhood digital supermarket providing sustainably sourced organic fruits, pure dairy, artisan breads, and pantry staples straight from trusted regional farms across India.
            </p>
            <div className="space-y-1.5 text-xs text-slate-400">
              <p className="flex items-center gap-2">
                <MapPin size={14} className="text-brand-500" /> 100 Feet Road, Indiranagar, Bengaluru, 560038
              </p>
              <p className="flex items-center gap-2">
                <Phone size={14} className="text-brand-500" /> 1800-555-FRESH (Toll Free, 24/7 Support)
              </p>
              <p className="flex items-center gap-2">
                <Mail size={14} className="text-brand-500" /> support@freshcart.in
              </p>
            </div>
          </div>

          {/* Quick Categories */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Aisles & Departments</h5>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="#" className="hover:text-brand-400 transition">Organic Fruits & Veggies</a></li>
              <li><a href="#" className="hover:text-brand-400 transition">A2 Cow Milk, Dahi & Eggs</a></li>
              <li><a href="#" className="hover:text-brand-400 transition">Artisan Breads & Sourdough</a></li>
              <li><a href="#" className="hover:text-brand-400 transition">Basmati Rice, Atta & Oils</a></li>
              <li><a href="#" className="hover:text-brand-400 transition">Cold-Pressed Juices & Snacks</a></li>
              <li><a href="#" className="hover:text-brand-400 transition">Fresh Poultry & Seafood</a></li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Customer Care</h5>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="#" className="hover:text-brand-400 transition">Track Live Delivery</a></li>
              <li><a href="#" className="hover:text-brand-400 transition">Delivery Slots & PIN Codes</a></li>
              <li><a href="#" className="hover:text-brand-400 transition">Freshness Return Policy</a></li>
              <li><a href="#" className="hover:text-brand-400 transition">Weekly Grocery Savings</a></li>
              <li><a href="#" className="hover:text-brand-400 transition">FreshCart Coins & Loyalty</a></li>
            </ul>
          </div>

          {/* Newsletter Box */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Weekly Fresh Savings</h5>
            <p className="text-xs text-slate-400 mb-3">
              Subscribe for exclusive flash deals, Mandi harvest updates, and seasonal Indian recipes.
            </p>
            <div className="space-y-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-3.5 py-2 text-xs bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
              />
              <button
                type="button"
                className="w-full py-2 bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs rounded-xl transition shadow-md"
              >
                Get ₹100 Off First Order
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Credits */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 FreshCart Supermarket India Pvt. Ltd. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-slate-400">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-slate-400">Terms of Service</a>
            <span>•</span>
            <a href="#" className="hover:text-slate-400">FSSAI Certified</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
