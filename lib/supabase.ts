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

export async function updateReportRating(
  reportId: string,
  rating: number,
  feedbackText?: string
): Promise<boolean> {
  if (!supabase) {
    console.error('Supabase client not initialized. Please check your environment variables.');
    return false;
  }

  const insertData: { report_id: string; rating: number; feedback_text?: string } = {
    report_id: reportId,
    rating: rating,
  };

  if (feedbackText && feedbackText.trim().length > 0) {
    insertData.feedback_text = feedbackText.trim();
  }

  const { error } = await supabase
    .from('onflow_report_ratings')
    .insert(insertData);

  if (error) {
    console.error('Error inserting rating:', error);
    return false;
  }

  return true;
}

export async function trackReportClick(reportId: string): Promise<boolean> {
  if (!supabase) {
    console.error('Supabase client not initialized. Please check your environment variables.');
    return false;
  }

  const { error } = await supabase
    .from('onflow_report_clicks')
    .insert({ report_id: reportId });

  if (error) {
    console.error('Error tracking report click:', error);
    return false;
  }

  return true;
}
