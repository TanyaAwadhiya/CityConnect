import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { indianCities } from '../data/indianCities';
import { MapPin } from 'lucide-react';

const SearchPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const filteredCities = query
    ? indianCities.filter(city => 
        city.name.toLowerCase().includes(query.toLowerCase()) ||
        city.state.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div className="pt-24 pb-16 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-2">Search Results</h1>
        <p className="text-gray-600 mb-8">
          {filteredCities.length} {filteredCities.length === 1 ? 'result' : 'results'} for "{query}"
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCities.map(city => (
            <Link
              key={city.id}
              to={`/city/${encodeURIComponent(city.name)}`}
              className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="relative h-48">
                <img
                  src={city.image}
                  alt={city.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">{city.name}</h2>
                    <p className="text-gray-600">{city.state}</p>
                  </div>
                  <MapPin className="h-5 w-5 text-blue-800 flex-shrink-0" />
                </div>
                <p className="text-gray-600 mt-2 line-clamp-2">{city.description}</p>
              </div>
            </Link>
          ))}
        </div>

        {filteredCities.length === 0 && (
          <div className="text-center py-12">
            <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">No cities found</h2>
            <p className="text-gray-600">
              Try adjusting your search terms or browse all cities
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;