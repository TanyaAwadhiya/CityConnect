import React from 'react';
import { events } from '../data/cityData';
import EventCard from '../components/events/EventCard';
import Button from '../components/ui/Button';
import { Calendar } from 'lucide-react';

const EventsPage: React.FC = () => {
  return (
    <div className="pt-24 pb-16 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Upcoming Events</h1>
          <Button
            variant="primary"
            icon={<Calendar className="h-5 w-5" />}
            iconPosition="left"
          >
            Submit Event
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {events.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>

        <div className="bg-white rounded-lg p-8 shadow-sm">
          <h2 className="text-2xl font-bold mb-4">Want to host an event?</h2>
          <p className="text-gray-600 mb-6">
            We welcome community events that bring our city together. Submit your event for consideration
            in our official city calendar.
          </p>
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <div className="bg-blue-100 p-2 rounded-lg">
                <Calendar className="h-6 w-6 text-blue-800" />
              </div>
              <div>
                <h3 className="font-semibold">Event Guidelines</h3>
                <p className="text-gray-600">Review our event submission guidelines and requirements</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsPage;