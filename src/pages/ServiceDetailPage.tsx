import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Phone, Mail, ExternalLink } from 'lucide-react';
import { cityServices, departments } from '../data/cityData';
import Button from '../components/ui/Button';
import * as Icons from 'lucide-react';

const ServiceDetailPage: React.FC = () => {
  const { id } = useParams();
  const service = cityServices.find(item => item.id === id);
  
  if (!service) {
    return (
      <div className="pt-24 pb-16 min-h-screen bg-gray-50">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Service not found</h1>
          <Link to="/services" className="text-blue-800 hover:text-blue-900 flex items-center">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Services
          </Link>
        </div>
      </div>
    );
  }

  const department = departments.find(dept => dept.id === service.departmentId);
  const IconComponent = Icons[service.icon as keyof typeof Icons] || Icons.HelpCircle;

  return (
    <div className="pt-24 pb-16 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4">
        <Link to="/services" className="text-blue-800 hover:text-blue-900 flex items-center mb-6">
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Services
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center mb-6">
                <div className="bg-blue-100 p-3 rounded-lg mr-4">
                  <IconComponent className="h-8 w-8 text-blue-800" />
                </div>
                <h1 className="text-4xl font-bold">{service.name}</h1>
              </div>

              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed mb-6">
                  {service.description}
                  {/* Add more detailed content here */}
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>

                <h2 className="text-2xl font-bold mb-4">How to Access This Service</h2>
                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                  <ol className="list-decimal list-inside space-y-4">
                    <li>Visit the department office during business hours</li>
                    <li>Bring required documentation</li>
                    <li>Complete the necessary forms</li>
                    <li>Pay any applicable fees</li>
                  </ol>
                </div>

                <h2 className="text-2xl font-bold mb-4">Required Documents</h2>
                <ul className="list-disc list-inside mb-6">
                  <li>Valid government-issued ID</li>
                  <li>Proof of residence</li>
                  <li>Completed application form</li>
                </ul>

                <h2 className="text-2xl font-bold mb-4">Fees</h2>
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Application Fee</span>
                      <span className="font-medium">$50</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Processing Fee</span>
                      <span className="font-medium">$25</span>
                    </div>
                    <div className="border-t border-gray-200 pt-2 mt-2">
                      <div className="flex justify-between font-bold">
                        <span>Total</span>
                        <span>$75</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {department && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold mb-4">Department Information</h2>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-gray-400 mr-3" />
                    <div>
                      <p className="font-medium">Hours</p>
                      <p className="text-gray-600">{department.hours}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-gray-400 mr-3" />
                    <div>
                      <p className="font-medium">Phone</p>
                      <a 
                        href={`tel:${department.contactPhone}`}
                        className="text-blue-800 hover:text-blue-900"
                      >
                        {department.contactPhone}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-gray-400 mr-3" />
                    <div>
                      <p className="font-medium">Email</p>
                      <a 
                        href={`mailto:${department.contactEmail}`}
                        className="text-blue-800 hover:text-blue-900"
                      >
                        {department.contactEmail}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold mb-4">Quick Links</h2>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  fullWidth
                  className="justify-between"
                  icon={<ExternalLink className="h-5 w-5" />}
                  iconPosition="right"
                >
                  Download Forms
                </Button>
                <Button
                  variant="outline"
                  fullWidth
                  className="justify-between"
                  icon={<ExternalLink className="h-5 w-5" />}
                  iconPosition="right"
                >
                  Schedule Appointment
                </Button>
                <Button
                  variant="outline"
                  fullWidth
                  className="justify-between"
                  icon={<ExternalLink className="h-5 w-5" />}
                  iconPosition="right"
                >
                  Pay Fees Online
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailPage;