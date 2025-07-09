
-- Create a table for storing scraped social media posts
CREATE TABLE public.posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  platform TEXT NOT NULL CHECK (platform IN ('twitter', 'instagram', 'tiktok')),
  username TEXT NOT NULL,
  caption TEXT,
  media_url TEXT,
  likes INTEGER DEFAULT 0,
  timestamp TIMESTAMP WITH TIME ZONE NOT NULL,
  location TEXT,
  keywords TEXT[], -- Array of matched keywords
  vibe_score INTEGER DEFAULT 0,
  post_url TEXT,
  external_id TEXT, -- Platform-specific post ID
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create index for better query performance
CREATE INDEX idx_posts_platform ON public.posts(platform);
CREATE INDEX idx_posts_timestamp ON public.posts(timestamp DESC);
CREATE INDEX idx_posts_location ON public.posts(location);
CREATE INDEX idx_posts_vibe_score ON public.posts(vibe_score DESC);

-- Enable Row Level Security (but allow public read access for now)
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Public can view posts" 
  ON public.posts 
  FOR SELECT 
  USING (true);

-- Create policy for system to insert posts (using service role)
CREATE POLICY "System can insert posts" 
  ON public.posts 
  FOR INSERT 
  WITH CHECK (true);

-- Enable pg_cron extension for scheduled jobs
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Enable pg_net extension for HTTP requests in cron jobs
CREATE EXTENSION IF NOT EXISTS pg_net;
