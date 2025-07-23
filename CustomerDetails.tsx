'use client';

import { useState } from 'react';

interface Customer {
  name: string;
  contact: string;
  phone: string;
  email: string;
  street: string;
  streetNumber: string;
  city: string;
  representative: string;
}

interface CustomerDetailsProps {
  customer: Customer;
  setCustomer: (customer: Customer) => void;
}

export default function CustomerDetails({ customer, setCustomer }: CustomerDetailsProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  const handleChange = (field: keyof Customer, value: string) => {
    setCustomer({
      ...customer,
      [field]: value
    });
  };

  return (
    <div className="section-box">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-white flex items-center gap-2">
          <i className="ri-user-line"></i>
          פרטי לקוח
        </h2>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-blue-200 hover:text-white transition-colors"
        >
          <i className={`ri-arrow-${isExpanded ? 'up' : 'down'}-s-line text-xl`}></i>
        </button>
      </div>

      {isExpanded && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-blue-100 mb-2">
              שם לקוח *
            </label>
            <input
              type="text"
              value={customer.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className="w-full px-4 py-3 input-glassmorphism text-slate-800 placeholder-slate-500"
              placeholder="שם הלקוח"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-blue-100 mb-2">
              איש קשר
            </label>
            <input
              type="text"
              value={customer.contact}
              onChange={(e) => handleChange('contact', e.target.value)}
              className="w-full px-4 py-3 input-glassmorphism text-slate-800 placeholder-slate-500"
              placeholder="שם איש הקשר"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-blue-100 mb-2">
              מספר נייד *
            </label>
            <input
              type="tel"
              value={customer.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              className="w-full px-4 py-3 input-glassmorphism text-slate-800 placeholder-slate-500"
              placeholder="050-1234567"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-blue-100 mb-2">
              אימייל
            </label>
            <input
              type="email"
              value={customer.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className="w-full px-4 py-3 input-glassmorphism text-slate-800 placeholder-slate-500"
              placeholder="example@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-blue-100 mb-2">
              רחוב
            </label>
            <input
              type="text"
              value={customer.street}
              onChange={(e) => handleChange('street', e.target.value)}
              className="w-full px-4 py-3 input-glassmorphism text-slate-800 placeholder-slate-500"
              placeholder="שם הרחוב"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-blue-100 mb-2">
              מספר רחוב
            </label>
            <input
              type="text"
              value={customer.streetNumber}
              onChange={(e) => handleChange('streetNumber', e.target.value)}
              className="w-full px-4 py-3 input-glassmorphism text-slate-800 placeholder-slate-500"
              placeholder="מספר הבית"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-blue-100 mb-2">
              עיר
            </label>
            <input
              type="text"
              value={customer.city}
              onChange={(e) => handleChange('city', e.target.value)}
              className="w-full px-4 py-3 input-glassmorphism text-slate-800 placeholder-slate-500"
              placeholder="שם העיר"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-blue-100 mb-2">
              שם נציג מטפל
            </label>
            <input
              type="text"
              value={customer.representative}
              onChange={(e) => handleChange('representative', e.target.value)}
              className="w-full px-4 py-3 input-glassmorphism text-slate-800 placeholder-slate-500"
              placeholder="שם הנציג המטפל"
            />
          </div>
        </div>
      )}
    </div>
  );
}