'use client';

interface OrderItem {
  id: string;
  name: string;
  barcode: string;
  quantity: number;
  unitWeight: number;
  totalWeight: number;
  notes: string;
}

interface OrderSummaryProps {
  items: OrderItem[];
  totals: {
    totalWeight: number;
    totalItems: number;
  };
  onSave: () => void;
  onPrint: () => void;
  onShare: () => void;
}

export default function OrderSummary({ items, totals, onSave, onPrint, onShare }: OrderSummaryProps) {
  const getTotalQuantity = () => {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  };

  const getAverageWeight = () => {
    if (items.length === 0) return 0;
    return totals.totalWeight / items.length;
  };

  return (
    <div className="section-box sticky top-4">
      <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
        <i className="ri-file-list-3-line"></i>
        סיכום הזמנה
      </h2>

      <div className="space-y-4">
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">
                {totals.totalItems}
              </div>
              <div className="text-blue-200 text-sm">
                סוגי פריטים
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">
                {getTotalQuantity()}
              </div>
              <div className="text-blue-200 text-sm">
                כמות כוללת
              </div>
            </div>
          </div>
        </div>

        <div className="bg-blue-500/20 backdrop-blur-sm rounded-lg p-4 border border-blue-400/30">
          <div className="text-center">
            <div className="text-sm text-blue-200 mb-1">
              משקל כולל
            </div>
            <div className="text-3xl font-bold text-white">
              {totals.totalWeight.toFixed(1)} ק"ג
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={onSave}
            className="w-full btn-primary py-3 text-white font-medium rounded-lg hover:scale-105 transition-transform flex items-center justify-center gap-2"
          >
            <i className="ri-save-line"></i>
            שמור הזמנה
          </button>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={onPrint}
              className="btn-secondary py-2 text-slate-700 font-medium rounded-lg hover:scale-105 transition-transform flex items-center justify-center gap-2"
            >
              <i className="ri-printer-line"></i>
              הדפס
            </button>

            <button
              onClick={onShare}
              className="btn-secondary py-2 text-slate-700 font-medium rounded-lg hover:scale-105 transition-transform flex items-center justify-center gap-2"
            >
              <i className="ri-share-line"></i>
              שתף
            </button>
          </div>
        </div>

        {items.length > 0 && (
          <div className="mt-6 pt-4 border-t border-white/20">
            <h3 className="text-sm font-medium text-blue-200 mb-2">פרטי הזמנה:</h3>
            <div className="space-y-1 text-xs text-blue-100">
              <div className="flex justify-between">
                <span>סוגי פריטים:</span>
                <span>{totals.totalItems}</span>
              </div>
              <div className="flex justify-between">
                <span>כמות כוללת:</span>
                <span>{getTotalQuantity()}</span>
              </div>
              <div className="flex justify-between">
                <span>משקל כולל:</span>
                <span>{totals.totalWeight.toFixed(1)} ק"ג</span>
              </div>
              <div className="flex justify-between">
                <span>משקל ממוצע:</span>
                <span>{getAverageWeight().toFixed(1)} ק"ג</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}