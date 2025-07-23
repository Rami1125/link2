'use client';

import { useState } from 'react';

interface DeliveryDetails {
  date: string;
  time: string;
  driverName: string;
  manualUnloading: boolean;
  crane10m: boolean;
  crane15m: boolean;
  craneWork: boolean;
}

interface DeliveryDetailsProps {
  delivery: DeliveryDetails;
  setDelivery: (delivery: DeliveryDetails) => void;
}

export default function DeliveryDetails({ delivery, setDelivery }: DeliveryDetailsProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  const handleInputChange = (field: keyof DeliveryDetails, value: string | boolean) => {
    setDelivery({
      ...delivery,
      [field]: value
    });
  };

  const transportOptions = [
    { key: 'manualUnloading', label: 'פריקה ידנית', icon: 'ri-hand-heart-line' },
    { key: 'crane10m', label: 'הובלת מנוף 10 מטר', icon: 'ri-truck-line' },
    { key: 'crane15m', label: 'הובלת מנוף 15 מטר', icon: 'ri-truck-line' },
    { key: 'craneWork', label: 'עבודות מנוף', icon: 'ri-building-line' }
  ];

  return (
    <div className="section-box">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-white flex items-center gap-2">
          <i className="ri-truck-line"></i>
          פרטי אספקה
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-blue-100 mb-2">
                תאריך אספקה *
              </label>
              <input
                type="date"
                value={delivery.date}
                onChange={(e) => handleInputChange('date', e.target.value)}
                className="w-full px-4 py-3 input-glassmorphism text-slate-800"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-100 mb-2">
                שעת אספקה *
              </label>
              <input
                type="time"
                value={delivery.time}
                onChange={(e) => handleInputChange('time', e.target.value)}
                className="w-full px-4 py-3 input-glassmorphism text-slate-800"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-100 mb-2">
                שם נהג מתוכנן
              </label>
              <input
                type="text"
                value={delivery.driverName}
                onChange={(e) => handleInputChange('driverName', e.target.value)}
                className="w-full px-4 py-3 input-glassmorphism text-slate-800 placeholder-slate-500"
                placeholder="שם הנהג"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-blue-100 mb-3">
              אפשרויות הובלה:
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {transportOptions.map((option) => (
                <label 
                  key={option.key}
                  className="flex items-center gap-3 p-3 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 hover:bg-white/20 transition-colors cursor-pointer"
                >
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={delivery[option.key as keyof DeliveryDetails] as boolean}
                      onChange={(e) => handleInputChange(option.key as keyof DeliveryDetails, e.target.checked)}
                      className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
                    />
                    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                      delivery[option.key as keyof DeliveryDetails] 
                        ? 'bg-blue-500 border-blue-500' 
                        : 'border-white/40 bg-white/10'
                    }`}>
                      {delivery[option.key as keyof DeliveryDetails] && (
                        <i className="ri-check-line text-white text-sm"></i>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <i className={`${option.icon} text-blue-200`}></i>
                    <span className="text-white text-sm">{option.label}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}