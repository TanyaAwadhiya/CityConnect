import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Plus, Edit2, Trash2, Calendar, Newspaper, Briefcase } from 'lucide-react';
import Button from '../components/ui/Button';

interface UserData {
  events: any[];
  news: any[];
  services: any[];
}

const DashboardPage: React.FC = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserData>({
    events: [],
    news: [],
    services: [],
  });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'events' | 'news' | 'services'>('events');

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) {
      fetchUserData();
    }
  }, [user]);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const userId = user?.id;

      const [eventsRes, newsRes, servicesRes] = await Promise.all([
        supabase.from('events').select('*').eq('user_id', userId),
        supabase.from('news').select('*').eq('user_id', userId),
        supabase.from('services').select('*').eq('user_id', userId),
      ]);

      setUserData({
        events: eventsRes.data || [],
        news: newsRes.data || [],
        services: servicesRes.data || [],
      });
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (table: 'events' | 'news' | 'services', id: string) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;

    try {
      await supabase.from(table).delete().eq('id', id);
      fetchUserData();
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-800"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome, {user.email?.split('@')[0]}!</h1>
          <p className="text-gray-600">Manage your city content and contributions</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">My Events</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{userData.events.length}</p>
              </div>
              <Calendar className="h-10 w-10 text-blue-500 opacity-50" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">My News</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{userData.news.length}</p>
              </div>
              <Newspaper className="h-10 w-10 text-green-500 opacity-50" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">My Services</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{userData.services.length}</p>
              </div>
              <Briefcase className="h-10 w-10 text-purple-500 opacity-50" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md">
          <div className="border-b border-gray-200">
            <div className="flex">
              <button
                onClick={() => setActiveTab('events')}
                className={`flex-1 px-6 py-4 font-medium text-center transition-colors ${
                  activeTab === 'events'
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <div className="flex items-center justify-center space-x-2">
                  <Calendar className="h-5 w-5" />
                  <span>Events</span>
                </div>
              </button>
              <button
                onClick={() => setActiveTab('news')}
                className={`flex-1 px-6 py-4 font-medium text-center transition-colors ${
                  activeTab === 'news'
                    ? 'border-b-2 border-green-500 text-green-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <div className="flex items-center justify-center space-x-2">
                  <Newspaper className="h-5 w-5" />
                  <span>News</span>
                </div>
              </button>
              <button
                onClick={() => setActiveTab('services')}
                className={`flex-1 px-6 py-4 font-medium text-center transition-colors ${
                  activeTab === 'services'
                    ? 'border-b-2 border-purple-500 text-purple-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <div className="flex items-center justify-center space-x-2">
                  <Briefcase className="h-5 w-5" />
                  <span>Services</span>
                </div>
              </button>
            </div>
          </div>

          <div className="p-6">
            <div className="mb-6">
              <Button
                variant="primary"
                size="lg"
                icon={<Plus className="h-5 w-5" />}
                iconPosition="left"
              >
                Add New {activeTab.charAt(0).toUpperCase() + activeTab.slice(1, -1)}
              </Button>
            </div>

            {loading ? (
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-800"></div>
              </div>
            ) : activeTab === 'events' ? (
              userData.events.length > 0 ? (
                <div className="space-y-4">
                  {userData.events.map((event) => (
                    <div key={event.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-900">{event.title}</h3>
                          <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                          <div className="mt-3 flex flex-wrap gap-2">
                            <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
                              {event.city}
                            </span>
                            <span className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">
                              {new Date(event.date).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <div className="flex space-x-2 ml-4">
                          <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                            <Edit2 className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDelete('events', event.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No events yet. Create your first event!</p>
                </div>
              )
            ) : activeTab === 'news' ? (
              userData.news.length > 0 ? (
                <div className="space-y-4">
                  {userData.news.map((newsItem) => (
                    <div key={newsItem.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-900">{newsItem.title}</h3>
                          <p className="text-sm text-gray-600 mt-1">{newsItem.summary}</p>
                          <div className="mt-3 flex flex-wrap gap-2">
                            <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                              {newsItem.city}
                            </span>
                            <span className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">
                              {new Date(newsItem.published_at).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <div className="flex space-x-2 ml-4">
                          <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                            <Edit2 className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDelete('news', newsItem.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Newspaper className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No news articles yet. Create your first article!</p>
                </div>
              )
            ) : (
              userData.services.length > 0 ? (
                <div className="space-y-4">
                  {userData.services.map((service) => (
                    <div key={service.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-900">{service.name}</h3>
                          <p className="text-sm text-gray-600 mt-1">{service.description}</p>
                          <div className="mt-3 flex flex-wrap gap-2">
                            <span className="inline-block bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-medium">
                              {service.city}
                            </span>
                            {service.rating > 0 && (
                              <span className="inline-block bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-medium">
                                Rating: {service.rating}/5
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex space-x-2 ml-4">
                          <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                            <Edit2 className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDelete('services', service.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Briefcase className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No services yet. Create your first service!</p>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;