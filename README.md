# Fashion AI - AI-Powered Fashion Recommendation System

An intelligent fashion recommendation system that analyzes user photos and provides personalized outfit suggestions using Claude Vision AI and rule-based styling logic.

## Features

- 📸 **Photo Analysis** - Upload a photo and get AI-powered analysis of body type, skin tone, and style
- 👗 **Smart Recommendations** - Hybrid recommendation engine combining Claude AI with color theory and body type guidelines
- 🎨 **Personalized Styling** - Outfit suggestions tailored to your unique attributes and occasion
- 🌈 **Color Palette** - Science-backed color recommendations for your skin tone
- 💡 **Styling Tips** - Expert advice on what works for your body type

## Architecture

```
┌──────────────────────────────────────────────────┐
│  Frontend (Next.js + TypeScript + Tailwind)      │
│  - Photo upload UI                               │
│  - Results display                               │
│  - Recommendation cards                          │
└────────────────┬─────────────────────────────────┘
                 │
                 │ REST API
                 │
┌────────────────▼─────────────────────────────────┐
│  Backend (FastAPI + Python)                      │
│  - /api/analyze   → Claude Vision               │
│  - /api/recommend → Styling Engine               │
└────────────────┬─────────────────────────────────┘
                 │
     ┌───────────┴───────────┐
     │                       │
┌────▼─────┐         ┌──────▼──────┐
│ Claude AI│         │ Rule Engine │
│ (Vision) │         │ Color theory│
│ Analysis │         │ Body types  │
└──────────┘         └─────────────┘
```

## Tech Stack

### Backend
- **FastAPI** - Modern async Python web framework
- **Claude AI** (Sonnet 4) - Vision analysis and AI-powered insights
- **Pydantic** - Data validation and settings management
- **uv** - Fast Python package management

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **React Hooks** - State management

## Getting Started

### Prerequisites
- Python 3.11+
- Node.js 20+
- [uv](https://github.com/astral-sh/uv) package manager
- Anthropic API key ([get one here](https://console.anthropic.com/))

### Backend Setup

```bash
cd backend

# Create virtual environment and install dependencies
uv venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate
uv pip install -e .

# Configure environment
cp .env.example .env
# Edit .env and add your ANTHROPIC_API_KEY

# Run the server
uvicorn app.main:app --reload
```

Backend runs at `http://localhost:8000`

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Run development server
npm run dev
```

Frontend runs at `http://localhost:3000`

## Usage

1. **Upload Photo** - Take or upload a full-body photo
2. **Get Analysis** - Claude AI analyzes your body type, skin tone, and current style
3. **Select Occasion** - Choose the occasion (casual, business, evening, etc.)
4. **View Recommendations** - Get personalized outfit suggestions with styling tips

## API Documentation

### `POST /api/analyze`
Analyze a user photo using Claude Vision.

**Request:** Multipart form data with image file

**Response:**
```json
{
  "body_type": "hourglass",
  "skin_tone": "medium",
  "current_style": "casual",
  "colors_detected": ["blue", "white"],
  "occasion": "casual",
  "confidence": 0.85,
  "raw_analysis": "Detailed analysis..."
}
```

### `POST /api/recommend`
Generate outfit recommendations.

**Request:**
```json
{
  "analysis_id": "uuid-from-analyze",
  "occasion": "business",
  "season": "fall"
}
```

**Response:**
```json
{
  "recommendations": [{
    "occasion": "business",
    "outfit_items": [...],
    "color_palette": ["navy", "burgundy", "cream"],
    "styling_tips": [...]
  }],
  "user_profile_summary": "Hourglass body type, medium skin tone..."
}
```

## Styling Engine

The hybrid styling engine combines:

1. **Claude Vision AI** - Analyzes photos for body type, skin tone, and style
2. **Color Theory** - Science-backed color palettes for each skin tone
3. **Body Type Guidelines** - Fashion rules for different body shapes
4. **Occasion Matching** - Appropriate styles for different contexts

### Supported Body Types
- Hourglass
- Rectangle
- Pear
- Apple
- Inverted Triangle

### Supported Skin Tones
- Fair
- Light
- Medium
- Tan
- Deep
- Dark

## Development

### Run Tests (Backend)
```bash
cd backend
uv pip install -e ".[dev]"
pytest
```

### Format Code
```bash
# Backend
cd backend
ruff check . --fix
ruff format .

# Frontend
cd frontend
npm run lint
```

## Project Structure

```
fashin_design/
├── backend/
│   ├── app/
│   │   ├── main.py              # FastAPI app
│   │   ├── claude_service.py    # Claude AI integration
│   │   ├── styling_engine.py    # Rule-based recommendations
│   │   ├── models.py            # Pydantic models
│   │   └── config.py            # Settings
│   ├── pyproject.toml
│   └── README.md
├── frontend/
│   ├── src/
│   │   └── app/
│   │       ├── page.tsx         # Home page
│   │       └── api/             # API routes (proxy)
│   ├── package.json
│   └── README.md
└── README.md                    # This file
```

## Contributing

Contributions welcome! Please follow the Conventional Commits standard:
- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `refactor:` Code refactoring
- `chore:` Maintenance tasks

## License

MIT License - see LICENSE file for details

## Acknowledgments

- Claude AI by Anthropic for vision analysis
- Fashion styling rules based on established color theory and body type guidelines
