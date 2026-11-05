import React, { useState, useEffect } from 'react';
import { Flame, Clock, Sparkles } from 'lucide-react';

export default function FlashDeals() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 3,
    minutes: 42,
    seconds: 15
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 4, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const pad = (n) => String(n).padStart(2, '0');

  return (
    <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 rounded-2xl p-4 sm:p-5 text-white my-8 shadow-lg shadow-orange-500/15 flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white shrink-0 border border-white/30 animate-pulse">
          <Flame size={26} className="fill-white" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg sm:text-xl font-black tracking-tight">Today's Flash Deals</h3>
            <span className="px-2 py-0.5 rounded bg-white text-orange-600 font-extrabold text-[10px] uppercase">
              Save Up to 25%
            </span>
          </div>
          <p className="text-xs text-amber-100 mt-0.5">
            Special pricing on organic farm harvest, premium bakery, and staples
          </p>
        </div>
      </div>

      {/* Countdown Timer */}
      <div className="flex items-center gap-2">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-100 flex items-center gap-1">
          <Clock size={14} /> Ends In:
        </span>
        <div className="flex items-center gap-1.5 font-mono font-black text-slate-900 text-sm">
          <div className="bg-white px-2.5 py-1 rounded-lg shadow-sm">
            {pad(timeLeft.hours)}<span className="text-[10px] font-sans font-bold text-slate-400 block -mt-1">h</span>
          </div>
          <span className="text-white font-bold">:</span>
          <div className="bg-white px-2.5 py-1 rounded-lg shadow-sm">
            {pad(timeLeft.minutes)}<span className="text-[10px] font-sans font-bold text-slate-400 block -mt-1">m</span>
          </div>
          <span className="text-white font-bold">:</span>
          <div className="bg-white px-2.5 py-1 rounded-lg shadow-sm">
            {pad(timeLeft.seconds)}<span className="text-[10px] font-sans font-bold text-slate-400 block -mt-1">s</span>
          </div>
        </div>
      </div>
    </div>
  );
}

