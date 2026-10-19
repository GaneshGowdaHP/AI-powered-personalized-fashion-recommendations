'use client';

import { useState } from 'react';
import { StyleRecommendation, RecommendationResponse } from '@/types/api';

interface RecommendationDisplayProps {
  recommendations: StyleRecommendation[];
  profileSummary: string;
}

export default function RecommendationDisplay({
  recommendations,
  profileSummary,
}: RecommendationDisplayProps) {
  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">
              Your Personalized Recommendations
            </h2>
            <p className="text-gray-600 mt-2">
              {profileSummary}
            </p>
          </div>
        </div>

        {/* Color Palette */}
        <div className="mb-10 bg-gray-50 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Recommended Color Palette
          </h3>
          <div className="flex flex-wrap gap-4">
            {recommendations[0]?.color_palette.map((color, index) => (
              <div key={index} className="flex flex-col items-center gap-2">
                <div
                  className="w-12 h-12 rounded-full border border-gray-200 shadow-sm"
                  style={{ backgroundColor: color }}
                />
                <span className="text-xs text-gray-600 capitalize">{color}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Outfit Items */}
        <div className="mb-10">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">
            Recommended Outfit
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {recommendations[0]?.outfit_items.map((item, index) => (
              <div
                key={index}
                className="border border-gray-100 rounded-xl p-4 bg-white shadow-sm hover:shadow-md transition-all"
              >
                <div className="text-xs font-bold text-blue-600 uppercase mb-2">
                  {item.category}
                </div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">
                  {item.description}
                </h4>
                <div className="flex flex-wrap gap-2 mb-3">
                  {item.colors.map((color, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
                    >
                      {color}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-gray-600 mb-4 italic">
                  "{item.style_notes}"
                </p>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-xs text-blue-800 font-medium">
                    Why this?
                  </p>
                  <p className="text-xs text-blue-700">
                    {item.why_recommended}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Styling Tips */}
        <div className="mb-10 bg-indigo-50 rounded-xl p-6 border border-indigo-100">
          <h3 className="text-xl font-semibold text-indigo-900 mb-4">
            Pro Styling Tips
          </h3>
          <ul className="space-y-3">
            {recommendations[0]?.styling_tips.map((tip, index) => (
              <li key={index} className="flex items-start gap-3 text-indigo-800">
                <span className="text-indigo-500">✦</span>
                <span className="text-sm leading-relaxed">{tip}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Final Reasoning */}
        <div className="mb-8 bg-gray-50 rounded-lg p-6 border-l-4 border-blue-500">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Expert Reasoning
          </h3>
          <p className="text-gray-700 leading-relaxed">
            {recommendations[0]?.reasoning}
          </p>
        </div>

        <button
          onClick={() => window.location.reload()}
          className="w-full bg-gray-800 text-white rounded-lg py-4 px-6 font-semibold hover:bg-gray-900 transition-all shadow-lg"
        >
          Start Over
        </button>
      </div>
    </div>
  );
}
