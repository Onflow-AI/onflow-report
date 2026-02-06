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
    .from('reports')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching report:', error);
    return null;
  }

  return data as Report;
}

export async function updateReportRating(id: string, rating: number): Promise<boolean> {
  if (!supabase) {
    console.error('Supabase client not initialized. Please check your environment variables.');
    return false;
  }

  const { error } = await supabase
    .from('reports')
    .update({ rating })
    .eq('id', id);

  if (error) {
    console.error('Error updating rating:', error);
    return false;
  }

  return true;
}
