'use client';

import { AnalysisResult } from '@/types/api';

interface AnalysisDisplayProps {
  analysis: AnalysisResult;
  onContinue: () => void;
}

export default function AnalysisDisplay({ analysis, onContinue }: AnalysisDisplayProps) {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Your Style Profile
        </h2>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Body Type */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-6">
            <h3 className="text-sm font-semibold text-purple-600 uppercase mb-2">
              Body Type
            </h3>
            <p className="text-2xl font-bold text-gray-800 capitalize">
              {analysis.body_type}
            </p>
          </div>

          {/* Skin Tone */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg p-6">
            <h3 className="text-sm font-semibold text-amber-600 uppercase mb-2">
              Skin Tone
            </h3>
            <p className="text-2xl font-bold text-gray-800 capitalize">
              {analysis.skin_tone}
            </p>
          </div>

          {/* Current Style */}
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-6">
            <h3 className="text-sm font-semibold text-blue-600 uppercase mb-2">
              Current Style
            </h3>
            <p className="text-2xl font-bold text-gray-800 capitalize">
              {analysis.current_style}
            </p>
          </div>

          {/* Occasion */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-6">
            <h3 className="text-sm font-semibold text-green-600 uppercase mb-2">
              Best For
            </h3>
            <p className="text-2xl font-bold text-gray-800 capitalize">
              {analysis.occasion}
            </p>
          </div>
        </div>

        {/* Colors Detected */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Colors in Your Outfit
          </h3>
          <div className="flex flex-wrap gap-3">
            {analysis.colors_detected.map((color, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-gray-100 text-gray-800 rounded-full capitalize font-medium"
              >
                {color}
              </span>
            ))}
          </div>
        </div>

        {/* AI Analysis */}
        <div className="mb-8 bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            AI Analysis
          </h3>
          <p className="text-gray-700 leading-relaxed">
            {analysis.raw_analysis}
          </p>
        </div>

        {/* Confidence Score */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-gray-700">
              Analysis Confidence
            </span>
            <span className="text-sm font-bold text-gray-800">
              {Math.round(analysis.confidence * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${analysis.confidence * 100}%` }}
            />
          </div>
        </div>

        {/* Continue Button */}
        <button
          onClick={onContinue}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg py-4 px-6 font-semibold hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg"
        >
          Get Personalized Recommendations →
        </button>
      </div>
    </div>
  );
}
