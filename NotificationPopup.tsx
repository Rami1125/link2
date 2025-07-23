'use client';

interface Notification {
  id: string;
  type: 'success' | 'error' | 'info' | 'loading';
  message: string;
}

interface NotificationPopupProps {
  notification: Notification;
}

export default function NotificationPopup({ notification }: NotificationPopupProps) {
  const getIcon = () => {
    switch (notification.type) {
      case 'success':
        return 'ri-check-circle-line';
      case 'error':
        return 'ri-error-warning-line';
      case 'info':
        return 'ri-information-line';
      case 'loading':
        return 'ri-loader-4-line';
      default:
        return 'ri-information-line';
    }
  };

  const getColor = () => {
    switch (notification.type) {
      case 'success':
        return 'text-green-600';
      case 'error':
        return 'text-red-600';
      case 'info':
        return 'text-blue-600';
      case 'loading':
        return 'text-yellow-600';
      default:
        return 'text-blue-600';
    }
  };

  return (
    <div className={`popup-notification popup-${notification.type}`}>
      <div className="flex items-center gap-3">
        <i className={`${getIcon()} ${getColor()} text-lg ${notification.type === 'loading' ? 'animate-spin' : ''}`}></i>
        <span className="text-slate-800 font-medium">{notification.message}</span>
      </div>
    </div>
  );
}