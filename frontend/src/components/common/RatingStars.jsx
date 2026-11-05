import React from 'react';
import { Star } from 'lucide-react';

export default function RatingStars({ rating = 5, reviews = 0, size = 'sm' }) {
  const iconSize = size === 'sm' ? 14 : 16;

  return (
    <div className="flex items-center gap-1.5 text-xs text-slate-500">
      <div className="flex items-center text-amber-400">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={iconSize}
            className={star <= Math.round(rating) ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}
          />
        ))}
      </div>
      <span className="font-semibold text-slate-700">{rating.toFixed(1)}</span>
      {reviews > 0 && <span className="text-slate-400">({reviews})</span>}
    </div>
  );
}

