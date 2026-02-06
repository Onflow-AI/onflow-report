import { notFound } from 'next/navigation';
import { getReport } from '@/lib/supabase';
import ReportView from '@/components/ReportView';

interface PageProps {
  params: Promise<{ id: string }>;
}

// UUID validation regex
const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export default async function ReportPage({ params }: PageProps) {
  const { id } = await params;

  // Return 404 for non-UUID paths (like favicon requests)
  if (!UUID_REGEX.test(id)) {
    notFound();
  }

  const report = await getReport(id);

  if (!report) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <ReportView report={report} />
    </main>
  );
}
