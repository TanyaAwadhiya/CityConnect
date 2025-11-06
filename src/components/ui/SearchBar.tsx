import React, { useState, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { indianCities } from '../../data/indianCities';

interface SearchBarProps {
  mobile?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ mobile }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  
  const filteredCities = searchQuery
    ? indianCities.filter(city => 
        city.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        city.state.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setShowSuggestions(false);
      if (!mobile) {
        setIsExpanded(false);
      }
    }
  };
  
  const expandSearch = () => {
    if (!mobile) {
      setIsExpanded(true);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };
  
  const collapseSearch = () => {
    if (!mobile && searchQuery === '') {
      setIsExpanded(false);
    }
    setTimeout(() => setShowSuggestions(false), 200);
  };
  
  const clearSearch = () => {
    setSearchQuery('');
    setShowSuggestions(false);
    if (!mobile) {
      setIsExpanded(false);
    }
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      clearSearch();
    }
  };

  const handleCityClick = (cityId: string) => {
    setSearchQuery('');
    setShowSuggestions(false);
    if (!mobile) {
      setIsExpanded(false);
    }
    navigate(`/cities/${cityId}`);
  };
  
  if (mobile) {
    return (
      <div className="relative w-full">
        <form 
          onSubmit={handleSearch} 
          className="relative w-full"
          role="search"
        >
          <input
            ref={inputRef}
            type="search"
            placeholder="Search cities..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            onBlur={collapseSearch}
            onKeyDown={handleKeyDown}
            className="w-full bg-gray-100 rounded-md pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-800"
            aria-label="Search cities"
          />
          <Search 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" 
            aria-hidden="true"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-200 rounded-full transition-colors"
              aria-label="Clear search"
            >
              <X className="h-4 w-4 text-gray-500" aria-hidden="true" />
            </button>
          )}
        </form>

        {showSuggestions && searchQuery && (
          <div className="absolute z-50 top-full left-0 right-0 mt-1 bg-white rounded-md shadow-lg max-h-64 overflow-y-auto">
            {filteredCities.length > 0 ? (
              filteredCities.map(city => (
                <button
                  key={city.id}
                  onClick={() => handleCityClick(city.id)}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
                >
                  <div className="font-medium">{city.name}</div>
                  <div className="text-sm text-gray-600">{city.state}</div>
                </button>
              ))
            ) : (
              <div className="px-4 py-2 text-gray-600">No cities found</div>
            )}
          </div>
        )}
      </div>
    );
  }
  
  return (
    <div className={`relative flex items-center ${isExpanded ? 'w-60' : 'w-10'} transition-all duration-300`}>
      <form 
        onSubmit={handleSearch} 
        className="relative flex items-center w-full"
        role="search"
      >
        <button
          type="button"
          onClick={expandSearch}
          className={`absolute left-2 z-10 p-1 rounded-full hover:bg-gray-100 transition-colors ${
            isExpanded ? 'text-gray-500' : 'text-gray-700 hover:text-blue-800'
          }`}
          aria-label={isExpanded ? 'Submit search' : 'Open search'}
          aria-expanded={isExpanded}
        >
          <Search className="h-5 w-5" aria-hidden="true" />
        </button>
        
        <input
          ref={inputRef}
          type="search"
          placeholder="Search cities..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setShowSuggestions(true);
          }}
          onFocus={() => setShowSuggestions(true)}
          onBlur={collapseSearch}
          onKeyDown={handleKeyDown}
          className={`
            bg-gray-100 rounded-full 
            ${isExpanded ? 'pl-9 pr-8 py-2 w-full opacity-100' : 'w-0 p-0 opacity-0'} 
            transition-all duration-300 
            focus:outline-none focus:ring-2 focus:ring-blue-800
          `}
          aria-label="Search cities"
          aria-hidden={!isExpanded}
        />
        
        {isExpanded && searchQuery && (
          <button
            type="button"
            onClick={clearSearch}
            className="absolute right-2 p-1 hover:bg-gray-200 rounded-full transition-colors"
            aria-label="Clear search"
          >
            <X className="h-4 w-4 text-gray-500" aria-hidden="true" />
          </button>
        )}
      </form>

      {showSuggestions && searchQuery && isExpanded && (
        <div className="absolute z-50 top-full left-0 right-0 mt-1 bg-white rounded-md shadow-lg max-h-64 overflow-y-auto">
          {filteredCities.length > 0 ? (
            filteredCities.map(city => (
              <button
                key={city.id}
                onClick={() => handleCityClick(city.id)}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
              >
                <div className="font-medium">{city.name}</div>
                <div className="text-sm text-gray-600">{city.state}</div>
              </button>
            ))
          ) : (
            <div className="px-4 py-2 text-gray-600">No cities found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;