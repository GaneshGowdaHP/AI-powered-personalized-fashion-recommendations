# Fashion AI Backend

AI-powered fashion recommendation system with Claude Vision + rule-based styling engine.

## Setup

1. **Install dependencies with uv:**
   ```bash
   cd backend
   uv venv
   source .venv/bin/activate  # Windows: .venv\Scripts\activate
   uv pip install -e .
   ```

2. **Configure environment:**
   ```bash
   cp .env.example .env
   # Edit .env and add your ANTHROPIC_API_KEY
   ```

3. **Run the server:**
   ```bash
   uvicorn app.main:app --reload
   ```

   Server runs at `http://localhost:8000`

## API Endpoints

### `POST /api/analyze`
Upload a photo for analysis.

**Request:** `multipart/form-data` with `file` field

**Response:**
```json
{
  "body_type": "hourglass",
  "skin_tone": "medium",
  "current_style": "casual",
  "colors_detected": ["blue", "white"],
  "occasion": "casual",
  "confidence": 0.85,
  "raw_analysis": "..."
}
```

### `POST /api/recommend`
Get outfit recommendations based on analysis.

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
    "season": "fall",
    "outfit_items": [...],
    "color_palette": ["navy", "burgundy", "cream"],
    "styling_tips": [...],
    "reasoning": "..."
  }],
  "user_profile_summary": "..."
}
```

## Tech Stack

- **FastAPI** - async web framework
- **Claude AI** - vision analysis (Sonnet 4)
- **Pydantic** - data validation
- **uv** - package management

## Architecture

```
┌─────────────┐
│ Photo Upload│
└──────┬──────┘
       │
       ▼
┌──────────────────┐
│ Claude Vision    │  Analyzes: body type, skin tone,
│ Analysis         │  style, colors, occasion
└──────┬───────────┘
       │
       ▼
┌──────────────────┐
│ Styling Engine   │  Rules: color theory, body type
│ (Hybrid)         │  guidelines, occasion matching
└──────┬───────────┘
       │
       ▼
┌──────────────────┐
│ Recommendations  │  Outfit items + styling tips
└──────────────────┘
```
