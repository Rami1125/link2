'use client';

import { useState } from 'react';

interface OrderItem {
  name: string;
  quantity: number;
  weight: number;
  price: number;
  total: number;
}

interface OrderFormProps {
  onAddItem: (item: OrderItem) => void;
}

export default function OrderForm({ onAddItem }: OrderFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    quantity: 1,
    weight: 0,
    price: 0
  });
  const [isExpanded, setIsExpanded] = useState(true);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const productSuggestions = [
    'תפוח עץ אורגני',
    'בננה טרייה',
    'מלפפון ישראלי',
    'עגבניות שרי',
    'חסה אייסברג',
    'גזר אורגני',
    'בצל לבן',
    'תפוח אדמה',
    'פלפל אדום',
    'אבוקדו',
    'לימון טרי',
    'כרוב לבן'
  ];

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    if (field === 'name' && typeof value === 'string') {
      const filtered = productSuggestions.filter(product => 
        product.includes(value) && value.length > 0
      );
      setSuggestions(filtered.slice(0, 5));
    }
  };

  const calculateTotal = () => {
    return formData.quantity * formData.price;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || formData.quantity <= 0 || formData.price <= 0) {
      return;
    }

    const newItem: OrderItem = {
      name: formData.name,
      quantity: formData.quantity,
      weight: formData.weight,
      price: formData.price,
      total: calculateTotal()
    };

    onAddItem(newItem);
    setFormData({
      name: '',
      quantity: 1,
      weight: 0,
      price: 0
    });
    setSuggestions([]);
  };

  const selectSuggestion = (suggestion: string) => {
    setFormData(prev => ({ ...prev, name: suggestion }));
    setSuggestions([]);
  };

  return (
    <div className="section-box">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-white flex items-center gap-2">
          <i className="ri-add-box-line"></i>
          הוספת פריט להזמנה
        </h2>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-blue-200 hover:text-white transition-colors"
        >
          <i className={`ri-arrow-${isExpanded ? 'up' : 'down'}-s-line text-xl`}></i>
        </button>
      </div>

      {isExpanded && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative">
              <label className="block text-sm font-medium text-blue-100 mb-2">
                שם המוצר *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="w-full px-4 py-3 input-glassmorphism text-slate-800 placeholder-slate-500"
                placeholder="הכנס שם מוצר..."
                required
              />
              {suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white/95 backdrop-blur-md rounded-lg shadow-lg border border-white/20 z-10">
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => selectSuggestion(suggestion)}
                      className="w-full px-4 py-2 text-right text-slate-700 hover:bg-blue-50 first:rounded-t-lg last:rounded-b-lg transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-100 mb-2">
                כמות *
              </label>
              <input
                type="number"
                value={formData.quantity}
                onChange={(e) => handleInputChange('quantity', parseInt(e.target.value) || 1)}
                className="w-full px-4 py-3 input-glassmorphism text-slate-800"
                min="1"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-100 mb-2">
                משקל (ק"ג)
              </label>
              <input
                type="number"
                value={formData.weight}
                onChange={(e) => handleInputChange('weight', parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-3 input-glassmorphism text-slate-800"
                min="0"
                step="0.1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-100 mb-2">
                מחיר ליחידה (₪) *
              </label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => handleInputChange('price', parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-3 input-glassmorphism text-slate-800"
                min="0"
                step="0.01"
                required
              />
            </div>
          </div>

          {formData.quantity > 0 && formData.price > 0 && (
            <div className="bg-blue-500/20 backdrop-blur-sm rounded-lg p-4 border border-blue-400/30">
              <div className="text-white text-sm">
                <span className="font-medium">סה"כ למוצר זה: </span>
                <span className="text-lg font-bold text-blue-200">
                  ₪{calculateTotal().toFixed(2)}
                </span>
              </div>
            </div>
          )}

          <div className="flex justify-end">
            <button
              type="submit"
              className="btn-primary px-6 py-3 text-white font-medium rounded-lg hover:scale-105 transition-transform flex items-center gap-2"
            >
              <i className="ri-add-line"></i>
              הוסף להזמנה
            </button>
          </div>
        </form>
      )}
    </div>
  );
}