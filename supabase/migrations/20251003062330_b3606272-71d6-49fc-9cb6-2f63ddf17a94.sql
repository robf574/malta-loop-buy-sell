-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create enums
CREATE TYPE app_role AS ENUM ('user', 'moderator', 'admin');
CREATE TYPE auth_provider AS ENUM ('email', 'facebook', 'google', 'apple');
CREATE TYPE listing_category AS ENUM ('Clothing', 'Uniform', 'Kids', 'Home', 'Other');
CREATE TYPE item_condition AS ENUM ('New', 'Like New', 'Good', 'Fair');
CREATE TYPE listing_status AS ENUM ('Active', 'Reserved', 'Sold', 'Hidden', 'Deleted');
CREATE TYPE wanted_status AS ENUM ('Active', 'Fulfilled', 'Hidden', 'Deleted');
CREATE TYPE event_status AS ENUM ('Upcoming', 'Past', 'Cancelled');
CREATE TYPE report_target_type AS ENUM ('item', 'wanted', 'event', 'user', 'message');
CREATE TYPE report_reason AS ENUM ('Counterfeit', 'Inappropriate', 'Spam', 'Other');
CREATE TYPE report_status AS ENUM ('Open', 'Actioned', 'Dismissed');

-- Create Schools table
CREATE TABLE schools (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  city TEXT NOT NULL,
  houses TEXT[],
  uniforms_notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create Profiles table (extends auth.users)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  name TEXT NOT NULL,
  username TEXT UNIQUE NOT NULL,
  localities TEXT[] NOT NULL DEFAULT '{}',
  avatar_url TEXT,
  auth_provider auth_provider NOT NULL DEFAULT 'email',
  phone TEXT,
  is_verified BOOLEAN NOT NULL DEFAULT FALSE,
  school_ids UUID[] DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create User Roles table (separate for security)
CREATE TABLE user_roles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL DEFAULT 'user',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, role)
);

-- Create Item Listings table
CREATE TABLE item_listings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category listing_category NOT NULL,
  images TEXT[] NOT NULL DEFAULT '{}',
  condition item_condition NOT NULL,
  price_eur NUMERIC(10, 2) NOT NULL CHECK (price_eur >= 0),
  allow_offer BOOLEAN NOT NULL DEFAULT TRUE,
  location_text TEXT,
  locality TEXT NOT NULL,
  school_id UUID REFERENCES schools(id) ON DELETE SET NULL,
  status listing_status NOT NULL DEFAULT 'Active',
  views_count INTEGER NOT NULL DEFAULT 0,
  favorites_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create Wanted Ads table
CREATE TABLE wanted_ads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category listing_category NOT NULL,
  budget_eur NUMERIC(10, 2) CHECK (budget_eur >= 0),
  school_id UUID REFERENCES schools(id) ON DELETE SET NULL,
  locality TEXT NOT NULL,
  status wanted_status NOT NULL DEFAULT 'Active',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create Events table
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  host_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  venue_name TEXT NOT NULL,
  address TEXT NOT NULL,
  locality TEXT NOT NULL,
  lat NUMERIC(10, 7),
  lng NUMERIC(10, 7),
  date_start TIMESTAMPTZ NOT NULL,
  date_end TIMESTAMPTZ NOT NULL,
  capacity INTEGER,
  rsvp_count INTEGER NOT NULL DEFAULT 0,
  cover_image_url TEXT,
  status event_status NOT NULL DEFAULT 'Upcoming',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create Event RSVPs table
CREATE TABLE event_rsvps (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID REFERENCES events(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(event_id, user_id)
);

-- Create Message Threads table
CREATE TABLE message_threads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  item_id UUID REFERENCES item_listings(id) ON DELETE SET NULL,
  wanted_ad_id UUID REFERENCES wanted_ads(id) ON DELETE SET NULL,
  participant_ids UUID[] NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create Messages table
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  thread_id UUID REFERENCES message_threads(id) ON DELETE CASCADE NOT NULL,
  sender_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  body TEXT NOT NULL,
  image_url TEXT,
  seen_by UUID[] NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create Reviews table
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  reviewer_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  reviewee_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create Reports table
CREATE TABLE reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  reporter_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  target_type report_target_type NOT NULL,
  target_id UUID NOT NULL,
  reason report_reason NOT NULL,
  notes TEXT,
  status report_status NOT NULL DEFAULT 'Open',
  resolved_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  resolved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create Favorites table
CREATE TABLE favorites (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  item_id UUID REFERENCES item_listings(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, item_id)
);

-- Enable Row Level Security
ALTER TABLE schools ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE item_listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE wanted_ads ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_rsvps ENABLE ROW LEVEL SECURITY;
ALTER TABLE message_threads ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;

-- Create helper function for role checking
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- RLS Policies for Schools (public read)
CREATE POLICY "Anyone can view schools" ON schools FOR SELECT USING (TRUE);
CREATE POLICY "Admins can insert schools" ON schools FOR INSERT WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update schools" ON schools FOR UPDATE USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete schools" ON schools FOR DELETE USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for Profiles
CREATE POLICY "Profiles are viewable by everyone" ON profiles FOR SELECT USING (TRUE);
CREATE POLICY "Users can insert their own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- RLS Policies for User Roles
CREATE POLICY "Anyone can view user roles" ON user_roles FOR SELECT USING (TRUE);
CREATE POLICY "Admins can manage roles" ON user_roles FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for Item Listings
CREATE POLICY "Anyone can view active listings" ON item_listings FOR SELECT USING (status = 'Active' OR user_id = auth.uid() OR public.has_role(auth.uid(), 'moderator') OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Authenticated users can insert listings" ON item_listings FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own listings" ON item_listings FOR UPDATE USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'moderator') OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Users can delete their own listings" ON item_listings FOR DELETE USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));

-- RLS Policies for Wanted Ads
CREATE POLICY "Anyone can view active wanted ads" ON wanted_ads FOR SELECT USING (status = 'Active' OR user_id = auth.uid() OR public.has_role(auth.uid(), 'moderator') OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Authenticated users can insert wanted ads" ON wanted_ads FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own wanted ads" ON wanted_ads FOR UPDATE USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'moderator') OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Users can delete their own wanted ads" ON wanted_ads FOR DELETE USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));

-- RLS Policies for Events
CREATE POLICY "Anyone can view upcoming events" ON events FOR SELECT USING (status = 'Upcoming' OR host_user_id = auth.uid() OR public.has_role(auth.uid(), 'moderator') OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Authenticated users can create events" ON events FOR INSERT WITH CHECK (auth.uid() = host_user_id);
CREATE POLICY "Hosts can update their events" ON events FOR UPDATE USING (auth.uid() = host_user_id OR public.has_role(auth.uid(), 'moderator') OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Hosts can delete their events" ON events FOR DELETE USING (auth.uid() = host_user_id OR public.has_role(auth.uid(), 'admin'));

-- RLS Policies for Event RSVPs
CREATE POLICY "Users can view RSVPs for events" ON event_rsvps FOR SELECT USING (TRUE);
CREATE POLICY "Users can RSVP to events" ON event_rsvps FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can cancel their RSVPs" ON event_rsvps FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for Message Threads
CREATE POLICY "Users can view their threads" ON message_threads FOR SELECT USING (auth.uid() = ANY(participant_ids));
CREATE POLICY "Users can create threads" ON message_threads FOR INSERT WITH CHECK (auth.uid() = ANY(participant_ids));

-- RLS Policies for Messages
CREATE POLICY "Users can view messages in their threads" ON messages FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM message_threads
    WHERE id = messages.thread_id
    AND auth.uid() = ANY(participant_ids)
  )
);
CREATE POLICY "Users can send messages in their threads" ON messages FOR INSERT WITH CHECK (
  auth.uid() = sender_id AND
  EXISTS (
    SELECT 1 FROM message_threads
    WHERE id = messages.thread_id
    AND auth.uid() = ANY(participant_ids)
  )
);

-- RLS Policies for Reviews
CREATE POLICY "Anyone can view reviews" ON reviews FOR SELECT USING (TRUE);
CREATE POLICY "Authenticated users can create reviews" ON reviews FOR INSERT WITH CHECK (auth.uid() = reviewer_id);
CREATE POLICY "Users can update their own reviews" ON reviews FOR UPDATE USING (auth.uid() = reviewer_id);
CREATE POLICY "Users can delete their own reviews" ON reviews FOR DELETE USING (auth.uid() = reviewer_id);

-- RLS Policies for Reports
CREATE POLICY "Users can view their own reports" ON reports FOR SELECT USING (auth.uid() = reporter_id OR public.has_role(auth.uid(), 'moderator') OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Authenticated users can create reports" ON reports FOR INSERT WITH CHECK (auth.uid() = reporter_id);
CREATE POLICY "Moderators can update reports" ON reports FOR UPDATE USING (public.has_role(auth.uid(), 'moderator') OR public.has_role(auth.uid(), 'admin'));

-- RLS Policies for Favorites
CREATE POLICY "Users can view their own favorites" ON favorites FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can add favorites" ON favorites FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can remove favorites" ON favorites FOR DELETE USING (auth.uid() = user_id);

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE PLPGSQL
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, name, username, auth_provider, is_verified)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', 'User'),
    COALESCE(NEW.raw_user_meta_data->>'username', 'user_' || substr(NEW.id::text, 1, 8)),
    COALESCE((NEW.raw_user_meta_data->>'auth_provider')::auth_provider, 'email'),
    NEW.email_confirmed_at IS NOT NULL
  );
  
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'user');
  
  RETURN NEW;
END;
$$;

-- Trigger for new user creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add updated_at triggers
CREATE TRIGGER update_schools_updated_at BEFORE UPDATE ON schools FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_item_listings_updated_at BEFORE UPDATE ON item_listings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_wanted_ads_updated_at BEFORE UPDATE ON wanted_ads FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON events FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_message_threads_updated_at BEFORE UPDATE ON message_threads FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable realtime for messages
ALTER PUBLICATION supabase_realtime ADD TABLE messages;

-- Seed Malta localities and schools
INSERT INTO schools (name, city, houses, uniforms_notes) VALUES
('St Edward''s College', 'Birgu', ARRAY['St Michael', 'St George', 'St Patrick', 'St Andrew'], 'Navy blazer, grey trousers, house tie'),
('San Anton School', 'Mosta', ARRAY['Red', 'Blue', 'Green', 'Yellow'], 'White shirt, navy bottoms, school crest'),
('Verdala International School', 'Pembroke', NULL, 'Burgundy polo, khaki pants/skirt'),
('Chiswick House School', 'Kalkara', ARRAY['Sliema', 'Valletta', 'Mdina'], 'Blue polo, navy bottoms'),
('St Michael School', 'San Ġwann', NULL, 'Sky blue shirt, grey bottoms'),
('St Martin''s College', 'Swatar', ARRAY['Michael', 'Raphael', 'Gabriel', 'Uriel'], 'White shirt, navy trousers, striped tie'),
('Maria Regina College', 'Mosta', NULL, 'Turquoise polo, navy skirt/trousers'),
('Stella Maris College', 'Gżira', ARRAY['North', 'South', 'East', 'West'], 'Red checkered dress, white shirt for boys');