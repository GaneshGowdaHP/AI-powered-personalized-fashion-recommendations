# 🚀 Quick Start Guide

## Prerequisites
- Python 3.11+
- Node.js 20+
- uv (Python package manager)
- Anthropic API key

## Setup & Run

### 1. Backend Setup (Python/FastAPI)

```bash
cd backend

# Virtual environment already created, dependencies installed ✓

# Configure your API key
# Edit .env and replace 'sk-ant-your-key-here' with your actual Anthropic API key

# Start the backend
source .venv/Scripts/activate  # Windows Git Bash
uvicorn app.main:app --reload
```

Backend will run at `http://localhost:8000`

### 2. Frontend Setup (Next.js)

```bash
cd frontend

# Install dependencies (if not done)
npm install

# Start development server
npm run dev
```

Frontend will run at `http://localhost:3000`

## Usage Flow

1. **Upload Photo** → Take/upload a full-body photo
2. **View Analysis** → See your body type, skin tone, style profile
3. **Select Occasion** → Choose casual, business, evening, etc.
4. **Get Recommendations** → Personalized outfit suggestions with styling tips

## Architecture

```
Frontend (Next.js)  →  Backend (FastAPI)  →  Claude AI Vision
     ↓                        ↓
  localhost:3000         localhost:8000
```

## Key Features

✨ **Claude Vision Analysis** - AI-powered photo analysis
🎨 **Color Theory** - Science-backed palette recommendations  
👔 **Body Type Styling** - Rules for hourglass, pear, apple, etc.
💡 **Smart Recommendations** - Hybrid AI + rule-based engine
🎯 **Occasion Matching** - Casual to formal styling

## Tech Stack

**Backend:**
- FastAPI (Python async web framework)
- Claude AI (Sonnet 4 vision model)
- uv (package management)

**Frontend:**
- Next.js 15 (React framework)
- TypeScript (type safety)
- Tailwind CSS (styling)

## Get Your API Key

Visit: https://console.anthropic.com/
