-- Create the reports table
CREATE TABLE IF NOT EXISTS reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  result JSONB NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5)
);

-- Add index for faster queries
CREATE INDEX IF NOT EXISTS idx_reports_created_at ON reports(created_at DESC);

-- Enable Row Level Security (optional, configure based on your needs)
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;

-- Create a policy to allow public read access (adjust as needed)
CREATE POLICY "Allow public read access"
ON reports FOR SELECT
TO public
USING (true);

-- Create a policy to allow public update for ratings
CREATE POLICY "Allow public rating updates"
ON reports FOR UPDATE
TO public
USING (true)
WITH CHECK (true);

-- Example insert statement
-- INSERT INTO reports (result) VALUES (
--   '{
--     "metadata": {
--       "generated_at": "2026-02-05T22:59:20.160Z",
--       "target_url": "https://runonflow.com",
--       "num_personas": 1
--     },
--     "summary": {
--       "total_tests": 1,
--       "successful_tests": 0,
--       "failure_rate": "100.0%"
--     },
--     "reports": [...]
--   }'::jsonb
-- );
