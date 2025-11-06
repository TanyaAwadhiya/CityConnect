import React, { useState, useEffect } from 'react';
import { Menu, X, Bell, Search, MapPin, LogIn, Globe } from 'lucide-react';
import { NavLink } from '../ui/NavLink';
import SearchBar from '../ui/SearchBar';
import { useAlerts } from '../../hooks/useSupabase';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { alerts, loading: alertsLoading } = useAlerts();
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleNotifications = () => {
    setIsNotificationOpen(!isNotificationOpen);
  };

  const closeNotifications = () => {
    setIsNotificationOpen(false);
  };

  // Close notifications when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (isNotificationOpen && !target.closest('.notification-dropdown')) {
        closeNotifications();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isNotificationOpen]);

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-gradient-to-br from-blue-300 to-blue-400 p-2 rounded-lg">
              <Globe className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-blue-800">City Connect</h1>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-6">
            <NavLink to="/" label="Home" />
            <NavLink to="/news" label="News" />
            <NavLink to="/events" label="Events" />
            <NavLink to="/services" label="Services" />
            <NavLink to="/contact" label="Contact" />
          </nav>
          
          <div className="hidden md:flex items-center space-x-4">
            <SearchBar />
            <div className="relative notification-dropdown">
              <button 
                onClick={toggleNotifications}
                className="relative p-2 text-gray-700 hover:text-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-full"
                aria-label="Notifications"
                aria-expanded={isNotificationOpen}
              >
                <Bell className="h-5 w-5" />
                {alerts.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    {alerts.length}
                  </span>
                )}
              </button>

              {/* Notification Dropdown */}
              {isNotificationOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                  <div className="p-4 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
                  </div>
                  
                  <div className="max-h-96 overflow-y-auto">
                    {alertsLoading ? (
                      <div className="p-4 text-center text-gray-500">
                        Loading notifications...
                      </div>
                    ) : alerts.length > 0 ? (
                      alerts.map((alert) => (
                        <div
                          key={alert.id}
                          className={`p-4 border-b border-gray-100 last:border-b-0 ${
                            alert.type === 'warning' ? 'bg-amber-50' :
                            alert.type === 'error' ? 'bg-red-50' :
                            alert.type === 'success' ? 'bg-green-50' :
                            'bg-blue-50'
                          }`}
                        >
                          <div className="flex items-start">
                            <div className={`flex-shrink-0 w-2 h-2 rounded-full mt-2 mr-3 ${
                              alert.type === 'warning' ? 'bg-amber-500' :
                              alert.type === 'error' ? 'bg-red-500' :
                              alert.type === 'success' ? 'bg-green-500' :
                              'bg-blue-500'
                            }`} />
                            <div className="flex-1">
                              <p className="text-sm text-gray-800">{alert.message}</p>
                              <p className="text-xs text-gray-500 mt-1">
                                {new Date(alert.created_at).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-4 text-center text-gray-500">
                        No notifications
                      </div>
                    )}
                  </div>
                  
                  {alerts.length > 0 && (
                    <div className="p-4 border-t border-gray-200">
                      <button
                        onClick={closeNotifications}
                        className="w-full text-center text-blue-400 hover:text-blue-500 text-sm font-medium"
                      >
                        Mark all as read
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
            <Link 
              to="/login"
              className="flex items-center space-x-2 bg-blue-800 hover:bg-blue-900 text-white px-4 py-2 rounded-md transition-colors"
            >
              <LogIn className="h-5 w-5" />
              <span>Sign In</span>
            </Link>
          </div>
          
          <button 
            className="md:hidden p-2 text-gray-700 hover:text-blue-800"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-md">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <NavLink to="/" label="Home" mobile onClick={() => setIsMenuOpen(false)} />
            <NavLink to="/news" label="News" mobile onClick={() => setIsMenuOpen(false)} />
            <NavLink to="/events" label="Events" mobile onClick={() => setIsMenuOpen(false)} />
            <NavLink to="/services" label="Services" mobile onClick={() => setIsMenuOpen(false)} />
            <NavLink to="/contact" label="Contact" mobile onClick={() => setIsMenuOpen(false)} />
            
            {/* Mobile Notifications */}
            <div className="border-t border-gray-200 pt-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Notifications</h3>
              {alertsLoading ? (
                <p className="text-sm text-gray-500">Loading...</p>
              ) : alerts.length > 0 ? (
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {alerts.map((alert) => (
                    <div
                      key={alert.id}
                      className={`p-2 rounded text-sm ${
                        alert.type === 'warning' ? 'bg-amber-100 text-amber-800' :
                        alert.type === 'error' ? 'bg-red-100 text-red-800' :
                        alert.type === 'success' ? 'bg-green-100 text-green-800' :
                        'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {alert.message}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">No notifications</p>
              )}
            </div>
            
            <SearchBar mobile />
            <Link 
              to="/login"
              className="flex items-center justify-center space-x-2 bg-blue-800 hover:bg-blue-900 text-white px-4 py-2 rounded-md transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <LogIn className="h-5 w-5" />
              <span>Sign In</span>
            </Link>
          </div>
        </div>
      )}
      
      {/* Alert banner */}
      {alerts.length > 0 && (
        <div className={`w-full py-2 ${alerts[0].type === 'warning' ? 'bg-amber-500' : alerts[0].type === 'error' ? 'bg-red-500' : alerts[0].type === 'success' ? 'bg-green-500' : 'bg-blue-500'} text-white`}>
          <div className="container mx-auto px-4 text-center text-sm font-medium">
            {alerts[0].message}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;