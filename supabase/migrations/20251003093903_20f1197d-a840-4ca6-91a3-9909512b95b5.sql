-- Create enum for service categories
CREATE TYPE service_category AS ENUM (
  'Tailoring',
  'Cobbler',
  'Alterations',
  'Dry Cleaning',
  'Repairs',
  'Home Services',
  'Beauty Services',
  'Other'
);

-- Create enum for service status
CREATE TYPE service_status AS ENUM ('Active', 'Inactive', 'Pending');

-- Create services table
CREATE TABLE public.services (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category service_category NOT NULL,
  locality TEXT NOT NULL,
  address TEXT,
  phone TEXT,
  email TEXT,
  website TEXT,
  images TEXT[] NOT NULL DEFAULT '{}',
  pricing_info TEXT,
  status service_status NOT NULL DEFAULT 'Active',
  views_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can view active services"
  ON public.services
  FOR SELECT
  USING (
    status = 'Active' 
    OR user_id = auth.uid() 
    OR has_role(auth.uid(), 'moderator') 
    OR has_role(auth.uid(), 'admin')
  );

CREATE POLICY "Authenticated users can insert services"
  ON public.services
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own services"
  ON public.services
  FOR UPDATE
  USING (
    auth.uid() = user_id 
    OR has_role(auth.uid(), 'moderator') 
    OR has_role(auth.uid(), 'admin')
  );

CREATE POLICY "Users can delete their own services"
  ON public.services
  FOR DELETE
  USING (
    auth.uid() = user_id 
    OR has_role(auth.uid(), 'admin')
  );

-- Create trigger for updated_at
CREATE TRIGGER update_services_updated_at
  BEFORE UPDATE ON public.services
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create index for better performance
CREATE INDEX idx_services_category ON public.services(category);
CREATE INDEX idx_services_locality ON public.services(locality);
CREATE INDEX idx_services_status ON public.services(status);