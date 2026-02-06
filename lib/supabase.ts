import { createClient } from '@supabase/supabase-js';
import { Report } from '@/types/report';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export async function getReport(id: string): Promise<Report | null> {
  if (!supabase) {
    console.error('Supabase client not initialized. Please check your environment variables.');
    return null;
  }

  const { data, error } = await supabase
    .from('onflow_reports')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching report:', error);
    return null;
  }

  // Map report_data.reports to personas field for compatibility
  if (data && data.report_data && Array.isArray(data.report_data.reports)) {
    data.personas = data.report_data.reports;
  }

  // If personas is still not set, initialize as empty array to prevent errors
  if (!data.personas) {
    data.personas = [];
  }

  return data as Report;
}

export async function updateReportRating(reportId: string, rating: number): Promise<boolean> {
  if (!supabase) {
    console.error('Supabase client not initialized. Please check your environment variables.');
    return false;
  }

  // Insert rating into the separate ratings table
  const { error } = await supabase
    .from('onflow_report_ratings')
    .insert({
      report_id: reportId,
      rating: rating,
    });

  if (error) {
    console.error('Error inserting rating:', error);
    return false;
  }

  return true;
}
