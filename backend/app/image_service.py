"""
Image generation service using Replicate (Stable Diffusion / Flux).
"""
import os
import replicate
from app.config import settings
from app.models import StyleRecommendation

class ImageGenerationService:
    """Service for generating realistic fashion images."""

    def __init__(self):
        self.client = replicate.Client(api_token=settings.replicate_api_token)

    async def generate_outfit_image(self, analysis_summary: str, recommendation: StyleRecommendation) -> str:
        """
        Generate a realistic image of a person wearing the recommended outfit.
        """
        if settings.mock_mode:
            import asyncio
            await asyncio.sleep(1)

            # Use high-quality Unsplash fashion photos based on occasion
            occasion_images = {
                "casual": "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&h=900&fit=crop&q=80",
                "business": "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&h=900&fit=crop&q=80",
                "evening": "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=600&h=900&fit=crop&q=80",
                "athletic": "https://images.unsplash.com/photo-1518459031867-a89b944bffe4?w=600&h=900&fit=crop&q=80",
                "date": "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&h=900&fit=crop&q=80",
            }

            occasion = recommendation.occasion.lower()
            return occasion_images.get(occasion, occasion_images["casual"])

        # Construct a highly detailed prompt for the image generator
        items_desc = ", ".join([f"{item.description} in {', '.join(item.colors)}" for item in recommendation.outfit_items])

        prompt = (
            f"Full body professional fashion photography of a person with {analysis_summary}. "
            f"Wearing a {recommendation.occasion} outfit for {recommendation.season}: {items_desc}. "
            f"The colors should be {', '.join(recommendation.color_palette)}. "
            f"High fashion editorial style, studio lighting, 8k resolution, photorealistic, "
            f"wearing a confident pose, neutral background."
        )

        try:
            # Using Flux.1 [dev] or Stable Diffusion XL for high quality
            output = self.client.run(
                "black-forest-labs/flux-dev",
                input={
                    "prompt": prompt,
                    "aspect_ratio": "2:3",
                    "output_format": "webp",
                    "output_quality": 90,
                }
            )
            return output[0] if isinstance(output, list) else output
        except Exception as e:
            print(f"Image generation failed: {e}")
            return "https://via.placeholder.com/400x600?text=Image+Generation+Failed"
