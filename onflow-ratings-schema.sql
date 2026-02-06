-- Onflow Report Ratings Schema
-- This schema defines a separate table for storing user ratings of reports

CREATE TABLE IF NOT EXISTS public.onflow_report_ratings (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  report_id uuid NOT NULL,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  created_at timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
  CONSTRAINT onflow_report_ratings_pkey PRIMARY KEY (id),
  CONSTRAINT onflow_report_ratings_report_id_fkey FOREIGN KEY (report_id)
    REFERENCES public.onflow_reports(id)
    ON DELETE CASCADE,
  CONSTRAINT onflow_report_ratings_unique_report UNIQUE (report_id)
) TABLESPACE pg_default;

-- Index for quick lookups by report_id
CREATE INDEX IF NOT EXISTS idx_onflow_report_ratings_report_id
  ON public.onflow_report_ratings USING btree (report_id)
  TABLESPACE pg_default;

-- Index for rating analysis
CREATE INDEX IF NOT EXISTS idx_onflow_report_ratings_rating
  ON public.onflow_report_ratings USING btree (rating)
  TABLESPACE pg_default;

-- Index for time-based queries
CREATE INDEX IF NOT EXISTS idx_onflow_report_ratings_created_at
  ON public.onflow_report_ratings USING btree (created_at DESC)
  TABLESPACE pg_default;

-- Enable Row Level Security
ALTER TABLE public.onflow_report_ratings ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access to ratings
CREATE POLICY "Allow public read access to ratings"
  ON public.onflow_report_ratings
  FOR SELECT
  USING (true);

-- Create policy to allow public insert of ratings
CREATE POLICY "Allow public to insert ratings"
  ON public.onflow_report_ratings
  FOR INSERT
  WITH CHECK (true);

-- Create policy to prevent updates (ratings are immutable once set)
-- Users can only insert new ratings, not update existing ones

-- Comments for documentation
COMMENT ON TABLE public.onflow_report_ratings IS 'Stores user ratings for UX testing reports';
COMMENT ON COLUMN public.onflow_report_ratings.id IS 'Unique identifier for the rating';
COMMENT ON COLUMN public.onflow_report_ratings.report_id IS 'Foreign key reference to the report being rated';
COMMENT ON COLUMN public.onflow_report_ratings.rating IS 'User rating score (1-5 stars)';
COMMENT ON COLUMN public.onflow_report_ratings.created_at IS 'Timestamp when the rating was submitted';
