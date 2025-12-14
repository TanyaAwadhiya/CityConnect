/*
  # Fix security and performance issues

  1. Add Indexes
    - Create indexes on foreign keys for optimal query performance
    - events(user_id), news(user_id), services(user_id)

  2. Optimize RLS Policies
    - Replace auth.uid() with (select auth.uid()) in all policies
    - This prevents re-evaluation on each row and improves performance at scale

  3. Security Note
    - Leaked password protection must be enabled in Supabase Auth dashboard settings
*/

CREATE INDEX IF NOT EXISTS events_user_id_idx ON events(user_id);
CREATE INDEX IF NOT EXISTS news_user_id_idx ON news(user_id);
CREATE INDEX IF NOT EXISTS services_user_id_idx ON services(user_id);

DROP POLICY IF EXISTS "Users can create events" ON events;
CREATE POLICY "Users can create events"
  ON events
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = (select auth.uid()));

DROP POLICY IF EXISTS "Users can update own events" ON events;
CREATE POLICY "Users can update own events"
  ON events
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = (select auth.uid()))
  WITH CHECK (auth.uid() = (select auth.uid()));

DROP POLICY IF EXISTS "Users can delete own events" ON events;
CREATE POLICY "Users can delete own events"
  ON events
  FOR DELETE
  TO authenticated
  USING (auth.uid() = (select auth.uid()));

DROP POLICY IF EXISTS "Users can create news" ON news;
CREATE POLICY "Users can create news"
  ON news
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = (select auth.uid()));

DROP POLICY IF EXISTS "Users can update own news" ON news;
CREATE POLICY "Users can update own news"
  ON news
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = (select auth.uid()))
  WITH CHECK (auth.uid() = (select auth.uid()));

DROP POLICY IF EXISTS "Users can delete own news" ON news;
CREATE POLICY "Users can delete own news"
  ON news
  FOR DELETE
  TO authenticated
  USING (auth.uid() = (select auth.uid()));

DROP POLICY IF EXISTS "Users can create services" ON services;
CREATE POLICY "Users can create services"
  ON services
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = (select auth.uid()));

DROP POLICY IF EXISTS "Users can update own services" ON services;
CREATE POLICY "Users can update own services"
  ON services
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = (select auth.uid()))
  WITH CHECK (auth.uid() = (select auth.uid()));

DROP POLICY IF EXISTS "Users can delete own services" ON services;
CREATE POLICY "Users can delete own services"
  ON services
  FOR DELETE
  TO authenticated
  USING (auth.uid() = (select auth.uid()));

DROP POLICY IF EXISTS "Users can view own profile" ON user_profiles;
CREATE POLICY "Users can view own profile"
  ON user_profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = (select auth.uid()));

DROP POLICY IF EXISTS "Users can create own profile" ON user_profiles;
CREATE POLICY "Users can create own profile"
  ON user_profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = (select auth.uid()));

DROP POLICY IF EXISTS "Users can update own profile" ON user_profiles;
CREATE POLICY "Users can update own profile"
  ON user_profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = (select auth.uid()))
  WITH CHECK (auth.uid() = (select auth.uid()));