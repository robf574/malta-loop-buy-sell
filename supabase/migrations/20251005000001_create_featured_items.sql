-- Add featured_items table for garage sales
CREATE TABLE IF NOT EXISTS featured_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  garage_sale_id UUID REFERENCES garage_sales(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  estimated_value_eur DECIMAL(10,2),
  sort_order INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE featured_items ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view all featured items" ON featured_items
  FOR SELECT USING (true);

CREATE POLICY "Users can create featured items for their garage sales" ON featured_items
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM garage_sales 
      WHERE garage_sales.id = featured_items.garage_sale_id 
      AND garage_sales.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update featured items for their garage sales" ON featured_items
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM garage_sales 
      WHERE garage_sales.id = featured_items.garage_sale_id 
      AND garage_sales.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete featured items for their garage sales" ON featured_items
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM garage_sales 
      WHERE garage_sales.id = featured_items.garage_sale_id 
      AND garage_sales.user_id = auth.uid()
    )
  );
