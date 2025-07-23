'use client';

import { useState } from 'react';

interface OrderItem {
  id: string;
  name: string;
  barcode: string;
  quantity: number;
  unitWeight: number;
  totalWeight: number;
  notes: string;
}

interface OrderTableProps {
  items: OrderItem[];
  onRemoveItem: (id: string) => void;
  onUpdateItem: (id: string, updatedItem: Partial<OrderItem>) => void;
}

export default function OrderTable({ items, onRemoveItem, onUpdateItem }: OrderTableProps) {
  const [editingCell, setEditingCell] = useState<{itemId: string, field: string} | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const mockProducts = [
    'שק גדול', 'אגרגט 25 קג', 'חול בניין', 'צמנט פורטלנד', 
    'חצץ דק', 'בלוק בטון', 'טיט בניין', 'מלט יבש'
  ];

  const handleCellEdit = (itemId: string, field: string, value: string | number) => {
    if (field === 'quantity' && typeof value === 'number') {
      const item = items.find(item => item.id === itemId);
      if (item) {
        const newTotalWeight = value * item.unitWeight;
        onUpdateItem(itemId, { quantity: value, totalWeight: newTotalWeight });
      }
    } else if (field === 'unitWeight' && typeof value === 'number') {
      const item = items.find(item => item.id === itemId);
      if (item) {
        const newTotalWeight = item.quantity * value;
        onUpdateItem(itemId, { unitWeight: value, totalWeight: newTotalWeight });
      }
    } else if (field === 'name' && typeof value === 'string') {
      onUpdateItem(itemId, { [field]: value });
      
      if (value.length > 0) {
        const filtered = mockProducts.filter(product => 
          product.includes(value)
        );
        setSuggestions(filtered.slice(0, 5));
      } else {
        setSuggestions([]);
      }
    } else {
      onUpdateItem(itemId, { [field]: value });
    }
  };

  const handleCellClick = (itemId: string, field: string) => {
    setEditingCell({ itemId, field });
  };

  const handleCellBlur = () => {
    setEditingCell(null);
    setSuggestions([]);
  };

  const selectSuggestion = (itemId: string, suggestion: string) => {
    onUpdateItem(itemId, { name: suggestion });
    setSuggestions([]);
    setEditingCell(null);
  };

  const calculateTotalWeight = () => {
    return items.reduce((sum, item) => sum + item.totalWeight, 0);
  };

  if (items.length === 0) {
    return (
      <div className="section-box">
        <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
          <i className="ri-shopping-cart-line"></i>
          פריטים בהזמנה
        </h2>
        <div className="text-center py-8">
          <i className="ri-shopping-cart-line text-4xl text-blue-200 mb-4"></i>
          <p className="text-blue-100">אין פריטים בהזמנה</p>
          <p className="text-blue-200 text-sm mt-2">הוסף פריטים באמצעות הכלים למעלה</p>
        </div>
      </div>
    );
  }

  return (
    <div className="section-box">
      <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
        <i className="ri-shopping-cart-line"></i>
        פריטים בהזמנה ({items.length})
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/20">
              <th className="text-right py-3 px-2 text-blue-100 font-medium">שם פריט</th>
              <th className="text-center py-3 px-2 text-blue-100 font-medium">ברקוד</th>
              <th className="text-center py-3 px-2 text-blue-100 font-medium">כמות</th>
              <th className="text-center py-3 px-2 text-blue-100 font-medium">משקל יחידה</th>
              <th className="text-center py-3 px-2 text-blue-100 font-medium">סה"כ משקל</th>
              <th className="text-center py-3 px-2 text-blue-100 font-medium">הערות</th>
              <th className="text-center py-3 px-2 text-blue-100 font-medium">פעולות</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr 
                key={item.id}
                className={`border-b border-white/10 ${
                  index % 2 === 0 ? 'table-row-even' : 'table-row-odd'
                }`}
              >
                <td className="py-3 px-2 relative">
                  {editingCell?.itemId === item.id && editingCell?.field === 'name' ? (
                    <div className="relative">
                      <input
                        type="text"
                        value={item.name}
                        onChange={(e) => handleCellEdit(item.id, 'name', e.target.value)}
                        onBlur={handleCellBlur}
                        className="w-full px-2 py-1 input-glassmorphism text-slate-800"
                        autoFocus
                      />
                      {suggestions.length > 0 && (
                        <div className="absolute top-full left-0 right-0 mt-1 bg-white/95 backdrop-blur-md rounded-lg shadow-lg border border-white/20 z-10">
                          {suggestions.map((suggestion, idx) => (
                            <button
                              key={idx}
                              onClick={() => selectSuggestion(item.id, suggestion)}
                              className="w-full px-3 py-2 text-right text-slate-700 hover:bg-blue-50 transition-colors"
                            >
                              {suggestion}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div 
                      className="text-white font-medium cursor-pointer hover:bg-white/10 px-2 py-1 rounded"
                      onClick={() => handleCellClick(item.id, 'name')}
                    >
                      {item.name}
                    </div>
                  )}
                </td>
                
                <td className="py-3 px-2 text-center">
                  {editingCell?.itemId === item.id && editingCell?.field === 'barcode' ? (
                    <input
                      type="text"
                      value={item.barcode}
                      onChange={(e) => handleCellEdit(item.id, 'barcode', e.target.value)}
                      onBlur={handleCellBlur}
                      className="w-full px-2 py-1 input-glassmorphism text-slate-800 text-center"
                      autoFocus
                    />
                  ) : (
                    <div 
                      className="text-white cursor-pointer hover:bg-white/10 px-2 py-1 rounded"
                      onClick={() => handleCellClick(item.id, 'barcode')}
                    >
                      {item.barcode || 'לחץ להוספה'}
                    </div>
                  )}
                </td>
                
                <td className="py-3 px-2 text-center">
                  {editingCell?.itemId === item.id && editingCell?.field === 'quantity' ? (
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => handleCellEdit(item.id, 'quantity', parseInt(e.target.value) || 1)}
                      onBlur={handleCellBlur}
                      className="w-20 px-2 py-1 input-glassmorphism text-slate-800 text-center"
                      min="1"
                      autoFocus
                    />
                  ) : (
                    <div 
                      className="text-white cursor-pointer hover:bg-white/10 px-2 py-1 rounded"
                      onClick={() => handleCellClick(item.id, 'quantity')}
                    >
                      {item.quantity}
                    </div>
                  )}
                </td>
                
                <td className="py-3 px-2 text-center">
                  {editingCell?.itemId === item.id && editingCell?.field === 'unitWeight' ? (
                    <input
                      type="number"
                      value={item.unitWeight}
                      onChange={(e) => handleCellEdit(item.id, 'unitWeight', parseFloat(e.target.value) || 0)}
                      onBlur={handleCellBlur}
                      className="w-20 px-2 py-1 input-glassmorphism text-slate-800 text-center"
                      min="0"
                      step="0.1"
                      autoFocus
                    />
                  ) : (
                    <div 
                      className="text-white cursor-pointer hover:bg-white/10 px-2 py-1 rounded"
                      onClick={() => handleCellClick(item.id, 'unitWeight')}
                    >
                      {item.unitWeight} ק"ג
                    </div>
                  )}
                </td>
                
                <td className="py-3 px-2 text-center">
                  <span className="text-white font-semibold">
                    {item.totalWeight.toFixed(1)} ק"ג
                  </span>
                </td>
                
                <td className="py-3 px-2 text-center">
                  <input
                    type="text"
                    value={item.notes}
                    onChange={(e) => handleCellEdit(item.id, 'notes', e.target.value)}
                    className="w-full px-2 py-1 input-glassmorphism text-slate-800 text-center"
                    placeholder="הערות..."
                  />
                </td>
                
                <td className="py-3 px-2 text-center">
                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="btn-danger px-3 py-1 text-sm hover:scale-105 transition-transform"
                    title="הסר פריט"
                  >
                    <i className="ri-delete-bin-line"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 bg-blue-500/20 backdrop-blur-sm rounded-lg p-4 border border-blue-400/30">
        <div className="text-center">
          <div className="text-sm text-blue-200 mb-1">
            סיכום משקלים
          </div>
          <div className="text-2xl font-bold text-white">
            {calculateTotalWeight().toFixed(1)} ק"ג
          </div>
        </div>
      </div>
    </div>
  );
}