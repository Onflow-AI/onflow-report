export interface ReportMetadata {
  generated_at: string;
  target_url: string;
  num_personas: number;
}

export interface ReportSummary {
  total_tests: number;
  successful_tests: number;
  failure_rate: string;
}

export interface Persona {
  name: string;
  job_title: string;
  technical_proficiency: string;
  goal: string;
  motivation: string;
}

export interface PersonaResult {
  success: boolean;
  friction_points: string[];
  positive_aspects: string[];
  recommended_changes: string[] | string;
}

export interface PersonaReport {
  persona: Persona;
  results: PersonaResult;
}

export interface ReportData {
  url?: string;
  metadata?: ReportMetadata;
  summary?: ReportSummary;
  reports?: PersonaReport[];
}

export interface Report {
  id: string;
  created_at: string;
  generated_at: string;
  url: string;
  num_personas: number;
  num_tests: number;
  successful_tests: number;
  failure_rate: string;
  personas: PersonaReport[];
  report_data: ReportData;
}
