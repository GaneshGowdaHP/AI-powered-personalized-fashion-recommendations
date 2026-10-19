'use client';

import { useState } from 'react';
import { AnalysisResult, RecommendationResponse } from '@/types/api';

interface OccasionSelectorProps {
  analysisId: string;
  onRecommendations: (response: RecommendationResponse) => void;
}

export default function OccasionSelector({
  analysisId,
  onRecommendations,
}: OccasionSelectorProps) {
  const [selectedOccasion, setSelectedOccasion] = useState('casual');
  const [selectedSeason, setSelectedSeason] = useState('all-season');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const occasions = [
    { value: 'casual', label: 'Casual', icon: '👕', description: 'Everyday wear' },
    { value: 'business', label: 'Business', icon: '💼', description: 'Professional attire' },
    { value: 'evening', label: 'Evening', icon: '✨', description: 'Night out' },
    { value: 'athletic', label: 'Athletic', icon: '🏃', description: 'Workout gear' },
    { value: 'date', label: 'Date', icon: '💕', description: 'Romantic outing' },
  ];

  const seasons = [
    { value: 'all-season', label: 'All Season' },
    { value: 'spring', label: 'Spring' },
    { value: 'summer', label: 'Summer' },
    { value: 'fall', label: 'Fall' },
    { value: 'winter', label: 'Winter' },
  ];

  const handleGetRecommendations = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:8000/api/recommend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          analysis_id: analysisId,
          occasion: selectedOccasion,
          season: selectedSeason,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get recommendations');
      }

      const result: RecommendationResponse = await response.json();
      onRecommendations(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Choose Your Occasion
        </h2>
        <p className="text-gray-600 mb-8">
          Select what you're dressing for to get tailored recommendations
        </p>

        {/* Occasion Selection */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Occasion
          </h3>
          <div className="grid md:grid-cols-5 gap-4">
            {occasions.map((occasion) => (
              <button
                key={occasion.value}
                onClick={() => setSelectedOccasion(occasion.value)}
                className={`p-4 rounded-xl border-2 transition-all text-center ${
                  selectedOccasion === occasion.value
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-3xl mb-2">{occasion.icon}</div>
                <div className="font-semibold text-gray-800">
                  {occasion.label}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {occasion.description}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Season Selection */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Season
          </h3>
          <div className="flex flex-wrap gap-3">
            {seasons.map((season) => (
              <button
                key={season.value}
                onClick={() => setSelectedSeason(season.value)}
                className={`px-6 py-3 rounded-lg border-2 font-medium transition-all ${
                  selectedSeason === season.value
                    ? 'border-blue-500 bg-blue-500 text-white'
                    : 'border-gray-200 text-gray-700 hover:border-gray-300'
                }`}
              >
                {season.label}
              </button>
            ))}
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="bg-red-50 text-red-800 rounded-lg p-4 mb-6">
            {error}
          </div>
        )}

        {/* Get Recommendations Button */}
        <button
          onClick={handleGetRecommendations}
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg py-4 px-6 font-semibold hover:from-blue-700 hover:to-purple-700 disabled:from-gray-300 disabled:to-gray-300 disabled:cursor-not-allowed transition-all shadow-lg"
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Generating Recommendations...
            </span>
          ) : (
            'Get My Recommendations'
          )}
        </button>
      </div>
    </div>
  );
}
