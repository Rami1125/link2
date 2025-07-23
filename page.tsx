'use client';

import { useState, useEffect } from 'react';
import CustomerDetails from './CustomerDetails';
import DeliveryDetails from './DeliveryDetails';
import ProductSearch from './ProductSearch';
import OrderTable from './OrderTable';
import OrderSummary from './OrderSummary';
import OrderNotes from './OrderNotes';
import TextOrderParser from './TextOrderParser';
import NotificationPopup from './NotificationPopup';

interface OrderItem {
  id: string;
  name: string;
  barcode: string;
  quantity: number;
  unitWeight: number;
  totalWeight: number;
  notes: string;
}

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

interface DeliveryDetails {
  date: string;
  time: string;
  driverName: string;
  manualUnloading: boolean;
  crane10m: boolean;
  crane15m: boolean;
  craneWork: boolean;
}

interface Product {
  id: string;
  name: string;
  barcode: string;
  weight: number;
  category: string;
}

interface Notification {
  id: string;
  type: 'success' | 'error' | 'info' | 'loading';
  message: string;
}

export default function OrderPage() {
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [customer, setCustomer] = useState<Customer>({
    name: '',
    contact: '',
    phone: '',
    email: '',
    street: '',
    streetNumber: '',
    city: '',
    representative: ''
  });
  const [delivery, setDelivery] = useState<DeliveryDetails>({
    date: '',
    time: '',
    driverName: '',
    manualUnloading: false,
    crane10m: false,
    crane15m: false,
    craneWork: false
  });
  const [orderNotes, setOrderNotes] = useState('');
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [orderNumber, setOrderNumber] = useState<string>('');

  useEffect(() => {
    const newOrderNumber = `ORD-${Date.now().toString().slice(-6)}`;
    setOrderNumber(newOrderNumber);
  }, []);

  const addNotification = (type: Notification['type'], message: string) => {
    const id = Date.now().toString();
    setNotifications(prev => [...prev, { id, type, message }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 4000);
  };

  const addProductToOrder = (product: Product, quantity: number) => {
    const newItem: OrderItem = {
      id: Date.now().toString() + Math.random(),
      name: product.name,
      barcode: product.barcode,
      quantity,
      unitWeight: product.weight,
      totalWeight: product.weight * quantity,
      notes: ''
    };
    setOrderItems(prev => [...prev, newItem]);
    addNotification('success', 'מוצר נוסף בהצלחה להזמנה');
  };

  const addMultipleProducts = (products: { product: Product; quantity: number }[]) => {
    const newItems: OrderItem[] = products.map(({ product, quantity }) => ({
      id: Date.now().toString() + Math.random(),
      name: product.name,
      barcode: product.barcode,
      quantity,
      unitWeight: product.weight,
      totalWeight: product.weight * quantity,
      notes: ''
    }));
    
    setOrderItems(prev => [...prev, ...newItems]);
    addNotification('success', `${products.length} מוצרים נוספו בהצלחה להזמנה`);
  };

  const removeOrderItem = (id: string) => {
    setOrderItems(prev => prev.filter(item => item.id !== id));
    addNotification('info', 'פריט הוסר מההזמנה');
  };

  const updateOrderItem = (id: string, updatedItem: Partial<OrderItem>) => {
    setOrderItems(prev => prev.map(item => 
      item.id === id ? { ...item, ...updatedItem } : item
    ));
  };

  const calculateTotals = () => {
    const totalWeight = orderItems.reduce((sum, item) => sum + item.totalWeight, 0);
    const totalItems = orderItems.length;
    return { totalWeight, totalItems };
  };

  const handleSaveOrder = () => {
    if (!customer.name || !customer.phone || orderItems.length === 0) {
      addNotification('error', 'אנא מלא את כל הפרטים הנדרשים');
      return;
    }

    addNotification('loading', 'שומר הזמנה...');
    
    setTimeout(() => {
      const orderData = {
        orderNumber,
        customer,
        delivery,
        items: orderItems,
        notes: orderNotes,
        totals: calculateTotals(),
        createdAt: new Date().toISOString()
      };
      
      localStorage.setItem(`order-${orderNumber}`, JSON.stringify(orderData));
      addNotification('success', 'ההזמנה נשמרה בהצלחה!');
    }, 1500);
  };

  const handlePrintOrder = () => {
    addNotification('info', 'מכין הזמנה להדפסה...');
    setTimeout(() => {
      window.print();
    }, 500);
  };

  const handleShareOrder = () => {
    const { totalWeight, totalItems } = calculateTotals();
    const orderText = `הזמנה מספר: ${orderNumber}\nלקוח: ${customer.name}\nסה"כ פריטים: ${totalItems}\nמשקל כולל: ${totalWeight.toFixed(1)} ק"ג`;
    
    if (navigator.share) {
      navigator.share({
        title: `הזמנה ${orderNumber}`,
        text: orderText
      });
    } else {
      navigator.clipboard.writeText(orderText);
      addNotification('success', 'פרטי ההזמנה הועתקו ללוח');
    }
  };

  return (
    <div className="min-h-screen p-4" style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }}>
      <div className="max-w-6xl mx-auto">
        <div className="glassmorphism p-6 mb-6">
          <h1 className="text-3xl font-bold text-white text-center mb-2">
            טופס הזמנה מתקדם
          </h1>
          <p className="text-blue-100 text-center">
            הזמנה מספר: {orderNumber}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <CustomerDetails 
              customer={customer} 
              setCustomer={setCustomer}
            />
            
            <DeliveryDetails 
              delivery={delivery} 
              setDelivery={setDelivery}
            />
            
            <ProductSearch onAddProduct={addProductToOrder} />
            
            <OrderTable 
              items={orderItems}
              onRemoveItem={removeOrderItem}
              onUpdateItem={updateOrderItem}
            />
            
            <OrderNotes 
              notes={orderNotes}
              setNotes={setOrderNotes}
            />
            
            <TextOrderParser onAddProducts={addMultipleProducts} />
          </div>

          <div className="space-y-6">
            <OrderSummary 
              items={orderItems}
              totals={calculateTotals()}
              onSave={handleSaveOrder}
              onPrint={handlePrintOrder}
              onShare={handleShareOrder}
            />
          </div>
        </div>
      </div>

      {notifications.map(notification => (
        <NotificationPopup 
          key={notification.id}
          notification={notification}
        />
      ))}
    </div>
  );
}