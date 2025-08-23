import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Navigation/Sidebar';
import { Dashboard } from './components/Pages/Dashboard';
import { Transactions } from './components/Pages/Transactions';
import { Budgets } from './components/Pages/Budgets';
import { Investments } from './components/Pages/Investments';
import { Goals } from './components/Pages/Goals';
import { Reports } from './components/Pages/Reports';
import { AIAdvisor } from './components/Pages/AIAdvisor';
import { Settings } from './components/Pages/Settings';
import { NotificationModal } from './components/Modals/NotificationModal';
import { notificationApi } from './utils/api';
import { Notification } from './types';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      const data = await notificationApi.getAll();
      setNotifications(data);
    } catch (error) {
      console.error('Error loading notifications:', error);
    }
  };

  const handleMarkAsRead = async (id: string) => {
    try {
      await notificationApi.markAsRead(id);
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      const unreadIds = notifications.filter(n => !n.read).map(n => n.id);
      await Promise.all(unreadIds.map(id => notificationApi.markAsRead(id)));
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
    }
  };

  const handleTabChange = (tab: string) => {
    if (tab === 'notifications') {
      setShowNotifications(true);
    } else {
      setActiveTab(tab);
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const renderPage = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard onTabChange={setActiveTab} />;
      case 'transactions':
        return <Transactions />;
      case 'budgets':
        return <Budgets />;
      case 'investments':
        return <Investments />;
      case 'goals':
        return <Goals />;
      case 'reports':
        return <Reports />;
      case 'ai-advisor':
        return <AIAdvisor />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard onTabChange={setActiveTab} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar 
        activeTab={activeTab} 
        onTabChange={handleTabChange}
        unreadNotifications={unreadCount}
      />
      <div className="flex-1 overflow-auto">
        {renderPage()}
      </div>
      
      <NotificationModal
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
        notifications={notifications}
        onMarkAsRead={handleMarkAsRead}
        onMarkAllAsRead={handleMarkAllAsRead}
      />
    </div>
  );
}

export default App;