# Onflow Reports Viewer

A modern, responsive Next.js 15 application for viewing Onflow UX testing reports with beautiful visualizations and detailed persona analysis.

## Features

- **Modern UI**: Clean, gradient-based design with Tailwind CSS
- **Dynamic Routing**: Each report has its own unique URL based on UUID
- **Supabase Integration**: Scalable database storage with JSONB support
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Type-Safe**: Built with TypeScript for robust development
- **Real-time Data**: Fetches reports directly from Supabase

## Tech Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- Supabase
- Lucide React (Icons)

## Getting Started

### Prerequisites

- Node.js 18+ installed
- A Supabase account and project

### Installation

1. Clone or navigate to the repository:

```bash
cd onflow-reports
```

2. Install dependencies:

```bash
npm install
```

3. Set up Supabase:

   - Create a new project on [Supabase](https://supabase.com)
   - Go to the SQL Editor in your Supabase dashboard
   - Run the SQL commands from `supabase-schema.sql` to create the reports table

4. Configure environment variables:

```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

5. Run the development server:

```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Database Schema

The application uses a single `reports` table with the following structure:

```sql
CREATE TABLE reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  result JSONB NOT NULL
);
```

The `result` column stores the full report data including metadata, summary, and persona reports.

## Adding Reports

To add a report to the database, insert data into the `reports` table:

```sql
INSERT INTO reports (result) VALUES (
  '{
    "metadata": {
      "generated_at": "2026-02-05T22:59:20.160Z",
      "target_url": "https://example.com",
      "num_personas": 1
    },
    "summary": {
      "total_tests": 1,
      "successful_tests": 0,
      "failure_rate": "100.0%"
    },
    "reports": [
      {
        "persona": {
          "name": "Alex Chen",
          "job_title": "Product Manager",
          "technical_proficiency": "intermediate",
          "goal": "Test the checkout flow",
          "motivation": "Improve conversion rates"
        },
        "results": {
          "success": false,
          "friction_points": ["Point 1", "Point 2"],
          "positive_aspects": ["Aspect 1"],
          "recommended_changes": "Recommended changes here..."
        }
      }
    ]
  }'::jsonb
);
```

After inserting, you can access the report at `/report/{uuid}` where `{uuid}` is the generated ID.

## Project Structure

```
onflow-reports/
├── app/
│   ├── page.tsx                 # Home page
│   ├── report/[id]/
│   │   ├── page.tsx            # Report detail page
│   │   ├── loading.tsx         # Loading state
│   │   └── not-found.tsx       # 404 page
│   ├── layout.tsx
│   └── globals.css
├── components/
│   └── ReportView.tsx          # Main report display component
├── lib/
│   └── supabase.ts             # Supabase client and utilities
├── types/
│   └── report.ts               # TypeScript types
├── supabase-schema.sql         # Database schema
└── README.md
```

## Report Data Structure

Each report contains:

- **Metadata**: Generated timestamp, target URL, number of test personas
- **Summary**: Total tests, successful tests, failure rate
- **Reports**: Array of persona reports, each including:
  - Persona details (name, job title, technical proficiency, goal, motivation)
  - Test results (success status, friction points, positive aspects, recommendations)

## Deployment

### Deploy to Vercel

The easiest way to deploy is with Vercel:

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Add your environment variables in the Vercel dashboard
4. Deploy

### Build for Production

```bash
npm run build
npm start
```

## License

MIT

## Support

For issues or questions, please open an issue on the repository.
