'use client';

import { useState } from 'react';

interface Product {
  id: string;
  name: string;
  barcode: string;
  weight: number;
  category: string;
}

interface ProductSearchProps {
  onAddProduct: (product: Product, quantity: number) => void;
}

export default function ProductSearch({ onAddProduct }: ProductSearchProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [isExpanded, setIsExpanded] = useState(true);

  const mockProducts: Product[] = [
    { id: '1', name: 'שק גדול', barcode: '123456789', weight: 25, category: 'חומרי בניין' },
    { id: '2', name: 'אגרגט 25 קג', barcode: '987654321', weight: 25, category: 'חומרי בניין' },
    { id: '3', name: 'חול בניין', barcode: '456789123', weight: 30, category: 'חומרי בניין' },
    { id: '4', name: 'צמנט פורטלנד', barcode: '789123456', weight: 50, category: 'חומרי בניין' },
    { id: '5', name: 'חצץ דק', barcode: '321654987', weight: 20, category: 'חומרי בניין' },
    { id: '6', name: 'בלוק בטון', barcode: '654987321', weight: 15, category: 'חומרי בניין' },
    { id: '7', name: 'טיט בניין', barcode: '147258369', weight: 25, category: 'חומרי בניין' },
    { id: '8', name: 'מלט יבש', barcode: '369147258', weight: 40, category: 'חומרי בניין' }
  ];

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    
    if (value.length > 0) {
      const filtered = mockProducts.filter(product => 
        product.name.includes(value) || 
        product.barcode.includes(value)
      );
      setSuggestions(filtered.slice(0, 6));
    } else {
      setSuggestions([]);
    }
  };

  const selectProduct = (product: Product) => {
    setSearchQuery(product.name);
    setSuggestions([]);
  };

  const handleAddProduct = () => {
    if (!searchQuery || quantity <= 0) return;

    const existingProduct = mockProducts.find(p => 
      p.name === searchQuery || p.barcode === searchQuery
    );

    if (existingProduct) {
      onAddProduct(existingProduct, quantity);
    } else {
      const newProduct: Product = {
        id: Date.now().toString(),
        name: searchQuery,
        barcode: '',
        weight: 0,
        category: 'ידני'
      };
      onAddProduct(newProduct, quantity);
    }

    setSearchQuery('');
    setQuantity(1);
  };

  return (
    <div className="section-box">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-white flex items-center gap-2">
          <i className="ri-search-line"></i>
          הוספת מוצרים
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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2 relative">
              <label className="block text-sm font-medium text-blue-100 mb-2">
                חיפוש מוצר (שם או ברקוד)
              </label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full px-4 py-3 input-glassmorphism text-slate-800 placeholder-slate-500"
                placeholder="הקלד שם מוצר או ברקוד..."
              />
              {suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white/95 backdrop-blur-md rounded-lg shadow-lg border border-white/20 z-10 max-h-48 overflow-y-auto">
                  {suggestions.map((product) => (
                    <button
                      key={product.id}
                      type="button"
                      onClick={() => selectProduct(product)}
                      className="w-full px-4 py-3 text-right hover:bg-blue-50 transition-colors border-b border-white/20 last:border-b-0"
                    >
                      <div className="text-slate-800 font-medium">{product.name}</div>
                      <div className="text-slate-600 text-sm flex justify-between">
                        <span>ברקוד: {product.barcode}</span>
                        <span>משקל: {product.weight} ק"ג</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-100 mb-2">
                כמות
              </label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                className="w-full px-4 py-3 input-glassmorphism text-slate-800"
                min="1"
              />
            </div>

            <div className="flex items-end">
              <button
                onClick={handleAddProduct}
                className="w-full btn-primary py-3 text-white font-medium rounded-lg hover:scale-105 transition-transform flex items-center justify-center gap-2"
              >
                <i className="ri-add-line"></i>
                הוסף פריט
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}