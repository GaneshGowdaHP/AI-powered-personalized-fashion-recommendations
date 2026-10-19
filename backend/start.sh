#!/bin/bash

# Fashion AI Backend Startup Script

echo "🚀 Starting Fashion AI Backend..."

# Check if .env exists
if [ ! -f .env ]; then
    echo "❌ .env file not found. Please copy .env.example to .env and configure it."
    exit 1
fi

# Check if ANTHROPIC_API_KEY is set
if grep -q "sk-ant-your-key-here" .env; then
    echo "⚠️  Warning: Please set your ANTHROPIC_API_KEY in .env file"
    echo "   Get your API key from: https://console.anthropic.com/"
fi

# Activate virtual environment
if [ -d ".venv" ]; then
    source .venv/Scripts/activate
else
    echo "❌ Virtual environment not found. Run 'uv venv' first."
    exit 1
fi

# Create uploads directory
mkdir -p uploads

# Start the server
echo "✨ Starting FastAPI server on http://localhost:8000"
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
