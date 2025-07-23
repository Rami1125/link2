'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4" style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }}>
      <div className="glassmorphism p-8 text-center max-w-md w-full">
        <h1 className="text-3xl font-bold text-white mb-4">
          ברוכים הבאים
        </h1>
        <p className="text-blue-100 mb-8">
          מערכת הזמנות מתקדמת עם עיצוב Glassmorphism
        </p>
        
        <Link href="/order">
          <button className="btn-primary w-full py-4 text-white font-medium rounded-lg hover:scale-105 transition-transform flex items-center justify-center gap-2">
            <i className="ri-shopping-cart-line"></i>
            לטופס ההזמנה
          </button>
        </Link>
      </div>
    </div>
  );
}