"""
Claude AI service for photo analysis using vision capabilities.
"""
import base64
import json
import random
from pathlib import Path

import anthropic

from app.config import settings

from app.models import AnalysisResult


class ClaudeService:
    """Service for interacting with Claude AI for fashion analysis."""

    def __init__(self):
        self.client = anthropic.Anthropic(api_key=settings.anthropic_api_key)

    async def analyze_photo(self, image_path: Path) -> dict:
        """
        Analyze a user photo to extract fashion-relevant attributes.
        Includes a Mock Mode to allow testing without API credits.
        """
        if settings.mock_mode:
            # Simulate a small delay for realism
            import asyncio
            await asyncio.sleep(1.5)

            body_types = ["hourglass", "rectangle", "pear", "apple", "inverted triangle"]
            skin_tones = ["fair", "light", "medium", "tan", "deep", "dark"]
            styles = ["casual", "minimalist", "bohemian", "streetwear", "classic"]
            colors = ["navy blue", "white", "emerald green", "terracotta", "black", "beige"]
            occasions = ["casual", "business", "evening", "athletic", "date"]

            return {
                "body_type": random.choice(body_types),
                "skin_tone": random.choice(skin_tones),
                "current_style": random.choice(styles),
                "colors_detected": random.sample(colors, 3),
                "occasion": random.choice(occasions),
                "confidence": round(random.uniform(0.8, 0.98), 2),
                "raw_analysis": "MOCK MODE: This is a simulated AI analysis. In production mode, Claude Vision would analyze the image to detect your body shape, skin tone, and current aesthetic."
            }

        # Read and encode image
        with open(image_path, "rb") as f:
            image_data = base64.standard_b64encode(f.read()).decode("utf-8")

        # Determine media type
        media_type = self._get_media_type(image_path.suffix)

        # Create analysis prompt
        prompt = """Analyze this photo for fashion recommendation purposes. Provide a structured analysis:

1. **Body Type**: Identify the body shape (hourglass, rectangle, pear, apple, inverted triangle)
2. **Skin Tone**: Categorize (fair, light, medium, tan, deep, dark)
3. **Current Style**: What style aesthetic is shown? (casual, formal, sporty, bohemian, etc.)
4. **Colors Present**: List the main colors in the outfit
5. **Occasion**: What occasion does this outfit suit? (casual, business, evening, athletic)
6. **Confidence**: Rate your confidence in this analysis (0.0-1.0)

Be specific and fashion-focused. Format your response as JSON with keys: body_type, skin_tone, current_style, colors_detected (array), occasion, confidence (float), raw_analysis (your full reasoning)."""

        # Call Claude with vision
        message = self.client.messages.create(
            model="claude-sonnet-5-5",
            max_tokens=2048,
            messages=[
                {
                    "role": "user",
                    "content": [
                        {
                            "type": "image",
                            "source": {
                                "type": "base64",
                                "media_type": media_type,
                                "data": image_data,
                            },
                        },
                        {"type": "text", "text": prompt},
                    ],
                }
            ],
        )

        # Parse response
        response_text = message.content[0].text

        # Extract JSON (Claude should return it directly, but handle markdown wrapping)
        import json

        if "```json" in response_text:
            json_start = response_text.find("```json") + 7
            json_end = response_text.find("```", json_start)
            response_text = response_text[json_start:json_end].strip()
        elif "```" in response_text:
            json_start = response_text.find("```") + 3
            json_end = response_text.find("```", json_start)
            response_text = response_text[json_start:json_end].strip()

        analysis_data = json.loads(response_text)

        return analysis_data

    def _get_media_type(self, suffix: str) -> str:
        """Map file extension to media type."""
        suffix = suffix.lower()
        mapping = {
            ".jpg": "image/jpeg",
            ".jpeg": "image/jpeg",
            ".png": "image/png",
            ".gif": "image/gif",
            ".webp": "image/webp",
        }
        return mapping.get(suffix, "image/jpeg")
