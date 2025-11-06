import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { CalendarDays, ArrowLeft } from 'lucide-react';
import { newsItems } from '../data/cityData';
import Badge from '../components/ui/Badge';

const NewsDetailPage: React.FC = () => {
  const { id } = useParams();
  const news = newsItems.find(item => item.id === id);

  if (!news) {
    return (
      <div className="pt-24 pb-16 min-h-screen bg-gray-50">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">News not found</h1>
          <Link to="/news" className="text-blue-800 hover:text-blue-900 flex items-center">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to News
          </Link>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="pt-24 pb-16 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4">
        <Link to="/news" className="text-blue-800 hover:text-blue-900 flex items-center mb-6">
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to News
        </Link>

        <article className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="relative h-[400px]">
            <img
              src={news.image}
              alt={news.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6 text-white">
              <div className="flex items-center space-x-4 mb-4">
                <Badge type="primary">{news.category}</Badge>
                <div className="flex items-center text-sm">
                  <CalendarDays className="h-4 w-4 mr-2" />
                  {formatDate(news.date)}
                </div>
              </div>
              <h1 className="text-4xl font-bold mb-2">{news.title}</h1>
            </div>
          </div>

          <div className="p-6">
            <p className="text-gray-700 leading-relaxed mb-6">
              {news.description}
              {/* Add more detailed content here */}
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>

            <div className="border-t border-gray-200 pt-6 mt-6">
              <h2 className="text-2xl font-bold mb-4">Related News</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {newsItems
                  .filter(item => item.id !== news.id)
                  .slice(0, 3)
                  .map(item => (
                    <Link
                      key={item.id}
                      to={`/news/${item.id}`}
                      className="group block bg-gray-50 rounded-lg overflow-hidden hover:bg-gray-100 transition-colors"
                    >
                      <div className="relative h-48">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-gray-900 group-hover:text-blue-800 transition-colors">
                          {item.title}
                        </h3>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default NewsDetailPage;