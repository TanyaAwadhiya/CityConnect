/*
  # Add contact fields to user profiles

  1. New Columns
    - `email` (text) - User's email address
    - `phone_number` (text) - User's phone number
    - `addresses` (text) - User's addresses
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'user_profiles' AND column_name = 'email'
  ) THEN
    ALTER TABLE user_profiles ADD COLUMN email text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'user_profiles' AND column_name = 'phone_number'
  ) THEN
    ALTER TABLE user_profiles ADD COLUMN phone_number text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'user_profiles' AND column_name = 'addresses'
  ) THEN
    ALTER TABLE user_profiles ADD COLUMN addresses text;
  END IF;
END $$;