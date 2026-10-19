'use client';

import { OutfitItem } from '@/types/api';

interface OutfitVisualizerProps {
  outfitItems: OutfitItem[];
  colorPalette: string[];
}

export default function OutfitVisualizer({ outfitItems, colorPalette }: OutfitVisualizerProps) {
  // Get colors for each category
  const getItemColor = (item: OutfitItem, index: number) => {
    if (item.colors.length > 0 && !item.colors[0].includes('neutral')) {
      return item.colors[0];
    }
    return colorPalette[index % colorPalette.length] || '#6B7280';
  };

  const colorNameToHex = (colorName: string): string => {
    const colorMap: Record<string, string> = {
      // Basics
      'black': '#000000',
      'white': '#FFFFFF',
      'gray': '#6B7280',
      'grey': '#6B7280',
      'neutral': '#9CA3AF',

      // Reds
      'red': '#DC2626',
      'burgundy': '#7C2D12',
      'coral': '#F87171',
      'ruby': '#991B1B',
      'fuchsia': '#DB2777',

      // Blues
      'blue': '#2563EB',
      'navy': '#1E3A8A',
      'navy blue': '#1E3A8A',
      'teal': '#0D9488',
      'cobalt': '#1E40AF',
      'royal blue': '#1E3A8A',

      // Greens
      'green': '#16A34A',
      'emerald': '#059669',
      'olive': '#84CC16',

      // Yellows/Oranges
      'yellow': '#EAB308',
      'gold': '#D97706',
      'terracotta': '#EA580C',
      'orange': '#F97316',

      // Purples
      'purple': '#9333EA',
      'lavender': '#C084FC',

      // Browns/Neutrals
      'brown': '#92400E',
      'chocolate': '#78350F',
      'beige': '#D4A373',
      'cream': '#FEF3C7',
      'tan': '#D2B48C',

      // Pastels
      'pastels': '#FDE68A',
      'pastel': '#FDE68A',

      // Jewel tones
      'jewel tones': '#7C3AED',

      // Earth tones
      'earth tones': '#92400E',

      // Other
      'pink': '#EC4899',
    };

    const normalized = colorName.toLowerCase().trim();
    return colorMap[normalized] || '#6B7280';
  };

  const top = outfitItems.find(i => i.category === 'top');
  const bottom = outfitItems.find(i => i.category === 'bottom');
  const dress = outfitItems.find(i => i.category === 'dress');
  const shoes = outfitItems.find(i => i.category === 'shoes');
  const accessory = outfitItems.find(i => i.category === 'accessory');

  const topColor = top ? colorNameToHex(getItemColor(top, 0)) : '#6B7280';
  const bottomColor = bottom ? colorNameToHex(getItemColor(bottom, 1)) : '#374151';
  const dressColor = dress ? colorNameToHex(getItemColor(dress, 0)) : '#6B7280';
  const shoeColor = shoes ? colorNameToHex(getItemColor(shoes, 2)) : '#1F2937';

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-8 border border-gray-200">
      <h3 className="text-xl font-semibold text-gray-800 mb-6 text-center">
        Your Outfit Visualization
      </h3>

      <div className="flex justify-center">
        <svg
          width="280"
          height="420"
          viewBox="0 0 280 420"
          className="drop-shadow-lg"
        >
          {/* Background */}
          <rect width="280" height="420" fill="#F9FAFB" rx="8" />

          {/* Head/Face */}
          <circle cx="140" cy="60" r="35" fill="#FCD9B9" />

          {dress ? (
            /* Dress */
            <>
              <path
                d="M 105 95 L 140 95 L 175 95 L 175 110 Q 175 140 170 170 L 165 250 Q 162 280 150 280 L 130 280 Q 118 280 115 250 L 110 170 Q 105 140 105 110 L 105 95 Z"
                fill={dressColor}
                stroke="#000"
                strokeWidth="1.5"
                opacity="0.95"
              />
              {/* Belt */}
              <rect x="105" y="155" width="70" height="8" fill="#1F2937" opacity="0.7" rx="2" />
            </>
          ) : (
            <>
              {/* Top/Shirt */}
              <path
                d="M 95 95 L 105 95 Q 110 100 115 105 L 120 140 L 120 185 Q 120 195 130 195 L 150 195 Q 160 195 160 185 L 160 140 L 165 105 Q 170 100 175 95 L 185 95 L 185 110 Q 180 130 175 140 L 170 185 Q 168 200 155 200 L 125 200 Q 112 200 110 185 L 105 140 Q 100 130 95 110 Z"
                fill={topColor}
                stroke="#000"
                strokeWidth="1.5"
                opacity="0.95"
              />

              {/* Bottom/Pants */}
              <path
                d="M 110 195 L 115 200 L 120 250 L 125 320 Q 127 335 132 335 L 132 200 L 148 200 L 148 335 Q 153 335 155 320 L 160 250 L 165 200 L 170 195 L 165 200 Q 160 210 158 230 L 153 320 Q 150 345 140 345 Q 130 345 127 320 L 122 230 Q 120 210 115 200 Z"
                fill={bottomColor}
                stroke="#000"
                strokeWidth="1.5"
                opacity="0.95"
              />
            </>
          )}

          {/* Shoes */}
          <ellipse cx="125" cy="350" rx="18" ry="8" fill={shoeColor} opacity="0.9" />
          <ellipse cx="155" cy="350" rx="18" ry="8" fill={shoeColor} opacity="0.9" />

          {/* Accessory (necklace/scarf) */}
          {accessory && (
            <ellipse
              cx="140"
              cy="95"
              rx="25"
              ry="5"
              fill={colorNameToHex(accessory.colors[0] || colorPalette[3])}
              opacity="0.85"
            />
          )}

          {/* Hair */}
          <path
            d="M 105 50 Q 105 30 120 25 Q 140 20 160 25 Q 175 30 175 50 Q 175 65 170 70 Q 165 60 160 55 Q 155 50 150 50 L 130 50 Q 125 50 120 55 Q 115 60 110 70 Q 105 65 105 50"
            fill="#3B2612"
            opacity="0.9"
          />
        </svg>
      </div>

      <div className="mt-6 text-center text-sm text-gray-600">
        <p className="italic">Stylized representation of your recommended outfit</p>
      </div>
    </div>
  );
}
