'use client';

import { Report } from '@/types/report';
import { Globe, Users, CheckCircle2, XCircle, AlertTriangle, Target, Briefcase, Zap, TrendingUp, TrendingDown } from 'lucide-react';
import FeedbackBar from './FeedbackBar';

interface ReportViewProps {
  report: Report;
}

export default function ReportView({ report }: ReportViewProps) {
  const { result } = report;
  const { metadata, summary, reports } = result;

  const successRate = parseFloat(summary.failure_rate);
  const isHighFailure = successRate > 50;

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header Section */}
      <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-slate-200">
        <div className="mb-6">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 mb-2">
              UX Report
            </h1>
            <p className="text-slate-600 text-lg">
              Comprehensive user experience analysis
            </p>
          </div>
        </div>

        {/* Metadata Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl">
            <Globe className="h-8 w-8 text-blue-600" />
            <div>
              <p className="text-sm text-slate-600 font-medium">Target URL</p>
              <a
                href={metadata.target_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 font-semibold truncate block"
              >
                {metadata.target_url}
              </a>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl">
            <Users className="h-8 w-8 text-purple-600" />
            <div>
              <p className="text-sm text-slate-600 font-medium">Test Personas</p>
              <p className="text-xl font-bold text-slate-900">{metadata.num_personas}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl">
            <Target className="h-8 w-8 text-indigo-600" />
            <div>
              <p className="text-sm text-slate-600 font-medium">Total Tests</p>
              <p className="text-xl font-bold text-slate-900">{summary.total_tests}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Section */}
      <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-slate-200">
        <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
          <TrendingUp className="h-7 w-7 text-blue-600" />
          Test Summary
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="relative overflow-hidden p-6 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200">
            <CheckCircle2 className="h-12 w-12 text-green-600 mb-3" />
            <p className="text-sm text-green-700 font-semibold mb-1">Successful Tests</p>
            <p className="text-4xl font-bold text-green-900">{summary.successful_tests}</p>
          </div>

          <div className={`relative overflow-hidden p-6 rounded-xl border-2 ${
            isHighFailure
              ? 'bg-gradient-to-br from-red-50 to-rose-50 border-red-200'
              : 'bg-gradient-to-br from-yellow-50 to-amber-50 border-yellow-200'
          }`}>
            {isHighFailure ? (
              <XCircle className="h-12 w-12 text-red-600 mb-3" />
            ) : (
              <AlertTriangle className="h-12 w-12 text-yellow-600 mb-3" />
            )}
            <p className={`text-sm font-semibold mb-1 ${
              isHighFailure ? 'text-red-700' : 'text-yellow-700'
            }`}>
              Failure Rate
            </p>
            <p className={`text-4xl font-bold ${
              isHighFailure ? 'text-red-900' : 'text-yellow-900'
            }`}>
              {summary.failure_rate}
            </p>
          </div>

          <div className="relative overflow-hidden p-6 rounded-xl bg-gradient-to-br from-slate-50 to-gray-50 border-2 border-slate-200">
            <TrendingDown className="h-12 w-12 text-slate-600 mb-3" />
            <p className="text-sm text-slate-700 font-semibold mb-1">Failed Tests</p>
            <p className="text-4xl font-bold text-slate-900">
              {summary.total_tests - summary.successful_tests}
            </p>
          </div>
        </div>
      </div>

      {/* Persona Reports */}
      {reports.map((personaReport, index) => (
        <div key={index} className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-slate-200">
          {/* Persona Header */}
          <div className="mb-8">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h2 className="text-3xl font-bold text-slate-900 mb-2">
                  {personaReport.persona.name}
                </h2>
                <div className="flex items-center gap-2 text-slate-600 mb-4">
                  <Briefcase className="h-5 w-5" />
                  <p className="text-lg font-medium">{personaReport.persona.job_title}</p>
                </div>
              </div>

              <div className={`px-6 py-3 rounded-xl font-bold text-lg ${
                personaReport.results.success
                  ? 'bg-green-100 text-green-800 border-2 border-green-300'
                  : 'bg-red-100 text-red-800 border-2 border-red-300'
              }`}>
                {personaReport.results.success ? (
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="h-6 w-6" />
                    Success
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <XCircle className="h-6 w-6" />
                    Failed
                  </span>
                )}
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-3 p-4 bg-indigo-50 rounded-lg">
                <Zap className="h-5 w-5 text-indigo-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-indigo-900 mb-1">
                    Technical Proficiency
                  </p>
                  <p className="text-indigo-700 capitalize">
                    {personaReport.persona.technical_proficiency}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                <Target className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-blue-900 mb-1">Goal</p>
                  <p className="text-blue-700">{personaReport.persona.goal}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-lg">
                <TrendingUp className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-purple-900 mb-1">Motivation</p>
                  <p className="text-purple-700">{personaReport.persona.motivation}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Results Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Friction Points */}
            {personaReport.results.friction_points.length > 0 && (
              <div className="bg-red-50 rounded-xl p-6 border-2 border-red-200">
                <div className="flex items-center gap-2 mb-4">
                  <XCircle className="h-6 w-6 text-red-600" />
                  <h3 className="text-xl font-bold text-red-900">
                    Friction Points ({personaReport.results.friction_points.length})
                  </h3>
                </div>
                <ul className="space-y-3">
                  {personaReport.results.friction_points.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="inline-block w-6 h-6 rounded-full bg-red-200 text-red-800 text-sm font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span className="text-red-900 leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Positive Aspects */}
            {personaReport.results.positive_aspects.length > 0 && (
              <div className="bg-green-50 rounded-xl p-6 border-2 border-green-200">
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle2 className="h-6 w-6 text-green-600" />
                  <h3 className="text-xl font-bold text-green-900">
                    Positive Aspects ({personaReport.results.positive_aspects.length})
                  </h3>
                </div>
                <ul className="space-y-3">
                  {personaReport.results.positive_aspects.map((aspect, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-green-900 leading-relaxed">{aspect}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Recommended Changes */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6 border-2 border-amber-200 relative">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="h-6 w-6 text-amber-600" />
              <h3 className="text-xl font-bold text-amber-900">Recommended Changes</h3>
            </div>
            <div className="relative">
              <div className="text-amber-900 leading-relaxed space-y-3 max-h-64 overflow-hidden">
                {personaReport.results.recommended_changes.split(/(?:\d+\)|;)\s*/).filter(Boolean).map((change, idx) => {
                  const trimmedChange = change.trim();
                  if (!trimmedChange) return null;

                  // Check if this is an introductory sentence (ends with colon)
                  if (trimmedChange.endsWith(':')) {
                    return (
                      <p key={idx} className="font-semibold text-amber-950 mt-4 first:mt-0">
                        {trimmedChange}
                      </p>
                    );
                  }

                  return (
                    <div key={idx} className="flex items-start gap-3">
                      <span className="inline-block w-6 h-6 rounded-full bg-amber-200 text-amber-800 text-sm font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                        {idx}
                      </span>
                      <span className="flex-1">{trimmedChange}</span>
                    </div>
                  );
                })}
              </div>

              {/* Blur overlay and CTA */}
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-amber-50 via-amber-50/95 to-transparent backdrop-blur-sm flex items-end justify-center pb-4">
                <a
                  href="https://runonflow.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-lg rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200 flex items-center gap-3"
                >
                  <Zap className="h-6 w-6" />
                  Buy Full Report Now
                </a>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Footer */}
      <div className="text-center text-slate-500 text-sm mt-8 mb-24">
        <p>Report ID: {report.id}</p>
        <p className="mt-1">Generated by Onflow AI Testing Platform</p>
      </div>

      {/* Feedback Bar */}
      <FeedbackBar reportId={report.id} />
    </div>
  );
}
