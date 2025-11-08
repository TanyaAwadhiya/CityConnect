import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Users, Building2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import FeaturedNews from '../components/home/FeaturedNews';
import EventsSection from '../components/home/EventsSection';
import ServicesSection from '../components/home/ServicesSection';

interface CityData {
  name: string;
  description: string;
  population?: string;
  established?: string;
}

const CityDetailPage: React.FC = () => {
  const { cityName } = useParams<{ cityName: string }>();
  const navigate = useNavigate();
  const [cityData, setCityData] = useState<CityData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (cityName) {
      setCityData({
        name: decodeURIComponent(cityName),
        description: `Explore the vibrant city of ${decodeURIComponent(cityName)} with its rich culture, history, and modern developments.`,
        population: '1.2M+',
        established: '1800s',
      });
      setLoading(false);
    }
  }, [cityName]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-800"></div>
          <p className="mt-4 text-gray-600">Loading city information...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="pt-20">
      <button
        onClick={() => navigate(-1)}
        className="fixed top-24 left-4 z-40 flex items-center space-x-2 bg-white shadow-lg rounded-lg px-4 py-2 hover:bg-gray-50 transition-colors"
      >
        <ArrowLeft className="h-5 w-5" />
        <span>Back</span>
      </button>

      <div className="h-64 bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center">
        <div className="text-center text-white">
          <MapPin className="h-16 w-16 mx-auto mb-4" />
          <h1 className="text-5xl font-bold">{cityData?.name}</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
            <p className="text-gray-700 text-lg leading-relaxed mb-8">
              {cityData?.description}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-blue-50 rounded-lg p-6">
                <div className="flex items-center space-x-3 mb-2">
                  <Users className="h-6 w-6 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Population</h3>
                </div>
                <p className="text-gray-700">{cityData?.population}</p>
              </div>

              <div className="bg-green-50 rounded-lg p-6">
                <div className="flex items-center space-x-3 mb-2">
                  <Building2 className="h-6 w-6 text-green-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Established</h3>
                </div>
                <p className="text-gray-700">{cityData?.established}</p>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Discover {cityData?.name}
            </h2>
            <p className="text-gray-600 mb-6">
              Explore the latest news, upcoming events, and essential services available in {cityData?.name}.
            </p>
          </div>
        </div>
      </div>

      <FeaturedNews />
      <EventsSection />
      <ServicesSection />
    </main>
  );
};

export default CityDetailPage;
