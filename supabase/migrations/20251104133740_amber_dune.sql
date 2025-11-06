/*
  # Seed Initial Data for City Connect

  This migration populates the database with initial data for cities, places, institutions,
  news, events, departments, services, and alerts.
*/

-- Insert cities
INSERT INTO cities (id, name, description, image, state, population) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'Delhi', 'The capital of India, Delhi is a city where ancient and modern blend seamlessly together.', 'https://images.pexels.com/photos/1007426/pexels-photo-1007426.jpeg', 'Delhi', '19 million'),
('550e8400-e29b-41d4-a716-446655440002', 'Mumbai', 'The financial capital of India, known for its entertainment industry and vibrant culture.', 'https://images.pexels.com/photos/2409953/pexels-photo-2409953.jpeg', 'Maharashtra', '20 million'),
('550e8400-e29b-41d4-a716-446655440003', 'Bangalore', 'India''s Silicon Valley, known for its pleasant climate and tech industry.', 'https://images.pexels.com/photos/3573382/pexels-photo-3573382.jpeg', 'Karnataka', '12 million'),
('550e8400-e29b-41d4-a716-446655440004', 'Bhopal', 'The City of Lakes, known for its rich history and natural beauty.', 'https://images.pexels.com/photos/15873486/pexels-photo-15873486.jpeg', 'Madhya Pradesh', '2.3 million'),
('550e8400-e29b-41d4-a716-446655440005', 'Indore', 'The cleanest city in India, famous for its street food and historical landmarks.', 'https://images.pexels.com/photos/11451749/pexels-photo-11451749.jpeg', 'Madhya Pradesh', '2.2 million');

-- Insert places for Delhi
INSERT INTO places (city_id, name, description, image, type) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'Red Fort', 'Historic fortress built in the 17th century, showcasing Mughal architecture.', 'https://images.pexels.com/photos/13317316/pexels-photo-13317316.jpeg', 'monument'),
('550e8400-e29b-41d4-a716-446655440001', 'Qutub Minar', 'UNESCO World Heritage site featuring a 73-meter tall minaret built in 1193.', 'https://images.pexels.com/photos/13513595/pexels-photo-13513595.jpeg', 'monument'),
('550e8400-e29b-41d4-a716-446655440001', 'India Gate', 'War memorial dedicated to Indian soldiers who died in World War I.', 'https://images.pexels.com/photos/789750/pexels-photo-789750.jpeg', 'monument');

-- Insert places for Mumbai
INSERT INTO places (city_id, name, description, image, type) VALUES
('550e8400-e29b-41d4-a716-446655440002', 'Gateway of India', 'Iconic arch monument built in the early 20th century.', 'https://images.pexels.com/photos/4134644/pexels-photo-4134644.jpeg', 'monument'),
('550e8400-e29b-41d4-a716-446655440002', 'Marine Drive', '3.6-kilometer-long boulevard along the coastline, also known as the Queen''s Necklace.', 'https://images.pexels.com/photos/4134634/pexels-photo-4134634.jpeg', 'other');

-- Insert institutions for Delhi
INSERT INTO institutions (city_id, name, description, established, type, rating, image, category) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'University of Delhi', 'One of India''s premier universities offering diverse undergraduate and postgraduate programs.', '1922', 'Public University', 'NAAC A++', 'https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg', 'college'),
('550e8400-e29b-41d4-a716-446655440001', 'IIT Delhi', 'Premier engineering institution known for research and innovation.', '1961', 'Technical Institute', 'Institute of National Importance', 'https://images.pexels.com/photos/256490/pexels-photo-256490.jpeg', 'college'),
('550e8400-e29b-41d4-a716-446655440001', 'All India Institute of Medical Sciences', 'India''s leading public healthcare institute and hospital.', '1956', 'Government Hospital', NULL, 'https://images.pexels.com/photos/247786/pexels-photo-247786.jpeg', 'hospital');

-- Insert news
INSERT INTO news (title, description, content, date, image, category, featured) VALUES
('New Community Center Opening Soon', 'The long-awaited North District Community Center will open its doors next month, offering new recreational facilities for all residents.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...', '2025-06-15', 'https://images.pexels.com/photos/1868676/pexels-photo-1868676.jpeg', 'update', true),
('Road Construction on Main Street', 'Starting next week, construction will begin on Main Street between Oak Avenue and Pine Boulevard. Please plan alternative routes.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...', '2025-06-10', 'https://images.pexels.com/photos/159358/construction-site-build-construction-work-159358.jpeg', 'announcement', false),
('Summer Festival Lineup Announced', 'This year''s summer festival will feature local bands, food vendors, and activities for all ages. Mark your calendars for July 15-17.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...', '2025-06-05', 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg', 'event', true);

-- Insert events
INSERT INTO events (title, description, content, date, time, location, image) VALUES
('Farmers Market', 'Local vendors selling fresh produce, crafts, and food.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...', '2025-06-18', '9:00 AM - 2:00 PM', 'City Square Park', 'https://images.pexels.com/photos/2907348/pexels-photo-2907348.jpeg'),
('Town Hall Meeting', 'Open forum for community members to discuss local issues.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...', '2025-06-20', '6:30 PM - 8:30 PM', 'City Hall Auditorium', 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg'),
('Summer Concert Series', 'Free outdoor concert featuring local bands.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...', '2025-06-25', '7:00 PM - 9:00 PM', 'Riverside Amphitheater', 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg');

-- Insert departments
INSERT INTO departments (id, name, description, contact_email, contact_phone, hours) VALUES
('d1', 'Parks & Recreation', 'Manages all city parks, recreational facilities, and community programs.', 'parks@cityconnect.in', '+91 98765 43210', 'Mon-Fri: 8am-5pm'),
('d2', 'Public Works', 'Maintains roads, sewers, and other public infrastructure.', 'publicworks@cityconnect.in', '+91 98765 43211', 'Mon-Fri: 7am-4pm'),
('d3', 'City Hall', 'Administrative offices and city government headquarters.', 'info@cityconnect.in', '+91 98765 43212', 'Mon-Fri: 9am-5pm'),
('d4', 'Police Department', 'Emergency services and public safety.', 'police@cityconnect.in', '+91 98765 43213', '24/7'),
('d5', 'Fire Department', 'Fire prevention, emergency medical services, and rescue operations.', 'fire@cityconnect.in', '+91 98765 43214', '24/7');

-- Insert services
INSERT INTO services (department_id, name, description, icon, link) VALUES
('d2', 'Garbage Collection', 'Weekly residential garbage and recycling pickup service.', 'trash', '/services/garbage'),
('d3', 'Building Permits', 'Apply for permits for construction, renovation, and other building projects.', 'building', '/services/permits'),
('d1', 'Recreation Programs', 'Sports, arts, and educational programs for all ages.', 'palette', '/services/recreation'),
('d2', 'Water & Utilities', 'Water, sewer, and other utility services for residents and businesses.', 'droplets', '/services/utilities'),
('d3', 'Property Taxes', 'Information about property tax rates, payments, and assessments.', 'landmark', '/services/taxes'),
('d4', 'Emergency Services', 'Fire, medical, and police emergency response services.', 'ambulance', '/services/emergency');

-- Insert alerts
INSERT INTO alerts (message, type, active) VALUES
('Welcome to City Connect - Your gateway to exploring Indian cities!', 'info', true),
('New features added: Search for cities and explore their culture', 'success', true);