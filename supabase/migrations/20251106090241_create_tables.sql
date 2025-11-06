/*
  # Create core tables for CityConnect

  1. New Tables
    - `events` - Store city events
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `date` (timestamp)
      - `location` (text)
      - `city` (text)
      - `image_url` (text)
      - `category` (text)
      - `created_at` (timestamp)
      - `user_id` (uuid, foreign key to auth.users)

    - `news` - Store city news articles
      - `id` (uuid, primary key)
      - `title` (text)
      - `content` (text)
      - `summary` (text)
      - `image_url` (text)
      - `category` (text)
      - `city` (text)
      - `published_at` (timestamp)
      - `created_at` (timestamp)
      - `user_id` (uuid, foreign key to auth.users)

    - `services` - Store city services
      - `id` (uuid, primary key)
      - `name` (text)
      - `description` (text)
      - `category` (text)
      - `phone` (text)
      - `email` (text)
      - `website` (text)
      - `city` (text)
      - `rating` (numeric)
      - `created_at` (timestamp)
      - `user_id` (uuid, foreign key to auth.users)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to read all data
    - Add policies for users to manage their own data
*/

CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  date timestamptz NOT NULL,
  location text NOT NULL,
  city text NOT NULL,
  image_url text,
  category text NOT NULL,
  created_at timestamptz DEFAULT now(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS news (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  summary text NOT NULL,
  image_url text,
  category text NOT NULL,
  city text NOT NULL,
  published_at timestamptz NOT NULL,
  created_at timestamptz DEFAULT now(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  category text NOT NULL,
  phone text,
  email text,
  website text,
  city text NOT NULL,
  rating numeric DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE
);

ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE news ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read events"
  ON events
  FOR SELECT
  TO authenticated, anon
  USING (true);

CREATE POLICY "Users can create events"
  ON events
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own events"
  ON events
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own events"
  ON events
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Anyone can read news"
  ON news
  FOR SELECT
  TO authenticated, anon
  USING (true);

CREATE POLICY "Users can create news"
  ON news
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own news"
  ON news
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own news"
  ON news
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Anyone can read services"
  ON services
  FOR SELECT
  TO authenticated, anon
  USING (true);

CREATE POLICY "Users can create services"
  ON services
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own services"
  ON services
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own services"
  ON services
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);