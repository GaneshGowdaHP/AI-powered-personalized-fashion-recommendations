"""
Rule-based styling engine for fashion recommendations.
Combines color theory, body type guidelines, and occasion matching.
"""
from typing import Any

from app.models import AnalysisResult, OutfitItem, StyleRecommendation


class StylingEngine:
    """Hybrid styling engine using rules + AI refinement."""

    # Color theory palettes
    COLOR_PALETTES = {
        "fair": {
            "flattering": ["pastels", "jewel tones", "cool colors", "navy", "burgundy"],
            "avoid": ["neon", "very pale colors"],
        },
        "light": {
            "flattering": ["earth tones", "warm colors", "coral", "teal", "olive"],
            "avoid": ["washed out pastels"],
        },
        "medium": {
            "flattering": ["rich colors", "jewel tones", "bright colors", "emerald", "ruby"],
            "avoid": [],
        },
        "tan": {
            "flattering": ["warm tones", "gold", "terracotta", "chocolate", "cream"],
            "avoid": ["ashy colors"],
        },
        "deep": {
            "flattering": ["bold colors", "bright colors", "white", "fuchsia", "cobalt"],
            "avoid": ["muddy tones"],
        },
        "dark": {
            "flattering": ["vibrant colors", "jewel tones", "white", "gold", "royal blue"],
            "avoid": ["dull colors"],
        },
    }

    # Body type styling rules
    BODY_TYPE_GUIDELINES = {
        "hourglass": {
            "tops": ["wrap tops", "v-neck", "fitted styles", "belted"],
            "bottoms": ["high-waisted", "pencil skirts", "bootcut jeans"],
            "emphasis": "waist",
            "avoid": ["shapeless", "overly loose"],
        },
        "rectangle": {
            "tops": ["peplum", "ruffles", "embellished", "off-shoulder"],
            "bottoms": ["flared", "wide-leg", "detailed pockets"],
            "emphasis": "curves",
            "avoid": ["straight cuts", "boxy"],
        },
        "pear": {
            "tops": ["boat neck", "embellished", "bright colors", "statement sleeves"],
            "bottoms": ["dark colors", "straight leg", "A-line skirts"],
            "emphasis": "shoulders and upper body",
            "avoid": ["tight bottoms", "tapered pants"],
        },
        "apple": {
            "tops": ["v-neck", "empire waist", "flowy", "vertical details"],
            "bottoms": ["bootcut", "flared", "high-waisted"],
            "emphasis": "legs",
            "avoid": ["clingy fabrics", "crop tops"],
        },
        "inverted triangle": {
            "tops": ["v-neck", "wrap styles", "darker colors"],
            "bottoms": ["volume", "patterns", "bright colors", "wide-leg"],
            "emphasis": "lower body",
            "avoid": ["shoulder pads", "boat neck"],
        },
    }

    # Occasion guidelines
    OCCASION_STYLES = {
        "casual": {
            "items": ["jeans", "t-shirt", "sneakers", "casual dress"],
            "formality": "relaxed",
        },
        "business": {
            "items": ["blazer", "trousers", "blouse", "dress shoes"],
            "formality": "professional",
        },
        "evening": {
            "items": ["cocktail dress", "heels", "statement jewelry"],
            "formality": "formal",
        },
        "athletic": {
            "items": ["activewear", "sneakers", "sports bra", "leggings"],
            "formality": "sporty",
        },
        "date": {
            "items": ["fitted dress", "heels", "elegant top", "tailored pants"],
            "formality": "semi-formal",
        },
    }

    def generate_recommendations(
        self, analysis: AnalysisResult, occasion: str = "casual", season: str = "all-season"
    ) -> StyleRecommendation:
        """
        Generate outfit recommendations based on analysis + rules.

        Args:
            analysis: User analysis from Claude
            occasion: Target occasion
            season: Target season

        Returns:
            StyleRecommendation with outfit items
        """
        body_type = analysis.body_type.lower()
        skin_tone = analysis.skin_tone.lower()

        # Get applicable rules
        body_guidelines = self.BODY_TYPE_GUIDELINES.get(
            body_type, self.BODY_TYPE_GUIDELINES["rectangle"]
        )
        color_palette = self.COLOR_PALETTES.get(skin_tone, self.COLOR_PALETTES["medium"])
        occasion_style = self.OCCASION_STYLES.get(occasion, self.OCCASION_STYLES["casual"])

        # Build outfit items
        outfit_items = []

        # Top recommendation
        top_styles = body_guidelines["tops"]
        outfit_items.append(
            OutfitItem(
                category="top",
                description=f"{top_styles[0].capitalize()} in flattering colors",
                colors=color_palette["flattering"][:2],
                style_notes=f"Emphasizes {body_guidelines['emphasis']}",
                why_recommended=f"Perfect for {body_type} body type and {skin_tone} skin tone",
            )
        )

        # Bottom recommendation
        bottom_styles = body_guidelines["bottoms"]
        outfit_items.append(
            OutfitItem(
                category="bottom",
                description=f"{bottom_styles[0].capitalize()} with balanced proportions",
                colors=["neutral", "dark tones"],
                style_notes=f"Complements your {body_type} shape",
                why_recommended="Creates balanced silhouette",
            )
        )

        # Shoes
        outfit_items.append(
            OutfitItem(
                category="shoes",
                description=f"Appropriate for {occasion}",
                colors=["neutral"],
                style_notes=f"{occasion_style['formality']} style",
                why_recommended=f"Matches {occasion} occasion",
            )
        )

        # Accessory
        outfit_items.append(
            OutfitItem(
                category="accessory",
                description="Statement piece to complete the look",
                colors=color_palette["flattering"][:1],
                style_notes="Adds personality",
                why_recommended="Enhances overall aesthetic",
            )
        )

        # Styling tips
        tips = [
            f"Focus on {body_guidelines['emphasis']} to flatter your {body_type} shape",
            f"Stick to {', '.join(color_palette['flattering'][:3])} for your {skin_tone} skin tone",
            f"Avoid {', '.join(body_guidelines['avoid'])} styles",
        ]

        reasoning = (
            f"This recommendation suits your {body_type} body type and {skin_tone} skin tone. "
            f"The outfit emphasizes {body_guidelines['emphasis']} while maintaining a "
            f"{occasion_style['formality']} aesthetic appropriate for {occasion}."
        )

        return StyleRecommendation(
            occasion=occasion,
            season=season,
            outfit_items=outfit_items,
            color_palette=color_palette["flattering"][:5],
            styling_tips=tips,
            reasoning=reasoning,
        )
