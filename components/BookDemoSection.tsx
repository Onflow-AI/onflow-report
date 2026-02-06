'use client';

import { Calendar, Sparkles } from 'lucide-react';

interface BookDemoSectionProps {
  calendlyUrl?: string;
}

const DEFAULT_CALENDLY_URL = 'https://calendly.com/onflowai-general/30min';

export default function BookDemoSection({ calendlyUrl = DEFAULT_CALENDLY_URL }: BookDemoSectionProps) {
  return (
    <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 rounded-2xl shadow-xl p-8 mb-8 text-center">
      {/* Decorative sparkles */}
      <div className="flex justify-center mb-4">
        <Sparkles className="h-10 w-10 text-yellow-300" />
      </div>

      {/* Heading */}
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
        Like what you see?
      </h2>

      {/* Description */}
      <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
        Curious to know how our user agent got this feedback? Book a demo with us now!
      </p>

      {/* CTA Button */}
      <a
        href={calendlyUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-3 px-8 py-4 bg-white hover:bg-slate-50 text-blue-600 font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
      >
        <Calendar className="h-6 w-6" />
        Book an Onflow Demo
      </a>
    </div>
  );
}
