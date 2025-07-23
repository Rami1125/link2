'use client';

import { useState } from 'react';

interface OrderNotesProps {
  notes: string;
  setNotes: (notes: string) => void;
}

export default function OrderNotes({ notes, setNotes }: OrderNotesProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="section-box">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-white flex items-center gap-2">
          <i className="ri-file-text-line"></i>
          הערות כלליות להזמנה
        </h2>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-blue-200 hover:text-white transition-colors"
        >
          <i className={`ri-arrow-${isExpanded ? 'up' : 'down'}-s-line text-xl`}></i>
        </button>
      </div>

      {isExpanded && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-blue-100 mb-2">
              הערות והנחיות מיוחדות
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-4 py-3 input-glassmorphism text-slate-800 placeholder-slate-500 resize-none"
              placeholder="הוסף הערות כלליות, הנחיות מיוחדות או מידע נוסף הנוגע להזמנה..."
              rows={4}
              maxLength={500}
            />
            <div className="text-xs text-blue-200 mt-1 text-left">
              {notes.length}/500 תווים
            </div>
          </div>
        </div>
      )}
    </div>
  );
}