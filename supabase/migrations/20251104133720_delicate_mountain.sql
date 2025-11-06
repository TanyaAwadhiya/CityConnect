/*
  # Initial Database Schema for City Connect

  1. New Tables
    - `cities`
      - `id` (uuid, primary key)
      - `name` (text)
      - `description` (text)
      - `image` (text)
      - `state` (text)
      - `population` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `places`
      - `id` (uuid, primary key)
      - `city_id` (uuid, foreign key)
      - `name` (text)
      - `description` (text)
      - `image` (text)
      - `type` (text)
      - `created_at` (timestamp)
    
    - `institutions`
      - `id` (uuid, primary key)
      - `city_id` (uuid, foreign key)
      - `name` (text)
      - `description` (text)
      - `established` (text)
      - `type` (text)
      - `rating` (text)
      - `specialties` (text[])
      - `image` (text)
      - `category` (text) -- 'college' or 'hospital'
      - `created_at` (timestamp)
    
    - `news`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `content` (text)
      - `date` (date)
      - `image` (text)
      - `category` (text)
      - `featured` (boolean)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `events`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `content` (text)
      - `date` (date)
      - `time` (text)
      - `location` (text)
      - `image` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `departments`
      - `id` (uuid, primary key)
      - `name` (text)
      - `description` (text)
      - `contact_email` (text)
      - `contact_phone` (text)
      - `hours` (text)
      - `created_at` (timestamp)
    
    - `services`
      - `id` (uuid, primary key)
      - `department_id` (uuid, foreign key)
      - `name` (text)
      - `description` (text)
      - `icon` (text)
      - `link` (text)
      - `created_at` (timestamp)
    
    - `alerts`
      - `id` (uuid, primary key)
      - `message` (text)
      - `type` (text)
      - `active` (boolean)
      - `created_at` (timestamp)
      - `expires_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access
    - Add policies for authenticated users to manage content
*/

-- Create cities table
CREATE TABLE IF NOT EXISTS cities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  image text NOT NULL,
  state text NOT NULL,
  population text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create places table
CREATE TABLE IF NOT EXISTS places (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  city_id uuid REFERENCES cities(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text NOT NULL,
  image text NOT NULL,
  type text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create institutions table
CREATE TABLE IF NOT EXISTS institutions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  city_id uuid REFERENCES cities(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text NOT NULL,
  established text,
  type text NOT NULL,
  rating text,
  specialties text[],
  image text NOT NULL,
  category text NOT NULL CHECK (category IN ('college', 'hospital')),
  created_at timestamptz DEFAULT now()
);

-- Create news table
CREATE TABLE IF NOT EXISTS news (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  content text,
  date date NOT NULL,
  image text NOT NULL,
  category text NOT NULL CHECK (category IN ('event', 'update', 'announcement', 'emergency')),
  featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create events table
CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  content text,
  date date NOT NULL,
  time text NOT NULL,
  location text NOT NULL,
  image text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create departments table
CREATE TABLE IF NOT EXISTS departments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  contact_email text NOT NULL,
  contact_phone text NOT NULL,
  hours text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create services table
CREATE TABLE IF NOT EXISTS services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  department_id uuid REFERENCES departments(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text NOT NULL,
  icon text NOT NULL,
  link text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create alerts table
CREATE TABLE IF NOT EXISTS alerts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  message text NOT NULL,
  type text NOT NULL CHECK (type IN ('info', 'warning', 'error', 'success')),
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  expires_at timestamptz
);

-- Enable Row Level Security
ALTER TABLE cities ENABLE ROW LEVEL SECURITY;
ALTER TABLE places ENABLE ROW LEVEL SECURITY;
ALTER TABLE institutions ENABLE ROW LEVEL SECURITY;
ALTER TABLE news ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE alerts ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Public can read cities" ON cities FOR SELECT TO public USING (true);
CREATE POLICY "Public can read places" ON places FOR SELECT TO public USING (true);
CREATE POLICY "Public can read institutions" ON institutions FOR SELECT TO public USING (true);
CREATE POLICY "Public can read news" ON news FOR SELECT TO public USING (true);
CREATE POLICY "Public can read events" ON events FOR SELECT TO public USING (true);
CREATE POLICY "Public can read departments" ON departments FOR SELECT TO public USING (true);
CREATE POLICY "Public can read services" ON services FOR SELECT TO public USING (true);
CREATE POLICY "Public can read active alerts" ON alerts FOR SELECT TO public USING (active = true);

-- Create policies for authenticated users to manage content
CREATE POLICY "Authenticated users can manage cities" ON cities FOR ALL TO authenticated USING (true);
CREATE POLICY "Authenticated users can manage places" ON places FOR ALL TO authenticated USING (true);
CREATE POLICY "Authenticated users can manage institutions" ON institutions FOR ALL TO authenticated USING (true);
CREATE POLICY "Authenticated users can manage news" ON news FOR ALL TO authenticated USING (true);
CREATE POLICY "Authenticated users can manage events" ON events FOR ALL TO authenticated USING (true);
CREATE POLICY "Authenticated users can manage departments" ON departments FOR ALL TO authenticated USING (true);
CREATE POLICY "Authenticated users can manage services" ON services FOR ALL TO authenticated USING (true);
CREATE POLICY "Authenticated users can manage alerts" ON alerts FOR ALL TO authenticated USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_places_city_id ON places(city_id);
CREATE INDEX IF NOT EXISTS idx_institutions_city_id ON institutions(city_id);
CREATE INDEX IF NOT EXISTS idx_services_department_id ON services(department_id);
CREATE INDEX IF NOT EXISTS idx_news_featured ON news(featured);
CREATE INDEX IF NOT EXISTS idx_news_date ON news(date DESC);
CREATE INDEX IF NOT EXISTS idx_events_date ON events(date ASC);
CREATE INDEX IF NOT EXISTS idx_alerts_active ON alerts(active);