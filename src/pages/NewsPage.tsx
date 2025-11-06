import React from 'react';
import { newsItems } from '../data/cityData';
import NewsCard from '../components/news/NewsCard';

const NewsPage: React.FC = () => {
  return (
    <div className="pt-24 pb-16 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-gray-900">Latest News & Updates</h1>
        
        {/* Featured News */}
        <div className="mb-12">
          {newsItems
            .filter(news => news.featured)
            .map(news => (
              <NewsCard key={news.id} news={news} featured />
            ))}
        </div>
        
        {/* All News */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsItems
            .filter(news => !news.featured)
            .map(news => (
              <NewsCard key={news.id} news={news} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default NewsPage;