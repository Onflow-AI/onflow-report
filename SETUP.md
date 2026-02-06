# Quick Setup Guide

Follow these steps to get your Onflow Reports Viewer up and running.

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: Set Up Supabase

1. Go to [supabase.com](https://supabase.com) and create a free account
2. Create a new project
3. Wait for the project to be fully initialized

## Step 3: Create Database Table

1. In your Supabase project dashboard, go to the SQL Editor
2. Open the file `supabase-schema.sql` from this project
3. Copy and paste the entire contents into the SQL Editor
4. Click "Run" to execute the SQL commands

This will create:
- A `reports` table with UUID primary key
- An index for faster queries
- Row Level Security policies for public read access

## Step 4: Get Your Supabase Credentials

1. In your Supabase dashboard, go to Project Settings > API
2. Copy your **Project URL** (it looks like `https://xxxxx.supabase.co`)
3. Copy your **anon/public key** (starts with `eyJ...`)

## Step 5: Configure Environment Variables

1. In the project root, you'll find a `.env.local` file
2. Replace the placeholder values with your actual Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_actual_anon_key_here
```

## Step 6: Add a Sample Report (Optional)

To test the application, insert a sample report:

1. Go back to the SQL Editor in Supabase
2. Open `sample-report.sql` from this project
3. Copy and paste the contents into the SQL Editor
4. Click "Run"
5. Note the UUID that's returned - this is your report ID

## Step 7: Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the home page.

## Step 8: View Your Report

Visit `http://localhost:3000/report/[your-report-uuid]` where `[your-report-uuid]` is the UUID from Step 6.

## Troubleshooting

### "Report Not Found"
- Make sure you're using the correct UUID from your database
- Check that your Supabase credentials are correctly configured in `.env.local`
- Verify the report exists by checking the Supabase Table Editor

### Build Errors
- Make sure all environment variables are set in `.env.local`
- Run `npm install` to ensure all dependencies are installed
- Check that you're using Node.js 18 or higher

### Supabase Connection Issues
- Verify your Project URL doesn't have a trailing slash
- Make sure you're using the `anon/public` key, not the service role key
- Check that your Supabase project is active and not paused

## Adding More Reports

To add more reports to your database, insert them using SQL:

```sql
INSERT INTO reports (result) VALUES (
  '{
    "metadata": { ... },
    "summary": { ... },
    "reports": [ ... ]
  }'::jsonb
);
```

Or use the Supabase client library in your own scripts to programmatically insert reports.

## Next Steps

- Deploy to Vercel for production use
- Customize the styling in [ReportView.tsx](components/ReportView.tsx)
- Add authentication if needed
- Create an API endpoint to accept report submissions
- Build a reports listing page to view all reports

## Need Help?

Check the main [README.md](README.md) for more detailed documentation.
