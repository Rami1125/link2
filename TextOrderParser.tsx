'use client';

import { useState } from 'react';

interface Product {
  id: string;
  name: string;
  barcode: string;
  weight: number;
  category: string;
}

interface TextOrderParserProps {
  onAddProducts: (products: { product: Product; quantity: number }[]) => void;
}

export default function TextOrderParser({ onAddProducts }: TextOrderParserProps) {
  const [textInput, setTextInput] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const mockProducts: Product[] = [
    { id: '1', name: 'שק גדול', barcode: '123456789', weight: 25, category: 'חומרי בניין' },
    { id: '2', name: 'אגרגט 25 קג', barcode: '987654321', weight: 25, category: 'חומרי בניין' },
    { id: '3', name: 'חול בניין', barcode: '456789123', weight: 30, category: 'חומרי בניין' },
    { id: '4', name: 'צמנט פורטלנד', barcode: '789123456', weight: 50, category: 'חומרי בניין' },
    { id: '5', name: 'חצץ דק', barcode: '321654987', weight: 20, category: 'חומרי בניין' },
    { id: '6', name: 'בלוק בטון', barcode: '654987321', weight: 15, category: 'חומרי בניין' }
  ];

  const parseTextOrder = (text: string) => {
    const lines = text.split('\n').filter(line => line.trim());
    const parsedItems: { product: Product; quantity: number }[] = [];

    lines.forEach(line => {
      const trimmedLine = line.trim();
      if (!trimmedLine) return;

      const numberMatch = trimmedLine.match(/(\d+)$/);
      let quantity = 1;
      let productName = trimmedLine;

      if (numberMatch) {
        quantity = parseInt(numberMatch[1]);
        productName = trimmedLine.replace(/\s*\d+$/, '').trim();
      }

      const exactMatch = mockProducts.find(p => 
        p.name.includes(productName) || productName.includes(p.name)
      );

      if (exactMatch) {
        parsedItems.push({ product: exactMatch, quantity });
      } else {
        const newProduct: Product = {
          id: Date.now().toString() + Math.random(),
          name: productName,
          barcode: '',
          weight: 0,
          category: 'ידני'
        };
        parsedItems.push({ product: newProduct, quantity });
      }
    });

    return parsedItems;
  };

  const handleProcessText = async () => {
    if (!textInput.trim()) return;

    setIsProcessing(true);
    
    setTimeout(() => {
      const parsedItems = parseTextOrder(textInput);
      onAddProducts(parsedItems);
      setTextInput('');
      setIsProcessing(false);
    }, 1000);
  };

  const exampleText = `שק גדול 2
אגרגט 25 קג 10
חול בניין 5
צמנט פורטלנד 3
חצץ דק 8`;

  return (
    <div className="section-box">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-white flex items-center gap-2">
          <i className="ri-file-copy-line"></i>
          הדבקת הזמנה בטקסט חופשי
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
          <div className="bg-blue-500/10 backdrop-blur-sm rounded-lg p-4 border border-blue-400/20">
            <h3 className="text-sm font-medium text-blue-200 mb-2 flex items-center gap-2">
              <i className="ri-information-line"></i>
              דוגמה לפורמט טקסט:
            </h3>
            <pre className="text-xs text-blue-100 font-mono bg-black/20 p-2 rounded">
              {exampleText}
            </pre>
            <p className="text-xs text-blue-200 mt-2">
              כל שורה = מוצר אחד. המספר בסוף השורה = כמות (אם לא מצוין, כמות = 1)
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-blue-100 mb-2">
              הדבק כאן טקסט הזמנה:
            </label>
            <textarea
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              className="w-full px-4 py-3 input-glassmorphism text-slate-800 placeholder-slate-500 resize-none"
              placeholder="הדבק כאן טקסט הזמנה בפורמט:&#10;שק גדול 2&#10;אגרגט 25 קג 10&#10;חול בניין 5"
              rows={6}
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleProcessText}
              disabled={!textInput.trim() || isProcessing}
              className={`flex-1 py-3 text-white font-medium rounded-lg hover:scale-105 transition-transform flex items-center justify-center gap-2 ${
                !textInput.trim() || isProcessing
                  ? 'bg-gray-500/50 cursor-not-allowed'
                  : 'btn-primary'
              }`}
            >
              {isProcessing ? (
                <>
                  <i className="ri-loader-line animate-spin"></i>
                  מעבד טקסט...
                </>
              ) : (
                <>
                  <i className="ri-upload-line"></i>
                  הכנס הזמנה מהטקסט
                </>
              )}
            </button>

            <button
              onClick={() => setTextInput('')}
              className="px-4 py-3 bg-red-500/20 text-red-200 rounded-lg hover:bg-red-500/30 transition-colors flex items-center gap-2"
            >
              <i className="ri-close-line"></i>
              נקה
            </button>
          </div>
        </div>
      )}
    </div>
  );
}