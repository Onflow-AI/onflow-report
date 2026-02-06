'use client';

import { useState } from 'react';
import { Star } from 'lucide-react';
import { updateReportRating } from '@/lib/supabase';

interface FeedbackBarProps {
  reportId: string;
}

export default function FeedbackBar({ reportId }: FeedbackBarProps) {
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const handleRatingClick = async (rating: number) => {
    if (isSubmitting || selectedRating) return;

    setSelectedRating(rating);
    setIsSubmitting(true);

    const success = await updateReportRating(reportId, rating);

    setIsSubmitting(false);

    if (success) {
      // Hide the bar after 2 seconds
      setTimeout(() => {
        setIsVisible(false);
      }, 2000);
    }
  };

  if (!isVisible) return null;

  const displayRating = hoveredRating || selectedRating;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-blue-600 to-indigo-600 shadow-2xl border-t-4 border-white/20 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <p className="text-white font-semibold text-lg text-center md:text-left">
            Did you learn something new about your product which you didn't consider?
          </p>

          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((rating) => (
              <button
                key={rating}
                onClick={() => handleRatingClick(rating)}
                onMouseEnter={() => !selectedRating && setHoveredRating(rating)}
                onMouseLeave={() => setHoveredRating(null)}
                disabled={isSubmitting || selectedRating !== null}
                className={`group relative transition-all duration-200 ${
                  displayRating && rating <= displayRating
                    ? 'scale-110'
                    : ''
                } ${!selectedRating ? 'hover:scale-110' : ''} disabled:cursor-not-allowed`}
                aria-label={`Rate ${rating} out of 5`}
              >
                <Star
                  className={`h-10 w-10 transition-all duration-200 ${
                    displayRating && rating <= displayRating
                      ? 'fill-yellow-300 text-yellow-300'
                      : 'fill-white/80 text-white hover:fill-yellow-300 hover:text-yellow-300'
                  }`}
                />
                <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  {rating}
                </span>
              </button>
            ))}
          </div>

          {selectedRating && (
            <p className="text-white font-semibold animate-fade-in">
              Thanks for your feedback!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
