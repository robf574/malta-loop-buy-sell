-- Create garage_sales table for "Leaving the Island" feature
CREATE TABLE IF NOT EXISTS garage_sales (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  location TEXT NOT NULL,
  open_date DATE NOT NULL,
  open_time TIME NOT NULL,
  contact_info TEXT NOT NULL,
  items_count INTEGER DEFAULT 0,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE garage_sales ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view all garage sales" ON garage_sales
  FOR SELECT USING (true);

CREATE POLICY "Users can create garage sales" ON garage_sales
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own garage sales" ON garage_sales
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own garage sales" ON garage_sales
  FOR DELETE USING (auth.uid() = user_id);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_garage_sales_updated_at
  BEFORE UPDATE ON garage_sales
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
