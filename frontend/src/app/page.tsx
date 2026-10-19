'use client';

import { useState } from 'react';
import PhotoUpload from '@/components/PhotoUpload';
import AnalysisDisplay from '@/components/AnalysisDisplay';
import OccasionSelector from '@/components/OccasionSelector';
import RecommendationDisplay from '@/components/RecommendationDisplay';
import { AnalysisResult, RecommendationResponse } from '@/types/api';

type Step = 'upload' | 'analysis' | 'occasion' | 'recommendations';

export default function Home() {
  const [currentStep, setCurrentStep] = useState<Step>('upload');
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [analysisId, setAnalysisId] = useState<string>('');
  const [recommendations, setRecommendations] = useState<RecommendationResponse | null>(null);

  const handleAnalysisComplete = (result: AnalysisResult) => {
    setAnalysis(result);
    // Use the ID returned by the backend
    setAnalysisId(result.id);
    setCurrentStep('analysis');
  };

  const handleContinueToOccasion = () => {
    setCurrentStep('occasion');
  };

  const handleRecommendationsReceived = (response: RecommendationResponse) => {
    setRecommendations(response);
    setCurrentStep('recommendations');
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-12 px-4">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-12 text-center">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">
          Fashion AI
        </h1>
        <p className="text-xl text-gray-600">
          AI-powered personalized fashion recommendations
        </p>
      </div>

      {/* Progress Steps */}
      <div className="max-w-4xl mx-auto mb-12">
        <div className="flex items-center justify-center gap-4">
          <StepIndicator
            number={1}
            label="Upload"
            active={currentStep === 'upload'}
            completed={['analysis', 'occasion', 'recommendations'].includes(currentStep)}
          />
          <div className="w-12 h-1 bg-gray-300" />
          <StepIndicator
            number={2}
            label="Analysis"
            active={currentStep === 'analysis'}
            completed={['occasion', 'recommendations'].includes(currentStep)}
          />
          <div className="w-12 h-1 bg-gray-300" />
          <StepIndicator
            number={3}
            label="Occasion"
            active={currentStep === 'occasion'}
            completed={currentStep === 'recommendations'}
          />
          <div className="w-12 h-1 bg-gray-300" />
          <StepIndicator
            number={4}
            label="Results"
            active={currentStep === 'recommendations'}
            completed={false}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto">
        {currentStep === 'upload' && (
          <PhotoUpload onAnalysisComplete={handleAnalysisComplete} />
        )}

        {currentStep === 'analysis' && analysis && (
          <AnalysisDisplay
            analysis={analysis}
            onContinue={handleContinueToOccasion}
          />
        )}

        {currentStep === 'occasion' && (
          <OccasionSelector
            analysisId={analysisId}
            onRecommendations={handleRecommendationsReceived}
          />
        )}

        {currentStep === 'recommendations' && recommendations && (
          <RecommendationDisplay
            recommendations={recommendations.recommendations}
            profileSummary={recommendations.user_profile_summary}
          />
        )}
      </div>

      {/* Footer */}
      <footer className="max-w-6xl mx-auto mt-16 text-center text-gray-600 text-sm">
        <p>
          Powered by Claude AI • Built with Next.js, FastAPI & Tailwind CSS
        </p>
      </footer>
    </main>
  );
}

interface StepIndicatorProps {
  number: number;
  label: string;
  active: boolean;
  completed: boolean;
}

function StepIndicator({ number, label, active, completed }: StepIndicatorProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all ${
          completed
            ? 'bg-green-500 text-white'
            : active
            ? 'bg-blue-600 text-white'
            : 'bg-gray-200 text-gray-500'
        }`}
      >
        {completed ? '✓' : number}
      </div>
      <span
        className={`text-sm font-medium ${
          active ? 'text-blue-600' : completed ? 'text-green-600' : 'text-gray-500'
        }`}
      >
        {label}
      </span>
    </div>
  );
}
