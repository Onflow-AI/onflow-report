'use client';

import { X, Gift } from 'lucide-react';

interface UnlockModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUnlock: () => void;
}

export default function UnlockModal({ isOpen, onClose, onUnlock }: UnlockModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md mx-4 p-8">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 transition-colors"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full">
            <Gift className="h-12 w-12 text-green-600" />
          </div>
        </div>

        {/* Content */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Your Report is on Us!
          </h2>
          <p className="text-slate-600 leading-relaxed">
            Since you are an early Onflow user, your first report is on us!
            If you want to know more about how we ran our evaluation, book a demo
            with us now at the end of your report.
          </p>
        </div>

        {/* CTA Button */}
        <button
          onClick={onUnlock}
          className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 flex items-center justify-center gap-2"
        >
          Continue to View Full Report
        </button>
      </div>
    </div>
  );
}
