"""
Pydantic models for the Fashion AI API.
"""
from typing import Literal

from pydantic import BaseModel, Field


# Analysis models
class AnalysisResult(BaseModel):
    """Result from Claude vision analysis of a user photo."""

    id: str = Field(..., description="Unique ID for this analysis")
    body_type: str = Field(..., description="Detected body type (e.g., hourglass, rectangle, pear)")
    skin_tone: str = Field(..., description="Detected skin tone category")
    current_style: str = Field(..., description="Current style aesthetic from photo")
    colors_detected: list[str] = Field(default_factory=list, description="Colors in outfit")
    occasion: str = Field(default="casual", description="Inferred occasion")
    confidence: float = Field(..., ge=0, le=1, description="Analysis confidence score")
    raw_analysis: str = Field(..., description="Raw Claude analysis text")


# Recommendation models
class OutfitItem(BaseModel):
    """A single clothing item recommendation."""

    category: Literal["top", "bottom", "dress", "outerwear", "shoes", "accessory"]
    description: str
    colors: list[str]
    style_notes: str
    why_recommended: str


class StyleRecommendation(BaseModel):
    """Complete styling recommendation with outfit items."""

    occasion: str
    season: str = "all-season"
    outfit_items: list[OutfitItem]
    color_palette: list[str]
    styling_tips: list[str]
    reasoning: str = Field(..., description="Why this recommendation suits the user")
    image_url: str = Field(default="", description="URL of the generated realistic outfit image")


class RecommendationRequest(BaseModel):
    """Request payload for generating recommendations."""

    analysis_id: str = Field(..., description="ID from previous analysis")
    occasion: str = "casual"
    season: str = "all-season"
    preferences: dict = Field(default_factory=dict)


class RecommendationResponse(BaseModel):
    """Response containing style recommendations."""

    recommendations: list[StyleRecommendation]
    user_profile_summary: str
