import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Plus, Edit2, Trash2, Calendar, Newspaper, Briefcase, User, Save, X } from 'lucide-react';
import Button from '../components/ui/Button';

interface UserData {
  events: any[];
  news: any[];
  services: any[];
}

interface UserProfile {
  id: string;
  full_name: string;
  email: string;
  phone_number: string;
  addresses: string;
  city: string;
  bio: string;
}

const DashboardPage: React.FC = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserData>({
    events: [],
    news: [],
    services: [],
  });
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [editingProfile, setEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({
    full_name: '',
    email: '',
    phone_number: '',
    addresses: '',
  });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'events' | 'news' | 'services' | 'profile'>('profile');

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) {
      fetchUserData();
      fetchUserProfile();
    }
  }, [user]);

  const fetchUserProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', user?.id)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setProfile(data);
        setProfileForm({
          full_name: data.full_name || '',
          email: data.email || '',
          phone_number: data.phone_number || '',
          addresses: data.addresses || '',
        });
      } else {
        setProfileForm({
          full_name: '',
          email: user?.email || '',
          phone_number: '',
          addresses: '',
        });
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

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

  const handleSaveProfile = async () => {
    try {
      const { error } = await supabase
        .from('user_profiles')
        .upsert({
          id: user?.id,
          full_name: profileForm.full_name,
          email: profileForm.email,
          phone_number: profileForm.phone_number,
          addresses: profileForm.addresses,
          updated_at: new Date().toISOString(),
        });

      if (error) throw error;

      setEditingProfile(false);
      fetchUserProfile();
    } catch (error) {
      console.error('Error saving profile:', error);
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
                onClick={() => setActiveTab('profile')}
                className={`flex-1 px-6 py-4 font-medium text-center transition-colors ${
                  activeTab === 'profile'
                    ? 'border-b-2 border-amber-500 text-amber-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <div className="flex items-center justify-center space-x-2">
                  <User className="h-5 w-5" />
                  <span>Profile</span>
                </div>
              </button>
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
            {activeTab === 'profile' && (
              <div>
                {!editingProfile ? (
                  <div className="space-y-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900">Profile Information</h2>
                        <p className="text-gray-600 mt-1">Manage your personal details</p>
                      </div>
                      <button
                        onClick={() => setEditingProfile(true)}
                        className="flex items-center space-x-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
                      >
                        <Edit2 className="h-4 w-4" />
                        <span>Edit Profile</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm font-medium text-gray-600">Full Name</p>
                        <p className="text-lg text-gray-900 mt-1">{profileForm.full_name || 'Not set'}</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm font-medium text-gray-600">Email</p>
                        <p className="text-lg text-gray-900 mt-1">{profileForm.email || 'Not set'}</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm font-medium text-gray-600">Phone Number</p>
                        <p className="text-lg text-gray-900 mt-1">{profileForm.phone_number || 'Not set'}</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm font-medium text-gray-600">Addresses</p>
                        <p className="text-lg text-gray-900 mt-1">{profileForm.addresses || 'Not set'}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-gray-900">Edit Profile</h2>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                        <input
                          type="text"
                          value={profileForm.full_name}
                          onChange={(e) => setProfileForm({ ...profileForm, full_name: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                          placeholder="Enter your full name"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <input
                          type="email"
                          value={profileForm.email}
                          onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                          placeholder="Enter your email"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                        <input
                          type="tel"
                          value={profileForm.phone_number}
                          onChange={(e) => setProfileForm({ ...profileForm, phone_number: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                          placeholder="Enter your phone number"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Addresses</label>
                        <textarea
                          value={profileForm.addresses}
                          onChange={(e) => setProfileForm({ ...profileForm, addresses: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                          placeholder="Enter your addresses"
                          rows={4}
                        />
                      </div>
                    </div>

                    <div className="flex space-x-3">
                      <button
                        onClick={handleSaveProfile}
                        className="flex items-center space-x-2 px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
                      >
                        <Save className="h-4 w-4" />
                        <span>Save Changes</span>
                      </button>
                      <button
                        onClick={() => setEditingProfile(false)}
                        className="flex items-center space-x-2 px-6 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition-colors"
                      >
                        <X className="h-4 w-4" />
                        <span>Cancel</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab !== 'profile' && (
              <>
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
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;