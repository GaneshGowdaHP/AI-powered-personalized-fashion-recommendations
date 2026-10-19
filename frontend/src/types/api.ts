export interface AnalysisResult {
  body_type: string;
  skin_tone: string;
  current_style: string;
  colors_detected: string[];
  occasion: string;
  confidence: number;
  raw_analysis: string;
}

export interface OutfitItem {
  category: 'top' | 'bottom' | 'dress' | 'outerwear' | 'shoes' | 'accessory';
  description: string;
  colors: string[];
  style_notes: string;
  why_recommended: string;
}

export interface StyleRecommendation {
  occasion: string;
  season: string;
  outfit_items: OutfitItem[];
  color_palette: string[];
  styling_tips: string[];
  reasoning: string;
}

export interface RecommendationResponse {
  recommendations: StyleRecommendation[];
  user_profile_summary: string;
}

export interface RecommendationRequest {
  analysis_id: string;
  occasion: string;
  season: string;
  preferences?: Record<string, any>;
}
