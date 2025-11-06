import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, MapPin, Share2, Download } from 'lucide-react';
import { events } from '../data/cityData';
import Button from '../components/ui/Button';

const EventDetailPage: React.FC = () => {
  const { id } = useParams();
  const event = events.find(item => item.id === id);

  if (!event) {
    return (
      <div className="pt-24 pb-16 min-h-screen bg-gray-50">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Event not found</h1>
          <Link to="/events" className="text-blue-800 hover:text-blue-900 flex items-center">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Events
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
        <Link to="/events" className="text-blue-800 hover:text-blue-900 flex items-center mb-6">
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Events
        </Link>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="relative h-[400px]">
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="p-6">
            <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
              <div>
                <h1 className="text-4xl font-bold mb-4">{event.title}</h1>
                <div className="flex flex-wrap gap-4 text-gray-600">
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-blue-800" />
                    {formatDate(event.date)}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 mr-2 text-blue-800" />
                    {event.time}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 mr-2 text-blue-800" />
                    {event.location}
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  icon={<Share2 className="h-5 w-5" />}
                  iconPosition="left"
                >
                  Share
                </Button>
                <Button
                  variant="outline"
                  icon={<Download className="h-5 w-5" />}
                  iconPosition="left"
                >
                  Add to Calendar
                </Button>
              </div>
            </div>

            <div className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed mb-6">
                {event.description}
                {/* Add more detailed content here */}
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>

            <div className="border-t border-gray-200 pt-6 mt-6">
              <h2 className="text-2xl font-bold mb-4">Other Upcoming Events</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events
                  .filter(item => item.id !== event.id)
                  .slice(0, 3)
                  .map(item => (
                    <Link
                      key={item.id}
                      to={`/events/${item.id}`}
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
                        <p className="text-sm text-gray-600 mt-2">
                          {formatDate(item.date)} • {item.time}
                        </p>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailPage;